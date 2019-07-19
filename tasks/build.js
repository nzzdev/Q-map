const fs = require("fs");
const crypto = require("crypto");

const Builder = require("systemjs-builder");
const builder = new Builder("", "jspm.config.js");

const sass = require("sass");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const createFixtureData = require("./createFixtureData.js");

const stylesDir = `${__dirname}/../styles_src/`;

builder.config({
  map: {
    "systemjs-babel-build":
      "jspm_packages/npm/systemjs-plugin-babel@0.0.20/systemjs-babel-node.js"
  }
});

function writeHashmap(hashmapPath, files, fileext) {
  const hashMap = {};
  files
    .map(file => {
      const hash = crypto.createHash("md5");
      hash.update(file.content, { encoding: "utf8" });
      file.hash = hash.digest("hex");
      return file;
    })
    .map(file => {
      hashMap[file.name] = `${file.name}.${file.hash.substring(
        0,
        8
      )}.${fileext}`;
    });

  fs.writeFileSync(hashmapPath, JSON.stringify(hashMap));
}

async function buildScripts() {
  return builder
    .bundle("q-map/map.js", {
      normalize: true,
      runtime: false,
      minify: true,
      mangle: false
    })
    .then(bundle => {
      const fileName = "slippy-map";
      fs.writeFileSync(`scripts/${fileName}.js`, bundle.source);
      return [
        {
          name: fileName,
          content: bundle.source
        }
      ];
    })
    .then(files => {
      writeHashmap("scripts/hashMap.json", files, "js");
    })
    .then(() => {
      /* eslint-disable */
      console.log("Build complete");
      /* eslint-enable */
      process.exit(0);
    })
    .catch(err => {
      /* eslint-disable */
      console.log("Build error", err);
      /* eslint-enable */
      process.exit(1);
    });
}

async function compileStylesheet(name) {
  return new Promise((resolve, reject) => {
    const filePath = stylesDir + `${name}.scss`;
    fs.exists(filePath, exists => {
      if (!exists) {
        reject(`stylesheet not found ${filePath}`);
        process.exit(1);
      }
      sass.render(
        {
          file: filePath,
          outputStyle: "compressed"
        },
        (err, sassResult) => {
          if (err) {
            reject(err);
          } else {
            postcss()
              .use(postcssImport)
              .use(autoprefixer)
              .use(cssnano)
              .process(sassResult.css, {
                from: `${stylesDir}${name}.css`
              })
              .then(prefixedResult => {
                if (prefixedResult.warnings().length > 0) {
                  console.log(`failed to compile stylesheet ${name}`);
                  process.exit(1);
                }
                resolve(prefixedResult.css);
              });
          }
        }
      );
    });
  });
}

async function buildStyles() {
  // compile styles
  const styleFiles = [
    {
      name: "default",
      content: await compileStylesheet("default")
    },
    {
      name: "mapbox",
      content: await compileStylesheet("mapbox")
    }
  ];

  styleFiles.map(file => {
    fs.writeFileSync(`styles/${file.name}.css`, file.content);
  });

  writeHashmap("styles/hashMap.json", styleFiles, "css");
}

// create fixture data
// if new fixture data is added here, they have to be added in fixture data route as well
function buildFixtures() {
  fs.writeFileSync(
    "resources/fixtures/data/basicPoint.json",
    JSON.stringify(createFixtureData.mapPoint())
  );
  fs.writeFileSync(
    "resources/fixtures/data/basicFeature.json",
    JSON.stringify(createFixtureData.mapFeature())
  );
  fs.writeFileSync(
    "resources/fixtures/data/basicFeatureCollection.json",
    JSON.stringify(createFixtureData.mapFeatureCollection())
  );
  fs.writeFileSync(
    "resources/fixtures/data/basicPoints.json",
    JSON.stringify(createFixtureData.mapPoints())
  );
  fs.writeFileSync(
    "resources/fixtures/data/basicFeatures.json",
    JSON.stringify(createFixtureData.mapFeatures())
  );
  fs.writeFileSync(
    "resources/fixtures/data/basicFeatureCollections.json",
    JSON.stringify(createFixtureData.mapFeatureCollections())
  );
  fs.writeFileSync(
    "resources/fixtures/data/pointsLabelsBelow.json",
    JSON.stringify(createFixtureData.mapPointsLabelsBelow())
  );
  fs.writeFileSync(
    "resources/fixtures/data/pointsLabelsBelowOneRow.json",
    JSON.stringify(createFixtureData.mapPointsLabelsBelowOneRow())
  );
  fs.writeFileSync(
    "resources/fixtures/data/pointsNoMinimap.json",
    JSON.stringify(createFixtureData.mapPointsNoMinimap())
  );
  fs.writeFileSync(
    "resources/fixtures/data/featuresManualMinimap.json",
    JSON.stringify(createFixtureData.mapFeaturesManualMinimap())
  );
  fs.writeFileSync(
    "resources/fixtures/data/baseLayerStreetFewLabels.json",
    JSON.stringify(createFixtureData.mapLayerStreetFew())
  );
  fs.writeFileSync(
    "resources/fixtures/data/baseLayerStreetNoLabels.json",
    JSON.stringify(createFixtureData.mapLayerStreetNo())
  );
  fs.writeFileSync(
    "resources/fixtures/data/baseLayerTerrain.json",
    JSON.stringify(createFixtureData.mapLayerTerrain())
  );
  fs.writeFileSync(
    "resources/fixtures/data/baseLayerAerial.json",
    JSON.stringify(createFixtureData.mapLayerAerial())
  );
  fs.writeFileSync(
    "resources/fixtures/data/showAcronym.json",
    JSON.stringify(createFixtureData.showAcronym())
  );
  fs.writeFileSync(
    "resources/fixtures/data/dontShowAcronym.json",
    JSON.stringify(createFixtureData.dontShowAcronym())
  );
  fs.writeFileSync(
    "resources/fixtures/data/antimeridian.json",
    JSON.stringify(createFixtureData.antimeridian())
  );
  fs.writeFileSync(
    "resources/fixtures/data/labelPlacementTypePointHeavyLabel.json",
    JSON.stringify(createFixtureData.labelPlacementTypePointHeavyLabel())
  );
  fs.writeFileSync(
    "resources/fixtures/data/labelPlacementTypePointLightLabel.json",
    JSON.stringify(createFixtureData.labelPlacementTypePointLightLabel())
  );
  fs.writeFileSync(
    "resources/fixtures/data/labelPlacementTypeEvent.json",
    JSON.stringify(createFixtureData.labelPlacementTypeEvent())
  );
}

Promise.all([buildScripts(), buildStyles(), buildFixtures()])
  .then(res => {
    console.log("build complete");
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
