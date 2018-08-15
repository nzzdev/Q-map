const Boom = require("boom");

const resourcesDir = `${__dirname}/../../resources/`;
const scriptsDir = `${__dirname}/../../scripts/`;
const stylesDir = `${__dirname}/../../styles/`;
const dynamicSchema = require(`${resourcesDir}dynamicSchema.js`);
const viewsDir = `${__dirname}/../../views/`;

const scriptHashMap = require(`${scriptsDir}/hashMap.json`);
const styleHashMap = require(`${stylesDir}/hashMap.json`);

require("svelte/ssr/register");
const staticTpl = require(`${viewsDir}/HtmlJs.html`);

const simplestyleToLeafletStyle = require(`${__dirname}/../../helpers/simplestyleToLeafletStyle.js`);
const getConvertedGeojsonList = require(`${__dirname}/../../helpers/getConvertedGeojsonList.js`);

const Ajv = require("ajv");
const ajv = new Ajv();

// add draft-04 support explicit
ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-04.json"));

const validate = ajv.compile(dynamicSchema);
function validateAgainstSchema(item, options) {
  if (validate(item)) {
    return item;
  } else {
    throw Boom.badRequest(JSON.stringify(validate.errors));
  }
}

async function validatePayload(payload, options, next) {
  if (typeof payload !== "object") {
    return next(Boom.badRequest(), payload);
  }
  if (typeof payload.item !== "object") {
    return next(Boom.badRequest(), payload);
  }
  if (typeof payload.toolRuntimeConfig !== "object") {
    return next(Boom.badRequest(), payload);
  }
  await validateAgainstSchema(payload.item, options);
}

module.exports = {
  method: "POST",
  path: "/rendering-info/html-js",
  options: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: validatePayload
    },
    cors: true,
    cache: false // do not send cache control header to let it be added by Q Server
  },
  handler: function(request, h) {
    if (!request.payload.toolRuntimeConfig.toolBaseUrl) {
      return Boom.badRequest("toolBaseUrl is missing in toolRuntimeConfig");
    }

    let id = request.query._id || (Math.random() * 10000).toFixed();

    let data = Object.assign(
      {
        id: id,
        mapContainerId: `q-map-${id}`,
        toolRuntimeConfig: request.payload.toolRuntimeConfig
      },
      request.payload.item
    );

    // uncomment this line if you develop and want to have map interactions available
    // request.payload.toolRuntimeConfig.displayOptions = {
    //   allowInteraction: true
    // };

    let layerConfigs = JSON.parse(process.env.LAYER_CONFIGS);
    // if there is layerConfigs passed in toolRuntimeConfig, we apply it to the layerConfigs and delete it afterwards to not pass it again in the dynamic js code
    if (request.payload.toolRuntimeConfig.hasOwnProperty("layerConfigs")) {
      layerConfigs = Object.assign(
        layerConfigs,
        request.payload.toolRuntimeConfig.layerConfigs
      );
      delete request.payload.toolRuntimeConfig.layerConfigs;
    }

    // pass the config for the configured baseLayer in toolRuntimeConfig
    request.payload.toolRuntimeConfig.baseLayer =
      layerConfigs[data.options.baseLayer];

    // transform any simplestyle properties to the leaflet path style properties on the GeoJSON features
    for (let geojson of data.geojsonList) {
      if (geojson.hasOwnProperty("features")) {
        for (let geojsonFeature of geojson.features) {
          if (!geojsonFeature.hasOwnProperty("properties")) {
            geojsonFeature.properties = {};
          }
          // we do not want any interactive properties
          geojsonFeature.properties.interactive = false;
          geojsonFeature.properties = simplestyleToLeafletStyle(
            geojsonFeature.properties,
            geojsonFeature.geometry.type
          );
        }
      } else {
        if (!geojson.hasOwnProperty("properties")) {
          geojson.properties = {};
        }
        // we do not want any interactive properties
        geojson.properties.interactive = false;
        geojson.properties = simplestyleToLeafletStyle(
          geojson.properties,
          geojson.geometry.type
        );
      }
    }
    // If the geojson features are in the pacific area, all longitude coordinates
    // should be converted to be between 0 - 360 degrees
    // See this blog post for more information: https://macwright.org/2016/09/26/the-180th-meridian.html
    request.payload.item.geojsonList = getConvertedGeojsonList(
      request.payload.item.geojsonList
    );
    let systemConfigScript = `
        System.config({
          map: {
            "q-map/map.js": "${
              request.payload.toolRuntimeConfig.toolBaseUrl
            }/script/${scriptHashMap["slippy-map"]}"
          }
        });
    `;

    let loaderScript = `
        System.import('q-map/map.js')
          .then(function(module) {
            return module.display(${JSON.stringify(
              request.payload.item
            )}, document.querySelector('#${
      data.mapContainerId
    }'), ${JSON.stringify(request.payload.toolRuntimeConfig)})
          })
          .catch(function(error) {
            console.log(error)
          });
      `;

    let stylesheets = [
      {
        name: styleHashMap.default
      }
    ];

    let baseLayer = request.payload.toolRuntimeConfig.baseLayer;
    if (baseLayer.logo && baseLayer.logo.stylesheet) {
      stylesheets.push({
        name: styleHashMap[baseLayer.logo.stylesheet.name]
      });
    }

    let responseData = {
      loaderConfig: {
        polyfills: ["Promise", "CustomEvent", "Object.assign"],
        loadSystemJs: "full"
      },
      stylesheets: stylesheets,
      scripts: [
        {
          content: systemConfigScript,
          loadOnce: true
        },
        {
          content: loaderScript
        }
      ],
      markup: staticTpl.render(data)
    };

    return responseData;
  }
};
