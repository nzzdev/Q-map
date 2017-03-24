const resourcesDir = __dirname + '/../resources/';

const schema = require(resourcesDir + 'dynamicSchema.js');
const schemaString = JSON.stringify(schema);

module.exports = {
  method: 'GET',
  path: '/schema.json',
  handler: function(request, reply) {
    return reply(schemaString).type('application/json');
  }
};
