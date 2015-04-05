var zehfernando;
(function (zehfernando) {
    var utils;
    (function (utils) {
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.clamp = function (value, min, max) {
                if (min === void 0) { min = 0; }
                if (max === void 0) { max = 1; }
                return value < min ? min : value > max ? max : value;
            };
            MathUtils.clampAuto = function (value, clamp1, clamp2) {
                if (clamp1 === void 0) { clamp1 = 0; }
                if (clamp2 === void 0) { clamp2 = 1; }
                if (clamp2 < clamp1) {
                    var v = clamp2;
                    clamp2 = clamp1;
                    clamp1 = v;
                }
                return value < clamp1 ? clamp1 : value > clamp2 ? clamp2 : value;
            };
            MathUtils.map = function (value, oldMin, oldMax, newMin, newMax, clamp) {
                if (newMin === void 0) { newMin = 0; }
                if (newMax === void 0) { newMax = 1; }
                if (clamp === void 0) { clamp = false; }
                if (oldMin == oldMax)
                    return newMin;
                this.map_p = ((value - oldMin) / (oldMax - oldMin) * (newMax - newMin)) + newMin;
                if (clamp)
                    this.map_p = newMin < newMax ? this.clamp(this.map_p, newMin, newMax) : this.clamp(this.map_p, newMax, newMin);
                return this.map_p;
            };
            MathUtils.rangeMod = function (value, min, pseudoMax) {
                var range = pseudoMax - min;
                value = (value - min) % range;
                if (value < 0)
                    value = range - (-value % range);
                value += min;
                return value;
            };
            MathUtils.isPowerOfTwo = function (value) {
                while (value % 2 == 0 && value > 2)
                    value /= 2;
                return value == 2;
            };
            MathUtils.getHighestPowerOfTwo = function (value) {
                var c = 1;
                while (c < value)
                    c *= 2;
                return c;
            };
            MathUtils.DEG2RAD = 1 / 180 * Math.PI;
            MathUtils.RAD2DEG = 1 / Math.PI * 180;
            return MathUtils;
        })();
        utils.MathUtils = MathUtils;
    })(utils = zehfernando.utils || (zehfernando.utils = {}));
})(zehfernando || (zehfernando = {}));
//# sourceMappingURL=MathUtils.js.map