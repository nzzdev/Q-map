const fixtureDataDirectory = "../../resources/fixtures/data";

// provide every fixture data file present in ../../resources/fixtures/data
// has to be in sync with files created in build task - see ../../tasks/build.js
const fixtureData = [
  require(`${fixtureDataDirectory}/basicPoint.json`),
  require(`${fixtureDataDirectory}/basicFeature.json`),
  require(`${fixtureDataDirectory}/basicFeatureCollection.json`),
  require(`${fixtureDataDirectory}/basicPoints.json`),
  require(`${fixtureDataDirectory}/basicFeatures.json`),
  require(`${fixtureDataDirectory}/basicFeatureCollections.json`),
  require(`${fixtureDataDirectory}/pointsLabelsBelow.json`),
  require(`${fixtureDataDirectory}/pointsLabelsBelowOneRow.json`),
  require(`${fixtureDataDirectory}/pointsNoMinimap.json`),
  require(`${fixtureDataDirectory}/featuresManualMinimap.json`),
  require(`${fixtureDataDirectory}/baseLayerStreetFewLabels.json`),
  require(`${fixtureDataDirectory}/baseLayerStreetNoLabels.json`),
  require(`${fixtureDataDirectory}/baseLayerTerrain.json`),
  require(`${fixtureDataDirectory}/baseLayerAerial.json`),
  require(`${fixtureDataDirectory}/showAcronym.json`),
  require(`${fixtureDataDirectory}/dontShowAcronym.json`),
  require(`${fixtureDataDirectory}/antimeridian.json`),
  require(`${fixtureDataDirectory}/labelPlacementTypePointHeavyLabel.json`),
  require(`${fixtureDataDirectory}/labelPlacementTypePointLightLabel.json`),
  require(`${fixtureDataDirectory}/labelPlacementTypeEvent.json`)
];

module.exports = {
  path: "/fixtures/data",
  method: "GET",
  options: {
    tags: ["api"],
  },
  handler: (request, h) => {
    return fixtureData;
  }
};
