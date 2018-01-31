const fs = require("fs");

async function getConfig() {
  let env;
  try {
    // needs a json file 'env' defining map ids and mapbox tokens per target.
    env = JSON.parse(fs.readFileSync("./env.json"));
  } catch (err) {
    console.log(err);
    // nevermind
  }

  const config = {
    nzz_ch: {
      additionalRenderingInfo: {
        // additionalRenderingInfo is tool based
        stylesheets: [
          {
            url:
              "https://service.sophie.nzz.ch/bundle/sophie-q@1,sophie-font@1,sophie-color@1,sophie-viz-color@1,sophie-input@1.css"
          }
        ]
      },
      context: {
        // context is target based
        stylesheets: [
          {
            url: "https://context-service.st.nzz.ch/stylesheet/all/nzz.ch.css"
          }
        ],
        background: {
          color: "#fff"
        }
      },
      toolRuntimeConfig: {}
    },
    nzzas: {
      additionalRenderingInfo: {
        stylesheets: [
          {
            url:
              "https://service.sophie.nzz.ch/bundle/sophie-nzzas-q@1,sophie-nzzas-font@1,sophie-nzzas-color@1,sophie-nzzas-viz-color@1,sophie-nzzas-input@1.css"
          }
        ]
      },
      context: {
        stylesheets: [
          {
            url:
              "https://context-service.st.nzz.ch/stylesheet/all/nzzas.nzz.ch.css"
          }
        ],
        background: {
          color: "#fff"
        }
      },
      toolRuntimeConfig: {}
    }
  };

  if (env && env.mapIds && env.mapboxTokens) {
    const mapIds = env.mapIds;
    const mapboxTokens = env.mapboxTokens;
    const target = process.env.TARGET || "nzz_ch";
    config[target].toolRuntimeConfig.layerConfigs = {
      streets: {
        label: "Strassenkarte",
        url: {
          full: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].standard.full
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
          background: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].standard.background
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
          labels: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].standard.labels
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`
        },
        minimapLayerUrl: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].standard.full
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        config: {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &amp; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        logo: {
          markup:
            '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank" style="z-index: 10;">Mapbox</a>',
          stylesheet: {
            name: "mapbox"
          }
        },
        containerClass: "with-base-layer-streets",
        maxZoom: 18
      },
      streetsFewLabels: {
        label: "Strassenkarte wenig Labels",
        url: {
          full: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].lessLabels.full
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
          background: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].lessLabels.background
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
          labels: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].lessLabels.labels
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`
        },
        minimapLayerUrl: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].lessLabels.full
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        config: {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &amp; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        logo: {
          markup:
            '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank" style="z-index: 10;">Mapbox</a>',
          stylesheet: {
            name: "mapbox"
          }
        },
        containerClass: "with-base-layer-streets",
        maxZoom: 18
      },
      streetsNoLabels: {
        label: "Strassenkarte ohne Labels",
        url: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].standard.background
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        minimapLayerUrl: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].standard.background
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        config: {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &amp; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        logo: {
          markup:
            '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank" style="z-index: 10;">Mapbox</a>',
          stylesheet: {
            name: "mapbox"
          }
        },
        containerClass: "with-base-layer-streets",
        maxZoom: 18
      },
      terrain: {
        label: "Terrain",
        url: {
          full: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].terrain.full
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
          background: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].terrain.background
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
          labels: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
            mapIds[target].terrain.labels
          }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`
        },
        minimapLayerUrl: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].terrain.full
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        config: {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &amp; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        logo: {
          markup:
            '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank" style="z-index: 10;">Mapbox</a>',
          stylesheet: {
            name: "mapbox"
          }
        },
        containerClass: "with-base-layer-streets",
        maxZoom: 18
      },
      terrainNoLabels: {
        label: "Terrain ohne Labels",
        url: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].terrain.background
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        minimapLayerUrl: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].terrain.background
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        config: {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &amp; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        logo: {
          markup:
            '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank" style="z-index: 10;">Mapbox</a>',
          stylesheet: {
            name: "mapbox"
          }
        },
        containerClass: "with-base-layer-streets",
        maxZoom: 18
      },
      aerial: {
        label: "Satellit",
        url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${
          mapboxTokens[target]
        }`,
        minimapLayerUrl: `https://api.mapbox.com/styles/v1/neuezuercherzeitung/${
          mapIds[target].standard.full
        }/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxTokens[target]}`,
        config: {
          attribution:
            '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        },
        logo: {
          markup:
            '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank" style="z-index: 10;">Mapbox</a>',
          stylesheet: {
            name: "mapbox"
          }
        },
        containerClass: "with-base-layer-aerial",
        maxZoom: 17
      }
    };
  }
  return config;
}

module.exports = getConfig;
