define(["require", "exports"], function (require, exports) {
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
    exports.default = MathUtils;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL01hdGhVdGlscy50cyJdLCJuYW1lcyI6WyJNYXRoVXRpbHMiLCJNYXRoVXRpbHMuY29uc3RydWN0b3IiLCJNYXRoVXRpbHMuY2xhbXAiLCJNYXRoVXRpbHMuY2xhbXBBdXRvIiwiTWF0aFV0aWxzLm1hcCIsIk1hdGhVdGlscy5yYW5nZU1vZCIsIk1hdGhVdGlscy5pc1Bvd2VyT2ZUd28iLCJNYXRoVXRpbHMuZ2V0SGlnaGVzdFBvd2VyT2ZUd28iXSwibWFwcGluZ3MiOiI7SUFBQSxBQUdBOztPQURHOztRQUNIQTtRQTZGQUMsQ0FBQ0E7UUFyRkFELDZDQUE2Q0E7UUFDN0NBLHNFQUFzRUE7UUFFdEVBOzs7Ozs7V0FNR0E7UUFDSUEsZUFBS0EsR0FBWkEsVUFBYUEsS0FBWUEsRUFBRUEsR0FBY0EsRUFBRUEsR0FBY0E7WUFBOUJFLG1CQUFjQSxHQUFkQSxPQUFjQTtZQUFFQSxtQkFBY0EsR0FBZEEsT0FBY0E7WUFDeERBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEtBQUtBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ3REQSxDQUFDQTtRQUVNRixtQkFBU0EsR0FBaEJBLFVBQWlCQSxLQUFZQSxFQUFFQSxNQUFpQkEsRUFBRUEsTUFBaUJBO1lBQXBDRyxzQkFBaUJBLEdBQWpCQSxVQUFpQkE7WUFBRUEsc0JBQWlCQSxHQUFqQkEsVUFBaUJBO1lBQ2xFQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLEdBQVVBLE1BQU1BLENBQUNBO2dCQUN0QkEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7Z0JBQ2hCQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNaQSxDQUFDQTtZQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxHQUFHQSxNQUFNQSxHQUFHQSxLQUFLQSxHQUFH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RkQsMkJBNkZDLENBQUEiLCJmaWxlIjoidXRpbHMvTWF0aFV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgWmVoIEZlcm5hbmRvIC0geiBhdCB6ZWguY29tLmJyXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRoVXRpbHMge1xyXG5cclxuXHRzdGF0aWMgREVHMlJBRDpudW1iZXIgPSAxLzE4MCAqIE1hdGguUEk7XHJcblx0c3RhdGljIFJBRDJERUc6bnVtYmVyID0gMS9NYXRoLlBJICogMTgwO1xyXG5cclxuXHQvLyBUZW1wb3JhcnkgdmFycyBmb3IgZmFzdGVyIGFsbG9jYXRpb25zXHJcblx0cHJpdmF0ZSBzdGF0aWMgbWFwX3A6bnVtYmVyO1xyXG5cclxuXHQvLyBJbmxpbmluZzogaHR0cDovL3d3dy5ieXRlYXJyYXkub3JnLz9wPTQ3ODlcclxuXHQvLyBOb3Qgd29ya2luZzogcmV0dXJuaW5nIGEgYnVmZmVyIHVuZGVyZmxvdyBldmVyeSB0aW1lIEkgdHJ5IHVzaW5nIGl0XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsYW1wcyBhIG51bWJlciB0byBhIHJhbmdlLCBieSByZXN0cmljdGluZyBpdCB0byBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzOiBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGxvd2VyIHRoYW4gdGhlIG1pbmltdW0gdmFsdWUsIGl0J3MgcmVwbGFjZWQgYnkgdGhlIG1pbmltdW07IGlmIGl0J3MgaGlnaGVyIHRoYW4gdGhlIG1heGltdW0gdmFsdWUsIGl0J3MgcmVwbGFjZWQgYnkgdGhlIG1heGltdW07IGlmIG5vdCwgaXQncyB1bmNoYW5nZWQuXHJcblx0ICogQHBhcmFtIHZhbHVlXHRUaGUgdmFsdWUgdG8gYmUgY2xhbXBlZC5cclxuXHQgKiBAcGFyYW0gbWluXHRcdE1pbmltdW0gdmFsdWUgYWxsb3dlZC5cclxuXHQgKiBAcGFyYW0gbWF4XHRcdE1heGltdW0gdmFsdWUgYWxsb3dlZC5cclxuXHQgKiBAcmV0dXJuXHRcdFx0VGhlIG5ld2x5IGNsYW1wZWQgdmFsdWUuXHJcblx0ICovXHJcblx0c3RhdGljIGNsYW1wKHZhbHVlOm51bWJlciwgbWluOm51bWJlciA9IDAsIG1heDpudW1iZXIgPSAxKTpudW1iZXIge1xyXG5cdFx0cmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjbGFtcEF1dG8odmFsdWU6bnVtYmVyLCBjbGFtcDE6bnVtYmVyID0gMCwgY2xhbXAyOm51bWJlciA9IDEpOm51bWJlciB7XHJcblx0XHRpZiAoY2xhbXAyIDwgY2xhbXAxKSB7XHJcblx0XHRcdHZhciB2Om51bWJlciA9IGNsYW1wMjtcclxuXHRcdFx0Y2xhbXAyID0gY2xhbXAxO1xyXG5cdFx0XHRjbGFtcDEgPSB2O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZhbHVlIDwgY2xhbXAxID8gY2xhbXAxIDogdmFsdWUgPiBjbGFtcDIgPyBjbGFtcDIgOiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1hcHMgYSB2YWx1ZSBmcm9tIGEgcmFuZ2UsIGRldGVybWluZWQgYnkgb2xkIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLCB0byBhIG5ldyByYW5nZSwgZGV0ZXJtaW5lZCBieSBuZXcgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZXMuIFRoZXNlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzIGFyZSByZWZlcmVudGlhbDsgdGhlIG5ldyB2YWx1ZSBpcyBub3QgY2xhbXBlZCBieSB0aGVtLlxyXG5cdCAqIEBwYXJhbSB2YWx1ZVx0VGhlIHZhbHVlIHRvIGJlIHJlLW1hcHBlZC5cclxuXHQgKiBAcGFyYW0gb2xkTWluXHRUaGUgcHJldmlvdXMgbWluaW11bSB2YWx1ZS5cclxuXHQgKiBAcGFyYW0gb2xkTWF4XHRUaGUgcHJldmlvdXMgbWF4aW11bSB2YWx1ZS5cclxuXHQgKiBAcGFyYW0gbmV3TWluXHRUaGUgbmV3IG1pbmltdW0gdmFsdWUuXHJcblx0ICogQHBhcmFtIG5ld01heFx0VGhlIG5ldyBtYXhpbXVtIHZhbHVlLlxyXG5cdCAqIEByZXR1cm5cdFx0XHRUaGUgbmV3IHZhbHVlLCBtYXBwZWQgdG8gdGhlIG5ldyByYW5nZS5cclxuXHQgKi9cclxuXHRzdGF0aWMgbWFwKHZhbHVlOm51bWJlciwgb2xkTWluOm51bWJlciwgb2xkTWF4Om51bWJlciwgbmV3TWluOm51bWJlciA9IDAsIG5ld01heDpudW1iZXIgPSAxLCBjbGFtcDpCb29sZWFuID0gZmFsc2UpOm51bWJlciB7XHJcblx0XHRpZiAob2xkTWluID09IG9sZE1heCkgcmV0dXJuIG5ld01pbjtcclxuXHRcdHRoaXMubWFwX3AgPSAoKHZhbHVlLW9sZE1pbikgLyAob2xkTWF4LW9sZE1pbikgKiAobmV3TWF4LW5ld01pbikpICsgbmV3TWluO1xyXG5cdFx0aWYgKGNsYW1wKSB0aGlzLm1hcF9wID0gbmV3TWluIDwgbmV3TWF4ID8gdGhpcy5jbGFtcCh0aGlzLm1hcF9wLCBuZXdNaW4sIG5ld01heCkgOiB0aGlzLmNsYW1wKHRoaXMubWFwX3AsIG5ld01heCwgbmV3TWluKTtcclxuXHRcdHJldHVybiB0aGlzLm1hcF9wO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xhbXBzIGEgdmFsdWUgdG8gYSByYW5nZSwgYnkgcmVzdHJpY3RpbmcgaXQgdG8gYSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcyBidXQgZm9sZGluZyB0aGUgdmFsdWUgdG8gdGhlIHJhbmdlIGluc3RlYWQgb2Ygc2ltcGx5IHJlc2V0dGluZyB0byB0aGUgbWluaW11bSBhbmQgbWF4aW11bS4gSXQgd29ya3MgbGlrZSBhIG1vcmUgcG93ZXJmdWwgTW9kdWxvIGZ1bmN0aW9uLlxyXG5cdCAqIEBwYXJhbSB2YWx1ZVx0VGhlIHZhbHVlIHRvIGJlIGNsYW1wZWQuXHJcblx0ICogQHBhcmFtIG1pblx0XHRNaW5pbXVtIHZhbHVlIGFsbG93ZWQuXHJcblx0ICogQHBhcmFtIG1heFx0XHRNYXhpbXVtIHZhbHVlIGFsbG93ZWQuXHJcblx0ICogQHJldHVyblx0XHRcdFRoZSBuZXdseSBjbGFtcGVkIHZhbHVlLlxyXG5cdCAqIEBleGFtcGxlIFNvbWUgZXhhbXBsZXM6XHJcblx0ICogPGxpc3RpbmcgdmVyc2lvbj1cIjMuMFwiPlxyXG5cdCAqIFx0dHJhY2UoTWF0aFV0aWxzLnJvdW5kQ2xhbXAoMTQsIDAsIDEwKSk7XHJcblx0ICogXHQvLyBSZXN1bHQ6IDRcclxuXHQgKlxyXG5cdCAqIFx0dHJhY2UoTWF0aFV0aWxzLnJvdW5kQ2xhbXAoMzYwLCAwLCAzNjApKTtcclxuXHQgKiBcdC8vIFJlc3VsdDogMFxyXG5cdCAqXHJcblx0ICogXHR0cmFjZShNYXRoVXRpbHMucm91bmRDbGFtcCgzNjAsIC0xODAsIDE4MCkpO1xyXG5cdCAqIFx0Ly8gUmVzdWx0OiAwXHJcblx0ICpcclxuXHQgKiBcdHRyYWNlKE1hdGhVdGlscy5yb3VuZENsYW1wKDIxLCAwLCAxMCkpO1xyXG5cdCAqIFx0Ly8gUmVzdWx0OiAxXHJcblx0ICpcclxuXHQgKiBcdHRyYWNlKE1hdGhVdGlscy5yb3VuZENsYW1wKC05OCwgMCwgMTAwKSk7XHJcblx0ICogXHQvLyBSZXN1bHQ6IDJcclxuXHQgKiA8L2xpc3Rpbmc+XHJcblx0ICovXHJcblx0Ly8gTmVlZCBhIGJldHRlciBuYW1lP1xyXG5cdHN0YXRpYyByYW5nZU1vZCh2YWx1ZTpudW1iZXIsIG1pbjpudW1iZXIsIHBzZXVkb01heDpudW1iZXIpOm51bWJlciB7XHJcblx0XHR2YXIgcmFuZ2U6bnVtYmVyID0gcHNldWRvTWF4IC0gbWluO1xyXG5cdFx0dmFsdWUgPSAodmFsdWUgLSBtaW4pICUgcmFuZ2U7XHJcblx0XHRpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IHJhbmdlIC0gKC12YWx1ZSAlIHJhbmdlKTtcclxuXHRcdHZhbHVlICs9IG1pbjtcclxuXHRcdHJldHVybiB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpc1Bvd2VyT2ZUd28odmFsdWU6bnVtYmVyKTpCb29sZWFuIHtcclxuXHRcdC8vIFJldHVybiB0cnVlIGlmIGEgbnVtYmVyIGlmIGEgcG93ZXIgb2YgdHdvICgyLCA0LCA4LCBldGMpXHJcblx0XHQvLyBUaGVyZSdzIHByb2JhYmx5IGEgYmV0dGVyIHdheSwgYnV0IHRyeWluZyB0byBhdm9pZCBiaXR3aXNlIG1hbmlwdWxhdGlvbnNcclxuXHRcdHdoaWxlICh2YWx1ZSAlIDIgPT0gMCAmJiB2YWx1ZSA+IDIpIHZhbHVlIC89IDI7XHJcblx0XHRyZXR1cm4gdmFsdWUgPT0gMjtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRIaWdoZXN0UG93ZXJPZlR3byh2YWx1ZTpudW1iZXIpOm51bWJlciB7XHJcblx0XHQvLyBSZXR1cm4gYSBwb3dlciBvZiB0d28gbnVtYmVyIHRoYXQgaXMgaGlnaGVyIHRoYW4gdGhlIHBhc3NlZCB2YWx1ZVxyXG5cdFx0dmFyIGM6bnVtYmVyID0gMTtcclxuXHRcdHdoaWxlIChjIDwgdmFsdWUpIGMgKj0gMjtcclxuXHRcdHJldHVybiBjO1xyXG5cdH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==