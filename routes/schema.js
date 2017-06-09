const resourcesDir = __dirname + '/../resources/';

const schema = require(resourcesDir + 'dynamicSchema.js');
const schemaString = JSON.stringify(schema);

module.exports = [
  {
    method: 'GET',
    path: '/schema.json',
    handler: function(request, reply) {
      return reply(schemaString).type('application/json');
    }
  },
  {
    method: 'GET',
    path: '/display-options-schema.json',
    handler: function(request, reply) {
      reply.file(resourcesDir + 'display-options-schema.json');
    }
  }
];
