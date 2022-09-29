// Create a tile layer from OSM
var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
osmLayer.set('name', 'osm');

// Define style for geojsonLayer
var styles = {
  'Polygon': [new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3
      })
  })]
};

var styleFunction = function(feature, resolution) {
  return styles[feature.getGeometry().getType()];
};

// Create geojsonLayer
var geojsonLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'multipolygons.geojson',
        format: new ol.format.GeoJSON({
          // Transforms geojson data from EPSG:2039 to EPSG:3857
          defaultDataProjection: 'EPSG:2039',
          projection: 'EPSG:3857'
        })
    }),
    style: styleFunction
});

// Coordinates of a center are in EPSG:4326, they are being transform in EPSG:3857
// http://openlayers.org/en/v3.8.2/apidoc/ol.proj.html
var olview = new ol.View({
    center: ol.proj.fromLonLat([34.7621407, 32.0878858]),
    zoom: 13,
    minZoom: 2,
    maxZoom: 20
});

var map = new ol.Map({
    target: document.getElementById('map'),
    view: olview,
    layers: [osmLayer, geojsonLayer]
});
