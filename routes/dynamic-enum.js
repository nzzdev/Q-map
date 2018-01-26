const Boom = require("boom");
const Joi = require("joi");

const maxMinimapInitialZoomOffset = -9;

function getMinimapInitialZoomOffsetEnum(item) {
  let initialZoomLevel = item.options.initialZoomLevel;

  // check if initialZoomLevel is automatic, then we do not know the level and thus allow all offset options
  if (initialZoomLevel === -1) {
    initialZoomLevel = 18; // set it to the max zoom level available to allow for the maximum offset
  }

  const choices = [0];
  const titles = ["automatisch"];
  let i = -1;
  while (Math.abs(i) < initialZoomLevel && i >= maxMinimapInitialZoomOffset) {
    choices.push(i);
    titles.push(i);
    i--;
  }

  return {
    enum: choices,
    enum_titles: titles
  };
}

module.exports = {
  method: "POST",
  path: "/dynamic-enum/{optionName}",
  config: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, reply) {
    if (request.params.optionName === "minimapInitialZoomOffset") {
      const minimapInitialZoomOffsetEnum = getMinimapInitialZoomOffsetEnum(
        request.payload
      );
      return reply(minimapInitialZoomOffsetEnum).type("application/json");
    }

    return reply(Boom.badRequest());
  }
};
