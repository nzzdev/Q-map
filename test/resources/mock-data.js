module.exports = {
  title: 'My Q map',
  notes: 'notes in footer',
  geojson: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[-180, 0], [180, 0]]
        },
        properties: {
          style: {
            color: 'purple',
            interactive: false
          },
          useForInitialView: false
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [48.2, 16.36]
        },
        properties: {
          label: 'balbaba',
          type: 'event',
          labelPosition: 'bottom'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [47.2, 16.36]
        },
        properties: {
          label: 'balbaba',
          type: 'event',
          labelPosition: 'top'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [48.2, 17.36]
        },
        properties: {
          label: '😇blablalba',
          type: 'pointHeavyLabel',
          labelPosition: 'top'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [48.4, 16.36]
        },
        properties: {
          label: 'balbaba',
          type: 'pointLightLabel',
          labelPosition: 'bottom'
        }
      }
    ]
  },
  options: {
    baseLayer: 'terrain',
    initialZoomLevel: 'auto',
    minimap: true,
    labelsBelowMap: false
  }
};
