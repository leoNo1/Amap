﻿var queryTrafficCurrent,   //实时交通状况
      heatMap;                  //交通事故热点图
require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/CartographicLineSymbol",
    "esri/Color",
    "esri/renderers/HeatmapRenderer",
    "dojo/domReady!"
],
  function (
    Map,
    FeatureLayer,
    Query,
    QueryTask,
    Graphic,
    SimpleLineSymbol,
    SimpleMarkerSymbol,
    CartographicLineSymbol,
    Color,
    HeatmapRenderer
  ) {
      var map = new Map("map", {
          basemap: "topo",
          center: [-102.843217, 42.17732],
          zoom: 5,
          slider: false,
          logo:false
      });

      //var featureLayer = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/1");
      //map.addLayer(featureLayer);
      heatMap = function () {
          var serviceURL = "//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/2012_CA_NHTSA/FeatureServer/0";
          var heatmapFeatureLayerOptions = {
              mode: FeatureLayer.MODE_SNAPSHOT,
          };
          var heatmapFeatureLayer = new FeatureLayer(serviceURL, heatmapFeatureLayerOptions);
          var heatmapRenderer = new HeatmapRenderer();
          heatmapFeatureLayer.setRenderer(heatmapRenderer);
          map.addLayer(heatmapFeatureLayer);
      }

      var lineSymbol_LV1 = new CartographicLineSymbol(
           CartographicLineSymbol.STYLE_SOLID,
            new Color([52, 176, 0]), 2,
           CartographicLineSymbol.CAP_ROUND,
           CartographicLineSymbol.JOIN_MITER, 1
);
      var lineSymbol_LV2 = new CartographicLineSymbol(
     CartographicLineSymbol.STYLE_SOLID,
      new Color([254, 203, 0]), 2,
     CartographicLineSymbol.CAP_ROUND,
     CartographicLineSymbol.JOIN_MITER, 1
);
      var lineSymbol_LV3 = new CartographicLineSymbol(
     CartographicLineSymbol.STYLE_SOLID,
      new Color([223, 1, 0]), 2,
     CartographicLineSymbol.CAP_ROUND,
     CartographicLineSymbol.JOIN_MITER, 1
);
      var lineSymbol_LV4 = new CartographicLineSymbol(
     CartographicLineSymbol.STYLE_SOLID,
      new Color([142, 14, 11]), 2,
     CartographicLineSymbol.CAP_ROUND,
     CartographicLineSymbol.JOIN_MITER, 1
);
      queryTrafficCurrent = function () {
          var queryTask = new QueryTask("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/1");
          var query = new Query();
          query.returnGeometry = true;
          query.where = "FID>0";
          queryTask.execute(query, showResults);
      }
      function showResults(results) {
          var resultItems = [];
          var resultCount = results.features.length;
          for (var i = 0; i < resultCount; i++) {
              var featureAttr = results.features[i].attributes;
              var featureGeo = results.features[i].geometry;
              if (i <= 30) {
                  map.graphics.add(new Graphic(featureGeo, lineSymbol_LV1));
              }
              if (i > 30 && i <= 45) {
                  map.graphics.add(new Graphic(featureGeo, lineSymbol_LV2));
              }
              if (i > 45 && i <= 50) {
                  map.graphics.add(new Graphic(featureGeo, lineSymbol_LV3));
              }
              if (i > 50) {
                  map.graphics.add(new Graphic(featureGeo, lineSymbol_LV4));
              }
          }

          var symbol = new SimpleMarkerSymbol({
              "color": [255, 255, 255, 64],
              "size": 12,
              "angle": -30,
              "xoffset": 0,
              "yoffset": 0,
              "type": "esriSMS",
              "style": "esriSMSCircle",
              "outline": {
                  "color": [0, 0, 0, 255],
                  "width": 1,
                  "type": "esriSLS",
                  "style": "esriSLSSolid"
              }
          });
          var point = results.features[0].geometry
      }
  });
function addTrafficCurrentLayer() {
    queryTrafficCurrent();
}
function addHeatMapLayer() {
    heatMap();
}
