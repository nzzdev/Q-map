const Boom = require("boom");
const Joi = require("joi");

function hasLabelsBelowMap(item) {
  return item.options.labelsBelowMap === true;
}

function hasMoreThanOneLabel(item) {
  return Array.isArray(item.geojsonList) && item.geojsonList.length > 1;
}

function hasMinimap(item) {
  return item.options.minimap === true;
}

module.exports = {
  method: "POST",
  path: "/option-availability/{optionName}",
  options: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, h) {
    if (request.params.optionName === "labelsBelowMapOneRow") {
      return {
        available:
          hasLabelsBelowMap(request.payload) &&
          hasMoreThanOneLabel(request.payload)
      };
    }

    if (request.params.optionName === "minimapInitialZoomOffset") {
      return {
        available: hasMinimap(request.payload)
      };
    }

    return Boom.badRequest();
  }
};
