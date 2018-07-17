const turf = require("@turf/turf");

const pacificArea = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [[[70, -90], [335, -90], [335, 90], [70, 90], [70, -90]]]
  },
  bbox: [[70, -90], [335, 90]]
};

// leaflet@1.3.1 implementation
// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
function wrapNum(x, range, includeMax) {
  var max = range[1],
    min = range[0],
    d = max - min;
  return x === max && includeMax ? x : ((((x - min) % d) + d) % d) + min;
}

function convertGeojsonList(geojsonList, range) {
  for (let geojson of geojsonList) {
    turf.coordEach(geojson, currentCoord => {
      currentCoord[0] = wrapNum(currentCoord[0], range, true);
    });
  }
  return geojsonList;
}

function insidePacificArea(geojsonList) {
  let allInsidePacificArea = false;
  for (let geojson of geojsonList) {
    allInsidePacificArea =
      allInsidePacificArea &&
      turf.booleanContains(pacificArea, turf.center(geojson));
  }
  return allInsidePacificArea;
}

function getConvertedGeojsonList(geojsonList) {
  // Normalize all longitude coordinates to be between -180 and 180 degrees
  geojsonList = convertGeojsonList(geojsonList, [-180, 180]);
  const convertedGeojsonList = convertGeojsonList(geojsonList, [0, 360]);
  const allInsidePacificArea = insidePacificArea(convertedGeojsonList);
  // If all features are inside the pacific area
  // return the geojsonList which is converted to longitude values
  // between 0 and 360 degrees
  if (allInsidePacificArea) {
    return convertedGeojsonList;
  }
  return geojsonList;
}

module.exports = getConvertedGeojsonList;
