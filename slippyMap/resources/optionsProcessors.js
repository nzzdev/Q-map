const optionsProcessors = {
  labelsBelowMap: {
    modifyItem: (item, value) => {
      if (value === true) {
        if (!item.geojson || !item.geojson.features || !item.geojson.features.length || item.geojson.features.length === 0) {
          return;
        }
        item.geojson.features
          .map((feature, index) => {
            if (index < 20) {
              let htmlEntityNr = 9312 + index;
              feature.properties.label = '&#' + htmlEntityNr;
            } else if (index >= 20 && index < 36) {
              let htmlEntityNr = 12881 + index;
              feature.properties.label = '&#' + htmlEntityNr;
            } else if (index >= 36 && index < 50) {
              let htmlEntityNr = 12977 + index;
              feature.properties.label = '&#' + htmlEntityNr;
            }
          });
      }
    }
  },
  initialZoomLevel: {
    modifyMap: (map, value) => {
      map.setZoomLevel(value);
    }
  },
  minimap: {
    modifyMap: (map, value) => {
      map.setMinimapVisibility(value);
    }
  }
};

export default optionsProcessors;
