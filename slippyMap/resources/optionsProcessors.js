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
          // this replaces the labels with unicode numbers in circles code blocks
          // we implement numbers from 1 to 49 here. There should no be more labels on a map ever.
          // they get wrapped in span to apply font-family: sans-serif; so we render with system sans-serif font that
          // hopefully supports these unicode blocks. some special fonts only support up to 9, so we cannot really use them.
          // this should be implemented without unicode blocks but some numbers with circles styled with css probably.
          // we do have to solve the problem of the number size in different fonts though, as we do not know the size of the font within this tool
          if (index < 20) {
            let htmlEntityNr = 9312 + index;
            feature.properties.label = '<span class="q-map-code-point";>&#' + htmlEntityNr + '</span>';
          } else if (index >= 20 && index < 36) {
            let htmlEntityNr = 12881 + index;
            feature.properties.label = '<span class="q-map-code-point";>&#' + htmlEntityNr + '</span>';
          } else if (index >= 36 && index < 50) {
            let htmlEntityNr = 12977 + index;
            feature.properties.label = '<span class="q-map-code-point";>&#' + htmlEntityNr + '</span>';
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
