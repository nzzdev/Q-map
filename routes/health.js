module.exports = {
  path: "/health",
  method: "GET",
  config: {
    tags: ["api"]
  },
  handler: (request, reply) => {
    return reply("ok");
  }
};
