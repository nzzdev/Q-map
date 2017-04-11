import { markerTypes } from './markerTypes.js';
import Leaflet from 'leaflet';

export default {
  pointToLayer: (feature, latlng) => {
    let markerType = feature.properties.type || 'pointLightLabel';
    if (markerTypes.hasOwnProperty(markerType)) {
      let markerIcon = markerTypes[markerType].getLeafletIcon(feature.properties);
      let marker = Leaflet
        .marker(latlng, {
          interactive: false,
          icon: markerIcon
        });
      return marker;
    }
    return null;
  },
  style: feature => {
    return feature.properties;
  }
};
