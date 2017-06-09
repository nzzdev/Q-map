const JsDom = require('jsdom');
const expect = require('chai').expect;

const mockData = require('./resources/mock-data');
require('svelte/ssr/register');
const staticTpl = require('../views/html-js.html');
const renderingData = {
  item: mockData,
  toolRuntimeConfig: {
    displayOptions: {}
  }
}
const markup = staticTpl.render(renderingData);


function getElement(selector) {
  return new Promise((resolve, reject) => {
    JsDom.env(
      markup,
      (err, window) => {
        resolve(window.document.querySelector(selector));
      });
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
