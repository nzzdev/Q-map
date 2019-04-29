const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

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
  options: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, h) {
    const item = request.payload.item;
    if (request.params.optionName === "minimapInitialZoomOffset") {
      const minimapInitialZoomOffsetEnum = getMinimapInitialZoomOffsetEnum(
        item
      );
      return minimapInitialZoomOffsetEnum;
    }

    return Boom.badRequest();
  }
};
