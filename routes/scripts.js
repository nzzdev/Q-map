const Builder = require('systemjs-builder');

function getCompiledSlippyMap() {
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
  return builder.bundle('q-map/map.js', { normalize: true, runtime: false, minify: false})
    .then(output => {
      return output.source;
    });
}

const slippyMapSource = getCompiledSlippyMap();

module.exports = [
  {
    method: 'GET',
    path: '/script/slippy-map.js',
    handler: async function(request, reply) {
      try {
        slippyMap = await slippyMapSource;
        return reply(slippyMap).type('text/javascipt');
      } catch (e) {
        return Boom.notFound();
      }
    },
    config: {
      cors: true
    }
  },
  {
    method: 'GET',
    path: '/script/system.js',
    handler: function(request, reply) {
      reply.file(__dirname + '/../node_modules/systemjs/dist/system-production.src.js');
    }
  }
];

