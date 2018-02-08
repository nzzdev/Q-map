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
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g fill="#B23C39" fill-rule="evenodd"><circle cx="21" cy="21" r="21" fill-opacity=".2"/><circle cx="21" cy="21" r="16" fill-opacity=".2"/><circle cx="21" cy="21" r="11" fill-opacity=".2"/><circle cx="21" cy="21" r="7" fill-opacity=".2"/><circle cx="21" cy="21" r="3"/></g></svg>`
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
