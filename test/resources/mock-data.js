module.exports = {
  title: "My Q map",
  notes: "notes in footer",
  geojsonList: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [[-180, 0], [180, 0]]
      },
      properties: {
        color: "purple",
        interactive: false
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [48.2, 16.36]
      },
      properties: {
        label: "aaaaaa",
        type: "event",
        labelPosition: "bottom",
        useForInitialView: true
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [47.2, 16.36]
      },
      properties: {
        label: "bbbbbb",
        type: "event",
        labelPosition: "top",
        useForInitialView: true
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [48.2, 17.36]
      },
      properties: {
        label: "😇 cccccc",
        type: "pointHeavyLabel",
        labelPosition: "top",
        useForInitialView: true
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [48.4, 16.36]
      },
      properties: {
        label: "dddddd",
        type: "pointLightLabel",
        labelPosition: "bottom"
      }
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [48.6474609375, 18.895892559415024],
            [52.82226562499999, 15.411319377980993],
            [54.228515625, 19.518375478601566],
            [50.9326171875, 21.166483858206583],
            [48.6474609375, 18.895892559415024]
          ]
        ]
      }
    }
  ],
  options: {
    initialZoomLevel: -1,
    baseLayer: "terrain",
    minimap: true,
    labelsBelowMap: false
  }
};
