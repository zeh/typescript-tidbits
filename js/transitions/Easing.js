var zehfernando;
(function (zehfernando) {
    var transitions;
    (function (transitions) {
        var Equations = (function () {
            function Equations() {
            }
            Equations.none = function (t) {
                return t;
            };
            Equations.quadIn = function (t) {
                return t * t;
            };
            Equations.quadOut = function (t) {
                return -t * (t - 2);
            };
            Equations.quadInOut = function (t) {
                return ((t *= 2) < 1) ? t * t * 0.5 : -0.5 * (--t * (t - 2) - 1);
            };
            Equations.cubicIn = function (t) {
                return t * t * t;
            };
            Equations.cubicOut = function (t) {
                return (t = t - 1) * t * t + 1;
            };
            Equations.cubicInOut = function (t) {
                return (t *= 2) < 1 ? this.cubicIn(t) / 2 : this.cubicOut(t - 1) / 2 + 0.5;
            };
            Equations.quartIn = function (t) {
                return t * t * t * t;
            };
            Equations.quartOut = function (t) {
                t--;
                return -1 * (t * t * t * t - 1);
            };
            Equations.quartInOut = function (t) {
                return (t *= 2) < 1 ? this.quartIn(t) / 2 : this.quartOut(t - 1) / 2 + 0.5;
            };
            Equations.quintIn = function (t) {
                return t * t * t * t * t;
            };
            Equations.quintOut = function (t) {
                t--;
                return t * t * t * t * t + 1;
            };
            Equations.quintInOut = function (t) {
                return (t *= 2) < 1 ? this.quintIn(t) / 2 : this.quintOut(t - 1) / 2 + 0.5;
            };
            Equations.sineIn = function (t) {
                return -1 * Math.cos(t * this.HALF_PI) + 1;
            };
            Equations.sineOut = function (t) {
                return Math.sin(t * this.HALF_PI);
            };
            Equations.sineInOut = function (t) {
                return (t *= 2) < 1 ? this.sineIn(t) / 2 : this.sineOut(t - 1) / 2 + 0.5;
            };
            Equations.expoIn = function (t) {
                return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1)) - 0.001;
            };
            Equations.expoOut = function (t) {
                return (t >= 0.999) ? 1 : 1.001 * (-Math.pow(2, -10 * t) + 1);
            };
            Equations.expoInOut = function (t) {
                return (t *= 2) < 1 ? this.expoIn(t) / 2 : this.expoOut(t - 1) / 2 + 0.5;
            };
            Equations.circIn = function (t) {
                return -1 * (Math.sqrt(1 - t * t) - 1);
            };
            Equations.circOut = function (t) {
                t--;
                return Math.sqrt(1 - t * t);
            };
            Equations.circInOut = function (t) {
                return (t *= 2) < 1 ? this.circIn(t) / 2 : this.circOut(t - 1) / 2 + 0.5;
            };
            Equations.elasticIn = function (t, a, p) {
                if (a === void 0) { a = 0; }
                if (p === void 0) { p = 0.3; }
                if (t == 0)
                    return 0;
                if (t == 1)
                    return 1;
                var s;
                if (a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else {
                    s = p / this.TWO_PI * Math.asin(1 / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * this.TWO_PI / p));
            };
            Equations.elasticOut = function (t, a, p) {
                if (a === void 0) { a = 0; }
                if (p === void 0) { p = 0.3; }
                if (t == 0)
                    return 0;
                if (t == 1)
                    return 1;
                var s;
                if (a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else {
                    s = p / this.TWO_PI * Math.asin(1 / a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t - s) * this.TWO_PI / p) + 1);
            };
            Equations.backIn = function (t, s) {
                if (s === void 0) { s = 1.70158; }
                return t * t * ((s + 1) * t - s);
            };
            Equations.backOut = function (t, s) {
                if (s === void 0) { s = 1.70158; }
                t--;
                return t * t * ((s + 1) * t + s) + 1;
            };
            Equations.backInOut = function (t) {
                return (t *= 2) < 1 ? this.backIn(t) / 2 : this.backOut(t - 1) / 2 + 0.5;
            };
            Equations.bounceIn = function (t) {
                return 1 - this.bounceOut(1 - t);
            };
            Equations.bounceOut = function (t) {
                if (t < (1 / 2.75)) {
                    return 7.5625 * t * t;
                }
                else if (t < (2 / 2.75)) {
                    return 7.5625 * (t -= (1.5 / 2.75)) * t + .75;
                }
                else if (t < (2.5 / 2.75)) {
                    return 7.5625 * (t -= (2.25 / 2.75)) * t + .9375;
                }
                else {
                    return 7.5625 * (t -= (2.625 / 2.75)) * t + .984375;
                }
            };
            Equations.combined = function (t, __equations) {
                var l = __equations.length;
                var eq = Math.floor(t * l);
                if (eq == __equations.length)
                    eq = l - 1;
                return Number(__equations[eq](t * l - eq));
            };
            Equations.HALF_PI = Math.PI / 2;
            Equations.TWO_PI = Math.PI * 2;
            return Equations;
        })();
    })(transitions = zehfernando.transitions || (zehfernando.transitions = {}));
})(zehfernando || (zehfernando = {}));
//# sourceMappingURL=Easing.js.map