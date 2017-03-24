const fs = require('fs');
const sass = require('node-sass');
const Boom = require('boom');

const postcss = require('postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const stylesDir = __dirname + '/../styles/';

module.exports = {
  method: 'GET',
  path: '/stylesheet/{name*}',
  handler: function(request, reply) {
    const filePath = `${stylesDir}${request.params.name}.scss`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        return reply(Boom.notFound());
      }
      sass.render(
        {
          file: filePath,
          includePaths: [__dirname + '/../jspm_packages/npm'],
          outputStyle: 'compressed'
        },
        (err, sassResult) => {
          if (err) {
            reply(Boom.badImplementation(err));
          } else {
            postcss()
              .use(postcssImport)
              .use(autoprefixer)
              .use(cssnano)
              .process(sassResult.css, {
                from: `${stylesDir}${request.params.name}.css`
              })
              .then(postcssResult => {
                reply(postcssResult.css).type('text/css');
              });
          }
        }
      );
    });
  }
};
