const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const expect = require('chai').expect;

const mockData = require('./resources/mock-data');
require('svelte/ssr/register');
const staticTpl = require('../views/HtmlJs.html');
const renderingData = Object.assign({
  toolRuntimeConfig: {
    displayOptions: {}
  }
}, mockData);
const markup = staticTpl.render(renderingData);


function getElement(selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  });
}

describe('Q map dom tests', function() {
  it('should have a correct title element', function() {
    return getElement('.s-q-item__title').then(element => {
      expect(element.innerHTML).to.be.equal('My Q map');
    });
  });

  it('should have a correct footer element', function() {
    return getElement('.s-q-item__footer span:last-child').then(element => {
      expect(element.innerHTML).to.be.equal('notes in footer');
    });
  });
});
