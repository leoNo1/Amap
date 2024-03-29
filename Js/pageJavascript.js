﻿function addLoadEvent(func) {
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
    updateTime();
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
    upTrafficForecastDate();
}
function updateTime() {
    b = new Date,
    c = b.getFullYear(),
    d = b.getMonth() + 1,
    d = d < 10 ? "0" + d : d
    e = b.getDate(),
    e = e < 10 ? "0" + e : e
    f = b.getHours(),
    f = f < 10 ? "0" + f : f
    g = b.getMinutes().toString();
    g = g < 10 ? "0" + g : g;
    $("#dateNow").html(c + "/" + d + "/" + e);
    $("#timeNow").html(f + ":" + g);
}
function upTrafficForecastDate() {
    var date = new Date();
    //date.setHours(date.getHours() + 1);    //当前时间增加一个小时
    date.setMinutes(date.getMinutes() + 30); //当前时间增加30分钟
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var mm = date.getMinutes();
    mm = mm < 10 ? "0" + mm : mm;
    $("#trafficForecastDate").html(y + "/" + m + "/" + d);
    $("#trafficForecastTime").html(h + ":" + mm);
}
//图层折叠和展开的控制
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
    }

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this),
        $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');
        $(".track").toggle();
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }

    var accordion = new Accordion($('#accordion'), false);
});
//图层显隐控制的滑块的滑动事件，包含滑块的动画效果和实际的图层控制
var target
$(function () { ScrollerTrack.Init(); });
var ScrollerTrack = {
    BodyWidth: 315,
    //MaxValue: 100,
    CurrentX: 0,
    CurrentValue: 0,
    Count: 0,
    Init: function () {
        var mWidth = ScrollerTrack.BodyWidth;
        $(".contain").css("width", mWidth + "px");
        var count = ScrollerTrack.MaxValue / 50;
        ScrollerTrack.Count = count;
        var itemWidth = mWidth / count;
        for (var i = 0; i < count; i++) {
            var span = $("<span>" + (i + 1) * 50 + "</span>");
            $(span).css("width", itemWidth + "px").css("margin-left", i * itemWidth + "px");
            $(".value").append(span);
        }
        ScrollerTrack.Value();
    },
    Value: function () {
        var currentValue;
        var isMoving = false;
        ScrollerTrack.CurrentX = $(".track").offset().left;
        $(".track").mousedown(function () {
            target = $(this).parent();
            isMoving = true;
            $("html,body").mousemove(function (event) {
                if (isMoving == false) return;
                var changeX = event.clientX - ScrollerTrack.CurrentX;
                currentValue = changeX - ScrollerTrack.CurrentX;
                if (changeX <= 0) {
                    $(target).find(".track").css("margin-left", "0px");
                    $(target).find(".valueC").css("width", "0px");
                    ScrollerTrack.CurrentValue = 0;
                }
                else if (changeX >= ScrollerTrack.BodyWidth - 16) {
                    $(target).find(".track").css("margin-left", ScrollerTrack.BodyWidth - 16 + "px");
                    $(target).find(".valueC").css("width", ScrollerTrack.BodyWidth - 16 + "px");
                    ScrollerTrack.CurrentValue = ScrollerTrack.MaxValue;
                }
                else {
                    $(target).find(".track").css("margin-left", changeX + "px");
                    $(target).find(".valueC").css("width", changeX + "px");
                    var v = ScrollerTrack.MaxValue * ((changeX + 16) / ScrollerTrack.BodyWidth);
                    ScrollerTrack.CurrentValue = parseInt(v);
                }
            });
        });
        $("html,body").mouseup(function () {
            isMoving = false;
        });
    }
}
//底部收缩按钮点击事件
function contractionBtnClick() {
    $("#navbody").slideToggle("slow");
    $("#contractionInsideBtnUp").toggle();
    $("#contractionInsideBtnDown").toggle();
}
