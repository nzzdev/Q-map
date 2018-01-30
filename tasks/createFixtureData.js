const points = require("./features.js").points;
const features = require("./features.js").features;

function createMapPoint() {
  const item = {
    title:
      "FIXTURE: basic map with one point (top/heavyLabel) and default options",
    sources: [],
    notes: "Standardfall: Karte mit einem Punkt",
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
    sources: [],
    notes: "Eine Linie verbindet zwei Punkte",
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
    sources: [],
    notes: "Zwei Polygone stehen im Raum",
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
    sources: [],
    notes: "Karte mit mehreren Punkten",
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
  item.options.labelsBelowMap = true;
  return item;
}

function createMapPointsLabelsBelowOneRow() {
  const item = createMapPoints();
  item.title =
    "FIXTURE: map labels below map in one row with 10 points (all label options)";
  item.options.labelsBelowMap = true;
  item.options.labelsBelowMapOneRow = true;
  return item;
}

function createMapFeatures() {
  const item = {
    title: "FIXTURE: basic map with several features and default options",
    sources: [],
    notes: "Linien und Polygone",
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
    sources: [],
    notes: "Zwei Polygone stehen im Raum und zwei Linien dazu",
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
  item.options.minimap = false;
  return item;
}

function createMapFeaturesMinimapManual() {
  const item = createMapFeatures();
  item.title =
    "FIXTURE: map with several features and manuel zoom level and zoom offset minimap";
  item.options.initialZoomLevel = 6;
  item.options.minimapInitialZoomOffset = -5;
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
  mapFeaturesManualMinimap: createMapFeaturesMinimapManual
};
