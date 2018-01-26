const fs = require("fs");
const resourcesDir = __dirname + "/../resources/";

const layerConfigs = JSON.parse(process.env.LAYER_CONFIGS);
const schema = JSON.parse(
  fs.readFileSync(resourcesDir + "schema.json", { encoding: "utf-8" })
);

schema.properties.options.properties.baseLayer.enum = Object.keys(layerConfigs);
schema.properties.options.properties.baseLayer.default = Object.keys(
  layerConfigs
)[0];
schema.properties.options.properties.baseLayer[
  "Q:options"
].enum_titles = Object.keys(layerConfigs).map(name => layerConfigs[name].label);

module.exports = schema;
