const Hoek = require('hoek');
const server = require('./server.js');
const plugins = require('./server-plugins.js');
const routes = require('./routes/routes.js');

server.register(plugins, pluginsError => {
  Hoek.assert(!pluginsError, pluginsError);

  server.route(routes);

  server.start(err => {
    Hoek.assert(!err, err);
    /* eslint-disable */
    console.log('Server running at: ' + server.info.uri);
    /* eslint-enable */
  });
});
