const server = require("./server.js");
const plugins = require("./server-plugins.js");
const routes = require("./routes/routes.js");

const start = async function() {
  await server.register(plugins);

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

start();

async function gracefullyStop() {
  console.log("stopping hapi server");
  try {
    await server.stop({ timeout: 10000 });
    console.log("hapi server stopped");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
}

// listen on SIGINT and SIGTERM signal and gracefully stop the server
process.on("SIGINT", gracefullyStop);
process.on("SIGTERM", gracefullyStop);
