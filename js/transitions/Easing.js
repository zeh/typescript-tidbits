var zehfernando;
(function (zehfernando) {
    var transitions;
    (function (transitions) {
        /*
        Disclaimer for Robert Penner's Easing Equations license:
    
        TERMS OF USE - EASING EQUATIONS
    
        Open source under the BSD License.
    
        Copyright © 2001 Robert Penner
        All rights reserved.
    
        Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    
            * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
            * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
            * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    
        THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        */
        /**
         * @author Zeh Fernando - z at zeh.com.br
         * Based on Robert Penner's easing equations - remade from Tweener's equations but SIMPLIFIED
         * Not fully tested!
         */
        var Easing = (function () {
            function Easing() {
            }
            // ================================================================================================================
            // EQUATIONS ------------------------------------------------------------------------------------------------------
            /**
             * Easing equation function for a simple linear tweening, with no easing.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.none = function (t) {
                return t;
            };
            /**
             * Easing equation function for a quadratic (t^2) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quadIn = function (t) {
                return t * t;
            };
            /**
             * Easing equation function for a quadratic (t^2) easing out: decelerating to zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quadOut = function (t) {
                return -t * (t - 2);
            };
            /**
             * Easing equation function for a quadratic (t^2) easing in and then out: accelerating from zero velocity, then decelerating.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quadInOut = function (t) {
                //return t < 0.5 ? quadIn(t*2) : quadOut((t-0.5)*2);
                return ((t *= 2) < 1) ? t * t * 0.5 : -0.5 * (--t * (t - 2) - 1);
            };
            /**
             * Easing equation function for a cubic (t^3) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.cubicIn = function (t) {
                return t * t * t;
            };
            /**
             * Easing equation function for a cubic (t^3) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.cubicOut = function (t) {
                return (t = t - 1) * t * t + 1;
            };
            Easing.cubicInOut = function (t) {
                return (t *= 2) < 1 ? Easing.cubicIn(t) / 2 : Easing.cubicOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for a quartic (t^4) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quartIn = function (t) {
                return t * t * t * t;
            };
            /**
             * Easing equation function for a quartic (t^4) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quartOut = function (t) {
                t--;
                return -1 * (t * t * t * t - 1);
            };
            Easing.quartInOut = function (t) {
                return (t *= 2) < 1 ? Easing.quartIn(t) / 2 : Easing.quartOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for a quintic (t^5) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quintIn = function (t) {
                return t * t * t * t * t;
            };
            /**
             * Easing equation function for a quintic (t^5) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.quintOut = function (t) {
                t--;
                return t * t * t * t * t + 1;
            };
            Easing.quintInOut = function (t) {
                return (t *= 2) < 1 ? Easing.quintIn(t) / 2 : Easing.quintOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for a sinusoidal (sin(t)) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.sineIn = function (t) {
                return -1 * Math.cos(t * Easing.HALF_PI) + 1;
            };
            /**
             * Easing equation function for a sinusoidal (sin(t)) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.sineOut = function (t) {
                return Math.sin(t * Easing.HALF_PI);
            };
            Easing.sineInOut = function (t) {
                return (t *= 2) < 1 ? Easing.sineIn(t) / 2 : Easing.sineOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for an exponential (2^t) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.expoIn = function (t) {
                // return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b; // original
                return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1)) - 0.001; // ztween fixed
            };
            /**
             * Easing equation function for an exponential (2^t) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.expoOut = function (t) {
                // return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b; // original
                // return (t==1) ? 1 : (-Math.pow(2, -10 * t) + 1); // ztween
                // return (t == d) ? b + c : c * 1.001 * (-Math.pow(2, -10 * t / d) + 1) + b; // tweener fixed
                //log(">", t, (t==1) ? 1 : 1.001 * (-Math.pow(2, -10 * t) + 1))
                //return (t==1) ? 1 : 1.001 * (-Math.pow(2, -10 * t) + 1); // ztween fixed
                return (t >= 0.999) ? 1 : 1.001 * (-Math.pow(2, -10 * t) + 1); // ztween fixed 2
            };
            Easing.expoInOut = function (t) {
                return (t *= 2) < 1 ? Easing.expoIn(t) / 2 : Easing.expoOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for a circular (sqrt(1-t^2)) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.circIn = function (t) {
                return -1 * (Math.sqrt(1 - t * t) - 1);
            };
            /**
             * Easing equation function for a circular (sqrt(1-t^2)) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @return				The new value/phase (0-1).
             */
            Easing.circOut = function (t) {
                t--;
                return Math.sqrt(1 - t * t);
            };
            Easing.circInOut = function (t) {
                return (t *= 2) < 1 ? Easing.circIn(t) / 2 : Easing.circOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for an elastic (exponentially decaying sine wave) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @param	a			Amplitude.
             * @param	p			Period.
             * @return				The new value/phase (0-1).
             */
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
            /**
             * Easing equation function for an elastic (exponentially decaying sine wave) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @param	a			Amplitude.
             * @param	p			Period.
             */
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
            /**
             * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @param	s			Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
             * @param	p			Period.
             */
            Easing.backIn = function (t, s) {
                if (s === void 0) { s = 1.70158; }
                return t * t * ((s + 1) * t - s);
            };
            /**
             * Easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @param	s			Overshoot ammount: higher s means greater overshoot (0 produces cubic easing with no overshoot, and the default value of 1.70158 produces an overshoot of 10 percent).
             * @param	p			Period.
             */
            Easing.backOut = function (t, s) {
                if (s === void 0) { s = 1.70158; }
                t--;
                return t * t * ((s + 1) * t + s) + 1;
            };
            Easing.backInOut = function (t) {
                return (t *= 2) < 1 ? Easing.backIn(t) / 2 : Easing.backOut(t - 1) / 2 + 0.5; // TODO: redo with in-line calculation
            };
            /**
             * Easing equation function for a bounce (exponentially decaying parabolic bounce) easing in: accelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @param	p			Period.
             */
            Easing.bounceIn = function (t) {
                return 1 - Easing.bounceOut(1 - t);
            };
            /**
             * Easing equation function for a bounce (exponentially decaying parabolic bounce) easing out: decelerating from zero velocity.
             *
             * @param	t			Current time/phase (0-1).
             * @param	p			Period.
             */
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
            // ================================================================================================================
            // COMBINATOR -----------------------------------------------------------------------------------------------------
            Easing.combined = function (t, __equations) {
                var l = __equations.length;
                var eq = Math.floor(t * l);
                if (eq == __equations.length)
                    eq = l - 1;
                //trace (t, eq, t * l - eq);
                return Number(__equations[eq](t * l - eq));
            };
            // Constants
            Easing.HALF_PI = Math.PI / 2;
            Easing.TWO_PI = Math.PI * 2;
            return Easing;
        })();
        transitions.Easing = Easing;
    })(transitions = zehfernando.transitions || (zehfernando.transitions = {}));
})(zehfernando || (zehfernando = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zaXRpb25zL0Vhc2luZy50cyJdLCJuYW1lcyI6WyJ6ZWhmZXJuYW5kbyIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLmNvbnN0cnVjdG9yIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLm5vbmUiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcucXVhZEluIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLnF1YWRPdXQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcucXVhZEluT3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLmN1YmljSW4iLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcuY3ViaWNPdXQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcuY3ViaWNJbk91dCIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5xdWFydEluIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLnF1YXJ0T3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLnF1YXJ0SW5PdXQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcucXVpbnRJbiIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5xdWludE91dCIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5xdWludEluT3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLnNpbmVJbiIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5zaW5lT3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLnNpbmVJbk91dCIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5leHBvSW4iLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcuZXhwb091dCIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5leHBvSW5PdXQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcuY2lyY0luIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLmNpcmNPdXQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcuY2lyY0luT3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLmVsYXN0aWNJbiIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5lbGFzdGljT3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLmJhY2tJbiIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5iYWNrT3V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuRWFzaW5nLmJhY2tJbk91dCIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5ib3VuY2VJbiIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLkVhc2luZy5ib3VuY2VPdXQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5FYXNpbmcuY29tYmluZWQiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sV0FBVyxDQWlWakI7QUFqVkQsV0FBTyxXQUFXO0lBQUNBLElBQUFBLFdBQVdBLENBaVY3QkE7SUFqVmtCQSxXQUFBQSxXQUFXQSxFQUFDQSxDQUFDQTtRQUUvQkMsQUF3QkFBOzs7Ozs7Ozs7Ozs7Ozs7OztVQVBFQTtRQUVGQTs7OztXQUlHQTtZQUNVQSxNQUFNQTtZQUFuQkMsU0FBYUEsTUFBTUE7WUFzVG5CQyxDQUFDQTtZQWhUQUQsbUhBQW1IQTtZQUNuSEEsbUhBQW1IQTtZQUVuSEE7Ozs7O2VBS0dBO1lBQ0lBLFdBQUlBLEdBQVhBLFVBQVlBLENBQVFBO2dCQUNuQkUsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0E7WUFFREY7Ozs7O2VBS0dBO1lBQ0lBLGFBQU1BLEdBQWJBLFVBQWNBLENBQVFB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QUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQTtZQW5URC9CLFlBQVlBO1lBQ0dBLGNBQU9BLEdBQVVBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1lBQzdCQSxhQUFNQSxHQUFVQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQWtUNUNBLGFBQUNBO1FBQURBLENBdFRBRCxBQXNUQ0MsSUFBQUQ7UUF0VFlBLGtCQUFNQSxHQUFOQSxNQXNUWkEsQ0FBQUE7SUFDRkEsQ0FBQ0EsRUFqVmtCRCxXQUFXQSxHQUFYQSx1QkFBV0EsS0FBWEEsdUJBQVdBLFFBaVY3QkE7QUFBREEsQ0FBQ0EsRUFqVk0sV0FBVyxLQUFYLFdBQVcsUUFpVmpCIiwiZmlsZSI6InRyYW5zaXRpb25zL0Vhc2luZy5qcyIsInNvdXJjZVJvb3QiOiJEOi9Ecm9wYm94L3dvcmsvZ2l0cy90eXBlc2NyaXB0LXRpZGJpdHMvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIHplaGZlcm5hbmRvLnRyYW5zaXRpb25zIHtcclxuXHJcblx0LypcclxuXHREaXNjbGFpbWVyIGZvciBSb2JlcnQgUGVubmVyJ3MgRWFzaW5nIEVxdWF0aW9ucyBsaWNlbnNlOlxyXG5cclxuXHRURVJNUyBPRiBVU0UgLSBFQVNJTkcgRVFVQVRJT05TXHJcblxyXG5cdE9wZW4gc291cmNlIHVuZGVyIHRoZSBCU0QgTGljZW5zZS5cclxuXHJcblx0Q29weXJpZ2h0IMKpIDIwMDEgUm9iZXJ0IFBlbm5lclxyXG5cdEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcblxyXG5cdFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dCBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcclxuXHJcblx0XHQqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cclxuXHRcdCogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxyXG5cdFx0KiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBhdXRob3Igbm9yIHRoZSBuYW1lcyBvZiBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxyXG5cclxuXHRUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SIENPTlRSSUJVVE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJUyBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cclxuXHQqL1xyXG5cclxuXHQvKipcclxuXHQgKiBAYXV0aG9yIFplaCBGZXJuYW5kbyAtIHogYXQgemVoLmNvbS5iclxyXG5cdCAqIEJhc2VkIG9uIFJvYmVydCBQZW5uZXIncyBlYXNpbmcgZXF1YXRpb25zIC0gcmVtYWRlIGZyb20gVHdlZW5lcidzIGVxdWF0aW9ucyBidXQgU0lNUExJRklFRFxyXG5cdCAqIE5vdCBmdWxseSB0ZXN0ZWQhXHJcblx0ICovXHJcblx0ZXhwb3J0IGNsYXNzIEVhc2luZyB7XHJcblxyXG5cdFx0Ly8gQ29uc3RhbnRzXHJcblx0XHRwcml2YXRlIHN0YXRpYyBIQUxGX1BJOm51bWJlciA9IE1hdGguUEkgLyAyO1xyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgVFdPX1BJOm51bWJlciA9IE1hdGguUEkgKiAyO1xyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vIEVRVUFUSU9OUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBzaW1wbGUgbGluZWFyIHR3ZWVuaW5nLCB3aXRoIG5vIGVhc2luZy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgbm9uZSh0Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgcXVhZHJhdGljICh0XjIpIGVhc2luZyBpbjogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgcXVhZEluKHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdCp0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIHF1YWRyYXRpYyAodF4yKSBlYXNpbmcgb3V0OiBkZWNlbGVyYXRpbmcgdG8gemVybyB2ZWxvY2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgcXVhZE91dCh0Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIC10ICogKHQtMik7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgcXVhZHJhdGljICh0XjIpIGVhc2luZyBpbiBhbmQgdGhlbiBvdXQ6IGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHksIHRoZW4gZGVjZWxlcmF0aW5nLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFRoZSBuZXcgdmFsdWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBxdWFkSW5PdXQodDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdC8vcmV0dXJuIHQgPCAwLjUgPyBxdWFkSW4odCoyKSA6IHF1YWRPdXQoKHQtMC41KSoyKTtcclxuXHRcdFx0cmV0dXJuICgodCAqPSAyKSA8IDEpID8gdCAqIHQgKiAwLjUgOiAtMC41ICogKC0tdCAqICh0LTIpIC0gMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgY3ViaWMgKHReMykgZWFzaW5nIGluOiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG4gXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgY3ViaWNJbih0Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHQqdCp0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIGN1YmljICh0XjMpIGVhc2luZyBvdXQ6IGRlY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHkuXHJcbiBcdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFRoZSBuZXcgdmFsdWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBjdWJpY091dCh0Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuICh0ID0gdC0xKSAqIHQgKiB0ICsgMTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgY3ViaWNJbk91dCh0Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuICh0ICo9IDIpIDwgMSA/IEVhc2luZy5jdWJpY0luKHQpLzIgOiBFYXNpbmcuY3ViaWNPdXQodC0xKS8yKzAuNTsgLy8gVE9ETzogcmVkbyB3aXRoIGluLWxpbmUgY2FsY3VsYXRpb25cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBxdWFydGljICh0XjQpIGVhc2luZyBpbjogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuIFx0XHQgKlxyXG5cdFx0ICogQHBhcmFtXHR0XHRcdFx0Q3VycmVudCB0aW1lL3BoYXNlICgwLTEpLlxyXG5cdFx0ICogQHJldHVyblx0XHRcdFx0VGhlIG5ldyB2YWx1ZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIHF1YXJ0SW4odDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdHJldHVybiB0KnQqdCp0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIHF1YXJ0aWMgKHReNCkgZWFzaW5nIG91dDogZGVjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuIFx0XHQgKlxyXG5cdFx0ICogQHBhcmFtXHR0XHRcdFx0Q3VycmVudCB0aW1lL3BoYXNlICgwLTEpLlxyXG5cdFx0ICogQHJldHVyblx0XHRcdFx0VGhlIG5ldyB2YWx1ZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIHF1YXJ0T3V0KHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHR0LS07XHJcblx0XHRcdHJldHVybiAtMSAqICh0ICogdCAqIHQgKiB0IC0gMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIHF1YXJ0SW5PdXQodDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdHJldHVybiAodCAqPSAyKSA8IDEgPyBFYXNpbmcucXVhcnRJbih0KS8yIDogRWFzaW5nLnF1YXJ0T3V0KHQtMSkvMiswLjU7IC8vIFRPRE86IHJlZG8gd2l0aCBpbi1saW5lIGNhbGN1bGF0aW9uXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgcXVpbnRpYyAodF41KSBlYXNpbmcgaW46IGFjY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHkuXHJcbiBcdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFRoZSBuZXcgdmFsdWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBxdWludEluKHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gdCp0KnQqdCp0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIHF1aW50aWMgKHReNSkgZWFzaW5nIG91dDogZGVjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuIFx0XHQgKlxyXG5cdFx0ICogQHBhcmFtXHR0XHRcdFx0Q3VycmVudCB0aW1lL3BoYXNlICgwLTEpLlxyXG5cdFx0ICogQHJldHVyblx0XHRcdFx0VGhlIG5ldyB2YWx1ZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIHF1aW50T3V0KHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHR0LS07XHJcblx0XHRcdHJldHVybiB0KnQqdCp0KnQgKyAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBxdWludEluT3V0KHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gKHQgKj0gMikgPCAxID8gRWFzaW5nLnF1aW50SW4odCkvMiA6IEVhc2luZy5xdWludE91dCh0LTEpLzIrMC41OyAvLyBUT0RPOiByZWRvIHdpdGggaW4tbGluZSBjYWxjdWxhdGlvblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIHNpbnVzb2lkYWwgKHNpbih0KSkgZWFzaW5nIGluOiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG4gXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgc2luZUluKHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gLTEgKiBNYXRoLmNvcyh0ICogRWFzaW5nLkhBTEZfUEkpICsgMTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBzaW51c29pZGFsIChzaW4odCkpIGVhc2luZyBvdXQ6IGRlY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHkuXHJcbiBcdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFRoZSBuZXcgdmFsdWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBzaW5lT3V0KHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4odCAqIEVhc2luZy5IQUxGX1BJKTtcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgc2luZUluT3V0KHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gKHQgKj0gMikgPCAxID8gRWFzaW5nLnNpbmVJbih0KS8yIDogRWFzaW5nLnNpbmVPdXQodC0xKS8yKzAuNTsgLy8gVE9ETzogcmVkbyB3aXRoIGluLWxpbmUgY2FsY3VsYXRpb25cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYW4gZXhwb25lbnRpYWwgKDJedCkgZWFzaW5nIGluOiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG4gXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgZXhwb0luKHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHQvLyByZXR1cm4gKHQ9PTApID8gYiA6IGMgKiBNYXRoLnBvdygyLCAxMCAqICh0L2QgLSAxKSkgKyBiOyAvLyBvcmlnaW5hbFxyXG5cdFx0XHRyZXR1cm4gKHQ9PTApID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgLSAwLjAwMTsgLy8genR3ZWVuIGZpeGVkXHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGFuIGV4cG9uZW50aWFsICgyXnQpIGVhc2luZyBvdXQ6IGRlY2VsZXJhdGluZyBmcm9tIHplcm8gdmVsb2NpdHkuXHJcbiBcdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFRoZSBuZXcgdmFsdWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBleHBvT3V0KHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHQvLyByZXR1cm4gKHQ9PWQpID8gYitjIDogYyAqICgtTWF0aC5wb3coMiwgLTEwICogdC9kKSArIDEpICsgYjsgLy8gb3JpZ2luYWxcclxuXHRcdFx0Ly8gcmV0dXJuICh0PT0xKSA/IDEgOiAoLU1hdGgucG93KDIsIC0xMCAqIHQpICsgMSk7IC8vIHp0d2VlblxyXG5cdFx0XHQvLyByZXR1cm4gKHQgPT0gZCkgPyBiICsgYyA6IGMgKiAxLjAwMSAqICgtTWF0aC5wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiOyAvLyB0d2VlbmVyIGZpeGVkXHJcblx0XHRcdC8vbG9nKFwiPlwiLCB0LCAodD09MSkgPyAxIDogMS4wMDEgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQpICsgMSkpXHJcblx0XHRcdC8vcmV0dXJuICh0PT0xKSA/IDEgOiAxLjAwMSAqICgtTWF0aC5wb3coMiwgLTEwICogdCkgKyAxKTsgLy8genR3ZWVuIGZpeGVkXHJcblx0XHRcdHJldHVybiAodD49MC45OTkpID8gMSA6IDEuMDAxICogKC1NYXRoLnBvdygyLCAtMTAgKiB0KSArIDEpOyAvLyB6dHdlZW4gZml4ZWQgMlxyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBleHBvSW5PdXQodDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdHJldHVybiAodCAqPSAyKSA8IDEgPyBFYXNpbmcuZXhwb0luKHQpLzIgOiBFYXNpbmcuZXhwb091dCh0LTEpLzIrMC41OyAvLyBUT0RPOiByZWRvIHdpdGggaW4tbGluZSBjYWxjdWxhdGlvblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIGNpcmN1bGFyIChzcXJ0KDEtdF4yKSkgZWFzaW5nIGluOiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG4gXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgY2lyY0luKHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gLTEgKiAoTWF0aC5zcXJ0KDEgLSB0KnQpIC0gMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgY2lyY3VsYXIgKHNxcnQoMS10XjIpKSBlYXNpbmcgb3V0OiBkZWNlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG4gXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcmV0dXJuXHRcdFx0XHRUaGUgbmV3IHZhbHVlL3BoYXNlICgwLTEpLlxyXG5cdFx0ICovXHJcblx0XHRzdGF0aWMgY2lyY091dCh0Om51bWJlcik6bnVtYmVyIHtcclxuXHRcdFx0dC0tO1xyXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSB0KnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBjaXJjSW5PdXQodDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdHJldHVybiAodCAqPSAyKSA8IDEgPyBFYXNpbmcuY2lyY0luKHQpLzIgOiBFYXNpbmcuY2lyY091dCh0LTEpLzIrMC41OyAvLyBUT0RPOiByZWRvIHdpdGggaW4tbGluZSBjYWxjdWxhdGlvblxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhbiBlbGFzdGljIChleHBvbmVudGlhbGx5IGRlY2F5aW5nIHNpbmUgd2F2ZSkgZWFzaW5nIGluOiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEBwYXJhbVx0YVx0XHRcdEFtcGxpdHVkZS5cclxuXHRcdCAqIEBwYXJhbVx0cFx0XHRcdFBlcmlvZC5cclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFRoZSBuZXcgdmFsdWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBlbGFzdGljSW4odDpudW1iZXIsIGE6bnVtYmVyID0gMCwgcDpudW1iZXIgPSAwLjMpOm51bWJlciB7XHJcblx0XHRcdGlmICh0PT0wKSByZXR1cm4gMDtcclxuXHRcdFx0aWYgKHQ9PTEpIHJldHVybiAxO1xyXG5cdFx0XHR2YXIgczpudW1iZXI7XHJcblx0XHRcdGlmIChhIDwgMSkge1xyXG5cdFx0XHRcdGEgPSAxO1xyXG5cdFx0XHRcdHMgPSBwIC8gNDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzID0gcCAvIEVhc2luZy5UV09fUEkgKiBNYXRoLmFzaW4oMSAvIGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiBFYXNpbmcuVFdPX1BJIC8gcCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhbiBlbGFzdGljIChleHBvbmVudGlhbGx5IGRlY2F5aW5nIHNpbmUgd2F2ZSkgZWFzaW5nIG91dDogZGVjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcGFyYW1cdGFcdFx0XHRBbXBsaXR1ZGUuXHJcblx0XHQgKiBAcGFyYW1cdHBcdFx0XHRQZXJpb2QuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBlbGFzdGljT3V0KHQ6bnVtYmVyLCBhOm51bWJlciA9IDAsIHA6bnVtYmVyID0gMC4zKTpudW1iZXIge1xyXG5cdFx0XHRpZiAodD09MCkgcmV0dXJuIDA7XHJcblx0XHRcdGlmICh0PT0xKSByZXR1cm4gMTtcclxuXHRcdFx0dmFyIHM6bnVtYmVyO1xyXG5cdFx0XHRpZiAoYSA8IDEpIHtcclxuXHRcdFx0XHRhID0gMTtcclxuXHRcdFx0XHRzID0gcCAvIDQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cyA9IHAgLyBFYXNpbmcuVFdPX1BJICogTWF0aC5hc2luKDEgLyBhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gKGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0IC0gcykgKiBFYXNpbmcuVFdPX1BJIC8gcCApICsgMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgYmFjayAob3ZlcnNob290aW5nIGN1YmljIGVhc2luZzogKHMrMSkqdF4zIC0gcyp0XjIpIGVhc2luZyBpbjogYWNjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcGFyYW1cdHNcdFx0XHRPdmVyc2hvb3QgYW1tb3VudDogaGlnaGVyIHMgbWVhbnMgZ3JlYXRlciBvdmVyc2hvb3QgKDAgcHJvZHVjZXMgY3ViaWMgZWFzaW5nIHdpdGggbm8gb3ZlcnNob290LCBhbmQgdGhlIGRlZmF1bHQgdmFsdWUgb2YgMS43MDE1OCBwcm9kdWNlcyBhbiBvdmVyc2hvb3Qgb2YgMTAgcGVyY2VudCkuXHJcblx0XHQgKiBAcGFyYW1cdHBcdFx0XHRQZXJpb2QuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBiYWNrSW4odDpudW1iZXIsIHM6bnVtYmVyID0gMS43MDE1OCk6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHQqdCooKHMrMSkqdCAtIHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIGJhY2sgKG92ZXJzaG9vdGluZyBjdWJpYyBlYXNpbmc6IChzKzEpKnReMyAtIHMqdF4yKSBlYXNpbmcgb3V0OiBkZWNlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEBwYXJhbVx0c1x0XHRcdE92ZXJzaG9vdCBhbW1vdW50OiBoaWdoZXIgcyBtZWFucyBncmVhdGVyIG92ZXJzaG9vdCAoMCBwcm9kdWNlcyBjdWJpYyBlYXNpbmcgd2l0aCBubyBvdmVyc2hvb3QsIGFuZCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiAxLjcwMTU4IHByb2R1Y2VzIGFuIG92ZXJzaG9vdCBvZiAxMCBwZXJjZW50KS5cclxuXHRcdCAqIEBwYXJhbVx0cFx0XHRcdFBlcmlvZC5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIGJhY2tPdXQodDpudW1iZXIsIHM6bnVtYmVyID0gMS43MDE1OCk6bnVtYmVyIHtcclxuXHRcdFx0dC0tO1xyXG5cdFx0XHRyZXR1cm4gdCp0KigocysxKSp0ICsgcykgKyAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBiYWNrSW5PdXQodDpudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gKHQgKj0gMikgPCAxID8gRWFzaW5nLmJhY2tJbih0KS8yIDogRWFzaW5nLmJhY2tPdXQodC0xKS8yKzAuNTsgLy8gVE9ETzogcmVkbyB3aXRoIGluLWxpbmUgY2FsY3VsYXRpb25cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBib3VuY2UgKGV4cG9uZW50aWFsbHkgZGVjYXlpbmcgcGFyYWJvbGljIGJvdW5jZSkgZWFzaW5nIGluOiBhY2NlbGVyYXRpbmcgZnJvbSB6ZXJvIHZlbG9jaXR5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0dFx0XHRcdEN1cnJlbnQgdGltZS9waGFzZSAoMC0xKS5cclxuXHRcdCAqIEBwYXJhbVx0cFx0XHRcdFBlcmlvZC5cclxuXHRcdCAqL1xyXG5cdFx0c3RhdGljIGJvdW5jZUluKHQ6bnVtYmVyKTpudW1iZXIge1xyXG5cdFx0XHRyZXR1cm4gMSAtIEVhc2luZy5ib3VuY2VPdXQoMS10KTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBib3VuY2UgKGV4cG9uZW50aWFsbHkgZGVjYXlpbmcgcGFyYWJvbGljIGJvdW5jZSkgZWFzaW5nIG91dDogZGVjZWxlcmF0aW5nIGZyb20gemVybyB2ZWxvY2l0eS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHRcdFx0XHRDdXJyZW50IHRpbWUvcGhhc2UgKDAtMSkuXHJcblx0XHQgKiBAcGFyYW1cdHBcdFx0XHRQZXJpb2QuXHJcblx0XHQgKi9cclxuXHRcdHN0YXRpYyBib3VuY2VPdXQodDpudW1iZXIpOm51bWJlciB7XHJcblx0XHRcdGlmICh0IDwgKDEvMi43NSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1KnQqdDtcclxuXHRcdFx0fSBlbHNlIGlmICh0IDwgKDIvMi43NSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1Kih0LT0oMS41LzIuNzUpKSp0ICsgLjc1O1xyXG5cdFx0XHR9IGVsc2UgaWYgKHQgPCAoMi41LzIuNzUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSoodC09KDIuMjUvMi43NSkpKnQgKyAuOTM3NTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gNy41NjI1Kih0LT0oMi42MjUvMi43NSkpKnQgKyAuOTg0Mzc1O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vIENPTUJJTkFUT1IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRzdGF0aWMgY29tYmluZWQodDpudW1iZXIsIF9fZXF1YXRpb25zOmFueVtdKTpudW1iZXIge1xyXG5cdFx0XHR2YXIgbDpudW1iZXIgPSBfX2VxdWF0aW9ucy5sZW5ndGg7XHJcblx0XHRcdHZhciBlcTpudW1iZXIgPSBNYXRoLmZsb29yKHQgKiBsKTtcclxuXHRcdFx0aWYgKGVxID09IF9fZXF1YXRpb25zLmxlbmd0aCkgZXEgPSBsIC0gMTtcclxuXHRcdFx0Ly90cmFjZSAodCwgZXEsIHQgKiBsIC0gZXEpO1xyXG5cdFx0XHRyZXR1cm4gTnVtYmVyKF9fZXF1YXRpb25zW2VxXSh0ICogbCAtIGVxKSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==