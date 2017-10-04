const localesDir = __dirname + '/../resources/locales/';

module.exports = {
  method: 'GET',
  path: '/locales/{lng}/translation.json',
  config: {
    cache: false
  },
  handler: function(request, reply) {
    reply.file(localesDir + request.params.lng + '/translation.json').type('application/json');
  }
};
