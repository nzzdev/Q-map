module.exports = [
  require('./rendering-info/html-js.js'),
  require('./option-availability.js'),
  require('./stylesheet.js'),
  require('./locales.js')
].concat(require('./scripts.js'), require('./schema.js'));
