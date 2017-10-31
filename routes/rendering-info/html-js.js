const enjoi = require('enjoi');
const Boom  = require('boom');
const fs = require('fs');

const resourcesDir  = __dirname + '/../../resources/';
const scriptsDir  = __dirname + '/../../scripts/';
const stylesDir  = __dirname + '/../../styles/';
const dynamicSchema = require(resourcesDir + 'dynamicSchema.js');
const schema        = enjoi(dynamicSchema);
const viewsDir      = __dirname + '/../../views/';

const scriptHashMap = require(`${scriptsDir}/hashMap.json`);
const styleHashMap = require(`${stylesDir}/hashMap.json`);

const displayOptionsSchema = enjoi(JSON.parse(fs.readFileSync(resourcesDir + 'display-options-schema.json', {
  encoding: 'utf-8'
})));

require('svelte/ssr/register');
const staticTpl = require(`${viewsDir}/HtmlJs.html`);

const simplestyleToLeafletStyle = require(__dirname + '/../../helpers/simplestyleToLeafletStyle.js');

module.exports = {
  method: 'POST',
  path: '/rendering-info/html-js',
  config: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: {
        item: schema,
        toolRuntimeConfig: {
          displayOptions: displayOptionsSchema
        }
      }
    },
    cors: true,
    cache: false // do not send cache control header to let it be added by Q Server
  },
  handler: function(request, reply) {
    if (!request.payload.toolRuntimeConfig.toolBaseUrl) {
      return reply(Boom.badRequest('toolBaseUrl is missing in toolRuntimeConfig'));
    }

    let id = request.query._id || (Math.random() * 10000).toFixed();

    let data = Object.assign({
      id: id,
      mapContainerId: `q-map-${id}`,
      toolRuntimeConfig: request.payload.toolRuntimeConfig
    }, request.payload.item);

    let layerConfigs = JSON.parse(process.env.LAYER_CONFIGS);
    // if there is layerConfigs passed in toolRuntimeConfig, we apply it to the layerConfigs and delete it afterwards to not pass it again in the dynamic js code
    if (request.payload.toolRuntimeConfig.hasOwnProperty('layerConfigs')) {
      layerConfigs = Object.assign(layerConfigs, request.payload.toolRuntimeConfig.layerConfigs);
      delete request.payload.toolRuntimeConfig.layerConfigs;
    }

    // pass the config for the configured baseLayer in toolRuntimeConfig
    request.payload.toolRuntimeConfig.baseLayer = layerConfigs[data.options.baseLayer];

    // transform any simplestyle properties to the leaflet path style properties on the GeoJSON features
    for (let geojson of data.geojsonList) {
      if (geojson.hasOwnProperty('features')) {
        for (let geojsonFeature of geojson.features) {
          if (!geojsonFeature.hasOwnProperty('properties')) {
            geojsonFeature.properties = {};
          }
          // we do not want any interactive properties
          geojsonFeature.properties.interactive = false;
          geojsonFeature.properties = simplestyleToLeafletStyle(geojsonFeature.properties, geojsonFeature.geometry.type);
        }
      } else {
        if (!geojson.hasOwnProperty('properties')) {
          geojson.properties = {};
        }
        // we do not want any interactive properties
        geojson.properties.interactive = false;
        geojson.properties = simplestyleToLeafletStyle(geojson.properties, geojson.geometry.type);
      }
    }

    let systemConfigScript = `
        System.config({
          map: {
            "q-map/map.js": "${request.payload.toolRuntimeConfig.toolBaseUrl}/script/${scriptHashMap['slippy-map']}"
          }
        });
    `;

    let loaderScript = `
        System.import('q-map/map.js')
          .then(function(module) {
            return module.display(${JSON.stringify(request.payload.item)}, document.querySelector('#${data.mapContainerId}'), ${JSON.stringify(request.payload.toolRuntimeConfig)})
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
        polyfills: ['Promise', 'CustomEvent', 'Object.assign'],
        loadSystemJs: 'full'
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

    return reply(responseData);
  }
};
