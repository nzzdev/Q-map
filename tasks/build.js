Builder = require('systemjs-builder');

const builder = new Builder('', 'jspm.config.js');

builder.config({
  map: {
    'systemjs-babel-build': 'jspm_packages/npm/systemjs-plugin-babel@0.0.20/systemjs-babel-node.js'
  },
  meta: {
    '*.js': {
      babelOptions: {
        // stage1: true,
      }
    }
  }
});

builder
  .bundle('q-map/map.js', 'bundles/slippy-map.js', { normalize: true, runtime: false, minify: false});
