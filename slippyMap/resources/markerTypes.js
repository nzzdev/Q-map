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
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path d="M24.597 35.491c5.571 0 10.088-4.516 10.088-10.088 0-5.571-4.517-10.088-10.088-10.088-5.572 0-10.088 4.517-10.088 10.088 0 5.572 4.516 10.088 10.088 10.088zm0 .8c-6.013 0-10.887-4.875-10.887-10.888s4.874-10.887 10.887-10.887c6.013 0 10.887 4.874 10.887 10.887 0 6.013-4.874 10.887-10.887 10.887z"/><path d="M25 39.129c7.803 0 14.129-6.326 14.129-14.129S32.803 10.871 25 10.871 10.871 17.197 10.871 25 17.197 39.129 25 39.129zm0 1.194c-8.462 0-15.323-6.86-15.323-15.323 0-8.462 6.86-15.323 15.323-15.323 8.462 0 15.323 6.86 15.323 15.323 0 8.462-6.86 15.323-15.323 15.323z"/><path d="M24.597 43.605c10.052 0 18.201-8.15 18.201-18.202 0-10.052-8.149-18.201-18.201-18.201-10.053 0-18.202 8.149-18.202 18.201 0 10.053 8.15 18.202 18.202 18.202zm0 1.556c-10.912 0-19.758-8.846-19.758-19.758 0-10.912 8.846-19.758 19.758-19.758 10.912 0 19.758 8.846 19.758 19.758 0 10.912-8.846 19.758-19.758 19.758z"/><path d="M25 47.211c12.267 0 22.211-9.944 22.211-22.211 0-12.267-9.944-22.211-22.211-22.211C12.733 2.789 2.789 12.733 2.789 25c0 12.267 9.944 22.211 22.211 22.211zM25 50C11.193 50 0 38.807 0 25S11.193 0 25 0s25 11.193 25 25-11.193 25-25 25z"/><path d="M24 21h1v9h-1z"/><path d="M20 26v-1h9v1z"/></svg>`
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
