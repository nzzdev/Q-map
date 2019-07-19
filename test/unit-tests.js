const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const simplestyleToLeafletStyle = require("../helpers/simplestyleToLeafletStyle.js");

const lab = (exports.lab = Lab.script());
const expect = Code.expect;
const it = lab.it;

const properties = {
  "fill-opacity": 0.5
};

let style = simplestyleToLeafletStyle(properties, "Polygon");

lab.experiment("simplestyle to leaflet path style transformation", () => {
  it("should translate all properties correctly", () => {
    expect(style.fillOpacity).to.be.equal(0.5);
  });

  it("should remove simplestyle properties after mapping", () => {
    expect(style.hasOwnProperty("fill-opacity")).to.be.equal(false);
  });

  it("should apply defaults for undefined simplestyle properties", () => {
    expect(style.weight).to.be.equal(0);
    expect(style.fillColor).to.be.equal("#c31906");
  });
});
