import Leaflet from "leaflet";

export const markerTypes = {
  pointHeavyLabel: {
    label: "Punkt mit Label",
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "q-map-marker s-color-gray-1",
        iconSize: [8, 8],
        html: `<div class="s-font-note s-font-note--strong q-map-marker__label q-map-marker__label--${
          marker.labelPosition ? marker.labelPosition : "top"
        }">${marker.label || ""}</div>`
      });
    }
  },
  pointLightLabel: {
    label: "Punkt mit Label (klein)",
    hasLabel: true,
    isLegacy: false,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "q-map-marker s-color-gray-1",
        iconSize: [7, 7],
        html: `<div class="s-font-note-s s-font-note--strong q-map-marker__label q-map-marker__label--${
          marker.labelPosition ? marker.labelPosition : "top"
        }">${marker.label || ""}</div>`
      });
    }
  },
  pointOnly: {
    label: "Punkt ohne Label",
    hasLabel: false,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "q-map-marker s-color-gray-1",
        iconSize: [8, 8],
        html: ""
      });
    }
  },
  label: {
    label: "Gebiet",
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "q-map-marker q-map-marker--without-point",
        iconSize: [0, 0],
        html: `<div class="s-font-note s-font-note--strong s-font-note--light q-map-marker__label q-map-marker__label--without-point">${marker.label ||
          ""}</div>`
      });
    }
  },
  event: {
    label: "Ereignis",
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "q-map-marker s-color-gray-1",
        iconSize: [8, 8],
        html: `<div class="s-font-note s-font-note--strong q-map-marker__label q-map-marker__label--${
          marker.labelPosition ? marker.labelPosition : "top"
        } q-map-marker__label--event">${marker.label || ""}</div>`
      });
    }
  },
  epicenter: {
    label: "Epizentrum",
    hasLabel: false,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "s-color-gray-9",
        iconSize: [12, 12],
        html: `<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" ><path fill="currentColor" d="M6,3C4.3,3,3,4.3,3,6c0,1.7,1.3,3,3,3s3-1.3,3-3C9,4.3,7.7,3,6,3z M6,8.5C4.6,8.5,3.5,7.4,3.5,6S4.6,3.5,6,3.5c1.4,0,2.5,1.1,2.5,2.5S7.4,8.5,6,8.5z M6,5C5.4,5,5,5.4,5,6c0,0.6,0.4,1,1,1s1-0.4,1-1C7,5.4,6.6,5,6,5z M6,0C2.7,0,0,2.7,0,6c0,3.3,2.7,6,6,6s6-2.7,6-6C12,2.7,9.3,0,6,0z M6,11.5C3,11.5,0.5,9,0.5,6S3,0.5,6,0.5c3,0,5.5,2.5,5.5,5.5S9,11.5,6,11.5z"/></svg>`
      });
      return Leaflet.divIcon({
        className: "q-map-marker s-color-gray-1",
        iconSize: [8, 8],
        html: `<div class="s-font-note s-font-note--strong q-map-marker__label q-map-marker__label--${
          marker.labelPosition ? marker.labelPosition : "top"
        } q-map-marker__label--event">${marker.label || ""}</div>`
      });
    }
  }
};
