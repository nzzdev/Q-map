const Joi   = require('joi');
const enjoi = require('enjoi');
const Boom  = require('boom');

const resourcesDir  = __dirname + '/../../resources/';
const scriptsDir  = __dirname + '/../../scripts/';
const dynamicSchema = require(resourcesDir + 'dynamicSchema.js');
const schema        = enjoi(dynamicSchema);
const layerConfigs  = JSON.parse(process.env.LAYER_CONFIGS);
const viewsDir      = __dirname + '/../../views/';

const hashMap = require(`${scriptsDir}/hashMap.json`);

require('svelte/ssr/register');
const staticTpl = require(`${viewsDir}/html-js.html`);

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
        toolRuntimeConfig: Joi.object().required()
      }
    },
    cors: true
  },
  handler: function(request, reply) {
    if (!request.payload.toolRuntimeConfig.toolBaseUrl) {
      return reply(Boom.badRequest('toolBaseUrl is missing in toolRuntimeConfig'));
    }

    let id = request.payload.item._id || (Math.random() * 10000).toFixed();

    let data = Object.assign({
      id: id,
      mapContainerId: `q-map-${id}`
    }, request.payload.item);

    // pass the config for the configured baseLayer in toolRuntimeConfig
    request.payload.toolRuntimeConfig.baseLayer = layerConfigs[data.options.baseLayer];

    // transform any simplestyle properties to the leaflet path style properties on the GeoJSON features
    for (let geojson of data.geojsonList) {
      if (geojson.hasOwnProperty('properties')) {
        geojson.properties = simplestyleToLeafletStyle(geojson.properties);
      }
      if (geojson.hasOwnProperty('features')) {
        for (let geojsonFeature of geojson.features) {
          geojsonFeature.properties = simplestyleToLeafletStyle(geojsonFeature.properties);
        }
      }
    }

    let loaderScript = `
        System.config({
          map: {
            "q-map/map.js": "${request.payload.toolRuntimeConfig.toolBaseUrl}/script/${hashMap['slippy-map.js']}"
          }
        });
        System.import('q-map/map.js')
          .then(function(module) {
            return module.display(${JSON.stringify(request.payload.item)}, document.querySelector('#${data.mapContainerId}'), ${JSON.stringify(request.payload.toolRuntimeConfig)})
          })
          .catch(function(error) {
            console.log(error)
          });
      `;

    let responseData = {
      polyfills: ['Promise', 'Object.assign'],
      stylesheets: [
        {
          name: 'default'
        }
      ],
      scripts: [
        {
          name: hashMap['system.js'],
          loadInEditorPreview: false
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
