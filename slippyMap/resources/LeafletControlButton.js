import Leaflet from 'leaflet';

export default {
  options: {
    position: 'topleft'
  },
  onAdd: function(map) {
    let container = Leaflet.DomUtil.create('div', `leaflet-control-button ${this.options.className}`);
    container.innerHTML = this.options.html;
    return container;
  }
};
