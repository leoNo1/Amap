!
function (a) {
    function b() { }
    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function (b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
            })
        }
        function e(b, c) {
            a.fn[b] = function (e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h],
                        k = a.data(j, b);
                        if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                            var l = k[e].apply(k, g);
                            if (void 0 !== l) return l
                        } else f("no such method '" + e + "' for " + b + " instance");
                        else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
                    }
                    return this
                }
                return this.each(function () {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
                })
            }
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function (a) {
                console.error(a)
            };
            return a.bridget = function (a, b) {
                c(b),
                e(a, b)
            },
            a.bridget
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
}(window),
function (a) {
    function b(a) {
        return new RegExp("(^|\\s+)" + a + "(\\s+|$)")
    }
    function c(a, b) {
        var c = d(a, b) ? f : e;
        c(a, b)
    }
    var d, e, f;
    "classList" in document.documentElement ? (d = function (a, b) {
        return a.classList.contains(b)
    },
    e = function (a, b) {
        a.classList.add(b)
    },
    f = function (a, b) {
        a.classList.remove(b)
    }) : (d = function (a, c) {
        return b(c).test(a.className)
    },
    e = function (a, b) {
        d(a, b) || (a.className = a.className + " " + b)
    },
    f = function (a, c) {
        a.className = a.className.replace(b(c), " ")
    });
    var g = {
        hasClass: d,
        addClass: e,
        removeClass: f,
        toggleClass: c,
        has: d,
        add: e,
        remove: f,
        toggle: c
    };
    "function" == typeof define && define.amd ? define("classie/classie", g) : "object" == typeof exports ? module.exports = g : a.classie = g
}(window),
function (a) {
    function b(a) {
        if (a) {
            if ("string" == typeof d[a]) return a;
            a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var b, e = 0,
            f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b
        }
    }
    var c = "Webkit Moz ms Ms O".split(" "),
    d = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [],
    function () {
        return b
    }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
}(window),
function (a, b) {
    function c(a) {
        var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);
        return c && b
    }
    function d() { }
    function e() {
        for (var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        },
        b = 0, c = h.length; c > b; b++) {
            var d = h[b];
            a[d] = 0
        }
        return a
    }
    function f(b) {
        function d() {
            if (!m) {
                m = !0;
                var d = a.getComputedStyle;
                if (j = function () {
                    var a = d ?
                    function (a) {
                        return d(a, null)
                } : function (a) {
                        return a.currentStyle
                };
                    return function (b) {
                        var c = a(b);
                        return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
                        c
                }
                }(), k = b("boxSizing")) {
                    var e = document.createElement("div");
                    e.style.width = "200px",
                    e.style.padding = "1px 2px 3px 4px",
                    e.style.borderStyle = "solid",
                    e.style.borderWidth = "1px 2px 3px 4px",
                    e.style[k] = "border-box";
                    var f = document.body || document.documentElement;
                    f.appendChild(e);
                    var h = j(e);
                    l = 200 === c(h.width),
                    f.removeChild(e)
                }
            }
        }
        function f(a) {
            if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                var b = j(a);
                if ("none" === b.display) return e();
                var f = {};
                f.width = a.offsetWidth,
                f.height = a.offsetHeight;
                for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
                    var o = h[m],
                    p = b[o];
                    p = i(a, p);
                    var q = parseFloat(p);
                    f[o] = isNaN(q) ? 0 : q
                }
                var r = f.paddingLeft + f.paddingRight,
                s = f.paddingTop + f.paddingBottom,
                t = f.marginLeft + f.marginRight,
                u = f.marginTop + f.marginBottom,
                v = f.borderLeftWidth + f.borderRightWidth,
                w = f.borderTopWidth + f.borderBottomWidth,
                x = g && l,
                y = c(b.width);
                y !== !1 && (f.width = y + (x ? 0 : r + v));
                var z = c(b.height);
                return z !== !1 && (f.height = z + (x ? 0 : s + w)),
                f.innerWidth = f.width - (r + v),
                f.innerHeight = f.height - (s + w),
                f.outerWidth = f.width + t,
                f.outerHeight = f.height + u,
                f
            }
        }
        function i(b, c) {
            if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
            var d = b.style,
            e = d.left,
            f = b.runtimeStyle,
            g = f && f.left;
            return g && (f.left = b.currentStyle.left),
            d.left = c,
            c = d.pixelLeft,
            d.left = e,
            g && (f.left = g),
            c
        }
        var j, k, l, m = !1;
        return f
    }
    var g = "undefined" == typeof console ? d : function (a) {
        console.error(a)
    },
    h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty)
}(window),
function (a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b,
        c
    }
    var c = document.documentElement,
    d = function () { };
    c.addEventListener ? d = function (a, b, c) {
        a.addEventListener(b, c, !1)
    } : c.attachEvent && (d = function (a, c, d) {
        a[c + d] = d.handleEvent ?
        function () {
            var c = b(a);
            d.handleEvent.call(d, c)
        } : function () {
            var c = b(a);
            d.call(a, c)
        },
        a.attachEvent("on" + c, a[c + d])
    });
    var e = function () { };
    c.removeEventListener ? e = function (a, b, c) {
        a.removeEventListener(b, c, !1)
    } : c.detachEvent && (e = function (a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c]
        } catch (d) {
            a[b + c] = void 0
        }
    });
    var f = {
        bind: d,
        unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
}(window),
function () {
    function a() { }
    function b(a, b) {
        for (var c = a.length; c--;) if (a[c].listener === b) return c;
        return -1
    }
    function c(a) {
        return function () {
            return this[a].apply(this, arguments)
        }
    }
    var d = a.prototype,
    e = this,
    f = e.EventEmitter;
    d.getListeners = function (a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
        } else b = d[a] || (d[a] = []);
        return b
    },
    d.flattenListeners = function (a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c
    },
    d.getListenersAsObject = function (a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {},
        b[a] = c),
        b || c
    },
    d.addListener = function (a, c) {
        var d, e = this.getListenersAsObject(a),
        f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this
    },
    d.on = c("addListener"),
    d.addOnceListener = function (a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        })
    },
    d.once = c("addOnceListener"),
    d.defineEvent = function (a) {
        return this.getListeners(a),
        this
    },
    d.defineEvents = function (a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this
    },
    d.removeListener = function (a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this
    },
    d.off = c("removeListener"),
    d.addListeners = function (a, b) {
        return this.manipulateListeners(!1, a, b)
    },
    d.removeListeners = function (a, b) {
        return this.manipulateListeners(!0, a, b)
    },
    d.manipulateListeners = function (a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener,
        g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) f.call(this, b, c[d]);
        else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this
    },
    d.removeEvent = function (a) {
        var b, c = typeof a,
        d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this
    },
    d.removeAllListeners = c("removeEvent"),
    d.emitEvent = function (a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) c = g[e][d],
        c.once === !0 && this.removeListener(a, c.listener),
        f = c.listener.apply(this, b || []),
        f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this
    },
    d.trigger = c("emitEvent"),
    d.emit = function (a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b)
    },
    d.setOnceReturnValue = function (a) {
        return this._onceReturnValue = a,
        this
    },
    d._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    },
    d._getEvents = function () {
        return this._events || (this._events = {})
    },
    a.noConflict = function () {
        return e.EventEmitter = f,
        a
    },
    "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [],
    function () {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call(this),
function (a, b) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["eventEmitter/EventEmitter", "eventie/eventie"],
    function (c, d) {
        return b(a, c, d)
    }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("eventie")) : a.Unipointer = b(a, a.EventEmitter, a.eventie)
}(window,
function (a, b, c) {
    function d() { }
    function e() { }
    e.prototype = new b,
    e.prototype.bindStartEvent = function (a) {
        this._bindStartEvent(a, !0)
    },
    e.prototype.unbindStartEvent = function (a) {
        this._bindStartEvent(a, !1)
    },
    e.prototype._bindStartEvent = function (b, d) {
        d = void 0 === d ? !0 : !!d;
        var e = d ? "bind" : "unbind";
        a.navigator.pointerEnabled ? c[e](b, "pointerdown", this) : a.navigator.msPointerEnabled ? c[e](b, "MSPointerDown", this) : (c[e](b, "mousedown", this), c[e](b, "touchstart", this))
    },
    e.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
    },
    e.prototype.getTouch = function (a) {
        for (var b = 0,
        c = a.length; c > b; b++) {
            var d = a[b];
            if (d.identifier == this.pointerIdentifier) return d
        }
    },
    e.prototype.onmousedown = function (a) {
        var b = a.button;
        b && 0 !== b && 1 !== b || this._pointerDown(a, a)
    },
    e.prototype.ontouchstart = function (a) {
        this._pointerDown(a, a.changedTouches[0])
    },
    e.prototype.onMSPointerDown = e.prototype.onpointerdown = function (a) {
        this._pointerDown(a, a)
    },
    e.prototype._pointerDown = function (a, b) {
        this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== b.pointerId ? b.pointerId : b.identifier, this.pointerDown(a, b))
    },
    e.prototype.pointerDown = function (a, b) {
        this._bindPostStartEvents(a),
        this.emitEvent("pointerDown", [a, b])
    };
    var f = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"],
        MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
    };
    return e.prototype._bindPostStartEvents = function (b) {
        if (b) {
            for (var d = f[b.type], e = b.preventDefault ? a : document, g = 0, h = d.length; h > g; g++) {
                var i = d[g];
                c.bind(e, i, this)
            }
            this._boundPointerEvents = {
                events: d,
                node: e
            }
        }
    },
    e.prototype._unbindPostStartEvents = function () {
        var a = this._boundPointerEvents;
        if (a && a.events) {
            for (var b = 0,
            d = a.events.length; d > b; b++) {
                var e = a.events[b];
                c.unbind(a.node, e, this)
            }
            delete this._boundPointerEvents
        }
    },
    e.prototype.onmousemove = function (a) {
        this._pointerMove(a, a)
    },
    e.prototype.onMSPointerMove = e.prototype.onpointermove = function (a) {
        a.pointerId == this.pointerIdentifier && this._pointerMove(a, a)
    },
    e.prototype.ontouchmove = function (a) {
        var b = this.getTouch(a.changedTouches);
        b && this._pointerMove(a, b)
    },
    e.prototype._pointerMove = function (a, b) {
        this.pointerMove(a, b)
    },
    e.prototype.pointerMove = function (a, b) {
        this.emitEvent("pointerMove", [a, b])
    },
    e.prototype.onmouseup = function (a) {
        this._pointerUp(a, a)
    },
    e.prototype.onMSPointerUp = e.prototype.onpointerup = function (a) {
        a.pointerId == this.pointerIdentifier && this._pointerUp(a, a)
    },
    e.prototype.ontouchend = function (a) {
        var b = this.getTouch(a.changedTouches);
        b && this._pointerUp(a, b)
    },
    e.prototype._pointerUp = function (a, b) {
        this._pointerDone(),
        this.pointerUp(a, b)
    },
    e.prototype.pointerUp = function (a, b) {
        this.emitEvent("pointerUp", [a, b])
    },
    e.prototype._pointerDone = function () {
        this.isPointerDown = !1,
        delete this.pointerIdentifier,
        this._unbindPostStartEvents(),
        this.pointerDone()
    },
    e.prototype.pointerDone = d,
    e.prototype.onMSPointerCancel = e.prototype.onpointercancel = function (a) {
        a.pointerId == this.pointerIdentifier && this._pointerCancel(a, a)
    },
    e.prototype.ontouchcancel = function (a) {
        var b = this.getTouch(a.changedTouches);
        b && this._pointerCancel(a, b)
    },
    e.prototype._pointerCancel = function (a, b) {
        this._pointerDone(),
        this.pointerCancel(a, b)
    },
    e.prototype.pointerCancel = function (a, b) {
        this.emitEvent("pointerCancel", [a, b])
    },
    e.getPointerPoint = function (a) {
        return {
            x: void 0 !== a.pageX ? a.pageX : a.clientX,
            y: void 0 !== a.pageY ? a.pageY : a.clientY
        }
    },
    e
}),
function (a, b) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["eventie/eventie", "unipointer/unipointer"],
    function (c, d) {
        return b(a, c, d)
    }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("unipointer")) : a.Unidragger = b(a, a.eventie, a.Unipointer)
}(window,
function (a, b, c) {
    function d() { }
    function e(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    function f(a) {
        for (; a != document.body;) if (a = a.parentNode, "A" == a.nodeName) return a
    }
    function g() { }
    function h() {
        return !1
    }
    g.prototype = new c,
    g.prototype.bindHandles = function () {
        this._bindHandles(!0)
    },
    g.prototype.unbindHandles = function () {
        this._bindHandles(!1)
    };
    var i = a.navigator;
    g.prototype._bindHandles = function (a) {
        a = void 0 === a ? !0 : !!a;
        var c;
        c = i.pointerEnabled ?
        function (b) {
            b.style.touchAction = a ? "none" : ""
        } : i.msPointerEnabled ?
        function (b) {
            b.style.msTouchAction = a ? "none" : ""
        } : function () {
            a && k(g)
        };
        for (var d = a ? "bind" : "unbind", e = 0, f = this.handles.length; f > e; e++) {
            var g = this.handles[e];
            this._bindStartEvent(g, a),
            c(g),
            b[d](g, "click", this)
        }
    };
    var j = "attachEvent" in document.documentElement,
    k = j ?
    function (a) {
        "IMG" == a.nodeName && (a.ondragstart = h);
        for (var b = a.querySelectorAll("img"), c = 0, d = b.length; d > c; c++) {
            var e = b[c];
            e.ondragstart = h
        }
    } : d,
    l = g.allowTouchstartNodes = {
        INPUT: !0,
        A: !0,
        BUTTON: !0,
        SELECT: !0
    };
    return g.prototype.pointerDown = function (a, b) {
        this._dragPointerDown(a, b);
        var c = document.activeElement;
        c && c.blur && c.blur(),
        this._bindPostStartEvents(a),
        this.emitEvent("pointerDown", [a, b])
    },
    g.prototype._dragPointerDown = function (a, b) {
        this.pointerDownPoint = c.getPointerPoint(b);
        var d = a.target.nodeName,
        g = "touchstart" == a.type && (l[d] || f(a.target));
        g || "SELECT" == d || e(a)
    },
    g.prototype.pointerMove = function (a, b) {
        var c = this._dragPointerMove(a, b);
        this.emitEvent("pointerMove", [a, b, c]),
        this._dragMove(a, b, c)
    },
    g.prototype._dragPointerMove = function (a, b) {
        var d = c.getPointerPoint(b),
        e = {
            x: d.x - this.pointerDownPoint.x,
            y: d.y - this.pointerDownPoint.y
        };
        return !this.isDragging && this.hasDragStarted(e) && this._dragStart(a, b),
        e
    },
    g.prototype.hasDragStarted = function (a) {
        return Math.abs(a.x) > 3 || Math.abs(a.y) > 3
    },
    g.prototype.pointerUp = function (a, b) {
        this.emitEvent("pointerUp", [a, b]),
        this._dragPointerUp(a, b)
    },
    g.prototype._dragPointerUp = function (a, b) {
        this.isDragging ? this._dragEnd(a, b) : this._staticClick(a, b)
    },
    g.prototype._dragStart = function (a, b) {
        this.isDragging = !0,
        this.dragStartPoint = g.getPointerPoint(b),
        this.isPreventingClicks = !0,
        this.dragStart(a, b)
    },
    g.prototype.dragStart = function (a, b) {
        this.emitEvent("dragStart", [a, b])
    },
    g.prototype._dragMove = function (a, b, c) {
        this.isDragging && this.dragMove(a, b, c)
    },
    g.prototype.dragMove = function (a, b, c) {
        this.emitEvent("dragMove", [a, b, c])
    },
    g.prototype._dragEnd = function (a, b) {
        this.isDragging = !1;
        var c = this;
        setTimeout(function () {
            delete c.isPreventingClicks
        }),
        this.dragEnd(a, b)
    },
    g.prototype.dragEnd = function (a, b) {
        this.emitEvent("dragEnd", [a, b])
    },
    g.prototype.onclick = function (a) {
        this.isPreventingClicks && e(a)
    },
    g.prototype._staticClick = function (a, b) {
        "INPUT" == a.target.nodeName && "text" == a.target.type && a.target.focus(),
        this.staticClick(a, b)
    },
    g.prototype.staticClick = function (a, b) {
        this.emitEvent("staticClick", [a, b])
    },
    g.getPointerPoint = function (a) {
        return {
            x: void 0 !== a.pageX ? a.pageX : a.clientX,
            y: void 0 !== a.pageY ? a.pageY : a.clientY
        }
    },
    g.getPointerPoint = c.getPointerPoint,
    g
}),
function (a, b) {
    "function" == typeof define && define.amd ? define("draggabilly/draggabilly", ["classie/classie", "get-style-property/get-style-property", "get-size/get-size", "unidragger/unidragger"],
    function (c, d, e, f) {
        return b(a, c, d, e, f)
    }) : "object" == typeof exports ? module.exports = b(a, require("desandro-classie"), require("desandro-get-style-property"), require("get-size"), require("unidragger")) : a.Draggabilly = b(a, a.classie, a.getStyleProperty, a.getSize, a.Unidragger)
}(window,
function (a, b, c, d, e) {
    function f() { }
    function g(a, b) {
        for (var c in b) a[c] = b[c];
        return a
    }
    function h(a, b) {
        this.element = "string" == typeof a ? k.querySelector(a) : a,
        v && (this.$element = v(this.element)),
        this.options = g({},
        this.constructor.defaults),
        this.option(b),
        this._create()
    }
    function i(a, b, c) {
        return c = c || "round",
        b ? Math[c](a / b) * b : a
    }
    for (var j, k = a.document,
    l = k.defaultView,
    m = l && l.getComputedStyle ?
    function (a) {
        return l.getComputedStyle(a, null)
    } : function (a) {
        return a.currentStyle
    },
    n = "object" == typeof HTMLElement ?
    function (a) {
        return a instanceof HTMLElement
    } : function (a) {
        return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
    },
    o = 0, p = "webkit moz ms o".split(" "), q = a.requestAnimationFrame, r = a.cancelAnimationFrame, s = 0; s < p.length && (!q || !r) ; s++) j = p[s],
    q = q || a[j + "RequestAnimationFrame"],
    r = r || a[j + "CancelAnimationFrame"] || a[j + "CancelRequestAnimationFrame"];
    q && r || (q = function (b) {
        var c = (new Date).getTime(),
        d = Math.max(0, 16 - (c - o)),
        e = a.setTimeout(function () {
            b(c + d)
        },
        d);
        return o = c + d,
        e
    },
    r = function (b) {
        a.clearTimeout(b)
    });
    var t = c("transform"),
    u = !!c("perspective"),
    v = a.jQuery;
    g(h.prototype, e.prototype),
    h.defaults = {},
    h.prototype.option = function (a) {
        g(this.options, a)
    },
    h.prototype._create = function () {
        this.position = {},
        this._getPosition(),
        this.startPoint = {
            x: 0,
            y: 0
        },
        this.dragPoint = {
            x: 0,
            y: 0
        },
        this.startPosition = g({},
        this.position);
        var a = m(this.element);
        "relative" != a.position && "absolute" != a.position && (this.element.style.position = "relative"),
        this.enable(),
        this.setHandles()
    },
    h.prototype.setHandles = function () {
        this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element],
        this.bindHandles()
    },
    h.prototype.dispatchEvent = function (b, c, d) {
        var e = [c].concat(d);
        this.emitEvent(b, e);
        var f = a.jQuery;
        if (f && this.$element) if (c) {
            var g = f.Event(c);
            g.type = b,
            this.$element.trigger(g, d)
        } else this.$element.trigger(b, d)
    },
    h.prototype._getPosition = function () {
        var a = m(this.element),
        b = parseInt(a.left, 10),
        c = parseInt(a.top, 10);
        this.position.x = isNaN(b) ? 0 : b,
        this.position.y = isNaN(c) ? 0 : c,
        this._addTransformPosition(a)
    },
    h.prototype._addTransformPosition = function (a) {
        if (t) {
            var b = a[t];
            if (0 === b.indexOf("matrix")) {
                var c = b.split(","),
                d = 0 === b.indexOf("matrix3d") ? 12 : 4,
                e = parseInt(c[d], 10),
                f = parseInt(c[d + 1], 10);
                this.position.x += e,
                this.position.y += f
            }
        }
    },
    h.prototype.pointerDown = function (a, c) {
        this._dragPointerDown(a, c);
        var d = k.activeElement;
        d && d.blur && d.blur(),
        this._bindPostStartEvents(a),
        b.add(this.element, "is-pointer-down"),
        this.dispatchEvent("pointerDown", a, [c])
    },
    h.prototype.pointerMove = function (a, b) {
        var c = this._dragPointerMove(a, b);
        this.dispatchEvent("pointerMove", a, [b, c]),
        this._dragMove(a, b, c)
    },
    h.prototype.dragStart = function (a, c) {
        this.isEnabled && (this._getPosition(), this.measureContainment(), this.startPosition.x = this.position.x, this.startPosition.y = this.position.y, this.setLeftTop(), this.dragPoint.x = 0, this.dragPoint.y = 0, this.isDragging = !0, b.add(this.element, "is-dragging"), this.dispatchEvent("dragStart", a, [c]), this.animate())
    },
    h.prototype.measureContainment = function () {
        var a = this.options.containment;
        if (a) {
            this.size = d(this.element);
            var b = this.element.getBoundingClientRect(),
            c = n(a) ? a : "string" == typeof a ? k.querySelector(a) : this.element.parentNode;
            this.containerSize = d(c);
            var e = c.getBoundingClientRect();
            this.relativeStartPosition = {
                x: b.left - e.left,
                y: b.top - e.top
            }
        }
    },
    h.prototype.dragMove = function (a, b, c) {
        if (this.isEnabled) {
            var d = c.x,
            e = c.y,
            f = this.options.grid,
            g = f && f[0],
            h = f && f[1];
            d = i(d, g),
            e = i(e, h),
            d = this.containDrag("x", d, g),
            e = this.containDrag("y", e, h),
            d = "y" == this.options.axis ? 0 : d,
            e = "x" == this.options.axis ? 0 : e,
            this.position.x = this.startPosition.x + d,
            this.position.y = this.startPosition.y + e,
            this.dragPoint.x = d,
            this.dragPoint.y = e,
            this.dispatchEvent("dragMove", a, [b, c])
        }
    },
    h.prototype.containDrag = function (a, b, c) {
        if (!this.options.containment) return b;
        var d = "x" == a ? "width" : "height",
        e = this.relativeStartPosition[a],
        f = i(-e, c, "ceil"),
        g = this.containerSize[d] - e - this.size[d];
        return g = i(g, c, "floor"),
        Math.min(g, Math.max(f, b))
    },
    h.prototype.pointerUp = function (a, c) {
        b.remove(this.element, "is-pointer-down"),
        this.dispatchEvent("pointerUp", a, [c]),
        this._dragPointerUp(a, c)
    },
    h.prototype.dragEnd = function (a, c) {
        this.isEnabled && (this.isDragging = !1, t && (this.element.style[t] = "", this.setLeftTop()), b.remove(this.element, "is-dragging"), this.dispatchEvent("dragEnd", a, [c]))
    },
    h.prototype.animate = function () {
        if (this.isDragging) {
            this.positionDrag();
            var a = this;
            q(function () {
                a.animate()
            })
        }
    };
    var w = u ?
    function (a, b) {
        return "translate3d( " + a + "px, " + b + "px, 0)"
    } : function (a, b) {
        return "translate( " + a + "px, " + b + "px)"
    };
    return h.prototype.setLeftTop = function () {
        this.element.style.left = this.position.x + "px",
        this.element.style.top = this.position.y + "px"
    },
    h.prototype.positionDrag = t ?
    function () {
        this.element.style[t] = w(this.dragPoint.x, this.dragPoint.y)
    } : h.prototype.setLeftTop,
    h.prototype.staticClick = function (a, b) {
        this.dispatchEvent("staticClick", a, [b])
    },
    h.prototype.enable = function () {
        this.isEnabled = !0
    },
    h.prototype.disable = function () {
        this.isEnabled = !1,
        this.isDragging && this.dragEnd()
    },
    h.prototype.destroy = function () {
        this.disable(),
        t && (this.element.style[t] = ""),
        this.element.style.left = "",
        this.element.style.top = "",
        this.element.style.position = "",
        this.unbindHandles(),
        this.$element && this.$element.removeData("draggabilly")
    },
    h.prototype._init = f,
    v && v.bridget && v.bridget("draggabilly", h),
    h
}),
function (a) {
    var b = {
        init: function (b) {
            this.Ranged.options = a.extend({},
            this.Ranged.defaults, b);
            var c = [];
            return this.each(function () {
                var b = a(this),
                d = b.data("Ranged");
                d || (b.is("input[type=range]") && (b = b.Ranged("_extendInputRanged")), b.data("Ranged", {
                    target: b,
                    options: b.Ranged.options
                }), a(document).data("Ranged", {}), b.Ranged("_build"), b.Ranged("_calculate"), b.Ranged("_bindEvents"), c.push(b[0]))
            }),
            a(c)
        },
        _extendInputRanged: function () {
            this.Ranged.options.min = +this.attr("min"),
            this.Ranged.options.max = +this.attr("max"),
            this.Ranged.options.step = +this.attr("step"),
            this.Ranged.options.value = +this.attr("value");
            var b = a("<div>", {
                id: this.attr("id"),
                "class": this.attr("class") ? this.attr("class") + " " + this.Ranged.options.rangedClass : this.Ranged.options.rangedClass
            });
            return this.replaceWith(b),
            b
        },
        _build: function () {
            var b, c;
            return this.addClass(this.Ranged.options.rangedClass),
            b = this.data("Ranged").options.createBar ? a("<span>", {
                "class": this.data("Ranged").options.barClass
            }).appendTo(this) : this.find("." + this.data("Ranged").options.barClass),
            this.data("Ranged").options.createThumb ? (c = a("<span>", {
                "class": this.data("Ranged").options.thumbClass,
                tabindex: 0,
                role: "slider",
                "aria-valuemax": this.data("Ranged").options.max,
                "aria-valuemin": this.data("Ranged").options.min,
                "aria-valuenow": this.data("Ranged").options.value,
                "aria-valuetext": this.data("Ranged").options.value
            }).appendTo(this), c.html('<div class="thumb-time-wrap"><div class="thumb-time"></div></div>')) : c = this.find("." + this.data("Ranged").options.thumbClass),
            this.data("Ranged").bar = b,
            this.data("Ranged").thumb = c,
            this
        },
        _bindEvents: function () {
            return this.data("Ranged").thumb.on("mousedown", this,
            function (b) {
                var c = b.data;
                a(document).data("Ranged").active = c,
                c.data("Ranged").dragStartX = b.clientX,
                c.data("Ranged").dragStartW = parseInt(c.data("Ranged").bar.css("width"), 10),
                c.data("Ranged").options.onDragStart.apply(c, [c.Ranged("value")])
            }),
            a(document).data("Ranged").events || (a(document).on("mousemove",
            function (b) {
                var c = a(document).data("Ranged").active;
                if (c) {
                    var d = Math.max(0, Math.min(c.data("Ranged").width, c.data("Ranged").dragStartW + (b.clientX - c.data("Ranged").dragStartX))),
                    e = c.Ranged("_pxToValue", d);
                    c.Ranged("value") != e && (c.Ranged("value", e), c.data("Ranged").options.onChange.apply(c, [e]))
                }
            }).on("mouseup",
            function () {
                var b = a(document).data("Ranged").active;
                b && (a(document).data("Ranged").active = null, b.data("Ranged").options.onDragEnd.apply(b, [b.Ranged("value")]))
            }).data("Ranged").events = !0),
            this
        },
        value: function (a) {
            return void 0 === a ? this.data("Ranged").thumb.attr("aria-valuenow") : (this.data("Ranged").bar.css("width", this.Ranged("_valueToPx", a)), this.data("Ranged").thumb.attr("aria-valuenow", a), this.data("Ranged").thumb.attr("aria-valuetext", a), this)
        },
        _calculate: function () {
            this.data("Ranged").width = this.width();
            var a = this.data("Ranged").options.max - this.data("Ranged").options.min;
            this.data("Ranged").stepWidth = this.data("Ranged").options.step * (this.data("Ranged").width / a),
            this.Ranged("value", this.data("Ranged").options.value)
        },
        _pxToStep: function (a) {
            var b = a / this.data("Ranged").stepWidth,
            c = Math.floor(b),
            d = b - c;
            return d > .5 && c++,
            c
        },
        _pxToValue: function (a) {
            return this.Ranged("_stepToValue", this.Ranged("_pxToStep", a))
        },
        _stepToPx: function (a) {
            return a * this.data("Ranged").stepWidth
        },
        _stepToValue: function (a) {
            return a * this.data("Ranged").options.step + this.data("Ranged").options.min
        },
        _valueToStep: function (a) {
            return (a - this.data("Ranged").options.min) / this.data("Ranged").options.step
        },
        _valueToPx: function (a) {
            return this.Ranged("_valueToStep", a) * this.data("Ranged").stepWidth
        }
    };
    a.fn.Ranged = function (c) {
        return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.Ranged") : b.init.apply(this, arguments)
    },
    a.fn.Ranged.defaults = {
        min: 0,
        max: 1,
        step: .01,
        value: 0,
        createBar: !0,
        createThumb: !0,
        rangedClass: "ranged",
        barClass: "ranged-bar",
        thumbClass: "ranged-thumb",
        onChange: function (a) { },
        onDragStart: function (a) { },
        onDragEnd: function (a) { }
    },
    a.fn.Ranged.options = {}
}(jQuery),
function (a) {
    a.fn.qrcode = function (b) {
        function c(a) {
            this.mode = h,
            this.data = a
        }
        function d(a, b) {
            this.typeNumber = a,
            this.errorCorrectLevel = b,
            this.modules = null,
            this.moduleCount = 0,
            this.dataCache = null,
            this.dataList = []
        }
        function e(a, b) {
            if (void 0 == a.length) throw Error(a.length + "/" + b);
            for (var c = 0; c < a.length && 0 == a[c];) c++;
            this.num = Array(a.length - c + b);
            for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c]
        }
        function f(a, b) {
            this.totalCount = a,
            this.dataCount = b
        }
        function g() {
            this.buffer = [],
            this.length = 0
        }
        var h;
        c.prototype = {
            getLength: function () {
                return this.data.length
            },
            write: function (a) {
                for (var b = 0; b < this.data.length; b++) a.put(this.data.charCodeAt(b), 8)
            }
        },
        d.prototype = {
            addData: function (a) {
                this.dataList.push(new c(a)),
                this.dataCache = null
            },
            isDark: function (a, b) {
                if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw Error(a + "," + b);
                return this.modules[a][b]
            },
            getModuleCount: function () {
                return this.moduleCount
            },
            make: function () {
                if (1 > this.typeNumber) {
                    for (var a = 1,
                    a = 1; 40 > a; a++) {
                        for (var b = f.getRSBlocks(a, this.errorCorrectLevel), c = new g, d = 0, e = 0; e < b.length; e++) d += b[e].dataCount;
                        for (e = 0; e < this.dataList.length; e++) b = this.dataList[e],
                        c.put(b.mode, 4),
                        c.put(b.getLength(), i.getLengthInBits(b.mode, a)),
                        b.write(c);
                        if (c.getLengthInBits() <= 8 * d) break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function (a, b) {
                this.moduleCount = 4 * this.typeNumber + 17,
                this.modules = Array(this.moduleCount);
                for (var c = 0; c < this.moduleCount; c++) {
                    this.modules[c] = Array(this.moduleCount);
                    for (var e = 0; e < this.moduleCount; e++) this.modules[c][e] = null
                }
                this.setupPositionProbePattern(0, 0),
                this.setupPositionProbePattern(this.moduleCount - 7, 0),
                this.setupPositionProbePattern(0, this.moduleCount - 7),
                this.setupPositionAdjustPattern(),
                this.setupTimingPattern(),
                this.setupTypeInfo(a, b),
                7 <= this.typeNumber && this.setupTypeNumber(a),
                null == this.dataCache && (this.dataCache = d.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
                this.mapData(this.dataCache, b)
            },
            setupPositionProbePattern: function (a, b) {
                for (var c = -1; 7 >= c; c++) if (!(-1 >= a + c || this.moduleCount <= a + c)) for (var d = -1; 7 >= d; d++) -1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1)
            },
            getBestMaskPattern: function () {
                for (var a = 0,
                b = 0,
                c = 0; 8 > c; c++) {
                    this.makeImpl(!0, c);
                    var d = i.getLostPoint(this); (0 == c || a > d) && (a = d, b = c)
                }
                return b
            },
            createMovieClip: function (a, b, c) {
                for (a = a.createEmptyMovieClip(b, c), this.make(), b = 0; b < this.modules.length; b++) for (var c = 1 * b,
                d = 0; d < this.modules[b].length; d++) {
                    var e = 1 * d;
                    this.modules[b][d] && (a.beginFill(0, 100), a.moveTo(e, c), a.lineTo(e + 1, c), a.lineTo(e + 1, c + 1), a.lineTo(e, c + 1), a.endFill())
                }
                return a
            },
            setupTimingPattern: function () {
                for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            },
            setupPositionAdjustPattern: function () {
                for (var a = i.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++) for (var c = 0; c < a.length; c++) {
                    var d = a[b],
                    e = a[c];
                    if (null == this.modules[d][e]) for (var f = -2; 2 >= f; f++) for (var g = -2; 2 >= g; g++) this.modules[d + f][e + g] = -2 == f || 2 == f || -2 == g || 2 == g || 0 == f && 0 == g ? !0 : !1
                }
            },
            setupTypeNumber: function (a) {
                for (var b = i.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
                    var d = !a && 1 == (b >> c & 1);
                    this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d
                }
                for (c = 0; 18 > c; c++) d = !a && 1 == (b >> c & 1),
                this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
            },
            setupTypeInfo: function (a, b) {
                for (var c = i.getBCHTypeInfo(this.errorCorrectLevel << 3 | b), d = 0; 15 > d; d++) {
                    var e = !a && 1 == (c >> d & 1);
                    6 > d ? this.modules[d][8] = e : 8 > d ? this.modules[d + 1][8] = e : this.modules[this.moduleCount - 15 + d][8] = e
                }
                for (d = 0; 15 > d; d++) e = !a && 1 == (c >> d & 1),
                8 > d ? this.modules[8][this.moduleCount - d - 1] = e : 9 > d ? this.modules[8][15 - d - 1 + 1] = e : this.modules[8][15 - d - 1] = e;
                this.modules[this.moduleCount - 8][8] = !a
            },
            mapData: function (a, b) {
                for (var c = -1,
                d = this.moduleCount - 1,
                e = 7,
                f = 0,
                g = this.moduleCount - 1; g > 0; g -= 2) for (6 == g && g--; ;) {
                    for (var h = 0; 2 > h; h++) if (null == this.modules[d][g - h]) {
                        var j = !1;
                        f < a.length && (j = 1 == (a[f] >>> e & 1)),
                        i.getMask(b, d, g - h) && (j = !j),
                        this.modules[d][g - h] = j,
                        e--,
                        -1 == e && (f++, e = 7)
                    }
                    if (d += c, 0 > d || this.moduleCount <= d) {
                        d -= c,
                        c = -c;
                        break
                    }
                }
            }
        },
        d.PAD0 = 236,
        d.PAD1 = 17,
        d.createData = function (a, b, c) {
            for (var b = f.getRSBlocks(a, b), e = new g, h = 0; h < c.length; h++) {
                var j = c[h];
                e.put(j.mode, 4),
                e.put(j.getLength(), i.getLengthInBits(j.mode, a)),
                j.write(e)
            }
            for (h = a = 0; h < b.length; h++) a += b[h].dataCount;
            if (e.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + e.getLengthInBits() + ">" + 8 * a + ")");
            for (e.getLengthInBits() + 4 <= 8 * a && e.put(0, 4) ; 0 != e.getLengthInBits() % 8;) e.putBit(!1);
            for (; !(e.getLengthInBits() >= 8 * a) && (e.put(d.PAD0, 8), !(e.getLengthInBits() >= 8 * a)) ;) e.put(d.PAD1, 8);
            return d.createBytes(e, b)
        },
        d.createBytes = function (a, b) {
            for (var c = 0,
            d = 0,
            f = 0,
            g = Array(b.length), h = Array(b.length), j = 0; j < b.length; j++) {
                var k = b[j].dataCount,
                l = b[j].totalCount - k,
                d = Math.max(d, k),
                f = Math.max(f, l);
                g[j] = Array(k);
                for (var m = 0; m < g[j].length; m++) g[j][m] = 255 & a.buffer[m + c];
                for (c += k, m = i.getErrorCorrectPolynomial(l), k = new e(g[j], m.getLength() - 1).mod(m), h[j] = Array(m.getLength() - 1), m = 0; m < h[j].length; m++) l = m + k.getLength() - h[j].length,
                h[j][m] = l >= 0 ? k.get(l) : 0
            }
            for (m = j = 0; m < b.length; m++) j += b[m].totalCount;
            for (c = Array(j), m = k = 0; d > m; m++) for (j = 0; j < b.length; j++) m < g[j].length && (c[k++] = g[j][m]);
            for (m = 0; f > m; m++) for (j = 0; j < b.length; j++) m < h[j].length && (c[k++] = h[j][m]);
            return c
        },
        h = 4;
        for (var i = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (a) {
                for (var b = a << 10; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G15) ;) b ^= i.G15 << i.getBCHDigit(b) - i.getBCHDigit(i.G15);
                return (a << 10 | b) ^ i.G15_MASK
        },
            getBCHTypeNumber: function (a) {
                for (var b = a << 12; 0 <= i.getBCHDigit(b) - i.getBCHDigit(i.G18) ;) b ^= i.G18 << i.getBCHDigit(b) - i.getBCHDigit(i.G18);
                return a << 12 | b
        },
            getBCHDigit: function (a) {
                for (var b = 0; 0 != a;) b++,
                a >>>= 1;
                return b
        },
            getPatternPosition: function (a) {
                return i.PATTERN_POSITION_TABLE[a - 1]
        },
            getMask: function (a, b, c) {
                switch (a) {
                case 0:
                    return 0 == (b + c) % 2;
                case 1:
                    return 0 == b % 2;
                case 2:
                    return 0 == c % 3;
                case 3:
                    return 0 == (b + c) % 3;
                case 4:
                    return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2;
                case 5:
                    return 0 == b * c % 2 + b * c % 3;
                case 6:
                    return 0 == (b * c % 2 + b * c % 3) % 2;
                case 7:
                    return 0 == (b * c % 3 + (b + c) % 2) % 2;
                default:
                    throw Error("bad maskPattern:" + a)
        }
        },
            getErrorCorrectPolynomial: function (a) {
                for (var b = new e([1], 0), c = 0; a > c; c++) b = b.multiply(new e([1, j.gexp(c)], 0));
                return b
        },
            getLengthInBits: function (a, b) {
                if (b >= 1 && 10 > b) switch (a) {
                case 1:
                    return 10;
                case 2:
                    return 9;
                case h:
                    return 8;
                case 8:
                    return 8;
                default:
                    throw Error("mode:" + a)
        } else if (27 > b) switch (a) {
                case 1:
                    return 12;
                case 2:
                    return 11;
                case h:
                    return 16;
                case 8:
                    return 10;
                default:
                    throw Error("mode:" + a)
        } else {
                    if (!(41 > b)) throw Error("type:" + b);
                    switch (a) {
                    case 1:
                        return 14;
                    case 2:
                        return 13;
                    case h:
                        return 16;
                    case 8:
                        return 12;
                    default:
                        throw Error("mode:" + a)
        }
        }
        },
            getLostPoint: function (a) {
                for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++) for (var e = 0; b > e; e++) {
                    for (var f = 0,
                    g = a.isDark(d, e), h = -1; 1 >= h; h++) if (!(0 > d + h || d + h >= b)) for (var i = -1; 1 >= i; i++) 0 > e + i || e + i >= b || 0 == h && 0 == i || g == a.isDark(d + h, e + i) && f++;
                    f > 5 && (c += 3 + f - 5)
        }
                for (d = 0; b - 1 > d; d++) for (e = 0; b - 1 > e; e++) f = 0,
                a.isDark(d, e) && f++,
                a.isDark(d + 1, e) && f++,
                a.isDark(d, e + 1) && f++,
                a.isDark(d + 1, e + 1) && f++,
                (0 == f || 4 == f) && (c += 3);
                for (d = 0; b > d; d++) for (e = 0; b - 6 > e; e++) a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
                for (e = 0; b > e; e++) for (d = 0; b - 6 > d; d++) a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
                for (e = f = 0; b > e; e++) for (d = 0; b > d; d++) a.isDark(d, e) && f++;
                return a = Math.abs(100 * f / b / b - 50) / 5,
                c + 10 * a
        }
        },
        j = {
            glog: function (a) {
                if (1 > a) throw Error("glog(" + a + ")");
                return j.LOG_TABLE[a]
        },
            gexp: function (a) {
                for (; 0 > a;) a += 255;
                for (; a >= 256;) a -= 255;
                return j.EXP_TABLE[a]
        },
            EXP_TABLE: Array(256),
            LOG_TABLE: Array(256)
        },
        k = 0; 8 > k; k++) j.EXP_TABLE[k] = 1 << k;
        for (k = 8; 256 > k; k++) j.EXP_TABLE[k] = j.EXP_TABLE[k - 4] ^ j.EXP_TABLE[k - 5] ^ j.EXP_TABLE[k - 6] ^ j.EXP_TABLE[k - 8];
        for (k = 0; 255 > k; k++) j.LOG_TABLE[j.EXP_TABLE[k]] = k;
        return e.prototype = {
            get: function (a) {
                return this.num[a]
            },
            getLength: function () {
                return this.num.length
            },
            multiply: function (a) {
                for (var b = Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength() ; c++) for (var d = 0; d < a.getLength() ; d++) b[c + d] ^= j.gexp(j.glog(this.get(c)) + j.glog(a.get(d)));
                return new e(b, 0)
            },
            mod: function (a) {
                if (0 > this.getLength() - a.getLength()) return this;
                for (var b = j.glog(this.get(0)) - j.glog(a.get(0)), c = Array(this.getLength()), d = 0; d < this.getLength() ; d++) c[d] = this.get(d);
                for (d = 0; d < a.getLength() ; d++) c[d] ^= j.gexp(j.glog(a.get(d)) + b);
                return new e(c, 0).mod(a)
            }
        },
        f.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
        f.getRSBlocks = function (a, b) {
            var c = f.getRsBlockTable(a, b);
            if (void 0 == c) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
            for (var d = c.length / 3,
            e = [], g = 0; d > g; g++) for (var h = c[3 * g + 0], i = c[3 * g + 1], j = c[3 * g + 2], k = 0; h > k; k++) e.push(new f(i, j));
            return e
        },
        f.getRsBlockTable = function (a, b) {
            switch (b) {
                case 1:
                    return f.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                case 0:
                    return f.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                case 3:
                    return f.RS_BLOCK_TABLE[4 * (a - 1) + 2];
                case 2:
                    return f.RS_BLOCK_TABLE[4 * (a - 1) + 3]
            }
        },
        g.prototype = {
            get: function (a) {
                return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
            },
            put: function (a, b) {
                for (var c = 0; b > c; c++) this.putBit(1 == (a >>> b - c - 1 & 1))
            },
            getLengthInBits: function () {
                return this.length
            },
            putBit: function (a) {
                var b = Math.floor(this.length / 8);
                this.buffer.length <= b && this.buffer.push(0),
                a && (this.buffer[b] |= 128 >>> this.length % 8),
                this.length++
            }
        },
        "string" == typeof b && (b = {
            text: b
        }),
        b = a.extend({},
        {
            render: "canvas",
            width: 256,
            height: 256,
            typeNumber: -1,
            correctLevel: 2,
            background: "#ffffff",
            foreground: "#000000"
        },
        b),
        this.each(function () {
            var c;
            if ("canvas" == b.render) {
                c = new d(b.typeNumber, b.correctLevel),
                c.addData(b.text),
                c.make();
                var e = document.createElement("canvas");
                e.width = b.width,
                e.height = b.height;
                for (var f = e.getContext("2d"), g = b.width / c.getModuleCount(), h = b.height / c.getModuleCount(), i = 0; i < c.getModuleCount() ; i++) for (var j = 0; j < c.getModuleCount() ; j++) {
                    f.fillStyle = c.isDark(i, j) ? b.foreground : b.background;
                    var k = Math.ceil((j + 1) * g) - Math.floor(j * g),
                    l = Math.ceil((i + 1) * g) - Math.floor(i * g);
                    f.fillRect(Math.round(j * g), Math.round(i * h), k, l)
                }
            } else for (c = new d(b.typeNumber, b.correctLevel), c.addData(b.text), c.make(), e = a("<table></table>").css("width", b.width + "px").css("height", b.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", b.background), f = b.width / c.getModuleCount(), g = b.height / c.getModuleCount(), h = 0; h < c.getModuleCount() ; h++) for (i = a("<tr></tr>").css("height", g + "px").appendTo(e), j = 0; j < c.getModuleCount() ; j++) a("<td></td>").css("width", f + "px").css("background-color", c.isDark(h, j) ? b.foreground : b.background).appendTo(i);
            c = e,
            jQuery(c).appendTo(this)
        })
    }
}(jQuery),
function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        b.Clipboard = a()
    }
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND",
                    j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports,
                function (a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                },
                k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require,
        g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function (a, b, c) {
            var d = a("closest"),
            e = a("component-event"),
            f = ["focus", "blur"];
            c.bind = function (a, b, c, g, h) {
                return -1 !== f.indexOf(c) && (h = !0),
                e.bind(a, c,
                function (c) {
                    var e = c.target || c.srcElement;
                    c.delegateTarget = d(e, b, !0, a),
                    c.delegateTarget && g.call(a, c)
                },
                h)
            },
            c.unbind = function (a, b, c, d) {
                -1 !== f.indexOf(b) && (d = !0),
                    e.unbind(a, b, c, d)
            }
        },
        {
            closest: 2,
            "component-event": 4
        }],
        2: [function (a, b, c) {
            var d = a("matches-selector");
            b.exports = function (a, b, c) {
                for (var e = c ? a : a.parentNode; e && e !== document;) {
                    if (d(e, b)) return e;
                    e = e.parentNode
                }
            }
        },
        {
            "matches-selector": 3
        }],
        3: [function (a, b, c) {
            function d(a, b) {
                if (f) return f.call(a, b);
                for (var c = a.parentNode.querySelectorAll(b), d = 0; d < c.length; ++d) if (c[d] == a) return !0;
                return !1
            }
            var e = Element.prototype,
            f = e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
            b.exports = d
        },
        {}],
        4: [function (a, b, c) {
            var d = window.addEventListener ? "addEventListener" : "attachEvent",
            e = window.removeEventListener ? "removeEventListener" : "detachEvent",
            f = "addEventListener" !== d ? "on" : "";
            c.bind = function (a, b, c, e) {
                return a[d](f + b, c, e || !1),
                c
            },
            c.unbind = function (a, b, c, d) {
                return a[e](f + b, c, d || !1),
                c
            }
        },
        {}],
        5: [function (a, b, c) {
            function d() { }
            d.prototype = {
                on: function (a, b, c) {
                    var d = this.e || (this.e = {});
                    return (d[a] || (d[a] = [])).push({
                        fn: b,
                        ctx: c
                    }),
                    this
                },
                once: function (a, b, c) {
                    var d = this,
                    e = function () {
                        d.off(a, e),
                        b.apply(c, arguments)
                    };
                    return this.on(a, e, c)
                },
                emit: function (a) {
                    var b = [].slice.call(arguments, 1),
                    c = ((this.e || (this.e = {}))[a] || []).slice(),
                    d = 0,
                    e = c.length;
                    for (d; e > d; d++) c[d].fn.apply(c[d].ctx, b);
                    return this
                },
                off: function (a, b) {
                    var c = this.e || (this.e = {}),
                    d = c[a],
                    e = [];
                    if (d && b) for (var f = 0,
                    g = d.length; g > f; f++) d[f].fn !== b && e.push(d[f]);
                    return e.length ? c[a] = e : delete c[a],
                    this
                }
            },
            b.exports = d
        },
        {}],
        6: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            c.__esModule = !0;
            var e = function () {
                function a(a, b) {
                    for (var c = 0; c < b.length; c++) {
                        var d = b[c];
                        d.enumerable = d.enumerable || !1,
                        d.configurable = !0,
                        "value" in d && (d.writable = !0),
                        Object.defineProperty(a, d.key, d)
                    }
                }
                return function (b, c, d) {
                    return c && a(b.prototype, c),
                    d && a(b, d),
                    b
                }
            }(),
            f = function () {
                function a(b) {
                    d(this, a),
                    this.resolveOptions(b),
                    this.initSelection()
                }
                return a.prototype.resolveOptions = function () {
                    var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    this.action = a.action,
                    this.emitter = a.emitter,
                    this.target = a.target,
                    this.text = a.text,
                    this.trigger = a.trigger,
                    this.selectedText = ""
                },
                a.prototype.initSelection = function () {
                    if (this.text && this.target) throw new Error('Multiple attributes declared, use either "target" or "text"');
                    if (this.text) this.selectFake();
                    else {
                        if (!this.target) throw new Error('Missing required attributes, use either "target" or "text"');
                        this.selectTarget()
                    }
                },
                a.prototype.selectFake = function () {
                    var a = this;
                    this.removeFake(),
                    this.fakeHandler = document.body.addEventListener("click",
                    function () {
                        return a.removeFake()
                    }),
                    this.fakeElem = document.createElement("textarea"),
                    this.fakeElem.style.position = "absolute",
                    this.fakeElem.style.left = "-9999px",
                    this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px",
                    this.fakeElem.setAttribute("readonly", ""),
                    this.fakeElem.value = this.text,
                    this.selectedText = this.text,
                    document.body.appendChild(this.fakeElem),
                    this.fakeElem.select(),
                    this.copyText()
                },
                a.prototype.removeFake = function () {
                    this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null),
                    this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                },
                a.prototype.selectTarget = function () {
                    if ("INPUT" === this.target.nodeName || "TEXTAREA" === this.target.nodeName) this.target.select(),
                    this.selectedText = this.target.value;
                    else {
                        var a = document.createRange(),
                        b = window.getSelection();
                        b.removeAllRanges(),
                        a.selectNodeContents(this.target),
                        b.addRange(a),
                        this.selectedText = b.toString()
                    }
                    this.copyText()
                },
                a.prototype.copyText = function () {
                    var a = void 0;
                    try {
                        a = document.execCommand(this.action)
                    } catch (b) {
                        a = !1
                    }
                    this.handleResult(a)
                },
                a.prototype.handleResult = function (a) {
                    a ? this.emitter.emit("success", {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                    }) : this.emitter.emit("error", {
                        action: this.action,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                    })
                },
                a.prototype.clearSelection = function () {
                    this.target && this.target.blur(),
                    window.getSelection().removeAllRanges()
                },
                a.prototype.destroy = function () {
                    this.removeFake()
                },
                e(a, [{
                    key: "action",
                    set: function () {
                        var a = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                        if (this._action = a, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                    },
                    get: function () {
                        return this._action
                    }
                },
                {
                    key: "target",
                    set: function (a) {
                        if (void 0 !== a) {
                            if (!a || "object" != typeof a || 1 !== a.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                            this._target = a
                        }
                    },
                    get: function () {
                        return this._target
                    }
                }]),
                a
            }();
            c["default"] = f,
            b.exports = c["default"]
        },
        {}],
        7: [function (a, b, c) {
            "use strict";
            function d(a) {
                return a && a.__esModule ? a : {
                    "default": a
                }
            }
            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            function f(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }
            function g(a, b) {
                var c = "data-clipboard-" + a;
                if (b.hasAttribute(c)) return b.getAttribute(c)
            }
            c.__esModule = !0;
            var h = a("./clipboard-action"),
            i = d(h),
            j = a("delegate-events"),
            k = d(j),
            l = a("tiny-emitter"),
            m = d(l),
            n = function (a) {
                function b(c, d) {
                    e(this, b),
                    a.call(this),
                    this.resolveOptions(d),
                    this.delegateClick(c)
                }
                return f(b, a),
                b.prototype.resolveOptions = function () {
                    var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    this.action = "function" == typeof a.action ? a.action : this.defaultAction,
                    this.target = "function" == typeof a.target ? a.target : this.defaultTarget,
                    this.text = "function" == typeof a.text ? a.text : this.defaultText
                },
                b.prototype.delegateClick = function (a) {
                    var b = this;
                    this.binding = k["default"].bind(document.body, a, "click",
                    function (a) {
                        return b.onClick(a)
                    })
                },
                b.prototype.undelegateClick = function () {
                    k["default"].unbind(document.body, "click", this.binding)
                },
                b.prototype.onClick = function (a) {
                    this.clipboardAction && (this.clipboardAction = null),
                    this.clipboardAction = new i["default"]({
                        action: this.action(a.delegateTarget),
                        target: this.target(a.delegateTarget),
                        text: this.text(a.delegateTarget),
                        trigger: a.delegateTarget,
                        emitter: this
                    })
                },
                b.prototype.defaultAction = function (a) {
                    return g("action", a)
                },
                b.prototype.defaultTarget = function (a) {
                    var b = g("target", a);
                    return b ? document.querySelector(b) : void 0
                },
                b.prototype.defaultText = function (a) {
                    return g("text", a)
                },
                b.prototype.destroy = function () {
                    this.undelegateClick(),
                    this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                },
                b
            }(m["default"]);
            c["default"] = n,
            b.exports = c["default"]
        },
        {
            "./clipboard-action": 6,
            "delegate-events": 1,
            "tiny-emitter": 5
        }]
    },
    {},
    [7])(7)
}),
function (a) {
    a.fn.extend({
        slimScroll: function (b) {
            var c = {
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            },
            d = a.extend(c, b);
            return this.each(function () {
                function c(b) {
                    var b = b || window.event,
                    c = 0;
                    b.wheelDelta && (c = -b.wheelDelta / 120),
                    b.detail && (c = b.detail / 3);
                    var f = b.target || b.srcTarget || b.srcElement;
                    a(f).closest("." + d.wrapperClass).is(v.parent()) && e(c, !0),
                    b.preventDefault && !u && b.preventDefault(),
                    u || (b.returnValue = !1)
                }
                function e(a, b, c) {
                    u = !1;
                    var e = a,
                    f = v.outerHeight() - A.outerHeight();
                    if (b && (e = parseInt(A.css("top")) + a * parseInt(d.wheelStep) / 100 * A.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), A.css({
                        top: e + "px"
                    })), p = parseInt(A.css("top")) / (v.outerHeight() - A.outerHeight()), e = p * (v[0].scrollHeight - v.outerHeight()), c) {
                        e = a;
                        var g = e / v[0].scrollHeight * v.outerHeight();
                        g = Math.min(Math.max(g, 0), f),
                        A.css({
                            top: g + "px"
                        })
                    }
                    v.scrollTop(e),
                    v.trigger("slimscrolling", ~~e),
                    h(),
                    i()
                }
                function f(a) {
                    window.addEventListener ? (a.addEventListener("DOMMouseScroll", c, !1), a.addEventListener("mousewheel", c, !1)) : document.attachEvent("onmousewheel", c)
                }
                function g() {
                    o = Math.max(v.outerHeight() / v[0].scrollHeight * v.outerHeight(), s),
                    A.css({
                        height: o + "px"
                    });
                    var a = o == v.outerHeight() ? "none" : "block";
                    A.css({
                        display: a
                    })
                }
                function h() {
                    if (g(), clearTimeout(m), p == ~~p) {
                        if (u = d.allowPageScroll, q != p) {
                            var a = 0 == ~~p ? "top" : "bottom";
                            v.trigger("slimscroll", a)
                        }
                    } else u = !1;
                    return q = p,
                    o >= v.outerHeight() ? void (u = !0) : (A.stop(!0, !0).fadeIn("fast"), void (d.railVisible && z.stop(!0, !0).fadeIn("fast")))
                }
                function i() {
                    d.alwaysVisible || (m = setTimeout(function () {
                        d.disableFadeOut && j || k || l || (A.fadeOut("slow"), z.fadeOut("slow"))
                    },
                    1e3))
                }
                var j, k, l, m, n, o, p, q, r = "<div></div>",
                s = 30,
                u = !1,
                v = a(this);
                if (v.parent().hasClass(d.wrapperClass)) {
                    var w = v.scrollTop();
                    if (A = v.closest("." + d.barClass), z = v.closest("." + d.railClass), g(), a.isPlainObject(b)) {
                        if ("height" in b && "auto" == b.height) {
                            v.parent().css("height", "auto"),
                            v.css("height", "auto");
                            var x = v.parent().parent().height();
                            v.parent().css("height", x),
                            v.css("height", x)
                        }
                        if ("scrollTo" in b) w = parseInt(d.scrollTo);
                        else if ("scrollBy" in b) w += parseInt(d.scrollBy);
                        else if ("destroy" in b) return A.remove(),
                        z.remove(),
                        void v.unwrap();
                        e(w, !1, !0)
                    }
                } else if (!(a.isPlainObject(b) && "destroy" in b)) {
                    d.height = "auto" == d.height ? v.parent().height() : d.height;
                    var y = a(r).addClass(d.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: d.width,
                        height: d.height
                    });
                    v.css({
                        overflow: "hidden",
                        width: d.width,
                        height: d.height
                    });
                    var z = a(r).addClass(d.railClass).css({
                        width: d.size,
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: d.alwaysVisible && d.railVisible ? "block" : "none",
                        "border-radius": d.railBorderRadius,
                        background: d.railColor,
                        opacity: d.railOpacity,
                        zIndex: 90
                    }),
                    A = a(r).addClass(d.barClass).css({
                        background: d.color,
                        width: d.size,
                        position: "absolute",
                        top: 0,
                        opacity: d.opacity,
                        display: d.alwaysVisible ? "block" : "none",
                        "border-radius": d.borderRadius,
                        BorderRadius: d.borderRadius,
                        MozBorderRadius: d.borderRadius,
                        WebkitBorderRadius: d.borderRadius,
                        zIndex: 99
                    }),
                    B = "right" == d.position ? {
                        right: d.distance
                    } : {
                        left: d.distance
                    };
                    z.css(B),
                    A.css(B),
                    v.wrap(y),
                    v.parent().append(A),
                    v.parent().append(z),
                    d.railDraggable && A.bind("mousedown",
                    function (b) {
                        var c = a(document);
                        return l = !0,
                        t = parseFloat(A.css("top")),
                        pageY = b.pageY,
                        c.bind("mousemove.slimscroll",
                        function (a) {
                            currTop = t + a.pageY - pageY,
                            A.css("top", currTop),
                            e(0, A.position().top, !1)
                        }),
                        c.bind("mouseup.slimscroll",
                        function (a) {
                            l = !1,
                            i(),
                            c.unbind(".slimscroll")
                        }),
                        !1
                    }).bind("selectstart.slimscroll",
                    function (a) {
                        return a.stopPropagation(),
                        a.preventDefault(),
                        !1
                    }),
                    z.hover(function () {
                        h()
                    },
                    function () {
                        i()
                    }),
                    A.hover(function () {
                        k = !0
                    },
                    function () {
                        k = !1
                    }),
                    v.hover(function () {
                        j = !0,
                        h(),
                        i()
                    },
                    function () {
                        j = !1,
                        i()
                    }),
                    v.bind("touchstart",
                    function (a, b) {
                        a.originalEvent.touches.length && (n = a.originalEvent.touches[0].pageY)
                    }),
                    v.bind("touchmove",
                    function (a) {
                        if (u || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
                            var b = (n - a.originalEvent.touches[0].pageY) / d.touchScrollStep;
                            e(b, !0),
                            n = a.originalEvent.touches[0].pageY
                        }
                    }),
                    g(),
                    "bottom" === d.start ? (A.css({
                        top: v.outerHeight() - A.outerHeight()
                    }), e(0, !0)) : "top" !== d.start && (e(a(d.start).position().top, null, !0), d.alwaysVisible || A.hide()),
                    f(this)
                }
            }),
            this
        }
    }),
    a.fn.extend({
        slimscroll: a.fn.slimScroll
    })
}(jQuery),
function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";
    function b(b) {
        return !b.nodeName || -1 !== a.inArray(b.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])
    }
    function c(b) {
        return a.isFunction(b) || a.isPlainObject(b) ? b : {
            top: b,
            left: b
        }
    }
    var d = a.scrollTo = function (b, c, d) {
        return a(window).scrollTo(b, c, d)
    };
    return d.defaults = {
        axis: "xy",
        duration: 0,
        limit: !0
    },
    a.fn.scrollTo = function (e, f, g) {
        "object" == typeof f && (g = f, f = 0),
        "function" == typeof g && (g = {
            onAfter: g
        }),
        "max" === e && (e = 9e9),
        g = a.extend({},
        d.defaults, g),
        f = f || g.duration;
        var h = g.queue && g.axis.length > 1;
        return h && (f /= 2),
        g.offset = c(g.offset),
        g.over = c(g.over),
        this.each(function () {
            function i(b) {
                var c = a.extend({},
                g, {
                    queue: !0,
                    duration: f,
                    complete: b &&
                    function () {
                        b.call(l, n, g)
                    }
                });
                m.animate(o, c)
            }
            if (null !== e) {
                var j, k = b(this),
                l = k ? this.contentWindow || window : this,
                m = a(l),
                n = e,
                o = {};
                switch (typeof n) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(n)) {
                            n = c(n);
                            break
                        }
                        n = k ? a(n) : a(n, l);
                    case "object":
                        if (0 === n.length) return; (n.is || n.style) && (j = (n = a(n)).offset())
                }
                var p = a.isFunction(g.offset) && g.offset(l, n) || g.offset;
                a.each(g.axis.split(""),
                function (a, b) {
                    var c = "x" === b ? "Left" : "Top",
                    e = c.toLowerCase(),
                    f = "scroll" + c,
                    q = m[f](),
                    r = d.max(l, b);
                    if (j) o[f] = j[e] + (k ? 0 : q - m.offset()[e]),
                    g.margin && (o[f] -= parseInt(n.css("margin" + c), 10) || 0, o[f] -= parseInt(n.css("border" + c + "Width"), 10) || 0),
                    o[f] += p[e] || 0,
                    g.over[e] && (o[f] += n["x" === b ? "width" : "height"]() * g.over[e]);
                    else {
                        var s = n[e];
                        o[f] = s.slice && "%" === s.slice(-1) ? parseFloat(s) / 100 * r : s
                    }
                    g.limit && /^\d+$/.test(o[f]) && (o[f] = o[f] <= 0 ? 0 : Math.min(o[f], r)),
                    !a && g.axis.length > 1 && (q === o[f] ? o = {} : h && (i(g.onAfterFirst), o = {}))
                }),
                i(g.onAfter)
            }
        })
    },
    d.max = function (c, d) {
        var e = "x" === d ? "Width" : "Height",
        f = "scroll" + e;
        if (!b(c)) return c[f] - a(c)[e.toLowerCase()]();
        var g = "client" + e,
        h = c.ownerDocument || c.document,
        i = h.documentElement,
        j = h.body;
        return Math.max(i[f], j[f]) - Math.min(i[g], j[g])
    },
    a.Tween.propHooks.scrollLeft = a.Tween.propHooks.scrollTop = {
        get: function (b) {
            return a(b.elem)[b.prop]()
        },
        set: function (b) {
            var c = this.get(b);
            if (b.options.interrupt && b._last && b._last !== c) return a(b.elem).stop();
            var d = Math.round(b.now);
            c !== d && (a(b.elem)[b.prop](d), b._last = this.get(b))
        }
    },
    d
}),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158,
        g = 0,
        h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
        g = 0,
        h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
        g = 0,
        h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158),
        d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158),
        d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158),
        (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
}),
function (a) {
    "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define("amap.animate", a()) : (window.amap = window.amap || {},
    amap.animateConfig = a())
}(function () {
    var a = {
        bounce: !0,
        shake: !0,
        bounceIn: !0,
        bounceInDown: !0,
        bounceInLeft: !0,
        bounceInRight: !0,
        bounceInUp: !0,
        bounceOut: !0,
        fadeInDown: !0,
        fadeInDownBig: !0,
        fadeInLeft: !0,
        fadeInLeftBig: !0,
        fadeInRight: !0,
        fadeInRightBig: !0,
        fadeInUp: !0,
        fadeInUpBig: !0,
        fadeOutDown: !0,
        fadeOutDownBig: !0,
        fadeOutLeft: !0,
        fadeOutLeftBig: !0,
        fadeOutRight: !0,
        fadeOutRightBig: !0,
        fadeOutUp: !0,
        fadeOutUpBig: !0,
        zoomIn: !0,
        zoomOut: !0
    },
    b = function () {
        var a = document.body,
        b = !1,
        c = "animation",
        d = "",
        e = "Webkit Moz O ms Khtml".split(" "),
        f = "";
        if (a.style.animationName && (b = !0), b === !1) for (var g = 0; g < e.length; g++) if (void 0 !== a.style[e[g] + "AnimationName"]) {
            f = e[g],
            c = f + "Animation",
            d = "-" + f.toLowerCase() + "-",
            b = !0;
            break
        }
        return b
    }(),
    c = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    return $.each(a,
    function (a, d) {
        $.fn[a] = function (a) {
            return function (d, e) {
                var f = $(this),
                g = f.is(":visible"),
                h = a.indexOf("Out") >= 0,
                i = a.indexOf("In") >= 0,
                j = ["animated", a].join(" "); (g || !h) && (d && d.call(this), i && f.show(), b ? f.addClass(j).one(c,
                function () {
                    f.removeClass(j),
                    h && f.hide(),
                    e && e.call(this)
                }) : (h && f.hide(), e && e.call(this)))
            }
        }(a)
    }),
    a
}),
function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports && "function" == typeof require ? require("jquery") : jQuery)
}(function (a) {
    "use strict";
    function b(c, d) {
        var e = function () { },
        f = this,
        g = {
            ajaxSettings: {},
            autoSelectFirst: !1,
            appendTo: document.body,
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            width: "auto",
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: b.formatResult,
            delimiter: null,
            zIndex: 9999,
            type: "GET",
            noCache: !1,
            onSearchStart: e,
            onSearchComplete: e,
            onSearchError: e,
            preserveInput: !1,
            containerClass: "autocomplete-suggestions",
            tabDisabled: !1,
            dataType: "text",
            currentRequest: null,
            triggerSelectOnValidInput: !0,
            preventBadQueries: !0,
            lookupFilter: function (a, b, c) {
                return -1 !== a.value.toLowerCase().indexOf(c)
            },
            paramName: "query",
            transformResult: function (b) {
                return "string" == typeof b ? a.parseJSON(b) : b
            },
            showNoSuggestionNotice: !1,
            noSuggestionNotice: "No results",
            orientation: "bottom",
            forceFixPosition: !1
        };
        f.element = c,
        f.el = a(c),
        f.suggestions = [],
        f.badQueries = [],
        f.selectedIndex = -1,
        f.currentValue = f.element.value,
        f.intervalId = 0,
        f.cachedResponse = {},
        f.onChangeInterval = null,
        f.onChange = null,
        f.isLocal = !1,
        f.suggestionsContainer = null,
        f.noSuggestionsContainer = null,
        f.options = a.extend({},
        g, d),
        f.classes = {
            selected: "autocomplete-selected",
            suggestion: "autocomplete-suggestion"
        },
        f.hint = null,
        f.hintValue = "",
        f.selection = null,
        f.initialize(),
        f.setOptions(d)
    }
    var c = function () {
        return {
            escapeRegExChars: function (a) {
                return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            },
            createNode: function (a) {
                var b = document.createElement("div");
                return b.className = a,
                b.style.position = "absolute",
                b.style.display = "none",
                b
            }
        }
    }(),
    d = {
        ESC: 27,
        TAB: 9,
        RETURN: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    },
    e = 0,
    f = "",
    g = "";
    void 0 != typeof document.hidden ? (f = "visibilitychange", g = "hidden") : void 0 != typeof document.mozHidden ? (f = "mozvisibilitychange", g = "mozHidden") : void 0 != typeof document.webkitHidden && (f = "webkitvisibilitychange", g = "webkitHidden"),
    a(document).on(f,
    function (a) {
        return document[g] ? !1 : (e = 1, void setTimeout(function () {
            e = 0
        },
        200))
    }),
    b.utils = c,
    a.Autocomplete = b,
    b.formatResult = function (a, b) {
        var d = a.value,
        e = "(" + c.escapeRegExChars(b) + ")";
        return d.replace(new RegExp(e, "gi"), "<strong>$1</strong>")
    },
    b.prototype = {
        killerFn: null,
        initialize: function () {
            var c, d = this,
            e = "." + d.classes.suggestion,
            f = d.classes.selected,
            g = d.options;
            d.element.setAttribute("autocomplete", "off"),
            d.killerFn = function (b) {
                0 === a(b.target).closest("." + d.options.containerClass).length && (d.killSuggestions(), d.disableKillerFn())
            },
            d.noSuggestionsContainer = a('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),
            d.suggestionsContainer = b.utils.createNode(g.containerClass),
            c = a(d.suggestionsContainer),
            c.appendTo(g.appendTo),
            "auto" !== g.width && void 0 === g.minWidth ? c.width(g.width) : c.css("min-width", g.minWidth),
            c.on("mouseover.autocomplete", e,
            function () {
                d.activate(a(this).data("index"))
            }),
            c.on("mouseout.autocomplete",
            function () {
                d.selectedIndex = -1,
                c.children("." + f).removeClass(f)
            }),
            c.on("click.autocomplete", e,
            function () {
                d.select(a(this).data("index"))
            }),
            d.fixPositionCapture = function () {
                d.visible && d.fixPosition()
            },
            a(window).on("resize.autocomplete", d.fixPositionCapture),
            d.el.on("keydown.autocomplete",
            function (a) {
                d.onKeyPress(a)
            }),
            d.el.on("keyup.autocomplete",
            function (a) {
                d.onKeyUp(a)
            }),
            d.el.on("blur.autocomplete",
            function () {
                d.onBlur()
            }),
            d.el.on("focus.autocomplete, click.autocomplete",
            function () {
                setTimeout(function () {
                    d.onFocus()
                },
                100)
            }),
            d.el.on("change.autocomplete",
            function (a) {
                d.onKeyUp(a)
            }),
            d.el.on("input.autocomplete",
            function (a) {
                d.onKeyUp(a)
            })
        },
        onFocus: function () {
            if (1 != e) {
                var a = this;
                a.fixPosition(),
                a.options.minChars <= a.el.val().length
            }
        },
        onBlur: function () {
            this.enableKillerFn(),
            this.abortAjax()
        },
        abortAjax: function () {
            var a = this;
            a.currentRequest && (a.currentRequest.abort(), a.currentRequest = null)
        },
        setOptions: function (b) {
            var c = this,
            d = c.options;
            a.extend(d, b),
            c.isLocal = a.isArray(d.lookup),
            c.isLocal && (d.lookup = c.verifySuggestionsFormat(d.lookup)),
            d.orientation = c.validateOrientation(d.orientation, "bottom"),
            void 0 === d.minWidth ? a(c.suggestionsContainer).css({
                "max-height": d.maxHeight + "px",
                width: d.width + "px",
                "z-index": d.zIndex
            }) : a(c.suggestionsContainer).css({
                "max-height": d.maxHeight + "px",
                "min-width": d.minWidth + "px",
                "z-index": d.zIndex
            })
        },
        clearCache: function () {
            this.cachedResponse = {},
            this.badQueries = []
        },
        clear: function () {
            this.clearCache(),
            this.currentValue = "",
            this.suggestions = []
        },
        disable: function () {
            var a = this;
            a.disabled = !0,
            clearInterval(a.onChangeInterval),
            a.abortAjax()
        },
        enable: function () {
            this.disabled = !1
        },
        fixPosition: function () {
            var b = this,
            c = a(b.suggestionsContainer),
            d = c.parent().get(0);
            if (d === document.body || b.options.forceFixPosition) {
                var e = b.options.orientation,
                f = c.outerHeight(),
                g = b.el.outerHeight(),
                h = b.el.offset(),
                i = {
                    top: h.top + 1,
                    left: h.left,
                    borderTop: "none"
                };
                if ("auto" === e) {
                    var j = a(window).height(),
                    k = a(window).scrollTop(),
                    l = -k + h.top - f,
                    m = k + j - (h.top + g + f);
                    e = Math.max(l, m) === l ? "top" : "bottom"
                }
                if ("top" === e ? i.top += -f : i.top += g, d !== document.body) {
                    var n, o = c.css("opacity");
                    b.visible || c.css("opacity", 0).show(),
                    n = c.offsetParent().offset(),
                    i.top -= n.top,
                    i.left -= n.left,
                    b.visible || c.css("opacity", o).hide()
                }
                "auto" === b.options.width && void 0 === b.options.minWidth && (i.width = b.el.outerWidth() - 2 + "px"),
                c.css(i)
            }
        },
        enableKillerFn: function () {
            var b = this;
            a(document).on("click.autocomplete", b.killerFn)
        },
        disableKillerFn: function () {
            var b = this;
            a(document).off("click.autocomplete", b.killerFn)
        },
        killSuggestions: function () {
            var a = this;
            a.stopKillSuggestions(),
            a.intervalId = window.setInterval(function () {
                a.hide(),
                a.stopKillSuggestions()
            },
            50)
        },
        stopKillSuggestions: function () {
            window.clearInterval(this.intervalId)
        },
        isCursorAtEnd: function () {
            var a, b = this,
            c = b.el.val().length,
            d = b.element.selectionStart;
            return "number" == typeof d ? d === c : document.selection ? (a = document.selection.createRange(), a.moveStart("character", -c), c === a.text.length) : !0
        },
        onKeyPress: function (a) {
            var b = this;
            if (!b.disabled && !b.visible && a.which === d.DOWN && b.currentValue) return void b.suggest();
            if (!b.disabled && b.visible) {
                switch (a.which) {
                    case d.ESC:
                        b.el.val(b.currentValue),
                        b.hide();
                        break;
                    case d.RIGHT:
                        if (b.hint && b.options.onHint && b.isCursorAtEnd()) {
                            b.selectHint();
                            break
                        }
                        return;
                    case d.TAB:
                        if (b.hint && b.options.onHint) return void b.selectHint();
                        if (-1 === b.selectedIndex) return void b.hide();
                        if (b.select(b.selectedIndex), b.options.tabDisabled === !1) return;
                        break;
                    case d.RETURN:
                        if (-1 === b.selectedIndex) return void b.hide();
                        b.select(b.selectedIndex);
                        break;
                    case d.UP:
                        b.moveUp();
                        break;
                    case d.DOWN:
                        b.moveDown();
                        break;
                    default:
                        return
                }
                a.stopImmediatePropagation(),
                a.preventDefault()
            }
        },
        onKeyUp: function (a) {
            var b = this;
            if (!b.disabled) {
                switch (a.which) {
                    case d.UP:
                    case d.DOWN:
                        return
                }
                clearInterval(b.onChangeInterval),
                b.currentValue !== b.el.val() && (b.findBestHint(), b.options.deferRequestBy > 0 ? b.onChangeInterval = setInterval(function () {
                    b.onValueChange()
                },
                b.options.deferRequestBy) : b.onValueChange())
            }
        },
        onValueChange: function () {
            var b = this,
            c = b.options,
            d = b.el.val(),
            e = b.getQuery(d);
            return b.selection && b.currentValue !== e && (b.selection = null, (c.onInvalidateSelection || a.noop).call(b.element)),
            clearInterval(b.onChangeInterval),
            b.currentValue = d,
            b.selectedIndex = -1,
            c.triggerSelectOnValidInput && b.isExactMatch(e) ? void b.select(0) : void (e.length < c.minChars ? b.hide() : b.getSuggestions(e))
        },
        isExactMatch: function (a) {
            var b = this.suggestions;
            return 1 === b.length && b[0].value.toLowerCase() === a.toLowerCase()
        },
        getQuery: function (b) {
            var c, d = this.options.delimiter;
            return d ? (c = b.split(d), a.trim(c[c.length - 1])) : b
        },
        getSuggestionsLocal: function (b) {
            var c, d = this,
            e = d.options,
            f = b.toLowerCase(),
            g = e.lookupFilter,
            h = parseInt(e.lookupLimit, 10);
            return c = {
                suggestions: a.grep(e.lookup,
                function (a) {
                    return g(a, b, f)
                })
            },
            h && c.suggestions.length > h && (c.suggestions = c.suggestions.slice(0, h)),
            c
        },
        getSuggestions: function (b) {
            var c, d, e, f, g = this,
            h = g.options,
            i = h.serviceUrl;
            if (h.params[h.paramName] = b, d = h.ignoreParams ? null : h.params, h.onSearchStart.call(g.element, h.params) !== !1) {
                if (a.isFunction(h.lookup)) return void h.lookup(b,
                function (a) {
                    g.suggestions = a.suggestions,
                    g.suggest(),
                    h.onSearchComplete.call(g.element, b, a.suggestions)
                });
                g.isLocal ? c = g.getSuggestionsLocal(b) : (a.isFunction(i) && (i = i.call(g.element, b)), e = i + "?" + a.param(d || {}), c = g.cachedResponse[e]),
                c && a.isArray(c.suggestions) ? (g.suggestions = c.suggestions, g.suggest(), h.onSearchComplete.call(g.element, b, c.suggestions)) : g.isBadQuery(b) ? h.onSearchComplete.call(g.element, b, []) : (g.abortAjax(), f = {
                    url: i,
                    data: d,
                    type: h.type,
                    dataType: h.dataType
                },
                a.extend(f, h.ajaxSettings), g.currentRequest = a.ajax(f).done(function (a) {
                    var c;
                    g.currentRequest = null,
                    "6" == a.status && (location.href = amap.service.verifysug + encodeURIComponent(location.href) + "&channel=" + a.channel + "&uuid=" + encodeURIComponent(a.uuid) + "&url=" + encodeURIComponent(a.url)),
                    c = h.transformResult(a),
                    g.processResponse(c, b, e),
                    h.onSearchComplete.call(g.element, b, c.suggestions)
                }).fail(function (a, c, d) {
                    h.onSearchError.call(g.element, b, a, c, d)
                }))
            }
        },
        isBadQuery: function (a) {
            if (!this.options.preventBadQueries) return !1;
            for (var b = this.badQueries,
            c = b.length; c--;) if (0 === a.indexOf(b[c])) return !0;
            return !1
        },
        hide: function () {
            var b = this,
            c = a(b.suggestionsContainer);
            a.isFunction(b.options.onHide) && b.visible && b.options.onHide.call(b.element, c),
            b.visible = !1,
            b.selectedIndex = -1,
            clearInterval(b.onChangeInterval),
            a(b.suggestionsContainer).hide(),
            b.signalHint(null)
        },
        suggest: function () {
            if (0 === this.suggestions.length) return void (this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide());
            var b, c = this,
            d = c.options,
            e = d.groupBy,
            f = d.formatResult,
            g = c.getQuery(c.currentValue),
            h = c.classes.suggestion,
            i = c.classes.selected,
            j = a(c.suggestionsContainer),
            k = a(c.noSuggestionsContainer),
            l = d.beforeRender,
            m = "",
            n = function (a, c) {
                var d = a.data[e];
                return b === d ? "" : (b = d, '<div class="autocomplete-group"><strong>' + b + "</strong></div>")
            };
            return d.triggerSelectOnValidInput && c.isExactMatch(g) ? void c.select(0) : (a.each(c.suggestions,
            function (a, b) {
                e && (m += n(b, g, a)),
                m += '<div class="' + h + '" data-index="' + a + '"><p>' + f(b, g) + '<span class="district" adcode="' + (b.adcode || "") + '">' + (b.district || "") + " </span></p></div>"
            }), this.adjustContainerWidth(), k.detach(), j.html(m), a.isFunction(l) && l.call(c.element, j), c.fixPosition(), j.show(), d.autoSelectFirst && (c.selectedIndex = 0, j.scrollTop(0), j.children("." + h).first().addClass(i)), c.visible = !0, void c.findBestHint())
        },
        noSuggestions: function () {
            var b = this,
            c = a(b.suggestionsContainer),
            d = a(b.noSuggestionsContainer);
            this.adjustContainerWidth(),
            d.detach(),
            c.empty(),
            c.append(d),
            b.fixPosition(),
            c.show(),
            b.visible = !0
        },
        adjustContainerWidth: function () {
            var b, c = this,
            d = c.options,
            e = a(c.suggestionsContainer);
            "auto" === d.width && void 0 === d.minWidth && (b = c.el.outerWidth() - 2, e.width(b > 0 ? b : 300))
        },
        findBestHint: function () {
            var b = this,
            c = b.el.val().toLowerCase(),
            d = null;
            c && (a.each(b.suggestions,
            function (a, b) {
                var e = 0 === b.value.toLowerCase().indexOf(c);
                return e && (d = b),
                !e
            }), b.signalHint(d))
        },
        signalHint: function (b) {
            var c = "",
            d = this;
            b && (c = d.currentValue + b.value.substr(d.currentValue.length)),
            d.hintValue !== c && (d.hintValue = c, d.hint = b, (this.options.onHint || a.noop)(c))
        },
        verifySuggestionsFormat: function (b) {
            return b.length && "string" == typeof b[0] ? a.map(b,
            function (a) {
                return {
                    value: a,
                    data: null
                }
            }) : b
        },
        validateOrientation: function (b, c) {
            return b = a.trim(b || "").toLowerCase(),
            -1 === a.inArray(b, ["auto", "bottom", "top"]) && (b = c),
            b
        },
        processResponse: function (a, b, c) {
            var d = this,
            e = d.options;
            a.suggestions = d.verifySuggestionsFormat(a.suggestions),
            e.noCache || (d.cachedResponse[c] = a, e.preventBadQueries && 0 === a.suggestions.length && d.badQueries.push(b)),
            b === d.getQuery(d.currentValue) && (d.suggestions = a.suggestions, d.suggest())
        },
        activate: function (b) {
            var c, d = this,
            e = d.classes.selected,
            f = a(d.suggestionsContainer),
            g = f.find("." + d.classes.suggestion);
            return f.find("." + e).removeClass(e),
            d.selectedIndex = b,
            -1 !== d.selectedIndex && g.length > d.selectedIndex ? (c = g.get(d.selectedIndex), a(c).addClass(e), c) : null
        },
        selectHint: function () {
            var b = this,
            c = a.inArray(b.hint, b.suggestions);
            b.select(c)
        },
        select: function (a) {
            var b = this;
            b.hide(),
            b.onSelect(a)
        },
        moveUp: function () {
            var b = this;
            if (-1 !== b.selectedIndex) return 0 === b.selectedIndex ? (a(b.suggestionsContainer).children().first().removeClass(b.classes.selected), b.selectedIndex = -1, b.el.val(b.currentValue), void b.findBestHint()) : void b.adjustScroll(b.selectedIndex - 1)
        },
        moveDown: function () {
            var a = this;
            a.selectedIndex !== a.suggestions.length - 1 && a.adjustScroll(a.selectedIndex + 1)
        },
        adjustScroll: function (b) {
            var c = this,
            d = c.activate(b);
            if (d) {
                var e, f, g, h = a(d).outerHeight();
                e = d.offsetTop,
                f = a(c.suggestionsContainer).scrollTop(),
                g = f + c.options.maxHeight - h,
                f > e ? a(c.suggestionsContainer).scrollTop(e) : e > g && a(c.suggestionsContainer).scrollTop(e - c.options.maxHeight + h),
                c.options.preserveInput || c.el.val(c.getValue(c.suggestions[b].value)),
                c.signalHint(null)
            }
        },
        onSelect: function (b) {
            var c = this,
            d = c.options.onSelect,
            e = c.suggestions[b];
            c.currentValue = c.getValue(e.value),
            c.currentValue === c.el.val() || c.options.preserveInput || c.el.val(c.currentValue),
            c.signalHint(null),
            c.suggestions = [],
            c.selection = e,
            a.isFunction(d) && d.call(c.element, e)
        },
        getValue: function (a) {
            var b, c, d = this,
            e = d.options.delimiter;
            return e ? (b = d.currentValue, c = b.split(e), 1 === c.length ? a : b.substr(0, b.length - c[c.length - 1].length) + a) : a
        },
        dispose: function () {
            var b = this;
            b.el.off(".autocomplete").removeData("autocomplete"),
            b.disableKillerFn(),
            a(window).off("resize.autocomplete", b.fixPositionCapture),
            a(b.suggestionsContainer).remove()
        }
    },
    a.fn.autocomplete = a.fn.devbridgeAutocomplete = function (c, d) {
        var e = "autocomplete";
        return 0 === arguments.length ? this.first().data(e) : this.each(function () {
            var f = a(this),
            g = f.data(e);
            "string" == typeof c ? g && "function" == typeof g[c] && g[c](d) : (g && g.dispose && g.dispose(), g = new b(this, c), f.data(e, g))
        })
    }
}),
function (a) {
    function b(a, b) {
        return "function" == typeof a ? a.call(b) : a
    }
    function c(a) {
        for (; a = a.parentNode;) if (a == document) return !0;
        return !1
    }
    function d(b, c) {
        this.$element = a(b),
        this.options = c,
        this.enabled = !0,
        this.fixTitle()
    }
    d.prototype = {
        show: function () {
            var c = this.getTitle();
            if (c && this.enabled) {
                var d = this.tip();
                d.find(".tipsy-inner")[this.options.html ? "html" : "text"](c),
                d[0].className = "tipsy",
                d.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).prependTo(document.body);
                var e, f = a.extend({},
                this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                }),
                g = d[0].offsetWidth,
                h = d[0].offsetHeight,
                i = b(this.options.gravity, this.$element[0]);
                switch (i.charAt(0)) {
                    case "n":
                        e = {
                            top: f.top + f.height + this.options.offset,
                            left: f.left + f.width / 2 - g / 2
                        };
                        break;
                    case "s":
                        e = {
                            top: f.top - h - this.options.offset,
                            left: f.left + f.width / 2 - g / 2
                        };
                        break;
                    case "e":
                        e = {
                            top: f.top + f.height / 2 - h / 2,
                            left: f.left - g - this.options.offset
                        };
                        break;
                    case "w":
                        e = {
                            top: f.top + f.height / 2 - h / 2,
                            left: f.left + f.width + this.options.offset
                        }
                }
                2 == i.length && ("w" == i.charAt(1) ? e.left = f.left + f.width / 2 - 15 : e.left = f.left + f.width / 2 - g + 15),
                d.css(e).addClass("tipsy-" + i),
                d.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + i.charAt(0),
                this.options.className && d.addClass(b(this.options.className, this.$element[0])),
                this.options.fade ? d.stop().css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: this.options.opacity
                }) : d.css({
                    visibility: "visible",
                    opacity: this.options.opacity
                })
            }
        },
        hide: function () {
            this.options.fade ? this.tip().stop().fadeOut(function () {
                a(this).remove()
            }) : this.tip().remove()
        },
        fixTitle: function () {
            return
        },
        getTitle: function () {
            var a, b = this.$element,
            c = this.options;
            return a = b.attr("title") || c.title || c.fallback || "璇疯緭鍏itle灞炴€�",
            a = ("" + a).replace(/(^\s*|\s*$)/, ""),
            a || c.fallback
        },
        tip: function () {
            return this.$tip || (this.$tip = a('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), this.$tip.data("tipsy-pointee", this.$element[0])),
            this.$tip
        },
        validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function () {
            this.enabled = !0
        },
        disable: function () {
            this.enabled = !1
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        }
    },
    a.fn.tipsy = function (b) {
        function c(c) {
            var e = a.data(c, "tipsy");
            return e || (e = new d(c, a.fn.tipsy.elementOptions(c, b)), a.data(c, "tipsy", e)),
            e
        }
        function e() {
            var a = c(this);
            a.hoverState = "in",
            0 == b.delayIn ? a.show() : (a.fixTitle(), setTimeout(function () {
                "in" == a.hoverState && a.show()
            },
            b.delayIn))
        }
        function f() {
            var a = c(this);
            a.hoverState = "out",
            0 == b.delayOut ? a.hide() : setTimeout(function () {
                "out" == a.hoverState && a.hide()
            },
            b.delayOut)
        }
        if (b === !0) return this.data("tipsy");
        if ("string" == typeof b) {
            var g = this.data("tipsy");
            return g && g[b](),
            this
        }
        if (b = a.extend({},
        a.fn.tipsy.defaults, b), b.live || this.each(function () {
            c(this)
        }), "manual" != b.trigger) {
            var h = b.live ? "live" : "bind",
            i = "hover" == b.trigger ? "mouseenter" : "focus",
            j = "hover" == b.trigger ? "mouseleave" : "blur";
            this[h](i, e)[h](j, f)
        }
        return this
    },
    a.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: !1,
        fallback: "",
        gravity: "n",
        html: !1,
        live: !1,
        offset: 0,
        opacity: .8,
        title: "title",
        trigger: "hover"
    },
    a.fn.tipsy.revalidate = function () {
        a(".tipsy").each(function () {
            var b = a.data(this, "tipsy-pointee");
            b && c(b) || a(this).remove()
        })
    },
    a.fn.tipsy.elementOptions = function (b, c) {
        return a.metadata ? a.extend({},
        c, a(b).metadata()) : c
    },
    a.fn.tipsy.autoNS = function () {
        return a(this).offset().top > a(document).scrollTop() + a(window).height() / 2 ? "s" : "n"
    },
    a.fn.tipsy.autoWE = function () {
        return a(this).offset().left > a(document).scrollLeft() + a(window).width() / 2 ? "e" : "w"
    },
    a.fn.tipsy.autoBounds = function (b, c) {
        return function () {
            var d = {
                ns: c[0],
                ew: c.length > 1 ? c[1] : !1
            },
            e = a(document).scrollTop() + b,
            f = a(document).scrollLeft() + b,
            g = a(this);
            return g.offset().top < e && (d.ns = "n"),
            g.offset().left < f && (d.ew = "w"),
            a(window).width() + a(document).scrollLeft() - g.offset().left < b && (d.ew = "e"),
            a(window).height() + a(document).scrollTop() - g.offset().top < b && (d.ns = "s"),
            d.ns + (d.ew ? d.ew : "")
        }
    }
}(jQuery),
function (a, b) {
    "function" == typeof define && define.amd ? define(["jQuery"],
    function (c) {
        return a.jBox = b(c)
    }) : "object" == typeof exports ? module.exports = b(require("jQuery")) : a.jBox = b(a.jQuery)
}(this,
function (jQuery) {
    var jBox = function (type, options) {
        this.options = {
            id: null,
            width: "auto",
            height: "auto",
            minWidth: null,
            maxHeight: null,
            minWidth: null,
            maxHeight: null,
            attach: null,
            trigger: "click",
            preventDefault: !1,
            title: null,
            content: null,
            getTitle: null,
            getContent: null,
            isolateScroll: !0,
            ajax: {
                url: null,
                data: "",
                reload: !1,
                getData: "data-ajax",
                setContent: !0,
                spinner: !0
            },
            target: null,
            position: {
                x: "center",
                y: "center"
            },
            outside: null,
            offset: 0,
            attributes: {
                x: "left",
                y: "top"
            },
            adjustPosition: !1,
            adjustTracker: !1,
            adjustDistance: 5,
            fixed: !1,
            reposition: !1,
            repositionOnOpen: !0,
            repositionOnContent: !0,
            pointer: !1,
            pointTo: "target",
            fade: 180,
            animation: null,
            theme: "Default",
            addClass: "",
            overlay: !1,
            zIndex: 1e4,
            delayOpen: 0,
            delayClose: 0,
            closeOnEsc: !1,
            closeOnClick: !1,
            closeOnMouseleave: !1,
            closeButton: !1,
            constructOnInit: !1,
            blockScroll: !1,
            appendTo: jQuery("body"),
            draggable: null,
            dragOver: !0,
            onInit: null,
            onBeforeInit: null,
            onAttach: null,
            onCreated: null,
            onOpen: null,
            onClose: null,
            onCloseComplete: null,
            confirmButton: "Submit",
            cancelButton: "Cancel",
            confirm: null,
            cancel: null,
            autoClose: 7e3,
            color: null,
            stack: !0,
            audio: !1,
            volume: 100,
            src: "href",
            gallery: "data-jbox-image",
            imageLabel: "title",
            imageFade: 600,
            imageSize: "contain"
        },
        this.defaultOptions = {
            Tooltip: {
                getContent: "title",
                trigger: "mouseenter",
                position: {
                    x: "center",
                    y: "top"
                },
                outside: "y",
                pointer: !0,
                adjustPosition: !0,
                reposition: !0
            },
            Mouse: {
                target: "mouse",
                position: {
                    x: "right",
                    y: "bottom"
                },
                offset: 15,
                trigger: "mouseenter",
                adjustPosition: "flip"
            },
            Modal: {
                target: jQuery(window),
                fixed: !0,
                blockScroll: !0,
                closeOnEsc: !0,
                closeOnClick: "overlay",
                closeButton: !0,
                overlay: !0,
                animation: "zoomOut"
            },
            Confirm: {
                target: jQuery(window),
                fixed: !0,
                attach: jQuery("[data-confirm]"),
                getContent: "data-confirm",
                content: "Do you really want to do this?",
                minWidth: 320,
                maxWidth: 460,
                blockScroll: !0,
                closeOnEsc: !0,
                closeOnClick: "overlay",
                closeButton: !0,
                overlay: !0,
                animation: "zoomOut",
                preventDefault: !0,
                _onAttach: function (a) {
                    if (!this.options.confirm) {
                        var b = a.attr("onclick") ? a.attr("onclick") : a.attr("href") ? a.attr("target") ? 'window.open("' + a.attr("href") + '", "' + a.attr("target") + '");' : 'window.location.href = "' + a.attr("href") + '";' : "";
                        a.prop("onclick", null).data("jBox-Confirm-submit", b)
                    }
                },
                _onCreated: function () {
                    this.footer = jQuery('<div class="jBox-Confirm-footer"/>'),
                    jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>').html(this.options.cancelButton).click(function () {
                        this.options.cancel && this.options.cancel(),
                        this.close()
                    }.bind(this)).appendTo(this.footer),
                    this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>').html(this.options.confirmButton).appendTo(this.footer),
                    this.footer.appendTo(this.container)
                },
                _onOpen: function () {
                    this.submitButton.off("click.jBox-Confirm" + this.id).on("click.jBox-Confirm" + this.id,
                    function () {
                        this.options.confirm ? this.options.confirm() : eval(this.source.data("jBox-Confirm-submit")),
                        this.close()
                    }.bind(this))
                }
            },
            Notice: {
                target: jQuery(window),
                fixed: !0,
                position: {
                    x: 20,
                    y: 20
                },
                attributes: {
                    x: "right",
                    y: "top"
                },
                animation: "zoomIn",
                closeOnClick: "box",
                _onInit: function () {
                    this.open(),
                    this.options.delayClose = this.options.autoClose,
                    this.options.delayClose && this.close()
                },
                _onCreated: function () {
                    this.options.color && this.wrapper.addClass("jBox-Notice-color jBox-Notice-" + this.options.color),
                    this.wrapper.data("jBox-Notice-position", this.options.attributes.x + "-" + this.options.attributes.y)
                },
                _onOpen: function () {
                    jQuery.each(jQuery(".jBox-Notice"),
                    function (a, b) {
                        return b = jQuery(b),
                        b.attr("id") != this.id && b.data("jBox-Notice-position") == this.options.attributes.x + "-" + this.options.attributes.y ? this.options.stack ? void b.css("margin-" + this.options.attributes.y, parseInt(b.css("margin-" + this.options.attributes.y)) + this.wrapper.outerHeight() + 10) : void b.data("jBox").close({
                            ignoreDelay: !0
                        }) : void 0
                    }.bind(this)),
                    this.options.audio && this.audio({
                        url: this.options.audio,
                        valume: this.options.volume
                    })
                },
                _onCloseComplete: function () {
                    this.destroy()
                }
            },
            Image: {
                target: jQuery(window),
                fixed: !0,
                blockScroll: !0,
                closeOnEsc: !0,
                closeOnClick: "overlay",
                closeButton: !0,
                overlay: !0,
                animation: "zoomOut",
                width: 800,
                height: 533,
                attach: jQuery("[data-jbox-image]"),
                preventDefault: !0,
                _onInit: function () {
                    this.images = this.currentImage = {},
                    this.imageZIndex = 1,
                    this.attachedElements && jQuery.each(this.attachedElements,
                    function (a, b) {
                        if (b = jQuery(b), !b.data("jBox-image-gallery")) {
                            var c = b.attr(this.options.gallery) || "default"; !this.images[c] && (this.images[c] = []),
                            this.images[c].push({
                                src: b.attr(this.options.src),
                                label: b.attr(this.options.imageLabel) || ""
                            }),
                            "title" == this.options.imageLabel && b.removeAttr("title"),
                            b.data("jBox-image-gallery", c),
                            b.data("jBox-image-id", this.images[c].length - 1)
                        }
                    }.bind(this));
                    var a = function (a, b, c, d) {
                        if (!jQuery("#jBox-image-" + a + "-" + b).length) {
                            var e = jQuery("<div/>", {
                                id: "jBox-image-" + a + "-" + b,
                                "class": "jBox-image-container"
                            }).css({
                                backgroundImage: "url(" + this.images[a][b].src + ")",
                                backgroundSize: this.options.imageSize,
                                opacity: d ? 1 : 0,
                                zIndex: c ? 0 : this.imageZIndex++
                            }).appendTo(this.content);
                            jQuery("<div/>", {
                                id: "jBox-image-label-" + a + "-" + b,
                                "class": "jBox-image-label" + (d ? " active" : "")
                            }).html(this.images[a][b].label).appendTo(this.imageLabel); !d && !c && e.animate({
                                opacity: 1
                            },
                            this.options.imageFade)
                        }
                    }.bind(this),
                    b = function (a, b) {
                        jQuery(".jBox-image-label.active").removeClass("active"),
                        jQuery("#jBox-image-label-" + a + "-" + b).addClass("active")
                    };
                    this.showImage = function (c) {
                        if ("open" != c) {
                            var d = this.currentImage.gallery,
                            e = this.currentImage.id + (1 * ("prev" == c) ? -1 : 1);
                            e = e > this.images[d].length - 1 ? 0 : 0 > e ? this.images[d].length - 1 : e
                        } else {
                            var d = this.source.data("jBox-image-gallery"),
                            e = this.source.data("jBox-image-id");
                            jQuery(".jBox-image-pointer-prev, .jBox-image-pointer-next").css({
                                display: this.images[d].length > 1 ? "block" : "none"
                            })
                        }
                        if (this.currentImage = {
                            gallery: d,
                            id: e
                        },
                        jQuery("#jBox-image-" + d + "-" + e).length) jQuery("#jBox-image-" + d + "-" + e).css({
                            zIndex: this.imageZIndex++,
                            opacity: 0
                        }).animate({
                            opacity: 1
                        },
                        "open" == c ? 0 : this.options.imageFade),
                        b(d, e);
                        else {
                            this.wrapper.addClass("jBox-loading");
                            jQuery('<img src="' + this.images[d][e].src + '">').load(function () {
                                a(d, e, !1),
                                b(d, e),
                                this.wrapper.removeClass("jBox-loading")
                            }.bind(this))
                        }
                        var f = e + 1;
                        f = f > this.images[d].length - 1 ? 0 : 0 > f ? this.images[d].length - 1 : f,
                        !jQuery("#jBox-image-" + d + "-" + f).length && jQuery('<img src="' + this.images[d][f].src + '">').load(function () {
                            a(d, f, !0)
                        })
                    }
                },
                _onCreated: function () {
                    this.imageLabel = jQuery("<div/>", {
                        id: "jBox-image-label"
                    }).appendTo(this.wrapper),
                    this.wrapper.append(jQuery("<div/>", {
                        "class": "jBox-image-pointer-prev",
                        click: function () {
                            this.showImage("prev")
                        }.bind(this)
                    })).append(jQuery("<div/>", {
                        "class": "jBox-image-pointer-next",
                        click: function () {
                            this.showImage("next")
                        }.bind(this)
                    }))
                },
                _onOpen: function () {
                    jQuery("body").addClass("jBox-image-open"),
                    jQuery(document).on("keyup.jBox-" + this.id,
                    function (a) {
                        37 == a.keyCode && this.showImage("prev"),
                        39 == a.keyCode && this.showImage("next")
                    }.bind(this)),
                    this.showImage("open")
                },
                _onClose: function () {
                    jQuery("body").removeClass("jBox-image-open"),
                    jQuery(document).off("keyup.jBox-" + this.id)
                },
                _onCloseComplete: function () {
                    this.wrapper.find(".jBox-image-container").css("opacity", 0)
                }
            }
        },
        "string" == jQuery.type(type) && (this.type = type, type = this.defaultOptions[type] ? this.defaultOptions[type] : window["jBox" + type + "Options"]),
        this.options = jQuery.extend(!0, this.options, type, options),
        this._fireEvent = function (a, b) {
            this.options["_" + a] && this.options["_" + a].bind(this)(b),
            this.options[a] && this.options[a].bind(this)(b)
        },
        this._fireEvent("onBeforeInit"),
        null === this.options.id && (this.options.id = "jBoxID" + jBox._getUniqueID()),
        this.id = this.options.id,
        ("center" == this.options.position.x && "x" == this.options.outside || "center" == this.options.position.y && "y" == this.options.outside) && (this.options.outside = !1),
        (!this.options.outside || "xy" == this.options.outside) && (this.options.pointer = !1),
        "object" != jQuery.type(this.options.offset) && (this.options.offset = {
            x: this.options.offset,
            y: this.options.offset
        }),
        this.options.offset.x || (this.options.offset.x = 0),
        this.options.offset.y || (this.options.offset.y = 0),
        "object" != jQuery.type(this.options.adjustDistance) ? this.options.adjustDistance = {
            top: this.options.adjustDistance,
            right: this.options.adjustDistance,
            bottom: this.options.adjustDistance,
            left: this.options.adjustDistance
        } : this.options.adjustDistance = jQuery.extend({
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        },
        this.options.adjustDistance),
        this.align = this.options.outside && "xy" != this.options.outside ? this.options.position[this.options.outside] : "center" != this.options.position.y && "number" != jQuery.type(this.options.position.y) ? this.options.position.x : "center" != this.options.position.x && "number" != jQuery.type(this.options.position.x) ? this.options.position.y : this.options.attributes.x,
        this.options.outside && "xy" != this.options.outside && (this.outside = this.options.position[this.options.outside]);
        var userAgent = navigator.userAgent.toLowerCase();
        return this.IE8 = -1 != userAgent.indexOf("msie") && 8 == parseInt(userAgent.split("msie")[1]),
        this.prefix = -1 != userAgent.indexOf("webkit") ? "-webkit-" : "",
        this._getOpp = function (a) {
            return {
                left: "right",
                right: "left",
                top: "bottom",
                bottom: "top",
                x: "y",
                y: "x"
            }[a]
        },
        this._getXY = function (a) {
            return {
                left: "x",
                right: "x",
                top: "y",
                bottom: "y",
                center: "x"
            }[a]
        },
        this._getTL = function (a) {
            return {
                left: "left",
                right: "left",
                top: "top",
                bottom: "top",
                center: "left",
                x: "left",
                y: "top"
            }[a]
        },
        this._supportsSVG = function () {
            return document.createElement("svg").getAttributeNS
        },
        this._createSVG = function (a, b) {
            var c = document.createElementNS("http://www.w3.org/2000/svg", a);
            return jQuery.each(b,
            function (a, b) {
                c.setAttribute(b[0], b[1] || "")
            }),
            c
        },
        this._appendSVG = function (a, b) {
            return b.appendChild(a)
        },
        this._isolateScroll = function (a) {
            a && jQuery(a).length && a.on("DOMMouseScroll.jBoxIsolatedScroll mousewheel.jBoxIsolatedScroll",
            function (b) {
                var c = b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail,
                d = this.scrollTop + a.outerHeight() - this.scrollHeight >= 0,
                e = this.scrollTop <= 0; (0 > c && d || c > 0 && e) && b.preventDefault()
            })
        },
        this._create = function () {
            if (!this.wrapper) {
                if (this.wrapper = jQuery("<div/>", {
                    id: this.id,
                    "class": "jBox-wrapper" + (this.type ? " jBox-" + this.type : "") + (this.options.theme ? " jBox-" + this.options.theme : "") + (this.options.addClass ? " " + this.options.addClass : "") + (this.IE8 ? " jBox-IE8" : "")
                }).css({
                    position: this.options.fixed ? "fixed" : "absolute",
                    display: "none",
                    opacity: 0,
                    zIndex: this.options.zIndex
                }).data("jBox", this), this.options.closeOnMouseleave && this.wrapper.mouseleave(function (a) {
!this.source || !(a.relatedTarget == this.source[0] || -1 !== jQuery.inArray(this.source[0], jQuery(a.relatedTarget).parents("*"))) && this.close()
                }.bind(this)), "box" == this.options.closeOnClick && this.wrapper.on("touchend click",
                function () {
                    this.close({
                    ignoreDelay: !0
                })
                }.bind(this)), this.container = jQuery("<div/>", {
                    "class": "jBox-container"
                }).appendTo(this.wrapper), this.content = jQuery("<div/>", {
                    "class": "jBox-content"
                }).css({
                    width: this.options.width,
                    height: this.options.height,
                    minWidth: this.options.minWidth,
                    minHeight: this.options.minHeight,
                    maxWidth: this.options.maxWidth,
                    maxHeight: this.options.maxHeight
                }).appendTo(this.container), this.options.isolateScroll && this._isolateScroll(this.content), this.options.closeButton) {
                    if (this.closeButton = jQuery("<div/>", {
                        "class": "jBox-closeButton jBox-noDrag"
                    }).on("touchend click",
                    function (a) {
                        this.isOpen && this.close({
                        ignoreDelay: !0
                    })
                    }.bind(this)), this._supportsSVG()) {
                        var a = this._createSVG("svg", [["viewBox", "0 0 24 24"]]);
                        this._appendSVG(this._createSVG("path", [["d", "M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z"]]), a),
                        this.closeButton.append(a)
                    } else this.wrapper.addClass("jBox-nosvg"); ("box" == this.options.closeButton || this.options.closeButton === !0 && !this.options.overlay && !this.options.title) && (this.wrapper.addClass("jBox-closeButton-box"), this.closeButton.appendTo(this.container))
                }
                if (this.wrapper.appendTo(this.options.appendTo), this.options.pointer) {
                    if (this.pointer = {
                        position: "target" != this.options.pointTo ? this.options.pointTo : this._getOpp(this.outside),
                        xy: "target" != this.options.pointTo ? this._getXY(this.options.pointTo) : this._getXY(this.outside),
                        align: "center",
                        offset: 0
                    },
                    this.pointer.element = jQuery("<div/>", {
                        "class": "jBox-pointer jBox-pointer-" + this.pointer.position
                    }).appendTo(this.wrapper), this.pointer.dimensions = {
                        x: this.pointer.element.outerWidth(),
                        y: this.pointer.element.outerHeight()
                    },
                    "string" == jQuery.type(this.options.pointer)) {
                        var b = this.options.pointer.split(":");
                        b[0] && (this.pointer.align = b[0]),
                        b[1] && (this.pointer.offset = parseInt(b[1]))
                    }
                    this.pointer.alignAttribute = "x" == this.pointer.xy ? "bottom" == this.pointer.align ? "bottom" : "top" : "right" == this.pointer.align ? "right" : "left",
                    this.wrapper.css("padding-" + this.pointer.position, this.pointer.dimensions[this.pointer.xy]),
                    this.pointer.element.css(this.pointer.alignAttribute, "center" == this.pointer.align ? "50%" : 0).css("margin-" + this.pointer.alignAttribute, this.pointer.offset),
                    this.pointer.margin = {},
                    this.pointer.margin["margin-" + this.pointer.alignAttribute] = this.pointer.offset,
                    "center" == this.pointer.align && this.pointer.element.css(this.prefix + "transform", "translate(" + ("y" == this.pointer.xy ? this.pointer.dimensions.x * -.5 + "px" : 0) + ", " + ("x" == this.pointer.xy ? this.pointer.dimensions.y * -.5 + "px" : 0) + ")"),
                    this.pointer.element.css("x" == this.pointer.xy ? "width" : "height", parseInt(this.pointer.dimensions[this.pointer.xy]) + parseInt(this.container.css("border-" + this.pointer.alignAttribute + "-width"))),
                    this.wrapper.addClass("jBox-pointerPosition-" + this.pointer.position)
                }
                if (this.setContent(this.options.content, !0), this.setTitle(this.options.title, !0), this.options.draggable) {
                    var c = "title" == this.options.draggable ? this.titleContainer : this.options.draggable.length > 0 ? this.options.draggable : this.options.draggable.selector ? jQuery(this.options.draggable.selector) : this.wrapper;
                    c.addClass("jBox-draggable").on("mousedown",
                    function (a) {
                        if (2 != a.button && !jQuery(a.target).hasClass("jBox-noDrag") && !jQuery(a.target).parents(".jBox-noDrag").length) {
                            this.options.dragOver && this.wrapper.css("zIndex") <= jBox.zIndexMax && (jBox.zIndexMax += 1, this.wrapper.css("zIndex", jBox.zIndexMax));
                            var b = this.wrapper.outerHeight(),
                            c = this.wrapper.outerWidth(),
                            d = this.wrapper.offset().top + b - a.pageY,
                            e = this.wrapper.offset().left + c - a.pageX;
                            jQuery(document).on("mousemove.jBox-draggable-" + this.id,
                            function (a) {
                                this.wrapper.offset({
                                    top: a.pageY + d - b,
                                    left: a.pageX + e - c
                                })
                            }.bind(this)),
                            a.preventDefault()
                        }
                    }.bind(this)).on("mouseup",
                    function () {
                        jQuery(document).off("mousemove.jBox-draggable-" + this.id)
                    }.bind(this)),
                    jBox.zIndexMax = jBox.zIndexMax ? Math.max(jBox.zIndexMax, this.options.zIndex) : this.options.zIndex
                }
                this._fireEvent("onCreated")
            }
        },
        this.options.constructOnInit && this._create(),
        this.options.attach && this.attach(),
        this._positionMouse = function (a) {
            this.pos = {
                left: a.pageX,
                top: a.pageY
            };
            var b = function (a, b) {
                return "center" == this.options.position[b] ? void (this.pos[a] -= Math.ceil(this.dimensions[b] / 2)) : (this.pos[a] += a == this.options.position[b] ? -1 * this.dimensions[b] - this.options.offset[b] : this.options.offset[b], this.pos[a])
            }.bind(this);
            this.wrapper.css({
                left: b("left", "x"),
                top: b("top", "y")
            }),
            this.targetDimensions = {
                x: 0,
                y: 0,
                left: a.pageX,
                top: a.pageY
            },
            this._adjustPosition()
        },
        this._attachEvents = function () {
            if (this.options.closeOnEsc && jQuery(document).on("keyup.jBox-" + this.id,
            function (a) {
                27 == a.keyCode && this.close({
                ignoreDelay: !0
            })
            }.bind(this)), (this.options.closeOnClick === !0 || "body" == this.options.closeOnClick) && jQuery(document).on("touchend.jBox-" + this.id + " click.jBox-" + this.id,
            function (a) {
                this.blockBodyClick || "body" == this.options.closeOnClick && (a.target == this.wrapper[0] || this.wrapper.has(a.target).length) || this.close({
                ignoreDelay: !0
            })
            }.bind(this)), (this.options.adjustPosition && this.options.adjustTracker || this.options.reposition) && !this.fixed && this.outside) {
                var a, b = 0,
                c = 150,
                d = function () {
                    var d = (new Date).getTime();
                    a || (d - b > c && (this.options.reposition && this.position(), this.options.adjustTracker && this._adjustPosition(), b = d), a = setTimeout(function () {
                        a = null,
                        b = (new Date).getTime(),
                        this.options.reposition && this.position(),
                        this.options.adjustTracker && this._adjustPosition()
                    }.bind(this), c))
                }.bind(this);
                this.options.adjustTracker && "resize" != this.options.adjustTracker && jQuery(window).on("scroll.jBox-" + this.id,
                function (a) {
                    d()
                }.bind(this)),
                (this.options.adjustTracker && "scroll" != this.options.adjustTracker || this.options.reposition) && jQuery(window).on("resize.jBox-" + this.id,
                function (a) {
                    d()
                }.bind(this))
            }
            "mouse" == this.options.target && jQuery("body").on("mousemove.jBox-" + this.id,
            function (a) {
                this._positionMouse(a)
            }.bind(this))
        },
        this._detachEvents = function () {
            this.options.closeOnEsc && jQuery(document).off("keyup.jBox-" + this.id),
            (this.options.closeOnClick === !0 || "body" == this.options.closeOnClick) && jQuery(document).off("touchend.jBox-" + this.id + " click.jBox-" + this.id),
            (this.options.adjustPosition && this.options.adjustTracker || this.options.reposition) && (jQuery(window).off("scroll.jBox-" + this.id), jQuery(window).off("resize.jBox-" + this.id)),
            "mouse" == this.options.target && jQuery("body").off("mousemove.jBox-" + this.id)
        },
        this._addOverlay = function () {
            this.overlay || (this.overlay = jQuery("#jBox-overlay").length ? jQuery("#jBox-overlay").css({
                zIndex: Math.min(jQuery("#jBox-overlay").css("z-index"), this.options.zIndex - 1)
            }) : jQuery("<div/>", {
                id: "jBox-overlay"
            }).css({
                display: "none",
                opacity: 0,
                zIndex: this.options.zIndex - 1
            }).appendTo(jQuery("body")), ("overlay" == this.options.closeButton || this.options.closeButton === !0) && (jQuery("#jBox-overlay .jBox-closeButton").length > 0 ? jQuery("#jBox-overlay .jBox-closeButton").on("touchend click",
            function () {
                this.isOpen && this.close({
                    ignoreDelay: !0
                })
            }.bind(this)) : this.overlay.append(this.closeButton)), "overlay" == this.options.closeOnClick && this.overlay.on("touchend click",
            function () {
                this.isOpen && this.close({
                    ignoreDelay: !0
                })
            }.bind(this)));
            var a = this.overlay.data("jBox") || {};
            a["jBox-" + this.id] = !0,
            this.overlay.data("jBox", a),
            "block" != this.overlay.css("display") && (this.options.fade ? this.overlay.stop() && this.overlay.animate({
                opacity: 1
            },
            {
                queue: !1,
                duration: this.options.fade,
                start: function () {
                    this.overlay.css({
                        display: "block"
                    })
                }.bind(this)
            }) : this.overlay.css({
                display: "block",
                opacity: 1
            }))
        },
        this._removeOverlay = function () {
            if (this.overlay) {
                var a = this.overlay.data("jBox");
                delete a["jBox-" + this.id],
                this.overlay.data("jBox", a),
                jQuery.isEmptyObject(a) && (this.options.fade ? this.overlay.stop() && this.overlay.animate({
                    opacity: 0
                },
                {
                    queue: !1,
                    duration: this.options.fade,
                    complete: function () {
                        this.overlay.css({
                            display: "none"
                        })
                    }.bind(this)
                }) : this.overlay.css({
                    display: "none",
                    opacity: 0
                }))
            }
        },
        this._generateCSS = function () {
            if (!this.IE8) {
                "object" != jQuery.type(this.options.animation) && (this.options.animation = {
                    pulse: {
                        open: "pulse",
                        close: "zoomOut"
                    },
                    zoomIn: {
                        open: "zoomIn",
                        close: "zoomIn"
                    },
                    zoomOut: {
                        open: "zoomOut",
                        close: "zoomOut"
                    },
                    move: {
                        open: "move",
                        close: "move"
                    },
                    slide: {
                        open: "slide",
                        close: "slide"
                    },
                    flip: {
                        open: "flip",
                        close: "flip"
                    },
                    tada: {
                        open: "tada",
                        close: "zoomOut"
                    }
                }[this.options.animation]),
                this.options.animation.open && (this.options.animation.open = this.options.animation.open.split(":")),
                this.options.animation.close && (this.options.animation.close = this.options.animation.close.split(":")),
                this.options.animation.openDirection = this.options.animation.open ? this.options.animation.open[1] : null,
                this.options.animation.closeDirection = this.options.animation.close ? this.options.animation.close[1] : null,
                this.options.animation.open && (this.options.animation.open = this.options.animation.open[0]),
                this.options.animation.close && (this.options.animation.close = this.options.animation.close[0]),
                this.options.animation.open && (this.options.animation.open += "Open"),
                this.options.animation.close && (this.options.animation.close += "Close");
                var a = {
                    pulse: {
                        duration: 350,
                        css: [["0%", "scale(1)"], ["50%", "scale(1.1)"], ["100%", "scale(1)"]]
                    },
                    zoomInOpen: {
                        duration: this.options.fade || 180,
                        css: [["0%", "scale(0.9)"], ["100%", "scale(1)"]]
                    },
                    zoomInClose: {
                        duration: this.options.fade || 180,
                        css: [["0%", "scale(1)"], ["100%", "scale(0.9)"]]
                    },
                    zoomOutOpen: {
                        duration: this.options.fade || 180,
                        css: [["0%", "scale(1.1)"], ["100%", "scale(1)"]]
                    },
                    zoomOutClose: {
                        duration: this.options.fade || 180,
                        css: [["0%", "scale(1)"], ["100%", "scale(1.1)"]]
                    },
                    moveOpen: {
                        duration: this.options.fade || 180,
                        positions: {
                            top: {
                                "0%": -12
                            },
                            right: {
                                "0%": 12
                            },
                            bottom: {
                                "0%": 12
                            },
                            left: {
                                "0%": -12
                            }
                        },
                        css: [["0%", "translate%XY(%Vpx)"], ["100%", "translate%XY(0px)"]]
                    },
                    moveClose: {
                        duration: this.options.fade || 180,
                        timing: "ease-in",
                        positions: {
                            top: {
                                "100%": -12
                            },
                            right: {
                                "100%": 12
                            },
                            bottom: {
                                "100%": 12
                            },
                            left: {
                                "100%": -12
                            }
                        },
                        css: [["0%", "translate%XY(0px)"], ["100%", "translate%XY(%Vpx)"]]
                    },
                    slideOpen: {
                        duration: 400,
                        positions: {
                            top: {
                                "0%": -400
                            },
                            right: {
                                "0%": 400
                            },
                            bottom: {
                                "0%": 400
                            },
                            left: {
                                "0%": -400
                            }
                        },
                        css: [["0%", "translate%XY(%Vpx)"], ["100%", "translate%XY(0px)"]]
                    },
                    slideClose: {
                        duration: 400,
                        timing: "ease-in",
                        positions: {
                            top: {
                                "100%": -400
                            },
                            right: {
                                "100%": 400
                            },
                            bottom: {
                                "100%": 400
                            },
                            left: {
                                "100%": -400
                            }
                        },
                        css: [["0%", "translate%XY(0px)"], ["100%", "translate%XY(%Vpx)"]]
                    },
                    flipOpen: {
                        duration: 600,
                        css: [["0%", "perspective(400px) rotateX(90deg)"], ["40%", "perspective(400px) rotateX(-15deg)"], ["70%", "perspective(400px) rotateX(15deg)"], ["100%", "perspective(400px) rotateX(0deg)"]]
                    },
                    flipClose: {
                        duration: this.options.fade || 300,
                        css: [["0%", "perspective(400px) rotateX(0deg)"], ["100%", "perspective(400px) rotateX(90deg)"]]
                    },
                    tada: {
                        duration: 800,
                        css: [["0%", "scale(1)"], ["10%, 20%", "scale(0.9) rotate(-3deg)"], ["30%, 50%, 70%, 90%", "scale(1.1) rotate(3deg)"], ["40%, 60%, 80%", "scale(1.1) rotate(-3deg)"], ["100%", "scale(1) rotate(0)"]]
                    }
                };
                jQuery.each(["pulse", "tada"],
                function (b, c) {
                    a[c + "Open"] = a[c + "Close"] = a[c]
                });
                var b = function (b, c) {
                    return keyframe_css = "@" + this.prefix + "keyframes jBox-animation-" + this.options.animation[b] + "-" + b + (c ? "-" + c : "") + " {",
                    jQuery.each(a[this.options.animation[b]].css,
                    function (d, e) {
                        var f = c ? e[1].replace("%XY", this._getXY(c).toUpperCase()) : e[1];
                        a[this.options.animation[b]].positions && (f = f.replace("%V", a[this.options.animation[b]].positions[c][e[0]])),
                        keyframe_css += e[0] + " {" + this.prefix + "transform:" + f + ";}"
                    }.bind(this)),
                    keyframe_css += "}",
                    keyframe_css += ".jBox-animation-" + this.options.animation[b] + "-" + b + (c ? "-" + c : "") + " {",
                    keyframe_css += this.prefix + "animation-duration: " + a[this.options.animation[b]].duration + "ms;",
                    keyframe_css += this.prefix + "animation-name: jBox-animation-" + this.options.animation[b] + "-" + b + (c ? "-" + c : "") + ";",
                    keyframe_css += a[this.options.animation[b]].timing ? this.prefix + "animation-timing-function: " + a[this.options.animation[b]].timing + ";" : "",
                    keyframe_css += "}",
                    keyframe_css
                }.bind(this),
                c = "";
                jQuery.each(["open", "close"],
                function (d, e) {
                    return this.options.animation[e] && a[this.options.animation[e]] && ("close" != e || this.options.fade) ? void (a[this.options.animation[e]].positions ? jQuery.each(["top", "right", "bottom", "left"],
                    function (a, d) {
                        c += b(e, d)
                    }) : c += b(e)) : ""
                }.bind(this)),
                jQuery("<style/>").append(c).appendTo(jQuery("head"))
            }
        },
        this._blockBodyClick = function () {
            this.blockBodyClick = !0,
            setTimeout(function () {
                this.blockBodyClick = !1
            }.bind(this), 10)
        },
        this.options.animation && this._generateCSS(),
        this._animate = function (a) {
            if (!this.IE8) {
                if (a || (a = this.isOpen ? "open" : "close"), !this.options.fade && "close" == a) return null;
                var b = this.options.animation[a + "Direction"] || ("center" != this.align ? this.align : this.options.attributes.x);
                this.flipped && this._getXY(b) == this._getXY(this.align) && (b = this._getOpp(b));
                var c = "jBox-animation-" + this.options.animation[a] + "-" + a + " jBox-animation-" + this.options.animation[a] + "-" + a + "-" + b;
                this.wrapper.addClass(c);
                var d = 1e3 * parseFloat(this.wrapper.css(this.prefix + "animation-duration"));
                "close" == a && (d = Math.min(d, this.options.fade)),
                setTimeout(function () {
                    this.wrapper.removeClass(c)
                }.bind(this), d)
            }
        },
        this._abortAnimation = function () {
            if (!this.IE8) {
                var a = "jBox-animation",
                b = this.wrapper.attr("class").split(" ").filter(function (b) {
                    return 0 !== b.lastIndexOf(a, 0)
                });
                this.wrapper.attr("class", b.join(" "))
            }
        },
        this._adjustPosition = function () {
            if (!this.options.adjustPosition) return null;
            this.positionAdjusted && (this.wrapper.css(this.pos), this.pointer && this.wrapper.css("padding", 0).css("padding-" + this._getOpp(this.outside), this.pointer.dimensions[this._getXY(this.outside)]).removeClass("jBox-pointerPosition-" + this._getOpp(this.pointer.position)).addClass("jBox-pointerPosition-" + this.pointer.position), this.pointer && this.pointer.element.attr("class", "jBox-pointer jBox-pointer-" + this._getOpp(this.outside)).css(this.pointer.margin), this.positionAdjusted = !1, this.flipped = !1);
            var a = jQuery(window),
            b = {
                x: a.width(),
                y: a.height(),
                top: this.options.fixed && this.target.data("jBox-fixed") ? 0 : a.scrollTop(),
                left: this.options.fixed && this.target.data("jBox-fixed") ? 0 : a.scrollLeft()
            };
            b.bottom = b.top + b.y,
            b.right = b.left + b.x;
            var c = b.top > this.pos.top - (this.options.adjustDistance.top || 0),
            d = b.right < this.pos.left + this.dimensions.x + (this.options.adjustDistance.right || 0),
            e = b.bottom < this.pos.top + this.dimensions.y + (this.options.adjustDistance.bottom || 0),
            f = b.left > this.pos.left - (this.options.adjustDistance.left || 0),
            g = f ? "left" : d ? "right" : null,
            h = c ? "top" : e ? "bottom" : null,
            i = g || h;
            if (i) {
                "move" == this.options.adjustPosition || g != this.outside && h != this.outside || ("mouse" == this.target && (this.outside = "right"), ("top" == this.outside || "left" == this.outside ? b[this._getXY(this.outside)] - (this.targetDimensions[this._getTL(this.outside)] - b[this._getTL(this.outside)]) - this.targetDimensions[this._getXY(this.outside)] + this.options.offset[this._getXY(this.outside)] : this.targetDimensions[this._getTL(this.outside)] - b[this._getTL(this.outside)] - this.options.offset[this._getXY(this.outside)]) > this.dimensions[this._getXY(this.outside)] + parseInt(this.options.adjustDistance[this._getOpp(this.outside)]) && (this.wrapper.css(this._getTL(this.outside), this.pos[this._getTL(this.outside)] + (this.dimensions[this._getXY(this.outside)] + this.options.offset[this._getXY(this.outside)] * ("top" == this.outside || "left" == this.outside ? -2 : 2) + this.targetDimensions[this._getXY(this.outside)]) * ("top" == this.outside || "left" == this.outside ? 1 : -1)), this.pointer && this.wrapper.removeClass("jBox-pointerPosition-" + this.pointer.position).addClass("jBox-pointerPosition-" + this._getOpp(this.pointer.position)).css("padding", 0).css("padding-" + this.outside, this.pointer.dimensions[this._getXY(this.outside)]), this.pointer && this.pointer.element.attr("class", "jBox-pointer jBox-pointer-" + this.outside), this.positionAdjusted = !0, this.flipped = !0));
                var j = "x" == this._getXY(this.outside) ? h : g;
                if (this.pointer && "flip" != this.options.adjustPosition && this._getXY(j) == this._getOpp(this._getXY(this.outside))) {
                    if ("center" == this.pointer.align) var k = this.dimensions[this._getXY(j)] / 2 - this.pointer.dimensions[this._getOpp(this.pointer.xy)] / 2 - parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) * (j != this._getTL(j) ? -1 : 1);
                    else var k = j == this.pointer.alignAttribute ? parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) : this.dimensions[this._getXY(j)] - parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) - this.pointer.dimensions[this._getXY(j)];
                    spaceDiff = j == this._getTL(j) ? b[this._getTL(j)] - this.pos[this._getTL(j)] + this.options.adjustDistance[j] : -1 * (b[this._getOpp(this._getTL(j))] - this.pos[this._getTL(j)] - this.options.adjustDistance[j] - this.dimensions[this._getXY(j)]),
                    j == this._getOpp(this._getTL(j)) && this.pos[this._getTL(j)] - spaceDiff < b[this._getTL(j)] + this.options.adjustDistance[this._getTL(j)] && (spaceDiff -= b[this._getTL(j)] + this.options.adjustDistance[this._getTL(j)] - (this.pos[this._getTL(j)] - spaceDiff)),
                    spaceDiff = Math.min(spaceDiff, k),
                    spaceDiff <= k && spaceDiff > 0 && (this.pointer.element.css("margin-" + this.pointer.alignAttribute, parseInt(this.pointer.element.css("margin-" + this.pointer.alignAttribute)) - spaceDiff * (j != this.pointer.alignAttribute ? -1 : 1)), this.wrapper.css(this._getTL(j), this.pos[this._getTL(j)] + spaceDiff * (j != this._getTL(j) ? -1 : 1)), this.positionAdjusted = !0)
                }
            }
        },
        this._fireEvent("onInit"),
        this
    };
    return jBox.prototype.attach = function (a, b) {
        return a || (a = jQuery(this.options.attach.selector || this.options.attach)),
        b || (b = this.options.trigger),
        a && a.length && jQuery.each(a,
        function (a, c) {
            c = jQuery(c),
            c.data("jBox-attached-" + this.id) || ("title" == this.options.getContent && void 0 != c.attr("title") && c.data("jBox-getContent", c.attr("title")).removeAttr("title"), this.attachedElements || (this.attachedElements = []), this.attachedElements.push(c[0]), c.on(b + ".jBox-attach-" + this.id,
            function (a) {
                if (this.timer && clearTimeout(this.timer), "mouseenter" != b || !this.isOpen || this.source[0] != c[0]) {
                    if (this.isOpen && this.source && this.source[0] != c[0]) var d = !0;
                    this.source = c,
                    !this.options.target && (this.target = c),
                    "click" == b && this.options.preventDefault && a.preventDefault(),
                    this["click" != b || d ? "open" : "toggle"]()
                }
            }.bind(this)), "mouseenter" == this.options.trigger && c.on("mouseleave",
            function (a) {
                (!this.options.closeOnMouseleave || a.relatedTarget != this.wrapper[0] && !jQuery(a.relatedTarget).parents("#" + this.id).length) && this.close()
            }.bind(this)), c.data("jBox-attached-" + this.id, b), this._fireEvent("onAttach", c))
        }.bind(this)),
        this
    },
    jBox.prototype.detach = function (a) {
        return a || (a = this.attachedElements || []),
        a && a.length && jQuery.each(a,
        function (a, b) {
            b = jQuery(b),
            b.data("jBox-attached-" + this.id) && (b.off(b.data("jBox-attached-" + this.id) + ".jBox-attach-" + this.id), b.data("jBox-attached-" + this.id, null)),
            this.attachedElements = jQuery.grep(this.attachedElements,
            function (a) {
                return a != b[0]
            })
        }.bind(this)),
        this
    },
    jBox.prototype.setTitle = function (a, b) {
        !this.wrapper && this._create();
        var c = this.wrapper.height(),
        d = this.wrapper.width();
        return null == a || void 0 == a ? this : (this.title || (this.titleContainer = jQuery("<div/>", {
            "class": "jBox-title"
        }), this.title = jQuery("<div/>").appendTo(this.titleContainer), this.wrapper.addClass("jBox-hasTitle"), ("title" == this.options.closeButton || this.options.closeButton === !0 && !this.options.overlay) && (this.wrapper.addClass("jBox-closeButton-title"), this.closeButton.appendTo(this.titleContainer)), this.titleContainer.insertBefore(this.content)), this.title.html(a), !b && this.options.repositionOnContent && (c != this.wrapper.height() || d != this.wrapper.width()) && this.position(), this)
    },
    jBox.prototype.setContent = function (a, b) {
        if (null == a) return this; !this.wrapper && this._create();
        var c = this.wrapper.height(),
        d = this.wrapper.width(),
        e = jQuery("body").height(),
        f = jQuery("body").width();
        switch (this.content.children("[data-jbox-content-appended]").appendTo("body").css({
            display: "none"
        }), jQuery.type(a)) {
            case "string":
                this.content.html(a);
                break;
            case "object":
                this.content.html(""),
                a.attr("data-jbox-content-appended", 1).appendTo(this.content).css({
                    display: "block"
                })
        }
        var g = {
            x: f - jQuery("body").width(),
            y: e - jQuery("body").height()
        };
        return !b && this.options.repositionOnContent && (c != this.wrapper.height() || d != this.wrapper.width()) && this.position({
            adjustOffset: g
        }),
        this
    },
    jBox.prototype.setDimensions = function (a, b, c) {
        !this.wrapper && this._create(),
            this.content.css(a, b),
            (void 0 == c || c) && this.position()
    },
    jBox.prototype.setWidth = function (a, b) {
        this.setDimensions("width", a, b)
    },
    jBox.prototype.setHeight = function (a, b) {
        this.setDimensions("height", a, b)
    },
    jBox.prototype.position = function (a, b) {
        if (a || (a = {}), this.target = a.target || this.target || this.options.target || jQuery(window), !b && this.wrapper.css({
            top: -12e3,
            left: -12e3
        }), this.dimensions = {
            x: this.wrapper.outerWidth(),
            y: this.wrapper.outerHeight()
        },
        "mouse" != this.target) {
            if ("center" == this.options.position.x && "center" == this.options.position.y) return this.wrapper.css({
                left: "50%",
                top: "50%",
                marginLeft: this.dimensions.x * -.5 + this.options.offset.x,
                marginTop: this.dimensions.y * -.5 + this.options.offset.y
            }),
            this;
            var c = this.target.offset(); !this.target.data("jBox-fixed") && this.target.data("jBox-fixed", this.target[0] != jQuery(window)[0] && ("fixed" == this.target.css("position") || this.target.parents().filter(function () {
                return "fixed" == jQuery(this).css("position")
            }).length > 0) ? "fixed" : "static"),
            "fixed" == this.target.data("jBox-fixed") && this.options.fixed && (c.top = c.top - jQuery(window).scrollTop(), c.left = c.left - jQuery(window).scrollLeft()),
            this.targetDimensions = {
                x: this.target.outerWidth(),
                y: this.target.outerHeight(),
                top: c ? c.top : 0,
                left: c ? c.left : 0
            },
            this.pos = {};
            var d = function (a) {
                if (-1 == jQuery.inArray(this.options.position[a], ["top", "right", "bottom", "left", "center"])) return void (this.pos[this.options.attributes[a]] = this.options.position[a]);
                var b = this.options.attributes[a] = "x" == a ? "left" : "top";
                return this.pos[b] = this.targetDimensions[b],
                "center" == this.options.position[a] ? void (this.pos[b] += Math.ceil((this.targetDimensions[a] - this.dimensions[a]) / 2)) : (b != this.options.position[a] && (this.pos[b] += this.targetDimensions[a] - this.dimensions[a]), void ((this.options.outside == a || "xy" == this.options.outside) && (this.pos[b] += this.dimensions[a] * (b != this.options.position[a] ? 1 : -1))))
            }.bind(this);
            if (d("x"), d("y"), this.options.pointer && "number" != jQuery.type(this.options.position.x) && "number" != jQuery.type(this.options.position.y)) {
                var e = 0;
                switch (this.pointer.align) {
                    case "center":
                        "center" != this.options.position[this._getOpp(this.options.outside)] && (e += this.dimensions[this._getOpp(this.options.outside)] / 2);
                        break;
                    default:
                        switch (this.options.position[this._getOpp(this.options.outside)]) {
                            case "center":
                                e += (this.dimensions[this._getOpp(this.options.outside)] / 2 - this.pointer.dimensions[this._getOpp(this.options.outside)] / 2) * (this.pointer.align == this._getTL(this.pointer.align) ? 1 : -1);
                                break;
                            default:
                                e += this.pointer.align != this.options.position[this._getOpp(this.options.outside)] ? this.dimensions[this._getOpp(this.options.outside)] * (-1 !== jQuery.inArray(this.pointer.align, ["top", "left"]) ? 1 : -1) + this.pointer.dimensions[this._getOpp(this.options.outside)] / 2 * (-1 !== jQuery.inArray(this.pointer.align, ["top", "left"]) ? -1 : 1) : this.pointer.dimensions[this._getOpp(this.options.outside)] / 2 * (-1 !== jQuery.inArray(this.pointer.align, ["top", "left"]) ? 1 : -1)
                        }
                }
                e *= this.options.position[this._getOpp(this.options.outside)] == this.pointer.alignAttribute ? -1 : 1,
                e += this.pointer.offset * (this.pointer.align == this._getOpp(this._getTL(this.pointer.align)) ? 1 : -1),
                this.pos[this._getTL(this._getOpp(this.pointer.xy))] += e
            }
            return a.adjustOffset && a.adjustOffset.x && (this.pos[this.options.attributes.x] += parseInt(a.adjustOffset.x) * ("left" == this.options.attributes.x ? 1 : -1)),
            a.adjustOffset && a.adjustOffset.y && (this.pos[this.options.attributes.y] += parseInt(a.adjustOffset.y) * ("top" == this.options.attributes.y ? 1 : -1)),
            this.pos[this.options.attributes.x] += this.options.offset.x,
            this.pos[this.options.attributes.y] += this.options.offset.y,
            this.wrapper.css(this.pos),
            this._adjustPosition(),
            this
        }
    },
    jBox.prototype.open = function (a) {
        if (a || (a = {}), this.isDestroyed) return !1;
        if (!this.wrapper && this._create(), this.timer && clearTimeout(this.timer), this._blockBodyClick(), this.isDisabled) return this;
        var b = function () {
            this.source && this.options.getTitle && (this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle)), !0),
            this.source && this.options.getContent && (this.source.data("jBox-getContent") ? this.setContent(this.source.data("jBox-getContent"), !0) : this.source.attr(this.options.getContent) ? this.setContent(this.source.attr(this.options.getContent), !0) : null),
            this._fireEvent("onOpen"),
            (this.options.ajax && this.options.ajax.url && (!this.ajaxLoaded || this.options.ajax.reload) || a.ajax && a.ajax.url) && this.ajax(a.ajax || null),
            (!this.positionedOnOpen || this.options.repositionOnOpen) && this.position({
                target: a.target
            }) && (this.positionedOnOpen = !0),
            this.isClosing && this._abortAnimation(),
            this.isOpen || (this.isOpen = !0, this._attachEvents(), this.options.blockScroll && jQuery("body").addClass("jBox-blockScroll-" + this.id), this.options.overlay && this._addOverlay(), this.options.animation && !this.isClosing && this._animate("open"), this.options.fade ? this.wrapper.stop().animate({
                opacity: 1
            },
            {
                queue: !1,
                duration: this.options.fade,
                start: function () {
                    this.isOpening = !0,
                    this.wrapper.css({
                        display: "block"
                    })
                }.bind(this),
                always: function () {
                    this.isOpening = !1
                }.bind(this)
            }) : this.wrapper.css({
                display: "block",
                opacity: 1
            }))
        }.bind(this);
        return !this.options.delayOpen || this.isOpen || this.isClosing || a.ignoreDelay ? b() : this.timer = setTimeout(b, this.options.delayOpen),
        this
    },
    jBox.prototype.close = function (a) {
        if (a || (a = {}), this.isDestroyed) return !1;
        if (this.timer && clearTimeout(this.timer), this._blockBodyClick(), this.isDisabled) return this;
        var b = function () {
            this._fireEvent("onClose"),
            this.isOpen && (this.isOpen = !1, this._detachEvents(), this.options.blockScroll && jQuery("body").removeClass("jBox-blockScroll-" + this.id), this.options.overlay && this._removeOverlay(), this.options.animation && !this.isOpening && this._animate("close"), this.options.fade ? this.wrapper.stop().animate({
                opacity: 0
            },
            {
                queue: !1,
                duration: this.options.fade,
                start: function () {
                    this.isClosing = !0
                }.bind(this),
                complete: function () {
                    this.wrapper.css({
                        display: "none"
                    }),
                    this.options.onCloseComplete && this.options.onCloseComplete.bind(this)(),
                    this.options._onCloseComplete && this.options._onCloseComplete.bind(this)()
                }.bind(this),
                always: function () {
                    this.isClosing = !1
                }.bind(this)
            }) : (this.wrapper.css({
                display: "none",
                opacity: 0
            }), this.options._onCloseComplete && this.options._onCloseComplete.bind(this)()))
        }.bind(this);
        return a.ignoreDelay ? b() : this.timer = setTimeout(b, Math.max(this.options.delayClose, 10)),
        this
    },
    jBox.prototype.toggle = function (a) {
        return this[this.isOpen ? "close" : "open"](a),
        this
    },
    jBox.prototype.disable = function () {
        return this.isDisabled = !0,
        this
    },
    jBox.prototype.enable = function () {
        return this.isDisabled = !1,
        this
    },
    jBox.prototype.ajax = function (a) {
        a || (a = {}),
        this.options.ajax.getData && !a.data && this.source && void 0 != this.source.attr(this.options.ajax.getData) && (a.data = this.source.attr(this.options.ajax.getData) || "");
        var b = jQuery.extend(!0, {},
        this.options.ajax);
        this.ajaxRequest && this.ajaxRequest.abort();
        var c = a.beforeSend || b.beforeSend ||
        function () { },
        d = a.complete || b.complete ||
        function () { },
        e = jQuery.extend(!0, b, a);
        return e.beforeSend = function () {
            e.spinner && (this.wrapper.addClass("jBox-loading"), this.spinner = jQuery(e.spinner !== !0 ? e.spinner : '<div class="jBox-spinner"></div>').appendTo(this.container)),
            c.bind(this)()
        }.bind(this),
        e.complete = function (a) {
            this.wrapper.removeClass("jBox-loading"),
            this.spinner && this.spinner.remove(),
            e.setContent && this.setContent(a.responseText),
            this.ajaxLoaded = !0,
            d.bind(this)(a)
        }.bind(this),
        this.ajaxRequest = jQuery.ajax(e),
        this
    },
    jBox.prototype.audio = function (a) {
        if (a || (a = {}), jBox._audio || (jBox._audio = {}), !a.url || this.IE8) return this;
        if (!jBox._audio[a.url]) {
            var b = jQuery("<audio/>");
            jQuery("<source/>", {
                src: a.url + ".mp3"
            }).appendTo(b),
            jQuery("<source/>", {
                src: a.url + ".ogg"
            }).appendTo(b),
            jBox._audio[a.url] = b[0]
        }
        jBox._audio[a.url].volume = Math.min(void 0 != a.volume ? a.volume : (void 0 != this.options.volume ? this.options.volume : 100) / 100, 1),
        jBox._audio[a.url].pause();
        try {
            jBox._audio[a.url].currentTime = 0
        } catch (c) { }
        return jBox._audio[a.url].play(),
        this
    },
    jBox.prototype.destroy = function () {
        return this.detach().close({
            ignoreDelay: !0
        }),
        this.wrapper && this.wrapper.remove(),
        this.isDestroyed = !0,
        this
    },
    jBox._getUniqueID = function () {
        var a = 1;
        return function () {
            return a++
        }
    }(),
    jQuery.fn.jBox = function (a, b) {
        return a || (a = {}),
        b || (b = {}),
        new jBox(a, jQuery.extend(b, {
            attach: this
        }))
    },
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = Array.prototype.slice.call(arguments, 1),
        c = this,
        d = function () { },
        e = function () {
            return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        };
        return d.prototype = this.prototype,
        e.prototype = new d,
        e
    }),
    jBox
});
var noop = function () { },
defaultOptsTab = {
    curClass: "cur",
    tabClass: "tab",
    panelClass: "panel",
    triggerType: "click",
    relateType: "index",
    curTab: 0,
    initCb: noop,
    changeCb: noop
},
Tab = function (a, b) {
    var c = this;
    return c.elem = a,
    c.opts = $.extend(!0, {},
    defaultOptsTab, b),
    c.initFlag = 1,
    c.init(),
    c
};
Tab.fn = Tab.prototype,
Tab.fn.getElems = function () {
    var a = this,
    b = a.opts;
    a.tabElems = a.elem.find("." + b.tabClass),
    a.tabC = a.tabElems.parent(),
    a.panelElems = a.elem.find("." + b.panelClass),
    a.panelC = a.panelElems.parent()
},
Tab.fn.changeTab = function (a, b) {
    var c = this,
    d = c.opts;
    a.tab.removeClass(d.curClass),
    a.panel.hide(),
    b.tab.addClass(d.curClass),
    b.panel.show(),
    !c.initFlag && d.changeCb.apply(c, [a, b])
},
Tab.fn._findRelateTab = function (a) {
    var b, c, d, e = this,
    f = e.opts;
    return b = e.tabC.find("." + f.curClass),
    "relate" == f.relateType ? (c = e.panelC.find("[data-type=" + b.data("relate") + "]"), d = e.panelC.find("[data-type=" + a.data("relate") + "]")) : (c = e.panelC.children().eq(b.index()), d = e.panelC.children().eq(a.index())),
    {
        before: {
            tab: b,
            panel: c
        },
        cur: {
            tab: a,
            panel: d
        }
    }
},
Tab.fn.bindEvents = function () {
    var a = this,
    b = a.opts,
    c = b.curClass;
    a.tabElems.on(b.triggerType,
    function () {
        var b = $(this);
        if (!b.hasClass(c)) {
            var d = a._findRelateTab.apply(a, [b]);
            a.changeTab.apply(a, [d.before, d.cur])
        }
    })
},
Tab.fn._select = function (a) {
    var b = this,
    c = b._findRelateTab(a);
    b.changeTab(c.before, c.cur)
},
Tab.fn.select = function (a) {
    var b, c = this;
    return b = "number" == typeof a ? c.tabElems.eq(a) : c.tabElems.filter("[data-type=" + a + "]"),
    c._select(b),
    c
},
Tab.fn.init = function () {
    var a = this;
    a.getElems(),
    a.bindEvents(),
    a.select(0),
    a.initFlag = 0
},
$.fn.extend({
    pcTab: function (a) {
        var b = $(this),
        c = b.data("pctab");
        return c ? c : $.data(b, "pctab", new Tab(b, a))
    }
}),
function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("amap.waves",
    function () {
        return b.apply(a)
    }) : "object" == typeof exports ? module.exports = b.call(a) : a.Waves = b.call(a)
}("object" == typeof global ? global : this,
function () {
    "use strict";
    function a(a) {
        return null !== a && a === a.window
    }
    function b(b) {
        return a(b) ? b : 9 === b.nodeType && b.defaultView
    }
    function c(a) {
        var b = typeof a;
        return "function" === b || "object" === b && !!a
    }
    function d(a) {
        return c(a) && a.nodeType > 0
    }
    function e(a) {
        var b = m.call(a);
        return "[object String]" === b ? l(a) : c(a) && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(b) && a.hasOwnProperty("length") ? a : d(a) ? [a] : []
    }
    function f(a) {
        var c, d, e = {
            top: 0,
            left: 0
        },
        f = a && a.ownerDocument;
        return c = f.documentElement,
        "undefined" != typeof a.getBoundingClientRect && (e = a.getBoundingClientRect()),
        d = b(f),
        {
            top: e.top + d.pageYOffset - c.clientTop,
            left: e.left + d.pageXOffset - c.clientLeft
        }
    }
    function g(a) {
        var b = "";
        for (var c in a) a.hasOwnProperty(c) && (b += c + ":" + a[c] + ";");
        return b
    }
    function h(a, b, c) {
        if (c) {
            c.classList.remove("waves-rippling");
            var d = c.getAttribute("data-x"),
            e = c.getAttribute("data-y"),
            f = c.getAttribute("data-scale"),
            h = c.getAttribute("data-translate"),
            i = Date.now() - Number(c.getAttribute("data-hold")),
            j = 350 - i;
            0 > j && (j = 0),
            "mousemove" === a.type && (j = 150);
            var k = "mousemove" === a.type ? 2500 : o.duration;
            setTimeout(function () {
                var a = {
                    top: e + "px",
                    left: d + "px",
                    opacity: "0",
                    "-webkit-transition-duration": k + "ms",
                    "-moz-transition-duration": k + "ms",
                    "-o-transition-duration": k + "ms",
                    "transition-duration": k + "ms",
                    "-webkit-transform": f + " " + h,
                    "-moz-transform": f + " " + h,
                    "-ms-transform": f + " " + h,
                    "-o-transform": f + " " + h,
                    transform: f + " " + h
                };
                c.setAttribute("style", g(a)),
                setTimeout(function () {
                    try {
                        b.removeChild(c)
                    } catch (a) {
                        return !1
                    }
                },
                k)
            },
            j)
        }
    }
    function i(a) {
        if (q.allowEvent(a) === !1) return null;
        for (var b = null,
        c = a.target || a.srcElement; null !== c.parentElement;) {
            if (c.classList.contains("waves-effect") && !(c instanceof SVGElement)) {
                b = c;
                break
            }
            c = c.parentElement
        }
        return b
    }
    function j(a) {
        q.registerEvent(a);
        var b = i(a);
        if (null !== b) if ("touchstart" === a.type && o.delay) {
            var c = !1,
            d = setTimeout(function () {
                d = null,
                o.show(a, b)
            },
            o.delay),
            e = function (e) {
                d && (clearTimeout(d), d = null, o.show(a, b)),
                c || (c = !0, o.hide(e, b))
            },
            f = function (a) {
                d && (clearTimeout(d), d = null),
                e(a)
            };
            b.addEventListener("touchmove", f, !1),
            b.addEventListener("touchend", e, !1),
            b.addEventListener("touchcancel", e, !1)
        } else o.show(a, b),
        n && (b.addEventListener("touchend", o.hide, !1), b.addEventListener("touchcancel", o.hide, !1)),
        b.addEventListener("mouseup", o.hide, !1),
        b.addEventListener("mouseleave", o.hide, !1)
    }
    var k = k || {},
    l = document.querySelectorAll.bind(document),
    m = Object.prototype.toString,
    n = "ontouchstart" in window,
    o = {
        duration: 750,
        delay: 200,
        show: function (a, b, c) {
            if (2 === a.button) return !1;
            b = b || this;
            var d = document.createElement("div");
            d.className = "waves-ripple waves-rippling",
            b.appendChild(d);
            var e = f(b),
            h = a.pageY - e.top,
            i = a.pageX - e.left,
            j = "scale(" + b.clientWidth / 100 * 3 + ")",
            k = "translate(0,0)";
            c && (k = "translate(" + c.x + "px, " + c.y + "px)"),
            "touches" in a && a.touches.length && (h = a.touches[0].pageY - e.top, i = a.touches[0].pageX - e.left),
            d.setAttribute("data-hold", Date.now()),
            d.setAttribute("data-x", i),
            d.setAttribute("data-y", h),
            d.setAttribute("data-scale", j),
            d.setAttribute("data-translate", k);
            var l = {
                top: h + "px",
                left: i + "px"
            };
            d.classList.add("waves-notransition"),
            d.setAttribute("style", g(l)),
            d.classList.remove("waves-notransition"),
            l["-webkit-transform"] = j + " " + k,
            l["-moz-transform"] = j + " " + k,
            l["-ms-transform"] = j + " " + k,
            l["-o-transform"] = j + " " + k,
            l.transform = j + " " + k,
            l.opacity = "1";
            var m = "mousemove" === a.type ? 2500 : o.duration;
            l["-webkit-transition-duration"] = m + "ms",
            l["-moz-transition-duration"] = m + "ms",
            l["-o-transition-duration"] = m + "ms",
            l["transition-duration"] = m + "ms",
            d.setAttribute("style", g(l))
        },
        hide: function (a, b) {
            b = b || this;
            for (var c = b.getElementsByClassName("waves-rippling"), d = 0, e = c.length; e > d; d++) h(a, b, c[d])
        }
    },
    p = {
        input: function (a) {
            var b = a.parentNode;
            if ("i" !== b.tagName.toLowerCase() || !b.classList.contains("waves-effect")) {
                var c = document.createElement("i");
                c.className = a.className + " waves-input-wrapper",
                a.className = "waves-button-input",
                b.replaceChild(c, a),
                c.appendChild(a);
                var d = window.getComputedStyle(a, null),
                e = d.color,
                f = d.backgroundColor;
                c.setAttribute("style", "color:" + e + ";background:" + f),
                a.setAttribute("style", "background-color:rgba(0,0,0,0);")
            }
        },
        img: function (a) {
            var b = a.parentNode;
            if ("i" !== b.tagName.toLowerCase() || !b.classList.contains("waves-effect")) {
                var c = document.createElement("i");
                b.replaceChild(c, a),
                c.appendChild(a)
            }
        }
    },
    q = {
        touches: 0,
        allowEvent: function (a) {
            var b = !0;
            return /^(mousedown|mousemove)$/.test(a.type) && q.touches && (b = !1),
            b
        },
        registerEvent: function (a) {
            var b = a.type;
            "touchstart" === b ? q.touches += 1 : /^(touchend|touchcancel)$/.test(b) && setTimeout(function () {
                q.touches && (q.touches -= 1)
            },
            500)
        }
    };
    return k.init = function (a) {
        var b = document.body;
        a = a || {},
        "duration" in a && (o.duration = a.duration),
        "delay" in a && (o.delay = a.delay),
        n && (b.addEventListener("touchstart", j, !1), b.addEventListener("touchcancel", q.registerEvent, !1), b.addEventListener("touchend", q.registerEvent, !1)),
        b.addEventListener("mousedown", j, !1)
    },
    k.attach = function (a, b) {
        a = e(a),
        "[object Array]" === m.call(b) && (b = b.join(" ")),
        b = b ? " " + b : "";
        for (var c, d, f = 0,
        g = a.length; g > f; f++) c = a[f],
        d = c.tagName.toLowerCase(),
        -1 !== ["input", "img"].indexOf(d) && (p[d](c), c = c.parentElement),
        c.className += " waves-effect" + b
    },
    k.ripple = function (a, b) {
        a = e(a);
        var c = a.length;
        if (b = b || {},
        b.wait = b.wait || 0, b.position = b.position || null, c) for (var d, g, h, i = {},
        j = 0,
        k = {
                type: "mousedown",
                button: 1
        },
        l = function (a, b) {
            return function () {
                o.hide(a, b)
        }
        }; c > j; j++) if (d = a[j], g = b.position || {
                x: d.clientWidth / 2,
                y: d.clientHeight / 2
        },
        h = f(d), i.x = h.left + g.x, i.y = h.top + g.y, k.pageX = i.x, k.pageY = i.y, o.show(k, d), b.wait >= 0 && null !== b.wait) {
            var m = {
                type: "mouseup",
                button: 1
            };
            setTimeout(l(m, d), b.wait)
        }
    },
    k.calm = function (a) {
        a = e(a);
        for (var b = {
            type: "mouseup",
            button: 1
        },
        c = 0, d = a.length; d > c; c++) o.hide(b, a[c])
    },
    k.displayEffect = function (a) {
        console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"),
        k.init(a)
    },
    k
}),
function (a) {
    a(["jquery"],
    function (a) {
        return function () {
            function b(a, b, c) {
                return o({
                    type: v.error,
                    iconClass: p().iconClasses.error,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function c(b, c) {
                return b || (b = p()),
                r = a("#" + b.containerId),
                r.length ? r : (c && (r = l(b)), r)
            }
            function d(a, b, c) {
                return o({
                    type: v.info,
                    iconClass: p().iconClasses.info,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function e(a) {
                s = a
            }
            function f(a, b, c) {
                return o({
                    type: v.success,
                    iconClass: p().iconClasses.success,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function g(a, b, c) {
                return o({
                    type: v.warning,
                    iconClass: p().iconClasses.warning,
                    message: a,
                    optionsOverride: c,
                    title: b
                })
            }
            function h(a, b) {
                var d = p();
                r || c(d),
                k(a, d, b) || j(d)
            }
            function i(b) {
                var d = p();
                return r || c(d),
                b && 0 === a(":focus", b).length ? void q(b) : void (r.children().length && r.remove())
            }
            function j(b) {
                for (var c = r.children(), d = c.length - 1; d >= 0; d--) k(a(c[d]), b)
            }
            function k(b, c, d) {
                var e = d && d.force ? d.force : !1;
                return b && (e || 0 === a(":focus", b).length) ? (b[c.hideMethod]({
                    duration: c.hideDuration,
                    easing: c.hideEasing,
                    complete: function () {
                        q(b)
                    }
                }), !0) : !1
            }
            function l(b) {
                return r = a("<div/>").attr("id", b.containerId).addClass(b.positionClass).attr("aria-live", "polite").attr("role", "alert"),
                r.appendTo(a(b.target)),
                r
            }
            function m() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-center",
                    timeOut: 1500,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: '<button type="button">&times;</button>',
                    newestOnTop: !0,
                    preventDuplicates: !1,
                    progressBar: !1
                }
            }
            function n(a) {
                s && s(a)
            }
            function o(b) {
                function d() {
                    g(),
                    i(),
                    j(),
                    k(),
                    l(),
                    h()
                }
                function e() {
                    A.hover(v, s),
                    !x.onclick && x.tapToDismiss && A.click(o),
                    x.closeButton && E && E.click(function (a) {
                        a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble && a.cancelBubble !== !0 && (a.cancelBubble = !0),
                        o(!0)
                    }),
                    x.onclick && A.click(function () {
                        x.onclick(),
                        o()
                    })
                }
                function f() {
                    A.hide(),
                    A[x.showMethod]({
                        duration: x.showDuration,
                        easing: x.showEasing,
                        complete: x.onShown
                    }),
                    x.timeOut > 0 && (z = setTimeout(o, x.timeOut), F.maxHideTime = parseFloat(x.timeOut), F.hideEta = (new Date).getTime() + F.maxHideTime, x.progressBar && (F.intervalId = setInterval(w, 10)))
                }
                function g() {
                    b.iconClass && A.addClass(x.toastClass).addClass(y)
                }
                function h() {
                    x.newestOnTop ? r.prepend(A) : r.append(A)
                }
                function i() {
                    b.title && (B.append(b.title).addClass(x.titleClass), A.append(B))
                }
                function j() {
                    b.message && (C.append(b.message).addClass(x.messageClass), A.append(C))
                }
                function k() {
                    x.closeButton && (E.addClass("toast-close-button").attr("role", "button"), A.prepend(E))
                }
                function l() {
                    x.progressBar && (D.addClass("toast-progress"), A.prepend(D))
                }
                function m(a, b) {
                    if (a.preventDuplicates) {
                        if (b.message === t) return !0;
                        t = b.message
                    }
                    return !1
                }
                function o(b) {
                    return !a(":focus", A).length || b ? (clearTimeout(F.intervalId), A[x.hideMethod]({
                        duration: x.hideDuration,
                        easing: x.hideEasing,
                        complete: function () {
                            q(A),
                            x.onHidden && "hidden" !== G.state && x.onHidden(),
                            G.state = "hidden",
                            G.endTime = new Date,
                            n(G)
                        }
                    })) : void 0
                }
                function s() {
                    (x.timeOut > 0 || x.extendedTimeOut > 0) && (z = setTimeout(o, x.extendedTimeOut), F.maxHideTime = parseFloat(x.extendedTimeOut), F.hideEta = (new Date).getTime() + F.maxHideTime)
                }
                function v() {
                    clearTimeout(z),
                    F.hideEta = 0,
                    A.stop(!0, !0)[x.showMethod]({
                        duration: x.showDuration,
                        easing: x.showEasing
                    })
                }
                function w() {
                    var a = (F.hideEta - (new Date).getTime()) / F.maxHideTime * 100;
                    D.width(a + "%")
                }
                var x = p(),
                y = b.iconClass || x.iconClass;
                if ("undefined" != typeof b.optionsOverride && (x = a.extend(x, b.optionsOverride), y = b.optionsOverride.iconClass || y), !m(x, b)) {
                    u++,
                    r = c(x, !0);
                    var z = null,
                    A = a("<div/>"),
                    B = a("<div/>"),
                    C = a("<div/>"),
                    D = a("<div/>"),
                    E = a(x.closeHtml),
                    F = {
                        intervalId: null,
                        hideEta: null,
                        maxHideTime: null
                    },
                    G = {
                        toastId: u,
                        state: "visible",
                        startTime: new Date,
                        options: x,
                        map: b
                    };
                    return d(),
                    f(),
                    e(),
                    n(G),
                    x.debug && console && console.log(G),
                    A
                }
            }
            function p() {
                return a.extend({},
                m(), w.options)
            }
            function q(a) {
                r || (r = c()),
                a.is(":visible") || (a.remove(), a = null, 0 === r.children().length && (r.remove(), t = void 0))
            }
            var r, s, t, u = 0,
            v = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            },
            w = {
                clear: h,
                remove: i,
                error: b,
                getContainer: c,
                info: d,
                options: {},
                subscribe: e,
                success: f,
                version: "2.1.1",
                warning: g
            };
            return w
        }()
    })
}("function" == typeof define && define.amd ? define : function (a, b) {
    "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : window.toastr = b(window.jQuery)
});