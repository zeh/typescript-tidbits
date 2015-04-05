var zehfernando;
(function (zehfernando) {
    var signals;
    (function (signals) {
        /**
         * @author zeh fernando
         */
        var SimpleSignal = (function () {
            // ================================================================================================================
            // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
            function SimpleSignal() {
                this.functions = [];
            }
            // ================================================================================================================
            // PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
            SimpleSignal.prototype.add = function (func) {
                if (this.functions.indexOf(func) == -1) {
                    this.functions.push(func);
                    return true;
                }
                return false;
            };
            SimpleSignal.prototype.remove = function (func) {
                this.ifr = this.functions.indexOf(func);
                if (this.ifr > -1) {
                    this.functions.splice(this.ifr, 1);
                    return true;
                }
                return false;
            };
            SimpleSignal.prototype.removeAll = function () {
                if (this.functions.length > 0) {
                    this.functions.length = 0;
                    return true;
                }
                return false;
            };
            SimpleSignal.prototype.dispatch = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var functionsDuplicate = this.functions.concat();
                for (var i = 0; i < functionsDuplicate.length; i++) {
                    functionsDuplicate[i].apply(undefined, args);
                }
            };
            Object.defineProperty(SimpleSignal.prototype, "numItems", {
                // ================================================================================================================
                // ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------
                get: function () {
                    return this.functions.length;
                },
                enumerable: true,
                configurable: true
            });
            return SimpleSignal;
        })();
        signals.SimpleSignal = SimpleSignal;
    })(signals = zehfernando.signals || (zehfernando.signals = {}));
})(zehfernando || (zehfernando = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ25hbHMvU2ltcGxlU2lnbmFsLnRzIl0sIm5hbWVzIjpbInplaGZlcm5hbmRvIiwiemVoZmVybmFuZG8uc2lnbmFscyIsInplaGZlcm5hbmRvLnNpZ25hbHMuU2ltcGxlU2lnbmFsIiwiemVoZmVybmFuZG8uc2lnbmFscy5TaW1wbGVTaWduYWwuY29uc3RydWN0b3IiLCJ6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbC5hZGQiLCJ6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbC5yZW1vdmUiLCJ6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbC5yZW1vdmVBbGwiLCJ6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbC5kaXNwYXRjaCIsInplaGZlcm5hbmRvLnNpZ25hbHMuU2ltcGxlU2lnbmFsLm51bUl0ZW1zIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLFdBQVcsQ0FtRWpCO0FBbkVELFdBQU8sV0FBVztJQUFDQSxJQUFBQSxPQUFPQSxDQW1FekJBO0lBbkVrQkEsV0FBQUEsT0FBT0EsRUFBQ0EsQ0FBQ0E7UUFFM0JDLEFBR0FBOztXQURHQTtZQUNVQSxZQUFZQTtZQVd4QkMsbUhBQW1IQTtZQUNuSEEsbUhBQW1IQTtZQUVuSEEsU0FkWUEsWUFBWUE7Z0JBZXZCQyxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNyQkEsQ0FBQ0E7WUFHREQsbUhBQW1IQTtZQUNuSEEsbUhBQW1IQTtZQUU1R0EsMEJBQUdBLEdBQVZBLFVBQVdBLElBQWFBO2dCQUN2QkUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDMUJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO2dCQUNiQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFTUYsNkJBQU1BLEdBQWJBLFVBQWNBLElBQWNBO2dCQUMzQkcsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbkJBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO29CQUNuQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2JBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVNSCxnQ0FBU0EsR0FBaEJBO2dCQUNDSSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDL0JBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO29CQUMxQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2JBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVNSiwrQkFBUUEsR0FBZkE7Z0JBQWdCSyxjQUFhQTtxQkFBYkEsV0FBYUEsQ0FBYkEsc0JBQWFBLENBQWJBLElBQWFBO29CQUFiQSw2QkFBYUE7O2dCQUM1QkEsSUFBSUEsa0JBQWtCQSxHQUFtQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ2pFQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxrQkFBa0JBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUMzREEsa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDOUNBLENBQUNBO1lBQ0ZBLENBQUNBO1lBTURMLHNCQUFXQSxrQ0FBUUE7Z0JBSG5CQSxtSEFBbUhBO2dCQUNuSEEsbUhBQW1IQTtxQkFFbkhBO29CQUNDTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDOUJBLENBQUNBOzs7ZUFBQU47WUFDRkEsbUJBQUNBO1FBQURBLENBN0RBRCxBQTZEQ0MsSUFBQUQ7UUE3RFlBLG9CQUFZQSxHQUFaQSxZQTZEWkEsQ0FBQUE7SUFDRkEsQ0FBQ0EsRUFuRWtCRCxPQUFPQSxHQUFQQSxtQkFBT0EsS0FBUEEsbUJBQU9BLFFBbUV6QkE7QUFBREEsQ0FBQ0EsRUFuRU0sV0FBVyxLQUFYLFdBQVcsUUFtRWpCIiwiZmlsZSI6InNpZ25hbHMvU2ltcGxlU2lnbmFsLmpzIiwic291cmNlUm9vdCI6IkQ6L0Ryb3Bib3gvd29yay9naXRzL3R5cGVzY3JpcHQtdGlkYml0cy8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgemVoZmVybmFuZG8uc2lnbmFscyB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBhdXRob3IgemVoIGZlcm5hbmRvXHJcblx0ICovXHJcblx0ZXhwb3J0IGNsYXNzIFNpbXBsZVNpZ25hbCB7XHJcblxyXG5cdFx0Ly8gU3VwZXItc2ltcGxlIHNpZ25hbHMgY2xhc3MgaW5zcGlyZWQgYnkgUm9iZXJ0IFBlbm5lcidzIEFTM1NpZ25hbHM6XHJcblx0XHQvLyBodHRwOi8vZ2l0aHViLmNvbS9yb2JlcnRwZW5uZXIvYXMzLXNpZ25hbHNcclxuXHRcdC8vIFRPRE86IHBhc3MgZnVuY3Rpb25zIHdpdGggYW55IG51bWJlciBvZiBwYXJhbXM/IChhOiBhbnkpID0+IGFueVxyXG5cclxuXHRcdC8vIFByb3BlcnRpZXNcclxuXHRcdHByaXZhdGUgZnVuY3Rpb25zOkFycmF5PEZ1bmN0aW9uPjtcclxuXHJcblx0XHRwcml2YXRlIGlmcjpudW1iZXI7XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBpIGZvciByZW1vdmFsICh0byBsaW1pdCBnYXJiYWdlIGNvbGxlY3Rpb24pXHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gQ09OU1RSVUNUT1IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0XHR0aGlzLmZ1bmN0aW9ucyA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyBQVUJMSUMgSU5URVJGQUNFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0cHVibGljIGFkZChmdW5jOkZ1bmN0aW9uKTpib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMuZnVuY3Rpb25zLmluZGV4T2YoZnVuYykgPT0gLTEpIHtcclxuXHRcdFx0XHR0aGlzLmZ1bmN0aW9ucy5wdXNoKGZ1bmMpO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgcmVtb3ZlKGZ1bmM6IEZ1bmN0aW9uKTpib29sZWFuIHtcclxuXHRcdFx0dGhpcy5pZnIgPSB0aGlzLmZ1bmN0aW9ucy5pbmRleE9mKGZ1bmMpO1xyXG5cdFx0XHRpZiAodGhpcy5pZnIgPiAtMSkge1xyXG5cdFx0XHRcdHRoaXMuZnVuY3Rpb25zLnNwbGljZSh0aGlzLmlmciwgMSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyByZW1vdmVBbGwoKTpib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMuZnVuY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLmZ1bmN0aW9ucy5sZW5ndGggPSAwO1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgZGlzcGF0Y2goLi4uYXJnczphbnlbXSk6dm9pZCB7XHJcblx0XHRcdHZhciBmdW5jdGlvbnNEdXBsaWNhdGU6QXJyYXk8RnVuY3Rpb24+ID0gdGhpcy5mdW5jdGlvbnMuY29uY2F0KCk7XHJcblx0XHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IGZ1bmN0aW9uc0R1cGxpY2F0ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGZ1bmN0aW9uc0R1cGxpY2F0ZVtpXS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vIEFDQ0VTU09SIElOVEVSRkFDRSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRwdWJsaWMgZ2V0IG51bUl0ZW1zKCk6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZnVuY3Rpb25zLmxlbmd0aDtcclxuXHRcdH1cclxuXHR9XHJcbn0iXX0=