import toolRuntimeConfigDefaults from './toolRuntimeConfigDefaults.js';

import SizeObserver from './resources/SizeObserver.js';
import LeafletMap from './resources/LeafletMap.js';

import optionsProcessors from './resources/optionsProcessors.js';

let sizeObserver = new SizeObserver();
let maps = [];

function render(item, element, map) {
  processItemModifyingOptions(item);
  return map.render(item, element)
    .then(graphic => {
      processMapModifyingOptions(item, map);
      map.setZoomAndPositionInitial();
      return graphic;
    });
}

function processItemModifyingOptions(item) {
  Object.keys(optionsProcessors).forEach(optionName => {
    let optionsProcessor = optionsProcessors[optionName];
    if (!optionsProcessor.modifyItem) {
      return;
    }
    if (item.options && item.options[optionName] !== undefined) {
      optionsProcessor.modifyItem(item, item.options[optionName]);
    }
  });
}

function processMapModifyingOptions(item, map) {
  Object.keys(optionsProcessors).forEach(optionName => {
    let optionsProcessor = optionsProcessors[optionName];
    if (!optionsProcessor.modifyMap) {
      return;
    }
    if (item.options && item.options[optionName] !== undefined) {
      optionsProcessor.modifyMap(map, item.options[optionName]);
    }
  });
}

export function display(item, element, toolRuntimeConfig) {
  return new Promise((resolve, reject) => {
    try {
      if (!element) {
        throw new Error('element is not defined');
      }

      if (toolRuntimeConfig && typeof toolRuntimeConfig === 'object') {
        toolRuntimeConfig = Object.assign(toolRuntimeConfigDefaults, toolRuntimeConfig);
      } else {
        toolRuntimeConfig = toolRuntimeConfigDefaults;
      }

      const mapId = item._id || Math.random();
      maps[mapId] = new LeafletMap(toolRuntimeConfig);

      render(item, element, maps[mapId])
        .then(graphic => {
          resolve(graphic);
        })
        .catch(e => {
          reject(e);
        });

      sizeObserver.onResize((rect) => {
        try {
          if (maps[mapId]) {
            if (rect.width > 450) {
              maps[mapId].setAspectRatio(16, 9);
            } else {
              maps[mapId].setAspectRatio(1, 1);
            }
            maps[mapId].invalidateSize();
          }
        } catch (e) {
          // ignore
        }
      }, element);
    } catch (e) {
      reject(e);
    }
  });
}
