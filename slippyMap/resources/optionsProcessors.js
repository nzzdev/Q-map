const optionsProcessors = {
  labelsBelowMap: {
    modifyItem: (item, value) => {
      if (value !== true) {
        return;
      }
      if (!item.geojsonList || !item.geojsonList.length || item.geojsonList.length === 0) {
        return;
      }
      item.geojsonList
        .map(geojsonItem => {
          if (geojsonItem.type === 'FeatureCollection') {
            return geojsonItem.features;
          }
          if (geojsonItem.type === 'Feature') {
            return geojsonItem;
          }
        })
        .reduce((features, geojsonFeature) => {
          if (Array.isArray(geojsonFeature)) {
            features.concat(geojsonFeature);
          } else if (geojsonFeature) {
            features.push(geojsonFeature);
          }
          return features;
        }, [])
        .filter(feature => {
          return feature.hasOwnProperty('geometry') && feature.geometry.type === 'Point' && feature.properties.hasOwnProperty('label');
        })
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
