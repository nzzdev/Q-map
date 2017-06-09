const Hoek = require('hoek');
const expect = require('chai').expect;
const server = require('../server.js');
const plugins = require('../server-plugins.js');
const routes = require('../routes/routes.js');

server.register(plugins, pluginsError => {
  Hoek.assert(!pluginsError, pluginsError);

  server.route(routes);

  server.start(serverError => {
    Hoek.assert(!serverError, serverError);
  });
});

describe('Q required API', () => {
  it('should return 200 for /schema.json', function(done) {
    server.inject('/schema.json', (res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('should return 200 for /stylesheet/default', function(done) {
    this.timeout(5000);
    server.inject('/stylesheet/default', (res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('should return 404 for inexistent stylesheet', function(done) {
    server.inject('/stylesheet/inexisting', (res) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});

const mockData = require('./resources/mock-data.js');

describe('rendering-info endpoints', () => {
  it('should return 400 for /rendering-info/html-js with missing toolBaseUrl in toolRuntimeConfig', function(done) {
    const request = {
      method: 'POST',
      url: '/rendering-info/html-js',
      payload: JSON.stringify({
        item: mockData
      })
    };
    server.inject(request, (res) => {
      expect(res.statusCode).to.be.equal(400);
      done();
    });
  });
  it('should return 200 for /rendering-info/html-js', function(done) {
    const request = {
      method: 'POST',
      url: '/rendering-info/html-js',
      payload: JSON.stringify({
        item: mockData,
        toolRuntimeConfig: {
          toolBaseUrl: 'http://localhost:3000',
          displayOptions: {}
        }
      })
    };
    server.inject(request, (res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });
});
