function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
//左侧导航条点击事件(改变导航条的内容)
addLoadEvent(bindingNavClickEvent);
var navArray = new Array();
function bindingNavClickEvent() {
    var nav = $("#nav li");
    for (var i = 0; i < $("#nav li").length; i++) {
        navArray[i] = $($("#nav li")[i]).attr("id");
    }
    $("#nav li").click(function () {
        navDisplayControl($(this).attr("id"));
    });
}
function navDisplayControl(id) {
    for (var i = 0; i < navArray.length; i++) {
        var navId,panelId;
        if (navArray[i] == id) {
            navId = "#" + id;
            panelId = "#" + id + "-panel"
            $(navId).removeClass().addClass("active transit");
            $(panelId).show();
        } else {
            navId = "#" + navArray[i];
            panelId = "#" + navArray[i] + "-panel"
            $(navId).removeClass().addClass("transit");
            $(panelId).hide();
        }
    }
}
//右侧toolBar点击事件
addLoadEvent(bindingToolBarClickEvent);
function bindingToolBarClickEvent() {
    //注册一级toolbar按钮事件
    $("#toolBar li").click(function () {
        toolBarClick($(this).attr("id"));
    });
    $("#contractionBtn").click(function () {
        contractionBtnClick();
    });
    //注册路况二级按钮事件
    $("#traffic_current").click(function(){
        trafficCurrentClick();
    });
    $("#traffic_forecast").click(function () {
        trafficForecastClick();
    });
}
function toolBarClick(id) {
    switch(id){
        case "city":
            alert(1);
            break;
        case "trafficConditions":
            trafficConditionsClick();
            break;
        case "satelliteMap":
            alert(3);
            break;
        case "subway":
            addHeatMapLayer();
            break;
        case "ranging":
            alert(5);
            break;
        case "fullScreen":
            alert(6);
            break;
        }
}
//路况按钮点击事件
function trafficConditionsClick() {
    $("#trafficConditions div").toggleClass("active");
    $("#detailedRoad").toggle();
    trafficCurrentClick();
    addTrafficCurrentLayer();
}
function trafficCurrentClick() {
    $("#traffic_current_detailed").show();
    $("#traffic_forecast_detalied").hide();
    $("#traffic_current").addClass("active");
    $("#traffic_forecast").removeClass("active");
}
function trafficForecastClick() {
    $("#traffic_current_detailed").hide();
    $("#traffic_forecast_detalied").show();
    $("#traffic_current").removeClass("active");
    $("#traffic_forecast").addClass("active");
}
//底部收缩按钮点击事件
function contractionBtnClick() {
    $("#navbody").slideToggle("slow");
    $("#contractionInsideBtnUp").toggle();
    $("#contractionInsideBtnDown").toggle();
}
