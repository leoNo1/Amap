var map;
var zoom = 12;
function onLoad() {
    var config = {
        projection: "EPSG:4326"
    }
    //初始化地图对象
    map = new TMap("map", config);
    //设置显示地图的中心点和级别
    map.centerAndZoom(new TLngLat(116.40969, 39.89945), zoom);
}