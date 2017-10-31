const Boom = require('boom');
const Joi = require('joi');

function hasLabelsBelowMap(item) {
  return (item.options.labelsBelowMap === true);
}

function hasMinimap(item) {
  return (item.options.minimap === true);
}

module.exports = {
  method: 'POST',
  path: '/option-availability/{optionName}',
  config: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, reply) {
    if (request.params.optionName === 'labelsBelowMapOneRow') {
      return reply({
        available: hasLabelsBelowMap(request.payload)
      }).type('application/json');
    }

    if (request.params.optionName === 'minimapInitialZoomOffset') {
      return reply({
        available: hasMinimap(request.payload)
      }).type('application/json');
    }

    return reply(Boom.badRequest());
  }
};
