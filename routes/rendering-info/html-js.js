const Joi   = require('joi');
const enjoi = require('enjoi');
const Boom  = require('boom');

const resourcesDir  = __dirname + '/../../resources/';
const dynamicSchema = require(resourcesDir + 'dynamicSchema.js');
const schema        = enjoi(dynamicSchema);
const layerConfigs  = JSON.parse(process.env.LAYER_CONFIGS);
const viewsDir      = __dirname + '/../../views/';

require('svelte/ssr/register');
const staticTpl = require(`${viewsDir}/html-js.html`);

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

    request.payload.toolRuntimeConfig.baseLayer = layerConfigs[data.options.baseLayer];

    let loaderScript = `
        System.config({
          map: {
            "q-map/map.js": "${request.payload.toolRuntimeConfig.toolBaseUrl}/script/slippy-map.js"
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
      stylesheets: [
        {
          name: 'default'
        }
      ],
      scripts: [
        {
          name: 'system.js'
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
