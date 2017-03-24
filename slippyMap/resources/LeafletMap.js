import Leaflet from 'leaflet';
import LeafletControlButton from './LeafletControlButton.js';
import MiniMap from 'leaflet-minimap';

import enableInteractionSvg from '../icons/enable-interaction.svg!text';

import geoJsonOptions from './geoJsonOptions.js';

Leaflet.Control.Button = L.Control.extend(LeafletControlButton);
Leaflet.Icon.Default.imagePath = 'jspm_packages/npm/leaflet@1.0.3/dist/images';

export default class LeafletMap {

  map;
  markers = [];
  featureGroup;

  currentLayerType;

  constructor(toolRuntimeConfig) {
    this.toolRuntimeConfig = toolRuntimeConfig;
  }

  render(item, element) {
    return new Promise((resolve, reject) => {
      if (!this.map) {
        this.init(element);
      }

      // add all the features that have no `useForInitialView: false` property set
      // they get added to this.featureGroup and thus used to calculate the map view
      let geoJsonOptionsMarkers = Object.assign({}, geoJsonOptions, {
        filter: feature => {
          return feature.properties.useForInitialView !== false;
        }
      });
      this.featureGroup = L.geoJSON(item.geojson, geoJsonOptionsMarkers).addTo(this.map);

      let geoJsonOptionsOthers = Object.assign({}, geoJsonOptions, {
        filter: feature => {
          return feature.properties.useForInitialView === false;
        }
      });
      L.geoJSON(item.geojson, geoJsonOptionsOthers).addTo(this.map);

      this.setZoomAndPositionInitial();
      this.invalidateSize();

      resolve(this.map);
    });
  }

  init(element) {
    if (!this.map || this.map.getContainer() !== element) {
      this.map = Leaflet.map(element, {
        'zoomControl': false
      });

      this.setLayers();
      this.setMaxMinZoom();

      this.map.attributionControl.setPrefix('');

      Leaflet.control.scale({
        imperial: false
      }).addTo(this.map);

      this.enableInteractionButton = new Leaflet.Control.Button({
        position: 'topleft',
        className: 'q-enable-leaflet-interaction-button',
        html: `${enableInteractionSvg}`
      });

      this.zoomControl = Leaflet.control.zoom({
        position: 'topleft'
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
  }

  addTileLayer(layerConfig) {
    this.baseLayer = Leaflet.tileLayer(layerConfig.url, layerConfig.config).addTo(this.map);
    this.map.getContainer().classList.add(layerConfig.containerClass);
  }

  setLayers() {
    this.map.whenReady(() => {
      this.addTileLayer(this.toolRuntimeConfig.baseLayer);
    });
    if (this.toolRuntimeConfig.baseLayer.minimapLayerUrl) {
      this.tileLayerMiniMap =
        Leaflet.tileLayer(this.toolRuntimeConfig.baseLayer.minimapLayerUrl, {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 8
        });
    }
  }

  setZoomLevel(value) {
    this.zoomLevel = value;
    this.setZoomAndPositionInitial();
  }

  setMinimapVisibility(visible) {
    this.map.whenReady(() => {
      if (this.miniMap) {
        this.miniMap.remove();
      }
      if (visible) {
        this.miniMap = new MiniMap(this.tileLayerMiniMap, {
          width: 100,
          height: 100,
          toggleDisplay: false,
          aimingRectOptions: {
            color: 'orange',
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
    if (this.getZoomLevelForCurrentAspectRatio() !== 'auto') {
      maxZoom = this.map.getZoom() + 3;
    }
    if (!maxZoom || maxZoom > (this.toolRuntimeConfig.baseLayer.maxZoom || 18)) {
      maxZoom = this.toolRuntimeConfig.baseLayer.maxZoom || 18;
    }
    this.map.options.maxZoom = maxZoom;
    this.map.options.minZoom = 1;
  }

  setZoomAndPositionInitial(animate = false, setDefaultPositionAndZoomIfNoMarkers = false) {
    let moveFunctions = {
      bounds: 'fitBounds',
      center: 'setView'
    };
    if (animate) {
      moveFunctions = {
        bounds: 'flyToBounds',
        center: 'flyTo'
      };
    }
    if (this.featureGroup) {
      // reset max and min zoom to have all freedom for fitBounds
      this.map.options.minZoom = 1;
      this.map.options.maxZoom = 18;
      if (this.toolRuntimeConfig.baseLayer.maxZoom) {
        this.map.options.maxZoom = this.toolRuntimeConfig.baseLayer.maxZoom;
      }

      let zoomLevel = this.getZoomLevelForCurrentAspectRatio();
      if (zoomLevel === 'auto' && this.featureGroup.getLayers().length > 1) {
        this.map[moveFunctions.bounds](this.getBoundsWithMargin(this.featureGroup.getBounds()));
      } else if (zoomLevel !== undefined) {
        // default zoom level when only one marker is 9
        if (zoomLevel === 'auto') {
          zoomLevel = 9;
        }

        if (this.featureGroup.getBounds() && this.featureGroup.getBounds().getCenter()) {
          this.map[moveFunctions.center](this.featureGroup.getBounds().getCenter(), zoomLevel);
        }
      }
    } else if (setDefaultPositionAndZoomIfNoMarkers) {
      // set default pos and zoom if no markers available to zurich center
      this.map.setView([47.365, 8.547], 13);
    }
    this.setMaxMinZoom();
  }

  // thanks to https://github.com/WSJ/pinpoint/blob/master/src/js/pinpoint.js
  getBoundsWithMargin(bounds) {
    // add an extra 25% margin to bounds
    const boundScaleFactor = 1 / 4;

    const hori = Math.abs( bounds.getSouthWest().lng - bounds.getNorthEast().lng ) * boundScaleFactor;
    const vert = Math.abs( bounds.getSouthWest().lat - bounds.getNorthEast().lat ) * boundScaleFactor;
    const southWest = {
      lat: bounds.getSouthWest().lat - vert,
      lng: bounds.getSouthWest().lng - hori
    };
    const northEast = {
      lat: bounds.getNorthEast().lat + vert,
      lng: bounds.getNorthEast().lng + hori
    };
    return L.latLngBounds(southWest, northEast);
  }

  disableInteractions() {
    this.map.dragging.disable();
    this.map.doubleClickZoom.disable();
    this.map.touchZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();

    this.map.getContainer().style.pointerEvents = 'none';

    this.zoomControl.remove();

    this.enableInteractionButton.addTo(this.map);
    this.setZoomAndPositionInitial(true);

    this.enableInteractionButton.getContainer().addEventListener('click', (event) => {
      this.enableInteraction();
    });
  }

  enableInteraction() {
    this.map.dragging.enable();
    this.map.doubleClickZoom.enable();
    this.map.touchZoom.enable();
    this.map.scrollWheelZoom.enable();
    this.map.boxZoom.enable();

    this.map.getContainer().style.pointerEvents = 'initial';

    this.enableInteractionButton.remove();
    this.zoomControl.addTo(this.map);

    this.resetInteractionTimeout();
    this.map.on('zoomstart', this.resetInteractionTimeout.bind(this));
    this.map.on('movestart', this.resetInteractionTimeout.bind(this));
  }

  resetInteractionTimeout() {
    if (this.interactionTimer) {
      clearTimeout(this.interactionTimer);
    }
    this.interactionTimer = setTimeout(this.disableInteractions.bind(this), this.toolRuntimeConfig.interactionDisableTime);
  }

  setAspectRatio(w, h) {
    let container = this.map.getContainer();
    container.style.height = container.offsetWidth * (h / w) + 'px';

    if (this.aspectRatio !== w / h) {
      this.aspectRatio = w / h;
      this.setZoomAndPositionInitial(false, true);
    }
  }

  getZoomLevelForCurrentAspectRatio() {
    // if zoomLevel is not 'auto', we want to show zoomLevel - 1 for maps that have an aspectRatio smaller than 16:9 (the default for large maps)
    if (this.zoomLevel !== 'auto' && this.aspectRatio < (16 / 9) && this.zoomLevel > 1) {
      return this.zoomLevel - 1;
    }
    return this.zoomLevel;
  }

  invalidateSize() {
    this.map.invalidateSize();
    this.setZoomAndPositionInitial(false);
  }
}
