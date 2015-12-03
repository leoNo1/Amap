function _addEvent(a, b, c) {
    var d = b.split(" ");
    if (1 == d.length) return AMap.event.addListener(a, b, c);
    for (var e = 0; e < d.length; e++) AMap.event.addListener(a, d[e], c)
}
function _removeEvent(a) {
    a && AMap.event.removeListener(a)
}
function _formatDistance(a) {
    return a = new Number(a).toFixed(2),
    1e3 > a ? parseInt(a) + "绫�" : Math.round(a / 1e3 * 100) / 100 + "鍏噷"
}
function _formatDistance(a) {
    return a = new Number(a).toFixed(2),
    1e3 > a ? parseInt(a) + "绫�" : (a / 1e3).toFixed(1) + "鍏噷"
}
function _parseRoutes(a) {
    var b = [];
    a = a.path ? [a.path] : a;
    for (var c = 0; c < a.length; c++) {
        var d = a[c];
        b[c] = {
            steps: this._parseStep(d.steps),
            distance: this._parseInt(d.distance),
            time: this._parseInt(d.time),
            policy: d.policy,
            tolls: this._parseInt(d.tolls),
            tolls_distance: this._parseInt(d.toll_distance)
        }
    }
    return b
}
function _parseStep(a) {
    for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c],
        e = d.path;
        b[c] = {
            start_location: e[0],
            end_location: e[e.length - 1],
            instruction: this._parseString(d.instruction),
            orientation: this._parseString(d.orientation),
            road: this._parseString(d.road),
            distance: this._parseInt(d.distance),
            tolls: this._parseInt(d.tolls),
            toll_distance: this._parseInt(d.toll_distance),
            toll_road: this._parseString(d.toll_road),
            time: this._parseInt(d.time),
            path: e,
            action: this._parseString(d.action),
            assistant_action: this._parseString(d.assistant_action)
        }
    }
    return b
}
function _str2LngLat(a) {
    var b = a.split(",");
    return new AMap.LngLat(b[0], b[1])
}
function _multi2Lnglat(a) {
    for (var b = [], c = a.split(";"), d = 0; d < c.length; d++) b[d] = this._str2LngLat(c[d]);
    return b
}
function _multiStr2Lnglat(a) {
    var b = [];
    if (a) for (var c = a.split(","), d = 0; d < c.length - 1; d += 2) b.push(new AMap.LngLat(c[d], c[d + 1]));
    return b
}
function _multiStr2LnglatCar(a) {
    var b = [];
    if (a) {
        var c = a;
        $.isArray(a) || (c = JSON.parse(a));
        for (var d = 0; d < c.length - 1; d += 2) b.push(new AMap.LngLat(c[d], c[d + 1]))
    }
    return b
}
function _parseString(a) {
    var b = "object" == typeof a || "undefined" == typeof a ? "" : a;
    return b
}
function _parseInt(a) {
    var b = parseInt(a, 10);
    return isNaN(b) ? 0 : b
}
function _formatTime(a) {
    if (!a || "0" == a) return "";
    if (a /= 60, 60 >= a) return parseInt(Math.ceil(a)) + "鍒嗛挓";
    var b = Math.floor(a / 60) + "灏忔椂";
    return a % 60 !== 0 && (0 === Math.floor(a % 60) || (b += Math.floor(a % 60) + "鍒嗛挓")),
    b
}
function _formatTimeByMinute(a) {
    if (!a || "0" == a) return "";
    var a = Number(a);
    return a / 60 > 1 ? Math.floor(a / 60) + "灏忔椂" + a % 60 + "鍒嗛挓" : a % 60 + "鍒嗛挓"
}
function _formatCost(a) {
    return a && "0" != a ? parseInt(a) + "鍏�" : ""
}
function _getCurTime() {
    var a = new Date,
    b = a.getFullYear(),
    c = a.getMonth() + 1,
    d = a.getDate(),
    e = a.getHours(),
    f = a.getMinutes().toString();
    return 1 == f.length && (f = "0" + f),
    {
        date: b + "-" + c + "-" + d,
        time: e + "-" + f
    }
}
function _color2rgb(a) {
    var b = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (a && b.test("#" + a)) {
        a = "#" + a.toLowerCase();
        for (var c = [], d = 1; 7 > d; d += 2) c.push(parseInt("0x" + a.slice(d, d + 2)));
        return c.join(",")
    }
}
function toLngLat(a, b) {
    var c = /^[-]*\d+$/,
    d = new amap.favapi.VirtualEarthProjection;
    if (c.test(a) && c.test(b)) {
        var e = d.PixelsToLatLong(a, b, 20);
        return new AMap.LngLat(e.lo, e.la)
    }
    return new AMap.LngLat(a, b)
}
function toLngLatString(a, b) {
    var c = /^[-]*\d+$/,
    d = new amap.favapi.VirtualEarthProjection;
    if (c.test(a) && c.test(b)) {
        var e = d.PixelsToLatLong(a, b, 20);
        return e.lo + "," + e.la
    }
    return a + "," + b
}
$.fn.city = function (a) {
    function b(a) {
        var b = ['<header class="city-header">', '<span class="city-current"></span>', '<span class="city-default">璁剧疆涓洪粯璁ゅ煄甯�</span>', '<span class="city-panel-close"><i class="fa fa-close"></i></span>', "</header>", '<ul class="city-hotlist"></ul>', "<section>", '<div class="city-pc-title">', '<span class="city-province-title">鎸夌渷浠�</span>', '<span class="city-city-title">鎸夊煄甯�</span>', "</div>", '<div class="city-search">', '<span class="city-search-logo"></span>', '<input type="text" class="city-search-suggestion" placeholder="璇疯緭鍏ュ煄甯�"></input>', "</div>", "</section>", '<section class="city-list">', "</section>", "</div>"];
        $(b.join("")).appendTo($(a))
    }
    function c() {
        var a = $(".city-hotlist"),
        b = "";
        n.hotCitys.forEach(function (a) {
            b += '<li adcode="' + a.adcode + '">' + a.name + "</li>"
        }),
        a.html(b)
    }
    function d() {
        var a = $(".city-list"),
        b = '<ul class="city-province-letter">',
        c = '<dl class="city-province">';
        for (var d in m) {
            b += "<li>" + d + "</li>";
            for (var f in m[d]) {
                m[d][f];
                for (var g in m[d][f]) {
                    c += '<dt class="index-' + d + '">' + g + "锛�</a></dt><dd>";
                    var h = m[d][f][g];
                    for (var i in h) c += '<li adcode="' + h[i].adcode + '">' + h[i].name + "</li>";
                    c += "</dd>"
                }
            }
        }
        b += "</ul>",
        c += "</dl>",
        p = b + c;
        var j = ($(".city-city-list"), '<ul class="city-city-letter">'),
        k = '<dl class="city-city">';
        for (var d in l) {
            j += "<li>" + d + "</li>",
            k += '<dt class="index-' + d + '">' + d + "锛�</dt><dd>";
            for (var n in l[d]) k += '<li adcode="' + l[d][n].adcode + '">' + l[d][n].name + "</li>";
            k += "</dd>"
        }
        j += "</ul>",
        k += "</dl>",
        q = j + k,
        a.html(p),
        e(),
        $(".city-province-title").addClass("city-select")
    }
    function e() {
        $(".city-province").slimScroll({
            height: "140px",
            size: "3px"
        }),
        $(".city-city").slimScroll({
            height: "115px",
            size: "3px"
        })
    }
    function f() {
        var a;
        for (a in n.provinces) {
            var b = n.provinces[a];
            o = b.cities.length > 0 ? o.concat(b.cities) : o.concat(b)
        }
        var c = o.map(function (a) {
            return {
                value: a.name + "(" + a.spell + ")",
                data: a
            }
        });
        $(".city-search-suggestion").autocomplete({
            lookupLimit: 10,
            lookup: c,
            maxHeight: 350,
            onSelect: function (a) {
                g(a.data.adcode, a.data.name)
            },
            containerClass: "autocomplete-suggestions city-sug"
        })
    }
    function g(a, b) {
        $(".city-search-suggestion").val(""),
        r.trigger("select.city", a, b),
        k()
    }
    function h() {
        var a = amapcity.provinces;
        $.each(a,
        function (a, b) {
            var c = b.cities;
            0 == c.length ? amapcity.cities[b.adcode] = b : $.each(c,
            function (a, b) {
                amapcity.cities[b.adcode] = b
            })
        })
    }
    function i(a) {
        $.extend(amapcity, a.cityData),
        n = a.cityData,
        l = a.cityByLetter,
        m = a.provinceByLetter,
        h(),
        b(r),
        c(),
        d(),
        f()
    }
    function j() {
        var a = window.localStorage.getItem("localCityData"),
        b = {},
        c = "";
        a && (b = JSON.parse(a), c = b.version),
        $.get(amap.service.cityList + "version=" + c,
        function (a) {
            a && 1 == a.status && 1 == a.update ? (window.localStorage.setItem("localCityData", JSON.stringify(a.data)), i(a.data)) : i(b)
        })
    }
    function k() {
        r.hide(),
        $(a).removeClass("active")
    }
    window.amapcity = {};
    var l = {},
    m = {},
    n = "",
    o = [],
    p = "",
    q = "",
    r = this;
    j(),
    r.setTitle = function (a) {
        function b() {
            if ("000000" === a) c = {
                name: "鍏跺畠鍦板尯"
            };
            else if ("100000" === a) c = n.hotCitys[0];
            else if ("0000" === a.substr(2)) c = n.provinces[a];
            else {
                var b = a.substr(0, 2) + "0000",
                d = n.provinces[b];
                c = _.findWhere(d.cities, {
                    adcode: a
                })
            }
            c && r.parent().find(".city-title b").text(c.name)
        }
        a = a.toString();
        var c;
        if (n.hotCitys && n.hotCitys.length) b();
        else {
            setTimeout(function () {
                r.setTitle(amap.adcode)
            },
            100)
        }
        return c
    },
    amapcity.getname = function (a) {
        a = a.toString();
        var b;
        if ("000000" === a) b = {
            name: "鍏跺畠鍦板尯"
        };
        else if ("100000" === a) b = n.hotCitys[0];
        else if ("0000" === a.substr(2)) b = n.provinces[a];
        else {
            var c = a.substr(0, 2) + "0000",
            d = n.provinces[c];
            b = d ? _.findWhere(d.cities, {
                adcode: a
            }) : amapcity.hotCitys[1],
            b = b || d
        }
        return b.name
    },
    amapcity.getZipcode = function (a) {
        a = a.toString();
        var b = n.cities[a],
        c = null;
        return c = b ? b.zipcode : a
    },
    r.css({
        padding: "6px 15px 15px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        zoom: 1,
        width: "420px",
        height: "300px",
        lineHeight: "26px",
        background: "#fff",
        "z-index": "9999",
        display: "none",
        position: "absolute"
    });
    $(window).width() - $(a).offset().left + 5;
    return r.on("click", "li[adcode],span[adcode]",
    function () {
        g($(this).attr("adcode"), $(this).text())
    }),
    $(a).click(function (a) {
        $(".city-current").text("褰撳墠鍩庡競锛�" + $(".city-title b").text()),
        a.stopPropagation(),
        $(this).toggleClass("active"),
        r.toggle()
    }),
    r.on("click", ".city-panel-close",
    function () {
        r.is(":visible") && k()
    }),
    r.on("keyup", ".city-search-suggestion",
    function (a) {
        if (13 == a.keyCode) {
            var b = $(".city-search-suggestion").val(),
            c = _.find(o,
            function (a) {
                return a.name == b || a.label == b || a.spell.toLowerCase() == b.toLowerCase()
            });
            c && g(c.adcode, c.name)
        }
    }),
    r.on("click", ".city-province-title",
    function () {
        $(".city-pc-title span").removeClass("city-select"),
        $(".city-province-title").addClass("city-select"),
        $(".city-list").html(p),
        e()
    }),
    r.on("click", ".city-city-title",
    function () {
        $(".city-pc-title span").removeClass("city-select"),
        $(".city-city-title").addClass("city-select"),
        $(".city-list").html(q),
        e()
    }),
    r.on("click", ".city-list>ul li",
    function () {
        $(".city-list dl").scrollTo(".index-" + $(this).text(), 500),
        $(".city-list>ul li").removeClass("city-letter-select"),
        $(this).addClass("city-letter-select")
    }),
    $(document.body).on("click",
    function (a) {
        $(a.target).closest(r.selector).length || r.is(":visible") && k()
    }),
    r
},
!
function () {
    function a(a) {
        var b = "/assets/img/loc.png",
        d = new AMap.LngLat(a.lng, a.lat),
        g = new AMap.Marker({
            map: themap,
            position: d,
            offset: new AMap.Pixel(-13, -13),
            icon: b
        }),
        h = new AMap.Circle({
            id: "circle",
            map: themap,
            center: d,
            radius: 100,
            bubble: !0,
            strokeColor: "#72ccff",
            strokeOpacity: .7,
            strokeWeight: 1,
            fillColor: "#d0e7f8",
            fillOpacity: .5
        });
        AMap.event.addListener(g, "click",
        function (a) {
            c(amap.loc)
        }),
        e = g,
        f = h
    }
    function b(a) {
        var b = ['<div id="locInfoWindow" class="infowindow-wrap-s usel">', '<div class="infowindow-body-s">', '<div class="loctip">鎴戠殑浣嶇疆 <i class="fa fa-chevron-right"></i></div>', "</div>", '<div class="infowindow-foot"></div>', "</div>"],
        c = new AMap.InfoWindow({
            isCustom: !0,
            content: b.join(""),
            offset: new AMap.Pixel(0, -13)
        });
        c.open(themap, new AMap.LngLat(a.lng, a.lat)),
        posinfoWindow = c
    }
    function c(a) {
        mapapi.getRegeoData(a,
        function (b) {
            var c = b.poi_list[0] || {},
            e = {
                id: c.poiid,
                pos: new AMap.LngLat(c.longitude, c.latitude),
                name: c.name || "鏈煡鍦扮偣",
                addr: c.address || "鏈煡鍦扮偣",
                tType: "todo"
            };
            tpl.tplLoad({
                filename: "canvas-mylocInfowindow",
                data: e,
                callback: function (b) {
                    amap.iwdata = e;
                    var c = new AMap.InfoWindow({
                        isCustom: !0,
                        content: b,
                        offset: new AMap.Pixel(0, -13)
                    });
                    c.open(themap, new AMap.LngLat(a.lng, a.lat)),
                    d = c
                }
            })
        })
    }
    var d, e, f, g, h = $("#locbox"),
    i = $("#themap"),
    j = function () {
        var a = "/service/pl/pl.json?rand=" + Math.random();
        return $.get(a).done(function (a) {
            return config.debug ? void (amap.loc = {
                code: "1",
                lat: "39.993351",
                lng: "116.473041"
            }) : void ("1" == a.code && a.lat && a.lng ? amap.loc = a : ($("#themap").show(), h.find(".locating").hide(), h.find(".locfail").fadeIn()))
        })
    },
    k = 0,
    l = function () {
        var a = amap.getCookie("cna");
        a ? (amap.cna = a, j()) : ++k < 200 ? g = setTimeout(function () {
            l()
        },
        10) : (h.find(".locating").hide(), h.find(".locfail").fadeIn())
    };
    watch(amap, ["cna", "loc", "map"],
    function (c, d, g, i) {
        if (amap.map && amap.cna && amap.loc) if (h.find(".locating").hide(), "1" == amap.loc.code) {
            var j = amap.loc,
            k = qs.parse(location.search);
            h.find(".locok").fadeIn(),
            mc = a(j),
            b(j),
            k.query || k.from || k.to ? _.delay(function () {
                $("#themap").show()
            },
            600) : ($("#themap").show(), themap.setCenter(new AMap.LngLat(j.lng, j.lat), !0)),
            amap.pos = {
                success: !0,
                iw: posinfoWindow,
                circle: f,
                marker: e
            }
        } else h.find(".locating").hide(),
        h.find(".locfail").fadeIn(),
        amap.pos = {
            success: !1,
            iw: !1,
            circle: !1,
            marker: !1
        },
        $("#themap").show()
    }),
    h.on("click", ".locok",
    function () {
        var a = amap.loc;
        themap.panTo(new AMap.LngLat(a.lng, a.lat)),
        mapapi.getRegeoData(a,
        function (a) {
            if (a && a.cityadcode) var b = a.cityadcode || "110000";
            $("#citybox .city-panel").trigger("select.city", b)
        })
    }),
    h.find(".locfail").tipsy({
        gravity: "e",
        fade: !0
    }),
    h.find(".locok").tipsy({
        gravity: "e",
        fade: !0
    }),
    i.on("click", "#locInfoWindow",
    function (a) {
        posinfoWindow.close(),
        c(amap.loc)
    }),
    i.on("click", "#mylociw .infowindow-close, #mylociw .poibtn-plandir",
    function (a) {
        d.close()
    }),
    l()
}(),
!
function () {
    function a(a) {
        amap.get(amap.service.weather + $.param({
            adcode: a || amap.adcode
        }),
        function (a) {
            if (1 == a.status) try {
                var c = a.data.data[0].live,
                d = c.weather_name,
                e = a.data.data[0].forecast_data,
                f = e[0].max_temp,
                g = e[1].min_temp,
                h = g + "/" + f + "鈩�";
                b.css("display", "block").html(d + "</br>" + h)
            } catch (i) {
                b.html("").css("display", "none")
            } else b.html("").css("display", "none");
            b.attr("init", "true")
        })
    }
    var b = $("#citybox .weatherinfo");
    watch(amap, "adcode",
    function (b, c, d, e) {
        if (e || "110000" === amap.adcode || a(), e && d) {
            var f = e.toString().substr(0, 4),
            g = d.toString().substr(0, 4);
            f !== g && a()
        }
    }),
    a("110000"),
    setTimeout(function () {
        b.attr("init") || a()
    },
    5e3)
}(),
!
function () {
    page("*",
    function (a, b) {
        var c, d, e, f = decodeURI(a.canonicalPath),
        g = f.split("?")[1],
        h = qs.parse(g),
        i = {};
        if (h.p) return c = h.p.split(","),
        d = c[0],
        i = {
            lat: c[1],
            lng: c[2]
        },
        e = c[3],
        address = c[4],
        void amap.redirect("/search?" + $.param({
            query: e || address
        }));
        if (h.q) return c = h.q.split(","),
        i = {
            lat: c[0],
            lng: c[1]
        },
        e = c[2],
        address = c[3],
        void amap.redirect("/search?" + $.param({
            query: e || address || h.q
        }));
        if (h.r) {
            var j = h.r.split(","),
            k = {
                y: j[0],
                x: j[1],
                name: j[2]
            },
            l = {
                y: j[3],
                x: j[4],
                name: j[5]
            },
            m = j[6] || "0",
            n = j[7] || "0",
            o = (j[8], j[9], j[10], j[11], {
                from: {
                    name: k.name,
                    lnglat: [k.x, k.y].join()
                },
                to: {
                    name: l.name,
                    lnglat: [l.x, l.y].join()
                },
                policy: m,
                type: amap.dirtype[n]
            });
            return void amap.fwd("/dir/?" + $.param(o), !1)
        }
        b()
    }),
    page("*",
    function (a, b) {
        var c = (a.pathname, a.pathname.substr(1)),
        d = $.inArray(c, amap.states) >= 0;
        "" === c && (c = "index", d = !0),
        d ? (amap.state = c, util.trace({
            type: "view",
            pid: amap.state
        }), b()) : b()
    })
}(),
!
function () {
    function a(a) {
        return !_.isObject(a) || _.isEmpty(a.name) || _.isEmpty(a.lnglat) ? void 0 : !0
    }
    function b(a, b) {
        var c = $("#index-panel"),
        d = $("#amap-links"),
        e = $("#amap-panels");
        if (e.children().hide(), c.attr("init")) {
            amap.slimscroll(c.find("#indexbox"),
            function () {
                c.attr("init", !0),
                c.show(),
                d.show(),
                amap.thebox.fadeIn()
            });
            var f = $(window).height(),
            g = f - 120,
            h = g > 430 ? g : 430;
            $("#indexbox").height(h - 20),
            $("#favesbox").height(h - 40),
            $("#faves-panel").attr("init", !0),
            $("#around-panel").attr("init", !0)
        } else c.show(),
        d.show();
        b()
    }
    function c(a, b) {
        var c = qs.parse(a.querystring);
        a.dirobj = c,
        g.val(""),
        g.trigger("blur"),
        amap.markerState.active.poiid = !1,
        amap.lineState.active.lineid = !1,
        amap.fullscreen = !0,
        dirModel.reset(),
        mapapi.clearAllOverlays(),
        amap.state = amap.DIR,
        b()
    }
    function d(b, c) {
        var d = b.dirobj;
        if (amap.dir.type = d.type || "car", "car" == amap.dir.type ? amap.dir.policy = d.policy || "1" : "bus" == amap.dir.type && (amap.dir.policy = d.policy || "0"), a(d.from) && (amap.dir.from = d.from), a(d.to) && (amap.dir.to = d.to), _.isArray(d.via)) {
            var e = d.via.every(function (b) {
                return a(b)
            });
            e ? amap.dir.via = d.via : amap.dir.via = []
        } else d.via = [],
        amap.dir.via = [];
        var f = [d.from, d.to].concat(d.via),
        g = f.every(function (b) {
            return a(b)
        });
        g && ($.extend(amap.dir, d), c())
    }
    function e(a, b) {
        var c = a.dirobj.refwd;
        "0" == c && (a.dirobj.refwd = !1),
        amap.direction = a.dirobj
    }
    function f(a, b) {
        dirapi.clearDir(),
        mapapi.clearAllOverlays(),
        b()
    }
    var g = $("#searchipt");
    page("/dir", b, c, d, e),
    page.exit("/dir", f)
}(),
Function.prototype.extend = function (a) {
    var b = function (a) {
        var b = a && a.id;
        b && (this.id = b),
        this.initEvent && this.initEvent(),
        this.init && this.init(a)
    },
    c = {},
    d = this.prototype;
    for (var e in d) c[e] = d[e];
    for (var f in a) c[f] = a[f];
    return b.prototype = c,
    b
};
var BaseView = function () { };
BaseView.prototype = {
    id: "",
    events: {},
    eachStyle: function (a, b, c, d) {
        b = b || "selected",
        d = d || "click",
        $(a).each(function (e) {
            $(this).on(d,
            function () {
                $(a).removeClass(b),
                $(this).addClass(b),
                c && c(e)
            })
        })
    },
    eachClass: function (a, b, c) {
        $(a).removeClass(c),
        $(b).addClass(c)
    },
    initEvent: function () {
        var a = this.events,
        b = this;
        for (var c in a) !
        function (c) {
            a[c];
            if (-1 == c.indexOf(" ")) return !1;
            var d = c.split(" "),
            e = d.shift(),
            f = d.join(" ");
            a[c];
            $("#" + b.id).off(e, f),
            $("#" + b.id).on(e, f,
            function (d) {
                b[a[c]] && b[a[c]]($(this), d)
            })
        }(c)
    },
    getObjOfArray: function (a, b, c) {
        for (var d = 0,
        e = a.length; e > d; d++) {
            var f = a[d];
            if (c == f[b]) return f
        }
        return !1
    },
    filterXss: function (a) {
        return a.replace(/</g, "&lt;").replace(/>/g, "&gt")
    },
    show: function () {
        this.$el.show()
    },
    hide: function () {
        this.$el.hide()
    },
    filterXss: function (a) {
        return a.replace(/</g, "&lt;").replace(/>/g, "&gt")
    },
    stop: function (a) {
        a.stopPropagation(),
        a.preventDefault()
    }
};
var BaseModel = function () { };
BaseModel.prototype = {
    getObjOfArray: function (a, b, c) {
        for (var d = 0,
        e = a.length; e > d; d++) {
            var f = a[d];
            if (c == f[b]) return f
        }
        return !1
    },
    setValFromObj: function (a, b) {
        for (var c in a) {
            var d = b[c];
            if ("lnglat" == c && b.location) {
                var e = new AMap.LngLat(b.location.lng, b.location.lat);
                d = e.lng + "," + e.lat
            }
            void 0 !== d && (a[c] = d)
        }
        return a
    },
    replaceArray: function (a, b, c) {
        for (var d = 0,
        e = a.length; e > d; d++) d == b && (a[d] = c);
        return a
    },
    isArray: function (a) {
        return "[object Array]" === Object.prototype.toString.call(a) ? !0 : !1
    }
};
var DirModel = BaseModel.extend({
    data: "",
    maxPassPoi: 3,
    config: {
        policy: {
            bus: ["0", "3", "2", "5"],
            car: ["1", "2", "8", "4"],
            walk: [""]
        }
    },
    setType: function (a) {
        amap.dir.type = a,
        amap.dir.policy = this.config.policy[a][0]
    },
    getType: function () {
        return amap.dir.type
    },
    setPolicy: function (a) {
        amap.dir.policy = a,
        this.href()
    },
    getPolicy: function () {
        return amap.dir.policy
    },
    setDatetime: function (a) {
        amap.dir.dateTime = a,
        this.href()
    },
    getDatetime: function () {
        return amap.dir.dateTime
    },
    check: function () {
        var a = amap.dir,
        b = a.from,
        c = a.to,
        d = a.type,
        e = a.policy,
        f = a.via;
        if (void 0 === b.name || void 0 === b.lnglat || void 0 === c.name || void 0 === c.lnglat || void 0 === d || void 0 === e) return !1;
        for (var g = 0,
        h = this.maxPassPoi; h > g; g++) if (null !== f && void 0 !== f[g] && (void 0 === f[0].name || void 0 === f[g].lnglat)) return !1;
        return !0
    },
    reset: function () {
        var a = this.resetDir;
        for (var b in a) amap.dir[b] = this.resetDir[b];
        amap.direction = {},
        amap.dirp = void 0
    },
    clear: function () {
        var a = this.resetDir,
        b = amap.dir.type;
        for (var c in a) "type" !== c && "policy" !== c && (amap.dir[c] = this.resetDir[c]);
        amap.dir.policy = this.config.policy[b][0],
        amap.direction = {},
        amap.dirp = void 0
    },
    href: function () {
        this.check() && amap.fwd("/dir/?" + qs.stringify(amap.dir), !1)
    },
    init: function () {
        this.resetDir = _.clone(amap.dir)
    }
});
dirModel = new DirModel;
var PoiModel = BaseModel.extend({
    sug: {
        from: null,
        via: [null, null, null],
        to: null
    },
    resetSug: function (a, b) {
        var c = this.sug[a];
        this.isArray(c) === !1 ? c = null : c[b] = null
    },
    getSug: function (a, b) {
        var c = void 0 === b ? this.sug[a] : this.sug[a][b];
        return c
    },
    set: function (a, b, c) {
        var d = this.create();
        if (d = this.setValFromObj(d, b), "from" == a) amap.dir.from = d;
        else if ("to" == a) amap.dir.to = d;
        else if ("via" == a) {
            var e = _.clone(amap.dir.via);
            e[c] = d,
            amap.dir.via = e
        }
    },
    get: function (a, b) {
        var c = amap.dir[a];
        return void 0 !== b && (c = c[b]),
        c
    },
    create: function () {
        var a = {
            name: void 0,
            lnglat: void 0,
            id: void 0,
            adcode: void 0,
            modxy: void 0
        };
        return a
    },
    isChange: function (a, b, c) {
        var d = this.get(a, c);
        return void 0 !== d && d.name === b ? !1 : !0
    },
    exchange: function () {
        var a = _.clone(amap.dir.from),
        b = _.clone(amap.dir.to),
        c = _.clone(amap.dir.via);
        amap.dir.to = a,
        amap.dir.from = b,
        c && 0 !== c.length && (c.reverse(), amap.dir.via = c)
    },
    isVal: function (a, b) {
        var c = this.get(a);
        return void 0 !== c.name && void 0 !== c.id ? !0 : !1
    },
    isEmpty: function (a, b) {
        return this.isVal(a, b) ? !1 : !0
    },
    isName: function () { },
    delAllPass: function () {
        amap.dir.via = []
    },
    initPass: function () {
        amap.dir.via = []
    },
    checkIsOnly: function (a) {
        return "object" == typeof a && void 0 !== a.name && void 0 !== a.id ? !0 : !1
    },
    getViaNum: function () {
        var a = amap.dir.via;
        return "object" == typeof a && null !== a ? a.length : 0
    },
    checkIsLocal: function (a) {
        return "鎴戠殑浣嶇疆" === a.name && void 0 !== a.id ? !0 : !1
    },
    hasLocal: function () {
        var a = this.get("from"),
        b = this.get("to");
        return this.checkIsLocal(a) || this.checkIsLocal(b) ? !0 : !1
    }
}),
poiModel = new PoiModel,
PlanModel = BaseModel.extend({
    setStateVal: function (a, b) {
        var c = this.getStateObj();
        c && (c[a] = b)
    },
    getStateObj: function () {
        var a, b = amap.dir.type;
        return "car" == b ? a = amap.carState : "bus" == b && (a = amap.busState),
        a
    }
}),
DirHistroyModel = BaseModel.extend({
    name: "dirHistory",
    maxNum: 5,
    set: function (a) {
        var b = this.get(a);
        b && this.setValFromObj(amap.dir, b)
    },
    save: function () {
        for (var a = this.getAll(), b = amap.dir, c = 0, d = a.length; d > c; c++) if (this.isEqual(a[c], b)) {
            a = this.filter(c);
            break
        }
        a.length >= this.maxNum && a.shift();
        var e = $.extend(!0, {},
        b);
        delete e.dateTime,
        a.push(e),
        store.set(this.name, a)
    },
    clear: function () {
        store.remove(this.name)
    },
    get: function (a) {
        var b = this.getAll();
        return b[a] || !1
    },
    getAll: function () {
        return store.get(this.name) || []
    },
    filter: function (a) {
        for (var b = [], c = this.getAll(), d = 0, e = c.length; e > d; d++) d !== a && b.push(c[d]);
        return b
    },
    isEqual: function (a, b) {
        var c = ["name"],
        d = _.pick(a.from, c),
        e = _.pick(b.from, c),
        f = _.pick(a.to, c),
        g = _.pick(b.to, c);
        if (_.isEqual(d, e) === !1 || _.isEqual(f, g) === !1) return !1;
        var h = a.via,
        i = b.via;
        if (h.length != i.length) return !1;
        for (var j = 0,
        k = h.length; k > j; j++) {
            var l = _.pick(h[j], c),
            m = _.pick(i[j], c);
            if (_.isEqual(l, m) === !1) return !1
        }
        return !0
    }
}),
mapapi = window.mapapi || void 0,
PlanFormView = BaseView.extend({
    id: "planForm",
    isSugStore: 0,
    events: {
        "focus input": "focusInp",
        "blur input": "blurInp",
        "keyup input": "keyUpInp",
        "click .localSug": "clickLocalSug",
        "click .icon-updown": "exchange",
        "click .icon-add": "addPassEle",
        "click .icon-reduce": "removePassPoiEle",
        "click .line-search-clear": "clear",
        "click #trafficTab a": "chooseType",
        "click button": "submit"
    },
    init: function () {
        this.$el = $("#" + this.id),
        this.$tabTitles = this.$el.find("#trafficTab a"),
        this.$startInp = this.$el.find("input:first"),
        this.$endInp = this.$el.find("input:last"),
        this.$passList = this.$el.find(".passList"),
        this.$passInp = this.$passList.find("input"),
        this.$inp = this.$el.find("input"),
        this.$add = this.$el.find(".icon-add"),
        this.$clear = this.$el.find(".line-search-clear");
        var a = this;
        watch(amap, "dir",
        function (b, c, d, e) {
            switch (b) {
                case "from":
                    a.$startInp.val(d.name);
                    break;
                case "to":
                    a.$endInp.val(d.name);
                    break;
                case "via":
                    if (null == d) {
                        var f = a.$passInp.parent();
                        return a.hidePassEle(f),
                        !1
                    }
                    a.$passInp.each(function (b) {
                        var c = d[b],
                        e = $(this).parent();
                        if (void 0 == c) return $(this).val(""),
                        a.hidePassEle(e),
                        !0;
                        var f = c.id;
                        a.showPassEle(e),
                        e.data("id", f);
                        var g = c.name;
                        void 0 === g && (g = ""),
                        $(this).val(g)
                    });
                    break;
                case "type":
                    var g = "current";
                    a.$tabTitles.each(function () {
                        $(this).data("type") == d ? $(this).addClass(g) : $(this).removeClass(g)
                    }),
                    a.togglePassPoiEle(d)
            } ("from" == b && void 0 === d.name || "to" == b && void 0 === d.name) && a.$clear.addClass("none"),
            "from" == b && ("鎴戠殑浣嶇疆" === d.name ? a.$startInp.addClass("blue") : a.$startInp.removeClass("blue")),
            "to" == b && ("鎴戠殑浣嶇疆" === d.name ? a.$endInp.addClass("blue") : a.$endInp.removeClass("blue")),
            dirModel.check() && $(".line-search-submit").addClass("loading")
        }),
        watch(amap, "dirp",
        function (b, c, d) {
            void 0 !== d && a.$clear.removeClass("none")
        }),
        watch(amap, "adcode",
        function (b, c, d, e) {
            d !== e && a.initSug(a.$inp)
        }),
        watch(amap, "loc",
        function (b, c, d, e) {
            poiModel.isEmpty("from") && a.fetchLocalPoi("from")
        })
    },
    focusInp: function (a) {
        $(a).parent().addClass("focus");
        var b = this.getInpType(a),
        c = $.trim($(a).val());
        if (("" === c || "鎴戠殑浣嶇疆" == c) && "via" !== b) {
            var d = "from" === b ? this.$startInp : this.$endInp,
            e = poiModel.get(b);
            return poiModel.checkIsLocal(e) ? void d.val("").removeClass("blue") : void (this.hasLocalName() === !1 && this.showLocalSug(b))
        }
    },
    blurInp: function (a) {
        $(a).parent().removeClass("focus");
        var b = this.getInpType(a);
        if ("" === $(a).val() && "via" !== b) {
            var c = this;
            setTimeout(function () {
                c.hideLocalSug(b)
            },
            200);
            var d = "from" === b ? this.$startInp : this.$endInp,
            e = poiModel.get(b);
            return poiModel.checkIsLocal(e) ? void d.val("鎴戠殑浣嶇疆").addClass("blue") : void 0
        }
    },
    keyUpInp: function (a, b) {
        if (13 == b.keyCode && this.check()) return void this.submit();
        var c = this.getInpType(a);
        if ("via" !== c) {
            var d = $.trim($(a).val());
            "鎴戠殑浣嶇疆" === d && this.setLocalPoi(c),
            0 === d.length && this.hasLocalName() === !1 ? this.showLocalSug(c) : this.hideLocalSug(c)
        }
    },
    getInpType: function (a) {
        var b = a.parent(),
        c = "";
        return c = $(b).hasClass("line-search-start") ? "from" : $(b).hasClass("line-search-end") ? "to" : "via"
    },
    getViaInpIndex: function (a) {
        var b = a.parent(),
        c = b.attr("index");
        return parseInt(c)
    },
    hasLocalPoi: 0,
    hasLocalName: function () {
        var a = this.$startInp.val(),
        b = this.$endInp.val();
        return "鎴戠殑浣嶇疆" === a || "鎴戠殑浣嶇疆" === b ? !0 : !1
    },
    showLocalSug: function (a) {
        if (0 !== this.hasLocalPoi) {
            var b = this.getLocalSug(a);
            b && b.addClass("show")
        }
    },
    hideLocalSug: function (a) {
        var b = this.getLocalSug(a);
        b && b.removeClass("show")
    },
    getLocalSug: function (a) {
        var b = "from" === a ? "line-search-start" : "line-search-end";
        return pEle = this.$el.find("." + b),
        localSugEle = pEle.find(".localSug"),
        localSugEle || !1
    },
    clickLocalSug: function (a) {
        var b = this.getInpType(a),
        c = this;
        this.setLocalPoi(b,
        function () {
            setTimeout(function () {
                c.check() && c.submit()
            },
            300)
        }),
        this.hideLocalSug(b)
    },
    fetchLocalPoi: function (a, b) {
        if (_.isEmpty(amap.myloc)) {
            var c = this,
            d = amap.loc;
            mapapi ? mapapi.getRegeoData(d,
            function (d) {
                c.hasLocalPoi = 1,
                amap.myloc = d.poi_list[0],
                amap.myloc.adcode = d.adcode,
                poiModel.isEmpty(a) && c.setLocalPoi(a, b)
            }) : setTimeout(function () {
                mapapi.getRegeoData(d,
                function (d) {
                    c.hasLocalPoi = 1,
                    amap.myloc = d.poi_list[0],
                    amap.myloc.adcode = d.adcode,
                    poiModel.isEmpty(a) && c.setLocalPoi(a, b)
                })
            },
            500)
        } else this.hasLocalPoi = 1,
        poiModel.isEmpty(a) && this.setLocalPoi(a, b)
    },
    setLocalPoi: function (a, b) {
        var c = amap.myloc;
        poiModel.set(a, {
            id: c.poiid,
            adcode: c.adcode,
            lnglat: c.longitude + "," + c.latitude,
            modxy: c.longitude + "," + c.latitude,
            name: "鎴戠殑浣嶇疆"
        }),
        poiModel.localName = c.name,
        b && b()
    },
    chooseType: function (a) {
        var b = $(a).data("type");
        dirModel.setType(b),
        dirModel.href(),
        this.togglePassPoiEle(b)
    },
    exchangeAnimate: function () {
        this.$endInp.animate({
            "margin-top": "-72px"
        },
        300,
        function () { }),
        this.$startInp.animate({
            "margin-top": "36px"
        },
        300)
    },
    exchange: function () {
        var a = this.$startInp.val(),
        b = this.$endInp.val();
        poiModel.isChange("from", a) && poiModel.set("from", {
            name: a
        }),
        poiModel.isChange("to", b) && poiModel.set("to", {
            name: b
        });
        for (var c = this.$passList.children().not(".none"), d = 0, e = c.length; e > d; d++) {
            var f = c.eq(d).find("input"),
            g = f.val();
            poiModel.isChange("via", g, d) && poiModel.set("via", {
                name: g
            },
            d)
        }
        return poiModel.exchange(),
        poiModel.isVal("from") && poiModel.isVal("to") ? void dirModel.href() : void 0
    },
    togglePassPoiEle: function (a) {
        "car" != a ? (poiModel.delAllPass(), this.$add.hide()) : (poiModel.initPass(), this.$add.show())
    },
    addPassEle: function () {
        var a = this.$passList.find(".none:first"),
        b = this;
        a.length && (a.removeData("id"), this.showPassEle(a,
        function () {
            0 === b.$passList.find(".none").length && b.$add.hide()
        }))
    },
    removePassPoiEle: function (a) {
        this.$add.show();
        var b = $(a).parent(),
        c = b.data("id"),
        d = parseInt(b.attr("index"));
        if (void 0 === c) return this.hidePassEle(b),
        !1;
        for (var e = _.clone(amap.dir.via), f = [], g = 0, h = e.length; h > g; g++) g !== d && f.push(e[g]);
        amap.dir.via = f,
        "" !== $.trim(b.find("input").val()) && dirModel.href()
    },
    hidePassEle: function (a) {
        a.slideUp(200,
        function () {
            $(this).addClass("none")
        })
    },
    showPassEle: function (a, b) {
        a.slideDown(200,
        function () {
            $(this).removeClass("none"),
            b && b()
        })
    },
    check: function () {
        var a = $.trim(this.$startInp.val()),
        b = $.trim(this.$endInp.val());
        return 0 == a.length || 0 == b.length ? !1 : !0
    },
    initSug: function (a) {
        var b = this;
        this.sug = $(a).autocomplete({
            serviceUrl: amap.service.poiTips,
            paramName: "words",
            params: {
                city: amap.adcode || "110000",
                type: "dir"
            },
            dataType: "json",
            minWidth: 264,
            maxHeight: 550,
            containerClass: "autocomplete-suggestions  planform-suggestion",
            onSelect: function (a) {
                if (b.isSugStore) {
                    a = a.data;
                    var c = b.getInpType($(this));
                    if ("via" !== c) poiModel.sug[c] = a;
                    else {
                        var d = b.getViaInpIndex($(this));
                        poiModel.sug.via[d] = a
                    }
                }
            },
            transformResult: function (a) {
                var b = {
                    suggestions: []
                };
                if ("1" != a.status) return b;
                for (var c = a.data && a.data.tip_list || [], d = 0; d < c.length; d++) {
                    var e = c[d].tip,
                    f = (e.datatype, "");
                    f = "1" !== e.ignore_district ? e.district : "",
                    f += "" !== e.terminals ? e.terminals : e.address,
                    f += " ",
                    b.suggestions.push({
                        value: e.name,
                        data: e,
                        address: f,
                        district: e.district
                    })
                }
                return b
            }
        }),
        $("body").off("click", ".planform-suggestion"),
        $("body").on("click", ".planform-suggestion",
        function () {
            b.check() && b.submit()
        })
    },
    clear: function () {
        dirapi.closeDir(),
        mapapi.clearAllOverlays(),
        amap.fwd("/dir")
    },
    submit: function () {
        var a = this.$startInp.val(),
        b = this.$endInp.val(),
        c = this;
        if (0 == a.length) return void toastr.warning("璇峰～鍐欒捣鐐逛俊鎭�", "", {
            positionClass: "toast-top-center"
        });
        if (0 == b.length) return toastr.warning("璇峰～鍐欑粓鐐逛俊鎭�", "", {
            positionClass: "toast-top-center"
        }),
        !1;
        choosePoiListView.reset(),
        dirHistroyView.hide(),
        this.createChoosePoiList("from", a);
        for (var d = 0,
        e = 0,
        f = this.$passInp.length; f > e; e++) {
            var g = this.$passInp.eq(e);
            if (!g.parent().hasClass("none")) {
                var h = $.trim(g.val());
                0 !== h.length ? (this.createChoosePoiList("via", h, d), d++) : c.removePassPoiEle(g)
            }
        }
        this.createChoosePoiList("to", b),
        dirModel.href()
    },
    createChoosePoiList: function (a, b, c) {
        var d, e = poiModel.getSug(a, c),
        f = poiModel.isChange(a, b, c);
        f === !1 ? d = !0 : null !== e && e.name === b ? (poiModel.set(a, e, c), d = !0) : (poiModel.set(a, {
            name: b
        },
        c), poiModel.resetSug(a, c), d = !1),
        choosePoiListView.createList(a, d, c)
    }
}),
planFormView = new PlanFormView,
DirHistroyView = BaseView.extend({
    id: "dirHistory",
    events: {
        "click li": "search",
        "click .clear": "clear"
    },
    init: function (a) {
        this.$el = $("#" + this.id),
        this.$list = this.$el.find("ul"),
        this.model = new DirHistroyModel;
        var b = this.model.getAll();
        0 !== b.length && (this.create(b), this.show());
        var c = this;
        watch(amap, "dirp",
        function (a, b, d, e) {
            void 0 !== d && (c.model.save(), c.hide())
        }),
        watch(amap, "dir",
        function (a, b, d, e) {
            var f = poiModel.get("from").name,
            g = poiModel.get("to").name;
            if (void 0 === f && void 0 === g) {
                var h = c.model.getAll();
                0 !== h.length && (c.create(h), c.show())
            }
        })
    },
    create: function (a) {
        for (var b = "",
        c = a.length - 1; c >= 0; c--) {
            var d = "",
            e = a[c];
            if ("object" == typeof e && null !== e) {
                d += e.from.name + "  鈫�  ";
                for (var f = e.via,
                g = 0,
                h = f.length; h > g; g++) d += f[g].name + "  鈫�  ";
                d += e.to.name,
                b += "<li class='ellipsis' data-index=" + c + " title='" + d + "''><i class='fa fa-search'></i>" + d + "</li>"
            }
        }
        this.$list.html(b)
    },
    search: function (a) {
        var b = parseInt($(a).data("index"));
        this.model.set(b),
        dirModel.href()
    },
    clear: function () {
        confirm("纭鍒犻櫎璁板綍鍚楋紵") && (this.model.clear(), this.hide())
    }
}),
dirHistroyView = new DirHistroyView,
ChoosePoiListView = BaseView.extend({
    id: "choosePoi",
    expandCLass: "expand-content",
    events: {},
    reset: function () {
        this.$list.removeClass("selected-title").html(""),
        this.$list.eq(0).addClass("expand-content")
    },
    init: function () {
        this.$el = $("#" + this.id),
        this.$list = this.$el.find(".choose-poi-list");
        var a = this;
        watch(amap, "dir",
        function (b, c, d, e) {
            ("form" == b && void 0 === d.name || "to" == b && void 0 === d.name) && a.$el.hide()
        }),
        watch(amap, "dirp",
        function (b, c, d) {
            a.$el.hide()
        })
    },
    createList: function (a, b, c) {
        var d = "via" != a ? a : "via" + c;
        idObj = {
            from: "fromPoiList",
            to: "toPoiList",
            via0: "viaPoiList0",
            via1: "viaPoiList1",
            via2: "viaPoiList2"
        };
        new ChoosePoiView({
            id: idObj[d],
            dir: a,
            isOnly: b,
            viaIndex: c
        })
    },
    showNext: function (a) {
        var b = null,
        c = a.nextAll();
        b = this.getUnSelectList(c),
        b && b.addClass(this.expandCLass)
    },
    showUnSelectList: function () {
        this.show();
        var a = this.getUnSelectList(this.$list);
        a && a.addClass(this.expandCLass)
    },
    getUnSelectList: function (a) {
        var b = null;
        return $(a).each(function () {
            return !$(this).hasClass("selected-title") && $(this).find("ul").length ? (b = $(this), !1) : void 0
        }),
        b
    },
    hasUnSelectList: function () {
        var a = this.getUnSelectList(this.$list);
        return a ? !0 : !1
    },
    toggleList: function () {
        this.hasUnSelectList() ? this.$el.show() : this.$el.hide()
    }
}),
choosePoiListView = new ChoosePoiListView,
ChoosePoiView = BaseView.extend({
    events: {
        "click  button": "choose",
        "click .choose-poi-title": "toggleList",
        "click .paging-next": "goPage",
        "click .paging-prev": "goPage",
        "click .paging-index": "goPage",
        "click .choose-poi-choosecity": "choosecity"
    },
    dirTitleObj: {
        from: "璧风偣",
        to: "缁堢偣",
        via: "閫旂粡鐐�"
    },
    titleTpl: _.template('<h3 class="choose-poi-title"><%=dirTitle%>锛�<span><%=title%></span></h3>'),
    init: function (a) {
        return this.id = a.id,
        this.isOnly = a.isOnly,
        this.viaIndex = a.viaIndex,
        this.$el = $("#" + a.id),
        this.dir = a.dir,
        this.dirTitle = this.dirTitleObj[a.dir],
        this.butName = "閫夋嫨" + this.dirTitle,
        this.obj = poiModel.get(this.dir, this.viaIndex),
        this.reset(),
        void 0 !== this.obj.name && void 0 !== this.obj.lnglat ? (this.createTitle(), this.setTitle(this.obj), !0) : void this.fetch({
            pagenum: 1
        })
    },
    reset: function () {
        this.$el.removeClass("warning-title expand-content selected-title")
    },
    fetch: function (a) {
        var b = {
            query_type: "TQUERY",
            city: amap.adcode || "110000",
            keywords: this.obj.name,
            dir: this.dir,
            pagesize: 10,
            pagenum: a.pagenum || 1,
            qii: !0,
            cluster_state: 5,
            need_utd: !0,
            utd_sceneid: 1e3,
            div: "PC1000",
            addr_poi_merge: !0,
            is_classify: !0
        },
        c = $.param(b),
        d = this;
        amap.get(amap.service.poiInfoPlan + c,
        function (a) {
            if ("1" === a.status) {
                if ("0" === a.data.total) return d.createNoResult(),
                d.$el.addClass("warning-title"),
                choosePoiListView.show(),
                planListView.hide(),
                void d.showQrCoder();
                d.dataList = a.data.poi_list,
                amap.slimscroll($("#indexbox"));
                var b, c, e = a.data.thisPoiFlag;
                if ("1" == e) return b = a.data.thisPoi.id,
                c = poiModel.getObjOfArray(d.dataList, "id", b),
                d.hideList(),
                d.createTitle(),
                d.$el.addClass("selected-title"),
                poiModel.set(d.dir, c, d.viaIndex),
                void dirModel.href();
                d.$el.html(a.html),
                d.$title = d.$el.find(".choose-poi-title"),
                d.$el.removeClass("selected-title"),
                choosePoiListView.show(),
                choosePoiListView.showUnSelectList(),
                planListView.hide(),
                setTimeout(function () {
                    d.showQrCoder()
                },
                500)
            }
        })
    },
    checkIsOnly: function () { },
    showQrCoder: function () { },
    goPage: function (a) {
        var b = parseInt($(a).attr("pageno"));
        this.fetch({
            pagenum: b
        })
    },
    choose: function (a) {
        this.$el.find("button").text(this.butName),
        $(a).text("宸查€夋嫨"),
        this.$el.find("li").removeClass("active"),
        $(a).parent().addClass("active");
        var b = $(a).parent().attr("id"),
        c = this.getObjOfArray(this.dataList, "id", b);
        poiModel.set(this.dir, c, this.viaIndex),
        dirModel.href(),
        this.setTitle(c),
        this.hideList(),
        dirModel.check() || choosePoiListView.showNext(this.$el)
    },
    choosecity: function (a, b) {
        this.stop(b),
        $(".city-title").trigger("click")
    },
    createTitle: function (a) {
        var b = $.extend({
            dirTitle: this.dirTitle,
            title: filterXss(this.obj.name)
        },
        a);
        this.$el.html(this.titleTpl(b))
    },
    createNoResult: function () {
        var a = amapcity.getname(amap.adcode) || "鍖椾含";
        tplData = {
            cityName: a,
            poiName: filterXss(this.obj.name),
            dirTitle: this.dirTitle
        },
        that = this,
        tpl.tplLoad({
            filename: "dir-poi-noresult",
            data: tplData,
            callback: function (a) {
                that.$el.html(a);
            }
        })
    },
    setTitle: function (a) {
        this.$el.find(".choose-poi-title span").text(a.name),
        this.$el.addClass("selected-title").removeClass("expand-content")
    },
    toggleList: function () {
        this.$el.toggleClass("expand-content")
    },
    hideList: function () {
        this.$el.removeClass("expand-content")
    },
    showList: function () {
        this.$el.addClass("expand-content")
    }
}),
TimePickView = BaseView.extend({
    id: "timePick",
    events: {
        "click .timeList dd": "choose",
        "click .nolimit": "chooseNolimit",
        "click .startnow": "chooseStartNow"
    },
    init: function (a) {
        this.$el = $("#" + this.id);
        var b = this;
        this.$title = $("#timePickTrigger"),
        this.$list = this.$el.find(".timeList"),
        this.$optbtn = this.$el.find(".optbtn"),
        $("#timePickList").slimscroll({
            height: "210px"
        }),
        $("#timePickTrigger").click(function () {
            b.toggleList()
        }),
        this.$scrollArea = this.$el.find(".slimScrollDiv"),
        this.hideList()
    },
    toggleList: function () {
        "block" === this.$list.css("display") ? (this.$optbtn.hide(), this.hideList()) : (this.showList(), this.$optbtn.show())
    },
    showList: function () {
        this.$scrollArea.show(),
        this.$list.show()
    },
    hideList: function () {
        this.$scrollArea.hide(),
        this.$list.hide()
    },
    choose: function (a, b) {
        var c = new Date,
        d = "",
        e = a.parent().find("dt").text().match(/[\d]+/)[0],
        f = a.text().match(/[\d]+/)[0];
        d += c.getFullYear() + "-",
        d += c.getMonth() + 1 + "-",
        d += c.getDate() + "|",
        d += e + "-",
        d += f,
        dirModel.setDatetime(d),
        this.setTitle(d)
    },
    chooseNolimit: function (a, b) {
        dirModel.setDatetime(""),
        this.setTitle("涓嶉檺鏃堕棿", !0)
    },
    chooseStartNow: function (a, b) {
        var c = new Date,
        d = "";
        d += c.getFullYear() + "-",
        d += c.getMonth() + 1 + "-",
        d += c.getDate() + "|",
        d += (c.getHours() < 10 ? "0" + c.getHours() : c.getHours()) + "-",
        d += c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes(),
        dirModel.setDatetime(d),
        this.setTitle("鐜板湪鍑哄彂", !0)
    },
    setTitle: function (a, b) {
        var c;
        b ? this.$title.text(a) : (c = a.split("|")[1], c = c.split("-").join(":"), this.$title.text(c))
    }
}),
PlanListView = BaseView.extend({
    id: "planList",
    events: {
        "click .planTab a": "setPolicy",
        "click .planTitle ul li a": "stopPropagate",
        "click .planTitle": "togglePlan",
        "mouseenter .planTitle": "mouseEnterPlan",
        "mouseleave .planTitle": "mouseLeavePlan",
        "click .p_traffic .num": "toggleStation",
        "click .viaNum": "toggleStation",
        "click .costTime": "toggleChildPlan",
        "click .route .toggle-arrow": "toggleRouteseg"
    },
    init: function () {
        this.$el = $("#" + this.id),
        this.planModel = new PlanModel;
        var a = this;
        watch(amap, "dirp",
        function (b, c, d) {
            if ("dirp" === b) {
                if (void 0 === d) return void a.$el.hide();
                a.$el.show(),
                $(".line-search-submit").removeClass("loading");
                var c = dirModel.getType();
                if (null === d || "bus" == c && _.isEmpty(d.buslist) && _.isEmpty(d.routelist) || "car" == c && _.isEmpty(d.routes) && _.isEmpty(d.path_list) || "walk" == c && _.isEmpty(d.routes)) return void tpl.tplLoad({
                    filename: "dir-plan-noresult",
                    callback: function (b) {
                        a.$el.html(b)
                    }
                });
                var e = $.extend(!0, {},
                d);
                if ("bus" == c) try {
                    var f = amap.dir.dateTime.split("|")[1].replace("-", ":");
                    e.dateTime = f
                } catch (g) {
                    e.dateTime = "涓嶉檺鏃堕棿"
                } else "car" == c && (e.routes = e.path_list);
                "bus" === c && d.railtype && "railway" === d.railtype && (c = "train");
                var h = {
                    car: "dir-plan-car",
                    bus: "dir-plan-bus",
                    walk: "dir-plan-walk",
                    train: "dir-plan-train"
                },
                i = h[c];
                tpl.tplLoad({
                    filename: i,
                    data: e,
                    callback: function (b) {
                        a.$el.html(b),
                        amap.slimscroll($("#indexbox")),
                        a.$tabTitle = a.$el.find(".planTab a"),
                        a.$planTitles = a.$el.find(".planTitle"),
                        a.setSelectedTitle();
                        var d = a.$el.find(".planTitle:eq(0)");
                        if (d.length && "bus" !== dirModel.getType() && a.showPlan(d), "bus" === c && (a.timePickView = new TimePickView), "train" === c && void 0 !== e.curopen) {
                            var f = parseInt(e.curopen),
                            g = a.$planTitles.eq(f);
                            a.showPlan(g)
                        }
                    }
                })
            }
        }),
        watch(amap, "dir",
        function (a, b, c, d) {
            ("from" === a || "to" === a) && (void 0 === c.name || void 0 === c.lnglat, void 0 === c.name)
        }),
        watch(amap, ["carState", "busState"],
        function (b, c, d) {
            if ("activeindex" !== b) return !1;
            var d = parseInt(d);
            titleEle = a.$el.find(".planTitle").eq(d),
            a.hideAllPlan(),
            a.showPlan(titleEle)
        })
    },
    mouseEnterPlan: function (a, b) {
        var c = $(a).attr("index");
        this.planModel.setStateVal("index", c)
    },
    mouseLeavePlan: function (a, b) {
        this.planModel.setStateVal("index", !1)
    },
    togglePlan: function (a, b) {
        var c = b.target;
        if ("A" === c.nodeName && 0 !== $(c).parents("ul").length) return !1;
        var d = "current",
        e = $(a).attr("index");
        $(a).hasClass(d) ? this.hidePlan(a) : (this.planModel.setStateVal("activeindex", e), this.hideAllPlan(), this.showPlan(a))
    },
    showPlan: function (a) {
        var b = "expand";
        a.next().show(),
        a.addClass("current").find(".icon-arrow-up").addClass(b)
    },
    hidePlan: function (a) {
        var b = "expand";
        a.next().hide(),
        a.removeClass("current").find(".icon-arrow-up").removeClass(b)
    },
    hideAllPlan: function () {
        var a = this;
        this.$planTitles && this.$planTitles.each(function () {
            var b = $(this);
            a.hidePlan(b)
        })
    },
    toggleStation: function (a) {
        var b = "expand";
        a.hasClass(b) ? (a.removeClass(b), a.parent().parent().find("ol").slideUp(300)) : (a.addClass(b), a.parent().parent().find("ol").slideDown(300))
    },
    toggleRouteseg: function (a) {
        var b = a.parent(".route"),
        c = b.next().hasClass("routeseg");
        c && b.next().is(":visible") ? (a.removeClass("fa-angle-up").addClass("fa-angle-down"), b.nextUntil("dt").hide()) : (a.removeClass("fa-angle-down").addClass("fa-angle-up"), b.nextUntil("dt").show())
    },
    stopPropagate: function (a, b) { },
    setPolicy: function (a) {
        var b = $(a).data("policy");
        dirModel.setPolicy(b),
        this.$tabTitle.removeClass("current"),
        $(a).addClass("current")
    },
    setSelectedTitle: function () {
        var a = dirModel.getPolicy();
        this.$tabTitle.removeClass("current"),
        this.$tabTitle.each(function (b) {
            $(this).data("policy") == a && $(this).addClass("current")
        })
    },
    titleAnimate: function (a) {
        var b = 25 * a;
        this.$el.find(".indicator").eq(0).animate({
            left: b + "%"
        },
        450, "linear");
        var c = this;
        setTimeout(function () {
            c.$el.find(".indicator").eq(1).animate({
                left: b + "%"
            },
            450, "linear")
        },
        100)
    },
    toggleChildPlan: function (a, b) {
        var c = a.parents("li"),
        d = a.find("i"),
        e = c.find("ol").eq(0);
        e.is(":visible") ? (e.slideUp(400), d.removeClass("fa-angle-up").addClass("fa-angle-down")) : (d.removeClass("fa-angle-down").addClass("fa-angle-up"), e.slideDown(400))
    }
}),
planListView = new PlanListView,
apicache = {
    markers: {},
    markerTmp: null,
    markerPlan: {},
    markerFav: {},
    markerQr: null,
    hotspotPrompt: null,
    maPoiPrompt: null,
    polyline: {},
    polylineRoad: {},
    polylineDistrict: {},
    polylineBus: {},
    polylinePlan: {},
    polylineTmp: null,
    polylineRoute: {},
    polylineRouteTop: {},
    polylineRouteTmc: {},
    polylineBusEta: [],
    polylineHighlight: null,
    polygon: {},
    busStops: {},
    favMarkers: {},
    favSingleMarker: {},
    favDatas: {},
    poiDatas: {},
    poiFavDatas: {},
    busStopsDatas: {},
    busStopDeepDatas: {},
    polylineDatas: {},
    polylineDatasDistrict: {},
    polylineDatasRoad: {},
    polylineDatasBus: {},
    polylineDatasPlan: {},
    polygonDatas: {},
    infowindow: null,
    contextMenu: null,
    contextMenuPos: null,
    tileLayer: {},
    nearbyKeyword: null,
    nearbyCenter: null,
    nearbyDrager: null,
    nearbyCircle: null,
    nearbyRadius: null,
    nearbyPrompt: null,
    busType: {
        bus: "1",
        subway: "2"
    },
    tileLayer: {},
    roadNetLayer: null,
    rangingTool: null,
    promptMarker: null,
    maPoiContent: null,
    dragRoute: null,
    trans: null,
    walking: null,
    driveStart: null,
    driveEnd: null,
    viaPath: null,
    dirFromTo: ["marker-drive-from", "marker-drive-to", "marker-bus-from", "marker-bus-to", "marker-walk-from", "marker-walk-to"],
    action: {
        0: "鐩磋",
        1: "宸﹁浆",
        2: "鍙宠浆",
        3: "鍚戝乏鍓嶆柟琛岄┒",
        4: "鍚戝彸鍓嶆柟琛岄┒",
        5: "鍚戝乏鍚庢柟琛岄┒",
        6: "鍚戝彸鍚庢柟琛岄┒",
        7: "宸﹁浆璋冨ご",
        8: "鐩磋",
        9: "闈犲乏",
        10: "闈犲彸",
        11: "杩涘叆鐜矝",
        12: "绂诲紑鐜矝",
        13: "鍑忛€熻椹�",
        14: "鐩磋"
    },
    routeSign: {
        "鐩磋": "advance",
        "宸﹁浆": "left",
        "鍙宠浆": "right",
        "闈犲乏": "keepleft",
        "闈犲彸": "keepright",
        "鍚戝乏鍓嶆柟琛岄┒": "leftup",
        "鍚戝乏鍚庢柟琛岄┒": "leftdown",
        "鍚戝彸鍓嶆柟琛岄┒": "rightup",
        "鍚戝彸鍚庢柟琛岄┒": "rightdown",
        "宸﹁浆璋冨ご": "leftback",
        "鍙宠浆璋冨ご": "rightback",
        "杩涘叆鐜矝": "enterRing",
        "绂诲紑鐜矝": "leaveRing",
        "鍑忛€熻椹�": "slow",
        "鍚戝乏鍓嶆柟琛岃蛋": "leftup",
        "鍚戝乏鍚庢柟琛岃蛋": "leftdown",
        "鍚戝彸鍓嶆柟琛岃蛋": "rightup",
        "鍚戝彸鍚庢柟琛岃蛋": "rightdown",
        "閫氳繃浜鸿妯亾": "crosswalk",
        "閫氳繃杩囪澶╂ˉ": "overpass",
        "閫氳繃鍦颁笅閫氶亾": "underpass",
        "閫氳繃骞垮満": "squarepass"
    }
},
feedback = {
    carpolicy: {
        5: "鎺ㄨ崘鏂规",
        4: "韬查伩鎷ュ牭",
        2: "璺濈鏈€杩�",
        1: "閬垮厤鏀惰垂"
    },
    buspolicy: {
        0: "杈冨揩鎹�",
        3: "姝ヨ灏�",
        2: "鎹箻灏�",
        5: "鏃犲湴閾�"
    },
    dirtype: {
        car: "drive",
        bus: "bus",
        walk: "walk"
    },
    poi: function (a) {
        var b = this,
        c = {},
        d = a.closest(".infowindow-body"),
        e = d.attr("pos").split(",");
        c = {
            type: "poi",
            data: {
                id: d.attr("id"),
                name: d.attr("name"),
                address: d.attr("address"),
                tel: d.attr("tel"),
                x: e[0],
                y: e[1]
            },
            place: b.setPlace()
        };
        var f = b.getUser();
        c.tel = f.tel,
        c.email = f.email;
        var g = "/help/index.html",
        h = "?";
        for (key in c) {
            var i = c[key];
            "" != i && (_.isString(i) || (i = JSON.stringify(i)), g += h + key + "=" + encodeURIComponent(i), h = "&")
        }
        return g
    },
    bus: function (a) { },
    road: function (a) { },
    dir: function (a) {
        var b = this,
        c = {},
        d = (amap.direction, amap.dir);
        if (d) {
            var e = d.type;
            if (c = {
                type: "line",
                data: {
                start: d.from.name,
                dest: d.to.name,
                points: d.from.lnglat + "|" + d.to.lnglat,
                type: b.carpolicy[d.policy]
            },
                method: b.dirtype[e],
                place: b.setPlace()
            },
            "car" == e && (c.data.type = b.carpolicy[d.policy]), "bus" == e) {
                c.data.type = b.buspolicy[d.policy];
                var f = null;
                a ? (1 == a.length ? f = a.name : $.each(a,
                function (a, b) {
                    f ? f += " - " + b.name : f = b.name
                }), c.data.name = f) : c.data.name = "鏈煡"
            }
        } else c = {
            place: b.setPlace()
        };
        var g = b.getUser();
        c.tel = g.tel,
        c.email = g.email;
        var h = "/help/index.html",
        i = "?";
        for (key in c) {
            var j = c[key];
            "" != j && (_.isString(j) || (j = JSON.stringify(j)), h += i + key + "=" + encodeURIComponent(j), i = "&")
        }
        return h
    },
    loc: function (a) { },
    setPlace: function () {
        var a = themap.getZoom(),
        b = themap.getCenter();
        return {
            center: {
                lng: b.lng,
                lat: b.lat
            },
            level: a
        }
    },
    getUser: function () {
        var a = amap.userinfo,
        b = "",
        c = "";
        return a && (b = a.mobile1 || a.mobile2 || a.mobile3 || "", c = a.email || ""),
        {
            tel: b,
            email: c
        }
    }
},
mapapi = {
    addBasicPlugin: function () {
        themap.plugin(["AMap.Scale", "AMap.MouseTool"],
        function () {
            var a = $("#themap");
            a.width();
            themapHeight = a.height();
            var b = new AMap.Scale({});
            themap.addControl(b),
            $(".amap-toolbar").appendTo("#maptoolbox"),
            $(".amap-toolbar").css({
                bottom: "auto",
                right: "24px"
            }),
            a.find(".amap-copyright").html("漏2015 楂樺痉杞欢 " + amap.mapCode + " | 浜琁CP璇� 070711鍙� | 鐢叉祴璧勫瓧11002004")
        })
    },
    initMapEvent: function () {
        var a = this;
        _addEvent(themap, "dragend",
        function (b) {
            a.setAdcode()
        }),
        _addEvent(themap, "moveend",
        function (a) { }),
        _addEvent(themap, "zoomstart",
        function (a) { }),
        _addEvent(themap, "zoomend",
        function (a) {
            amap.listenMapMove = !1;
            var b = themap.getZoom();
            amap.zoom = b
        })
    },
    setAdcode: function () {
        var a = this,
        b = themap.getBounds().getCenter(),
        c = themap.getZoom();
        a.getRegeoData(b,
        function (a) {
            var b = a.country,
            d = a.cityadcode,
            e = a.provinceadcode;
            7 > c && "" != b ? amap.adcode = "100000" : c >= 7 && 10 > c && "" != b ? amap.adcode = e : c >= 10 && "" != b ? amap.adcode = d : amap.adcode = "000000"
        })
    },
    initHotsopt: function () {
        var a = this,
        b = apicache;
        _addEvent(themap, "hotspotclick",
        function (b) {
            var c = b,
            d = c.id;
            a.getPoiInfoByid(d,
            function (b) {
                if (b.length > 0) {
                    var c = null;
                    $.each(b,
                    function (a, b) {
                        if ("marker" == b.type) {
                            if (_.isEmpty(b.list)) return;
                            c = b.list[0],
                            c.markerType = "marker-hotspot",
                            c.location = new AMap.LngLat(b.list[0].location.lng, b.list[0].location.lat)
                        }
                    }),
                    a.addInfowindow({
                        param: c
                    })
                }
            })
        }),
        _addEvent(themap, "hotspotover",
        function (c) {
            var d = c.name,
            e = c.lnglat;
            if (b.hotspotPrompt) {
                b.hotspotPrompt.setContent(a.setHotSpotPromptContent(d)),
                b.hotspotPrompt.setPosition(e),
                b.hotspotPrompt.setMap(themap)
            } else a.addHotSpotPrompt({
                pos: e,
                name: d
            })
        }),
        _addEvent(themap, "hotspotout",
        function (b) {
            a.removeHotSpotPrompt()
        })
    },
    addPlaceSearchLayer: function (a) {
        var b = this,
        c = apicache,
        d = themap,
        e = "placeSearchLayer";
        d.plugin(["AMap.PlaceSearchLayer"],
        function () {
            var f = new AMap.PlaceSearchLayer({
                map: d,
                keywords: a
            });
            amap.tileLayer[e] = f,
            _addEvent(f, "click",
            function (a) {
                c.maPoiContent = a.content,
                b.openPlaceSearchInfowindow(0)
            }),
            _addEvent(f, "mouseover",
            function (a) {
                if (c.maPoiPrompt) {
                    var d = a.content,
                    e = a.lnglat;
                    c.maPoiPrompt.setContent(b.setMaPoiPromptContent(d)),
                    c.maPoiPrompt.setPosition(e),
                    c.maPoiPrompt.setMap(themap)
                } else b.addMaPoiPrompt(a)
            }),
            _addEvent(f, "mouseout",
            function () {
                c.maPoiPrompt && c.maPoiPrompt.setMap(null)
            })
        })
    },
    openPlaceSearchInfowindow: function (a) {
        var b = this,
        c = apicache,
        d = c.maPoiContent,
        e = d.length,
        f = d[a].id;
        b.getPoiInfoByid(f,
        function (c) {
            if (c.length > 0) {
                var d = null;
                $.each(c,
                function (b, c) {
                    "marker" == c.type && (d = c.list[0], _.isEmpty(d) || (d.markerType = "marker-ma", d.location = new AMap.LngLat(c.list[0].location.lng, c.list[0].location.lat), d.maindex = a, d.macount = e))
                }),
                b.addInfowindow({
                    param: d
                })
            }
        })
    },
    clearPlaceSearchLayer: function () {
        var a = this;
        a.clearTileLayer(["placeSearchLayer"])
    },
    clearTileLayer: function (a) {
        $.each(a,
        function (a, b) {
            amap.tileLayer[b] && amap.tileLayer[b].setMap(null)
        })
    },
    addContextMenu: function () {
        var a = this,
        b = apicache,
        c = themap,
        d = "canvas-contextMenu",
        e = function (d) {
            var e = new AMap.ContextMenu({
                isCustom: !0,
                content: d
            }),
            f = null,
            g = null;
            b.contextMenu = e,
            e.className = "context-menu",
            AMap.event.addListener(c, "rightclick",
            function (d) {
                amap.mapToolLayer.ranging || (setTimeout(function () {
                    "dir" != amap.state || _.isEmpty(amap.direction) || $("#menuClearDir").removeClass("unable"),
                    "bus" == amap.dir.type || "walk" == amap.dir.type ? $("#menuVia").addClass("unable") : $("#menuVia").removeClass("unable")
                },
                400), a.getMarkerData(d.lnglat,
                function (a) {
                    var h = a.regeocode.addressComponent;
                    f = h.city || h.district ? h.city || h.province + h.district : "鏈煡鍦扮偣",
                    g = f,
                    f.length > 6 && (g = f.substr(0, 6) + "..."),
                    e.open(c, d.lnglat),
                    b.contextMenuPos = d.lnglat
                }))
            })
        };
        tpl.tplLoad({
            filename: d,
            data: {},
            callback: e
        })
    },
    isMapEmpty: function () {
        var a = themap.get("overlays");
        return !a || a.length < 1 ? !0 : !1
    },
    addMarker: function (a) {
        var b = this,
        c = apicache,
        a = a || {},
        d = a.list,
        e = 0;
        $.each(d,
        function (a, d) {
            if (!_.isEmpty(d.location)) {
                var f = d.markerType,
                g = {
                    topWhenClick: !0,
                    topWhenMouseOver: !0,
                    position: new AMap.LngLat(d.location.lng, d.location.lat)
                };
                "6" == d.tType && e++;
                var h = b.setMarkerOpt(f, d, a - e);
                if (h) {
                    g = _.extend(g, h);
                    var i = new AMap.Marker(g);
                    i.id = d.id,
                    "marker-busStop" == f ? (c.busStops[d.id] = i, c.busStopsDatas[d.id] = d) : "marker-fav" == f ? (c.favMarkers[d.id] = i, c.poiFavDatas[d.id] = d) : "marker-fav-single" == f ? c.favSingleMarker[d.id] = i : "marker-nearby" == f ? c.nearbyCenter = i : (c.markers[d.id] = i, c.poiDatas[d.id] = d),
                    _addEvent(i, "click",
                    function (a) {
                        var b = a.target.id,
                        d = c.poiDatas[b];
                        if (d && "marker-citySuggestion" == d.markerType) {
                            var e = d.adcode,
                            f = d.keyword;
                            amap.fwd("/search?" + $.param({
                                query: f,
                                query_type: "TQUERY",
                                city: e
                            }))
                        } else amap.markerState.active.poiid = b
                    }),
                    _addEvent(i, "dragend",
                    function (a) {
                        var b = a.target.getPosition(),
                        d = a.target.id,
                        e = c.poiDatas[d].type;
                        dirapi.redir(b, e)
                    })
                }
            }
        })
    },
    addSubmarker: function (a) {
        var b = this,
        c = a.list;
        _.isEmpty(c) || $.each(c,
        function (a, c) {
            var d = c.subPois;
            _.isEmpty(d) || b.addMarker({
                list: d
            })
        })
    },
    showSubmarker: function (a) { },
    showPolygon: function () { },
    addTmpMarker: function (a) {
        var b = this,
        c = apicache,
        d = "marker-tmp",
        e = {
            map: themap,
            zIndex: 10,
            position: a
        };
        e = _.extend(e, b.setMarkerOpt(d));
        var f = new AMap.Marker(e);
        c.markerTmp = f,
        _addEvent(f, "click",
        function () {
            b.openWhereInfowindow({
                pos: a,
                type: d
            })
        })
    },
    addPlanMarker: function (a) {
        var b = this,
        c = apicache,
        d = a.type,
        e = a.pos,
        f = {
            map: themap,
            zIndex: 10,
            position: e
        };
        f = _.extend(f, b.setMarkerOpt(d));
        var g = new AMap.Marker(f);
        c.markerPlan[d] = g
    },
    addSignMarker: function (a) { },
    addFavMarker: function (a) {
        var b = this;
        if (a) {
            var c = [];
            $.each(a.info.data,
            function (a, b) {
                var d = b.data;
                if ("0" == b.type) {
                    var e = {
                        location: amap.favapi.toLngLat(d.point_x, d.point_y),
                        id: d.item_id,
                        tType: "fav",
                        contain: [d.custom_address, d.custom_phone_numbers]
                    },
                    f = $.extend(!0, {},
                    d, e);
                    c.push(f)
                }
            });
            var d = [];
            d.push({
                type: "marker",
                list: c
            }),
            b.addOverlays(d, "noset")
        }
    },
    addPolyline: function (a) {
        var b = this,
        c = apicache,
        d = a.list;
        $.each(d,
        function (a, e) {
            var f = e,
            g = null,
            h = 10,
            i = null,
            j = null,
            k = null,
            l = f.polyType,
            m = null,
            n = null,
            o = !1;
            if (f.path) {
                switch ($.each(f.path,
                function (a, b) {
                    f.path[a] = new AMap.LngLat(b.lng, b.lat)
                }), l) {
                    case "poly-bus-bus":
                        j = "solid",
                        g = _.isEmpty(f.eta) ? "#" + f.color : "#1BAC2E",
                        strokeOpacity = 1,
                        o = !0,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-bus-subway":
                        j = "solid",
                        g = "#" + f.color,
                        strokeOpacity = 1,
                        o = !0,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-bus-walk":
                        j = "dashed",
                        g = "#898c8c",
                        strokeOpacity = 1,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-bus-rail":
                        j = "solid",
                        g = "#1BAC2E",
                        strokeOpacity = 1,
                        o = !0,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-bus-taxi":
                        j = "solid",
                        g = "#2e99fd",
                        strokeOpacity = 1,
                        o = !0,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-drive":
                        j = "solid",
                        g = "#9933ff",
                        strokeOpacity = 1,
                        i = null,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-walk":
                        j = "solid",
                        g = "#25c2f2",
                        strokeOpacity = 1,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-bus":
                        j = "solid",
                        g = "#25c2f2",
                        strokeOpacity = 1,
                        i = themap,
                        m = c.polylineBus,
                        n = c.polylineDatasBus;
                        break;
                    case "poly-fav-drive":
                        j = "solid",
                        g = "#9933ff",
                        strokeOpacity = 1,
                        i = themap,
                        m = c.polylinePlan,
                        n = c.polylineDatasPlan;
                        break;
                    case "poly-road":
                        j = "solid",
                        g = "#0892FB",
                        strokeOpacity = 1,
                        i = themap,
                        m = c.polylineRoad,
                        n = c.polylineDatasRoad;
                        break;
                    case "poly-district":
                        j = "dashed",
                        g = "#5341fd",
                        strokeOpacity = 1,
                        i = themap,
                        k = 2,
                        m = c.polylineDistrict,
                        n = c.polylineDatasDistrict
                }
                var p = {
                    map: i,
                    path: f.path,
                    zIndex: h,
                    strokeColor: g,
                    strokeOpacity: strokeOpacity,
                    strokeWeight: k || 6,
                    strokeStyle: j,
                    strokeDasharray: [8, 8],
                    isOutline: o,
                    outlineColor: "#fff"
                },
                q = new AMap.Polyline(p);
                "poly-road" == l ? q.id = "road-" + f.id + "-" + a : q.id = f.segid || f.id,
                m[q.id] = q,
                n[q.id] = f,
                n.length = d.length
            }
            "bus" == f.type && f.eta && !_.isEmpty(f.eta) && b.addBusEta(f.eta.lnk)
        })
    },
    addBusEta: function (a) {
        var b = apicache,
        c = {
            0: "#1BAC2E",
            1: "#1BAC2E",
            2: "#FFC700",
            3: "#E94B37",
            4: "#A81212"
        };
        if (!_.isEmpty(a)) {
            var d = {
                map: themap,
                zIndex: 11,
                strokeOpacity: 1,
                strokeWeight: 6,
                strokeStyle: "solid",
                outlineColor: "#fff"
            };
            $.each(a,
            function (a, e) {
                d.path = e.path,
                d.strokeColor = c[e.v];
                var f = new AMap.Polyline(d);
                b.polylineBusEta.push(f)
            })
        }
    },
    addTmpPolyline: function (a) {
        var b = apicache,
        c = 51,
        d = "#1c95db",
        e = {
            map: themap,
            path: a.list[0].path,
            zIndex: c,
            strokeColor: d,
            strokeOpacity: .6,
            strokeWeight: 6,
            strokeDasharray: [10, 5]
        };
        b.polylineTmp && b.polylineTmp.setMap(null);
        var f = new AMap.Polyline(e);
        b.polylineTmp = f
    },
    addRoutePolyline: function (a) {
        var b = apicache,
        c = 5,
        d = "#1BAC2E",
        e = 7,
        f = "#FFF",
        g = a.list,
        h = {
            map: themap,
            zIndex: c,
            strokeOpacity: .9,
            strokeWeight: 7,
            strokeColor: d,
            strokeDasharray: [10, 5]
        },
        i = {
            map: themap,
            isOutline: !0,
            outlineColor: "#fff",
            zIndex: e,
            strokeOpacity: .3,
            strokeWeight: 7,
            strokeColor: f,
            strokeDasharray: [10, 5]
        };
        $.each(g,
        function (a, c) {
            var d = c;
            if (d.path) {
                h.path = d.path;
                var e = new AMap.Polyline(h);
                b.polylineRoute[c.index] = e,
                i.path = d.path;
                var f = new AMap.Polyline(i);
                f.id = c.index,
                b.polylineRouteTop[c.index] = f,
                _addEvent(f, "click",
                function (a) {
                    var b = a.target.id.toString();
                    amap.carState.activeindex = b
                })
            }
        })
    },
    addHighlightPolyline: function (a) {
        var b = apicache,
        c = 20,
        d = "#f9263b",
        e = {
            map: themap,
            path: a.path,
            zIndex: c,
            strokeColor: d,
            strokeOpacity: 1,
            strokeWeight: 6,
            strokeDasharray: [10, 5]
        };
        b.polylineHighlight && b.polylineHighlight.setMap(null);
        var f = new AMap.Polyline(e);
        return b.polylineHighlight = f,
        f
    },
    addPolygon: function (a) {
        var b = apicache,
        c = a.list,
        d = /^(\d+\.\d+),(\d+\.\d+)$/;
        $.each(c,
        function (a, c) {
            var e = new Array;
            _.isEmpty(c.bound) || $.each(c.bound,
            function (a, b) {
                var c = b;
                d.test(c) && (lng = c.split(",")[0], lat = c.split(",")[1], e.push(new AMap.LngLat(lng, lat)))
            });
            var f = {
                map: themap,
                bubble: !0,
                path: e,
                strokeColor: "#0075e2",
                strokeOpacity: .75,
                strokeWeight: 1,
                fillColor: "#40a7ff",
                fillOpacity: .1
            },
            g = new AMap.Polygon(f);
            b.polygon[c.id] = g,
            b.polygonDatas[c.id] = c
        })
    },
    getRadius: function (a, b, c) {
        var d = apicache,
        e = d.nearbyDrager;
        if (null === e) c = c || 1e3;
        else {
            var f = a.getPosition();
            c = c || f.distance(b)
        }
        return c
    },
    addNearByCenter: function (a) {
        var b = this,
        c = apicache,
        d = document.createElement("div");
        d.className = "center-marker",
        d.id = "cemter-marker";
        var e = {
            id: "nearyby_center",
            map: themap,
            zIndex: 100,
            position: a,
            content: d,
            offset: {
                x: -15,
                y: -38
            }
        },
        f = new AMap.Marker(e);
        _addEvent(f, "click",
        function () {
            b.nearbyEnable()
        }),
        c.nearbyCenter = f
    },
    addNearByDrager: function (a) {
        var b = this,
        c = apicache,
        d = c.nearbyCenter.getPosition();
        a = a || 1e4;
        var e = d.offset(a, 0),
        f = document.createElement("div");
        f.className = "nearby_drager",
        f.id = "nearby_drager";
        var g = {
            id: "nearby_dragmarker",
            map: themap,
            zIndex: 999,
            position: e,
            draggable: !0,
            content: f,
            offset: {
                x: -7,
                y: -8
            }
        },
        h = new AMap.Marker(g);
        _addEvent(h, "dragging",
        function (a) {
            var e = d.lat,
            f = a.lnglat.lng;
            h.setPosition(new AMap.LngLat(f, e));
            var g = h.getPosition(),
            i = b.getRadius(c.nearbyCenter, g);
            c.nearbyCircle.setRadius(i),
            c.nearbyRadius.setPath([c.nearbyCenter.getPosition(), g]),
            c.nearbyPrompt.setPosition(g);
            var j = _formatDistance(i);
            $(".distance").html(j)
        }),
        _addEvent(h, "dragend",
        function (a) {
            var d = a.lnglat,
            e = b.getRadius(c.nearbyCenter, d),
            f = c.nearbyCenter.getPosition();
            amap.fwd("/search?" + $.param({
                query: c.nearbyKeyword,
                query_type: "RQBXY",
                longitude: f.lng,
                latitude: f.lat,
                range: e
            }))
        }),
        c.nearbyDrager = h
    },
    addNearByDragPrompt: function (a, b) {
        var c = apicache,
        d = _formatDistance(b),
        e = {
            id: "nearby_prompt",
            map: themap,
            position: a,
            zIndex: 999,
            offset: {
                x: 12,
                y: -12
            },
            content: '<div class="prompt-marker"><div class="distance">' + d + '</div><div class="close-circle-btn"></div></div>'
        };
        c.nearbyPrompt = new AMap.Marker(e)
    },
    addNearByCircle: function (a, b) {
        var c = apicache,
        d = a,
        e = {
            id: "nearby_circle",
            map: themap,
            center: d,
            radius: b,
            bubble: !0,
            strokeColor: "#2272de",
            strokeOpacity: .7,
            strokeWeight: 1,
            fillColor: "#2272de",
            fillOpacity: .2
        };
        c.nearbyCircle = new AMap.Circle(e)
    },
    addNearByRadius: function (a, b) {
        var c = apicache,
        d = {
            id: "nearby_radius",
            map: themap,
            path: [a, b],
            strokeColor: "#2272de",
            strokeOpacity: 1,
            strokeWeight: 1,
            strokeStyle: "solid"
        };
        c.nearbyRadius = new AMap.Polyline(d)
    },
    addNearBy: function (a, b) {
        var c = this,
        d = apicache;
        a = a || d.nearbyCenter.getPosition(),
        c.addNearByCenter(a),
        c.addNearByDrager(b);
        var e = d.nearbyDrager,
        f = e.getPosition(),
        g = d.nearbyCenter;
        b = c.getRadius(g, f, b),
        c.addNearByCircle(a, b),
        c.addNearByRadius(a, f),
        c.addNearByDragPrompt(f, b)
    },
    reAddNearBy: function (a, b) {
        var c = apicache;
        a = a || c.nearbyCenter.getPosition(),
        b = b || 1e3;
        var d = a.offset(b, 0);
        c.nearbyCenter.setPosition(a),
        c.nearbyCircle.setCenter(a),
        c.nearbyCircle.setRadius(b),
        c.nearbyDrager.setPosition(d),
        c.nearbyRadius.setPath([a, d]),
        c.nearbyPrompt.setPosition(d);
        var e = _formatDistance(b);
        $(".distance").html(e)
    },
    nearbyEnable: function () {
        var a = apicache;
        a.nearbyDrager.show(),
        a.nearbyPrompt.show(),
        a.nearbyCircle.show(),
        a.nearbyRadius.show()
    },
    nearbyDisable: function () {
        var a = apicache;
        a.nearbyDrager.hide(),
        a.nearbyPrompt.hide(),
        a.nearbyCircle.hide(),
        a.nearbyRadius.hide()
    },
    doNearby: function (a, b) {
        var c = this,
        b = b || 1e3;
        c.addNearBy(a, b)
    },
    addInfowindow: function (a) {
        var b = this,
        c = apicache,
        d = a.id,
        e = null;
        if (d) e = c.poiDatas[d] || c.busStopsDatas[d] || c.polylineDatasPlan[d] || c.poiFavDatas[d];
        else {
            if (!a.param) return;
            e = a.param
        }
        var f = a.type || e.markerType || e.polyType,
        g = b.setInfowindowOffset(f),
        h = a.pos || e.location && new AMap.LngLat(e.location.lng, e.location.lat) || e.start_location,
        i = function (a) {
            if (!c.infowindow) {
                var b = {
                    isCustom: !0,
                    autoMove: !1,
                    content: a,
                    position: h
                };
                c.infowindow = new AMap.InfoWindow(b)
            }
            var d = c.infowindow;
            d.setOffset(g),
            d.setContent(a),
            d.open(themap, h),
            themap.setCenter(h, !0)
        };
        b.setInfowindowHtml({
            param: e,
            type: f,
            pos: h,
            callback: i
        })
    },
    getInfowindow: function (a, b) {
        var c = $("#" + a).html(),
        d = "canvas-poiInfowindow";
        tpl.tplLoad({
            filename: d,
            data: {
                html: c,
                id: a
            },
            callback: b
        })
    },
    setInfowindowOffset: function (a) {
        var b = null;
        switch (a) {
            case "marker-poi":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-sub":
                b = new AMap.Pixel(0, -22);
                break;
            case "marker-poi-geo":
                b = new AMap.Pixel(0, -38);
                break;
            case "marker-station":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-single":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-fav-single":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-fav":
                b = new AMap.Pixel(-4, -18);
                break;
            case "marker-tmp-sign":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-tmp":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-busStop":
                b = new AMap.Pixel(0, -14);
                break;
            case "marker-placeSearch":
                b = new AMap.Pixel(40, -53);
                break;
            case "marker-hotspot":
                b = new AMap.Pixel(0, -20);
                break;
            case "marker-ma":
                b = new AMap.Pixel(0, -10);
                break;
            case "marker-drive-from":
            case "marker-drive-to":
            case "marker-walk-from":
            case "marker-walk-to":
            case "marker-bus-from":
            case "marker-bus-to":
                b = new AMap.Pixel(0, -45);
                break;
            case "marker-bus-busStop":
            case "marker-bus-subwayStop":
            case "marker-bus-railwayStop":
            case "marker-bus-taxistop":
                b = new AMap.Pixel(0, -20);
                break;
            case "poly-drive":
            case "poly-walk":
                b = new AMap.Pixel(0, -20);
                break;
            case "marker-plan-poi":
                b = new AMap.Pixel(0, -90)
        }
        return b
    },
    setInfowindowHtml: function (a) {
        var b = this,
        c = a.callback;
        b.setInfowindowData(a,
        function (a) {
            tpl.tplLoad({
                filename: a.filename,
                data: a.data,
                callback: c
            })
        })
    },
    setInfowindowData: function (a, b) {
        var c = this,
        d = apicache,
        e = a.param,
        f = a.type,
        g = (a.index, a.pos),
        h = "",
        i = null;
        switch (f) {
            case "marker-poi":
                var j = e.id,
                k = $("#" + j),
                l = k.find(".poi-icons").children(),
                m = "",
                n = k.clone();
                n.find(".serppanel").remove();
                var o = n.html(),
                p = d.poiDatas[j];
                l.length > 0 && (m = "poi-icon"),
                h = "canvas-poiInfowindow",
                i = {
                    html: o,
                    id: j,
                    name: p.name || "",
                    address: p.address || "",
                    tel: p.tel || "",
                    icon: m,
                    pos: new AMap.LngLat(p.location.lng, p.location.lat),
                    tType: p.tType
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-sub":
                h = "canvas-subPoiInfowindow",
                i = {
                    id: e.id,
                    name: e.name || "",
                    pos: new AMap.LngLat(e.location.lng, e.location.lat),
                    address: e.address || "",
                    tel: e.tel || "",
                    tType: e.tType
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-poi-geo":
                var j = e.id,
                k = $("#" + j),
                l = k.find(".poi-icons").children(),
                m = "",
                o = k.html(),
                p = d.poiDatas[j];
                l.length > 0 && (m = "poi-icon"),
                h = "canvas-poiInfowindow",
                i = {
                    html: o,
                    id: j,
                    name: p.name || "",
                    address: p.address || "",
                    tel: p.tel || "",
                    icon: m,
                    pos: new AMap.LngLat(p.location.lng, p.location.lat),
                    tType: p.tType
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-fav":
                var j = e.id,
                k = $("#" + j),
                o = k.html(),
                p = d.poiFavDatas[j];
                h = "canvas-favinfowindow",
                i = {
                    html: o,
                    id: j,
                    name: p.name || "",
                    address: p.address || "",
                    tel: p.tel || "",
                    pos: p.location,
                    tType: p.tType
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-tmp":
                h = "canvas-whereInfowindow";
                var q = e.addressComponent,
                r = q.adcode,
                s = q.province + q.district + q.street,
                t = e.pois[0].name;
                i = {
                    id: "",
                    adcode: r,
                    name: s,
                    pos: g,
                    address: "",
                    tel: "",
                    nearpoi: t
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-hotspot":
                h = "canvas-hotspotInfowindow",
                i = e,
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: {
                        poiList: i
                    }
                },
                b(res);
                break;
            case "marker-ma":
                h = "canvas-maInfowindow",
                i = e,
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: {
                        poiList: i
                    }
                },
                b(res);
                break;
            case "marker-busStop":
                h = "canvas-busStopInfowindow";
                var s = e.name,
                j = e.id,
                a = (e.tType, {
                    id: j,
                    name: s
                });
                c.getBusStopData(a,
                function (a) {
                    var c = apicache.busStopsDatas[a.id];
                    i = {
                        id: a.id,
                        name: a.name,
                        address: "",
                        tel: "",
                        lines: a.busline_list,
                        tType: c.tType,
                        pos: c.location
                    },
                    amap.iwdata = i,
                    res = {
                        filename: h,
                        data: i
                    },
                    b(res)
                });
                break;
            case "poly-drive":
                var u = $("#planList .planTitle.current").attr("index") - 0,
                j = e.id,
                v = $("." + j),
                k = null,
                o = "";
                k = v.length > 1 ? $("." + j).get(u) : $("." + j).get(0),
                o = k.outerHTML;
                var w = d.polylineDatasPlan[j];
                h = "canvas-stepInfowindow",
                i = {
                    html: o,
                    id: j,
                    cur: j.split("-")[1],
                    steps: d.polylineDatasPlan.length,
                    pos: w.start_location
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "poly-walk":
                var j = e.id,
                k = $("#" + j).clone()[0],
                o = k.outerHTML,
                w = d.polylineDatasPlan[j];
                h = "canvas-stepInfowindow",
                i = {
                    html: o,
                    id: j,
                    cur: j.split("-")[1],
                    steps: d.polylineDatasPlan.length,
                    pos: w.start_location
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-drive-from":
            case "marker-drive-to":
            case "marker-walk-from":
            case "marker-walk-to":
                var j = e.id,
                k = $("#" + j).clone()[0];
                o = k.outerHTML;
                var p = d.poiDatas[j];
                h = "canvas-stepInfowindow",
                i = {
                    html: o,
                    id: j,
                    cur: f.split("-")[2],
                    steps: d.polylineDatasPlan.length,
                    pos: p.location
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-bus-from":
            case "marker-bus-to":
                var j = e.id,
                k = $("#" + j).clone()[0];
                o = k.outerHTML;
                var p = d.poiDatas[j];
                h = "canvas-stepInfowindow",
                i = {
                    html: o,
                    id: j,
                    cur: f.split("-")[2],
                    steps: d.polylineDatasPlan.length + 1,
                    pos: p.location
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res);
                break;
            case "marker-bus-busStop":
            case "marker-bus-subwayStop":
            case "marker-bus-railwayStop":
                var j = e.id,
                x = d.poiDatas[j];
                h = "canvas-busStepInfowindow",
                i = {
                    id: j,
                    stopdata: x,
                    cur: j.split("-")[2],
                    steps: d.polylineDatasPlan.length + 1,
                    pos: x.location
                },
                amap.iwdata = i,
                res = {
                    filename: h,
                    data: i
                },
                b(res)
        }
    },
    colseInfowindow: function () {
        var a = apicache,
        b = a.infowindow;
        b && b.close()
    },
    addWhere: function (a) {
        var b = this;
        if (a) {
            var c = "marker-tmp";
            b.addTmpMarker(a),
            b.openWhereInfowindow({
                pos: a,
                type: c
            })
        }
    },
    openWhereInfowindow: function (a) {
        var b = this,
        c = a.pos,
        d = a.type;
        b.getMarkerData(c,
        function (a) {
            a = "OK" == a.info ? a.regeocode : "鎶辨瓑锛佹殏鏃舵湭鑳借幏鍙栦俊鎭�",
            b.addInfowindow({
                param: a,
                type: d,
                pos: c
            })
        })
    },
    addPlanPlace: function (a) {
        var b = this,
        c = a.type,
        d = a.pos;
        b.addPlanMarker(a),
        b.getMarkerData(d,
        function (e) {
            var f = null;
            "OK" == e.info ? f = {
                rego: e.regeocode,
                type: "rego",
                pos: d
            } : a = null;
            var g = b.setPlanData(f);
            switch (c) {
                case "marker-tmp-from":
                    g.id = "from",
                    amap.dir.from = g;
                    break;
                case "marker-tmp-to":
                    g.id = "to",
                    amap.dir.to = g;
                    break;
                case "marker-tmp-via":
                    amap.dir.via = [],
                    amap.dir.via.push(g)
            }
            amap.dir.from.name && amap.dir.from.lnglat && amap.dir.to.name && amap.dir.to.lnglat && (b.clearAllOverlays(), amap.fwd("/dir/?" + $.param(amap.dir)))
        })
    },
    setPlanData: function (a) {
        var b = null,
        c = null,
        d = null,
        e = null,
        f = null,
        g = null;
        if (a) {
            var h = a.type;
            if (h && "rego" == h) {
                var i = a.rego;
                if (i.roads && i.roads[0]) {
                    var j = i.roads[0];
                    b = j.name,
                    e = a.pos.lng + "," + a.pos.lat,
                    c = j.id,
                    d = i.addressComponent.adcode || amap.adcode,
                    f = j.location.lng + "," + j.location.lat
                } else b = "浣嶇疆閬撹矾",
                e = a.pos.lng + "," + a.pos.lat,
                d = i.addressComponent.adcode || amap.adcode;
                g = {
                    name: b,
                    id: "",
                    adcode: d,
                    lnglat: e,
                    modxy: f
                }
            }
        } else g = null;
        return g
    },
    setObjFitView: function (a) {
        _.isEmpty(a) || themap.setFitView(a, !1, [50, 50, 515, 30])
    },
    setFitviewBeside: function (a) {
        if (!_.isEmpty(a)) {
            var b = themap.get("overlays"),
            c = b.concat();
            $.each(a,
            function (a, b) {
                var d = c.indexOf(b);
                d > -1 && c.splice(d, 1)
            }),
            themap.setFitView(c, !1, [50, 50, 515, 30])
        }
    },
    addOverlays: function (a, b) {
        var c = this,
        d = b || "set";
        if (a && a.length > 0) {
            $.each(a,
            function (a, b) {
                var d = b.type.toLowerCase();
                switch (d) {
                    case "marker":
                        c.addMarker(b),
                        c.addSubmarker(b);
                        break;
                    case "polyline":
                        c.addPolyline(b);
                        break;
                    case "polygon":
                        c.addPolygon(b);
                        break;
                    case "polyline-tmp":
                        c.addTmpPolyline(b);
                        break;
                    case "polyline-route":
                        c.addRoutePolyline(b)
                }
            });
            var e = themap.get("overlays"),
            f = e.concat();
            if ("set" == d) {
                if (amap.pos.success) {
                    var g = [amap.pos.iw, amap.pos.circle, amap.pos.marker];
                    c.setFitviewBeside(g)
                } else c.setObjFitView(f);
                $("#themap").show(),
                setTimeout(function () {
                    c.setAdcode()
                },
                500)
            }
        }
    },
    clearOverlays: function (a) {
        for (var b = apicache,
        c = 0; c < a.length; c++) {
            var d = a[c];
            switch (d) {
                case "marker":
                    var e = "",
                    f = b.markers;
                    for (e in f) f.hasOwnProperty(e) && (f[e].setMap(null), f[e] = null, delete f[e]);
                    var g = b.poiDatas;
                    for (e in g) g.hasOwnProperty(e) && (g[e] = null, delete g[e]);
                    break;
                case "marker-fav":
                    var e = "",
                    f = b.favMarkers;
                    for (e in f) f.hasOwnProperty(e) && (f[e].setMap(null), f[e] = null, delete f[e]);
                    var g = b.poiFavDatas;
                    for (e in g) g.hasOwnProperty(e) && (g[e] = null, delete g[e]);
                    break;
                case "marker-fav-single":
                    var e = "",
                    f = mvce.M.favSingleMarkers;
                    for (e in f) f.hasOwnProperty(e) && (f[e].setMap(null), f[e] = null, delete f[e]);
                    var g = mvce.M.favSingleData;
                    for (e in g) g.hasOwnProperty(e) && (g[e] = null, delete g[e]);
                    break;
                case "marker-tmp":
                    var h = b.markerTmp;
                    h && (h.setMap(null), h = null);
                    break;
                case "marker-tmp-sign":
                    var e = "",
                    i = mvce.M.tmpMarkers;
                    for (e in i) i.hasOwnProperty(e) && (i[e].setMap(null), i[e] = null, delete i[e]);
                    break;
                case "marker-tmp-from":
                    var j = b.markerPlan[d];
                    j && (j.setMap(null), j = null);
                    break;
                case "marker-tmp-to":
                    var j = b.markerPlan[d];
                    j && (j.setMap(null), j = null);
                    break;
                case "marker-tmp-via":
                    var j = b.markerPlan[d];
                    j && (j.setMap(null), j = null);
                    break;
                case "marker-busStop":
                    var k = "",
                    l = b.busStops;
                    for (k in l) l.hasOwnProperty(k) && (l[k].setMap(null), l[k] = null, delete l[k]);
                    var m = b.busStopsDatas;
                    for (k in m) m.hasOwnProperty(k) && (m[k] = null, delete m[k]);
                    break;
                case "marker-qr":
                    var n = b.markerQr;
                    n && (n.setMap(null), n = null);
                    break;
                case "infowindow":
                    b.infowindow && b.infowindow.close();
                    break;
                case "poly":
                    var o = "",
                    p = mvce.M.polys;
                    for (o in p) p.hasOwnProperty(o) && (p[o].setMap(null), p[o] = null, delete p[o]);
                    var q = mvce.M.polyDatas;
                    for (o in q) q.hasOwnProperty(o) && (q[o] = null, delete q[o]);
                    break;
                case "polyline-bus":
                    var o = "",
                    p = b.polylineBus;
                    for (o in p) p.hasOwnProperty(o) && (p[o].setMap(null), p[o] = null, delete p[o]);
                    var q = b.polylineDatasBus;
                    for (o in q) q.hasOwnProperty(o) && (q[o] = null, delete q[o]);
                    break;
                case "polyline-road":
                    var o = "",
                    p = b.polylineRoad;
                    for (o in p) p.hasOwnProperty(o) && (p[o].setMap(null), p[o] = null, delete p[o]);
                    var q = b.polylineDatasRoad;
                    for (o in q) q.hasOwnProperty(o) && (q[o] = null, delete q[o]);
                    break;
                case "polyline-district":
                    var o = "",
                    p = b.polylineDistrict;
                    for (o in p) p.hasOwnProperty(o) && (p[o].setMap(null), p[o] = null, delete p[o]);
                    var q = b.polylineDatasDistrict;
                    for (o in q) q.hasOwnProperty(o) && (q[o] = null, delete q[o]);
                    break;
                case "polyline-plan":
                    var o = "",
                    p = b.polylinePlan;
                    for (o in p) p.hasOwnProperty(o) && (p[o].setMap(null), p[o] = null, delete p[o]);
                    var q = b.polylineDatasPlan;
                    for (o in q) q.hasOwnProperty(o) && (q[o] = null, delete q[o]);
                    break;
                case "polyline-tmp":
                    b.polylineTmp && b.polylineTmp.setMap(null),
                    b.polylineTmp = null,
                    b.polylineTmp && b.polylineTmp.hide();
                    break;
                case "polyline-route":
                    var r = "",
                    s = b.polylineRoute;
                    for (r in s) s.hasOwnProperty(r) && (s[r].setMap(null), s[r] = null, delete s[r]);
                    break;
                case "polyline-eta":
                    var t = b.polylineBusEta;
                    $.each(t,
                    function (a, b) {
                        b.setMap(null)
                    }),
                    t = [];
                    break;
                case "nearby":
                    b.nearbyCenter && b.nearbyCenter.setMap(null),
                    b.nearbyDrager && b.nearbyDrager.setMap(null),
                    b.nearbyCircle && b.nearbyCircle.setMap(null),
                    b.nearbyRadius && b.nearbyRadius.setMap(null),
                    b.nearbyPrompt && b.nearbyPrompt.setMap(null),
                    b.nearbyKeyword = null,
                    b.nearbyCenter = null,
                    b.nearbyDrager = null,
                    b.nearbyCircle = null,
                    b.nearbyRadius = null,
                    b.nearbyPrompt = null;
                    break;
                case "polygon":
                    var u = "",
                    v = b.polygon;
                    for (u in v) v.hasOwnProperty(u) && (v[u].setMap(null), v[u] = null, delete v[u]);
                    var w = b.polygonDatas;
                    for (u in w) w.hasOwnProperty(u) && (w[u] = null, delete w[u])
            }
        }
    },
    clearAllOverlays: function (a) {
        var b = this,
        c = apicache,
        d = ["marker", "marker-tmp", "marker-busStop", "infowindow", "polyline-bus", "polyline-road", "polyline-district", "polyline-plan", "nearby", "polygon", "marker-tmp-from", "marker-tmp-to", "marker-tmp-via", "marker-fav", "marker-qr", "polyline-route", "polyline-eta"];
        a || c.dragRoute && c.dragRoute.destroy(),
        b.clearPlaceSearchLayer(),
        b.clearOverlays(d),
        dirapi.clearDirQrcode()
    },
    setMarkerOpt: function (a, b, c) {
        var d = this,
        e = apicache,
        f = themap,
        g = null;
        if ("marker-poi" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -9,
                y: -30
            }
        };
        else if ("marker-sub" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -18,
                y: -18
            }
        };
        else if ("marker-poi-geo" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -9,
                y: -30
            }
        };
        else if ("marker-fav" == a) g = {
            map: f,
            zIndex: 10,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -14,
                y: -14
            }
        };
        else if ("marker-station" == a) g = {
            map: f,
            zIndex: 10,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -12,
                y: -30
            }
        };
        else if ("marker-busStop" == a) g = {
            map: f,
            zIndex: 11,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -6,
                y: -6
            }
        };
        else if ("marker-bus-busStop" == a) g = {
            map: f,
            zIndex: 11,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -12,
                y: -12
            }
        };
        else if ("marker-bus-subwayStop" == a) g = {
            map: f,
            zIndex: 11,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -12,
                y: -12
            }
        };
        else if ("marker-bus-railwayStop" == a) g = {
            map: f,
            zIndex: 11,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -12,
                y: -12
            }
        };
        else if ("marker-bus-taxistop" == a) g = {
            map: f,
            zIndex: 11,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -12,
                y: -12
            }
        };
        else if ("marker-tmp" == a || "marker-single" == a || "marker-fav-single" == a) g = {
            map: f,
            zIndex: 10,
            content: d.creatMarkerContent(a),
            offset: {
                x: -11,
                y: -30
            }
        };
        else if ("marker-tmp-sign" == a) g = {
            map: f,
            zIndex: 10,
            content: d.creatMarkerContent(a),
            offset: {
                x: $.browser.msie ? -4 : -6,
                y: $.browser.msie ? -25 : -27
            }
        };
        else if ("marker-tmp-from" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            }
        };
        else if ("marker-tmp-to" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            }
        };
        else if ("marker-tmp-via" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            }
        };
        else if ("marker-drive-from" == a) g = {
            map: null,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            }
        };
        else if ("marker-drive-to" == a) g = {
            map: null,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            }
        };
        else if ("marker-walk-from" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            },
            draggable: !0
        };
        else if ("marker-walk-to" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b),
            offset: {
                x: -11,
                y: -37
            },
            draggable: !0
        };
        else if ("marker-plan-poi" == a) g = {
            map: f,
            zIndex: 10,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -12,
                y: -30
            }
        };
        else if ("marker-bus-from" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -11,
                y: -37
            },
            draggable: !0
        };
        else if ("marker-bus-to" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -11,
                y: -37
            },
            draggable: !0
        };
        else if ("marker-favdrive-from" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -11,
                y: -37
            },
            draggable: !0
        };
        else if ("marker-favdrive-to" == a) g = {
            map: f,
            zIndex: 12,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -11,
                y: -37
            },
            draggable: !0
        };
        else if ("marker-nearby" == a) {
            var h = b.range || 1e3;
            e.nearbyKeyword = b.keywords,
            d.doNearby(new AMap.LngLat(b.location.lng, b.location.lat), h)
        } else "marker-citySuggestion" == a && (g = {
            map: f,
            content: d.creatMarkerContent(a, b, c),
            offset: {
                x: -(14 + 7 * (b.total + "").length) / 2,
                y: -28
            }
        });
        return g
    },
    setPolylineOpt: function (a) { },
    setPloygonOpt: function (a) { },
    creatMarkerContent: function (a, b, c, d) {
        var e = document.createElement("div");
        switch (a) {
            case "marker-curpos":
                e.className = a,
                e.id = "marker-curpos";
                break;
            case "marker-poi":
                e.className = a + " marker-normal marker-" + c,
                e.id = "marker-" + b.id,
                e.title = b.name,
                $(e).on("mousemove",
                function (a) {
                    a.stopPropagation()
                });
                break;
            case "marker-sub":
                e.className = a + " marker-normal marker-sub-" + b.subtype,
                e.id = "marker-" + b.id,
                e.title = b.name,
                $(e).on("mousemove",
                function (a) {
                    a.stopPropagation()
                });
                break;
            case "marker-poi-geo":
                e.className = a + " marker-geo",
                e.id = "marker-" + b.id;
                break;
            case "marker-fav":
                e.className = a,
                e.id = "marker-" + b.id;
                break;
            case "marker-station":
                e.className = a + " marker-normal marker-" + c,
                e.id = "marker-" + b.id;
                break;
            case "marker-single":
                e.className = a,
                e.id = "marker-single";
                break;
            case "marker-fav-single":
                e.className = a,
                e.id = "marker-fav-single";
                break;
            case "marker-tmp":
                e.className = a,
                e.id = "marker-tmp";
                break;
            case "marker-tmp-sign":
                e.className = a;
                break;
            case "marker-tmp-from":
                e.className = a + " marker-route";
                break;
            case "marker-tmp-via":
                e.className = a + " marker-route";
                break;
            case "marker-tmp-to":
                e.className = a + " marker-route";
                break;
            case "marker-busStop":
                e.className = a,
                e.id = "marker-busStop-" + b.id;
                break;
            case "marker-drive-from":
                e.className = a + " marker-route",
                e.id = b.id;
                break;
            case "marker-drive-to":
                e.className = a + " marker-route",
                e.id = b.id;
                break;
            case "marker-walk-from":
                e.className = a + " marker-route",
                e.id = b.id;
                break;
            case "marker-walk-to":
                e.className = a + " marker-route",
                e.id = b.id;
                break;
            case "marker-bus-from":
                e.className = a + " marker-route markerbus-" + c,
                e.id = b.id;
                break;
            case "marker-bus-to":
                e.className = a + " marker-route markerbus-" + c,
                e.id = b.id;
                break;
            case "marker-plan-poi":
                e.className = a + " markerPlan-" + c,
                e.id = "marker-" + b.id;
                break;
            case "marker-bus-busStop":
                e.className = a + " marker-stop markerbus-" + c,
                e.id = b.id;
                break;
            case "marker-bus-subwayStop":
                e.className = a + " marker-stop markerbus-" + c,
                e.id = b.id;
                break;
            case "marker-bus-railwayStop":
                e.className = a + " marker-stop markerbus-" + c,
                e.id = b.id;
                break;
            case "marker-bus-taxistop":
                e.className = a + " marker-stop markerbus-" + c,
                e.id = b.id;
                break;
            case "marker-favdrive-from":
                e.className = a + "marker-route",
                e.id = b.id;
                break;
            case "marker-favdrive-to":
                e.className = a + "marker-route",
                e.id = b.id;
                break;
            case "marker-citySuggestion":
                e.className = a,
                e.id = b.id,
                e.innerText = b.total,
                e.setAttribute("adcode", b.adcode),
                e.title = b.name + "鍏�" + b.total + "涓粨鏋�";
                var f = document.createElement("div");
                f.className = a + "-footer",
                e.appendChild(f)
        }
        if (d) {
            var g = document.createElement("div");
            g.innerText = d,
            e.appendChild(g)
        }
        return e
    },
    getMarkerData: function (a, b) {
        var c = themap;
        c.plugin(["AMap.Geocoder"],
        function () {
            var c = new AMap.Geocoder({
                radius: 1e3,
                extensions: "all"
            });
            AMap.event.addListener(c, "complete",
            function (a) {
                if ("OK" == a.info) {
                    var c = a.regeocode;
                    0 == c.pois.length && c.pois.push({
                        name: "鏈煡鍦扮偣"
                    }),
                    0 == c.roads.length && c.roads.push({
                        name: "鏈煡閬撹矾"
                    })
                }
                b(a)
            }),
            c.getAddress(a)
        })
    },
    getRegeoData: function (a, b) {
        var c = {
            longitude: a.lng,
            latitude: a.lat
        };
        amap.get(amap.service.regeo + $.param(c),
        function (a) {
            var c = a.data;
            "1" == c.code ? (c.poi_list && 0 == c.poi_list.length && c.poi_list.push({
                name: "鏈煡鍦扮偣"
            }), c.road_list && 0 == c.road_list.length && c.road_list.push({
                name: "鏈煡閬撹矾"
            }), b(c)) : b(c)
        })
    },
    getPoiInfoByid: function (a, b) {
        var c = {
            id: a,
            query_type: "IDQ"
        };
        $.get(amap.service.poiInfo + $.param(c),
        function (a) {
            "1" == a.status ? b(a.data) : (console.info("search error:"), console.error(a))
        })
    },
    getBusStopData: function (a, b) {
        var c = {
            poiid: a.id,
            city: amap.adcode || 11e4,
            pagesize: 10,
            pagenum: 1
        },
        d = a.name;
        amap.get(amap.service.poiBusLine + $.param(c),
        function (c) {
            "1" == c.status ? (c.data.id = a.id, c.data.name = d, b(c.data)) : (console.info("search error:"), console.error(c))
        })
    },
    getNearbyData: function (a, b, c, d) {
        var e, f = themap;
        f.plugin(["AMap.PlaceSearch"],
        function () {
            e = new AMap.PlaceSearch({
                city: PCMAP.city.adcode,
                rankBy: "distance"
            }),
            AMap.event.addListener(e, "complete", d),
            e.searchNearBy(a, b, c)
        })
    },
    setHotSpotPromptContent: function (a) {
        var b = document.createElement("div");
        b.className = "marker-hot-prompt";
        var c = document.createElement("div");
        return c.className = "hotspot-name",
        c.innerHTML = a,
        b.appendChild(c),
        b
    },
    addHotSpotPrompt: function (a) {
        var b = this,
        c = apicache;
        if (a) {
            var d = a.pos,
            e = a.name,
            f = "marker-hotspot-prompt",
            g = {
                id: "hotspot-prompt-marker",
                map: themap,
                position: d,
                zIndex: 999,
                content: b.setHotSpotPromptContent(e),
                offset: {
                    x: 22,
                    y: 12
                }
            },
            h = new AMap.Marker(g);
            h.id = f,
            c.hotspotPrompt = h
        }
    },
    removeHotSpotPrompt: function () {
        var a = apicache;
        a.hotspotPrompt && (a.hotspotPrompt.setMap(null), a.hotspotPrompt = null)
    },
    setMaPoiPromptContent: function (a) {
        var b = document.createElement("div");
        b.className = "marker-ma-prompt";
        var c = a.length;
        c > 5 && (c = 5);
        for (var d = 0; c > d; d++) {
            var e = document.createElement("div");
            e.className = "ma-poi-name",
            e.innerHTML = a[d].name,
            b.appendChild(e)
        }
        if (c > 5) {
            var f = document.createElement("div");
            f.className = "ma-poi-name-other",
            f.innerHTML = "......",
            b.appendChild(f)
        }
        return b
    },
    addMaPoiPrompt: function (a) {
        var b = this,
        c = apicache,
        d = a.content,
        e = a.lnglat,
        f = "marker-ma-prompt",
        g = {
            map: themap,
            zIndex: 10,
            position: e,
            content: b.setMaPoiPromptContent(d),
            offset: {
                x: 15,
                y: 15
            }
        },
        h = new AMap.Marker(g);
        h.id = f,
        c.maPoiPrompt = h
    },
    highlightOverlays: function (a) {
        var b = apicache,
        c = null,
        d = "#themap .amap-marker";
        $("#marker-" + a).closest(d).hasClass("active") || ($(d).removeClass("highlight"), a && ($("#marker-" + a).closest(d).addClass("highlight"), c = b.poiDatas[a] && b.poiDatas[a].parentId, c && $("#marker-" + c).closest(d).addClass("highlight")))
    },
    unHighlightOverlays: function (a) {
        var b = "#themap .amap-marker";
        $("#marker-" + a).closest(b).hasClass("active") || (a ? $(b).removeClass("highlight") : $(b).removeClass("highlight"))
    },
    activeOverlays: function (a) {
        var b = apicache,
        c = null,
        d = "#themap .amap-marker";
        $(d).removeClass("active").removeClass("highlight"),
        a && ($("#marker-" + a).closest(d).addClass("active"), c = b.poiDatas[a] && b.poiDatas[a].parentId, c && $("#marker-" + c).closest(d).addClass("active"))
    },
    unActiveOverlays: function (a) {
        var b = "#themap .amap-marker";
        a ? $(b).removeClass("active") : $(b).removeClass("active")
    }
},
dirapi = {
    timeTag: {
        0: "姝ｅ父",
        1: "鍙兘瀛樺湪椋庨櫓",
        2: "宸茬粡鍋滆繍",
        3: "涔樺潗鏃堕棿澶棭"
    },
    busTimeTag: {
        0: "姝ｅ父",
        2: "宸茬粡鍋滆繍",
        3: "鍙兘鏃╃彮杞︽湭鍙戝嚭",
        4: "鍙兘閿欒繃鏈彮杞�"
    },
    minTag: {
        0: "",
        1: "鏃堕棿鐭�",
        2: "姝ヨ灏�",
        4: "鎹箻灏�",
        7: "鏈€浣�",
        8: "鐩磋揪"
    },
    minTagSign: {
        0: "",
        1: "lesstime",
        2: "lesswalk",
        4: "lesstransfer",
        7: "best",
        8: "nonstop"
    },
    etaStatus: {
        0: "",
        1: "鐣呴€�",
        2: "缂撹",
        3: "鎷ュ牭",
        4: "闈炲父鎷ュ牭"
    },
    etaStatusSign: {
        0: "",
        1: "smooth",
        2: "slow",
        3: "jam",
        4: "jamer"
    },
    redir: function (a, b) {
        var c = this,
        d = {
            pos: a,
            type: b
        },
        e = amap.dir.from,
        f = amap.dir.to,
        g = amap.dir.via,
        h = amap.dir.policy,
        i = amap.dir.type;
        c.planRegeo(d,
        function (a) {
            "from" == b ? e = a : "to" == b && (f = a);
            var c = {
                type: i,
                policy: h,
                from: e,
                to: f,
                via: g
            };
            amap.fwd("/dir/?" + $.param(c))
        })
    },
    clearDir: function () {
        var a = this,
        b = apicache;
        b.dragRoute && b.dragRoute.destroy();
        var c = b.polylinePlan;
        $.each(c,
        function (a, b) {
            b.setMap(null)
        }),
        c = {},
        b.polylineDatasPlan = {};
        var d = b.markers;
        $.each(d,
        function (a, b) {
            b.setMap(null)
        }),
        d = {},
        b.poiDatas = {},
        a.clearAllRoute(),
        a.clearCarTmc()
    },
    clearAllRoute: function () {
        var a = apicache;
        a.polylineRoute,
        a.polylineRouteTop;
        $.each(a.polylineRouteTop,
        function (a, b) {
            b.setMap(null)
        }),
        $.each(a.polylineRoute,
        function (a, b) {
            b.setMap(null)
        }),
        a.polylineRoute = {},
        a.polylineRouteTop = {}
    },
    clearCarTmc: function () {
        var a = apicache,
        b = a.polylineRouteTmc;
        $.each(b,
        function (a, b) {
            $.each(b,
            function (a, b) {
                b.setMap(null)
            })
        }),
        b = {}
    },
    clearBusEta: function () {
        var a = apicache,
        b = a.polylineBusEta;
        $.each(b,
        function (a, b) {
            b.setMap(null)
        }),
        b = {}
    },
    closeDir: function () {
        var a = apicache,
        b = amap.dir.type,
        c = a.dragRoute,
        d = a.trans,
        e = a.walking;
        c && c.close(),
        d && d.close(),
        e && e.close(),
        "car" == b ? c && c.open() : "bus" == b ? d && d.open() : "walk" == b && e && e.open()
    },
    planRegeo: function (a, b) {
        var c = a.pos,
        d = a.type;
        mapapi.getRegeoData(c,
        function (a) {
            var e = a.adcode,
            f = null,
            g = null,
            h = null,
            i = null;
            if (a.road_list && a.road_list.length > 0) {
                var j = a.road_list[0];
                g = j.name,
                i = ""
            } else g = "from" == d ? "璧风偣" : "to" == d ? "缁堢偣" : "鏈煡閬撹矾",
            i = "";
            f = d,
            h = c.lng + "," + c.lat;
            var k = {
                id: "",
                name: g,
                lnglat: h,
                adcode: e,
                modxy: i
            };
            b(k)
        })
    },
    stepHighlight: function (a) {
        var b = apicache,
        c = a,
        d = b.polylineDatasPlan,
        e = b.polylinePlan;
        if ("poly-drive" == d["step-" + c].polyType) e["step-" + c].setMap(themap);
        else {
            var f = "step-" + amap.walkState.active;
            $.each(e,
            function (a, b) {
                f != a && b.setOptions({
                    strokeColor: "#25c2f2",
                    lineCap: "round",
                    lineJion: "round",
                    strokeOpacity: .8,
                    zIndex: 51
                })
            })
        }
        e["step-" + c].setOptions({
            strokeColor: "#FF0000",
            lineCap: "round",
            lineJion: "round",
            strokeOpacity: .8,
            zIndex: 51
        })
    },
    stepFitviewBus: function (a) {
        var b = apicache,
        c = "step-" + a,
        d = b.polylinePlan[c];
        mapapi.setObjFitView([d])
    },
    unStepFitviewBus: function (a) {
        var b = apicache;
        b.polylinePlan;
        mapapi.setObjFitView()
    },
    stepHighlightBus: function (a) {
        var b = apicache,
        c = "step-" + a,
        d = b.polylineDatasPlan[c],
        e = b.polylineHighlight;
        e ? e.setPath(d.path) : mapapi.addHighlightPolyline(d),
        mapapi.setObjFitView([b.polylineHighlight])
    },
    stepUnHighlightBus: function () {
        var a = apicache;
        a.polylineHighlight && a.polylineHighlight.setMap(null)
    },
    stepUnHighlight: function (a) {
        var b = apicache,
        c = a,
        d = amap.dir.type,
        e = b.polylineDatasPlan,
        f = b.polylinePlan;
        e && (c ? "walk" == d ? f["step-" + c].setOptions({
            strokeColor: "#25c2f2",
            strokeOpacity: .8
        }) : "car" == d && f["step-" + c].setMap(null) : "walk" == d ? $.each(f,
        function (a, b) {
            b.setOptions({
                strokeColor: "#25c2f2",
                strokeOpacity: .8
            })
        }) : "car" == d && $.each(f,
        function (a, b) {
            b.setMap(null)
        }))
    },
    routeHighlight: function (a) {
        var b = [],
        c = [],
        d = amap.dir.type,
        e = [];
        if ("car" == d) e = amap.dirp.routes[a].steps;
        else if ("bus" == d) e = amap.dirp.buslist[a].segmentlist;
        else if ("walk" == d) return;
        $.each(e,
        function (a, b) {
            var d = b.path || [];
            c = c.concat(d)
        }),
        b.push({
            type: "polyline-tmp",
            list: [{
                path: c
            }]
        }),
        mapapi.addOverlays(b, "noset")
    },
    routeHighlightNew: function (a) {
        var b = [],
        c = [],
        d = amap.dir.type,
        e = [];
        if ("car" == d) e = amap.dirp.path_list && amap.dirp.path_list[a].steps;
        else if ("bus" == d) e = "railway" == amap.dirp.railtype ? amap.dirp.routelist && amap.dirp.routelist[a].segmentlist : amap.dirp.buslist && amap.dirp.buslist[a].segmentlist;
        else if ("walk" == d) return;
        $.each(e,
        function (a, b) {
            var d = b.path || [];
            c = c.concat(d)
        }),
        b.push({
            type: "polyline-tmp",
            list: [{
                path: c
            }]
        }),
        mapapi.addOverlays(b, "noset")
    },
    routeUnhighlight: function () {
        mapapi.clearOverlays(["polyline-tmp"])
    },
    creatDirQrcode: function () {
        var a = (amap.dir.to.lnglat && amap.dir.to.lnglat.split(","), amap.shareDir("pc_dir")),
        b = "canvas-dirQrcode",
        c = function (a) {
            tpl.tplLoad({
                filename: b,
                callback: function (b) {
                    var c = 78;
                    $dirqr = $(".dir_qr"),
                    $dirqr.html("").append(b),
                    $(".dir_qrcode").attr("url", a).html("").qrcode({
                        width: c,
                        height: c,
                        text: a
                    }),
                    $dirqr.fadeInDownBig()
                }
            }),
            amap.autumncard.url = a,
            amap.autumnshow = !0
        };
        amap.getShorturl(a, c)
    },
    clearDirQrcode: function () {
        $dirqr = $(".dir_qr"),
        $dirqr.html(""),
        dirapi.hideAlterBox(),
        amap.autumnshow = !1
    },
    clearDirMenu: function () {
        dirapi.closeDir(),
        mapapi.clearAllOverlays(),
        amap.fwd("/dir")
    }
}; !
function () {
    var a = {
        action_sign: {
            "鐩磋": "0",
            "宸﹁浆": "1",
            "鍙宠浆": "2",
            "鍚戝乏鍓嶆柟琛岄┒": "3",
            "鍚戝彸鍓嶆柟琛岄┒": "4",
            "鍚戝乏鍚庢柟琛岄┒": "5",
            "鍚戝彸鍚庢柟琛岄┒": "6",
            "宸﹁浆璋冨ご": "7",
            "鐩磋": "8",
            "闈犲乏": "9",
            "闈犲彸": "10",
            "杩涘叆鐜矝": "11",
            "绂诲紑鐜矝": "12",
            "鍑忛€熻椹�": "13",
            "鐩磋": "14"
        },
        setDragRouteOpt: function () {
            var a = amap.dir.from.lnglat.split(","),
            b = amap.dir.to.lnglat.split(","),
            c = {
                startMarkerOptions: {
                    visible: !1,
                    position: new AMap.LngLat(a[0], a[1])
                },
                endMarkerOptions: {
                    visible: !1,
                    position: new AMap.LngLat(b[0], b[1])
                },
                polyOptions: {
                    isOutline: !1,
                    strokeWeight: 6,
                    opacity: 1,
                    zIndex: 9
                }
            };
            return c
        },
        dirCar: function (a) {
            var b = this,
            c = apicache,
            d = amap.dir.from,
            e = amap.dir.to,
            f = amap.dir.via || [],
            g = amap.dir.policy;
            amap.dir.type || "car";
            b.from = amap.dir.from,
            b.to = amap.dir.to,
            b.via = amap.dir.via,
            b.policy = amap.dir.policy,
            b.routetype = amap.dir.type || "car",
            themap.plugin(["AMap.DragRoute", "AMap.DragRoutePC"],
            function () {
                var a = b.setDragRouteOpt(),
                h = [],
                i = d.modxy,
                j = d.lnglat,
                k = null;
                k = i ? new AMap.LngLat(i.split(",")[0], i.split(",")[1]) : new AMap.LngLat(j.split(",")[0], j.split(",")[1]),
                h.push(k),
                f && f.length > 0 && $.each(f,
                function (a, b) {
                    if (!_.isEmpty(b)) {
                        var c = b.modxy,
                        d = b.lnglat,
                        e = null;
                        e = c ? new AMap.LngLat(c.split(",")[0], c.split(",")[1]) : new AMap.LngLat(d.split(",")[0], d.split(",")[1]),
                        h.push(e)
                    }
                });
                var l = e.modxy,
                m = e.lnglat,
                n = null;
                n = l ? new AMap.LngLat(l.split(",")[0], l.split(",")[1]) : new AMap.LngLat(m.split(",")[0], m.split(",")[1]),
                h.push(n);
                var o = null;
                c.dragRoute ? o = c.dragRoute : (o = c.dragRoute = new AMap.DragRoute(themap, h, g, a), AMap.event.addListener(o, "complete",
                function (a) {
                    var d = a.data,
                    e = b.from,
                    f = b.to,
                    g = b.via,
                    h = b.policy,
                    i = b.routetype;
                    if ("OK" == d.info) {
                        var j, k, l, m = c.driveStart = o.getStart(),
                        n = c.driveEnd = o.getEnd(),
                        p = o.getPoint(),
                        q = _.clone(o.getWays()),
                        r = [],
                        s = !1,
                        t = !1,
                        u = !1,
                        v = null,
                        w = e.modxy || e.lnglat,
                        x = f.modxy || f.lnglat,
                        y = !1,
                        z = !1;
                        if (q.length >= 3 && p.setDraggable(!1), amap.direction.refwd) if (c.viaPath && q.length < c.viaPath.length) y = b.deleIndex(q, c.viaPath);
                        else if (c.viaPath && q.length == c.viaPath.length) {
                            var A = null;
                            Number(d.origin.lng) - Number(w.split(",")[0]) != 0 && Number(d.origin.lat) - Number(w.split(",")[1]) != 0 && (j = d.origin, A = j, s = !0, v = "from"),
                            Number(d.destination.lng) - Number(x.split(",")[0]) != 0 && Number(d.destination.lat) - Number(x.split(",")[1]) != 0 && (k = d.destination, A = k, t = !0, v = "to");
                            for (var B = null,
                            C = 0; C < q.length; C++) if (q[C].lng != c.viaPath[C].lng || q[C].lat != c.viaPath[C].lat) {
                                B = C,
                                l = q[B],
                                c.viaPath = q,
                                A = l,
                                u = !0,
                                v = "via";
                                break
                            }
                        } else c.viaPath && q.length > c.viaPath.length && (z = b.addIndex(q, c.viaPath), c.viaPath = q);
                        if (y !== !1) {
                            g.splice(y, 1);
                            var D = {
                                type: i,
                                policy: h,
                                from: e,
                                to: f,
                                via: g
                            };
                            amap.fwd("/dir/?" + $.param(D))
                        } else if (z !== !1) {
                            var r = q[z];
                            v = "via";
                            var E = function (a) {
                                g.length == q.length || g.splice(z, 0, a);
                                var b = {
                                    type: i,
                                    policy: h,
                                    from: e,
                                    to: f,
                                    via: g
                                };
                                amap.fwd("/dir/?" + $.param(b))
                            };
                            b.planRegeo({
                                pos: r,
                                type: v
                            },
                            E)
                        } else if (s || t || u) {
                            var r = A,
                            E = function (a) {
                                s && (e = a),
                                t && (f = a),
                                u && (g[B] = a);
                                var b = {
                                    type: i,
                                    policy: h,
                                    from: e,
                                    to: f,
                                    via: g
                                };
                                amap.fwd("/dir/?" + $.param(b))
                            };
                            b.planRegeo({
                                pos: r,
                                type: v
                            },
                            E)
                        } else {
                            c.viaPath = o.getWays() || [],
                            e.id = !_.isEmpty(e.id) && e.id.split("-")[0] + "-from" || "from",
                            f.id = !_.isEmpty(f.id) && f.id.split("-")[0] + "-to" || "to",
                            d.frominfo = e,
                            d.toinfo = f,
                            d.viainfo = g;
                            var F = b.buildCarData(d);
                            amap.direction.refwd = !0,
                            amap.dirp = F,
                            o.addListen || (AMap.event.addListener(m, "click",
                            function (a) {
                                amap.carState.active = "start"
                            }), AMap.event.addListener(n, "click",
                            function (a) {
                                amap.carState.active = "end"
                            }), o.addListen = !0)
                        }
                    }
                }), AMap.event.addListener(o, "error",
                function (a) {
                    amap.dirp = null
                })),
                o.search(h, g, a)
            })
        },
        dirCarNew: function (a) {
            var b = this,
            c = apicache;
            amap.dir.from,
            amap.dir.to,
            amap.dir.via || [],
            amap.dir.policy,
            amap.dir.type || "car";
            b.from = amap.dir.from,
            b.to = amap.dir.to,
            b.via = amap.dir.via,
            b.policy = amap.dir.policy,
            b.routetype = amap.dir.type || "car",
            themap.plugin(["AMap.DragRoutePC"],
            function () {
                var a = b.setDragRouteOpt(),
                d = [],
                e = b.getDirCarFromend("from");
                d.push(e);
                var f = b.getDirCarVia();
                _.isEmpty(f) || $.each(f,
                function (a, b) {
                    d.push(b)
                });
                var g = b.getDirCarFromend("to");
                d.push(g);
                var h = null;
                c.dragRoute ? h = c.dragRoute : (h = c.dragRoute = new AMap.DragRoute(themap, a), AMap.event.addListener(h, "complete",
                function (a) {
                    var d = a.data.data,
                    e = a.data.origin,
                    f = a.data.destination,
                    g = b.from,
                    i = b.to,
                    j = b.via,
                    k = b.policy,
                    l = b.routetype;
                    if ("1" == d.code) {
                        var m, n, o, p = c.driveStart = h.getStart(),
                        q = c.driveEnd = h.getEnd(),
                        r = h.getPoint(),
                        s = _.clone(h.getWays()),
                        t = [],
                        u = !1,
                        v = !1,
                        w = !1,
                        x = null,
                        y = g.modxy || g.lnglat,
                        z = i.modxy || i.lnglat,
                        A = !1,
                        B = !1;
                        if (s.length >= 3 && r.setDraggable(!1), amap.direction.refwd) if (c.viaPath && s.length < c.viaPath.length) A = b.deleIndex(s, c.viaPath);
                        else if (c.viaPath && s.length == c.viaPath.length) {
                            var C = null;
                            Number(e.lng) - Number(y.split(",")[0]) != 0 && Number(e.lat) - Number(y.split(",")[1]) != 0 && (m = e, C = m, u = !0, x = "from"),
                            Number(f.lng) - Number(z.split(",")[0]) != 0 && Number(f.lat) - Number(z.split(",")[1]) != 0 && (n = f, C = n, v = !0, x = "to");
                            for (var D = null,
                            E = 0; E < s.length; E++) if (s[E].lng != c.viaPath[E].lng || s[E].lat != c.viaPath[E].lat) {
                                D = E,
                                o = s[D],
                                c.viaPath = s,
                                C = o,
                                w = !0,
                                x = "via";
                                break
                            }
                        } else c.viaPath && s.length > c.viaPath.length && (B = b.addIndex(s, c.viaPath), c.viaPath = s);
                        if (A !== !1) {
                            j.splice(A, 1);
                            var F = {
                                type: l,
                                policy: k,
                                from: g,
                                to: i,
                                via: j
                            };
                            amap.fwd("/dir/?" + $.param(F))
                        } else if (B !== !1) {
                            var t = s[B];
                            x = "via";
                            var G = function (a) {
                                j.length == s.length || j.splice(B, 0, a);
                                var b = {
                                    type: l,
                                    policy: k,
                                    from: g,
                                    to: i,
                                    via: j
                                };
                                amap.fwd("/dir/?" + $.param(b))
                            };
                            b.planRegeo({
                                pos: t,
                                type: x
                            },
                            G)
                        } else if (u || v || w) {
                            var t = C,
                            G = function (a) {
                                u && (g = a),
                                v && (i = a),
                                w && (j[D] = a);
                                var b = {
                                    type: l,
                                    policy: k,
                                    from: g,
                                    to: i,
                                    via: j
                                };
                                amap.fwd("/dir/?" + $.param(b))
                            };
                            b.planRegeo({
                                pos: t,
                                type: x
                            },
                            G)
                        } else {
                            c.viaPath = h.getWays() || [],
                            _.isEmpty(g.id) || "from" == g.id ? g.id = "" : g.id = g.id.split("-")[0] + "-from",
                            _.isEmpty(i.id) || "to" == i.id ? i.id = "" : i.id = i.id.split("-")[0] + "-to",
                            d.frominfo = $.extend({},
                            !0, g),
                            d.toinfo = $.extend({},
                            !0, i),
                            d.viainfo = $.extend({},
                            !0, j);
                            var H = b.buildCarDataNew(d);
                            amap.direction.refwd = !0,
                            amap.dirp = H,
                            p.setPosition(new AMap.LngLat(g.lnglat.split(",")[0], g.lnglat.split(",")[1])),
                            p.show(),
                            q.setPosition(new AMap.LngLat(i.lnglat.split(",")[0], i.lnglat.split(",")[1])),
                            q.show(),
                            h.addListen || (AMap.event.addListener(p, "click",
                            function (a) {
                                amap.carState.active = "start"
                            }), AMap.event.addListener(q, "click",
                            function (a) {
                                amap.carState.active = "end"
                            }), h.addListen = !0)
                        }
                    }
                }), AMap.event.addListener(h, "error",
                function (a) {
                    amap.dirp = null
                })),
                h.search(d, {
                    engine_version: "3",
                    policy2: b.policy
                })
            })
        },
        getDirCarFromend: function (a) {
            var b = null;
            "from" == a ? b = amap.dir.from : "to" == a && (b = amap.dir.to);
            var c = b.lnglat.split(","),
            d = b.id && b.id.split("-")[0] || "";
            return _.isEmpty(b.modxy) || (c = b.modxy.split(",")),
            {
                lng: Number(c[0]),
                lat: Number(c[1]),
                pid: d
            }
        },
        getDirCarVia: function () {
            var a = amap.dir.via,
            b = [];
            return a && a.length > 0 && $.each(a,
            function (a, c) {
                if (!_.isEmpty(c)) {
                    var d = c.lnglat.split(","),
                    e = c.id;
                    b.push({
                        lng: Number(d[0]),
                        lat: Number(d[1]),
                        pid: e
                    })
                }
            }),
            b
        },
        buildCarData: function (a) {
            var b = apicache,
            c = {};
            if (c.type = "car", c.frominfo = a.frominfo, c.toinfo = a.toinfo, "OK" == a.info && a.routes.length > 0) {
                var d = a.origin,
                e = a.destination;
                c.routes = _parseRoutes(a.routes),
                $.each(c.routes,
                function (c, f) {
                    var g = [];
                    f.planTitle = [];
                    try {
                        var h = _.clone(a.viainfo)
                    } catch (i) {
                        console.log(i)
                    }
                    $.each(f.steps,
                    function (a, b) {
                        if ("鍒拌揪閫旂粡鍦�" === b.assistant_action) {
                            var c = f.steps,
                            d = {
                                start_location: c[a + 1].path[0],
                                end_location: c[a + 1].path[0],
                                instruction: "",
                                orientation: "",
                                road: "",
                                distance: 0,
                                tolls: 0,
                                toll_distance: 0,
                                toll_road: "",
                                time: 0,
                                path: [c[a + 1].path[c[a + 1].path.length - 1]],
                                action: "鍒拌揪閫旂粡鍦�",
                                assistant_action: "",
                                signs: c[a].signs,
                                polyType: "poly-drive",
                                name: h.pop().name
                            };
                            g.push(d),
                            b.assistant_action = ""
                        } else g.push(b)
                    }),
                    $.each(g,
                    function (a, c) {
                        f.steps;
                        c.signs || (c.signs = b.routeSign[c.action] || "advance"),
                        c.polyType = "poly-drive",
                        c.id = "step-" + a,
                        "" != c.road && f.planTitle.indexOf(c.road) < 0 && f.planTitle.push(c.road)
                    }),
                    f.steps = g,
                    f.origin = d,
                    f.destination = e,
                    f.taxi_cost = 0,
                    f.distanceNum = f.distance,
                    f.distance = _formatDistance(f.distance),
                    f.time_num = f.time,
                    f.time = _formatTime(f.time),
                    f.feedBackUrl = feedback.dir()
                }),
                c.current = a.current || 0
            } else c.feedBackUrl = feedback.dir();
            return c
        },
        buildCarDataNew: function (a) {
            var b = this,
            c = apicache;
            a.type = "car";
            var d = a.path_list;
            if (!_.isEmpty(d)) {
                var e = a.cost && a.cost.split(",") || [],
                f = a.distance && a.distance.split(",") || [],
                g = a.drivetime && a.drivetime.split(",") || [],
                h = a.strategy && a.strategy.split(","),
                i = a.trafficlights && a.trafficlights.split(",") || [];
                $.each(d,
                function (a, d) {
                    var j = d.path;
                    d.cost = e[a] || "",
                    d.cost_text = _formatCost(e[a]),
                    d.distance = f[a],
                    d.distance_text = _formatDistance(f[a]),
                    d.drivetime = g[a],
                    d.drivetime_text = _formatTime(g[a]),
                    d.strategy = h[a],
                    d.trafficlights = i[a] || "",
                    d.steps = [],
                    d.path_title = b.setPlanTitle(j),
                    $.each(j,
                    function (a, b) {
                        (!b.segments || _.isEmpty(b.segments)) && (b.segments = [], b.segments.push($.extend(!0, {},
                            b))),
                            b.name = b.name || !_.isEmpty(b.segments) && b.segments[0].name || "鏃犲悕閬撹矾",
                            b.action = b.action || !_.isEmpty(b.segments) && b.segments[0].action || "0",
                            b.length = _formatDistance(b.length),
                            b.actionName = c.action[b.action],
                            b.signs = c.routeSign[b.actionName],
                            (!b.segments || _.isEmpty(b.segments)) && (b.segments = [], b.segments.push(b));
                        var e = b.segments;
                        $.each(e,
                        function (a, b) {
                            b.action = b.action || "0",
                            b.length = _formatDistance(b.length),
                            b.actionName = c.action[b.action],
                            b.signs = c.routeSign[b.actionName],
                            b.path = _multiStr2LnglatCar(b.coor),
                            b.start_location = b.path[0],
                            b.polyType = "poly-drive",
                            d.steps.push(b)
                        }),
                        $.each(d.steps,
                        function (a, b) {
                            b.id = "step-" + a
                        })
                    })
                })
            }
            return a
        },
        setPlanTitle: function (a) {
            var b = $.extend([], !0, a);
            $.each(b,
            function (a, b) {
                b.nameid = a
            }),
            b.length > 0 && b.sort(function (a, b) {
                return b.length - a.length
            });
            var c = b.splice(0, 3);
            c.sort(function (a, b) {
                return a.nameid - b.nameid
            });
            var d = [];
            return $.each(c,
            function (a, b) {
                d.push({
                    length: b.length,
                    name: b.name
                })
            }),
            d
        },
        addDirCarOverlays: function (a) {
            var b = amap.dirp,
            c = b.frominfo.lnglat.split(","),
            d = b.toinfo.lnglat.split(","),
            e = [];
            e.push({
                type: "polyline",
                list: b.routes[a].steps
            }),
            e.push({
                type: "marker",
                list: [{
                    id: b.toinfo.id,
                    location: new AMap.LngLat(d[0], d[1]),
                    markerType: "marker-drive-to",
                    name: b.toinfo.name
                },
                {
                    id: b.frominfo.id,
                    location: new AMap.LngLat(c[0], c[1]),
                    markerType: "marker-drive-from",
                    name: b.frominfo.name
                }]
            }),
            mapapi.clearAllOverlays(!0),
            mapapi.addOverlays(e)
        },
        addDirCarOverlaysNew: function (a) {
            var b = amap.dirp,
            c = b.frominfo.lnglat.split(","),
            d = b.toinfo.lnglat.split(","),
            e = [];
            b.path_list && b.path_list.length > 0 && (e.push({
                type: "polyline",
                list: b.path_list[a].steps
            }), e.push({
                type: "marker",
                list: [{
                    id: b.toinfo.id,
                    location: new AMap.LngLat(d[0], d[1]),
                    markerType: "marker-drive-to",
                    name: b.toinfo.name
                },
                {
                    id: b.frominfo.id,
                    location: new AMap.LngLat(c[0], c[1]),
                    markerType: "marker-drive-from",
                    name: b.frominfo.name
                }]
            }), mapapi.clearAllOverlays(!0), mapapi.addOverlays(e))
        },
        setCarRoute: function (a) {
            var b = apicache,
            c = b.dragRoute;
            c && (b.polylineRouteTmc[a] && $.each(b.polylineRouteTmc[a],
            function (a, b) {
                b.setOptions({
                    zIndex: 20
                })
            }), c.showRoute(a))
        },
        showAllRoute: function () {
            var a = amap.carState.activeindex || "0",
            b = amap.dirp.routes,
            c = [],
            d = [];
            $.each(b,
            function (b, c) {
                if (b != a) {
                    var e = c.steps,
                    f = [];
                    $.each(e,
                    function (a, b) {
                        var c = b.path || [];
                        f = f.concat(c)
                    }),
                    d.push({
                        index: b,
                        path: f
                    })
                }
            }),
            c.push({
                type: "polyline-route",
                list: d
            }),
            mapapi.addOverlays(c, "noset")
        },
        showAllRouteNew: function () {
            var a = amap.carState.activeindex || "0",
            b = amap.dirp.path_list,
            c = [],
            d = [];
            $.each(b,
            function (b, c) {
                if (b != a) {
                    var e = c.steps,
                    f = [];
                    $.each(e,
                    function (a, b) {
                        var c = b.path || [];
                        f = f.concat(c)
                    }),
                    d.push({
                        index: b,
                        path: f
                    })
                }
            }),
            c.push({
                type: "polyline-route",
                list: d
            }),
            mapapi.addOverlays(c, "noset")
        },
        showAllRoutesTmc: function () {
            var a = apicache,
            b = amap.carState.activeindex || "0",
            c = a.dragRoute.getRoutes();
            $.each(c,
            function (c, d) {
                var e = d.polylines;
                c != b ? (a.polylineRouteTmc[c] = [], $.each(e,
                function (b, d) {
                    a.polylineRouteTmc[c].push(d),
                    d.setOptions({
                        zIndex: 6
                    }),
                    d.setMap(themap)
                })) : $.each(e,
                function (a, b) {
                    b.setOptions({
                        zIndex: 10
                    })
                })
            })
        },
        showAllRoutesTmcNew: function () {
            var a = apicache,
            b = amap.carState.activeindex || "0",
            c = a.dragRoute.getRoutes();
            $.each(c,
            function (c, d) {
                var e = d.polylines;
                _.isEmpty(e) || (c != b ? (a.polylineRouteTmc[c] = [], $.each(e,
                function (b, d) {
                    a.polylineRouteTmc[c].push(d),
                    d.setOptions({
                        strokeOpacity: .9,
                        zIndex: 6
                    }),
                    d.setMap(themap)
                })) : $.each(e,
                function (a, b) {
                    b.setOptions({
                        zIndex: 10
                    })
                }))
            })
        },
        deleIndex: function (a, b) {
            var c, d = apicache,
            e = [];
            if (1 == d.viaPath.length && (d.viaPath = []), a.length > b.length) _arr = a,
            c = b;
            else {
                if (!(a.length < b.length)) return !1;
                _arr = b,
                c = a
            }
            for (var f = 0; f < _arr.length; f++) if (c.length > 0) {
                var g = !1;
                $.each(c,
                function (a, b) {
                    b == _arr[f] && (g = !0)
                }),
                g || e.push(f)
            } else e.push(0);
            return 1 == e.length ? e[0] : !1
        },
        addIndex: function (a, b) {
            var c, d = [];
            if (a.length > b.length) _arr = a,
            c = b;
            else {
                if (!(a.length < b.length)) return !1;
                _arr = b,
                c = a
            }
            for (var e = 0; e < _arr.length; e++) if (c.length > 0) {
                var f = !1;
                $.each(c,
                function (a, b) {
                    b == _arr[e] && (f = !0)
                }),
                f || d.push(e)
            } else d.push(0);
            return 1 == d.length ? d[0] : !1
        }
    };
    $.extend(dirapi, a)
}(),
!
function () {
    var a = {
        priceType: {
            0: "涓嶅垎浠撲綅绾у埆",
            7: "涓€绛�",
            8: "浜岀瓑",
            9: "鐗圭瓑",
            10: "纭骇",
            11: "杞骇",
            12: "杞骇1绛夊骇",
            13: "杞骇2绛夊骇",
            14: "纭崸涓婇摵",
            15: "纭崸涓摵",
            16: "纭崸涓嬮摵",
            17: "杞崸涓婇摵",
            18: "杞崸涓嬮摵",
            19: "楂樼骇杞崸涓婇摵",
            20: "楂樼骇杞崸涓嬮摵",
            21: "鍟嗗姟",
            22: "搴у腑",
            23: "鍗у腑涓婇摵",
            24: "鍗у腑涓摵",
            25: "鍗у腑涓嬮摵",
            30: "缁忔祹鑸�",
            31: "鍟嗗姟鑸�",
            40: "缁忔祹鑸�",
            41: "3绛夎埍",
            42: "2绛夎埍",
            43: "璞崕鑸�"
        },
        railType: {
            2010: "鏅�",
            2011: "G",
            2012: "D",
            2013: "C",
            2014: "Z",
            2015: "T",
            2016: "K",
            2017: "涓�",
            2018: "S"
        },
        dirBus: function (a) {
            var b = this,
            c = apicache,
            d = amap.dir.from,
            e = amap.dir.to,
            f = amap.dir.policy;
            amap.dir.type || "bus";
            AMap.service(["AMap.Transfer"],
            function () {
                var a = new AMap.Transfer({
                    city: d.adcode || "110000",
                    policy: f,
                    nightflag: !0,
                    extensions: "all"
                });
                c.trans = a;
                var g = d.lnglat,
                h = null;
                h = new AMap.LngLat(g.split(",")[0], g.split(",")[1]);
                var i = e.lnglat,
                j = null;
                j = new AMap.LngLat(i.split(",")[0], i.split(",")[1]),
                a.search(h, j),
                AMap.event.addListener(a, "complete",
                function (a) {
                    var c = b.buildBusData(a);
                    c.frominfo = d,
                    c.toinfo = e,
                    amap.dirp = c
                }),
                AMap.event.addListener(a, "error",
                function (a) {
                    amap.dirp = null
                })
            })
        },
        buildBusData: function (a) {
            var b = {};
            if ("OK" == a.info) {
                b = {
                    type: "bus",
                    taxi_cost: a.taxi_cost,
                    plans: []
                };
                var c = amap.dir.from.lnglat.split(","),
                d = amap.dir.to.lnglat.split(","),
                e = a.plans;
                e && e.length > 0 && ($.each(e,
                function (a, e) {
                    e.buses = [],
                    e.planTitle = [],
                    e.walk_distance = 0;
                    var f = 0,
                    g = e.segments.length,
                    h = {};
                    $.each(e.segments,
                    function (a, b) {
                        if ("METRO_RAIL" == b.transit_mode && (b.transit_mode = "subway"), 0 === a && (b.name = amap.dir.from.name), "" !== b.transit_mode && "WALK" === b.transit_mode) e.segments[a - 1] ? (b.location = e.segments[a - 1].transit.off_station.location, b.id = "marker-plan-" + a, b.markerType = "marker-bus-" + e.segments[a - 1].transit_mode.toLowerCase() + "Stop", b.pre_on_station = e.segments[a - 1].on_station, b.pre_off_station = e.segments[a - 1].off_station, b.pre_lines = e.segments[a - 1].lines) : (b.location = new AMap.LngLat(c[0], c[1]), b.id = "marker-plan-" + a, b.markerType = "marker-bus-from", b.type = "from"),
                        b.next_on_station = e.segments[a + 1] && e.segments[a + 1].transit.on_station,
                        e.walk_distance += b.distance,
                        b.polyType = "poly-bus-walk";
                        else {
                            f++,
                            e.buses.push(b),
                            b.location = b.transit.on_station.location,
                            b.id = "marker-plan-" + a,
                            e.segments[a - 1] ? b.markerType = "marker-bus-" + b.transit_mode.toLowerCase() + "Stop" : (b.location = new AMap.LngLat(c[0], c[1]), b.markerType = "marker-bus-from");
                            var d = b.transit.lines[0].name.replace(/\(.*\)/gi, "");
                            e.planTitle.push({
                                name: d,
                                type: b.transit_mode.toLowerCase()
                            }),
                            b.polyType = "poly-bus-bus"
                        }
                        a == g - 1 && "" !== b.transit_mode && ("SUBWAY" === b.transit_mode || "BUS" === b.transit_mode) && (h = {
                            type: b.transit_mode.toLowerCase() + "-last",
                            id: "marker-plan-" + g,
                            markerType: "marker-bus-" + b.transit_mode.toLowerCase() + "Stop",
                            name: b.transit.off_station.name,
                            pre_lines: b.transit.lines,
                            location: b.transit.off_station.location,
                            pre_on_station: b.transit.on_station,
                            pre_off_station: b.transit.off_station
                        }),
                        b.preType = e.segments[a - 1] ? e.segments[a - 1].transit_mode.toLowerCase() : "",
                        b.nextType = e.segments[a + 1] ? e.segments[a + 1].transit_mode.toLowerCase() : "",
                        b.style = b.transit_mode.toLowerCase(),
                        b.distance_num = b.distance,
                        b.distance = _formatDistance(b.distance),
                        b = $.extend(b, b.transit)
                    }),
                    _.isEmpty(h) || e.segments.push(h),
                    e.segments.push({
                        id: "marker-plan-" + e.segments.length,
                        location: new AMap.LngLat(d[0], d[1]),
                        markerType: "marker-bus-to",
                        type: "to",
                        name: amap.dir.to.name
                    }),
                    $.each(e.segments,
                    function (a, b) {
                        b.on_station && (b.on_station.planid = "marker-plan-" + a),
                        b.off_station && (b.off_station.planid = "marker-plan-" + (a + 1))
                    }),
                    b.plans[a] = {
                        buses: e.buses,
                        planTitle: e.planTitle,
                        segments: e.segments,
                        seglength: e.segments.length,
                        path: e.path,
                        distance_num: e.distance,
                        distance: _formatDistance(e.distance),
                        transit_distance_num: e.transit_distance,
                        transit_distance: _formatDistance(e.transit_distance),
                        walk_distance_num: e.walk_distance,
                        walk_distance: _formatDistance(e.walk_distance),
                        time_num: e.time,
                        time: _formatTime(e.time),
                        transferNum: f,
                        cost: e.cost,
                        feedBackUrl: feedback.dir(e.planTitle)
                    }
                }), b.current = b.current || 0)
            }
            return b
        },
        addDirBusOverlays: function (a) {
            var b = amap.dirp,
            c = (b.frominfo.lnglat.split(","), b.toinfo.lnglat.split(","), []);
            c.push({
                type: "polyline",
                list: b.plans[a].segments
            }),
            c.push({
                type: "marker",
                list: b.plans[a].segments
            }),
            mapapi.clearAllOverlays(),
            mapapi.addOverlays(c)
        },
        addDirBusOverlaysNew: function (a) {
            var b = amap.dirp,
            c = (b.frominfo.lnglat.split(","), b.toinfo.lnglat.split(","), []),
            d = null,
            e = null;
            if ("railway" == b.railtype) {
                if (!(b.routelist && b.routelist.length > 0)) return;
                d = b.routelist[a].segmentlist,
                e = b.routelist[a].mapstops
            } else {
                if (!(b.buslist && b.buslist.length > 0)) return;
                d = b.buslist[a].segmentlist,
                e = b.buslist[a].mapstops
            }
            c.push({
                type: "polyline",
                list: d
            }),
            c.push({
                type: "marker",
                list: e
            }),
            mapapi.clearAllOverlays(),
            mapapi.addOverlays(c)
        },
        getBusData: function (a) {
            var b = this,
            c = amap.dir.from,
            d = amap.dir.to,
            e = amap.dir.policy,
            f = (amap.dir.type || "bus", amap.dir.dateTime.split("|")),
            g = f[0],
            h = f[1],
            i = {
                night: 1,
                group: 1,
                pure_walk: 1,
                date: g,
                time: h,
                type: e,
                eta: 1
            },
            j = c.lnglat.split(","),
            k = d.lnglat.split(","),
            l = c.id && c.id.split("-")[0],
            m = d.id && d.id.split("-")[0],
            n = c.adcode,
            o = d.adcode,
            p = {
                x1: j[0] || "",
                y1: j[1] || "",
                poiid1: l || "",
                ad1: n || "",
                x2: k[0] || "",
                y2: k[1] || "",
                poiid2: m || "",
                ad2: o || ""
            };
            i = $.extend(i, p),
            $.get(amap.service.navBus + $.param(i)).done(function (a) {
                amap.dirapip = $.extend(!0, {},
                a),
                b.buildBusDataNew(a)
            })
        },
        buildBusDataNew: function (b) {
            var c = b.data,
            d = {},
            e = amap.dir.from,
            f = amap.dir.to;
            if (c && "1" == c.code) {
                if (c.taxitime_text = _formatTime(c.taxitime) || "", c.taxicost_text = _formatCost(c.taxicost) || "", c.type = "bus", c.current = "0", c.frominfo = $.extend(!0, {},
                amap.dir.from), c.frominfo.id = "marker-plan-0", c.toinfo = $.extend(!0, {},
                amap.dir.to), c.frominfo.markerType = "marker-bus-from", c.frominfo.type = "from", c.frominfo.location = _str2LngLat(c.frominfo.lnglat), c.toinfo.markerType = "marker-bus-to", c.toinfo.type = "to", c.toinfo.location = _str2LngLat(c.toinfo.lnglat), "0" != c.count) {
                    var g = c.buslist || c.taxilist;
                    if (g.length > 0 && c.routelist.length > 0) c.railtype = "railway",
                    c.count = c.routelist.length,
                    a.buildRailroute(c),
                    $.each(c.routelist,
                    function (b, c) {
                        var d = c.segments;
                        _.isEmpty(d) || a.fuseBusRail(c)
                    }),
                    d = c;
                    else if (c.buslist.length > 0 && 0 == c.routelist.length) {
                        var h = [],
                        i = $.extend(!0, {},
                        c.frominfo),
                        j = $.extend(!0, {},
                        c.toinfo);
                        $.each(c.buslist,
                        function (b, c) {
                            _.isEmpty(c.segmentlist) || h.push(a.buildBuslist(c, i, j))
                        }),
                        c.railtype = "bus",
                        c.count = h.length,
                        c.buslist = h,
                        d = c
                    } else d.type = "bus",
                    d.msg = "no result",
                    d.buslist = []
                }
            } else d.type = "bus";
            e.id = e.id && e.id.split("-")[0] + "-from" || "from",
            f.id = f.id && f.id.split("-")[0] + "-to" || "to",
            amap.dirp = d
        },
        buildAlterBus: function (a) { },
        buildBuslist: function (a, b, c) {
            var d = $.extend(!0, {},
            b);
            toinfo = $.extend(!0, {},
            c),
            a.alllength = _parseInt(a.allfootlength),
            a.allfootlength_text = _formatDistance(a.allfootlength),
            a.expense_text = _formatCost(a.expense),
            a.expensetime_text = _formatTime(a.expensetime),
            a.min_tag_text = dirapi.minTag[a.min_tag],
            a.min_tag_sign = dirapi.minTagSign[a.min_tag],
            a.time_tag_text = dirapi.timeTag[a.time_tag],
            a.endfootlength_text = _formatDistance(a.endfootlength),
            a.endfoottime_text = _formatTime(a.endfoottime),
            a.etastatus_text = dirapi.etaStatus[a.etastatus] || "",
            a.etastatus_sign = dirapi.etaStatusSign[a.etastatus] || "",
            a.transferNum = a.segmentlist.length,
            a.title = [];
            var e = a.endwalk;
            if (!_.isEmpty(e) && e.infolist.length > 0) {
                var f = [],
                g = 0;
                $.each(e.infolist,
                function (a, b) {
                    f = f.concat(_multiStr2Lnglat(b.coord)),
                    g += _parseInt(b.distance)
                }),
                e.end = "缁堢偣",
                e.sign = "end",
                e.foottime_text = a.endfoottime_text,
                e.path = f,
                e.distance_text = _formatDistance(g),
                e.bustype = "walk",
                e.type = "walk",
                e.polyType = "poly-bus-walk"
            }
            var h = a.segmentlist,
            i = [],
            j = [];
            if (_.isEmpty(d) || j.push(d), h && h.length > 0) {
                var k = 1;
                $.each(h,
                function (b, c) {
                    var d = null,
                    e = [];
                    c.segindex = b,
                    "4" == c.bus_time_tag ? d = "(鏈彮" + c.endtime + ")" : "3" == c.bus_time_tag && (d = "(棣栫彮" + c.starttime + ")"),
                    e.push(c.bus_key_name),
                    a.alllength += _parseInt(c.driverlength),
                    c.rgb = _color2rgb(c.color),
                    c.path = _multiStr2Lnglat(c.drivercoord),
                    c.driverlength_text = _formatDistance(c.driverlength),
                    c.drivertime_text = _formatTime(c.drivertime),
                    c.footlength_text = _formatDistance(c.footlength),
                    c.foottime_text = _formatTime(c.foottime),
                    c.bus_time_tag_text = dirapi.busTimeTag[c.bus_time_tag],
                    c.bustypepre = h[b - 1] && h[b - 1].bustype || "",
                    c.busdirection = c.busname.split("--")[1].split(")")[0] || "";
                    var f = c.bustype;
                    "1" == f || "5" == f || "6" == f || "7" == f || "8" == f || "16" == f || "17" == f || "18" == f ? (c.type = "bus", c.polyType = "poly-bus-bus") : (c.type = "subway", c.polyType = "poly-bus-subway"),
                    c.startinfo = {
                        name: c.startname,
                        id: "marker-plan-" + k,
                        location: c.path[0],
                        line: c.busname,
                        lineid: c.busid,
                        type: c.type,
                        markerType: "marker-bus-" + c.type + "Stop",
                        inport: c.inport,
                        outport: c.outport,
                        startname: c.startname,
                        endname: c.endname
                    },
                    k++,
                    j.push(c.startinfo),
                    c.endinfo = {
                        name: c.endname,
                        id: "marker-plan-" + k,
                        location: c.path[c.path.length - 1],
                        line: c.busname,
                        lineid: c.busid,
                        type: c.type,
                        markerType: "marker-bus-" + c.type + "Stop",
                        inport: c.inport,
                        outport: c.outport,
                        startname: c.startname,
                        endname: c.endname
                    },
                    k++,
                    j.push(c.endinfo),
                    c.passdepot = [];
                    var g = [];
                    g = _multiStr2Lnglat(c.passdepotcoord),
                    passid = c.passdepotid.split(" "),
                    passname = c.passdepotname.split(" "),
                    $.each(g,
                    function (a, b) {
                        c.passdepot.push({
                            name: passname[a],
                            id: passid[a],
                            coord: b
                        })
                    });
                    var l = c.alterlist;
                    if (_.isEmpty(l) || $.each(l,
                    function (a, b) {
                        e.length < 3 && e.indexOf(b.bus_key_name) < 0 && e.push(b.bus_key_name),
                        b.driverlength_text = _formatDistance(b.driverlength),
                        b.drivertime_text = _formatTime(b.drivertime),
                        b.footlength_text = _formatDistance(b.footlength),
                        b.foottime_text = _formatTime(b.foottime),
                        b.passdepot = [];
                        var c = [];
                        c = _multiStr2Lnglat(b.passdepotcoord),
                        passid = b.passdepotid.split(" "),
                        passname = b.passdepotname.split(" "),
                        $.each(c,
                        function (a, c) {
                            b.passdepot.push({
                        name: passname[a],
                        id: passid[a],
                        coord: c
                    })
                    })
                    }), a.title.push({
                        type: c.bustype,
                        name: e.length > 1 ? e.join("/") + "绛�" : e,
                        color: c.color,
                        time_tag: c.bus_time_tag,
                        time: d
                    }), !_.isEmpty(c.eta)) {
                        var m = _multiStr2Lnglat(c.eta.etacoords);
                        $.each(c.eta.lnk,
                        function (a, b) {
                            var c = _parseInt(b.sidx),
                            d = _parseInt(b.eidx);
                            b.path = m.slice(c, d)
                        })
                    }
                    var n = {};
                    if ("1" == c.transfertype) n.type = "transfer",
                    n.polyType = "poly-bus-walk",
                    n.path = [c.startinfo.location],
                    n.end = c.startname;
                    else if ("2" == c.transfertype) n.type = "bustransfer",
                    n.polyType = "poly-bus-walk",
                    n.path = [c.startinfo.location],
                    n.end = c.startname;
                    else if (!_.isEmpty(c.walk)) {
                        var o = c.walk;
                        if (o.infolist.length > 0) {
                            var p = [],
                            q = 0;
                            $.each(o.infolist,
                            function (a, b) {
                                p = p.concat(_multiStr2Lnglat(b.coord)),
                                q += _parseInt(b.distance)
                            }),
                            o.path = p,
                            o.distance = q,
                            o.foottime = c.foottime,
                            o.distance_text = _formatDistance(q),
                            o.foottime_text = c.foottime_text,
                            n.path = p,
                            n.type = "walk",
                            n.polyType = "poly-bus-walk",
                            n.distance_text = o.distance_text,
                            n.foottime_text = o.foottime_text,
                            n.dir = o.dir,
                            n.end = c.startname
                        }
                    }
                    i.push(n),
                    i.push(c)
                })
            }
            if (a.allbuslength = Number(a.alllength) - Number(a.allfootlength), a.allbuslength_text = _formatDistance(a.allbuslength), a.alllength_text = _formatDistance(a.alllength), _.isEmpty(e) || i.push(e), _.isEmpty(toinfo) || j.push(toinfo), $.each(j,
            function (a, b) {
                b.stepCount = j.length
            }), d && (a.frominfo = d), toinfo && (a.toinfo = toinfo), $.each(j,
            function (a, b) {
                b.id = "marker-plan-" + a
            }), $.each(i,
            function (a, b) {
                b.segid = "poly-plan-" + a
            }), a.segmentlist = i, _.isEmpty(j)) a.mapstops = [],
            a.upstation = "鏈煡";
            else {
                a.mapstops = j;
                var l = j[1].name,
                m = j[1].inport && j[1].inport.name;
                "" != m && (l += "(" + m + "杩�)"),
                a.upstation = l
            }
            return a.feedBackUrl = feedback.dir(a.title),
            a
        },
        buildRailway: function (b) {
            var c = [],
            d = {};
            d.polyType = "poly-bus-rail",
            d.type = "railway",
            d.bustype = "railway",
            d.path = [];
            var e = b.price;
            if (e.price = {},
            e) {
                var f = e.type.split(" "),
                g = e.value.split(" ");
                $.each(f,
                function (b, c) {
                    e.price[a.priceType[c]] = g[b]
                })
            }
            var h = {};
            h.adcode = b.sad,
            h.location = new AMap.LngLat(b.scord.split(" ")[0], b.scord.split(" ")[1]),
            h.name = b.sst,
            h.id = b.sstid,
            h.markerType = "marker-bus-railwayStop",
            h.line = b.name,
            h.startname = b.sst,
            h.starttime = b.sint,
            h.endname = b.tst,
            h.endtime = b.tout,
            h.sin = b.sin,
            h.sint = b.sint,
            b.startinfo = h,
            c.push(h),
            d.path.push(h.location);
            var i = [],
            j = "" == b.viastid ? null : b.viastid.split(" "),
            k = b.viast.split(" "),
            l = "" == b.viastcord ? "" : _multiStr2LnglatCar(b.viastcord.split(" ")),
            m = b.viaint.split(" "),
            n = b.viawait.split(" ");
            j && $.each(j,
            function (a, b) {
                var c = {};
                c.name = k[a],
                c.wait = n[a],
                c.id = b,
                c["int"] = m[a],
                c.location = l[a],
                i.push(c),
                d.path.push(c.location)
            }),
            b.viainfo = i;
            var o = {};
            o.adcode = b.tad,
            o.location = new AMap.LngLat(b.tcord.split(" ")[0], b.tcord.split(" ")[1]),
            o.name = b.tst,
            o.id = b.tstid,
            o.markerType = "marker-bus-railwayStop",
            o.line = b.name,
            o.startname = b.sst,
            o.starttime = b.sint,
            o.endname = b.tst,
            o.endtime = b.tout,
            o.sin = b.tou,
            o.tout = b.tout,
            b.toinfo = o,
            c.push(o),
            d.path.push(o.location),
            b.segmentlist = [],
            b.segmentlist.push(d),
            b.mapstops = c,
            b.railType = a.railType[b.type],
            b.dis_text = _formatDistance(b.dis),
            b.time_text = _formatTimeByMinute(b.time);
            var p = {};
            if (!_.isEmpty(b.alter)) {
                var q = b.alter.id.split(" "),
                r = b.alter.name.split(" ");
                $.each(q,
                function (a, b) {
                    p[b] = r[a]
                }),
                p.length = q.length
            }
            return b.alterinfo = p,
            b.hasover = !0,
            b
        },
        buildTaxilist: function (a) {
            var b = [],
            c = {};
            c.polyType = "poly-bus-taxi",
            c.type = "taxi",
            c.bustype = "taxi",
            c.path = [];
            var d = {};
            d.location = new AMap.LngLat(a.startpoint.split(",")[0], a.startpoint.split(",")[1]),
            d.name = a.sname,
            d.markerType = "marker-bus-taxistop",
            a.startinfo = d,
            b.push(d),
            c.path.push(d.location);
            var e = {};
            return e.location = new AMap.LngLat(a.endpoint.split(",")[0], a.endpoint.split(",")[1]),
            e.name = a.ename,
            e.markerType = "marker-bus-taxistop",
            a.endinfo = e,
            c.path.push(e.location),
            a.segmentlist = [],
            a.segmentlist.push(c),
            a.mapstops = b,
            a.length_text = _formatDistance(a.length),
            a.drivetime_text = _formatTime(a.drivetime),
            a.polycolor = a.color,
            a
        },
        fuseBusRail: function (b) {
            var c = b.segments,
            d = [],
            e = [],
            f = 0,
            g = $.extend(!0, {},
            amap.dir.from),
            h = $.extend(!0, {},
            amap.dir.to);
            return g.id = "marker-plan-0",
            g.markerType = "marker-bus-from",
            g.type = "from",
            g.location = _str2LngLat(g.lnglat),
            h.markerType = "marker-bus-to",
            h.type = "to",
            h.location = _str2LngLat(h.lnglat),
            d.push($.extend(!0, {},
            g)),
            $.each(c,
            function (b, c) {
                "bus" == c.bustype ? c = a.buildBuslist(c) : "rail" == c.bustype ? (c.hasover || (c = a.buildRailway(c)), c.altercount ? f = c.altercount : f += c.alterinfo.length) : "taxi" == c.bustype && (c = a.buildTaxilist(c)),
                d = d.concat(c.mapstops),
                e = e.concat(c.segmentlist)
            }),
            d.push($.extend(!0, {},
            h)),
            $.each(d,
            function (a, b) {
                b.id = "marker-plan-" + a
            }),
            $.each(e,
            function (a, b) {
                b.segid = "poly-plan-" + a
            }),
            b.recommend.altercount = f,
            b.mapstops = $.extend(!0, {},
            d),
            b.segmentlist = $.extend(!0, {},
            e),
            b
        },
        buildRailroute: function (a) {
            var b = a.routelist,
            c = a.buslist,
            d = a.taxilist;
            _.isEmpty(b) || $.each(b,
            function (a, b) {
                b.distance_text = _formatDistance(b.distance),
                b.cost_text = _formatCost(b.cost),
                b.time_text = _formatTimeByMinute(b.time);
                var e = b.segments,
                f = [],
                g = [],
                h = {};
                $.each(e,
                function (a, b) {
                    $.each(b,
                    function (a, b) {
                        if ("bus" == b[0]) {
                            var e = $.extend({},
                            !0, c[Number(b[1])]);
                            e.bustype = "bus",
                            f.push(e)
                        } else if ("railway" == b[0]) {
                            var i = $.extend({},
                            !0, b[1]);
                            i.bustype = "rail",
                            g.indexOf(i.sst) < 0 && g.push(i.sst),
                            h.name || (h.name = i.trip),
                            g.push(i.tst),
                            f.push(i)
                        } else if ("taxi" == b[0]) {
                            var j = $.extend({},
                            !0, d[Number(b[1])]);
                            j.bustype = "taxi",
                            f.push(j)
                        }
                    })
                }),
                b.segments = f,
                b.plantitle = g,
                b.recommend = h
            })
        },
        alterBusline: function (a) { },
        getAlterRail: function (b, c, d) {
            if (_.isEmpty(b)) toastr.warning("鎶辨瓑锛屾殏鏃舵湭鏌ヨ鍒板叾浠栬溅娆★紒");
            else {
                var e = b.sstid,
                f = b.tstid,
                g = (b.order, {
                    pagenum: "1",
                    pagesize: "100"
                });
                g = $.extend(g, b),
                $.get(amap.service.busRailway + $.param(g)).done(function (b) {
                    if ("1" == b.status) {
                        var g = b.data.railways;
                        _.isEmpty(g) ? toastr.warning("鎶辨瓑锛屾殏鏃舵湭鏌ヨ鍒板叾浠栬溅娆★紒") : ($.each(g,
                        function (b, c) {
                            c.altercount = g.length,
                            a.buildRailway(c)
                        }), b.data.from = e, b.data.to = f, b.data.defaultorder = d, b.data.alterindex = c || "", amap.alterBus = b)
                    }
                })
            }
        },
        showAlterBox: function (a) {
            tpl.tplLoad({
                filename: "dir-plan-busalter",
                data: a,
                callback: function (a) {
                    $modal = $("#amap_panel_model");
                    var b = $("#indexbox").height() + 20,
                    c = b - 138 - 92;
                    c > 438 && (c = 438),
                    $modal.html("").html(a).show(),
                    $("#alter_list").css("height", c + "px"),
                    amap.slimscroll($(".alter_list"), {
                        height: c
                    })
                }
            })
        },
        refreshAlterBox: function (a) {
            tpl.tplLoad({
                filename: "dir-plan-busalterlist",
                data: a,
                callback: function (a) {
                    $modal = $("#alter_list"),
                    $modal.html("").html(a).show()
                }
            })
        },
        hideAlterBox: function (a) {
            $modal = $("#amap_panel_model"),
            $modal.html("")
        },
        dirBusNew: function (a, b) {
            var c = this;
            c.getBusData()
        }
    };
    $.extend(dirapi, a),
    watch(amap, "alterBus",
    function () {
        var b = amap.alterBus;
        if ("1" == b.status) {
            var c = b.data;
            c.defaultorder ? a.showAlterBox(c) : a.refreshAlterBox(c)
        }
    })
}(),
!
function () {
    var a = {
        dirWalk: function (a) {
            var b = this,
            c = amap.dir.from,
            d = amap.dir.to;
            amap.dir.policy;
            AMap.service(["AMap.Walking"],
            function () {
                var a = (c.modxy, c.lnglat),
                e = null;
                e = new AMap.LngLat(a.split(",")[0], a.split(",")[1]);
                var f = (d.modxy, d.lnglat),
                g = null;
                g = new AMap.LngLat(f.split(",")[0], f.split(",")[1]);
                var h = new AMap.Walking;
                amap.walking = h,
                h.search(e, g),
                AMap.event.addListener(h, "complete",
                function (a) {
                    var e = b.buildWalkData(a);
                    c.id = c.id && c.id.split("-")[0] + "-from" || "from",
                    d.id = d.id && d.id.split("-")[0] + "-to" || "to",
                    e.frominfo = c,
                    e.toinfo = d,
                    amap.dirp = e
                }),
                AMap.event.addListener(h, "error",
                function (a) {
                    amap.dirp = {
                        routes: []
                    }
                })
            })
        },
        dirWalkNew: function () {
            var a = this;
            a.getWalkData()
        },
        getWalkData: function () {
            var a = amap.dir.from,
            b = amap.dir.to,
            c = (amap.dir.policy, amap.dir.type || "walk", {
                lv: "2.5",
                taxi: 1,
                output: "json"
            }),
            d = a.lnglat.split(","),
            e = b.lnglat.split(","),
            f = a.id.split("-")[0],
            g = b.id.split("-")[0],
            h = "";
            h = f && !_.isEmpty(f) ? f : d[0] + "," + d[1];
            var i = "";
            i = g && !_.isEmpty(g) ? g : e[0] + "," + e[1];
            var j = "0",
            k = "0",
            l = 1e6,
            m = h + "," + i + "," + j + "," + k + "," + l,
            n = {
                poinavi: m,
                fromX: d[0] || "",
                fromY: d[1] || "",
                from_pid: f || "",
                toX: e[0] || "",
                toY: e[1] || "",
                to_pid: g || ""
            };
            c = $.extend(c, n),
            $.get(amap.service.navFoot + $.param(c)).done(function (a) {
                console.log("navFoot", a)
            })
        },
        buildWalkData: function (a) {
            var b = apicache;
            if ("ok" == a.info) {
                a.type = "walk";
                var c = a.routes[0],
                d = c.steps;
                d && d.length > 0 && (c.planTitle = [], $.each(d,
                function (a, e) {
                    e.signs = b.routeSign[e.action] || "advance",
                    e.polyType = "poly-walk",
                    e.id = "step-" + a,
                    a < d.length - 1 && e.path.push(d[a + 1].start_location),
                    "" != e.road && c.planTitle.indexOf(e.road) < 0 && c.planTitle.push(e.road)
                }), c.distanceNum = c.distance, c.distance = _formatDistance(c.distance), c.time = _formatTime(c.time), c.feedBackUrl = feedback.dir())
            }
            return a
        },
        buildWalkDataNew: function () { },
        addDirWalkOverlays: function (a) {
            var b = amap.dirp,
            c = b.frominfo.lnglat.split(","),
            d = b.toinfo.lnglat.split(","),
            e = [];
            e.push({
                type: "polyline",
                list: b.routes[a].steps
            }),
            e.push({
                type: "marker",
                list: [{
                    id: b.toinfo.id,
                    location: new AMap.LngLat(d[0], d[1]),
                    markerType: "marker-walk-to",
                    type: "to",
                    name: b.toinfo.name
                },
                {
                    id: b.frominfo.id,
                    location: new AMap.LngLat(c[0], c[1]),
                    markerType: "marker-walk-from",
                    type: "from",
                    name: b.frominfo.name
                }]
            }),
            mapapi.clearAllOverlays(),
            mapapi.addOverlays(e)
        },
        addDirWalkOverlaysNew: function () { }
    };
    $.extend(dirapi, a)
}();
var maptools = {
    week: {
        1: "涓€",
        2: "浜�",
        3: "涓�",
        4: "鍥�",
        5: "浜�",
        6: "鍏�",
        0: "鏃�",
        7: "鏃�"
    },
    trifficType: "current",
    rangingNode: 0,
    mousemove: null,
    initTimeDrag: function () {
        var a = this,
        b = new Date,
        c = b.getHours().toString();
        $("#time_drag").Ranged({
            min: -12,
            max: 12,
            step: 1,
            value: c - 12,
            onChange: function (a) {
                a = (a + 12).toString(),
                $(".time").attr("value", a),
                a.length < 2 && (a = "0" + a),
                $(".thumb-time, .time").text(a + ":00")
            },
            onDragStart: function (a) { },
            onDragEnd: function (b) {
                a.reshowTrifficForecastLayer()
            }
        }),
        c.length < 2 && (c = "0" + c),
        $(".thumb-time, .time").text(c + ":00")
    },
    showTrifficLayer: function () {
        var a = "traffic";
        if (amap.tileLayer[a]) amap.tileLayer[a].reload(),
        amap.tileLayer[a].show();
        else {
            var b = new AMap.TileLayer.Traffic({
                type: "overlayer",
                id: a,
                detectRetina: !1,
                zIndex: 1,
                autoRefresh: !0,
                interval: 30,
                map: themap
            });
            amap.tileLayer[a] = b,
            amap.tileLayer[a].show(),
            AMap.event.addListener(b, "refresh",
            function (a) {
                var b = new Date,
                c = b.getFullYear(),
                d = b.getMonth() + 1,
                e = b.getDate(),
                f = b.getHours(),
                g = b.getMinutes().toString();
                1 == g.length && (g = "0" + g);
                var h = c + "/" + d + "/" + e,
                i = f + ":" + g;
                $(".traffic_current_wrap").find(".date").html(h),
                $(".traffic_current_wrap").find(".time").html(i)
            })
        }
    },
    hideTrifficLayer: function () {
        amap.tileLayer.traffic && amap.tileLayer.traffic.hide()
    },
    showTrifficForecastLayer: function (a) {
        var b = a.day,
        c = a.hour,
        d = "TrifficForecast";
        "0" == b && (b = "7");
        var e = "http://history.traffic.amap.com/traffic?type=2&day=" + b + "&hh=" + c + "&mm=0&x=[x]&y=[y]&z=[z]";
        if (amap.tileLayer[d]) amap.tileLayer[d].show(),
        amap.tileLayer[d].setTileUrl(e + "&ra=" + Math.random()),
        amap.tileLayer[d].reload();
        else {
            var f = new AMap.TileLayer({
                type: "overlayer",
                id: d,
                getTileUrl: e,
                detectRetina: !1,
                zIndex: 0,
                map: themap
            });
            amap.tileLayer[d] = f,
            amap.tileLayer[d].show()
        }
    },
    reshowTrifficForecastLayer: function () {
        var a = this,
        b = {
            day: $(".week").attr("value"),
            hour: $(".time").attr("value")
        };
        a.showTrifficForecastLayer(b)
    },
    hideTrifficForecastLayer: function () {
        amap.tileLayer.TrifficForecast && amap.tileLayer.TrifficForecast.hide()
    },
    addTrafficCurrent: function () {
        var a = this,
        b = new Date,
        c = b.getFullYear(),
        d = b.getMonth() + 1,
        e = b.getDate(),
        f = b.getHours(),
        g = b.getMinutes().toString();
        1 == g.length && (g = "0" + g),
        a.showTrifficLayer(),
        tpl.tplLoad({
            filename: "canvas-trafficCurrent",
            data: {
                date: c + "/" + d + "/" + e,
                time: f + ":" + g
            },
            callback: function (a) {
                $(".panel_body").html(a)
            }
        })
    },
    addTrafficForecast: function () {
        var a = this,
        b = new Date,
        c = b.getDay(),
        d = b.getHours(),
        e = {
            day: c,
            hour: d
        };
        a.showTrifficForecastLayer(e),
        tpl.tplLoad({
            filename: "canvas-trafficForecast",
            data: {
                day: c,
                time: d + ":00",
                timevalue: d
            },
            callback: function (b) {
                $(".panel_body").html(b),
                a.initTimeDrag()
            }
        })
    },
    showMapLayer: function () {
        var a = "mapLayer";
        amap.tileLayer[a] && amap.tileLayer[a].setMap(themap)
    },
    hideMapLayer: function () {
        var a = "mapLayer";
        amap.tileLayer[a] && amap.tileLayer[a].setMap(null)
    },
    showSatelliteLayer: function () {
        var a = "satellite";
        amap.tileLayer[a] ? amap.tileLayer[a].setMap(themap) : amap.tileLayer[a] = new AMap.TileLayer.Satellite({
            detectRetina: !1,
            zIndex: 2,
            map: themap
        }),
        $("#themap").find(".amap-copyright").html("漏2014 楂樺痉杞欢 瀹″浘鍙稧S(2014)6064鍙� | 浜琁CP璇� 070711鍙� | 鐢叉祴璧勫瓧11002004 | Image漏 DigitalGlobe & chinasiwei | AIRBUS & EastDawn")
    },
    hideSatelliteLayer: function () {
        amap.tileLayer.satellite && amap.tileLayer.satellite.setMap(null)
    },
    showRoadnetLayer: function () {
        var a = "roadNet";
        amap.tileLayer[a] ? amap.tileLayer[a].setMap(themap) : amap.tileLayer[a] = new AMap.TileLayer.RoadNet({
            detectRetina: !1,
            zIndex: 4,
            map: themap
        })
    },
    hideRoadnetLayer: function () {
        amap.tileLayer.roadNet && amap.tileLayer.roadNet.setMap(null)
    },
    addRangingTool: function () {
        var a = this;
        themap.plugin(["AMap.RangingTool"],
        function () {
            var b = {
                content: '<div style="width: 13px; height: 13px; overflow: hidden; position: relative; z-index: 1;"><img src="/assets/img/stadiometry.png" style="position: absolute; z-index: -1; left: -2px; top: -2px; cursor: pointer;"></div>',
                offset: new AMap.Pixel(-6, -7)
            },
            c = {
                content: '<div style="width: 13px; height: 13px; overflow: hidden; position: relative; z-index: 1;"><img src="/assets/img/stadiometry.png" style="position: absolute; z-index: -1; left: -2px; top: -2px; cursor: pointer;"></div>',
                offset: new AMap.Pixel(-6, -7)
            },
            d = {
                content: '<div style="width: 13px; height: 13px; overflow: hidden; position: relative; z-index: 1;"><img src="/assets/img/stadiometry.png" style="position: absolute; z-index: -1; left: -2px; top: -2px; cursor: pointer;"></div>',
                offset: new AMap.Pixel(-6, -7)
            },
            e = {
                strokeStyle: "solid",
                strokeColor: "#fe383a",
                strokeOpacity: .8,
                strokeWeight: 3
            },
            f = {
                startMarkerOptions: b,
                midMarkerOptions: c,
                endMarkerOptions: d,
                lineOptions: e
            };
            apicache.rangingTool || (apicache.rangingTool = new AMap.RangingTool(themap, f)),
            amap.mapToolLayer.ranging = !0,
            apicache.rangingTool.turnOn(),
            themap.set("isHotspot", !1),
            AMap.event.addListener(apicache.rangingTool, "move",
            function (b) {
                var c = b.distance || 0;
                a.changePromptContent(c)
            }),
            AMap.event.addListener(apicache.rangingTool, "addnode",
            function (b) {
                a.rangingNode++
            }),
            AMap.event.addListener(apicache.rangingTool, "removenode",
            function (b) {
                a.rangingNode--
            }),
            AMap.event.addListener(apicache.rangingTool, "end",
            function (b) {
                amap.mapToolLayer.ranging = !1,
                apicache.rangingTool.turnOff(),
                $(".ranging").removeClass("active"),
                themap.set("isHotspot", !0),
                a.removePromptMarker(),
                a.rangingNode = 0
            }),
            AMap.event.addListener(apicache.rangingTool, "cancel",
            function (b) {
                a.rangingNode = 0,
                a.changePromptContent()
            })
        })
    },
    offRangingTool: function () {
        amap.mapToolLayer.ranging && (apicache.rangingTool.turnOff(), amap.mapToolLayer.ranging = !1)
    },
    addPromptMarker: function (a) {
        var b = this,
        c = "marker-prompt",
        a = "鍗曞嚮纭畾璧风偣",
        d = {
            id: "prompt-marker",
            map: themap,
            zIndex: 999,
            content: b.setPromptContent(a),
            offset: {
                x: 22,
                y: 12
            }
        },
        e = new AMap.Marker(d);
        e.id = c,
        apicache.promptMarker = e,
        e.hide(),
        b.mousemove = AMap.event.addListener(themap, "mousemove",
        function (a) {
            var c = a.lnglat;
            b.changePromptPosition(c)
        })
    },
    removePromptMarker: function () {
        var a = this;
        apicache.promptMarker && (apicache.promptMarker.setMap(null), apicache.promptMarker = null),
        AMap.event.removeListener(a.mousemove)
    },
    changePromptPosition: function (a) {
        apicache.promptMarker && (apicache.promptMarker.setPosition(a), apicache.promptMarker.show())
    },
    setPromptContent: function (a) {
        var b = document.createElement("div");
        b.className = "tool-prompt-marker zdeps-1";
        var c = document.createElement("div");
        return c.className = "prompt-content",
        c.innerHTML = a,
        b.appendChild(c),
        b
    },
    changePromptContent: function (a) {
        var b = this,
        c = "<div>鎬婚暱锛�" + b.formatRulerDistance(a, "color:#FE383A;font-weight:bold") + '</div><div style="color: #7E7E7E;">鍗曞嚮缁х画,鍙屽嚮鎴栧彸閿粨鏉�</div>';
        if (b.rangingNode >= 1) {
            var d = b.setPromptContent(c);
            apicache.promptMarker.setContent(d)
        } else {
            var d = b.setPromptContent("鍗曞嚮纭畾璧风偣");
            apicache.promptMarker.setContent(d)
        }
    },
    formatRulerDistance: function (a, b) {
        var c = /^[\d.]+$/;
        if (c.test(a)) {
            if (1e3 > a) {
                var d = a.toFixed(0);
                return "<span " + (b ? 'style="' + b + '"' : "") + ">" + d + "</span>绫�"
            }
            var d = (a / 1e3).toFixed(1);
            return "<span " + (b ? 'style="' + b + '"' : "") + ">" + d + "</span>鍏噷"
        }
        return a
    },
    setFullscreen: function () {
        amap.fullscreen
    },
    openSubway: function () { }
},
favmapapi = {
    routetype: {
        0: "busline",
        1: "car",
        2: "bus",
        3: "walk"
    },
    initFavData: function () {
        var a = apicache,
        b = amap.faves;
        $.each(b.info.data,
        function (b, c) {
            a.favDatas[c.id] = c
        })
    },
    showFavDir: function (a) {
        var b = this,
        c = apicache,
        d = c.favDatas[a].data,
        e = d.route_type,
        f = d.from_poi,
        g = d.to_poi,
        h = d.method;
        if ("0" != e) {
            var i = {
                type: b.routetype[e],
                policy: h,
                from: {
                    name: f.mName,
                    id: f.mId,
                    adcode: f.CityCode,
                    modxy: null,
                    lnglat: toLngLatString(f.mx, f.my)
                },
                to: {
                    name: g.mName,
                    id: g.mId,
                    adcode: g.CityCode,
                    modxy: null,
                    lnglat: toLngLatString(g.mx, g.my)
                }
            };
            amap.fwd("/dir/?" + $.param(i))
        }
    },
    showFavBusline: function (a) {
        var b = apicache,
        c = b.favDatas[a].data,
        d = c.key_name;
        d ? amap.fwd("/search?" + $.param({
            query: d,
            query_type: "TQUERY"
        })) : toastr.warning("鎶辨瓑锛屾病鏈夋鏉＄嚎璺紒")
    },
    showFavPoi: function () { }
}; !
function () {
    function a(a) {
        a.preventDefault(),
        a.stopPropagation()
    }
    watch(amap, "map",
    function () {
        mapapi.initMapEvent(),
        mapapi.addBasicPlugin(),
        mapapi.addContextMenu(),
        mapapi.initHotsopt()
    }),
    watch(amap, "state",
    function () {
        mapapi.clearAllOverlays()
    }),
    watch(amap.serp, "data",
    function () {
        var a = amap.serp.data,
        b = amap.serp.classify;
        mapapi.clearAllOverlays(!0),
        b ? mapapi.addOverlays(a) : mapapi.addOverlays(a)
    }),
    watch(amap, "faves",
    function () {
        if ("faves" == amap.state) {
            var a = amap.faves;
            mapapi.clearAllOverlays(!0),
            "1" == a.code && (favmapapi.initFavData(), mapapi.addFavMarker(a))
        }
    },
    0),
    watch(amap, "city",
    function () {
        var a = amap.adcode,
        b = amap.city,
        c = new AMap.LngLat(b[0], b[1]);
        themap.panTo(c),
        "100000" == a ? themap.setZoom(1) : themap.setZoom(10)
    }),
    watch(amap, "zoom",
    function () {
        var a = themap.get("zooms"),
        b = themap.getZoom();
        $(".zoom_map").removeClass("zoom_unable"),
        b == a[1] ? $(".zoom_in_map").addClass("zoom_unable") : b == a[0] && $(".zoom_out_map").addClass("zoom_unable")
    }),
    watch(amap.markerState, "hover",
    function () {
        var a = amap.markerState.hover.poiid;
        a ? mapapi.highlightOverlays(a) : mapapi.unHighlightOverlays(a)
    }),
    watch(amap.markerState, "active",
    function () {
        var a = amap.markerState.active.poiid;
        a ? (mapapi.activeOverlays(a), mapapi.addInfowindow({
            id: a
        })) : mapapi.unActiveOverlays()
    }),
    watch(amap.lineState, "active",
    function () {
        var a = amap.lineState.active.lineid;
        if (a) {
            var b = amap.serp.busdata[a];
            mapapi.clearOverlays(["polyline-bus", "marker-busStop"]),
            mapapi.addOverlays(b),
            amap.lineState.active.lineid = !1
        }
    }),
    watch(amap.favState, "poiid",
    function () {
        var a = amap.favState.poiid;
        if (a) {
            var b = apicache.favDatas[a],
            c = b.type;
            if ("0" == c) mapapi.activeOverlays(a),
            mapapi.addInfowindow({
                id: a
            });
            else {
                var d = b.data.route_type;
                "0" == d ? favmapapi.showFavBusline(a) : favmapapi.showFavDir(a)
            }
        } else mapapi.unActiveOverlays()
    }),
    watch(amap, "direction",
    function (a, b, c, d) {
        if (amap.carState.activeindex = !1, amap.busState.active = !1, amap.busState.activeindex = !1, dirapi.closeDir(), !_.isEmpty(c)) {
            var e = amap.direction.type;
            "car" == e ? dirapi.dirCarNew() : "bus" == e ? dirapi.dirBusNew() : "walk" == e && dirapi.dirWalk()
        }
    }),
    watch(amap, "dirp",
    function () {
        if (amap.dirp) {
            var a = amap.dirp.type,
            b = "0";
            "car" == a ? (dirapi.clearCarTmc(), dirapi.clearAllRoute(), dirapi.addDirCarOverlaysNew(b), dirapi.showAllRouteNew(), dirapi.showAllRoutesTmcNew()) : "bus" == a ? _.isEmpty(amap.dirp.buslist) && _.isEmpty(amap.dirp.routelist) || (b = amap.busState.acticeindex || "0", dirapi.addDirBusOverlaysNew(b)) : "walk" == a && (b = amap.walkState.acticeindex || "0", dirapi.addDirWalkOverlays(b)),
            dirapi.creatDirQrcode()
        }
    }),
    watch(amap.carState, "hover",
    function () {
        var a = amap.carState.hover,
        b = amap.carState.unhover;
        a ? dirapi.stepHighlight(a) : (!amap.carState.active || amap.carState.active && amap.carState.active != amap.carState.unhover) && dirapi.stepUnHighlight(b)
    }),
    watch(amap.carState, "active",
    function () {
        var a = amap.carState.active;
        if (a) if ("start" == a || "end" == a) {
            var b = $(".plan").find("." + a).attr("id");
            mapapi.addInfowindow({
                id: b
            })
        } else dirapi.stepUnHighlight(),
        dirapi.stepHighlight(a),
        mapapi.addInfowindow({
            id: "step-" + a
        });
        else dirapi.stepUnHighlight()
    }),
    watch(amap.carState, "index",
    function () {
        var a = amap.carState.index;
        a ? dirapi.routeHighlightNew(a) : dirapi.routeUnhighlight()
    }),
    watch(amap.carState, "activeindex",
    function () {
        var a = amap.carState.activeindex;
        a && (dirapi.clearAllRoute(), dirapi.setCarRoute(a), dirapi.addDirCarOverlaysNew(a), dirapi.showAllRouteNew(), dirapi.showAllRoutesTmcNew(), setTimeout(function () {
            dirapi.creatDirQrcode()
        },
        200))
    }),
    watch(amap.busState, "index",
    function () {
        var a = amap.busState.index;
        a ? dirapi.routeHighlightNew(a) : dirapi.routeUnhighlight()
    }),
    watch(amap.busState, "activeindex",
    function () {
        var a = amap.busState.activeindex;
        a && (dirapi.addDirBusOverlaysNew(a), setTimeout(function () {
            dirapi.creatDirQrcode()
        },
        200))
    }),
    watch(amap.walkState, "hover",
    function () {
        var a = amap.walkState.hover,
        b = amap.walkState.unhover;
        a ? dirapi.stepHighlight(a) : (!amap.walkState.active || amap.walkState.active && amap.walkState.active != amap.walkState.unhover) && dirapi.stepUnHighlight(b)
    }),
    watch(amap.walkState, "active",
    function () {
        var a = amap.walkState.active;
        if (a) if ("start" == a || "end" == a) {
            var b = $(".plan").find("." + a).attr("id");
            mapapi.addInfowindow({
                id: b
            })
        } else dirapi.stepHighlight(a),
        mapapi.addInfowindow({
            id: "step-" + a
        });
        else dirapi.stepUnHighlight()
    }),
    watch(amap.busState, "active",
    function () {
        var a = amap.busState.active;
        a ? dirapi.stepFitviewBus(a) : dirapi.stepUnHighlightBus()
    }),
    watch(amap.busState, "station",
    function () {
        var a = amap.busState.station;
        a && mapapi.addInfowindow({
            id: a
        })
    }),
    watch(amap.mapToolLayer, "traffic",
    function () {
        var a = amap.mapToolLayer.traffic;
        a ? ($(".traffic_panel").css("display", "block"), $("#traffic_current").trigger("click")) : ($(".traffic_panel").css("display", "none"), maptools.hideTrifficLayer(), maptools.hideTrifficForecastLayer())
    }),
    watch(amap.mapToolLayer, "satellite",
    function () {
        var a = amap.mapToolLayer.satellite;
        a ? (maptools.showSatelliteLayer(), maptools.showRoadnetLayer(), maptools.hideMapLayer()) : (maptools.showMapLayer(), maptools.hideSatelliteLayer(), maptools.hideRoadnetLayer())
    }),
    watch(amap.mapToolLayer, "subway",
    function () {
        var a = amap.adcode.substr(0, 4),
        b = "http://map.amap.com/subway/index.html";
        amap.subwayCity.indexOf(a) > -1 && (b += "?&" + a),
        window.open(b)
    }),
    watch(amap, "fullscreen",
    function () {
        var a = amap.fullscreen;
        a ? $(".fullscreen").removeClass("full").addClass("notfull") : $(".fullscreen").removeClass("notfull").addClass("full")
    });
    var b = $("#themap");
    b.on("click", ".infowindow-close",
    function () {
        amap.markerState.active.poiid = !1,
        amap.favState.poiid = !1,
        amap.carState.active = !1,
        amap.busState.active = !1,
        amap.busState.station = !1,
        amap.walkState.active = !1,
        mapapi.colseInfowindow()
    }),
    b.on("mouseenter", ".marker-normal",
    function () {
        var a = $(this).attr("id").split("-")[1];
        amap.markerState.hover.poiid = a
    }).on("mouseleave", ".marker-normal",
    function () {
        $(this).attr("id").split("-")[1];
        amap.markerState.hover.poiid = !1
    }),
    b.on("mouseenter", ".menu_item",
    function () {
        $(this).addClass("hover")
    }).on("mouseleave", ".menu_item",
    function () {
        $(this).removeClass("hover")
    }),
    b.on("click", ".menu_item",
    function () {
        apicache.contextMenu.close()
    }),
    b.on("click", "#menuWhere",
    function () {
        var a = apicache.contextMenuPos;
        mapapi.clearOverlays(["marker-tmp"]),
        mapapi.addWhere(a)
    }),
    b.on("click", "#menuNear",
    function () {
        var a = apicache.contextMenuPos;
        mapapi.clearOverlays(["marker-tmp"]),
        mapapi.addWhere(a)
    }),
    b.on("click", "#menuSetCenter",
    function () {
        var a = apicache.contextMenuPos;
        themap.setCenter(a)
    }),
    b.on("click", "#menuClearmap",
    function () {
        themap.clearMap()
    }),
    b.on("click", "#menuClearDir",
    function () {
        $(this).hasClass("unable") || dirapi.clearDirMenu()
    }),
    b.on("click", ".menu_plan",
    function () {
        if (!$(this).hasClass("unable")) {
            var a = apicache.contextMenuPos,
            b = $(this).attr("type"),
            c = {
                type: b,
                pos: a
            };
            mapapi.clearOverlays([b]),
            mapapi.addPlanPlace(c)
        }
    });
    $(".infowindow-wrap");
    b.on("click", ".poibtn-snaps",
    function (b) {
        $(this).toggleClass("opened");
        var c = $(".poi-snaps");
        c.toggleClass("show"),
        c.hasClass("show") ? c.fadeInDownBig() : c.fadeOut(100),
        a(b)
    }),
    b.on("click", ".poibtn-srharound",
    function (b) {
        var c = $(".poibox.poi-iw .poi-tool");
        $(this).toggleClass("opened");
        var d = $(".poi-srharound");
        d.toggleClass("show"),
        d.hasClass("show") ? c.height(65) : c.height(30),
        a(b)
    }),
    b.on("click", ".srharound-shortcut span",
    function (a) {
        var b = $(this).text(),
        c = $(this).closest(".poi-srharound").find(".srharound-ipt:visible").val(b);
        c.focus(),
        $(".srharound-srhbtn").trigger("click")
    }),
    b.on("click", ".srharound-srhbtn",
    function (a) {
        var b = $.trim($(".infowindow-body").find(".srharound-ipt").val()),
        c = $(this).closest(".poi-iw").attr("pos").split(",");
        "" != b && (apicache.nearbyKeyword = b, amap.fwd("/search?" + $.param({
            query: b,
            query_type: "RQBXY",
            longitude: c[0],
            latitude: c[1]
        })))
    }),
    b.on("click", ".busline_link",
    function (a) {
        var b = $(this).text();
        amap.fwd("/search?" + $.param({
            query: b,
            query_type: "TQUERY",
            city: amap.adcode
        }))
    }),
    b.on("mouseenter", ".amap-zoom-cursor",
    function (a) {
        var b = $(".amap-zoom-mask").height();
        $(this).css("top", b + "px")
    }).on("mouseleave", ".amap-zoom-cursor",
    function (a) {
        var b = $(".amap-zoom-mask").height();
        $(this).css("top", b + "px")
    }),
    b.on("click", ".poi-feedback",
    function (a) {
        var b = $(this);
        $(".poibtn-snaps").trigger("click");
        var c = feedback.poi(b);
        window.open("http://map.amap.com" + c)
    }),
    b.on("click", ".poibtn-planto, .poibtn-planfrom",
    function (a) {
        var b = amap.iwdata,
        c = b.name,
        d = b.id,
        e = b.pos || b.location;
        lnglat = [e.lng, e.lat].join(),
        adcode = amap.adcode;
        var f = {
            name: c,
            lnglat: lnglat,
            id: d,
            adcode: adcode,
            modxy: void 0
        },
        g = $(this).hasClass("poibtn-planto"),
        h = {
            type: amap.dir.type || "car"
        };
        if (g ? (h.from = amap.dir.from, h.to = f) : (h.from = f, h.to = amap.dir.to), !$("#amapbox").is(":visible")) return void amap.fwd("/dir/?" + $.param(h));
        var i, j = this,
        k = $(document.body),
        l = $(j),
        m = g ? $(".line-search-end") : $(".line-search-start");
        i = $(".search").data("draggabilly").position.x > $(window).width() / 2 ? $('<i class="fa fa-send flyme"></i>') : $('<i class="fa fa-send flipY flyme"></i>'),
        i.css({
            top: l.offset().top,
            left: l.offset().left
        });
        var n = g ? 158 : 122;
        i.appendTo(k).animate({
            top: (m.offset().top || n) + 10,
            left: (m.offset().left || 110) + 240
        },
        {
            duration: 800,
            easing: "easeInOutExpo",
            complete: function () {
                _.delay(function () {
                    i.remove()
                },
                300)
            }
        }),
        _.delay(function () {
            amap.fwd("/dir/?" + $.param(h))
        },
        500)
    }),
    b.on("click", ".ma-page-next",
    function (a) {
        var b = Number($(this).closest(".ma-page").find(".ma-cur-page").attr("index")),
        c = b + 1;
        mapapi.openPlaceSearchInfowindow(c)
    }),
    b.on("click", ".ma-page-up",
    function (a) {
        var b = Number($(this).closest(".ma-page").find(".ma-cur-page").attr("index")),
        c = b - 1;
        mapapi.openPlaceSearchInfowindow(c)
    }),
    b.on("click", ".step-before",
    function (a) {
        var b = amap.dir.type;
        if (!$(this).hasClass("step-unable")) {
            var c = $(this).closest(".step-tool").attr("cur"),
            d = Number($(this).closest(".step-tool").attr("steps"));
            "to" == c ? "car" == b ? amap.carState.active = d - 1 : "walk" == b ? amap.walkState.active = d - 1 : "bus" == b && (amap.busState.station = "marker-plan-" + (d - 2)) : "0" == c ? "car" == b ? amap.carState.active = "start" : "walk" == b && (amap.walkState.active = "start") : "1" == c && "bus" == b ? amap.busState.station = "marker-plan-0" : "car" == b ? amap.carState.active = (Number(c) - 1).toString() : "walk" == b ? amap.walkState.active = (Number(c) - 1).toString() : "bus" == b && (amap.busState.station = "marker-plan-" + (Number(c) - 1).toString())
        }
    }),
    b.on("click", ".step-next",
    function (a) {
        var b = amap.dir.type;
        if (!$(this).hasClass("step-unable")) {
            var c = $(this).closest(".step-tool").attr("cur"),
            d = Number($(this).closest(".step-tool").attr("steps"));
            "from" == c ? "car" == b ? amap.carState.active = "0" : "walk" == b ? amap.walkState.active = "0" : "bus" == b && (amap.busState.station = "marker-plan-1") : (c = Number($(this).closest(".step-tool").attr("cur")), c + 1 == d ? "car" == b ? amap.carState.active = "end" : "walk" == b ? amap.walkState.active = "end" : amap.busState.station = "marker-plan-" + (d - 1) : "car" == b ? amap.carState.active = c + 1 : "walk" == b ? amap.walkState.active = c + 1 : "bus" == b && (amap.busState.station = "marker-plan-" + (c + 1)))
        }
    }),
    b.on("click", ".zoomin-btn",
    function (a) {
        var b = Number(themap.getZoom());
        themap.zoomIn(),
        17 == b && $(this).text("缂╁皬").removeClass("zoomin-btn").addClass("zoomout-btn")
    }),
    b.on("click", ".zoomout-btn",
    function (a) {
        var b = Number(themap.getZoom());
        themap.zoomOut(),
        12 == b && $(this).text("鏀惧ぇ").removeClass("zoomout-btn").addClass("zoomin-btn")
    }),
    b.on("mouseenter", ".dir_qrcode_tip",
    function (a) {
        var b = $(this).find("canvas"),
        c = $(this).find(".dir_qr_text");
        b.stop(!1, !0),
        b.animate({
            height: "90px",
            width: "90px"
        },
        "fast",
        function () {
            c.slideDown(150)
        })
    }).on("mouseleave", ".dir_qrcode_tip",
    function (a) {
        var b = $(this).find("canvas"),
        c = $(this).find(".dir_qr_text");
        b.stop(!1, !0),
        c.hide(),
        b.animate({
            height: "60px",
            width: "60px"
        },
        "fast")
    });
    var c = $("#amapbox");
    c.on("mouseenter", ".routeseg",
    function () {
        var a = $(this).attr("index"),
        b = amap.dir.type;
        "car" == b ? amap.carState.hover = a : "walk" == b && (amap.walkState.hover = a)
    }).on("mouseleave", ".routeseg",
    function () {
        var a = $(this).attr("index"),
        b = amap.dir.type;
        "car" == b ? (amap.carState.hover = !1, amap.carState.unhover = a) : "walk" == b && (amap.walkState.hover = !1, amap.walkState.unhover = a)
    }).on("click", ".routeseg",
    function () {
        var a = $(this).attr("index"),
        b = amap.dir.type;
        "car" == b ? amap.carState.active = a : "walk" == b && (amap.walkState.active = a)
    }),
    c.on("mouseenter", ".route",
    function () {
        var a = $(this).attr("index"),
        b = amap.dir.type;
        "walk" == b && (amap.walkState.hover = a)
    }).on("mouseleave", ".route",
    function () {
        var a = $(this).attr("index"),
        b = amap.dir.type;
        "walk" == b && (amap.walkState.hover = !1, amap.walkState.unhover = a)
    }).on("click", ".route",
    function () {
        var a = $(this).attr("index"),
        b = amap.dir.type;
        "walk" == b && (amap.walkState.active = a)
    }),
    c.on("click", ".bus-route",
    function () {
        var a = $(this).attr("index");
        amap.busState.active = a
    }),
    c.on("click", ".busstop",
    function (a) {
        a.preventDefault(),
        a.stopPropagation();
        var b = $(this).attr("id");
        amap.busState.station = b
    }),
    c.on("click", ".start",
    function () {
        var a = amap.dir.type;
        "car" == a ? amap.carState.active = "start" : "walk" == a && (amap.walkState.active = "start")
    }),
    c.on("click", ".end",
    function () {
        var a = amap.dir.type;
        "car" == a ? amap.carState.active = "end" : "walk" == a && (amap.walkState.active = "end")
    }),
    c.on("click", ".alter_more",
    function () {
        var a = $(this).attr("id") && $(this).attr("id").split("_"),
        b = a[0],
        c = a[1],
        d = "1",
        e = $(this).attr("index"),
        f = {
            sstid: b,
            tstid: c,
            order: d
        },
        g = !0;
        dirapi.getAlterRail(f, e, g)
    }),
    c.on("click", ".order_item",
    function () {
        var a = $(this).attr("id"),
        b = $(this).attr("order");
        $(".order_item").removeClass("up down"),
        "leave" == a ? "1" == b ? $(this).addClass("down").attr("order", 2) : $(this).addClass("up").attr("order", 1) : "arrive" == a ? "3" == b ? $(this).addClass("down").attr("order", 4) : $(this).addClass("up").attr("order", 3) : "spend" == a && ("5" == b ? $(this).addClass("down").attr("order", 6) : $(this).addClass("up").attr("order", 5));
        var c = $(this).attr("order"),
        d = $(this).closest(".alter_bus_wrap").attr("from"),
        e = $(this).closest(".alter_bus_wrap").attr("to"),
        f = {
            sstid: d,
            tstid: e,
            order: c
        },
        g = !1;
        dirapi.getAlterRail(f, "", g)
    }),
    c.on("click", ".alter_item",
    function () {
        var a = $(this).attr("id").split("_")[1],
        b = $(this).closest(".alter_bus_wrap").attr("index").split("_"),
        c = $.extend(!0, {},
        amap.alterBus.data.railways[a]),
        d = $.extend(!0, {},
        amap.dirapip);
        d.data.routelist[b[0]].segments[b[1]][1][1] = c,
        d.data.curopen = b[0],
        dirapi.hideAlterBox(),
        dirapi.buildBusDataNew(d)
    }),
    c.on("click", ".alter_bus_close",
    function () {
        dirapi.hideAlterBox()
    });
    var d = $(".layerbox");
    d.on("click", ".layer_item",
    function () {
        var a = $(this).attr("type");
        "weather" != a && ($(this).hasClass("active") ? ($(this).removeClass("active"), amap.mapToolLayer[a] = !1) : ("subway" !== a && $(".layer_item").removeClass("active"), $(this).addClass("active"), amap.mapToolLayer[a] = !0), "traffic" == a ? amap.mapToolLayer.satellite = !1 : "pano" == a || "satellite" == a && (amap.mapToolLayer.traffic = !1))
    }),
    d.on("click", ".traffic_item",
    function () {
        var a = $(this).attr("type");
        $(".traffic_item").removeClass("active"),
        $(this).addClass("active"),
        "current" == a ? (maptools.hideTrifficForecastLayer(), maptools.addTrafficCurrent()) : "forecast" == a && (maptools.hideTrifficLayer(), maptools.addTrafficForecast())
    }),
    d.on("click", ".week_item",
    function () {
        var a = $(this).attr("value"),
        b = $(this).attr("text");
        $(".week").attr("value", a).text("鏄熸湡" + b),
        $(".week_item").removeClass("select"),
        $(this).addClass("select"),
        maptools.reshowTrifficForecastLayer()
    }),
    d.on("click", ".roadnet",
    function (a) {
        a.stopPropagation()
    }),
    d.on("click", ".tool_item", _.throttle(function (a) {
        a.preventDefault(),
        a.stopPropagation();
        var b = $(this).attr("type");
        switch (b) {
            case "ranging":
                $(this).hasClass("active") ? ($(this).removeClass("active"), maptools.offRangingTool(), maptools.removePromptMarker()) : ($(this).addClass("active"), maptools.addPromptMarker(), maptools.addRangingTool());
                break;
            case "fullscreen":
                var c = amap.fullscreen;
                c ? amap.fullscreen = !1 : amap.fullscreen = !0
        }
    },
    600, {
        trailing: !1
    }));
    var e = $("#scalebox");
    e.on("click", ".zoom_map",
    function () {
        var a = $(this).attr("type");
        "in" == a ? themap.zoomIn() : "out" == a && themap.zoomOut()
    })
}();