const localesDir = __dirname + "/../resources/locales/";

module.exports = {
  method: "GET",
  path: "/locales/{lng}/translation.json",
  handler: function(request, h) {
    return h
      .file(localesDir + request.params.lng + "/translation.json")
      .type("application/json");
  }
};
