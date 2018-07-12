import { markerTypes } from "./markerTypes.js";
import Leaflet from "leaflet";

export default {
  pointToLayer: (feature, latlng) => {
    let markerType = feature.properties.type || "pointLightLabel";
    if (markerTypes.hasOwnProperty(markerType)) {
      let markerIcon = markerTypes[markerType].getLeafletIcon(
        feature.properties
      );
      let marker = Leaflet.marker(latlng, {
        interactive: false,
        icon: markerIcon
      });
      return marker;
    }
    return null;
  },
  style: feature => {
    return feature.properties;
  },
  coordsToLatLng: coords => {
    const lat = coords[1];
    let lng = coords[0];
    const pacificBounds = Leaflet.latLngBounds([[-180, -90], [-125, 90]]);

    if (lng < 0 && pacificBounds.contains(coords)) {
      lng = Leaflet.Util.wrapNum(lng, [0, 360], true);
    }

    return Leaflet.latLng(lat, lng);
  }
};
