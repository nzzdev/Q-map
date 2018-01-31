// this implements parts of https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0

const defaults = {
  line: {
    stroke: "#c31906",
    "stroke-width": 2,
    "stroke-opacity": 1
  },
  polygon: {
    "stroke-width": 0,
    fill: "#c31906",
    "fill-opacity": 0.35
  }
};

const mapping = {
  stroke: "color",
  "stroke-width": "weight",
  "stroke-opacity": "opacity",
  fill: "fillColor",
  "fill-opacity": "fillOpacity"
};

function simplestyleToLeafletStyle(properties, type) {
  if (!properties) {
    return properties;
  }
  let typeClass;
  if (type === "LineString" || type === "MultiLineString") {
    typeClass = "line";
  }
  if (type === "Polygon" || type === "MultiPolygon") {
    typeClass = "polygon";
  }
  if (!typeClass) {
    return properties;
  }
  for (let mappingProperty in mapping) {
    if (properties.hasOwnProperty(mappingProperty)) {
      properties[mapping[mappingProperty]] = properties[mappingProperty];
      delete properties[mappingProperty];
    } else if (defaults[typeClass].hasOwnProperty(mappingProperty)) {
      // if the default is defined for this property and type class, apply it
      properties[mapping[mappingProperty]] =
        defaults[typeClass][mappingProperty];
    }
  }
  return properties;
}

module.exports = simplestyleToLeafletStyle;
