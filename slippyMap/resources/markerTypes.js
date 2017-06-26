import Leaflet from 'leaflet';

export const markerTypes = {
  pointHeavyLabel: {
    label: 'Punkt mit Label',
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet
        .divIcon({
          className: 'q-map-marker s-color-gray-1',
          iconSize: [8, 8],
          html: `<div class="q-map-marker__label s-color-gray-8 q-map-marker__label--${marker.labelPosition ? marker.labelPosition : 'top'} q-map-marker__label--heavy">${marker.label || ''}</div>`
        });
    }
  },
  pointLightLabel: {
    label: 'Punkt mit Label (klein)',
    hasLabel: true,
    isLegacy: false,
    getLeafletIcon: marker => {
      return Leaflet
        .divIcon({
          className: 'q-map-marker s-color-gray-1',
          iconSize: [8, 8],
          html: `<div class="q-map-marker__label s-color-gray-8 q-map-marker__label--${marker.labelPosition ? marker.labelPosition : 'top'} q-map-marker__label--light">${marker.label || ''}</div>`
        });
    }
  },
  pointOnly: {
    label: 'Punkt ohne Label',
    hasLabel: false,
    getLeafletIcon: marker => {
      return Leaflet
        .divIcon({
          className: 'q-map-marker s-color-gray-1',
          iconSize: [8, 8],
          html: ''
        });
    }
  },
  label: {
    label: 'Gebiet',
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet
        .divIcon({
          className: 'q-map-marker q-map-marker--without-point',
          iconSize: [0, 0],
          html: `<div class="q-map-marker__label s-color-gray-6 q-map-marker__label--without-point">${marker.label || ''}</div>`
        });
    }
  },
  event: {
    label: 'Ereignis',
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet
        .divIcon({
          className: 'q-map-marker s-color-gray-1',
          iconSize: [8, 8],
          html: `<div class="q-map-marker__label s-color-gray-8 q-map-marker__label--${marker.labelPosition ? marker.labelPosition : 'top'} q-map-marker__label--event">${marker.label || ''}</div>`
        });
    }
  }
};
