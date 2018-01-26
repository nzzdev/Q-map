const Hapi = require("hapi");

const hapiOptions = {
  port: process.env.PORT || 3000
};

module.exports = new Hapi.Server(hapiOptions);
