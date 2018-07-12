import { markerTypes } from "./markerTypes.js";
import Leaflet from "leaflet";

export default {
  pointToLayer: (feature, latlng) => {
    let markerType = feature.properties.type || "pointHeavyLabel";
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

    // If a point has a negative longitude value and is within the pacific area (pacificBounds) it is projected to a positive value.
    // This allows to show features left and right of the antimeridian line to be shown next to each other.
    // See the antimeridian fixture data for an example and this awesome blog post explaining the problem in depth:
    // https://macwright.org/2016/09/26/the-180th-meridian.html
    if (lng < 0 && pacificBounds.contains(coords)) {
      lng = Leaflet.Util.wrapNum(lng, [0, 360], true);
    }

    return Leaflet.latLng(lat, lng);
  }
};
