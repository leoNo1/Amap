!
function () {
    function a(a, b) {
        var c = $("#amap-panels"),
        d = $("#around-panel"),
        e = $("#amap-links");
        if (c.children().hide(), d.attr("init")) {
            amap.slimscroll(d.find("#aroundbox"),
            function () {
                d.attr("init", !0),
                d.show(),
                e.show(),
                amap.thebox.fadeIn()
            });
            var f = $(window).height(),
            g = f - 120,
            h = g > 430 ? g : 430;
            $("#indexbox").height(h - 20),
            $("#favesbox").height(h - 40),
            $("#index-panel").attr("init", !0),
            $("#faves-panel").attr("init", !0)
        } else d.show(),
        e.show(),
        amap.thebox.fadeIn();
        b()
    }
    function b(a, b) {
        "/" === a.canonicalPath ? amap.state = amap.INDEX : amap.state = amap.AROUND,
        e.val(""),
        e.focus(),
        amap.markerState.active.poiid = !1,
        amap.lineState.active.lineid = !1,
        dirModel.reset(),
        mapapi.clearAllOverlays()
    }
    function c(a, b) {
        dirapi.clearDir(),
        mapapi.clearAllOverlays(),
        b()
    }
    var d = $("#around-panel"),
    e = $("#searchipt");
    d.on("click", "#aroundbox .o2o-keyword",
    function () {
        var a = $.trim($(this).attr("keyword"));
        amap.fwd("/search?" + $.param({
            query: a
        }))
    }),
    d.on("click", "#o2o-life>dl dd",
    function () {
        var a = $.trim($(this).attr("data-val"));
        _.isEmpty(a) && (a = $.trim($(this).text())),
        amap.fwd("/search?" + $.param({
            query: a
        }))
    }),
    page("/around", a, b),
    page.exit("/around", c),
    page("/", a, b),
    page.exit("/", c)
}(),
!
function () {
    amap.favesStore = {
        isFetch: 0,
        unitNum: 100,
        pagenum: 1,
        type: "poi",
        init: function () {
            var a = this;
            $(document).on("click", ".syncFav button",
            function () {
                a.fetch()
            }),
            $(document).on("click", ".fav-tab",
            function () {
                $(".fav-tab").removeClass("current"),
                $(this).addClass("current");
                var b = $(this).data("type");
                a.type = b,
                a.pagenum = 1;
                var c = a.get(a.pagenum);
                a.createTpl(c,
                function (a) {
                    amap.faves = c,
                    amap.favesp = a
                })
            })
        },
        show: function (a) {
            var b = this.get(a);
            return b && 1 == this.isFetch ? (this.pagenum = a, void this.createTpl(b,
            function (a) {
                amap.faves = b,
                amap.favesp = a
            })) : (this.isFetch = 1, void this.fetch())
        },
        reset: function () {
            this.type = "poi",
            this.pagenum = 1
        },
        fetch: function () {
            var a = this;
            $.get(amap.service.getAllFav).done(function (b) {
                a.pagenum = 1,
                b = b.data,
                "" !== b && a.save(b);
                var c = a.get(a.pagenum);
                a.createTpl(c,
                function (a) {
                    amap.faves = c || {},
                    amap.favesp = a
                })
            })
        },
        createTpl: function (a, b) {
            a ? a.type = this.type : a = {
                type: this.type
            },
            tpl.tplLoad({
                filename: "fav.list",
                data: a,
                callback: function (a) {
                    b && b(a)
                }
            })
        },
        update: function () {
            var a = this.getFave(),
            b = a.info.data,
            c = Math.ceil(b.length / this.unitNum);
            if (a.total_page = c, this.setFave(a), (this.pagenum - 1) * this.unitNum >= b.length) return this.pagenum = this.pagenum - 1,
            void amap.fwd("/faves?pagenum=" + this.pagenum);
            var d = this.get(this.pagenum);
            this.createTpl(d,
            function (b) {
                amap.faves = a,
                amap.favesp = b
            })
        },
        save: function (a) {
            var b = this.createFave(),
            c = this.createFave();
            for (var d in a) "info" !== d && "count" !== d && (c[d] = a[d], b[d] = a[d]);
            for (var e = a.info.data,
            f = b.info.data,
            g = c.info.data,
            d = 0,
            h = e.length; h > d; d++) "0" === e[d].type ? f.push(e[d]) : g.push(e[d]);
            b.total_page = Math.ceil(f.length / this.unitNum),
            c.total_page = Math.ceil(g.length / this.unitNum),
            this.setFave(b, "poi"),
            this.setFave(c, "dir")
        },
        get: function (a) {
            var b = (a - 1) * this.unitNum,
            c = this.getFave();
            if (void 0 === c || c.info.length <= b) return !1;
            var d = c.info.data.length,
            e = b,
            f = e + this.unitNum;
            if (e >= d) return !1;
            f = f > d ? d : f;
            var g = _.clone(c);
            return g.info.data = c.info.data.slice(e, f),
            g.pageNum = a,
            g
        },
        add: function (a) {
            type = a.type ? "poi" : "dir";
            var b = this.getFave(type);
            b.info.data.unshift(a),
            this.setFave(b, type)
        },
        del: function (a) {
            for (var b = this.getFave(), c = b.info.data, d = null, e = 0, f = c.length; f > e; e++) {
                var g = c[e];
                if (g && void 0 !== g.id && g.id === a) {
                    d = e;
                    break
                }
            }
            if (null === d) return !1;
            for (var h = d,
            f = c.length - 1; f > h; h++) {
                c[h];
                c[h] = c[h + 1],
                c[h + 1] = c[h]
            }
            c.pop(),
            this.setFave(b)
        },
        edit: function (a, b) {
            for (var c = this.getFave(), d = c.info.data, e = 0, f = d.length; f > e; e++) {
                var g = d[e];
                if (g && void 0 !== g.id && g.id === a) {
                    g.data.comment = b,
                    g.data.tag = b;
                    break
                }
            }
            this.setFave(c)
        },
        setFave: function (a, b) {
            b = b ? b : this.type;
            var c = this.getName();
            store.set(c[b], a)
        },
        getFave: function (a) {
            a = a ? a : this.type;
            var b = this.getName();
            return store.get(b[a])
        },
        createFave: function () {
            return {
                info: {
                    data: []
                }
            }
        },
        getName: function () {
            var a = amap.userinfo ? amap.userinfo.id : "";
            return {
                poi: "favespoi-" + a,
                dir: "favesdir-" + a
            }
        }
    },
    amap.favesStore.init()
}(),
!
function () {
    function a(a, b) {
        var c = $("#amap-panels"),
        d = $("#faves-panel"),
        e = $("#amap-links");
        if (c.children().hide(), d.attr("init")) {
            amap.slimscroll(d.find("#favesbox"),
            function () {
                d.attr("init", !0),
                d.show(),
                e.show(),
                amap.thebox.fadeIn()
            });
            var f = $(window).height(),
            g = f - 120,
            h = g > 430 ? g : 430;
            $("#indexbox").height(h - 20),
            $("#favesbox").height(h - 40),
            $("#index-panel").attr("init", !0),
            $("#around-panel").attr("init", !0)
        } else d.show(),
        e.show(),
        amap.thebox.fadeIn();
        b()
    }
    function b(a, b) {
        return $("#searchipt").val(""),
        amap.state = amap.FAVES,
        _.isEmpty(amap.userinfo) ? void amap.checkLogin().done(function (a) {
            a.info && 1 == a.status ? (amap.userinfo = a.info, b()) : (amap.userinfo = !1, $banner.show())
        }) : void b()
    }
    function c(a, b) {
        var c = qs.parse(a.querystring),
        d = 1;
        c && void 0 !== c.pagenum && (d = parseInt(c.pagenum), d = 0 === d ? 1 : d),
        amap.favesStore.show(d)
    }
    function d(a, b) {
        amap.favState.poiid = void 0,
        b()
    }
    page("/faves", a, b, c),
    page.exit("/faves", d)
}(),
!
function () {
    var a = function () {
        var a = 256,
        b = -85.0511287798,
        c = 85.0511287798,
        d = -180,
        e = 180,
        f = 6378137,
        g = Math.PI,
        h = {};
        return h.PixelsToQuadKey = function (a, b) {
            var c = h.PixelsToTile(a, b),
            d = h.TileToQuadKey(c.xTile, c.yTile, 20);
            return d
        },
        h.Clip = function (a, b, c) {
            return Math.min(Math.max(a, b), c)
        },
        h.LatLongToPixels = function (i, j, k) {
            var l = 2 * g * f;
            i = h.Clip(i, b, c) * g / 180,
            j = h.Clip(j, d, e) * g / 180,
            sinLatitude = Math.sin(i);
            var m = f * j,
            n = Math.log((1 + sinLatitude) / (1 - sinLatitude)),
            o = f / 2 * n,
            p = a << k,
            q = l / p,
            r = h.Clip((l / 2 + m) / q + .5, 0, p - 1),
            s = l / 2 - o,
            t = h.Clip(s / q + .5, 0, p - 1);
            return {
                x: parseInt(r),
                y: parseInt(t)
            }
        },
        h.PixelsToPixels = function (a, b, c, d) {
            var e = d - c;
            return e > 0 ? (Pixel = a >> e, b >>= e) : 0 > e && (a <<= e, b <<= e),
            {
                x: parseInt(a),
                y: parseInt(b)
            }
        },
        h.PixelsToLatLong = function (b, c, d) {
            var e = 2 * g * f,
            h = e / ((1 << d) * a),
            i = b * h - e / 2,
            j = e / 2 - c * h,
            k = g / 2 - 2 * Math.atan(Math.exp(-j / f));
            k *= 180 / g;
            var l = i / f;
            return l *= 180 / g,
            {
                la: k,
                lo: l
            }
        },
        h.PixelsToTile = function (b, c) {
            return xTile = Math.floor(b / a),
            yTile = Math.floor(c / a),
            {
                xTile: xTile,
                yTile: yTile
            }
        },
        h.TileToQuadKey = function (a, b, c) {
            for (var d = "",
            e = c; e > 0; e--) {
                mask = 1 << e - 1;
                var f = 0;
                0 != (a & mask) && f++,
                0 != (b & mask) && (f += 2),
                d += f
            }
            return d
        },
        h.QuadKeyToTile = function (a) {
            var b, c;
            b = 0,
            c = 0;
            for (var d = a.length,
            e = 1; d >= e; e++) {
                var f = a[e - 1],
                g = 1 << d - e;
                switch (f) {
                    case "0":
                        b &= ~g,
                        c &= ~g;
                        break;
                    case "1":
                        b |= g,
                        c &= ~g;
                        break;
                    case "2":
                        b &= ~g,
                        c |= g;
                        break;
                    case "3":
                        b |= g,
                        c |= g
                }
            }
            return {
                xTile: b,
                yTile: c
            }
        },
        h
    },
    b = new a,
    c = function () {
        var a = _.rest(arguments, 0).join("+");
        return CryptoJS.MD5(a).toString(CryptoJS.enc.Hex)
    },
    d = function (a, c) {
        var d = /^[-]*\d+$/;
        if (d.test(a) && d.test(c)) {
            var e = b.PixelsToLatLong(a, c, 20);
            return new AMap.LngLat(e.lo, e.la)
        }
        return new AMap.LngLat(a, c)
    },
    e = function (a, c) {
        var d = /^[-]*\d+$/;
        return d.test(a) && d.test(c) ? {
            x: a,
            y: c
        } : b.LatLongToPixels(c, a, 20)
    },
    f = function (a, b, d) {
        var e = amap.favapi.toPixelXY(a.location.lng, a.location.lat),
        f = c(e.x, e.y, a.name),
        g = {
            item_id: f,
            custom_address: a.address || "",
            poiid: a.id || a.pguid || "",
            custom_name: a.name,
            type: "0",
            address: a.address || "",
            phone_numbers: a.tel || "",
            comment: "",
            name: a.name,
            point_x: e.x,
            point_y: e.y,
            city_code: amap.adcode,
            custom_phone_numbers: a.tel || "",
            city_name: amapcity.getname(amap.adcode),
            tag: []
        },
        h = {};
        $.post(amap.service.addFav + $.param(h), {
            data: [{
                id: g.item_id || g.id,
                data: g,
                ac: 1
            }]
        },
        function (a) {
            "1" === a.status ? (toastr.success("鏀惰棌鎴愬姛锛�"), b && b(a.data.info.data[0]), amap.state === amap.FAVES) : (d && d(), toastr.warning(a.data || "鏀惰棌澶辫触锛�"))
        })
    },
    g = function (a, b) {
        var c = {
            tag: a.tag,
            id: a.id
        };
        $.post(amap.service.eidtFavNew, {
            data: c
        },
        function (a) {
            "1" == a.status ? (toastr.success("缂栬緫鎴愬姛锛�"), b && b(a)) : toastr.warning(a.data || "缂栬緫澶辫触")
        })
    },
    h = function (a) {
        for (var b = a,
        d = c(b.name, b.front_name, b.terminal_name), f = {
            id: d,
            item_id: d,
            startName: b.front_name,
            endName: b.terminal_name,
            start_time: b.start_time.split(":").join(""),
            end_time: b.end_time.split(":").join(""),
            type: 1,
            route_type: 0,
            version: "1.0.0",
            key_name: b.key_name,
            name: b.name,
            route_name: b.name,
            length: Math.floor(1e3 * b.length),
            route_len: Math.floor(1e3 * b.length),
            station_num: b.via_stops.length,
            stations: [],
            point_num: b.path.length,
            coordS: []
        },
        g = 0; g < b.via_stops.length; g++) {
            var h = b.via_stops[g],
            i = [h.location.lng, h.location.lat],
            j = e(i[0], i[1]);
            f.stations.push({
                x: j.x,
                y: j.y,
                name: h.name
            })
        }
        for (var k = 0; k < b.path.length; k++) {
            var l = b.path[k],
            m = [l.lng, l.lat],
            n = e(m[0], m[1]);
            f.coordS.push({
                x: n.x,
                y: n.y
            })
        }
        $.post(amap.service.addFav, {
            data: [{
                id: f.item_id || f.id,
                data: f,
                ac: 1
            }]
        },
        function (a) {
            "1" == a.status ? (toastr.success("鏀惰棌鎴愬姛锛�"), amap.state === amap.FAVES && (amap.favesp = a.html, amap.faves = a.data || {})) : toastr.warning(a.data || "鏀惰棌澶辫触锛�")
        })
    },
    i = function (a) {
        var b = amap.getBusRoute(amap.dirp.plans[0], amap.dirp);
        $.post(amap.service.addFav, {
            lasttime: -1,
            data: [{
                id: b.item_id || b.id,
                data: b,
                ac: 1
            }]
        },
        function (a) {
            "1" === a.status ? toastr.success("鏀惰棌鎴愬姛锛�") : toastr.warning(a.data || "鏀惰棌澶辫触锛�")
        })
    };
    $.extend(amap, {
        favapi: {
            VirtualEarthProjection: a,
            md5fav: c,
            toLngLat: d,
            toPixelXY: e,
            favpoi: f,
            favbus: i,
            favline: h,
            editpoi: g
        }
    })
}(),
!
function () {
    var a = function (a) {
        var b = a.split(",");
        return {
            x: b[0],
            y: b[1]
        }
    },
    b = function (a, b) {
        return amap.favapi.toPixelXY(a, b)
    },
    c = function (c, d) {
        var e = c.buslist[d],
        f = c.frominfo,
        g = a(f.lnglat),
        h = b(g.x, g.y),
        i = c.toinfo,
        j = a(i.lnglat),
        k = b(j.x, j.y),
        l = amap.favapi.md5fav(h.x, h.y, k.x, k.y, 2, e.alllength),
        m = {
            id: l,
            item_id: l,
            version: "1.0.0",
            route_type: "2",
            mDataLength: "0",
            type: "1",
            has_mid_poi: !1,
            method: amap.dir.policy + "",
            start_x: h.x + "",
            start_y: h.y + "",
            from_poi: {
                mCityCode: f.adcode || "",
                mCityName: amapcity.getname(f.adcode) || "",
                mId: f.id || "null",
                mName: f.name || "",
                mAddr: f.address || "null",
                mx: h.x + "",
                my: h.y + ""
            },
            end_x: k.x + "",
            end_y: k.y + "",
            to_poi: {
                mCityCode: i.adcode || 1e5,
                mCityName: amapcity.getname(i.adcode) || "",
                mId: i.id || "null",
                mName: i.name || "",
                mAddr: i.address || "null",
                mx: k.x + "",
                my: k.y + ""
            },
            route_name: "浠� " + f.name + " 鍒� " + i.name,
            taxi_price: c.taxicost + "",
            route_len: e.alllength + "",
            mTotalLength: e.alllength + "",
            mStartWalkLength: "0",
            mEndWalkLength: "0",
            route_alias: "null",
            mCostTime: e.expensetime + "",
            expense: e.expense + "",
            allfootlength: e.allfootlength + "",
            totaldriverlength: e.allbuslength,
            endfoottime: e.segmentlist[e.segmentlist.length - 1] && "walk" == e.segmentlist[e.segmentlist.length - 1].type ? e.segmentlist[e.segmentlist.length - 1].foottime + "" : "0",
            endwalk: {
                dir: e.segmentlist[e.segmentlist.length - 1].dir || "0",
                infolist: e.segmentlist[e.segmentlist.length - 1].infolist || []
            },
            mSectionNum: e.transferNum + "",
            busPathSection: [],
            create_time: Math.floor((new Date).getTime() / 1e3)
        };
        return _.each(e.segmentlist,
        function (a) {
            if ("subway" !== a.type && "bus" !== a.type) return !0;
            var c = [];
            _.each(a.passdepot,
            function (a) {
                var d = b(a.coord.lng, a.coord.lat),
                e = {
                    id: a.id,
                    name: a.name,
                    x: d.x + "",
                    y: d.y + ""
                };
                c.push(e)
            });
            var d = [];
            _.each(a.path,
            function (a) {
                var c = b(a.lng, a.lat),
                e = {
                    x: c.x + "",
                    y: c.y + ""
                };
                d.push(e)
            });
            var e = {
                mDataLength: "0",
                busType: "subway" == a.type ? "2" : "1",
                mSectionName: a.busname,
                mStartName: a.startinfo.name,
                mEndName: a.endinfo.name,
                mPathLength: a.driverlength + "",
                footLength: "",
                mStations: c,
                mStationNum: c.length + "",
                points: d,
                mPointNum: d.length + "",
                inport: {
                    name: "null",
                    coord: "0,0"
                },
                outport: {
                    name: "null",
                    coord: "0,0"
                },
                walk: {
                    dir: a.walk.dir || "0",
                    infolist: a.walk.infolist || []
                },
                foottime: a.walkTime || a.walkTime + "",
                busid: a.busid,
                starttime: a.starttime,
                endtime: a.endtime,
                startid: a.startinfo.id,
                endid: a.endinfo.id,
                driverlength: a.driverlength + "",
                drivertime: a.drivertime + "",
                night: "0",
                alterlist: []
            };
            if (a.inport) {
                var f = a.inport.coord.split(",");
                h = "",
                2 === f.length && (g = b(f[0], f[1]), h = g.x + "," + g.y),
                e.inport = {
                    name: a.inport.name,
                    coord: h
                }
            }
            if (a.outport) {
                var g, f = a.outport.coord.split(","),
                h = "";
                2 === f.length && (g = b(f[0], f[1]), h = g.x + "," + g.y),
                e.outport = {
                    name: a.outport.name,
                    coord: h
                }
            }
            m.busPathSection.push(e)
        }),
        m
    };
    $.extend(amap, {
        favdir: {
            addBus: c
        }
    })
}(),
!
function () {
    var a = {
        addDirve: function (a, b, c) {
            this.idx = a.idx,
            a = a.data,
            this.data = a;
            var d = a.frominfo,
            e = this.getModXY(d.lnglat),
            f = this.toPixelXY(e.x, e.y),
            g = a.toinfo,
            h = this.getModXY(g.lnglat),
            i = this.toPixelXY(h.x, h.y),
            j = amap.dir.via,
            k = (a.sortType, this.idx, a.path_list[b]),
            l = k.distance,
            m = k.strategy,
            n = k.drivetime,
            o = this.md5fav(f.x, f.y, i.x, i.y, "1", l),
            p = "",
            q = {
                type: "1",
                version: "1.0",
                id: o,
                route_type: "1",
                method: m,
                from_poi: {
                    mCityCode: d.adcode || 1e5,
                    mCityName: amapcity.getname(d.adcode) || "",
                    mId: d.id || d.pguid || "startMarkerID",
                    mAddr: d.address ? d.address : "鏆傛棤",
                    mName: d.name,
                    mx: f.x,
                    my: f.y
                },
                to_poi: {
                    mCityCode: g.adcode || 1e5,
                    mCityName: amapcity.getname(g.adcode) || "",
                    mId: g.id || g.pguid || "endMarkerID",
                    mAddr: g.address ? g.address : "鏆傛棤",
                    mName: g.name,
                    mx: i.x,
                    my: i.y
                },
                strategy: m,
                start_x: f.x,
                start_y: f.y,
                end_x: i.x,
                end_y: i.y,
                has_mid_poi: j.length ? !0 : !1,
                create_time: Math.floor((new Date).getTime() / 1e3),
                route_len: l,
                mCostTime: n
            };
            if (j.length) {
                for (var r = [], s = 0; s < j.length; s++) {
                    var t = j[s];
                    p += "閫旂粡" + t.name;
                    var u = this.getModXY(t.lnglat);
                    curDrive_xy = this.toPixelXY(u.x, u.y),
                    r.push({
                        mId: t.id,
                        mName: t.name,
                        mAddr: t.address ? t.address : "鏆傛棤",
                        mCityCode: t.adcode || PCMAP.city.adcode,
                        mCityName: t.name,
                        mx: curDrive_xy.x,
                        my: curDrive_xy.y
                    })
                }
                p = "浠�" + d.name + p + "鍒�" + g.name,
                q.mid_pois = r,
                q.route_name = p
            }
            return q
        },
        toLngLat: function (a, b) {
            var c = /^[-]*\d+$/;
            if (c.test(a) && c.test(b)) {
                var d = this._vep.PixelsToLatLong(a, b, 20);
                return new AMap.LngLat(d.lo, d.la)
            }
            return new AMap.LngLat(a, b)
        },
        toPixelXY: function (a, b) {
            var c = /^[-]*\d+$/;
            return c.test(a) && c.test(b) ? {
                x: a,
                y: b
            } : this._vep.LatLongToPixels(b, a, 20)
        },
        _vep: new amap.favapi.VirtualEarthProjection,
        getModXY: function (a) {
            var b = a.split(",");
            return {
                x: b[0] || "",
                y: b[1] || ""
            }
        },
        md5fav: function () {
            var a = _.rest(arguments, 0).join("+");
            return CryptoJS.MD5(a).toString(CryptoJS.enc.Hex)
        }
    };
    amap.favCarObj = a
}(),
!
function () {
    var a = {
        addWalk: function (a, b) {
            a = a.data,
            this.data = a,
            this.start = a.frominfo;
            var c = this.getModXY(this.start.lnglat);
            this.start.x = c.x,
            this.start.y = c.y,
            this.end = a.toinfo;
            var d = this.getModXY(this.end.lnglat);
            return this.end.x = d.x,
            this.end.y = d.y,
            this.initNavigtionActionData(),
            this.validate = this._favofiteValidate(a),
            this.validate || (this.validate = this._drivingValidate(a, a.frominfo, a.toinfo)),
            this.produceFavoriteData()
        },
        getModXY: function (a) {
            var b = a.split(",");
            return {
                x: b[0] || "",
                y: b[1] || ""
            }
        },
        getValidateStatus: function () {
            return this.validate ? !0 : !1
        },
        _favofiteValidate: function (a) {
            return _.isString(a.id) && 32 == a.id.length ? (this.favorite = a, !0) : !1
        },
        _favofiteChange: function (a) {
            for (var b = this,
            c = a.data,
            d = a.start,
            e = a.end,
            f = b.toPixelXY(d.x, d.y), g = b.toPixelXY(e.x, e.y), h = c.routes[0].distanceNum, i = "", j = {
                route_name: "浠� " + d.name + " 鍒� " + e.name,
                start_x: f.x + "",
                start_y: f.y + "",
                end_x: g.x + "",
                end_y: g.y + "",
                method: "0",
                type: "1",
                route_type: "3",
                version: "1.0",
                mDataLength: "-1",
                mSectionNum: c.routes[0].steps.length + "",
                from_poi: {
                mCityCode: d.adcode || 1e5,
                mCityName: amapcity.getname(d.adcode) || "",
                mId: "startMarkerID",
                mAddr: d.address ? d.address : "鏆傛棤",
                mName: d.name,
                mx: f.x + "",
                my: f.y + ""
            },
                to_poi: {
                mCityCode: e.adcode || 1e5,
                mCityName: amapcity.getname(e.adcode) || "",
                mId: "endMarkerID",
                mAddr: e.address ? e.address : "鏆傛棤",
                mName: e.name,
                mx: g.x + "",
                my: g.y + ""
            },
                navigationSection: []
            },
            k = 0; k < c.routes[0].steps.length; k++) {
                var l, m = c.routes[0].steps[k],
                n = [],
                o = this.getNavigtionActionNumber(m.action);
                l = m.road,
                ("鏃犲悕閬撹矾" === l || "鏈煡閬撹矾" === l) && (l = "null");
                for (var p = m.path,
                q = 0; q < p.length; q++) {
                    var r = p[q],
                    s = b.toPixelXY(r.lng, r.lat);
                    n.push({
                        x: s.x + "",
                        y: s.y + ""
                    })
                }
                var t = {
                    mNavigtionAction: o + "",
                    mDataLength: "-1",
                    mStreetName: l + "",
                    mPathlength: m.distance + "",
                    mPointNum: n.length + "",
                    points: n
                };
                j.navigationSection.push(t)
            }
            return i = b.md5fav(f.x, f.y, g.x, g.y, "1", h),
            j.id = j.item_id = i,
            j.route_len = j.mPathlength = h + "",
            this.favorite = j,
            j
        },
        produceFavoriteData: function () {
            return this._favofiteChange(this.driving)
        },
        _drivingValidate: function (a, b, c, d) {
            var e = !0;
            return (!a.routes || a.routes.length < 1) && (e = !1),
            d || (d = 0),
            e && (this.driving = {
                data: a,
                start: b,
                end: c,
                routeType: d
            }),
            e
        },
        _drivingChange: function (a) {
            var b = a.from_poi,
            c = a.to_poi,
            d = AF.Favorite.toLngLat(a.start_x, a.start_y),
            e = AF.Favorite.toLngLat(a.end_x, a.end_y),
            f = b.mAddr;
            f && "null" !== f || (f = "");
            var g = c.mAddr;
            g && "null" !== g || (g = "");
            for (var h = {
                start: {
                id: b.mId,
                name: b.mName,
                citycode: b.mCityCode,
                address: f,
                y: d.lat,
                x: d.lng
            },
                end: {
                id: c.mId,
                name: c.mName,
                citycode: c.mCityCode,
                address: g,
                y: e.lat,
                x: e.lng
            },
                data: {
                favorite: "favorite"
            }
            },
            i = [], j = a.navigationSection, k = 0; k < j.length; k++) {
                var l = j[k],
                m = l.mStreetName,
                n = l.mPathlength,
                o = "",
                p = this.getNavigtionActionDescribe(l.mNavigtionAction);
                m && "null" !== m && "" !== m || (m = "鏈煡閬撹矾");
                for (var q = 0; q < l.points.length; q++) {
                    var r = l.points[q],
                    s = AF.Favorite.toLngLat(r.x, r.y);
                    o += s.lng + "," + s.lat,
                    q < l.points.length - 1 && (o += ";")
                }
                var t = {
                    locationCode: "",
                    form: "",
                    coor: o,
                    direction: "",
                    roadLength: n + "绫�",
                    action: p,
                    grade: "",
                    textInfo: "",
                    accessorialInfo: "",
                    roadName: m,
                    driveTime: ""
                };
                i.push(t)
            }
            return h.data.list = i,
            this.driving = h
        },
        produceDrivingData: function () {
            return this.validate && !this.driving && this._drivingChange(this.favorite),
            this.driving
        },
        NavigtionActionData: {
            0: "",
            1: "宸﹁浆",
            2: "鍙宠浆",
            3: "鍚戝乏鍓嶆柟琛岃蛋",
            4: "鍚戝彸鍓嶆柟琛岃蛋",
            5: "鍚戝乏鍚庢柟琛岃蛋",
            6: "鍚戝彸鍚庢柟琛岃蛋",
            8: "鐩磋",
            9: "闈犲乏",
            10: "闈犲彸",
            15: "閫氳繃浜鸿妯亾",
            16: "閫氳繃澶╂ˉ",
            17: "閫氳繃鍦颁笅閫氶亾",
            18: "閫氳繃骞垮満",
            19: ""
        },
        initNavigtionActionData: function () {
            var a = [],
            b = [];
            for (var c in this.NavigtionActionData) {
                var d = this.NavigtionActionData[c];
                a[c] = d,
                d && (b[d] = c)
            }
            this.navigtionActionNumber = a,
            this.navigtionActionDescribe = b
        },
        getNavigtionActionNumber: function (a) {
            return this.navigtionActionDescribe[a] || "9"
        },
        getNavigtionActionDescribe: function (a) {
            return this.navigtionActionNumber[a] || ""
        },
        toLngLat: function (a, b) {
            var c = /^[-]*\d+$/;
            if (c.test(a) && c.test(b)) {
                var d = this._vep.PixelsToLatLong(a, b, 20);
                return new AMap.LngLat(d.lo, d.la)
            }
            return new AMap.LngLat(a, b)
        },
        toPixelXY: function (a, b) {
            var c = /^[-]*\d+$/;
            return c.test(a) && c.test(b) ? {
                x: a,
                y: b
            } : this._vep.LatLongToPixels(b, a, 20)
        },
        _vep: new amap.favapi.VirtualEarthProjection,
        md5fav: function () {
            var a = _.rest(arguments, 0).join("+");
            return CryptoJS.MD5(a).toString(CryptoJS.enc.Hex)
        },
        getWalkData: function (a, b) {
            var c = this;
            c.initNavigtionActionData();
            var d = require("js/module/favorite/favorite.service");
            d.loadRouteData(a, "walk",
            function (a) {
                a = a.data;
                var d = c.toLngLat(a.start_x, a.start_y);
                a.saddrinfo = {
                    lnglat: d,
                    id: "marker-plan-walk-from-" + (new Date).getTime(),
                    name: a.from_poi.mName,
                    x: d.getLng(),
                    y: d.getLat()
                };
                var e = c.toLngLat(a.end_x, a.end_y);
                a.daddrinfo = {
                    lnglat: e,
                    id: "marker-plan-walk-to-" + (new Date).getTime(),
                    name: a.to_poi.mName,
                    x: e.getLng(),
                    y: e.getLat()
                },
                a.routes = [],
                a.routes[0] = {},
                a.routes[0].steps = a.navigationSection;
                for (var f = a.routes[0].steps.length - 1; f >= 0; f--) {
                    var g = a.routes[0].steps[f];
                    g.path = [];
                    for (var h = 0; h < g.points.length; h++) g.path.push(c.toLngLat(g.points[h].x, g.points[h].y));
                    g.signs = c.formatAction(c.getNavigtionActionDescribe(g.mNavigtionAction)),
                    g.action = c.getNavigtionActionDescribe(g.mNavigtionAction),
                    g.road = g.mStreetName,
                    g.distance = g.mPathlength,
                    g.start_location = g.path[0],
                    g.polyType = "poly-walk"
                }
                a.routes[0].distance = c.formatDistance(a.route_len),
                a.routes[0].distanceNum = a.route_len,
                a.dirflgType = "walk",
                a.dirflg = "w",
                a.sortType = 0,
                a.status = "E0",
                b && b(a)
            })
        },
        formatDirection: function (a) {
            var b = "default";
            switch (a) {
                case "鍖�":
                    b = "north";
                    break;
                case "瑗垮寳":
                    b = "northwest";
                    break;
                case "瑗�":
                    b = "west";
                    break;
                case "瑗垮崡":
                    b = "southwest";
                    break;
                case "鍗�":
                    b = "south";
                    break;
                case "涓滃寳":
                    b = "northeast";
                    break;
                case "涓�":
                    b = "east";
                    break;
                case "涓滃崡":
                    b = "southeast";
                    break;
                default:
                    a = ""
            }
            return b
        },
        formatAction: function (a) {
            var b = "advance";
            switch (a) {
                case "宸﹁浆":
                    b = "left";
                    break;
                case "鍙宠浆":
                    b = "right";
                    break;
                case "闈犲乏":
                    b = "keepleft";
                    break;
                case "鍚戝乏鍓嶆柟琛岃蛋":
                case "鍚戝乏鍚庢柟琛岃蛋":
                    b = "leftdown";
                    break;
                case "闈犲彸":
                    b = "keepright";
                    break;
                case "鍚戝彸鍚庢柟琛岃蛋":
                case "鍚戝彸鍓嶆柟琛岃蛋":
                    b = "rightdown";
                    break;
                case "宸﹁浆璋冨ご":
                    b = "back";
                    break;
                case "鐩磋":
                case "寰€鍓嶈蛋":
                    b = "advance";
                    break;
                case "閫氳繃澶╂ˉ":
                    b = "footbridge";
                    break;
                case "閫氳繃鍦颁笅閫氶亾":
                    b = "underpass";
                    break;
                case "閫氳繃浜鸿妯亾":
                    b = "zebra";
                    break;
                case "閫氳繃骞垮満":
                    b = "square"
            }
            return b
        },
        formatDistance: function (a) {
            return 1e3 >= a ? a + "绫�" : Math.round(a / 100) / 10 + "鍏噷"
        },
        formatTime: function (a) {
            if (!a) return "";
            if (a = Math.round(a / 60), 60 >= a) return a + "鍒嗛挓";
            var b = Math.round(a / 60) + "灏忔椂";
            return a % 60 !== 0 && (b += a % 60 + "鍒嗛挓"),
            b
        }
    };
    amap.favWalkObj = a
}(),
!
function () {
    function a() {
        tpl.tplLoad({
            filename: "fav.logout",
            data: {
                origin: location.origin
            },
            callback: function (a) {
                b.html(a)
            }
        })
    }
    var b = $("#faves-panel"),
    c = function () {
        var a = qs.parse(location.search);
        a.pagenum = $(this).attr("pageno") || 1,
        amap.fwd("/faves?" + $.param(a))
    },
    d = function () {
        amap.favesStore.updateFavesStoreStatue && amap.favesStore.updateFavesStoreStatue()
    };
    b.on("click", ".serp-paging .paging-index", c),
    b.on("click", ".serp-paging .paging-prev", c),
    b.on("click", ".serp-paging .paging-next", c),
    b.on("click", ".favdel",
    function (a) {
        var b = confirm("纭鍒犻櫎璇ユ敹钘�?");
        if (b) {
            var c = $(this).closest("li").attr("id");
            $.get(amap.service.delFavNew + $.param({
                id: c
            }),
            function (a) {
                amap.favesStore.del(c),
                amap.favesStore.update()
            })
        }
        return amap.cancelBubble(a)
    }),
    b.on("click", ".favedit",
    function (a) {
        var b = $(this),
        c = b.closest(".favitem"),
        d = c.find(".favdesc").text() || "";
        d && (d = d.slice(3));
        var e = prompt("淇敼澶囨敞:", d || "");
        if (null !== e) {
            var f = c.attr("id");
            if (!b.hasClass("faved")) {
                b.addClass("faved");
                var g = {};
                return g.tag = e,
                g.id = f,
                amap.favapi.editpoi(g,
                function (a) {
                    amap.favesStore.edit(f, e),
                    amap.favesStore.update()
                }),
                amap.cancelBubble(a)
            }
        }
    }),
    $(document).on("click", ".favit",
    function (a) {
        if (!amap.userinfo) return toastr.warning("璇风櫥褰曞悗鍐嶆敹钘忥紒"),
        void amap.fwd("/faves");
        var b = amap.iwdata,
        c = $(this);
        c.closest(".poibox"),
        b.id;
        if (!c.hasClass("faved")) {
            c.addClass("faved");
            var d = b.pos || b.location,
            e = new AMap.LngLat(d.lng, d.lat),
            f = b.name,
            g = b.address,
            h = {
                location: e,
                name: f,
                address: g
            };
            amap.favapi.favpoi(h,
            function (a) {
                amap.favesStore.add(a),
                amap.favesStore.update()
            })
        }
    }),
    $(document).on("click", ".favline",
    function (a) {
        if (!amap.userinfo) return toastr.warning("璇风櫥褰曞悗鍐嶆敹钘忥紒"),
        void amap.fwd("/faves");
        var b = $(this),
        c = b.closest(".poibox"),
        e = c.attr("id");
        if (!b.hasClass("faved")) {
            b.addClass("faved");
            var f = amap.serp.busdata[e],
            g = _.clone(f[1].list[0]);
            g.via_stops = _.clone(f[0].list),
            amap.favapi.favline(g),
            d(),
            amap.cancelBubble(a)
        }
    }),
    $(document).on("click", ".favitem",
    function () {
        var a = $(this),
        b = a.attr("id");
        amap.favState.poiid = b
    }),
    $(document).on("click", ".favdir",
    function (a) {
        if (!amap.userinfo) return toastr.warning("璇风櫥褰曞悗鍐嶆敹钘忥紒"),
        void amap.fwd("/faves");
        var b = this;
        if ($(this).hasClass("favdired")) {
            var c = $(this).attr("favID");
            return void (confirm("纭鍒犻櫎娆℃敹钘�") && $.get(amap.service.delFav + $.param({
                id: c
            }),
            function (a) {
                "1" === a.status ? (toastr.success("鍙栨秷鏀惰棌鎴愬姛锛�"), d(), $(b).removeClass("favdired")) : toastr.warning("澶辫触鍟 璇烽噸鏂版搷浣滀竴娆★紒")
            }))
        }
        var e = _.clone(amap.dir),
        f = _.clone(amap.dirp);
        "鎴戠殑浣嶇疆" == e.from.name && (f.frominfo.name = poiModel.localName),
        "鎴戠殑浣嶇疆" == e.to.name && (f.toinfo.name = poiModel.localName);
        var g = {},
        h = parseInt($(this).parents(".planTitle").attr("index"));
        $(this).hasClass("mark-bus") ? g = amap.favdir.addBus(f, h) : ($(this).hasClass("mark-car") || $(this).hasClass("mark-walk")) && (g = amap.favCarObj.addDirve({
            idx: 0,
            data: f
        },
        h)),
        $.ajax({
            type: "POST",
            url: amap.service.addFavNew,
            data: {
                data: [{
                    id: g.item_id || g.id,
                    data: g,
                    ac: 1
                }]
            },
            success: function (a) {
                if ("1" == a.status) {
                    var c = g.item_id || g.id;
                    $(b).attr("favID", c),
                    toastr.success("鏀惰棌鎴愬姛锛�"),
                    $(b).addClass("favdired"),
                    amap.favesStore.add(a.data[0]),
                    amap.favesStore.update()
                } else toastr.warning("澶辫触鍟 璇烽噸鏂版搷浣滀竴娆★紒")
            },
            cache: !1
        }),
        amap.cancelBubble(a)
    }),
    watch(amap, "userinfo",
    function () {
        amap.userinfo ? amap.state === amap.FAVES && _.delay(function () {
            amap.favesStore.show(1)
        },
        500) : a()
    }),
    watch(amap, "faves",
    function () {
        var a = $.trim(amap.favesp);
        if ($("#favesbox").length) a ? ($box = $("#favesbox"), $box.hide().html(a).show(), amap.slimscroll($box)) : tpl.tplLoad({
            filename: "fav.empty",
            data: {},
            callback: function (a) {
                b.html($(a))
            }
        });
        else {
            var c = "" === a ? "fav.empty" : "fav.login";
            tpl.tplLoad({
                filename: c,
                data: {
                    html: a
                },
                callback: function (c) {
                    if (a) {
                        b.html($(c));
                        var d = $("#favesbox");
                        d.hide().html(a).show(),
                        amap.slimscroll(d)
                    } else b.html($(c))
                }
            })
        }
    })
}(),
!
function () {
    function a(a, b) {
        $("#amap-links").hide(),
        b()
    }
    function b(a, b) {
        $("#amap-panels").children().hide(),
        a.query = qs.parse(a.querystring),
        "/search/busline" == a.params[0] && (a.curStatus = "busline"),
        b()
    }
    function c(a, b) {
        var c = a.query;
        if (_.isEmpty(c.query)) return console.warn("amap.fwd /around"),
        void amap.redirect("/around");
        if ("RQBXY" !== c.query_type && "IDQ" !== c.query_type && "100000" != amap.adcode && (c.query_type = "TQUERY", _.isEmpty(c.geoobj))) {
            var d = themap.getBounds(),
            e = [d.southwest.lng, d.southwest.lat, d.northeast.lng, d.northeast.lat].join("|");
            return c.geoobj = e,
            void amap.redirect("/search?" + $.param(c))
        }
        "RQBXY" === c.query_type && (c.range = c.range || 1e3),
        "IDQ" === c.query_type,
        _.isEmpty(c.city) && (c.city = amap.adcode || themap.getAdcode && themap.getAdcode() || "110000"),
        b()
    }
    function d(a, b) {
        amap.state = amap.SEARCH,
        g(a.query, a)
    }
    function e(a, b) {
        amap.markerState.active.poiid = !1,
        amap.markerState.active.hover = !1,
        amap.madian = !1,
        amap.search = "exit",
        b()
    }
    function f() {
        return '<input type="hidden" value=' + Date.now() + Math.random() + " />"
    }
    function g(a, b) {
        var c = "busline" == b.curStatus ? amap.service.poiBus : amap.service.poiInfo;
        if ("start" == amap.search) return !1;
        amap.keyword = a.query;
        var d = {
            query_type: "TQUERY",
            city: a.city || a.adcode || "110000",
            keywords: a.query,
            pagesize: 20,
            pagenum: 1,
            qii: !0,
            cluster_state: 5,
            need_utd: !0,
            utd_sceneid: a.utd_sceneid || 1e3,
            div: "PC1000",
            addr_poi_merge: !0,
            is_classify: !0
        },
        e = $.extend(d, a);
        delete e.query,
        b.state.data ? (amap.search = "start", amap.madian = !1, setTimeout(function () {
            var a = b.state.data;
            return amap.serp.html = a.html + f(),
            amap.serp.data = a.data,
            amap.serp.classify = a.classifyFlag,
            a.classifyFlag && (amap.classify.value = f()),
            _.isEmpty(a.routing) ? (a.busData && (amap.serp.busdata = a.busData), a.classifyFlag && (amap.madian = e.keywords), void (amap.search = "end")) : void (amap.searchrouting = a.routing)
        },
        60)) : (amap.search = "start", amap.madian = !1, amap.get(c + $.param(e),
        function (a) {
            if (amap.search = "end", "1" == a.status) {
                if (a.classifyFlag && (amap.classify.value = f()), !_.isEmpty(a.routing)) return void (amap.searchrouting = a.routing);
                amap.serp.html = a.html + f(),
                amap.serp.data = a.data,
                amap.serp.classify = a.classifyFlag,
                a.busData && (amap.serp.busdata = a.busData),
                a.classifyFlag && (amap.madian = e.keywords),
                a.classifyFlag && (amap.classify.value = new Date),
                b.state.data = a,
                b.save()
            } else "7" == a.status ? (window.open(amap.service.verify + encodeURIComponent(location.href) + "&channel=newpc&uuid=" + encodeURIComponent(a.uuid) + "&url=" + encodeURIComponent(a.url)), amap.search = "end") : (toastr.warning("鎼滅储鏈嶅姟鏃犲搷搴旓紝璇风◢鍚庨噸璇曘€�"), console.error(a), amap.redirect("/"))
        }))
    }
    page("/search", a, b, c, d),
    page("/search/busline", a, b, c, d),
    page.exit("/search", e),
    page.exit("/search/busline", e)
}(),
!
function () {
    var a = $("#searchipt"),
    b = $(".iptbox"),
    c = function (a, b) {
        var c = ($.trim(a), b || amap.adcode || "110000");
        "" !== a && "start" !== amap.search && amap.fwd("/search?" + $.param({
            query: a,
            city: c
        }))
    };
    a.on("focus",
    function () {
        var a = $(this);
        a.addClass("active"),
        b.addClass("active"),
        "" !== a.val() && b.addClass("del")
    }),
    a.on("blur",
    function () {
        var a = $(this);
        "" == a.val() && (a.removeClass("active"), b.removeClass("active"))
    }),
    $("#searchbtn").click(function () {
        var a = $.trim($("#searchipt").val());
        c(a)
    }),
    $("#searchipt").keyup(function (b) {
        var d = b.keyCode,
        e = $.trim($(b.target).val()),
        f = $(".iptbox");
        if (0 == e.length ? $(f).removeClass("del") : $(f).addClass("del"), 13 == d && "" !== e && "searchipt" == document.activeElement.id) {
            var g = $(".theonlysug").find(".autocomplete-selected .district").attr("adcode");
            c(e, g)
        }
        13 == d && "" == e && a.blur(),
        27 == d && "" == e && a.blur()
    }),
    $(document).on("click keyup", ".theonlysug .autocomplete-suggestion",
    function () {
        var a = $(this).clone(),
        b = a.find(".district").attr("adcode") || "110000";
        a.find(".district").remove();
        var d = a.text();
        c(d, b)
    }),
    $(".iptbox em").click(function () {
        $(this).parent().hasClass("del") && ($("#searchipt").val(""), $(this).parent().removeClass("del"), $("#searchipt").focus())
    });
    var d = $("#searchipt").autocomplete({
        appendTo: $(".searchbox"),
        serviceUrl: amap.service.poiTips,
        paramName: "words",
        params: {
            city: amap.adcode || "110000"
        },
        dataType: "json",
        minWidth: 266,
        maxHeight: 350,
        zIndex: 2199,
        containerClass: "theonlysug main-sug autocomplete-suggestions",
        transformResult: function (a) {
            var b = {
                suggestions: []
            };
            if ("1" != a.status) return b;
            for (var c = a.data && a.data.tip_list || [], d = 0; d < c.length; d++) b.suggestions.push({
                value: c[d].tip.name,
                data: c[d].tip.name,
                district: c[d].tip.district,
                adcode: c[d].tip.adcode
            });
            return b
        }
    });
    watch(amap, "adcode",
    function () {
        d.autocomplete("setOptions", {
            params: {
                city: amap.adcode || "110000"
            }
        })
    }),
    watch(amap, "search",
    function () {
        var c = $("#searchloading"),
        d = ($("#amap-links"), $(".iptbox em")),
        e = $(".amap-panctrl-up"),
        f = $(".amap-panctrl-down"),
        g = amap.thebox;
        switch (amap.search) {
            case "start":
                c.show(),
                g.hide(),
                d.hide(),
                a.addClass("active"),
                b.addClass("active"),
                a.val(amap.keyword),
                $(".main-sug").hide(),
                $("#amap-banner-entry").hide();
                break;
            case "end":
                c.fadeOut(100),
                g.fadeInDownBig(),
                d.fadeIn("slow"),
                $(".main-sug").hide(),
                amap.fullscreen = !0,
                e.show(),
                f.hide();
                break;
            case "exit":
                a.val(""),
                a.blur(),
                a.removeClass("active"),
                b.removeClass("active"),
                d.hide(),
                $("#amap-banner-entry").show();
                break;
            default:
                console.info(amap.search)
        }
    })
}(),
!
function () {
    function a(a) {
        a.preventDefault(),
        a.stopPropagation()
    }
    function b() {
        amap.classify.area = $(".cl-area").attr("data-val") || void 0,
        c("area", amap.classify.area),
        amap.classify.type = $(".cl-type").attr("data-val") || void 0,
        c("type", amap.classify.type),
        amap.classify.type2 = $(".cl-type2").attr("data-val") || void 0,
        c("type2", amap.classify.type2),
        amap.classify.sort = $(".cl-sort").attr("data-val") || void 0,
        c("sort", amap.classify.sort),
        amap.classify.more = $(".cl-more").attr("data-val") || void 0,
        c("more", amap.classify.more)
    }
    function c(a, b) {
        if (b) switch (a) {
            case "area":
                var c = $(".classify-area li[data-val='" + b + "']");
                c.addClass("area-level2-select");
                var d = c.parent().attr("d-ind");
                $(".classify-area-level1 li[id=cl-" + d + "]").addClass("area-level1-select");
                var e = c.html();
                "鍏ㄩ儴" == e && (e = $(".classify-area-level1 li[id=cl-" + d + "] .cl-area-name").html()),
                $(".cl-" + a + " span").html(e),
                $(".classify-area-level2").attr("cl_num", d),
                $(".classify-area-level2").html(c.parent().html()),
                $(".classify-area").find(".cl-level2-" + d).remove();
                break;
            case "type":
                var c = $(".classify-type li[data-val='" + b + "']");
                c.addClass("type-select");
                var e = c.html();
                "鍏ㄩ儴" == e && (e = c.parent().parent().prev().html()),
                $(".cl-" + a + " span").html(e);
                break;
            case "type2":
                var c = $(".classify-type2 li[data-val='" + b + "']");
                c.addClass("type2-select");
                var e = c.html();
                $(".cl-" + a + " span").html(e);
                break;
            case "sort":
                var c = $(".classify-sort li[data-val='" + b + "']");
                c.addClass("sort-select");
                var e = c.html();
                $(".cl-" + a + " span").html(e);
                break;
            case "more":
                var f = b.split(";"),
                g = [];
                _.each(f,
                function (a) {
                    var b = $(".classify-more li[data-val='" + a + "']");
                    b.addClass("more-select"),
                    b.find(".cl-more-circle").addClass("circle-select"),
                    g.push(b.find(".cl-more-name").text())
                }),
                $(".cl-" + a + " span").html(g.join(";"))
        }
    }
    function d(a) {
        var b = $(".classify .cl-" + a).hasClass("cl-selected");
        b ? ($(".classify .cl-head").css({
            "border-radius": "4px"
        }), $(".classify .cl-" + a).removeClass("cl-selected"), $(".classify-" + a).slideUp("fast"), $(".classify .cl-" + a + " i").removeClass("fa-caret-up").addClass("fa-caret-down")) : ($(".classify .cl-head").css({
            "border-radius": "4px 4px 0px 0px"
        }), $(".classify >div").hide(), $(".classify em").removeClass("cl-selected"), $(".classify .cl-" + a).addClass("cl-selected"), ("type2" == a || "sort" == a || "more" == a) && $(".cl-" + a).css({
            "border-bottom": "1px solid #e0e0e0"
        }), $(".classify-" + a).slideDown("fast"), $(".classify-" + a).css({
            display: "flex"
        }), $(".classify i").removeClass("fa-caret-up").addClass("fa-caret-down"), $(".classify .cl-" + a + " i").removeClass("fa-caret-down").addClass("fa-caret-up"))
    }
    function e(a, b) {
        $(".classify .cl-head .cl-" + a).attr("data-val", b);
        var c = $(".classify .cl-area").attr("data-val"),
        a = $(".classify .cl-type").attr("data-val"),
        d = $(".classify .cl-type2").attr("data-val"),
        e = $(".classify .cl-sort").attr("data-val"),
        f = $(".classify .cl-more").attr("data-val"),
        g = [];
        c && g.push(c),
        a && g.push(a),
        d && g.push(d),
        e && g.push(e),
        f && g.push(f);
        var h = g.join("+"),
        i = qs.parse(location.search);
        i.classify_data = h;
        var j = themap.getSize(),
        k = themap.containerToLngLat(new AMap.Pixel((j.width + 515) / 2, j.height / 2));
        i.user_loc = k.lng + "," + k.lat,
        i.pagenum = 1,
        amap.fwd("/search?" + $.param(i))
    }
    var f = $("#search-panel"),
    g = ($("#serp-list"), "#serp");
    f.on("click", ".serp-return",
    function (a) {
        amap.fwd("/around")
    }),
    f.on("click", ".poibox-normal",
    function () {
        amap.markerState.active.poiid = this.id
    }),
    f.on("mouseenter", ".poibox-normal",
    function () {
        amap.markerState.hover.poiid = this.id
    }),
    f.on("mouseleave", ".poibox-normal",
    function () {
        amap.markerState.hover.poiid = void 0
    }),
    f.on("mouseenter", ".rel-sons span",
    function (a) {
        amap.markerState.hover.poiid = this.id
    }),
    f.on("mouseleave", ".rel-sons span",
    function (a) {
        amap.markerState.hover.poiid = void 0
    }),
    f.on("click", ".rel-sons span",
    function (b) {
        amap.markerState.active.poiid = this.id,
        a(b)
    });
    var h = function () {
        var a = qs.parse(location.search);
        a.pagenum = $(this).attr("pageno") || 1,
        amap.fwd(window.location.pathname + "?" + $.param(a))
    };
    f.on("click", ".serp-paging .paging-index", h),
    f.on("click", ".serp-paging .paging-prev", h),
    f.on("click", ".serp-paging .paging-next", h),
    f.on("click", ".poi-focuscase .focuscase-more",
    function () {
        var a = qs.parse(location.search);
        a.rf = 0,
        amap.fwd("/search?" + $.param(a))
    }),
    f.on("click", ".poi-focuscase .focuscase-busline-more",
    function () {
        var a = qs.parse(location.search);
        amap.fwd("/search/busline?" + $.param(a))
    }),
    f.on("click", ".showstops",
    function (a) {
        var b = $(this);
        b.toggleClass("opening"),
        b.closest(".poi-lines").find(".via-stops").toggleClass("opening")
    }),
    f.on("click", ".poibox-transport",
    function () {
        console.log("setid", this.id),
        amap.lineState.active.lineid = this.id
    }),
    f.on("click", ".poi-dirctrl .doublearrow",
    function (b) {
        var c = $(this),
        d = c.closest(".poibox-transport"),
        e = c.closest(".poi-dirctrl"),
        f = c.closest(".poi-info").find(".poi-lines"),
        g = e.find(".dir-from"),
        h = e.find(".dir-to"),
        i = f.find(".line-info:hidden"),
        j = f.find(".shown"),
        k = i.attr("from_name") || "鏈煡璧风偣绔�",
        l = i.attr("terminal_name") || "鏈煡缁堢偣绔�";
        g.text(k),
        h.text(l),
        i.addClass("shown"),
        j.removeClass("shown");
        var m = d.attr("id"),
        n = d.attr("aid"),
        o = d.attr("bid");
        m === n ? d.attr("id", o) : d.attr("id", n),
        amap.lineState.active.lineid = d.attr("id"),
        a(b)
    }),
    f.on("click", ".poibox-transport .via-stops span",
    function (a) {
        a.stopPropagation(),
        a.preventDefault();
        var b = $(this),
        c = b.attr("poiid");
        c && (amap.markerState.active.poiid = c)
    }),
    f.on("click", ".filter-ctrl span",
    function (a) {
        var b = "active",
        c = (this.className, $(".serp-filter")),
        d = $(this),
        e = c.find("." + d.attr("data-target") + "-ctnt"),
        f = c.find(".filter-ctrl > span"),
        g = c.find(".filter-box").children();
        d.hasClass(b) ? (d.removeClass(b), e.removeClass(b)) : (f.removeClass(b), g.removeClass(b), d.addClass(b), e.addClass(b))
    }),
    f.on("click", ".classify .cl-area",
    function () {
        d("area")
    }),
    f.on("click", ".classify-area-level2 li",
    function () {
        e("area", $(this).attr("data-val"))
    }),
    f.on("click", ".classify .cl-type",
    function () {
        d("type")
    }),
    f.on("click", ".classify-type ul li",
    function () {
        e("type", $(this).attr("data-val"))
    }),
    f.on("click", ".classify .cl-type2",
    function () {
        d("type2")
    }),
    f.on("click", ".classify-type2-type li",
    function () {
        e("type2", $(this).attr("data-val"))
    }),
    f.on("click", ".classify .cl-sort",
    function () {
        d("sort")
    }),
    f.on("click", ".classify-sort-type li",
    function () {
        e("sort", $(this).attr("data-val"))
    }),
    f.on("click", ".classify .cl-more",
    function () {
        d("more")
    }),
    f.on("click", ".classify-more-type .cl-mf",
    function () {
        var a = $(this).hasClass("more-select");
        a ? ($(this).removeClass("more-select"), $(this).find(".cl-more-circle").removeClass("circle-select")) : ($(this).addClass("more-select"), $(this).find(".cl-more-circle").addClass("circle-select"))
    }),
    f.on("click", ".classify-more-type .cl-more-submit",
    function () {
        var a = [];
        $(".classify-more-type .more-select").each(function (b, c) {
            a.push($(".classify-more-type .more-select").eq(b).attr("data-val"))
        });
        var b = a.join(";");
        e("more", b)
    }),
    f.on("click", ".poibtn-srharound",
    function (b) {
        $(this).closest(".poibox").find(".poi-srharound").show(),
        a(b)
    }),
    f.on("click", ".srharound-srhcancel",
    function (b) {
        $(this).closest(".poibox").find(".poi-srharound").hide(),
        a(b)
    }),
    f.on("click", ".srharound-srhbtn",
    function (a) {
        var b = $.trim($(this).prev().val()),
        c = amap.iwdata.pos;
        "" != b && (apicache.nearbyKeyword = b, amap.fwd("/search?" + $.param({
            query: b,
            query_type: "RQBXY",
            longitude: c.lng,
            latitude: c.lat
        })))
    }),
    f.on("keyup", ".srharound-ipt",
    function (a) {
        var b = a.keyCode,
        c = $(this).val();
        13 == b && "" !== c && "srharound-ipt" == document.activeElement.className && $(this).next(".srharound-srhbtn").trigger("click")
    }),
    f.on("click", ".poibtn-planto, .poibtn-planfrom",
    function (a) {
        var b = amap.iwdata,
        c = b.name,
        d = b.id,
        e = [b.pos.lng, b.pos.lat].join(),
        f = amap.adcode,
        g = {
            name: c,
            lnglat: e,
            id: d,
            adcode: f,
            modxy: void 0
        },
        h = $(this).hasClass("poibtn-planto"),
        i = {
            type: amap.dir.type || "car"
        };
        h ? (i.from = amap.dir.from, i.to = g) : (i.from = g, i.to = amap.dir.to),
        _.delay(function () {
            amap.fwd("/dir/?" + $.param(i))
        },
        0)
    }),
    f.on("click", ".poi-empty .sug-provinces .province-name",
    function (a) {
        var b = $(this),
        c = b.closest(".sug-province");
        c.hasClass("active") ? c.removeClass("active") : (b.closest(".sug-provinces").find(".active").removeClass("active"), c.addClass("active"))
    }),
    f.on("click", ".poi-empty .open_suggestion",
    function (b) {
        var c = $(this);
        c.closest(".sug-province").removeClass("active"),
        a(b)
    }),
    f.on("click", ".poi-empty .citycode",
    function (b) {
        amap.changecity = !0,
        amap.adcode = $(this).attr("adcode");
        var c = qs.parse(location.search);
        c.city = amap.adcode,
        c.utd_sceneid = 400002,
        amap.fwd("/search?" + $.param(c)),
        a(b)
    }),
    watch(amap.markerState, "active",
    function () {
        var a = amap.markerState.active.poiid,
        b = a && f.find("#" + a);
        f.find(g).find(".active").removeClass("active"),
        b && b.addClass("active")
    }),
    watch(amap.markerState, "hover",
    function (a) {
        var b = amap.markerState.hover.poiid,
        c = b && f.find("#" + b);
        f.find(g).find(".hover").removeClass("hover"),
        b && c.addClass("hover")
    }),
    watch(amap, "serp",
    function (a) {
        "html" === a && (f.hide().html(amap.serp.html).show(), amap.slimscroll(f.find(g)))
    }),
    watch(amap.classify, "value",
    function () {
        b(),
        $(".serp-head").css({
            "border-bottom": "none"
        }),
        $(".poibox:first").css({
            "border-top": "1px solid #eaeaea"
        }),
        3 == $(".cl-head em").length && $(".classify-sort-type").css({
            "margin-left": "-1px"
        });
        var a = $(".classify").attr("count");
        $(".classify .classify-area-level2").css({
            flex: a
        }),
        $("#search-panel .classify .classify-area-level1 li").mouseover(function () {
            var a = $(this).attr("id").split("-")[1],
            b = $(".classify-area-level2").attr("cl_num");
            $(this).parent().find("li").removeClass("area-level1-select-hover"),
            $(this).addClass("area-level1-select-hover"),
            b != a && ($(".classify-area").append("<ul class='cl-level2 cl-level2-" + b + "' d-ind='" + b + "'>" + $(".classify .classify-area-level2").html() + "</ul>"), $(".classify-area-level2").html(f.find(".cl-level2-" + a).html()), $(".classify-area").find(".cl-level2-" + a).remove(), $(".classify-area-level2").attr("cl_num", a))
        })
    }),
    watch(amap, "searchrouting",
    function () {
        _.isEmpty(amap.searchrouting) || (page("/dir"), $(".line-search-form .line-search-start input").val(amap.searchrouting.start.keyword), $(".line-search-form .line-search-end input").val(amap.searchrouting.end.keyword), planFormView.submit())
    })
}(),
!
function () {
    function a() {
        m()
    }
    var b = {
        getLngLat: function (a) {
            var b = a.split(",");
            return {
                lng: b[0],
                lat: b[1]
            }
        },
        getPOIInfo: function () {
            var a = this;
            return {
                poiid: amap.iwdata.id || "",
                name: amap.iwdata.name || "",
                address: amap.iwdata.address || "",
                telephone: amap.iwdata.telephone || "",
                url: a.createUrl(amap.iwdata)
            }
        },
        getDirSMSData: function () {
            var a = amap.dirp.type,
            c = amap.dirp.frominfo,
            d = b.getLngLat(c.lnglat),
            e = amap.dirp.toinfo,
            f = b.getLngLat(e.lnglat),
            g = 4,
            h = {
                startname: c.name || "",
                endname: e.name,
                startlongitude: d.lng,
                startlatitude: d.lat,
                endlongitude: f.lng,
                endlatitude: f.lat,
                url: amap.shareDir("pc_sms_dir")
            };
            if ("car" === a) h.length = i && i.distanceNum || 0,
            g = 4;
            else if ("bus" === a) {
                var i = amap.dirp.buslist[amap.dirIndex],
                j = i.segmentlist,
                k = {
                    bus: 1,
                    subway: 2,
                    walk: 3
                };
                h.path = [];
                for (var l = 0,
                m = j.length - 1; m > l; l++) {
                    var n = j[l];
                    a = n.type,
                    h.path.push({
                        type: k[a],
                        number: n.bus_key_name || "",
                        upname: n.startname || "",
                        downname: n.endname || "",
                        path_sites: n.passdepot && n.passdepot.length || 0,
                        out_point: n.outport && n.outport.name || "",
                        worklength: n.walk && n.walk.distance || ""
                    })
                }
                g = 5
            } else g = 6,
            h.length = amap.dirp.routes[0].distanceNum;
            return {
                data: h,
                type: g
            }
        },
        createUrl: function (a) {
            var b = this,
            c = [],
            d = a.id ? "p" : "q";
            return a.location && !a.pos && (a.pos = a.location),
            a.id && c.push(a.id),
            a.pos && (a.pos.lat && c.push(a.pos.lat), a.pos.lng && c.push(a.pos.lng)),
            a.name && c.push(b.substringName(a.name)),
            a.address && c.push(b.substringName(a.address)),
            c.push(amap.adcode),
            amap.service.wb + d + "=" + encodeURIComponent(c.join(",")) + "&src=pc_sms_poi"
        },
        substringName: function (a, b) {
            var c = "";
            return b = b || 10,
            a && (c = a.length > b + 1 ? a.substr(0, b) + "..." : a),
            c
        },
        showNotice: function (a) {
            new jBox("Notice", {
                content: a
            })
        }
    },
    c = {
        url: amap.service.getSMS,
        type: "sms",
        postType: "post",
        data: {},
        init: function () {
            var a = this;
            a.bindEvents()
        },
        getParams: function (a) {
            var c = this;
            if ("poi" == c.info.detailType) return a ? {
                startname: "鏈涗含(鍦伴搧绔�)",
                endname: "涓滅洿闂�",
                url: "http://wb.amap.com/?r=39.998767,116.469803,鏈涗含(鍦伴搧绔�),39.944585,116.434016,涓滅洿闂�,2,0,0"
            } : {
                type: amap.iwdata.id ? 3 : 1,
                data: b.getPOIInfo()
            };
            var d = b.getDirSMSData();
            return {
                data: d.data,
                type: d.type
            }
        },
        bindEvents: function () {
            var a = this;
            $("body").on("click", ".capchaimg",
            function () {
                var b = a.elem.find(".smsbtn").attr("code");
                return $.ajax({
                    url: amap.service.flushSMS,
                    data: {
                        code: b
                    },
                    success: function (b) {
                        if ("1" == b.status) {
                            var c = b.data.info;
                            a.elem.find(".smsbtn").attr("code", c.code),
                            a.elem.find(".capchaimg").attr("src", "data:image/jpg;base64," + c.verifydata)
                        } else toastr.info(b.data)
                    },
                    error: function () {
                        toastr.info(data.data)
                    }
                }),
                !1
            }).on("click", ".dir-smsbtn",
            function () {
                a.sendMsgCb.apply(a, ["dir"])
            }).on("click", ".poi-smsbtn",
            function () {
                a.sendMsgCb.apply(a, ["poi"])
            })
        },
        handle: function () {
            var a, b, c = this,
            d = c.data,
            e = 85;
            $.isEmptyObject(c.data) || (1 == c.data.status ? (a = d.data.info.sendmessage, b = a.match(/(http.*)/)[1] || location.origin, c.loadTpl(d.data, e, b)) : toastr.info(d.data))
        },
        loadTpl: function (a, b, c) {
            var d = this,
            e = d.info.detailType,
            f = "poi" == e ? "sms.send" : "sms.dir.send";
            tpl.tplLoad({
                filename: f,
                data: a.info,
                callback: function (a) {
                    d.elem.html(a),
                    d.elem.find(".qrcode").qrcode({
                        width: b,
                        height: b,
                        text: c
                    }),
                    Waves.attach(".smsbtn"),
                    Waves.init()
                }
            })
        },
        destroy: function () {
            var a = this;
            a.data = {},
            a.elem && a.elem.html("")
        },
        sendMsgCb: function (a) {
            var b = this,
            c = b.elem.find(".smsbtn").attr("code"),
            d = $.trim(b.elem.find(".smsinput").val()),
            e = $.trim(b.elem.find(".smscapchainput").val()),
            f = {
                code: c,
                number: d,
                text: e
            },
            g = b.sendMsgParam(a, f);
            $.ajax({
                url: amap.service.sendSMS,
                data: g,
                type: "post",
                dataType: "json",
                cache: !1,
                success: function (a) {
                    "1" == a.status ? toastr.success("鍙戦€佹垚鍔燂紒") : console.log("1", "   -- ", 5)
                },
                error: function () {
                    toastr.info("鍙戦€佸け璐�")
                }
            })
        },
        sendMsgParam: function (a, c) {
            var d;
            switch (a) {
                case "poi":
                    if (!c.dir) {
                        var e = c.type; !e && amap.iwdata.id && (e = 3),
                        e || amap.iwdata.id || (e = 1),
                        d = {
                            code: c.code,
                            data: b.getPOIInfo(),
                            number: c.number,
                            text: c.text,
                            type: e
                        }
                    }
                    break;
                case "dir":
                    var f = b.getDirSMSData();
                    d = {
                        code: c.code,
                        data: f.data,
                        number: c.number,
                        text: c.text,
                        type: f.type
                    }
            }
            return d
        }
    },
    d = {
        url: null,
        type: "car",
        data: null,
        init: function () {
            var a = this;
            a.bindEvents()
        },
        bindEvents: function () { },
        handle: function () {
            var a, b = this,
            c = ($(this).closest(".poi-iw"), b.info && b.info.pos);
            if (null != b.data) {
                c = c || {},
                a = b.getIfrSrc(c);
                var d = ['<div id="smscar">', '<div class="ifinfo"><iframe src="' + a + '" onload="$(\'#smsPopWin .loading\').hide();"><iframe></div>', "</div>"];
                b.elem.html(d.join(""))
            }
        },
        getIfrSrc: function (a) {
            var b = this,
            c = b.info,
            d = $.extend({},
            {
                type: "dituamap",
                longitude: a.lng,
                latitude: a.lat
            },
            c);
            delete d.pos;
            var e = "http://telematics.autonavi.com/sendtocar?" + $.param(d);
            return config.debug && (d.type = "dituamap", e = "http://telematics-test.autonavi.com/sendtocar?" + $.param(d)),
            e
        },
        destroy: function () {
            var a = this;
            a.data = null,
            a.elem && a.elem.html("")
        }
    },
    e = {
        url: amap.service.shortUrl,
        type: "share",
        data: {},
        init: function () {
            var a = this;
            a.bindEvents()
        },
        getParams: function () {
            var a = this,
            c = "dir" == a.info.detailType ? amap.shareDir("pc_sms_dir") : b.createUrl(amap.iwdata);
            return {
                address: encodeURIComponent(c)
            }
        },
        bindEvents: function () {
            var a = this;
            $("body").on("click", ".share-icon",
            function () {
                var b = $(this),
                c = b.data("type") || "",
                d = {
                    shareurl: a.data.url || "",
                    sharetxt: ""
                };
                return amap.share(c, d),
                !1
            })
        },
        handle: function () {
            var a = this,
            b = a.data;
            $.isEmptyObject(a.data) || (1 == a.data.status ? a.loadTpl(b.data.transfer_url) : toastr.info(b.data))
        },
        loadTpl: function (a) {
            var b = this;
            tpl.tplLoad({
                filename: "wb.share",
                data: {
                    url: a
                },
                callback: function (a) {
                    b.elem.html(a),
                    b.elem.find(".sharecancel").on("click",
                    function () {
                        k.close()
                    });
                    var c = b.clipboard = new Clipboard(".sharecopy");
                    c.on("success",
                    function (a) {
                        toastr.success("澶嶅埗鎴愬姛锛�")
                    }),
                    c.on("error",
                    function (a) {
                        toastr.info("澶嶅埗澶辫触锛岃浣跨敤CTRL+C鎴栬€匔OMMAND+C澶嶅埗")
                    })
                }
            })
        },
        destroy: function () {
            var a = this;
            a.data = {},
            a.elem && a.elem.html(""),
            a.clipboard && a.clipboard.destroy()
        }
    },
    f = function () {
        var a = {
            sms: c,
            car: d,
            share: e
        };
        for (var b in a) if (a.hasOwnProperty(b)) {
            var f = a[b];
            f.init(),
            watch(f, "data", f.handle || noop)
        }
        var g = function (b) {
            var c = a[b] || {};
            c.url ? $.ajax({
                url: c.url,
                data: c.getParams(),
                type: c.postType || "get",
                success: function (a) {
                    c.data = a
                },
                error: function (a) {
                    toastr.info(a.data)
                },
                complete: function () {
                    $("#smsPopWin").find(".loading").hide()
                }
            }) : c.data = !0
        };
        return {
            getData: function (b, c) {
                var d = c.type;
                a[d].elem = b,
                a[d].info = c.info,
                g(d)
            },
            destroy: function (b) {
                if ("undefined" == typeof b) for (var c in a) a.hasOwnProperty(c) && a[c].destroy();
                else a[b].destroy()
            }
        }
    },
    g = f(),
    h = function (a) {
        for (var b in a) if (a.hasOwnProperty(b) && 1 == a[b]) return 1;
        return 0
    },
    i = function (a, b) {
        var c = new RegExp(/<(li|div)[^>]+car[^<]+<\/(li|div)>/g);
        return "dir" == b && (a = a.replace(c, "")),
        a
    },
    j = {},
    k = new jBox("Modal", {
        width: 565,
        height: 370,
        attach: $("#smsModalC"),
        closeOnClick: "body",
        closeButton: "box",
        onOpen: function () {
            var a = $(".tab-c");
            a.pcTab({
                changeCb: j.changeCb
            }).select(j.tabType)
        },
        onClose: function () {
            g.destroy(),
            j.isNewPlace = 1
        }
    }),
    l = function (a) {
        var b = ($(this), amap.iwdata || {}),
        c = {
            id: b.id,
            pos: b.pos,
            telephone: b.tel,
            name: b.name,
            address: b.address
        },
        d = {
            sms: 1,
            car: 1,
            share: 1
        };
        j.isNewPlace = 1,
        tpl.tplLoad({
            filename: "sms.popwin",
            data: null,
            callback: function (a) {
                j.changeCb = function (a, b) {
                    var e = b.tab.data("type"),
                    f = b.panel,
                    i = {
                        type: e,
                        info: "car" == e ? c : {
                            detailType: j.type
                        }
                    };
                    j.isNewPlace && d[e] ? ($("#smsPopWin").find(".loading").show(), g.getData(f, i), d[e] = 0, j.isNewPlace = h(d)) : d[e] || $("#smsPopWin").find(".loading").hide()
                },
                k.setContent(i(a, j.type)).open("good")
            }
        })
    },
    m = function () {
        var a = $(document);
        a.on("click", ".smsit",
        function () {
            j.type = "poi",
            j.tabType = "sms",
            l.apply(this, [j.tabType])
        }).on("click", ".poi-sendcar",
        function () {
            j.type = "poi",
            j.tabType = "car",
            l.apply(this, ["car"])
        }).on("click", ".poi-share",
        function () {
            j.type = "poi",
            j.tabType = "share",
            l.apply(this, ["share"]),
            $(".poibtn-snaps").trigger("click")
        }),
        a.on("click", ".icon-mobile",
        function (a) {
            j.type = "dir",
            j.tabType = "sms",
            amap.dirIndex = parseInt($(a.target).parents(".planTitle").attr("index")),
            l.apply(this, ["sms"])
        }).on("click", ".icon-share",
        function (a) {
            j.type = "dir",
            j.tabType = "share",
            amap.dirIndex = parseInt($(a.target).parents(".planTitle").attr("index")),
            l.apply(this, ["share"])
        })
    };
    a()
}(),
!
function () {
    var a = function (a, b) {
        var c, d, e, f;
        if ("" !== b) {
            switch (c = encodeURIComponent(b.shareurl), d = encodeURIComponent(b.sharetxt), a) {
                case "xl":
                    e = "http://service.weibo.com/share/share.php?url=" + c + "&title=" + d + "&type=3&count=&appkey=884965267&pic=&ralateUid=&language=zh_cn&rnd=" + (new Date).valueOf() + "&mbweb=1",
                    f = "sina_weibo";
                    break;
                case "tx":
                    e = "http://v.t.qq.com/share/share.php?url=" + c + "&title=" + d + "&appkey=801309185",
                    f = "tencent_weibo";
                    break;
                case "qq":
                    e = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + c + "&title=" + d + "&desc=&summary=&site=楂樺痉鍦板浘",
                    f = "QZone";
                    break;
                case "rr":
                    e = "http://widget.renren.com/dialog/share?link=" + c + "&title=" + d,
                    f = "renren";
                    break;
                case "kx":
                    e = "http://www.kaixin001.com/rest/records.php?url=" + c + "&content=" + d + "&count=&pic=&starid=0&aid=0&showcount=0&style=11",
                    f = "kaixin";
                    break;
                case "db":
                    e = "http://www.douban.com/recommend/?url=" + c + "&title=" + d + "&sel=" + d + "&v=1",
                    f = "douban";
                    break;
                case "sh":
                    e = "http://t.sohu.com/third/post.jsp?url=" + c + "&title=" + d,
                    f = "sohu"
            }
            window.open(e, f)
        }
    },
    b = function (a) {
        var b = "1";
        switch (amap.dir.type) {
            case "car":
                b = "0";
                break;
            case "bus":
                b = "1";
                break;
            case "walk":
                b = "2"
        }
        var c, d = {
            1: "0",
            2: "4",
            8: "3",
            4: "1"
        };
        "car" == amap.dir.type && (c = d[amap.dir.policy]);
        var e = amap.dir.from.lnglat.split(","),
        f = encodeURIComponent(amap.dir.from.name),
        g = amap.dir.to.lnglat.split(","),
        h = encodeURIComponent(amap.dir.to.name),
        i = c || amap.dir.policy,
        j = amap.dir.via && amap.dir.via.length || 0,
        k = [e[1], e[0], f, g[1], g[0], h, i, b];
        if ("car" == amap.dir.type) {
            if (k.push(j), j > 0) {
                var l = amap.dir.via[0],
                m = l.lnglat.split(","),
                n = encodeURIComponent(l.name);
                k.push(m[1]),
                k.push(m[0]),
                k.push(n)
            }
        } else k.push(0);
        var o, p;
        "pc_dir" == a ? (o = encodeURIComponent("wap.amap.com/?type=pc&from=direction"), p = "&src=pc_dir&caurl=" + encodeURIComponent(o)) : p = "&src=pc_sms_dir";
        var q = amap.service.wb + "r=" + encodeURIComponent(k.join(",")) + p;
        return q
    },
    c = function (a, b) {
        $.get(amap.service.shortUrl + "address=" + encodeURIComponent(a)).done(function (a) {
            1 == a.status ? b && b(a.data.transfer_url) : toastr.info(a.data)
        })
    };
    $.extend(amap, {
        share: a,
        shareDir: b,
        getShorturl: c
    })
}(),
$(function () {
    function a() {
        amap.map ? (page({
            click: !1,
            decodeURLComponents: !1
        }), clearTimeout(c)) : c = setTimeout(function () {
            a()
        },
        50)
    }
    function b(a, b, c) {
        var d = $(window),
        e = d.width(),
        f = d.height(),
        g = Math.abs(b.x - c.x),
        h = Math.abs(b.y - c.y);
        if (150 > g && 150 > h) a.animate({
            left: c.x,
            top: c.y
        });
        else if (f - b.y < 200) {
            var i;
            i = a.hasClass("loginbox") ? 5 : a.hasClass("layerbox") ? 25 : 15;
            var j = f - a.height() - i;
            a.animate({
                top: j
            })
        } else if (e - b.x < 200) {
            var k = e - a.width() - 15;
            a.animate({
                left: k
            })
        }
    }
    watch(amap, "map",
    function () {
        amap.map && page({
            click: !1,
            decodeURLComponents: !1
        })
    });
    var c;
    a();
    var d = $("#citybox .city-panel"),
    e = d.city(".city-title");
    d.on("select.city",
    function (a, b) {
        amap.changecity = !0,
        amap.adcode = b
    }),
    watch(amap, "adcode",
    function (a, b, c, d) {
        if (amap.adcode) {
            var f = e.setTitle(amap.adcode);
            amap.changecity && f.x && f.y && (amap.changecity = !1, amap.city = [f.x, f.y])
        }
    });
    var f = $("#amapbox"),
    g = $(".amap-panctrl .fa-chevron-up"),
    h = $(".amap-panctrl .fa-chevron-down"),
    i = $("#index-panel"),
    j = ($("#amap-links"), 500);
    g.click(function (a) {
        amap.fullscreen = !1
    }),
    h.click(function (a) {
        amap.fullscreen = !0
    }),
    watch(amap, "fullscreen",
    function () {
        amap.fullscreen ? (h.parent().hide(), "index" == amap.state && (i.show(), amap.fwd("/dir")), f.stop(!0, !0).slideDown(j, "easeOutQuint",
        function () {
            g.parent().fadeInDown()
        })) : (g.parent().hide(), f.stop(!0, !0).slideUp(j, "easeOutQuint",
        function () {
            h.parent().fadeInDown()
        }))
    }),
    $("#amapbox").on("click", "#nav li",
    function () {
        var a = $(this).attr("fwd"),
        b = "index" == a ? "/" : "/" + a;
        amap.fwd(b)
    });
    var f = $("#amapbox"),
    k = $(".search"),
    l = k.draggabilly({
        handle: ".dtrigger",
        containment: "body"
    }),
    m = {
        x: 15,
        y: 66
    },
    n = {
        x: 15,
        y: 66
    };
    l.on("dragMove",
    function (a, b, c) {
        var d = $(this).data("draggabilly").position,
        e = d.x - n.x,
        g = d.y - n.y + 51;
        f.css("transform", "translate3d(" + e + "px, " + g + "px, 0px)")
    }),
    l.on("dragEnd",
    function (a, b) {
        var c = $(this).data("draggabilly").position;
        f.css("transform", ""),
        f.css({
            left: c.x,
            top: c.y + 51
        }),
        n.x = c.x,
        n.y = c.y + 51,
        c.x < 200 && c.y < 300 && (n.x = m.x, n.y = m.y, k.animate({
            left: m.x,
            top: m.y - 51
        }), f.animate({
            left: m.x,
            top: m.y
        }))
    }),
    l.on("click", _.throttle(function (a, b) {
        var c = $(a.originalEvent.target);
        c.hasClass("logo") && amap.fwd("/")
    },
    600, {
        trailing: !1
    }));
    var o = $("#loginbox"),
    p = {
        x: $(window).width() - 70,
        y: 12
    };
    $dragUser = o.draggabilly({
        containment: "body"
    }),
    o.css({
        left: p.x,
        top: p.y
    }),
    $dragUser.on("staticClick",
    function (a) {
        var b = $(this),
        c = b.parent(),
        d = c.find(".ctrlbox");
        c.toggleClass("active"),
        c.hasClass("active") ? d.fadeInDownBig() : d.fadeOut(200)
    }),
    $dragUser.on("dragEnd",
    function (a, c) {
        var d = $(this).data("draggabilly").position;
        b(o, d, p)
    });
    var q = {
        x: 435,
        y: 15
    },
    r = $("#citybox"),
    s = r.draggabilly({
        handle: ".tooldragbar",
        containment: "body"
    });
    s.on("dragEnd",
    function (a, c) {
        var d = $(this).data("draggabilly").position;
        b(r, d, q)
    });
    var t = $(".layerbox"),
    u = {
        x: $(window).width() - 330,
        y: 15
    },
    v = t.draggabilly({
        handle: ".tooldragbar",
        containment: "body"
    });
    t.css({
        left: u.x,
        top: u.y
    }),
    v.on("dragEnd",
    function (a, c) {
        var d = $(this).data("draggabilly").position;
        b(t, d, u)
    });
    var w = $("#maptoolbox"),
    x = {
        x: $(window).width() - 48,
        y: $(window).height() - 132
    };
    w.draggabilly({
        handle: ".dtrigger",
        containment: "body"
    });
    w.css({
        left: x.x,
        top: x.y
    }),
    w.on("dragEnd",
    function (a, c) {
        var d = $(this).data("draggabilly").position;
        b(w, d, x)
    }),
    $("#amap-banner-entry").hover(function () {
        $("#amap-banner").show()
    },
    function () {
        $("#amap-banner").hide()
    }),
    $("#amap-banner-entry").on("click", ".android",
    function () {
        $(this).find("iframe").remove();
        var a = '<iframe style="display:none" src="http://m.amap.com/callAPP?mo=http%3A%2F%2Fwap.amap.com%2F%3Ftype%3Dpc%26from%3Dbanner%26os%3Da&src=pc_ba"></iframe>';
        $(this).append(a),
        util.trace({
            type: "event",
            category: "button",
            action: "click",
            label: "banner",
            value: "android"
        })
    }),
    $("#amap-banner-entry").on("click", ".ios",
    function () {
        util.trace({
            type: "event",
            category: "button",
            action: "click",
            label: "banner",
            value: "ios"
        })
    }),
    _.delay(function () {
        var a = $("#themap");
        a.is(":visible") || a.fadeIn()
    },
    2500)
}),
!
function () {
    function a(a) {
        $.get(e,
        function (b) {
            a.origin = location.origin;
            var c = _.template(b),
            e = _.clone(a);
            e.nickname = _.escape(e.nickname),
            e.username = _.escape(e.username);
            var f = c(e);
            d.hide().html(f).show()
        })
    }
    function b() {
        $.get(f,
        function (a) {
            var b = _.template(a),
            c = b({
                origin: location.origin
            });
            d.html(c)
        })
    }
    function c() {
        amap.userinfo = !1,
        $.get(amap.service.logout,
        function () { }),
        tpl.tplLoad({
            filename: "user.logout",
            data: {
                origin: location.origin
            },
            callback: function (a) {
                d.html(a)
            }
        })
    }
    var d = $("#loginbox"),
    e = "/assets/tpl/user.login.html",
    f = "/assets/tpl/user.logout.html";
    $.extend(amap, {
        checkLogin: function (a) {
            return $.post(amap.service.checkLogin,
            function (b) {
                a && a(b)
            })
        }
    }),
    $(window).on("message",
    function (b) {
        var c = b.originalEvent.data;
        try {
            var d = JSON.parse(c);
            amap.userinfo = d,
            a(d)
        } catch (b) {
            console.error(b)
        }
    }),
    d.on("click", ".userlogout",
    function () {
        c()
    }),
    amap.checkLogin(function (c) {
        c.info && 1 == c.status ? (a(c.info), amap.userinfo = c.info) : (amap.userinfo = !1, b())
    })
}();