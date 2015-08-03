var zehfernando;
(function (zehfernando) {
    var utils;
    (function (utils) {
        /**
         * @author Zeh Fernando - z at zeh.com.br
         */
        class MathUtils {
            // Inlining: http://www.bytearray.org/?p=4789
            // Not working: returning a buffer underflow every time I try using it
            /**
             * Clamps a number to a range, by restricting it to a minimum and maximum values: if the passed value is lower than the minimum value, it's replaced by the minimum; if it's higher than the maximum value, it's replaced by the maximum; if not, it's unchanged.
             * @param value	The value to be clamped.
             * @param min		Minimum value allowed.
             * @param max		Maximum value allowed.
             * @return			The newly clamped value.
             */
            static clamp(value, min = 0, max = 1) {
                return value < min ? min : value > max ? max : value;
            }
            static clampAuto(value, clamp1 = 0, clamp2 = 1) {
                if (clamp2 < clamp1) {
                    var v = clamp2;
                    clamp2 = clamp1;
                    clamp1 = v;
                }
                return value < clamp1 ? clamp1 : value > clamp2 ? clamp2 : value;
            }
            /**
             * Maps a value from a range, determined by old minimum and maximum values, to a new range, determined by new minimum and maximum values. These minimum and maximum values are referential; the new value is not clamped by them.
             * @param value	The value to be re-mapped.
             * @param oldMin	The previous minimum value.
             * @param oldMax	The previous maximum value.
             * @param newMin	The new minimum value.
             * @param newMax	The new maximum value.
             * @return			The new value, mapped to the new range.
             */
            static map(value, oldMin, oldMax, newMin = 0, newMax = 1, clamp = false) {
                if (oldMin == oldMax)
                    return newMin;
                this.map_p = ((value - oldMin) / (oldMax - oldMin) * (newMax - newMin)) + newMin;
                if (clamp)
                    this.map_p = newMin < newMax ? this.clamp(this.map_p, newMin, newMax) : this.clamp(this.map_p, newMax, newMin);
                return this.map_p;
            }
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
            static rangeMod(value, min, pseudoMax) {
                var range = pseudoMax - min;
                value = (value - min) % range;
                if (value < 0)
                    value = range - (-value % range);
                value += min;
                return value;
            }
            static isPowerOfTwo(value) {
                // Return true if a number if a power of two (2, 4, 8, etc)
                // There's probably a better way, but trying to avoid bitwise manipulations
                while (value % 2 == 0 && value > 2)
                    value /= 2;
                return value == 2;
            }
            static getHighestPowerOfTwo(value) {
                // Return a power of two number that is higher than the passed value
                var c = 1;
                while (c < value)
                    c *= 2;
                return c;
            }
        }
        MathUtils.DEG2RAD = 1 / 180 * Math.PI;
        MathUtils.RAD2DEG = 1 / Math.PI * 180;
        utils.MathUtils = MathUtils;
    })(utils = zehfernando.utils || (zehfernando.utils = {}));
})(zehfernando || (zehfernando = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL01hdGhVdGlscy50cyJdLCJuYW1lcyI6WyJ6ZWhmZXJuYW5kbyIsInplaGZlcm5hbmRvLnV0aWxzIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmNsYW1wIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmNsYW1wQXV0byIsInplaGZlcm5hbmRvLnV0aWxzLk1hdGhVdGlscy5tYXAiLCJ6ZWhmZXJuYW5kby51dGlscy5NYXRoVXRpbHMucmFuZ2VNb2QiLCJ6ZWhmZXJuYW5kby51dGlscy5NYXRoVXRpbHMuaXNQb3dlck9mVHdvIiwiemVoZmVybmFuZG8udXRpbHMuTWF0aFV0aWxzLmdldEhpZ2hlc3RQb3dlck9mVHdvIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFdBQVcsQ0FvR2pCO0FBcEdELFdBQU8sV0FBVztJQUFDQSxJQUFBQSxLQUFLQSxDQW9HdkJBO0lBcEdrQkEsV0FBQUEsS0FBS0EsRUFBQ0EsQ0FBQ0E7UUFFekJDLEFBR0FBOztXQURHQTs7WUFTRkMsNkNBQTZDQTtZQUM3Q0Esc0VBQXNFQTtZQUV0RUE7Ozs7OztlQU1HQTtZQUNIQSxPQUFPQSxLQUFLQSxDQUFDQSxLQUFZQSxFQUFFQSxHQUFHQSxHQUFVQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFVQSxDQUFDQTtnQkFDeERDLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEtBQUtBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3REQSxDQUFDQTtZQUVERCxPQUFPQSxTQUFTQSxDQUFDQSxLQUFZQSxFQUFFQSxNQUFNQSxHQUFVQSxDQUFDQSxFQUFFQSxNQUFNQSxHQUFVQSxDQUFDQTtnQkFDbEVFLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO29CQUNyQkEsSUFBSUEsQ0FBQ0EsR0FBVUEs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LEVBQUVBLENBQUNBO1FBQ2pDQSxpQkFBT0EsR0FBVUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFINUJBLGVBQVNBLFlBNkZyQkEsQ0FBQUE7SUFFRkEsQ0FBQ0EsRUFwR2tCRCxLQUFLQSxHQUFMQSxpQkFBS0EsS0FBTEEsaUJBQUtBLFFBb0d2QkE7QUFBREEsQ0FBQ0EsRUFwR00sV0FBVyxLQUFYLFdBQVcsUUFvR2pCIiwiZmlsZSI6InV0aWxzL01hdGhVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSB6ZWhmZXJuYW5kby51dGlscyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBhdXRob3IgWmVoIEZlcm5hbmRvIC0geiBhdCB6ZWguY29tLmJyXHJcblx0ICovXHJcblx0ZXhwb3J0IGNsYXNzIE1hdGhVdGlscyB7XHJcblxyXG5cdFx0c3RhdGljIERFRzJSQUQ6bnVtYmVyID0gMS8xODAgKiBNYXRoLlBJO1xyXG5cdFx0c3RhdGljIFJBRDJERUc6bnVtYmVyID0gMS9NYXRoLlBJICogMTgwO1xyXG5cclxuXHRcdC8vIFRlbXBvcmFyeSB2YXJzIGZvciBmYXN0ZXIgYWxsb2NhdGlvbnNcclxuXHRcdHByaXZhdGUgc3RhdGljIG1hcF9wOm51bWJlcjtcclxuXHJcblx0XHQvLyBJbmxpbmluZzogaHR0cDovL3d3dy5ieXRlYXJyYXkub3JnLz9wPTQ3ODlcclxuXHRcdC8vIE5vdCB3b3JraW5nOiByZXR1cm5pbmcgYSBidWZmZXIgdW5kZXJmbG93IGV2ZXJ5IHRpbWUgSSB0cnkgdXNpbmcgaXRcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsYW1wcyBhIG51bWJlciB0byBhIHJhbmdlLCBieSByZXN0cmljdGluZyBpdCB0byBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzOiBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGxvd2VyIHRoYW4gdGhlIG1pbmltdW0gdmFsdWUsIGl0J3MgcmVwbGFjZWQgYnkgdGhlIG1pbmltdW07IGlmIGl0J3MgaGlnaGVyIHRoYW4gdGhlIG1heGltdW0gdmFsdWUsIGl0J3MgcmVwbGFjZWQgYnkgdGhlIG1heGltdW07IGlmIG5vdCwgaXQncyB1bmNoYW5nZWQuXHJcblx0XHQgKiBAcGFyYW0gdmFsdWVcdFRoZSB2YWx1ZSB0byBiZSBjbGFtcGVkLlxyXG5cdFx0ICogQHBhcmFtIG1pblx0XHRNaW5pbXVtIHZhbHVlIGFsbG93ZWQuXHJcblx0XHQgKiBAcGFyYW0gbWF4XHRcdE1heGltdW0gdmFsdWUgYWxsb3dlZC5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRUaGUgbmV3bHkgY2xhbXBlZCB2YWx1ZS5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIGNsYW1wKHZhbHVlOm51bWJlciwgbWluOm51bWJlciA9IDAsIG1heDpudW1iZXIgPSAxKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBjbGFtcEF1dG8odmFsdWU6bnVtYmVyLCBjbGFtcDE6bnVtYmVyID0gMCwgY2xhbXAyOm51bWJlciA9IDEpOm51bWJlciB7XHJcblx0XHRcdGlmIChjbGFtcDIgPCBjbGFtcDEpIHtcclxuXHRcdFx0XHR2YXIgdjpudW1iZXIgPSBjbGFtcDI7XHJcblx0XHRcdFx0Y2xhbXAyID0gY2xhbXAxO1xyXG5cdFx0XHRcdGNsYW1wMSA9IHY7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHZhbHVlIDwgY2xhbXAxID8gY2xhbXAxIDogdmFsdWUgPiBjbGFtcDIgPyBjbGFtcDIgOiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE1hcHMgYSB2YWx1ZSBmcm9tIGEgcmFuZ2UsIGRldGVybWluZWQgYnkgb2xkIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLCB0byBhIG5ldyByYW5nZSwgZGV0ZXJtaW5lZCBieSBuZXcgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIFRoZXNlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzIGFyZSByZWZlcmVudGlhbDsgdGhlIG5ldyB2YWx1ZSBpcyBub3QgY2xhbXBlZCBieSB0aGVtLlxyXG5cdFx0ICogQHBhcmFtIHZhbHVlXHRUaGUgdmFsdWUgdG8gYmUgcmUtbWFwcGVkLlxyXG5cdFx0ICogQHBhcmFtIG9sZE1pblx0VGhlIHByZXZpb3VzIG1pbmltdW0gdmFsdWUuXHJcblx0XHQgKiBAcGFyYW0gb2xkTWF4XHRUaGUgcHJldmlvdXMgbWF4aW11bSB2YWx1ZS5cclxuXHRcdCAqIEBwYXJhbSBuZXdNaW5cdFRoZSBuZXcgbWluaW11bSB2YWx1ZS5cclxuXHRcdCAqIEBwYXJhbSBuZXdNYXhcdFRoZSBuZXcgbWF4aW11bSB2YWx1ZS5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRUaGUgbmV3IHZhbHVlLCBtYXBwZWQgdG8gdGhlIG5ldyByYW5nZS5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIG1hcCh2YWx1ZTpudW1iZXIsIG9sZE1pbjpudW1iZXIsIG9sZE1heDpudW1iZXIsIG5ld01pbjpudW1iZXIgPSAwLCBuZXdNYXg6bnVtYmVyID0gMSwgY2xhbXA6Qm9vbGVhbiA9IGZhbHNlKTpudW1iZXIge1xyXG5cdFx0XHRpZiAob2xkTWluID09IG9sZE1heCkgcmV0dXJuIG5ld01pbjtcclxuXHRcdFx0dGhpcy5tYXBfcCA9ICgodmFsdWUtb2xkTWluKSAvIChvbGRNYXgtb2xkTWluKSAqIChuZXdNYXgtbmV3TWluKSkgKyBuZXdNaW47XHJcblx0XHRcdGlmIChjbGFtcCkgdGhpcy5tYXBfcCA9IG5ld01pbiA8IG5ld01heCA/IHRoaXMuY2xhbXAodGhpcy5tYXBfcCwgbmV3TWluLCBuZXdNYXgpIDogdGhpcy5jbGFtcCh0aGlzLm1hcF9wLCBuZXdNYXgsIG5ld01pbik7XHJcblx0XHRcdHJldHVybiB0aGlzLm1hcF9wO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xhbXBzIGEgdmFsdWUgdG8gYSByYW5nZSwgYnkgcmVzdHJpY3RpbmcgaXQgdG8gYSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcyBidXQgZm9sZGluZyB0aGUgdmFsdWUgdG8gdGhlIHJhbmdlIGluc3RlYWQgb2Ygc2ltcGx5IHJlc2V0dGluZyB0byB0aGUgbWluaW11bSBhbmQgbWF4aW11bS4gSXQgd29ya3MgbGlrZSBhIG1vcmUgcG93ZXJmdWwgTW9kdWxvIGZ1bmN0aW9uLlxyXG5cdFx0ICogQHBhcmFtIHZhbHVlXHRUaGUgdmFsdWUgdG8gYmUgY2xhbXBlZC5cclxuXHRcdCAqIEBwYXJhbSBtaW5cdFx0TWluaW11bSB2YWx1ZSBhbGxvd2VkLlxyXG5cdFx0ICogQHBhcmFtIG1heFx0XHRNYXhpbXVtIHZhbHVlIGFsbG93ZWQuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0VGhlIG5ld2x5IGNsYW1wZWQgdmFsdWUuXHJcblx0XHQgKiBAZXhhbXBsZSBTb21lIGV4YW1wbGVzOlxyXG5cdFx0ICogPGxpc3RpbmcgdmVyc2lvbj1cIjMuMFwiPlxyXG5cdFx0ICogXHR0cmFjZShNYXRoVXRpbHMucm91bmRDbGFtcCgxNCwgMCwgMTApKTtcclxuXHRcdCAqIFx0Ly8gUmVzdWx0OiA0XHJcblx0XHQgKlxyXG5cdFx0ICogXHR0cmFjZShNYXRoVXRpbHMucm91bmRDbGFtcCgzNjAsIDAsIDM2MCkpO1xyXG5cdFx0ICogXHQvLyBSZXN1bHQ6IDBcclxuXHRcdCAqXHJcblx0XHQgKiBcdHRyYWNlKE1hdGhVdGlscy5yb3VuZENsYW1wKDM2MCwgLTE4MCwgMTgwKSk7XHJcblx0XHQgKiBcdC8vIFJlc3VsdDogMFxyXG5cdFx0ICpcclxuXHRcdCAqIFx0dHJhY2UoTWF0aFV0aWxzLnJvdW5kQ2xhbXAoMjEsIDAsIDEwKSk7XHJcblx0XHQgKiBcdC8vIFJlc3VsdDogMVxyXG5cdFx0ICpcclxuXHRcdCAqIFx0dHJhY2UoTWF0aFV0aWxzLnJvdW5kQ2xhbXAoLTk4LCAwLCAxMDApKTtcclxuXHRcdCAqIFx0Ly8gUmVzdWx0OiAyXHJcblx0XHQgKiA8L2xpc3Rpbmc+XHJcblx0XHQgKi9cclxuXHRcdC8vIE5lZWQgYSBiZXR0ZXIgbmFtZT9cclxuXHRcdHN0YXRpYyByYW5nZU1vZCh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIHBzZXVkb01heDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdHZhciByYW5nZTpudW1iZXIgPSBwc2V1ZG9NYXggLSBtaW47XHJcblx0XHRcdHZhbHVlID0gKHZhbHVlIC0gbWluKSAlIHJhbmdlO1xyXG5cdFx0XHRpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IHJhbmdlIC0gKC12YWx1ZSAlIHJhbmdlKTtcclxuXHRcdFx0dmFsdWUgKz0gbWluO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGlzUG93ZXJPZlR3byh2YWx1ZTpudW1iZXIpOkJvb2xlYW4ge1xyXG5cdFx0XHQvLyBSZXR1cm4gdHJ1ZSBpZiBhIG51bWJlciBpZiBhIHBvd2VyIG9mIHR3byAoMiwgNCwgOCwgZXRjKVxyXG5cdFx0XHQvLyBUaGVyZSdzIHByb2JhYmx5IGEgYmV0dGVyIHdheSwgYnV0IHRyeWluZyB0byBhdm9pZCBiaXR3aXNlIG1hbmlwdWxhdGlvbnNcclxuXHRcdFx0d2hpbGUgKHZhbHVlICUgMiA9PSAwICYmIHZhbHVlID4gMikgdmFsdWUgLz0gMjtcclxuXHRcdFx0cmV0dXJuIHZhbHVlID09IDI7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGdldEhpZ2hlc3RQb3dlck9mVHdvKHZhbHVlOm51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0Ly8gUmV0dXJuIGEgcG93ZXIgb2YgdHdvIG51bWJlciB0aGF0IGlzIGhpZ2hlciB0aGFuIHRoZSBwYXNzZWQgdmFsdWVcclxuXHRcdFx0dmFyIGM6bnVtYmVyID0gMTtcclxuXHRcdFx0d2hpbGUgKGMgPCB2YWx1ZSkgYyAqPSAyO1xyXG5cdFx0XHRyZXR1cm4gYztcclxuXHRcdH1cclxuXHR9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9