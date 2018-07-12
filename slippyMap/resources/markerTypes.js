import Leaflet from "leaflet";

function labelClasses(first, sencond) {
  return `q-map-marker__label--${first} q-map-marker__label--${sencond}`;
}

function getAlignLabelClasses(labelPosition) {
  if (labelPosition === "top") {
    return labelClasses("vertical", "top");
  } else if (labelPosition === "bottom") {
    return labelClasses("vertical", "bottom");
  } else if (labelPosition === "left") {
    return labelClasses("horizontal", "left");
  } else if (labelPosition === "right") {
    return labelClasses("horizontal", "right");
  } else if (labelPosition === "topleft") {
    return labelClasses("top", "left");
  } else if (labelPosition === "topright") {
    return labelClasses("top", "right");
  } else if (labelPosition === "bottomleft") {
    return labelClasses("bottom", "left");
  } else if (labelPosition === "bottomright") {
    return labelClasses("bottom", "right");
  }
  return labelClasses("vertical", "top");
}

export const markerTypes = {
  pointHeavyLabel: {
    label: "Punkt mit Label",
    hasLabel: true,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "q-map-marker s-color-gray-1",
        iconSize: [8, 8],
        html: `<div class="s-font-note s-font-note--strong q-map-marker__label ${getAlignLabelClasses(
          marker.labelPosition
        )}">${marker.label || ""}</div>`
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
        html: `<div class="s-font-note-s s-font-note--strong q-map-marker__label ${getAlignLabelClasses(
          marker.labelPosition
        )}">${marker.label || ""}</div>`
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
        html: `<div class="s-font-note s-font-note--strong q-map-marker__label ${getAlignLabelClasses(
          marker.labelPosition
        )} q-map-marker__label--event">${marker.label || ""}</div>`
      });
    }
  },
  epicenter: {
    label: "Epizentrum",
    hasLabel: false,
    getLeafletIcon: marker => {
      return Leaflet.divIcon({
        className: "s-color-gray-9",
        iconSize: [42, 42],
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><g fill="#B23C39" fill-rule="evenodd"><circle cx="21" cy="21" r="21" fill-opacity=".2"/><circle cx="21" cy="21" r="16" fill-opacity=".2"/><circle cx="21" cy="21" r="11" fill-opacity=".2"/><circle cx="21" cy="21" r="7" fill-opacity=".2"/><circle cx="21" cy="21" r="3"/></g></svg>`
      });
    }
  }
};
