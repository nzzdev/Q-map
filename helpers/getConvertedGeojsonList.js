const turf = require("@turf/turf");
const clone = require("clone");

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
  let max = range[1],
    min = range[0],
    d = max - min;
  return x === max && includeMax ? x : ((((x - min) % d) + d) % d) + min;
}

function convertGeojsonList(geojsonList, range) {
  return clone(geojsonList).map(function(geojson) {
    turf.coordEach(geojson, currentCoord => {
      currentCoord[0] = wrapNum(currentCoord[0], range, true);
    });
    return geojson;
  });
}

function insidePacificArea(geojsonList) {
  return geojsonList.every(geojson => {
    try {
      return turf.booleanContains(pacificArea, turf.center(geojson));
    } catch (e) {
      // if the geojson can't be handled by turfjs we ignore this geometry for the isInPacificArea calculation
      return true;
    }
  });
}

function getConvertedGeojsonList(geojsonList) {
  // Normalize all longitude coordinates to be between -180 and 180 degrees
  const normalizedGeojsonList = convertGeojsonList(geojsonList, [-180, 180]);
  // If all features are inside the pacific area
  // return the geojsonList which is converted to longitude values
  // between 0 and 360 degrees
  const convertedGeojsonList = convertGeojsonList(geojsonList, [0, 360]);
  if (insidePacificArea(convertedGeojsonList)) {
    return convertedGeojsonList;
  }
  return normalizedGeojsonList;
}

module.exports = getConvertedGeojsonList;
