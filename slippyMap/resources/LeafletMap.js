import Leaflet from "leaflet";
import LeafletControlButton from "./LeafletControlButton.js";
import MiniMap from "leaflet-minimap";

import enableInteractionSvg from "../icons/enable-interaction.svg!text";

import geoJsonOptions from "./geoJsonOptions.js";

Leaflet.Control.Button = L.Control.extend(LeafletControlButton);
Leaflet.Icon.Default.imagePath = "jspm_packages/npm/leaflet@1.2.0/dist/images";

export default class LeafletMap {
  map;
  markers = [];
  featureGroup = new Leaflet.FeatureGroup();

  constructor(toolRuntimeConfig) {
    this.toolRuntimeConfig = toolRuntimeConfig;
  }

  render(item, element) {
    this.item = item;
    this.element = element;
    return new Promise((resolve, reject) => {
      if (!this.map) {
        this.init(item, element);
      }

      // add all the features that have `useForInitialView: true`
      // they get added to this.featureGroup and thus used to calculate the map view
      let geoJsonOptionsForInitialView = Object.assign({}, geoJsonOptions, {
        filter: feature => {
          return feature.properties.useForInitialView === true;
        }
      });
      try {
        item.geojsonList.forEach(geojson => {
          L.geoJSON(geojson, geoJsonOptionsForInitialView)
            .addTo(this.map)
            .getLayers()
            .forEach(layer => {
              this.featureGroup.addLayer(layer);
            });
        });
      } catch (e) {
        // nevermind and just don't show them features
      }

      // add all the features without `useForInitialView: true` property
      // they are not added to featureGroup, thus not used to calculate the initial view
      let geoJsonOptionsOthers = Object.assign({}, geoJsonOptions, {
        filter: feature => {
          return feature.properties.useForInitialView !== true;
        }
      });

      try {
        item.geojsonList.forEach(geojson => {
          L.geoJSON(geojson, geoJsonOptionsOthers).addTo(this.map);
        });
      } catch (e) {
        // nevermind and just don't show them features
      }

      this.invalidateSize();
      resolve(this.map);
    });
  }

  hasPolygonsOrLineStrings(item) {
    const types = ["Polygon", "MultiPolygon", "LineString", "MultiLineString"];
    try {
      return (
        item.geojsonList
          .reduce((features, geojson) => {
            if (geojson.type === "FeatureCollection") {
              features = features.concat(geojson.features);
            } else {
              features.concat(geojson);
            }
            return features;
          }, [])
          .filter(geojson => {
            return types.indexOf(geojson.geometry.type) > -1;
          }).length > 0
      );
    } catch (e) {
      return false;
    }
  }

  shouldAllowInteraction() {
    return (
      this.toolRuntimeConfig.displayOptions &&
      this.toolRuntimeConfig.displayOptions.allowInteraction === true
    );
  }

  // initialises the map, this is only run once
  init(item, element) {
    if (this.map && this.map.getContainer() === element) {
      return;
    }

    if (
      this.toolRuntimeConfig.baseLayer.logo &&
      this.toolRuntimeConfig.baseLayer.logo.markup
    ) {
      element.insertAdjacentHTML(
        "afterbegin",
        this.toolRuntimeConfig.baseLayer.logo.markup
      );
    }

    this.map = Leaflet.map(element, {
      zoomControl: false
    });

    let layerMode = "default";
    if (this.hasPolygonsOrLineStrings(item)) {
      layerMode = "withSeparateLabelsLayer";
    }

    this.setLayers(this.toolRuntimeConfig.baseLayer, layerMode);
    this.setMaxMinZoom();

    this.map.attributionControl.setPrefix("");

    Leaflet.control
      .scale({
        imperial: false
      })
      .addTo(this.map);

    if (this.shouldAllowInteraction()) {
      this.enableInteractionButton = new Leaflet.Control.Button({
        position: "topleft",
        className: "q-enable-leaflet-interaction-button",
        html: `${enableInteractionSvg}`
      });
    }

    this.zoomControl = Leaflet.control.zoom({
      position: "topleft"
    });

    let w = 1;
    let h = 1;
    if (element.getBoundingClientRect) {
      let rect = element.getBoundingClientRect();
      if (rect && rect.width && rect.width > 450) {
        w = 16;
        h = 9;
      }
    }
    this.disableInteractions(this.map);

    try {
      this.setAspectRatio(w, h);
    } catch (e) {
      // ignore
    }
  }

  addTileLayer(url, config, containerClass) {
    if (!url) {
      throw new Error("no tile layer url given");
    }
    this.baseLayer = Leaflet.tileLayer(url, config).addTo(this.map);
    this.map.getContainer().classList.add(containerClass);
  }

  setLayers(layer, mode = "default") {
    this.map.whenReady(() => {
      if (mode === "default") {
        let url;
        if (typeof layer.url === "object") {
          url = layer.url.full;
        } else {
          url = layer.url;
        }
        this.addTileLayer(url, layer.config, layer.containerClass);
      } else if (mode === "withSeparateLabelsLayer") {
        this.map.createPane("labels");
        if (typeof layer.url === "string") {
          this.addTileLayer(layer.url, layer.config, layer.containerClass);
        } else if (typeof layer.url === "object") {
          this.addTileLayer(
            layer.url.background,
            layer.config,
            layer.containerClass
          );

          let labelsLayerConfig = JSON.parse(JSON.stringify(layer.config));
          labelsLayerConfig.pane = "labels";
          this.addTileLayer(
            layer.url.labels,
            labelsLayerConfig,
            layer.containerClass
          );
        }
      }
      // set the sophie font class to the attribution control to not repeat it in css
      this.map
        .getContainer()
        .querySelector(".leaflet-control-attribution")
        .classList.add("s-font-note-s");
    });
    if (layer.minimapLayerUrl) {
      this.tileLayerMiniMap = Leaflet.tileLayer(layer.minimapLayerUrl, {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
    }
  }

  setZoomLevel(value) {
    this.zoomLevel = value;
  }

  setMinimapVisibility(visible) {
    this.map.whenReady(() => {
      if (this.miniMap) {
        this.miniMap.remove();
      }
      if (visible) {
        let zoomOffset = -5;
        if (
          this.item.options.hasOwnProperty("minimapInitialZoomOffset") &&
          this.item.options.minimapInitialZoomOffset !== 0
        ) {
          zoomOffset = this.item.options.minimapInitialZoomOffset;
        }

        if (this.minimapZoomLevelFixed === undefined) {
          this.minimapZoomLevelFixed = this.map.getZoom() + zoomOffset;
        }

        this.miniMap = new MiniMap(this.tileLayerMiniMap, {
          width: 100,
          height: 100,
          toggleDisplay: false,
          zoomLevelFixed: this.minimapZoomLevelFixed,
          aimingRectOptions: {
            color: "#000000",
            fillOpacity: 0,
            weight: 1,
            interactive: false
          },
          shadowRectOptions: {
            color: "transparent",
            weight: 1,
            interactive: false
          }
        });
        this.miniMap.addTo(this.map);
      }
    }, this);
  }

  setMaxMinZoom() {
    let maxZoom;
    if (this.getZoomLevelForCurrentAspectRatio() !== -1) {
      maxZoom = this.map.getZoom() + 3;
    }
    if (
      !maxZoom ||
      maxZoom > (this.toolRuntimeConfig.baseLayer.maxZoom || 18)
    ) {
      maxZoom = this.toolRuntimeConfig.baseLayer.maxZoom || 18;
    }
    this.map.options.maxZoom = maxZoom;
    this.map.options.minZoom = 1;
  }

  // this function sets the zoom and position of the map based on a bounding box around all the features in featureGroup
  // if only one feature is available, the zoomLevel is set to the default of 9 if it's not overwritten by options
  setZoomAndPositionInitial(
    animate = false,
    setDefaultPositionAndZoomIfNoMarkers = false
  ) {
    let moveFunctions = {
      bounds: "fitBounds",
      center: "setView"
    };
    if (animate) {
      moveFunctions = {
        bounds: "flyToBounds",
        center: "flyTo"
      };
    }
    const featureGroupBounds = this.featureGroup.getBounds();
    let featureGroupCenter;
    if (featureGroupBounds && featureGroupBounds.isValid()) {
      featureGroupCenter = featureGroupBounds.getCenter();
    }
    if (featureGroupBounds && featureGroupCenter) {
      // reset max and min zoom to have all freedom for fitBounds
      this.map.options.minZoom = 1;
      this.map.options.maxZoom = 18;
      if (this.toolRuntimeConfig.baseLayer.maxZoom) {
        this.map.options.maxZoom = this.toolRuntimeConfig.baseLayer.maxZoom;
      }

      let zoomLevel = this.getZoomLevelForCurrentAspectRatio();
      if (zoomLevel === -1 && this.featureGroup.getLayers().length > 1) {
        this.map[moveFunctions.bounds](featureGroupBounds.pad(0.25));
      } else if (zoomLevel !== undefined) {
        // default zoom level when only one feature is 9
        if (zoomLevel === -1) {
          zoomLevel = 9;
        }

        if (featureGroupCenter) {
          this.map[moveFunctions.center](featureGroupCenter, zoomLevel);
        }
      }
    } else if (setDefaultPositionAndZoomIfNoMarkers) {
      // set default pos and zoom if no markers available to zurich center
      this.map.setView([47.365, 8.547], 13);
    }
    this.setMaxMinZoom();
  }

  disableInteractions() {
    this.map.boxZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.dragging.disable();
    this.map.scrollWheelZoom.disable();
    this.map.touchZoom.disable();

    if (this.map.tap) {
      this.map.tap.disable();
    }

    this.zoomControl.remove();

    if (this.shouldAllowInteraction()) {
      this.enableInteractionButton.addTo(this.map);

      this.enableInteractionButton
        .getContainer()
        .addEventListener("click", event => {
          this.enableInteraction();
          let enableInteractionEvent = new CustomEvent(
            "q-map-enableInteraction",
            {
              bubbles: true
            }
          );
          this.element.parentNode.dispatchEvent(enableInteractionEvent);
        });
    }
  }

  enableInteraction() {
    this.map.boxZoom.enable();
    this.map.doubleClickZoom.enable();
    this.map.dragging.enable();
    this.map.scrollWheelZoom.enable();
    this.map.touchZoom.enable();

    if (this.map.tap) {
      this.map.tap.enable();
    }

    this.enableInteractionButton.remove();
    this.zoomControl.addTo(this.map);

    this.resetInteractionTimeout();
    this.map.on("zoomstart", this.resetInteractionTimeout.bind(this));
    this.map.on("movestart", this.resetInteractionTimeout.bind(this));
  }

  resetInteractionTimeout() {
    if (this.interactionTimer) {
      clearTimeout(this.interactionTimer);
    }
    this.interactionTimer = setTimeout(() => {
      this.setZoomAndPositionInitial(true);
      this.disableInteractions();
    }, this.toolRuntimeConfig.interactionDisableTime);
  }

  setAspectRatio(w, h) {
    let container = this.map.getContainer();
    container.style.height = `${container.offsetWidth * (h / w)}px`;

    if (this.aspectRatio !== w / h) {
      this.aspectRatio = w / h;
    }
  }

  getZoomLevelForCurrentAspectRatio() {
    // if zoomLevel is not -1, we want to show zoomLevel - 1 for maps that have an aspectRatio smaller than 16:9 (the default for large maps)
    if (
      this.zoomLevel !== -1 &&
      this.aspectRatio < 16 / 9 &&
      this.zoomLevel > 1
    ) {
      return this.zoomLevel - 1;
    }
    return this.zoomLevel;
  }

  invalidateSize() {
    this.map.invalidateSize();
    this.setZoomAndPositionInitial(false);
  }
}
