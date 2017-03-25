const expect = require('chai').expect;
const simplestyleToLeafletStyle = require('../../helpers/simplestyleToLeafletStyle.js');

const properties = {
  'fill-opacity': 0.5
};

describe('simplestyle to leaflet path style transformation', function() {
  it('should translate all properties correctly', function() {
    let style = simplestyleToLeafletStyle(properties);
    expect(style.fillOpacity).to.be.equal(0.5);
  });

  it('should remove simplestyle properties after mapping', function() {
    let style = simplestyleToLeafletStyle(properties);
    expect(style.hasOwnProperty('fill-opacity')).to.be.equal(false);
  });

  it('should apply defaults for undefined simplestyle properties', function() {
    let style = simplestyleToLeafletStyle(properties);
    expect(style.color).to.be.equal('#0084c7');
    expect(style.fillColor).to.be.equal('#66b5dd');
    expect(style.opacity).to.be.equal(1);
  });
});
