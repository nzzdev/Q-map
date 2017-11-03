module.exports = [
  require('./rendering-info/html-js.js'),
  require('./dynamic-enum.js'),
  require('./option-availability.js'),
  require('./stylesheet.js'),
  require('./locales.js'),
  require('./health.js')
].concat(require('./scripts.js'), require('./schema.js'));
