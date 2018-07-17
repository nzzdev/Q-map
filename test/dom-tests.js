const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Lab = require("lab");
const Code = require("code");
const lab = (exports.lab = Lab.script());

const expect = Code.expect;
const it = lab.it;

const mockData = require("./resources/mock-data");
require("svelte/ssr/register");
const staticTpl = require("../views/HtmlJs.html");
const renderingData = Object.assign(
  {
    toolRuntimeConfig: {
      displayOptions: {}
    }
  },
  mockData
);
const markup = staticTpl.render(renderingData);

function getElement(selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  });
}

lab.experiment("Q map dom tests", () => {
  it("should have a correct title element", () => {
    return getElement(".s-q-item__title").then(element => {
      expect(element.innerHTML).to.be.equal("My Q map");
    });
  });

  it("should have a correct subtitle element", () => {
    return getElement(".s-q-item__subtitle").then(element => {
      expect(element.innerHTML).to.be.equal("subtitle");
    });
  });

  it("should have a correct footer element", () => {
    return getElement(".s-q-item__footer span:last-child").then(element => {
      expect(element.innerHTML).to.be.equal("notes in footer");
    });
  });
});
