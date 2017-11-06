const expect = require('chai').expect;
const simplestyleToLeafletStyle = require('../../helpers/simplestyleToLeafletStyle.js');

const properties = {
  'fill-opacity': 0.5
};

let style = simplestyleToLeafletStyle(properties, 'Polygon');

describe('simplestyle to leaflet path style transformation', function() {
  it('should translate all properties correctly', function() {
    expect(style.fillOpacity).to.be.equal(0.5);
  });

  it('should remove simplestyle properties after mapping', function() {
    expect(style.hasOwnProperty('fill-opacity')).to.be.equal(false);
  });

  it('should apply defaults for undefined simplestyle properties', function() {
    expect(style.weight).to.be.equal(0);
    expect(style.fillColor).to.be.equal('#c31906');
  });
});
