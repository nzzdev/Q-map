// this implements parts of https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0

const defaults = {
  stroke: '#0084c7',
  'stroke-width': 2,
  'stroke-opacity': 1,
  fill: '#66b5dd',
  'fill-opacity': 1
};

const mapping = {
  'stroke': 'color',
  'stroke-width': 'weight',
  'stroke-opacity': 'opacity',
  'fill': 'fillColor',
  'fill-opacity': 'fillOpacity'
};

function simplestyleToLeafletStyle(properties) {
  for (let mappingProperty in mapping) {
    if (properties.hasOwnProperty(mappingProperty)) {
      properties[mapping[mappingProperty]] = properties[mappingProperty];
      delete properties[mappingProperty];
    } else {
      properties[mapping[mappingProperty]] = defaults[mappingProperty];
    }
  }
  return properties;
}

module.exports = simplestyleToLeafletStyle;
