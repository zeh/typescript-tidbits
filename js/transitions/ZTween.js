var zehfernando;
(function (zehfernando) {
    var transitions;
    (function (transitions) {
        var ZTween = (function () {
            function ZTween(target, properties, parameters) {
                if (properties === void 0) { properties = null; }
                if (parameters === void 0) { parameters = null; }
                this._target = target;
                this.properties = new Array();
                for (var pName in properties) {
                    this.properties.push(new ZTweenProperty(pName, properties[pName]));
                }
                this.timeCreated = ZTween.currentTime;
                this.timeStart = this.timeCreated;
                this.time = 0;
                this.delay = 0;
                this.transition = transitions.Easing.none;
                this._onStart = new zehfernando.signals.SimpleSignal();
                this._onUpdate = new zehfernando.signals.SimpleSignal();
                this._onComplete = new zehfernando.signals.SimpleSignal();
                if (parameters != null) {
                    if (parameters.hasOwnProperty("time"))
                        this.time = parameters["time"];
                    if (parameters.hasOwnProperty("delay"))
                        this.delay = parameters["delay"];
                    if (parameters.hasOwnProperty("transition"))
                        this.transition = parameters["transition"];
                    if (parameters.hasOwnProperty("onStart"))
                        this._onStart.add(parameters["onStart"]);
                    if (parameters.hasOwnProperty("onUpdate"))
                        this._onUpdate.add(parameters["onUpdate"]);
                    if (parameters.hasOwnProperty("onComplete"))
                        this._onComplete.add(parameters["onComplete"]);
                }
                this._useFrames = false;
                this._paused = false;
                this.started = false;
            }
            ZTween._init = function () {
                this.currentTimeFrame = 0;
                this.currentTime = 0;
                this.frameTick();
            };
            ZTween.prototype.updateCache = function () {
                this.timeDuration = this.timeComplete - this.timeStart;
            };
            ZTween.updateTweens = function () {
                this.l = this.tweens.length;
                for (this.i = 0; this.i < this.l; this.i++) {
                    if (this.tweens[this.i] == null || !this.tweens[this.i].update(this.currentTime, this.currentTimeFrame)) {
                        this.tweens.splice(this.i, 1);
                        this.i--;
                        this.l--;
                    }
                }
            };
            ZTween.frameTick = function () {
                this.currentTime = (new Date()).getTime();
                this.currentTimeFrame++;
                this.updateTweens();
                window.requestAnimationFrame(this.frameTick.bind(this));
            };
            ZTween.add = function (target, properties, parameters) {
                if (properties === void 0) { properties = null; }
                if (parameters === void 0) { parameters = null; }
                var t = new ZTween(target, properties, parameters);
                this.tweens.push(t);
                return t;
            };
            ZTween.updateTime = function () {
                this.currentTime = (new Date()).getTime();
            };
            ZTween.remove = function (target) {
                var props = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    props[_i - 1] = arguments[_i];
                }
                var tl = [];
                var l = this.tweens.length;
                var i;
                var j;
                for (i = 0; i < l; i++) {
                    if (this.tweens[i] != null && this.tweens[i]._target == target) {
                        if (props.length > 0) {
                            for (j = 0; j < this.tweens[i].properties.length; j++) {
                                if (props.indexOf(this.tweens[i].properties[j].name) > -1) {
                                    this.tweens[i].properties.splice(j, 1);
                                    j--;
                                }
                            }
                            if (this.tweens[i].properties.length == 0)
                                tl.push(this.tweens[i]);
                        }
                        else {
                            tl.push(this.tweens[i]);
                        }
                    }
                }
                var removedAny = false;
                l = tl.length;
                for (i = 0; i < l; i++) {
                    j = this.tweens.indexOf(tl[i]);
                    this.removeTweenByIndex(j);
                    removedAny = true;
                }
                return removedAny;
            };
            ZTween.hasTween = function (target) {
                var props = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    props[_i - 1] = arguments[_i];
                }
                var l = this.tweens.length;
                var i;
                var j;
                for (i = 0; i < l; i++) {
                    if (this.tweens[i] != null && this.tweens[i]._target == target) {
                        if (props.length > 0) {
                            for (j = 0; j < this.tweens[i].properties.length; j++) {
                                if (props.indexOf(this.tweens[i].properties[j].name) > -1) {
                                    return true;
                                }
                            }
                        }
                        else {
                            return true;
                        }
                    }
                }
                return false;
            };
            ZTween.getTweens = function (target) {
                var props = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    props[_i - 1] = arguments[_i];
                }
                var tl = [];
                var l = this.tweens.length;
                var i;
                var j;
                var found;
                for (i = 0; i < l; i++) {
                    if (this.tweens[i] != null && this.tweens[i]._target == target) {
                        if (props.length > 0) {
                            found = false;
                            for (j = 0; j < this.tweens[i].properties.length; j++) {
                                if (props.indexOf(this.tweens[i].properties[j].name) > -1) {
                                    found = true;
                                    break;
                                }
                            }
                            if (found)
                                tl.push(this.tweens[i]);
                        }
                        else {
                            tl.push(this.tweens[i]);
                        }
                    }
                }
                return tl;
            };
            ZTween.pause = function (target) {
                var props = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    props[_i - 1] = arguments[_i];
                }
                var pausedAny = false;
                var ftweens = this.getTweens.apply(null, ([target]).concat(props));
                var i;
                for (i = 0; i < ftweens.length; i++) {
                    if (!ftweens[i].paused) {
                        ftweens[i].pause();
                        pausedAny = true;
                    }
                }
                return pausedAny;
            };
            ZTween.resume = function (target) {
                var props = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    props[_i - 1] = arguments[_i];
                }
                var resumedAny = false;
                var ftweens = this.getTweens.apply(null, ([target]).concat(props));
                var i;
                for (i = 0; i < ftweens.length; i++) {
                    if (ftweens[i].paused) {
                        ftweens[i].resume();
                        resumedAny = true;
                    }
                }
                return resumedAny;
            };
            ZTween.removeTweenByIndex = function (i) {
                this.tweens[i] = null;
            };
            ZTween.prototype.update = function (currentTime, currentTimeFrame) {
                if (this._paused)
                    return true;
                this.cTime = this._useFrames ? currentTimeFrame : currentTime;
                if (this.started || this.cTime >= this.timeStart) {
                    if (!this.started) {
                        this._onStart.dispatch();
                        for (this.i = 0; this.i < this.properties.length; this.i++) {
                            this.tProperty = this.properties[this.i];
                            this.pv = this._target[this.tProperty.name];
                            this.tProperty.valueStart = isNaN(this.pv) ? this.tProperty.valueComplete : this.pv;
                            this.tProperty.valueChange = this.tProperty.valueComplete - this.tProperty.valueStart;
                        }
                        this.started = true;
                    }
                    if (this.cTime >= this.timeComplete) {
                        for (this.i = 0; this.i < this.properties.length; this.i++) {
                            this.tProperty = this.properties[this.i];
                            this._target[this.tProperty.name] = this.tProperty.valueComplete;
                        }
                        this._onUpdate.dispatch();
                        this._onComplete.dispatch();
                        return false;
                    }
                    else {
                        this.t = this.transition((this.cTime - this.timeStart) / this.timeDuration);
                        for (this.i = 0; this.i < this.properties.length; this.i++) {
                            this.tProperty = this.properties[this.i];
                            this._target[this.tProperty.name] = this.tProperty.valueStart + this.t * this.tProperty.valueChange;
                        }
                        this._onUpdate.dispatch();
                    }
                }
                return true;
            };
            ZTween.prototype.pause = function () {
                if (!this._paused) {
                    this._paused = true;
                    this.timePaused = this._useFrames ? ZTween.currentTimeFrame : ZTween.currentTime;
                }
            };
            ZTween.prototype.resume = function () {
                if (this._paused) {
                    this._paused = false;
                    var timeNow = this._useFrames ? ZTween.currentTimeFrame : ZTween.currentTime;
                    this.timeStart += timeNow - this.timePaused;
                    this.timeComplete += timeNow - this.timePaused;
                }
            };
            Object.defineProperty(ZTween.prototype, "delay", {
                get: function () {
                    return (this.timeStart - this.timeCreated) / (this._useFrames ? 1 : 1000);
                },
                set: function (value) {
                    this.timeStart = this.timeCreated + (value * (this._useFrames ? 1 : 1000));
                    this.timeComplete = this.timeStart + this.timeDuration;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "time", {
                get: function () {
                    return (this.timeComplete - this.timeStart) / (this._useFrames ? 1 : 1000);
                },
                set: function (value) {
                    this.timeComplete = this.timeStart + (value * (this._useFrames ? 1 : 1000));
                    this.updateCache();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "paused", {
                get: function () {
                    return this._paused;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "useFrames", {
                get: function () {
                    return this._useFrames;
                },
                set: function (value) {
                    var tDelay = this.delay;
                    var tTime = this.time;
                    this._useFrames = value;
                    this.timeStart = this._useFrames ? ZTween.currentTimeFrame : ZTween.currentTime;
                    this.delay = tDelay;
                    this.time = tTime;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "target", {
                get: function () {
                    return this._target;
                },
                set: function (target) {
                    this._target = target;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "onStart", {
                get: function () {
                    return this._onStart;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "onUpdate", {
                get: function () {
                    return this._onUpdate;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZTween.prototype, "onComplete", {
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });
            ZTween.tweens = [];
            return ZTween;
        })();
        transitions.ZTween = ZTween;
        var ZTweenProperty = (function () {
            function ZTweenProperty(name, valueComplete) {
                this.name = name;
                this.valueComplete = valueComplete;
            }
            return ZTweenProperty;
        })();
        ZTween._init();
    })(transitions = zehfernando.transitions || (zehfernando.transitions = {}));
})(zehfernando || (zehfernando = {}));
//# sourceMappingURL=ZTween.js.map