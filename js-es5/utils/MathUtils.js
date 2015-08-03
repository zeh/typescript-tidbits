var zehfernando;
(function (zehfernando) {
    var utils;
    (function (utils) {
        /**
         * @author Zeh Fernando - z at zeh.com.br
         */
        var MathUtils = (function () {
            function MathUtils() {
            }
            // Inlining: http://www.bytearray.org/?p=4789
            // Not working: returning a buffer underflow every time I try using it
            /**
             * Clamps a number to a range, by restricting it to a minimum and maximum values: if the passed value is lower than the minimum value, it's replaced by the minimum; if it's higher than the maximum value, it's replaced by the maximum; if not, it's unchanged.
             * @param value	The value to be clamped.
             * @param min		Minimum value allowed.
             * @param max		Maximum value allowed.
             * @return			The newly clamped value.
             */
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
            /**
             * Maps a value from a range, determined by old minimum and maximum values, to a new range, determined by new minimum and maximum values. These minimum and maximum values are referential; the new value is not clamped by them.
             * @param value	The value to be re-mapped.
             * @param oldMin	The previous minimum value.
             * @param oldMax	The previous maximum value.
             * @param newMin	The new minimum value.
             * @param newMax	The new maximum value.
             * @return			The new value, mapped to the new range.
             */
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
            /**
             * Clamps a value to a range, by restricting it to a minimum and maximum values but folding the value to the range instead of simply resetting to the minimum and maximum. It works like a more powerful Modulo function.
             * @param value	The value to be clamped.
             * @param min		Minimum value allowed.
             * @param max		Maximum value allowed.
             * @return			The newly clamped value.
             * @example Some examples:
             * <listing version="3.0">
             * 	trace(MathUtils.roundClamp(14, 0, 10));
             * 	// Result: 4
             *
             * 	trace(MathUtils.roundClamp(360, 0, 360));
             * 	// Result: 0
             *
             * 	trace(MathUtils.roundClamp(360, -180, 180));
             * 	// Result: 0
             *
             * 	trace(MathUtils.roundClamp(21, 0, 10));
             * 	// Result: 1
             *
             * 	trace(MathUtils.roundClamp(-98, 0, 100));
             * 	// Result: 2
             * </listing>
             */
            // Need a better name?
            MathUtils.rangeMod = function (value, min, pseudoMax) {
                var range = pseudoMax - min;
                value = (value - min) % range;
                if (value < 0)
                    value = range - (-value % range);
                value += min;
                return value;
            };
            MathUtils.isPowerOfTwo = function (value) {
                // Return true if a number if a power of two (2, 4, 8, etc)
                // There's probably a better way, but trying to avoid bitwise manipulations
                while (value % 2 == 0 && value > 2)
                    value /= 2;
                return value == 2;
            };
            MathUtils.getHighestPowerOfTwo = function (value) {
                // Return a power of two number that is higher than the passed value
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL01hdGhVdGlscy50cyJdLCJuYW1lcyI6WyJ6ZWhmZXJuYW5kbyIsInplaGZlcm5hbmRvLnV0aWxzIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmNvbnN0cnVjdG9yIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmNsYW1wIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmNsYW1wQXV0byIsInplaGZlcm5hbmRvLnV0aWxzLk1hdGhVdGlscy5tYXAiLCJ6ZWhmZXJuYW5kby51dGlscy5NYXRoVXRpbHMucmFuZ2VNb2QiLCJ6ZWhmZXJuYW5kby51dGlscy5NYXRoVXRpbHMuaXNQb3dlck9mVHdvIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmdldEhpZ2hlc3RQb3dlck9mVHdvIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFdBQVcsQ0FvR2pCO0FBcEdELFdBQU8sV0FBVztJQUFDQSxJQUFBQSxLQUFLQSxDQW9HdkJBO0lBcEdrQkEsV0FBQUEsS0FBS0EsRUFBQ0EsQ0FBQ0E7UUFFekJDLEFBR0FBOztXQURHQTs7WUFDSEM7WUE2RkFDLENBQUNBO1lBckZBRCw2Q0FBNkNBO1lBQzdDQSxzRUFBc0VBO1lBRXRFQTs7Ozs7O2VBTUdBO1lBQ0lBLGVBQUtBLEdBQVpBLFVBQWFBLEtBQVlBLEVBQUVBLEdBQWNBLEVBQUVBLEdBQWNBO2dCQUE5QkUsbUJBQWNBLEdBQWRBLE9BQWNBO2dCQUFFQSxtQkFBY0EsR0FBZEEsT0FBY0E7Z0JBQ3hEQSxNQUFNQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxLQUFLQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUN0REEsQ0FBQ0E7WUFFTUYsbUJBQVNBLEdBQWhCQSxVQUFpQkEsS0FBWUEsRUFBRUEsTUFBaUJBLEVBQUVBLE1BQWlCQTtnQkFBcENHLHNCQUFpQkEs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R0FBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pCQSxPQUFPQSxDQUFDQSxHQUFHQSxLQUFLQTtvQkFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQTtZQTFGTVAsaUJBQU9BLEdBQVVBLENBQUNBLEdBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO1lBQ2pDQSxpQkFBT0EsR0FBVUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUEwRnpDQSxnQkFBQ0E7UUFBREEsQ0E3RkFELEFBNkZDQyxJQUFBRDtRQTdGWUEsZUFBU0EsWUE2RnJCQSxDQUFBQTtJQUVGQSxDQUFDQSxFQXBHa0JELEtBQUtBLEdBQUxBLGlCQUFLQSxLQUFMQSxpQkFBS0EsUUFvR3ZCQTtBQUFEQSxDQUFDQSxFQXBHTSxXQUFXLEtBQVgsV0FBVyxRQW9HakIiLCJmaWxlIjoidXRpbHMvTWF0aFV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIHplaGZlcm5hbmRvLnV0aWxzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQGF1dGhvciBaZWggRmVybmFuZG8gLSB6IGF0IHplaC5jb20uYnJcclxuXHQgKi9cclxuXHRleHBvcnQgY2xhc3MgTWF0aFV0aWxzIHtcclxuXHJcblx0XHRzdGF0aWMgREVHMlJBRDpudW1iZXIgPSAxLzE4MCAqIE1hdGguUEk7XHJcblx0XHRzdGF0aWMgUkFEMkRFRzpudW1iZXIgPSAxL01hdGguUEkgKiAxODA7XHJcblxyXG5cdFx0Ly8gVGVtcG9yYXJ5IHZhcnMgZm9yIGZhc3RlciBhbGxvY2F0aW9uc1xyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgbWFwX3A6bnVtYmVyO1xyXG5cclxuXHRcdC8vIElubGluaW5nOiBodHRwOi8vd3d3LmJ5dGVhcnJheS5vcmcvP3A9NDc4OVxyXG5cdFx0Ly8gTm90IHdvcmtpbmc6IHJldHVybmluZyBhIGJ1ZmZlciB1bmRlcmZsb3cgZXZlcnkgdGltZSBJIHRyeSB1c2luZyBpdFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xhbXBzIGEgbnVtYmVyIHRvIGEgcmFuZ2UsIGJ5IHJlc3RyaWN0aW5nIGl0IHRvIGEgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXM6IGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgbG93ZXIgdGhhbiB0aGUgbWluaW11bSB2YWx1ZSwgaXQncyByZXBsYWNlZCBieSB0aGUgbWluaW11bTsgaWYgaXQncyBoaWdoZXIgdGhhbiB0aGUgbWF4aW11bSB2YWx1ZSwgaXQncyByZXBsYWNlZCBieSB0aGUgbWF4aW11bTsgaWYgbm90LCBpdCdzIHVuY2hhbmdlZC5cclxuXHRcdCAqIEBwYXJhbSB2YWx1ZVx0VGhlIHZhbHVlIHRvIGJlIGNsYW1wZWQuXHJcblx0XHQgKiBAcGFyYW0gbWluXHRcdE1pbmltdW0gdmFsdWUgYWxsb3dlZC5cclxuXHRcdCAqIEBwYXJhbSBtYXhcdFx0TWF4aW11bSB2YWx1ZSBhbGxvd2VkLlxyXG5cdFx0ICogQHJldHVyblx0XHRcdFRoZSBuZXdseSBjbGFtcGVkIHZhbHVlLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgY2xhbXAodmFsdWU6bnVtYmVyLCBtaW46bnVtYmVyID0gMCwgbWF4Om51bWJlciA9IDEpOm51bWJlciB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGNsYW1wQXV0byh2YWx1ZTpudW1iZXIsIGNsYW1wMTpudW1iZXIgPSAwLCBjbGFtcDI6bnVtYmVyID0gMSk6bnVtYmVyIHtcclxuXHRcdFx0aWYgKGNsYW1wMiA8IGNsYW1wMSkge1xyXG5cdFx0XHRcdHZhciB2Om51bWJlciA9IGNsYW1wMjtcclxuXHRcdFx0XHRjbGFtcDIgPSBjbGFtcDE7XHJcblx0XHRcdFx0Y2xhbXAxID0gdjtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsdWUgPCBjbGFtcDEgPyBjbGFtcDEgOiB2YWx1ZSA+IGNsYW1wMiA/IGNsYW1wMiA6IHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogTWFwcyBhIHZhbHVlIGZyb20gYSByYW5nZSwgZGV0ZXJtaW5lZCBieSBvbGQgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMsIHRvIGEgbmV3IHJhbmdlLCBkZXRlcm1pbmVkIGJ5IG5ldyBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy4gVGhlc2UgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMgYXJlIHJlZmVyZW50aWFsOyB0aGUgbmV3IHZhbHVlIGlzIG5vdCBjbGFtcGVkIGJ5IHRoZW0uXHJcblx0XHQgKiBAcGFyYW0gdmFsdWVcdFRoZSB2YWx1ZSB0byBiZSByZS1tYXBwZWQuXHJcblx0XHQgKiBAcGFyYW0gb2xkTWluXHRUaGUgcHJldmlvdXMgbWluaW11bSB2YWx1ZS5cclxuXHRcdCAqIEBwYXJhbSBvbGRNYXhcdFRoZSBwcmV2aW91cyBtYXhpbXVtIHZhbHVlLlxyXG5cdFx0ICogQHBhcmFtIG5ld01pblx0VGhlIG5ldyBtaW5pbXVtIHZhbHVlLlxyXG5cdFx0ICogQHBhcmFtIG5ld01heFx0VGhlIG5ldyBtYXhpbXVtIHZhbHVlLlxyXG5cdFx0ICogQHJldHVyblx0XHRcdFRoZSBuZXcgdmFsdWUsIG1hcHBlZCB0byB0aGUgbmV3IHJhbmdlLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgbWFwKHZhbHVlOm51bWJlciwgb2xkTWluOm51bWJlciwgb2xkTWF4Om51bWJlciwgbmV3TWluOm51bWJlciA9IDAsIG5ld01heDpudW1iZXIgPSAxLCBjbGFtcDpCb29sZWFuID0gZmFsc2UpOm51bWJlciB7XHJcblx0XHRcdGlmIChvbGRNaW4gPT0gb2xkTWF4KSByZXR1cm4gbmV3TWluO1xyXG5cdFx0XHR0aGlzLm1hcF9wID0gKCh2YWx1ZS1vbGRNaW4pIC8gKG9sZE1heC1vbGRNaW4pICogKG5ld01heC1uZXdNaW4pKSArIG5ld01pbjtcclxuXHRcdFx0aWYgKGNsYW1wKSB0aGlzLm1hcF9wID0gbmV3TWluIDwgbmV3TWF4ID8gdGhpcy5jbGFtcCh0aGlzLm1hcF9wLCBuZXdNaW4sIG5ld01heCkgOiB0aGlzLmNsYW1wKHRoaXMubWFwX3AsIG5ld01heCwgbmV3TWluKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMubWFwX3A7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGFtcHMgYSB2YWx1ZSB0byBhIHJhbmdlLCBieSByZXN0cmljdGluZyBpdCB0byBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzIGJ1dCBmb2xkaW5nIHRoZSB2YWx1ZSB0byB0aGUgcmFuZ2UgaW5zdGVhZCBvZiBzaW1wbHkgcmVzZXR0aW5nIHRvIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtLiBJdCB3b3JrcyBsaWtlIGEgbW9yZSBwb3dlcmZ1bCBNb2R1bG8gZnVuY3Rpb24uXHJcblx0XHQgKiBAcGFyYW0gdmFsdWVcdFRoZSB2YWx1ZSB0byBiZSBjbGFtcGVkLlxyXG5cdFx0ICogQHBhcmFtIG1pblx0XHRNaW5pbXVtIHZhbHVlIGFsbG93ZWQuXHJcblx0XHQgKiBAcGFyYW0gbWF4XHRcdE1heGltdW0gdmFsdWUgYWxsb3dlZC5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRUaGUgbmV3bHkgY2xhbXBlZCB2YWx1ZS5cclxuXHRcdCAqIEBleGFtcGxlIFNvbWUgZXhhbXBsZXM6XHJcblx0XHQgKiA8bGlzdGluZyB2ZXJzaW9uPVwiMy4wXCI+XHJcblx0XHQgKiBcdHRyYWNlKE1hdGhVdGlscy5yb3VuZENsYW1wKDE0LCAwLCAxMCkpO1xyXG5cdFx0ICogXHQvLyBSZXN1bHQ6IDRcclxuXHRcdCAqXHJcblx0XHQgKiBcdHRyYWNlKE1hdGhVdGlscy5yb3VuZENsYW1wKDM2MCwgMCwgMzYwKSk7XHJcblx0XHQgKiBcdC8vIFJlc3VsdDogMFxyXG5cdFx0ICpcclxuXHRcdCAqIFx0dHJhY2UoTWF0aFV0aWxzLnJvdW5kQ2xhbXAoMzYwLCAtMTgwLCAxODApKTtcclxuXHRcdCAqIFx0Ly8gUmVzdWx0OiAwXHJcblx0XHQgKlxyXG5cdFx0ICogXHR0cmFjZShNYXRoVXRpbHMucm91bmRDbGFtcCgyMSwgMCwgMTApKTtcclxuXHRcdCAqIFx0Ly8gUmVzdWx0OiAxXHJcblx0XHQgKlxyXG5cdFx0ICogXHR0cmFjZShNYXRoVXRpbHMucm91bmRDbGFtcCgtOTgsIDAsIDEwMCkpO1xyXG5cdFx0ICogXHQvLyBSZXN1bHQ6IDJcclxuXHRcdCAqIDwvbGlzdGluZz5cclxuXHRcdCAqL1xyXG5cdFx0Ly8gTmVlZCBhIGJldHRlciBuYW1lP1xyXG5cdFx0c3RhdGljIHJhbmdlTW9kKHZhbHVlOm51bWJlciwgbWluOm51bWJlciwgcHNldWRvTWF4Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0dmFyIHJhbmdlOm51bWJlciA9IHBzZXVkb01heCAtIG1pbjtcclxuXHRcdFx0dmFsdWUgPSAodmFsdWUgLSBtaW4pICUgcmFuZ2U7XHJcblx0XHRcdGlmICh2YWx1ZSA8IDApIHZhbHVlID0gcmFuZ2UgLSAoLXZhbHVlICUgcmFuZ2UpO1xyXG5cdFx0XHR2YWx1ZSArPSBtaW47XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgaXNQb3dlck9mVHdvKHZhbHVlOm51bWJlcik6Qm9vbGVhbiB7XHJcblx0XHRcdC8vIFJldHVybiB0cnVlIGlmIGEgbnVtYmVyIGlmIGEgcG93ZXIgb2YgdHdvICgyLCA0LCA4LCBldGMpXHJcblx0XHRcdC8vIFRoZXJlJ3MgcHJvYmFibHkgYSBiZXR0ZXIgd2F5LCBidXQgdHJ5aW5nIHRvIGF2b2lkIGJpdHdpc2UgbWFuaXB1bGF0aW9uc1xyXG5cdFx0XHR3aGlsZSAodmFsdWUgJSAyID09IDAgJiYgdmFsdWUgPiAyKSB2YWx1ZSAvPSAyO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUgPT0gMjtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgZ2V0SGlnaGVzdFBvd2VyT2ZUd28odmFsdWU6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHQvLyBSZXR1cm4gYSBwb3dlciBvZiB0d28gbnVtYmVyIHRoYXQgaXMgaGlnaGVyIHRoYW4gdGhlIHBhc3NlZCB2YWx1ZVxyXG5cdFx0XHR2YXIgYzpudW1iZXIgPSAxO1xyXG5cdFx0XHR3aGlsZSAoYyA8IHZhbHVlKSBjICo9IDI7XHJcblx0XHRcdHJldHVybiBjO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=