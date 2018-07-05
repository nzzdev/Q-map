const points = require("./features.js").points;
const features = require("./features.js").features;

function createMapPoint() {
  const item = {
    title:
      "FIXTURE: basic map with one point (top/heavyLabel) and default options",
    subtitle: "subtitle",
    sources: [],
    notes: "Standardfall: Karte mit einem Punkt",
    acronym: "abc",
    geojsonList: [points.bucharestHeavyTop],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  return item;
}

function createMapFeature() {
  const item = {
    title:
      "FIXTURE: basic map with one feature (line string two points) and default options",
    subtitle: "subtitle",
    sources: [],
    notes: "Eine Linie verbindet zwei Punkte",
    acronym: "abc",
    geojsonList: [features.lineSofiaBucharest],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  return item;
}

function createMapFeatureCollection() {
  const item = {
    title:
      "FIXTURE: basic map with one feature collection (two polygons) and default options",
    subtitle: "subtitle",
    sources: [],
    notes: "Zwei Polygone stehen im Raum",
    acronym: "abc",
    geojsonList: [
      {
        type: "FeatureCollection",
        features: [features.orangePolygon, features.greenPolygon]
      }
    ],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  return item;
}

function createMapPoints() {
  const item = {
    title:
      "FIXTURE: basic map with 10 points (all label options) and default options",
    subtitle: "subtitle",
    sources: [],
    notes: "Karte mit mehreren Punkten",
    acronym: "abc",
    geojsonList: [],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  Object.keys(points).forEach(point => {
    item.geojsonList.push(points[point]);
  });
  return item;
}

function createMapPointsLabelsBelow() {
  const item = createMapPoints();
  item.title =
    "FIXTURE: map labels below map with 10 points (all label options)";
  item.subtitle = "subtitle";
  item.options.labelsBelowMap = true;
  return item;
}

function createMapPointsLabelsBelowOneRow() {
  const item = createMapPoints();
  item.title =
    "FIXTURE: map labels below map in one row with 10 points (all label options)";
  item.subtitle = "subtitle";
  item.options.labelsBelowMap = true;
  item.options.labelsBelowMapOneRow = true;
  return item;
}

function createMapFeatures() {
  const item = {
    title: "FIXTURE: basic map with several features and default options",
    subtitle: "subtitle",
    sources: [],
    notes: "Linien und Polygone",
    acronym: "abc",
    geojsonList: [],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  Object.keys(features).forEach(feature => {
    item.geojsonList.push(features[feature]);
  });
  return item;
}

function createMapFeatureCollections() {
  const item = {
    title:
      "FIXTURE: basic map with two feature collections and default options",
    subtitle: "subtitle",
    sources: [],
    notes: "Zwei Polygone stehen im Raum und zwei Linien dazu",
    acronym: "abc",
    geojsonList: [
      {
        type: "FeatureCollection",
        features: [features.orangePolygon, features.greenPolygon]
      },
      {
        type: "FeatureCollection",
        features: [features.lineSarajevoZagreb, features.lineTiranaYerevan]
      }
    ],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  return item;
}

function createMapPointsNoMinimap() {
  const item = createMapPoints();
  item.title = "FIXTURE: map with 10 points and no minimap";
  item.subtitle = "subtitle";
  item.options.minimap = false;
  return item;
}

function createMapFeaturesMinimapManual() {
  const item = createMapFeatures();
  item.title =
    "FIXTURE: map with several features and manuel zoom level and zoom offset minimap";
  item.subtitle = "subtitle";
  item.options.initialZoomLevel = 6;
  item.options.minimapInitialZoomOffset = -5;
  return item;
}

function createMapLayerStreetsFew() {
  const item = createMapPoint(); // change as it fits your needs to other feature(s)
  item.title = "FIXTURE: map with base layer streets with few labels";
  item.subtitle = "subtitle";
  item.options.baseLayer = "streetsFewLabels";
  return item;
}

function createMapLayerStreetsNo() {
  const item = createMapPoint(); // change as it fits your needs to other feature(s)
  item.title = "FIXTURE: map with base layer streets without labels";
  item.subtitle = "subtitle";
  item.options.baseLayer = "streetsNoLabels";
  return item;
}

function createMapLayerTerrain() {
  const item = createMapPoint(); // change as it fits your needs to other feature(s)
  item.title = "FIXTURE: map with base layer terrain";
  item.subtitle = "subtitle";
  item.options.baseLayer = "terrain";
  return item;
}

function createMapLayerAerial() {
  const item = createMapPoint(); // change as it fits your needs to other feature(s)
  item.title = "FIXTURE: map with base layer aerial";
  item.subtitle = "subtitle";
  item.options.baseLayer = "aerial";
  return item;
}

function showAcronym() {
  const item = {
    title:
      "FIXTURE: show acronym if one of sources, notes, and geojson feature or a feature collection is present",
    subtitle: "subtitle",
    sources: [],
    notes: "",
    acronym: "abc",
    geojsonList: [
      {
        type: "FeatureCollection",
        features: [features.orangePolygon, features.greenPolygon]
      }
    ],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  return item;
}

function dontShowAcronym() {
  const item = {
    title:
      "FIXTURE: don't show acronym if sources, notes are not defined or only point features are present",
    subtitle: "subtitle",
    sources: [],
    notes: "",
    acronym: "abc",
    geojsonList: [points.bucharestHeavyTop],
    options: {
      baseLayer: "streets",
      initialZoomLevel: -1,
      minimapInitialZoomOffset: 0,
      minimap: true,
      labelsBelowMap: false,
      showLegend: true
    }
  };
  return item;
}

module.exports = {
  mapPoint: createMapPoint,
  mapFeature: createMapFeature,
  mapFeatureCollection: createMapFeatureCollection,
  mapPoints: createMapPoints,
  mapFeatures: createMapFeatures,
  mapFeatureCollections: createMapFeatureCollections,
  mapPointsLabelsBelow: createMapPointsLabelsBelow,
  mapPointsLabelsBelowOneRow: createMapPointsLabelsBelowOneRow,
  mapPointsNoMinimap: createMapPointsNoMinimap,
  mapFeaturesManualMinimap: createMapFeaturesMinimapManual,
  mapLayerStreetFew: createMapLayerStreetsFew,
  mapLayerStreetNo: createMapLayerStreetsNo,
  mapLayerTerrain: createMapLayerTerrain,
  mapLayerAerial: createMapLayerAerial,
  showAcronym: showAcronym,
  dontShowAcronym: dontShowAcronym
};
