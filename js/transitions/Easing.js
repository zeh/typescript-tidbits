var zehfernando;
(function (zehfernando) {
    var transitions;
    (function (transitions) {
        var Easing = (function () {
            function Easing() {
            }
            Easing.none = function (t) {
                return t;
            };
            Easing.quadIn = function (t) {
                return t * t;
            };
            Easing.quadOut = function (t) {
                return -t * (t - 2);
            };
            Easing.quadInOut = function (t) {
                return ((t *= 2) < 1) ? t * t * 0.5 : -0.5 * (--t * (t - 2) - 1);
            };
            Easing.cubicIn = function (t) {
                return t * t * t;
            };
            Easing.cubicOut = function (t) {
                return (t = t - 1) * t * t + 1;
            };
            Easing.cubicInOut = function (t) {
                return (t *= 2) < 1 ? Easing.cubicIn(t) / 2 : Easing.cubicOut(t - 1) / 2 + 0.5;
            };
            Easing.quartIn = function (t) {
                return t * t * t * t;
            };
            Easing.quartOut = function (t) {
                t--;
                return -1 * (t * t * t * t - 1);
            };
            Easing.quartInOut = function (t) {
                return (t *= 2) < 1 ? Easing.quartIn(t) / 2 : Easing.quartOut(t - 1) / 2 + 0.5;
            };
            Easing.quintIn = function (t) {
                return t * t * t * t * t;
            };
            Easing.quintOut = function (t) {
                t--;
                return t * t * t * t * t + 1;
            };
            Easing.quintInOut = function (t) {
                return (t *= 2) < 1 ? Easing.quintIn(t) / 2 : Easing.quintOut(t - 1) / 2 + 0.5;
            };
            Easing.sineIn = function (t) {
                return -1 * Math.cos(t * Easing.HALF_PI) + 1;
            };
            Easing.sineOut = function (t) {
                return Math.sin(t * Easing.HALF_PI);
            };
            Easing.sineInOut = function (t) {
                return (t *= 2) < 1 ? Easing.sineIn(t) / 2 : Easing.sineOut(t - 1) / 2 + 0.5;
            };
            Easing.expoIn = function (t) {
                return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1)) - 0.001;
            };
            Easing.expoOut = function (t) {
                return (t >= 0.999) ? 1 : 1.001 * (-Math.pow(2, -10 * t) + 1);
            };
            Easing.expoInOut = function (t) {
                return (t *= 2) < 1 ? Easing.expoIn(t) / 2 : Easing.expoOut(t - 1) / 2 + 0.5;
            };
            Easing.circIn = function (t) {
                return -1 * (Math.sqrt(1 - t * t) - 1);
            };
            Easing.circOut = function (t) {
                t--;
                return Math.sqrt(1 - t * t);
            };
            Easing.circInOut = function (t) {
                return (t *= 2) < 1 ? Easing.circIn(t) / 2 : Easing.circOut(t - 1) / 2 + 0.5;
            };
            Easing.elasticIn = function (t, a, p) {
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
                    s = p / Easing.TWO_PI * Math.asin(1 / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * Easing.TWO_PI / p));
            };
            Easing.elasticOut = function (t, a, p) {
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
                    s = p / Easing.TWO_PI * Math.asin(1 / a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t - s) * Easing.TWO_PI / p) + 1);
            };
            Easing.backIn = function (t, s) {
                if (s === void 0) { s = 1.70158; }
                return t * t * ((s + 1) * t - s);
            };
            Easing.backOut = function (t, s) {
                if (s === void 0) { s = 1.70158; }
                t--;
                return t * t * ((s + 1) * t + s) + 1;
            };
            Easing.backInOut = function (t) {
                return (t *= 2) < 1 ? Easing.backIn(t) / 2 : Easing.backOut(t - 1) / 2 + 0.5;
            };
            Easing.bounceIn = function (t) {
                return 1 - Easing.bounceOut(1 - t);
            };
            Easing.bounceOut = function (t) {
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
            Easing.combined = function (t, __equations) {
                var l = __equations.length;
                var eq = Math.floor(t * l);
                if (eq == __equations.length)
                    eq = l - 1;
                return Number(__equations[eq](t * l - eq));
            };
            Easing.HALF_PI = Math.PI / 2;
            Easing.TWO_PI = Math.PI * 2;
            return Easing;
        })();
        transitions.Easing = Easing;
    })(transitions = zehfernando.transitions || (zehfernando.transitions = {}));
})(zehfernando || (zehfernando = {}));
//# sourceMappingURL=Easing.js.map