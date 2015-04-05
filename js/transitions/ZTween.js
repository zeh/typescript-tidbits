/// <reference path='../signals/SimpleSignal.ts'/>
/// <reference path='Easing.ts'/>
var zehfernando;
(function (zehfernando) {
    var transitions;
    (function (transitions) {
        /**
         * @author Zeh Fernando
         */
        var ZTween = (function () {
            // ================================================================================================================
            // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
            /**
             * Creates a new Tween.
             *
             * @param	p_scope				Object		Object that this tweening refers to.
             */
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
                // Parameters
                this.time = 0;
                this.delay = 0;
                this.transition = transitions.Easing.none;
                this._onStart = new zehfernando.signals.SimpleSignal();
                this._onUpdate = new zehfernando.signals.SimpleSignal();
                this._onComplete = new zehfernando.signals.SimpleSignal();
                // Read parameters
                if (parameters != null) {
                    if (parameters.hasOwnProperty("time"))
                        this.time = parameters["time"];
                    if (parameters.hasOwnProperty("delay"))
                        this.delay = parameters["delay"];
                    if (parameters.hasOwnProperty("transition"))
                        this.transition = parameters["transition"];
                    if (parameters.hasOwnProperty("onStart"))
                        this._onStart.add(parameters["onStart"]); // , parameters["onStartParams"]
                    if (parameters.hasOwnProperty("onUpdate"))
                        this._onUpdate.add(parameters["onUpdate"]);
                    if (parameters.hasOwnProperty("onComplete"))
                        this._onComplete.add(parameters["onComplete"]);
                }
                //transitionParams	=	new Array();
                this._useFrames = false;
                this._paused = false;
                //skipUpdates		=	0;
                //updatesSkipped	=	0;
                this.started = false;
            }
            // ================================================================================================================
            // STATIC PSEUDO-CONSTRUCTOR --------------------------------------------------------------------------------------
            ZTween._init = function () {
                // Starts the engine
                this.currentTimeFrame = 0;
                this.currentTime = 0;
                this.frameTick();
            };
            // ================================================================================================================
            // INTERNAL functions ---------------------------------------------------------------------------------------------
            ZTween.prototype.updateCache = function () {
                this.timeDuration = this.timeComplete - this.timeStart;
            };
            // ==================================================================================================================================
            // ENGINE functions -----------------------------------------------------------------------------------------------------------------
            /**
             * Updates all existing tweenings.
             */
            ZTween.updateTweens = function () {
                //trace ("updateTweens");
                this.l = this.tweens.length;
                for (this.i = 0; this.i < this.l; this.i++) {
                    if (this.tweens[this.i] == null || !this.tweens[this.i].update(this.currentTime, this.currentTimeFrame)) {
                        // Old tween, remove
                        this.tweens.splice(this.i, 1);
                        this.i--;
                        this.l--;
                    }
                }
            };
            /**
             * Ran once every frame. It's the main engine; updates all existing tweenings.
             */
            ZTween.frameTick = function () {
                // Update time
                this.currentTime = (new Date()).getTime();
                // Update frame
                this.currentTimeFrame++;
                // Update all tweens
                this.updateTweens();
                window.requestAnimationFrame(this.frameTick.bind(this));
            };
            // ================================================================================================================
            // PUBLIC STATIC functions ----------------------------------------------------------------------------------------
            /**
             * Create a new tweening for an object and starts it.
             */
            ZTween.add = function (target, properties, parameters) {
                if (properties === void 0) { properties = null; }
                if (parameters === void 0) { parameters = null; }
                var t = new ZTween(target, properties, parameters);
                this.tweens.push(t);
                return t;
            };
            /**
             * Remove tweenings for a given object from the active tweening list.
             */
            /*
            public static function remove(__target:Object, ...__args):boolean {
                // Create the list of valid property list
                //var properties:Vector.<String> = new Vector.<String>();
                //l = args["length"];
                //for (i = 0; i < l; i++) {
                //	properties.push(args[i]);
                //}
    
                // Call the affect function on the specified properties
                return affectTweens(removeTweenByIndex, __target, __args);
            }
            */
            ZTween.updateTime = function () {
                // Force a time update - should only be used after complex calculations that take a lot more than a frame
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
                //return (getTweens.apply(([__target] as Array).concat(__props)) as Vector.<ZTween>).length > 0;
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
            /**
             * Remove a specific tweening from the tweening list.
             *
             * @param		p_tween				Number		Index of the tween to be removed on the tweenings list
             * @return							boolean		Whether or not it successfully removed this tweening
             */
            ZTween.removeTweenByIndex = function (i) {
                //__finalRemoval:boolean = false
                this.tweens[i] = null;
                //if (__finalRemoval) tweens.splice(__i, 1);
                //tweens.splice(__i, 1);
                //return true;
            };
            /**
             * Do some generic action on specific tweenings (pause, resume, remove, more?)
             *
             * @param		__function			Function	Function to run on the tweenings that match
             * @param		__target			Object		Object that must have its tweens affected by the function
             * @param		__properties		Array		Array of strings that must be affected
             * @return							boolean		Whether or not it successfully affected something
             */
            /*
            private static function affectTweens (__affectFunction:Function, __target:Object, __properties:Array):boolean {
                var affected:boolean = false;
    
                l = tweens.length;
    
                for (i = 0; i < l; i++) {
                    if (tweens[i].target == __target) {
                        if (__properties.length == 0) {
                            // Can affect everything
                            __affectFunction(i);
                            affected = true;
                        } else {
                            // Must check whether this tween must have specific properties affected
                            var affectedProperties:Array = new Array();
                            var j:uint;
                            for (j = 0; j < p_properties.length; j++) {
                                if (boolean(_tweenList[i].properties[p_properties[j]])) {
                                    affectedProperties.push(p_properties[j]);
                                }
                            }
                            if (affectedProperties.length > 0) {
                                // This tween has some properties that need to be affected
                                var objectProperties:uint = AuxFunctions.getObjectLength(_tweenList[i].properties);
                                if (objectProperties == affectedProperties.length) {
                                    // The list of properties is the same as all properties, so affect it all
                                    p_affectFunction(i);
                                    affected = true;
                                } else {
                                    // The properties are mixed, so split the tween and affect only certain specific properties
                                    var slicedTweenIndex:uint = splitTweens(i, affectedProperties);
                                    p_affectFunction(slicedTweenIndex);
                                    affected = true;
                                }
                            }
                        }
                    }
                }
                return affected;
            }
            */
            // ================================================================================================================
            // PUBLIC INSTANCE functions --------------------------------------------------------------------------------------
            // Event interceptors for caching
            ZTween.prototype.update = function (currentTime, currentTimeFrame) {
                if (this._paused)
                    return true;
                this.cTime = this._useFrames ? currentTimeFrame : currentTime;
                if (this.started || this.cTime >= this.timeStart) {
                    if (!this.started) {
                        this._onStart.dispatch();
                        for (this.i = 0; this.i < this.properties.length; this.i++) {
                            // Property value not initialized yet
                            this.tProperty = this.properties[this.i];
                            // Directly read property
                            this.pv = this._target[this.tProperty.name];
                            this.tProperty.valueStart = isNaN(this.pv) ? this.tProperty.valueComplete : this.pv; // If the property has no value, use the final value as the default
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
                        // Tweening must continue
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
                // ==================================================================================================================================
                // ACESSOR functions ----------------------------------------------------------------------------------------------------------------
                get: function () {
                    return (this.timeStart - this.timeCreated) / (this._useFrames ? 1 : 1000);
                },
                set: function (value) {
                    this.timeStart = this.timeCreated + (value * (this._useFrames ? 1 : 1000));
                    this.timeComplete = this.timeStart + this.timeDuration;
                    //updateCache();
                    // TODO: take pause into consideration!
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
                    // TODO: take pause into consideration!
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
                /*
                public function set paused(p_value:boolean):void {
                    if (p_value == _paused) return;
                    _paused = p_value;
                    if (paused) {
                        // pause
                    } else {
                        // resume
                    }
                }
                */
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
            ZTween.tweens = []; // List of active tweens
            return ZTween;
        })();
        transitions.ZTween = ZTween;
        var ZTweenProperty = (function () {
            function ZTweenProperty(name, valueComplete) {
                this.name = name;
                this.valueComplete = valueComplete;
                //hasModifier			=	boolean(p_modifierFunction);
                //modifierFunction 	=	p_modifierFunction;
                //modifierParameters	=	p_modifierParameters;
            }
            return ZTweenProperty;
        })();
        ZTween._init();
    })(transitions = zehfernando.transitions || (zehfernando.transitions = {}));
})(zehfernando || (zehfernando = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zaXRpb25zL1pUd2Vlbi50cyJdLCJuYW1lcyI6WyJ6ZWhmZXJuYW5kbyIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLmNvbnN0cnVjdG9yIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLl9pbml0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLnVwZGF0ZUNhY2hlIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLnVwZGF0ZVR3ZWVucyIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2Vlbi5mcmFtZVRpY2siLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5aVHdlZW4uYWRkIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLnVwZGF0ZVRpbWUiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5aVHdlZW4ucmVtb3ZlIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLmhhc1R3ZWVuIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLmdldFR3ZWVucyIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2Vlbi5wYXVzZSIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2Vlbi5yZXN1bWUiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5aVHdlZW4ucmVtb3ZlVHdlZW5CeUluZGV4IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLnVwZGF0ZSIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2Vlbi5kZWxheSIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2Vlbi50aW1lIiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLnBhdXNlZCIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2Vlbi51c2VGcmFtZXMiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5aVHdlZW4udGFyZ2V0IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuLm9uU3RhcnQiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5aVHdlZW4ub25VcGRhdGUiLCJ6ZWhmZXJuYW5kby50cmFuc2l0aW9ucy5aVHdlZW4ub25Db21wbGV0ZSIsInplaGZlcm5hbmRvLnRyYW5zaXRpb25zLlpUd2VlblByb3BlcnR5IiwiemVoZmVybmFuZG8udHJhbnNpdGlvbnMuWlR3ZWVuUHJvcGVydHkuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQUNsRCxpQ0FBaUM7QUFFakMsSUFBTyxXQUFXLENBbWlCakI7QUFuaUJELFdBQU8sV0FBVztJQUFDQSxJQUFBQSxXQUFXQSxDQW1pQjdCQTtJQW5pQmtCQSxXQUFBQSxXQUFXQSxFQUFDQSxDQUFDQTtRQUUvQkMsQUFHQUE7O1dBREdBO1lBQ1VBLE1BQU1BO1lBdURsQkMsbUhBQW1IQTtZQUNuSEEsbUhBQW1IQTtZQUVuSEE7Ozs7ZUFJR0E7WUFDSEEsU0EvRFlBLE1BQU1BLENBK0ROQSxNQUFVQSxFQUFFQSxVQUFxQkEsRUFBRUEsVUFBcUJBO2dCQUE1Q0MsMEJBQXFCQSxHQUFyQkEsaUJBQXFCQTtnQkFBRUEsMEJBQXFCQSxHQUFyQkEsaUJBQXFCQTtnQkFFbkVBLElBQUlBLENBQUNBLE9BQU9BLEdBQUlBLE1BQU1BLENBQUNBO2dCQUV2QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBSUEsSUFBSUEsS0FBS0EsRUFBa0JBLENBQUNBO2dCQUMvQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsSUFBSUEsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzlCQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxjQUFjQSxDQUFDQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFcEVBLENBQUNBO2dCQUVEQSxJQUFJ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QUNBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBQzNDQSxDQUFDQTtZQUVhUCxhQUFNQSxHQUFwQkEsVUFBcUJBLE1BQVVBO2dCQUFFUSxlQUFRQTtxQkFBUkEsV0FBUUEsQ0FBUkEsc0JBQVFBLENBQVJBLElBQVFBO29CQUFSQSw4QkFBUUE7O2dCQUN4Q0EsSUFBSUEsRUFBRUEsR0FBaUJBLEVBQUVBLENBQUNBO2dCQUUxQkEsSUFBSUEsQ0FBQ0EsR0FBVUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ2xDQSxJQUFJQSxDQUFTQSxDQUFDQTtnQkFDZEEsSUFBSUEsQ0FBU0EsQ0FBQ0E7Z0JBR2RBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO29CQUN4QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hFQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBO2dDQUN2REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEs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QUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTs0QkFDNURBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUN6Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7d0JBQ2xFQSxDQUFDQTt3QkFFREEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7d0JBQzFCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTt3QkFFNUJBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO29CQUVkQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBQ1BBLEFBQ0FBLHlCQUR5QkE7d0JBQ3pCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTt3QkFDNUVBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBOzRCQUM1REEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FB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Q0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ3RCQSxDQUFDQTs7O2VBQUFwQjtZQUNEQSxzQkFBV0EsNEJBQVFBO3FCQUFuQkE7b0JBQ0NxQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDdkJBLENBQUNBOzs7ZUFBQXJCO1lBQ0RBLHNCQUFXQSw4QkFBVUE7cUJBQXJCQTtvQkFDQ3NCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO2dCQUN6QkEsQ0FBQ0E7OztlQUFBdEI7WUFuZ0JjQSxhQUFNQSxHQUFpQkEsRUFBRUEsQ0FBQ0EsQ0FBR0Esd0JBQXdCQTtZQW9nQnJFQSxhQUFDQTtRQUFEQSxDQTFnQkFELEFBMGdCQ0MsSUFBQUQ7UUExZ0JZQSxrQkFBTUEsR0FBTkEsTUEwZ0JaQSxDQUFBQTtRQUVEQSxJQUFNQSxjQUFjQTtZQVFuQndCLFNBUktBLGNBQWNBLENBUVBBLElBQVdBLEVBQUVBLGFBQW9CQTtnQkFDNUNDLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUNqQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsYUFBYUEsQ0FBQ0E7Z0JBQ25DQSw4Q0FBOENBO2dCQUM5Q0EseUNBQXlDQTtnQkFDekNBLDRDQUE0Q0E7WUFDN0NBLENBQUNBO1lBQ0ZELHFCQUFDQTtRQUFEQSxDQWZBeEIsQUFlQ3dCLElBQUF4QjtRQUVEQSxNQUFNQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtJQUNoQkEsQ0FBQ0EsRUFuaUJrQkQsV0FBV0EsR0FBWEEsdUJBQVdBLEtBQVhBLHVCQUFXQSxRQW1pQjdCQTtBQUFEQSxDQUFDQSxFQW5pQk0sV0FBVyxLQUFYLFdBQVcsUUFtaUJqQiIsImZpbGUiOiJ0cmFuc2l0aW9ucy9aVHdlZW4uanMiLCJzb3VyY2VSb290IjoiRDovRHJvcGJveC93b3JrL2dpdHMvdHlwZXNjcmlwdC10aWRiaXRzLyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL3NpZ25hbHMvU2ltcGxlU2lnbmFsLnRzJy8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Vhc2luZy50cycvPlxyXG5cclxubW9kdWxlIHplaGZlcm5hbmRvLnRyYW5zaXRpb25zIHtcclxuXHJcblx0LyoqXHJcblx0ICogQGF1dGhvciBaZWggRmVybmFuZG9cclxuXHQgKi9cclxuXHRleHBvcnQgY2xhc3MgWlR3ZWVuIHtcclxuXHJcblx0XHQvLyBTdGF0aWMgcHJvcGVydGllc1xyXG5cdFx0cHVibGljIHN0YXRpYyBjdXJyZW50VGltZTpudW1iZXI7XHRcdFx0XHRcdC8vIFRoZSBjdXJyZW50IHRpbWUuIFRoaXMgaXMgZ2VuZXJpYyBmb3IgYWxsIHR3ZWVuaW5ncyBmb3IgYSBcInRpbWUgZ3JpZFwiIGJhc2VkIHVwZGF0ZVxyXG5cdFx0cHVibGljIHN0YXRpYyBjdXJyZW50VGltZUZyYW1lOm51bWJlcjtcdFx0XHRcdC8vIFRoZSBjdXJyZW50IGZyYW1lLiBVc2VkIG9uIGZyYW1lLWJhc2VkIHR3ZWVuaW5nc1xyXG5cclxuXHRcdHByaXZhdGUgc3RhdGljIHR3ZWVuczpBcnJheTxaVHdlZW4+ID0gW107XHRcdFx0Ly8gTGlzdCBvZiBhY3RpdmUgdHdlZW5zXHJcbi8vXHRcdHByb3RlY3RlZCBzdGF0aWMgdmFyIHR0OlZlY3Rvci48WlR3ZWVuPjtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gVGVtcCB0d2VlbiBsaXN0XHJcblxyXG5cdFx0Ly8gUHJvcGVydGllc1xyXG5cdFx0cHJpdmF0ZSBfdGFyZ2V0XHRcdFx0XHRcdDphbnk7XHRcdFx0XHRcdC8vIE9iamVjdCBhZmZlY3RlZCBieSB0aGlzIHR3ZWVuaW5nXHJcblx0XHRwcml2YXRlIHByb3BlcnRpZXNcdFx0XHRcdDpBcnJheTxaVHdlZW5Qcm9wZXJ0eT47XHRcdC8vIExpc3Qgb2YgcHJvcGVydGllcyB0aGF0IGFyZSB0d2VlbmVkXHJcblxyXG5cdFx0cHJpdmF0ZSB0aW1lU3RhcnRcdFx0XHRcdDpudW1iZXI7XHRcdFx0Ly8gVGltZSB3aGVuIHRoaXMgdHdlZW5pbmcgc2hvdWxkIHN0YXJ0XHJcblx0XHRwcml2YXRlIHRpbWVDcmVhdGVkXHRcdFx0XHQ6bnVtYmVyO1x0XHRcdC8vIFRpbWUgd2hlbiB0aGlzIHR3ZWVuaW5nIHdhcyBjcmVhdGVkXHJcblx0XHRwcml2YXRlIHRpbWVDb21wbGV0ZVx0XHRcdDpudW1iZXI7XHRcdFx0Ly8gVGltZSB3aGVuIHRoaXMgdHdlZW5pbmcgc2hvdWxkIGVuZFxyXG5cdFx0cHJpdmF0ZSB0aW1lRHVyYXRpb25cdFx0XHQ6bnVtYmVyO1x0XHRcdC8vIFRpbWUgdGhpcyB0d2VlbiB0YWtlcyAoY2FjaGUpXHJcblx0XHRwcml2YXRlIHRyYW5zaXRpb25cdFx0XHRcdDpGdW5jdGlvbjtcdFx0XHQvLyBFcXVhdGlvbiB0byBjb250cm9sIHRoZSB0cmFuc2l0aW9uIGFuaW1hdGlvblxyXG5cdFx0Ly9wcml2YXRlIHRyYW5zaXRpb25QYXJhbXNcdFx0XHQ6T2JqZWN0O1x0XHQvLyBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmFuc2l0aW9uXHJcblx0XHQvL3ByaXZhdGUgcm91bmRlZFx0XHRcdFx0XHQ6Ym9vbGVhbjtcdFx0Ly8gVXNlIHJvdW5kZWQgdmFsdWVzIHdoZW4gdXBkYXRpbmdcclxuXHRcdHByaXZhdGUgdGltZVBhdXNlZFx0XHRcdFx0Om51bWJlcjtcdFx0XHQvLyBUaW1lIHdoZW4gdGhpcyB0d2VlbiB3YXMgcGF1c2VkXHJcblx0XHQvL3ByaXZhdGUgc2tpcFVwZGF0ZXNcdFx0XHRcdDp1aW50O1x0XHRcdC8vIEhvdyBtYW55IHVwZGF0ZXMgc2hvdWxkIGJlIHNraXBwZWQgKGRlZmF1bHQgPSAwOyAxID0gdXBkYXRlLXNraXAtdXBkYXRlLXNraXAuLi4pXHJcblx0XHQvL3ByaXZhdGUgdXBkYXRlc1NraXBwZWRcdFx0XHQ6dWludDtcdFx0XHQvLyBIb3cgbWFueSB1cGRhdGVzIGhhdmUgYWxyZWFkeSBiZWVuIHNraXBwZWRcclxuXHRcdHByaXZhdGUgc3RhcnRlZFx0XHRcdFx0XHQ6Ym9vbGVhbjtcdFx0XHQvLyBXaGV0aGVyIG9yIG5vdCB0aGlzIHR3ZWVuIGhhcyBhbHJlYWR5IHN0YXJ0ZWQgZXhlY3V0aW5nXHJcblxyXG5cdFx0cHJpdmF0ZSBfb25TdGFydFx0XHRcdFx0OnplaGZlcm5hbmRvLnNpZ25hbHMuU2ltcGxlU2lnbmFsO1xyXG5cdFx0cHJpdmF0ZSBfb25VcGRhdGVcdFx0XHRcdDp6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbDtcclxuXHRcdHByaXZhdGUgX29uQ29tcGxldGVcdFx0XHRcdDp6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbDtcclxuXHJcblx0XHQvLyBFeHRlcm5hbCBwcm9wZXJ0aWVzXHJcblx0XHRwcml2YXRlIF9wYXVzZWQ6IGJvb2xlYW47XHRcdFx0Ly8gV2hldGhlciBvciBub3QgdGhpcyB0d2VlbiBpcyBjdXJyZW50bHkgcGF1c2VkXHJcblx0XHRwcml2YXRlIF91c2VGcmFtZXM6IGJvb2xlYW47XHRcdC8vIFdoZXRoZXIgb3Igbm90IHRvIHVzZSBmcmFtZXMgaW5zdGVhZCBvZiBzZWNvbmRzXHJcblxyXG5cdFx0Ly8gVGVtcG9yYXJ5IHZhcmlhYmxlcyB0byBhdm9pZCBkaXNwb3NhbFxyXG5cdFx0cHJpdmF0ZSB0OiBudW1iZXI7XHRcdC8vIEN1cnJlbnQgdGltZSAoMC0xKVxyXG5cdFx0cHJpdmF0ZSB0UHJvcGVydHk6IFpUd2VlblByb3BlcnR5O1x0Ly8gUHJvcGVydHkgYmVpbmcgY2hlY2tlZFxyXG5cdFx0cHJpdmF0ZSBwdjogbnVtYmVyO1xyXG5cdFx0cHJpdmF0ZSBpOiBudW1iZXI7XHRcdFx0Ly8gTG9vcCBpdGVyYXRvclxyXG5cdFx0cHJpdmF0ZSBjVGltZTogbnVtYmVyO1x0XHRcdC8vIEN1cnJlbnQgZW5naW5lIHRpbWUgKGluIGZyYW1lcyBvciBzZWNvbmRzKVxyXG5cclxuXHRcdC8vIFRlbXAgdmFyc1xyXG5cdFx0cHJvdGVjdGVkIHN0YXRpYyBpOiBudW1iZXI7XHJcblx0XHRwcm90ZWN0ZWQgc3RhdGljIGw6IG51bWJlcjtcclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyBTVEFUSUMgUFNFVURPLUNPTlNUUlVDVE9SIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyBfaW5pdCgpOnZvaWQge1xyXG5cdFx0XHQvLyBTdGFydHMgdGhlIGVuZ2luZVxyXG5cdFx0XHR0aGlzLmN1cnJlbnRUaW1lRnJhbWUgPSAwO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRUaW1lID0gMDtcclxuXHJcblx0XHRcdHRoaXMuZnJhbWVUaWNrKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gQ09OU1RSVUNUT1IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyBhIG5ldyBUd2Vlbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdHBfc2NvcGVcdFx0XHRcdE9iamVjdFx0XHRPYmplY3QgdGhhdCB0aGlzIHR3ZWVuaW5nIHJlZmVycyB0by5cclxuXHRcdCAqL1xyXG5cdFx0Y29uc3RydWN0b3IodGFyZ2V0OmFueSwgcHJvcGVydGllczphbnkgPSBudWxsLCBwYXJhbWV0ZXJzOmFueSA9IG51bGwpIHtcclxuXHJcblx0XHRcdHRoaXMuX3RhcmdldFx0XHQ9XHR0YXJnZXQ7XHJcblxyXG5cdFx0XHR0aGlzLnByb3BlcnRpZXNcdFx0PVx0bmV3IEFycmF5PFpUd2VlblByb3BlcnR5PigpO1xyXG5cdFx0XHRmb3IgKHZhciBwTmFtZSBpbiBwcm9wZXJ0aWVzKSB7XHJcblx0XHRcdFx0dGhpcy5wcm9wZXJ0aWVzLnB1c2gobmV3IFpUd2VlblByb3BlcnR5KHBOYW1lLCBwcm9wZXJ0aWVzW3BOYW1lXSkpO1xyXG5cdFx0XHRcdC8vYWRkUHJvcGVydHkocE5hbWUsIF9fcHJvcGVydGllc1twTmFtZV0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnRpbWVDcmVhdGVkXHQ9IFpUd2Vlbi5jdXJyZW50VGltZTtcclxuXHRcdFx0dGhpcy50aW1lU3RhcnRcdFx0PSB0aGlzLnRpbWVDcmVhdGVkO1xyXG5cclxuXHRcdFx0Ly8gUGFyYW1ldGVyc1xyXG5cdFx0XHR0aGlzLnRpbWVcdFx0XHQ9IDA7XHJcblx0XHRcdHRoaXMuZGVsYXlcdFx0XHQ9IDA7XHJcblx0XHRcdHRoaXMudHJhbnNpdGlvblx0XHQ9IEVhc2luZy5ub25lO1xyXG5cclxuXHRcdFx0dGhpcy5fb25TdGFydFx0XHQ9IG5ldyB6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbCgpO1xyXG5cdFx0XHR0aGlzLl9vblVwZGF0ZVx0XHQ9IG5ldyB6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbCgpO1xyXG5cdFx0XHR0aGlzLl9vbkNvbXBsZXRlXHQ9IG5ldyB6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbCgpO1xyXG5cclxuXHRcdFx0Ly8gUmVhZCBwYXJhbWV0ZXJzXHJcblx0XHRcdGlmIChwYXJhbWV0ZXJzICE9IG51bGwpIHtcclxuXHRcdFx0XHRpZiAocGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShcInRpbWVcIikpIHRoaXMudGltZSA9IHBhcmFtZXRlcnNbXCJ0aW1lXCJdO1xyXG5cdFx0XHRcdGlmIChwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KFwiZGVsYXlcIikpIHRoaXMuZGVsYXkgPSBwYXJhbWV0ZXJzW1wiZGVsYXlcIl07XHJcblxyXG5cdFx0XHRcdGlmIChwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KFwidHJhbnNpdGlvblwiKSkgdGhpcy50cmFuc2l0aW9uID0gcGFyYW1ldGVyc1tcInRyYW5zaXRpb25cIl07XHJcblxyXG5cdFx0XHRcdGlmIChwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KFwib25TdGFydFwiKSkgdGhpcy5fb25TdGFydC5hZGQocGFyYW1ldGVyc1tcIm9uU3RhcnRcIl0pOyAvLyAsIHBhcmFtZXRlcnNbXCJvblN0YXJ0UGFyYW1zXCJdXHJcblx0XHRcdFx0aWYgKHBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoXCJvblVwZGF0ZVwiKSkgdGhpcy5fb25VcGRhdGUuYWRkKHBhcmFtZXRlcnNbXCJvblVwZGF0ZVwiXSk7XHJcblx0XHRcdFx0aWYgKHBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoXCJvbkNvbXBsZXRlXCIpKSB0aGlzLl9vbkNvbXBsZXRlLmFkZChwYXJhbWV0ZXJzW1wib25Db21wbGV0ZVwiXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly90cmFuc2l0aW9uUGFyYW1zXHQ9XHRuZXcgQXJyYXkoKTtcclxuXHJcblx0XHRcdHRoaXMuX3VzZUZyYW1lcyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0dGhpcy5fcGF1c2VkXHRcdD1cdGZhbHNlO1xyXG5cdFx0XHQvL3NraXBVcGRhdGVzXHRcdD1cdDA7XHJcblx0XHRcdC8vdXBkYXRlc1NraXBwZWRcdD1cdDA7XHJcblx0XHRcdHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyBJTlRFUk5BTCBmdW5jdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0cHJpdmF0ZSB1cGRhdGVDYWNoZSgpOnZvaWQge1xyXG5cdFx0XHR0aGlzLnRpbWVEdXJhdGlvbiA9IHRoaXMudGltZUNvbXBsZXRlIC0gdGhpcy50aW1lU3RhcnQ7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vIEVOR0lORSBmdW5jdGlvbnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFVwZGF0ZXMgYWxsIGV4aXN0aW5nIHR3ZWVuaW5ncy5cclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgdXBkYXRlVHdlZW5zKCk6dm9pZCB7XHJcblx0XHRcdC8vdHJhY2UgKFwidXBkYXRlVHdlZW5zXCIpO1xyXG5cclxuXHRcdFx0dGhpcy5sID0gdGhpcy50d2VlbnMubGVuZ3RoO1xyXG5cdFx0XHRmb3IgKHRoaXMuaSA9IDA7IHRoaXMuaSA8IHRoaXMubDsgdGhpcy5pKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy50d2VlbnNbdGhpcy5pXSA9PSBudWxsIHx8ICF0aGlzLnR3ZWVuc1t0aGlzLmldLnVwZGF0ZSh0aGlzLmN1cnJlbnRUaW1lLCB0aGlzLmN1cnJlbnRUaW1lRnJhbWUpKSB7XHJcblx0XHRcdFx0XHQvLyBPbGQgdHdlZW4sIHJlbW92ZVxyXG5cdFx0XHRcdFx0dGhpcy50d2VlbnMuc3BsaWNlKHRoaXMuaSwgMSk7XHJcblx0XHRcdFx0XHR0aGlzLmktLTtcclxuXHRcdFx0XHRcdHRoaXMubC0tO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmFuIG9uY2UgZXZlcnkgZnJhbWUuIEl0J3MgdGhlIG1haW4gZW5naW5lOyB1cGRhdGVzIGFsbCBleGlzdGluZyB0d2VlbmluZ3MuXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgc3RhdGljIGZyYW1lVGljaygpOnZvaWQge1xyXG5cdFx0XHQvLyBVcGRhdGUgdGltZVxyXG5cdFx0XHR0aGlzLmN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdC8vIFVwZGF0ZSBmcmFtZVxyXG5cdFx0XHR0aGlzLmN1cnJlbnRUaW1lRnJhbWUrKztcclxuXHJcblx0XHRcdC8vIFVwZGF0ZSBhbGwgdHdlZW5zXHJcblx0XHRcdHRoaXMudXBkYXRlVHdlZW5zKCk7XHJcblxyXG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWVUaWNrLmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHQvLyBQVUJMSUMgU1RBVElDIGZ1bmN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDcmVhdGUgYSBuZXcgdHdlZW5pbmcgZm9yIGFuIG9iamVjdCBhbmQgc3RhcnRzIGl0LlxyXG5cdFx0ICovXHJcblx0XHRwdWJsaWMgc3RhdGljIGFkZCh0YXJnZXQ6YW55LCBwcm9wZXJ0aWVzOmFueSA9IG51bGwsIHBhcmFtZXRlcnM6YW55ID0gbnVsbCk6IFpUd2VlbiB7XHJcblx0XHRcdHZhciB0OlpUd2VlbiA9IG5ldyBaVHdlZW4odGFyZ2V0LCBwcm9wZXJ0aWVzLCBwYXJhbWV0ZXJzKTtcclxuXHRcdFx0dGhpcy50d2VlbnMucHVzaCh0KTtcclxuXHRcdFx0cmV0dXJuIHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmUgdHdlZW5pbmdzIGZvciBhIGdpdmVuIG9iamVjdCBmcm9tIHRoZSBhY3RpdmUgdHdlZW5pbmcgbGlzdC5cclxuXHRcdCAqL1xyXG5cdFx0LypcclxuXHRcdHB1YmxpYyBzdGF0aWMgZnVuY3Rpb24gcmVtb3ZlKF9fdGFyZ2V0Ok9iamVjdCwgLi4uX19hcmdzKTpib29sZWFuIHtcclxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBsaXN0IG9mIHZhbGlkIHByb3BlcnR5IGxpc3RcclxuXHRcdFx0Ly92YXIgcHJvcGVydGllczpWZWN0b3IuPFN0cmluZz4gPSBuZXcgVmVjdG9yLjxTdHJpbmc+KCk7XHJcblx0XHRcdC8vbCA9IGFyZ3NbXCJsZW5ndGhcIl07XHJcblx0XHRcdC8vZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG5cdFx0XHQvL1x0cHJvcGVydGllcy5wdXNoKGFyZ3NbaV0pO1xyXG5cdFx0XHQvL31cclxuXHJcblx0XHRcdC8vIENhbGwgdGhlIGFmZmVjdCBmdW5jdGlvbiBvbiB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXNcclxuXHRcdFx0cmV0dXJuIGFmZmVjdFR3ZWVucyhyZW1vdmVUd2VlbkJ5SW5kZXgsIF9fdGFyZ2V0LCBfX2FyZ3MpO1xyXG5cdFx0fVxyXG5cdFx0Ki9cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIHVwZGF0ZVRpbWUoKTp2b2lkIHtcclxuXHRcdFx0Ly8gRm9yY2UgYSB0aW1lIHVwZGF0ZSAtIHNob3VsZCBvbmx5IGJlIHVzZWQgYWZ0ZXIgY29tcGxleCBjYWxjdWxhdGlvbnMgdGhhdCB0YWtlIGEgbG90IG1vcmUgdGhhbiBhIGZyYW1lXHJcblx0XHRcdHRoaXMuY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgcmVtb3ZlKHRhcmdldDphbnksIC4uLnByb3BzKTpib29sZWFuIHtcclxuXHRcdFx0dmFyIHRsOkFycmF5PFpUd2Vlbj4gPSBbXTtcclxuXHJcblx0XHRcdHZhciBsOm51bWJlciA9IHRoaXMudHdlZW5zLmxlbmd0aDtcclxuXHRcdFx0dmFyIGk6IG51bWJlcjtcclxuXHRcdFx0dmFyIGo6IG51bWJlcjtcclxuXHRcdFx0Ly8gVE9ETzogdXNlIGZpbHRlcj9cclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy50d2VlbnNbaV0gIT0gbnVsbCAmJiB0aGlzLnR3ZWVuc1tpXS5fdGFyZ2V0ID09IHRhcmdldCkge1xyXG5cdFx0XHRcdFx0aWYgKHByb3BzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IHRoaXMudHdlZW5zW2ldLnByb3BlcnRpZXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocHJvcHMuaW5kZXhPZih0aGlzLnR3ZWVuc1tpXS5wcm9wZXJ0aWVzW2pdLm5hbWUpID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMudHdlZW5zW2ldLnByb3BlcnRpZXMuc3BsaWNlKGosIDEpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ai0tO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy50d2VlbnNbaV0ucHJvcGVydGllcy5sZW5ndGggPT0gMCkgdGwucHVzaCh0aGlzLnR3ZWVuc1tpXSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0bC5wdXNoKHRoaXMudHdlZW5zW2ldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByZW1vdmVkQW55OmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRcdGwgPSB0bC5sZW5ndGg7XHJcblxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XHJcblx0XHRcdFx0aiA9IHRoaXMudHdlZW5zLmluZGV4T2YodGxbaV0pO1xyXG5cdFx0XHRcdHRoaXMucmVtb3ZlVHdlZW5CeUluZGV4KGopO1xyXG5cdFx0XHRcdHJlbW92ZWRBbnkgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVtb3ZlZEFueTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIGhhc1R3ZWVuKHRhcmdldDphbnksIC4uLnByb3BzKTpib29sZWFuIHtcclxuXHRcdFx0Ly9yZXR1cm4gKGdldFR3ZWVucy5hcHBseSgoW19fdGFyZ2V0XSBhcyBBcnJheSkuY29uY2F0KF9fcHJvcHMpKSBhcyBWZWN0b3IuPFpUd2Vlbj4pLmxlbmd0aCA+IDA7XHJcblxyXG5cdFx0XHR2YXIgbDpudW1iZXIgPSB0aGlzLnR3ZWVucy5sZW5ndGg7XHJcblx0XHRcdHZhciBpOm51bWJlcjtcclxuXHRcdFx0dmFyIGo6bnVtYmVyO1xyXG5cdFx0XHQvLyBUT0RPOiB1c2UgZmlsdGVyP1xyXG5cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLnR3ZWVuc1tpXSAhPSBudWxsICYmIHRoaXMudHdlZW5zW2ldLl90YXJnZXQgPT0gdGFyZ2V0KSB7XHJcblx0XHRcdFx0XHRpZiAocHJvcHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgdGhpcy50d2VlbnNbaV0ucHJvcGVydGllcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwcm9wcy5pbmRleE9mKHRoaXMudHdlZW5zW2ldLnByb3BlcnRpZXNbal0ubmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyBnZXRUd2VlbnModGFyZ2V0OmFueSwgLi4ucHJvcHMpOkFycmF5PFpUd2Vlbj4ge1xyXG5cdFx0XHR2YXIgdGw6QXJyYXk8WlR3ZWVuPiA9IFtdO1xyXG5cclxuXHRcdFx0dmFyIGw6bnVtYmVyID0gdGhpcy50d2VlbnMubGVuZ3RoO1xyXG5cdFx0XHR2YXIgaTpudW1iZXI7XHJcblx0XHRcdHZhciBqOm51bWJlcjtcclxuXHRcdFx0dmFyIGZvdW5kOmJvb2xlYW47XHJcblx0XHRcdC8vIFRPRE86IHVzZSBmaWx0ZXI/XHJcblxyXG5cdFx0XHQvL3RyYWNlIChcIlpUd2VlbiA6OiBnZXRUd2VlbnMoKSA6OiBnZXR0aW5nIHR3ZWVucyBmb3IgXCIrX190YXJnZXQrXCIsIFwiK19fcHJvcHMrXCIgKFwiK19fcHJvcHMubGVuZ3RoK1wiIHByb3BlcnRpZXMpXCIpO1xyXG5cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xyXG5cdFx0XHRcdGlmICh0aGlzLnR3ZWVuc1tpXSAhPSBudWxsICYmIHRoaXMudHdlZW5zW2ldLl90YXJnZXQgPT0gdGFyZ2V0KSB7XHJcblx0XHRcdFx0XHRpZiAocHJvcHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRmb3VuZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgdGhpcy50d2VlbnNbaV0ucHJvcGVydGllcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwcm9wcy5pbmRleE9mKHRoaXMudHdlZW5zW2ldLnByb3BlcnRpZXNbal0ubmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Zm91bmQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChmb3VuZCkgdGwucHVzaCh0aGlzLnR3ZWVuc1tpXSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0bC5wdXNoKHRoaXMudHdlZW5zW2ldKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0bDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIHBhdXNlKHRhcmdldDphbnksIC4uLnByb3BzKTpib29sZWFuIHtcclxuXHRcdFx0dmFyIHBhdXNlZEFueTpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0XHR2YXIgZnR3ZWVuczpBcnJheTxaVHdlZW4+ID0gdGhpcy5nZXRUd2VlbnMuYXBwbHkobnVsbCwgKFt0YXJnZXRdKS5jb25jYXQocHJvcHMpKTtcclxuXHRcdFx0dmFyIGk6bnVtYmVyO1xyXG5cclxuXHRcdFx0Ly90cmFjZSAoXCJaVHdlZW4gOjogcGF1c2UoKSA6OiBwYXVzaW5nIHR3ZWVucyBmb3IgXCIgKyBfX3RhcmdldCArIFwiOiBcIiArIGZ0d2VlbnMubGVuZ3RoICsgXCIgYWN0dWFsIHR3ZWVuc1wiKTtcclxuXHJcblx0XHRcdC8vIFRPRE86IHVzZSBmaWx0ZXIvYXBwbHk/XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmdHdlZW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKCFmdHdlZW5zW2ldLnBhdXNlZCkge1xyXG5cdFx0XHRcdFx0ZnR3ZWVuc1tpXS5wYXVzZSgpO1xyXG5cdFx0XHRcdFx0cGF1c2VkQW55ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBwYXVzZWRBbnk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHN0YXRpYyByZXN1bWUodGFyZ2V0OmFueSwgLi4ucHJvcHMpOmJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgcmVzdW1lZEFueTpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0XHR2YXIgZnR3ZWVuczpBcnJheTxaVHdlZW4+ID0gdGhpcy5nZXRUd2VlbnMuYXBwbHkobnVsbCwgKFt0YXJnZXRdKS5jb25jYXQocHJvcHMpKTtcclxuXHRcdFx0dmFyIGk6bnVtYmVyO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogdXNlIGZpbHRlci9hcHBseT9cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZ0d2VlbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoZnR3ZWVuc1tpXS5wYXVzZWQpIHtcclxuXHRcdFx0XHRcdGZ0d2VlbnNbaV0ucmVzdW1lKCk7XHJcblx0XHRcdFx0XHRyZXN1bWVkQW55ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXN1bWVkQW55O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlIGEgc3BlY2lmaWMgdHdlZW5pbmcgZnJvbSB0aGUgdHdlZW5pbmcgbGlzdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW1cdFx0cF90d2Vlblx0XHRcdFx0TnVtYmVyXHRcdEluZGV4IG9mIHRoZSB0d2VlbiB0byBiZSByZW1vdmVkIG9uIHRoZSB0d2VlbmluZ3MgbGlzdFxyXG5cdFx0ICogQHJldHVyblx0XHRcdFx0XHRcdFx0Ym9vbGVhblx0XHRXaGV0aGVyIG9yIG5vdCBpdCBzdWNjZXNzZnVsbHkgcmVtb3ZlZCB0aGlzIHR3ZWVuaW5nXHJcblx0XHQgKi9cclxuXHRcdHB1YmxpYyBzdGF0aWMgcmVtb3ZlVHdlZW5CeUluZGV4KGk6bnVtYmVyKTp2b2lkIHtcclxuXHRcdFx0Ly9fX2ZpbmFsUmVtb3ZhbDpib29sZWFuID0gZmFsc2VcclxuXHRcdFx0dGhpcy50d2VlbnNbaV0gPSBudWxsO1xyXG5cdFx0XHQvL2lmIChfX2ZpbmFsUmVtb3ZhbCkgdHdlZW5zLnNwbGljZShfX2ksIDEpO1xyXG5cdFx0XHQvL3R3ZWVucy5zcGxpY2UoX19pLCAxKTtcclxuXHRcdFx0Ly9yZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERvIHNvbWUgZ2VuZXJpYyBhY3Rpb24gb24gc3BlY2lmaWMgdHdlZW5pbmdzIChwYXVzZSwgcmVzdW1lLCByZW1vdmUsIG1vcmU/KVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbVx0XHRfX2Z1bmN0aW9uXHRcdFx0RnVuY3Rpb25cdEZ1bmN0aW9uIHRvIHJ1biBvbiB0aGUgdHdlZW5pbmdzIHRoYXQgbWF0Y2hcclxuXHRcdCAqIEBwYXJhbVx0XHRfX3RhcmdldFx0XHRcdE9iamVjdFx0XHRPYmplY3QgdGhhdCBtdXN0IGhhdmUgaXRzIHR3ZWVucyBhZmZlY3RlZCBieSB0aGUgZnVuY3Rpb25cclxuXHRcdCAqIEBwYXJhbVx0XHRfX3Byb3BlcnRpZXNcdFx0QXJyYXlcdFx0QXJyYXkgb2Ygc3RyaW5ncyB0aGF0IG11c3QgYmUgYWZmZWN0ZWRcclxuXHRcdCAqIEByZXR1cm5cdFx0XHRcdFx0XHRcdGJvb2xlYW5cdFx0V2hldGhlciBvciBub3QgaXQgc3VjY2Vzc2Z1bGx5IGFmZmVjdGVkIHNvbWV0aGluZ1xyXG5cdFx0ICovXHJcblx0XHQvKlxyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgZnVuY3Rpb24gYWZmZWN0VHdlZW5zIChfX2FmZmVjdEZ1bmN0aW9uOkZ1bmN0aW9uLCBfX3RhcmdldDpPYmplY3QsIF9fcHJvcGVydGllczpBcnJheSk6Ym9vbGVhbiB7XHJcblx0XHRcdHZhciBhZmZlY3RlZDpib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0XHRsID0gdHdlZW5zLmxlbmd0aDtcclxuXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodHdlZW5zW2ldLnRhcmdldCA9PSBfX3RhcmdldCkge1xyXG5cdFx0XHRcdFx0aWYgKF9fcHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRcdFx0XHQvLyBDYW4gYWZmZWN0IGV2ZXJ5dGhpbmdcclxuXHRcdFx0XHRcdFx0X19hZmZlY3RGdW5jdGlvbihpKTtcclxuXHRcdFx0XHRcdFx0YWZmZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gTXVzdCBjaGVjayB3aGV0aGVyIHRoaXMgdHdlZW4gbXVzdCBoYXZlIHNwZWNpZmljIHByb3BlcnRpZXMgYWZmZWN0ZWRcclxuXHRcdFx0XHRcdFx0dmFyIGFmZmVjdGVkUHJvcGVydGllczpBcnJheSA9IG5ldyBBcnJheSgpO1xyXG5cdFx0XHRcdFx0XHR2YXIgajp1aW50O1xyXG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgcF9wcm9wZXJ0aWVzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGJvb2xlYW4oX3R3ZWVuTGlzdFtpXS5wcm9wZXJ0aWVzW3BfcHJvcGVydGllc1tqXV0pKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRhZmZlY3RlZFByb3BlcnRpZXMucHVzaChwX3Byb3BlcnRpZXNbal0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoYWZmZWN0ZWRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIHR3ZWVuIGhhcyBzb21lIHByb3BlcnRpZXMgdGhhdCBuZWVkIHRvIGJlIGFmZmVjdGVkXHJcblx0XHRcdFx0XHRcdFx0dmFyIG9iamVjdFByb3BlcnRpZXM6dWludCA9IEF1eEZ1bmN0aW9ucy5nZXRPYmplY3RMZW5ndGgoX3R3ZWVuTGlzdFtpXS5wcm9wZXJ0aWVzKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAob2JqZWN0UHJvcGVydGllcyA9PSBhZmZlY3RlZFByb3BlcnRpZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBUaGUgbGlzdCBvZiBwcm9wZXJ0aWVzIGlzIHRoZSBzYW1lIGFzIGFsbCBwcm9wZXJ0aWVzLCBzbyBhZmZlY3QgaXQgYWxsXHJcblx0XHRcdFx0XHRcdFx0XHRwX2FmZmVjdEZ1bmN0aW9uKGkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0YWZmZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBUaGUgcHJvcGVydGllcyBhcmUgbWl4ZWQsIHNvIHNwbGl0IHRoZSB0d2VlbiBhbmQgYWZmZWN0IG9ubHkgY2VydGFpbiBzcGVjaWZpYyBwcm9wZXJ0aWVzXHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgc2xpY2VkVHdlZW5JbmRleDp1aW50ID0gc3BsaXRUd2VlbnMoaSwgYWZmZWN0ZWRQcm9wZXJ0aWVzKTtcclxuXHRcdFx0XHRcdFx0XHRcdHBfYWZmZWN0RnVuY3Rpb24oc2xpY2VkVHdlZW5JbmRleCk7XHJcblx0XHRcdFx0XHRcdFx0XHRhZmZlY3RlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBhZmZlY3RlZDtcclxuXHRcdH1cclxuXHRcdCovXHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cdFx0Ly8gUFVCTElDIElOU1RBTkNFIGZ1bmN0aW9ucyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRcdC8vIEV2ZW50IGludGVyY2VwdG9ycyBmb3IgY2FjaGluZ1xyXG5cdFx0cHVibGljIHVwZGF0ZShjdXJyZW50VGltZTogbnVtYmVyLCBjdXJyZW50VGltZUZyYW1lOiBudW1iZXIpOmJvb2xlYW4ge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3BhdXNlZCkgcmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHR0aGlzLmNUaW1lID0gdGhpcy5fdXNlRnJhbWVzID8gY3VycmVudFRpbWVGcmFtZSA6IGN1cnJlbnRUaW1lO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc3RhcnRlZCB8fCB0aGlzLmNUaW1lID49IHRoaXMudGltZVN0YXJ0KSB7XHJcblx0XHRcdFx0aWYgKCF0aGlzLnN0YXJ0ZWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX29uU3RhcnQuZGlzcGF0Y2goKTtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHRoaXMuaSA9IDA7IHRoaXMuaSA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IHRoaXMuaSsrKSB7XHJcblx0XHRcdFx0XHRcdC8vIFByb3BlcnR5IHZhbHVlIG5vdCBpbml0aWFsaXplZCB5ZXRcclxuXHRcdFx0XHRcdFx0dGhpcy50UHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbdGhpcy5pXTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIERpcmVjdGx5IHJlYWQgcHJvcGVydHlcclxuXHRcdFx0XHRcdFx0dGhpcy5wdiA9IHRoaXMuX3RhcmdldFt0aGlzLnRQcm9wZXJ0eS5uYW1lXTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMudFByb3BlcnR5LnZhbHVlU3RhcnQgPSBpc05hTih0aGlzLnB2KSA/IHRoaXMudFByb3BlcnR5LnZhbHVlQ29tcGxldGUgOiB0aGlzLnB2OyAvLyBJZiB0aGUgcHJvcGVydHkgaGFzIG5vIHZhbHVlLCB1c2UgdGhlIGZpbmFsIHZhbHVlIGFzIHRoZSBkZWZhdWx0XHJcblx0XHRcdFx0XHRcdHRoaXMudFByb3BlcnR5LnZhbHVlQ2hhbmdlID0gdGhpcy50UHJvcGVydHkudmFsdWVDb21wbGV0ZSAtIHRoaXMudFByb3BlcnR5LnZhbHVlU3RhcnQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuY1RpbWUgPj0gdGhpcy50aW1lQ29tcGxldGUpIHtcclxuXHRcdFx0XHRcdC8vIFR3ZWVuaW5nIHRpbWUgaGFzIGZpbmlzaGVkLCBqdXN0IHNldCBpdCB0byB0aGUgZmluYWwgdmFsdWVcclxuXHRcdFx0XHRcdGZvciAodGhpcy5pID0gMDsgdGhpcy5pIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgdGhpcy5pKyspIHtcclxuXHRcdFx0XHRcdFx0dGhpcy50UHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbdGhpcy5pXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5fdGFyZ2V0W3RoaXMudFByb3BlcnR5Lm5hbWVdID0gdGhpcy50UHJvcGVydHkudmFsdWVDb21wbGV0ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzLl9vblVwZGF0ZS5kaXNwYXRjaCgpO1xyXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZS5kaXNwYXRjaCgpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIFR3ZWVuaW5nIG11c3QgY29udGludWVcclxuXHRcdFx0XHRcdHRoaXMudCA9IHRoaXMudHJhbnNpdGlvbigodGhpcy5jVGltZSAtIHRoaXMudGltZVN0YXJ0KSAvIHRoaXMudGltZUR1cmF0aW9uKTtcclxuXHRcdFx0XHRcdGZvciAodGhpcy5pID0gMDsgdGhpcy5pIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgdGhpcy5pKyspIHtcclxuXHRcdFx0XHRcdFx0dGhpcy50UHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbdGhpcy5pXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5fdGFyZ2V0W3RoaXMudFByb3BlcnR5Lm5hbWVdID0gdGhpcy50UHJvcGVydHkudmFsdWVTdGFydCArIHRoaXMudCAqIHRoaXMudFByb3BlcnR5LnZhbHVlQ2hhbmdlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX29uVXBkYXRlLmRpc3BhdGNoKCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBwYXVzZSgpOnZvaWQge1xyXG5cdFx0XHRpZiAoIXRoaXMuX3BhdXNlZCkge1xyXG5cdFx0XHRcdHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy50aW1lUGF1c2VkID0gdGhpcy5fdXNlRnJhbWVzID8gWlR3ZWVuLmN1cnJlbnRUaW1lRnJhbWUgOiBaVHdlZW4uY3VycmVudFRpbWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgcmVzdW1lKCk6dm9pZCB7XHJcblx0XHRcdGlmICh0aGlzLl9wYXVzZWQpIHtcclxuXHRcdFx0XHR0aGlzLl9wYXVzZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR2YXIgdGltZU5vdzogbnVtYmVyID0gdGhpcy5fdXNlRnJhbWVzID8gWlR3ZWVuLmN1cnJlbnRUaW1lRnJhbWUgOiBaVHdlZW4uY3VycmVudFRpbWU7XHJcblx0XHRcdFx0dGhpcy50aW1lU3RhcnQgKz0gdGltZU5vdyAtIHRoaXMudGltZVBhdXNlZDtcclxuXHRcdFx0XHR0aGlzLnRpbWVDb21wbGV0ZSArPSB0aW1lTm93IC0gdGhpcy50aW1lUGF1c2VkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vIEFDRVNTT1IgZnVuY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcblx0XHRwdWJsaWMgZ2V0IGRlbGF5KCk6bnVtYmVyIHtcclxuXHRcdFx0cmV0dXJuICh0aGlzLnRpbWVTdGFydCAtIHRoaXMudGltZUNyZWF0ZWQpIC8gKHRoaXMuX3VzZUZyYW1lcyA/IDEgOiAxMDAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc2V0IGRlbGF5KHZhbHVlOm51bWJlcikge1xyXG5cdFx0XHR0aGlzLnRpbWVTdGFydCA9IHRoaXMudGltZUNyZWF0ZWQgKyAodmFsdWUgKiAodGhpcy5fdXNlRnJhbWVzID8gMSA6IDEwMDApKTtcclxuXHRcdFx0dGhpcy50aW1lQ29tcGxldGUgPSB0aGlzLnRpbWVTdGFydCArIHRoaXMudGltZUR1cmF0aW9uO1xyXG5cdFx0XHQvL3VwZGF0ZUNhY2hlKCk7XHJcblx0XHRcdC8vIFRPRE86IHRha2UgcGF1c2UgaW50byBjb25zaWRlcmF0aW9uIVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBnZXQgdGltZSgpOm51bWJlciB7XHJcblx0XHRcdHJldHVybiAodGhpcy50aW1lQ29tcGxldGUgLSB0aGlzLnRpbWVTdGFydCkgLyAodGhpcy5fdXNlRnJhbWVzID8gMSA6IDEwMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBzZXQgdGltZSh2YWx1ZTpudW1iZXIpIHtcclxuXHRcdFx0dGhpcy50aW1lQ29tcGxldGUgPSB0aGlzLnRpbWVTdGFydCArICh2YWx1ZSAqICh0aGlzLl91c2VGcmFtZXMgPyAxIDogMTAwMCkpO1xyXG5cdFx0XHR0aGlzLnVwZGF0ZUNhY2hlKCk7XHJcblx0XHRcdC8vIFRPRE86IHRha2UgcGF1c2UgaW50byBjb25zaWRlcmF0aW9uIVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBnZXQgcGF1c2VkKCk6Ym9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9wYXVzZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuXHRcdHB1YmxpYyBmdW5jdGlvbiBzZXQgcGF1c2VkKHBfdmFsdWU6Ym9vbGVhbik6dm9pZCB7XHJcblx0XHRcdGlmIChwX3ZhbHVlID09IF9wYXVzZWQpIHJldHVybjtcclxuXHRcdFx0X3BhdXNlZCA9IHBfdmFsdWU7XHJcblx0XHRcdGlmIChwYXVzZWQpIHtcclxuXHRcdFx0XHQvLyBwYXVzZVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIHJlc3VtZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQqL1xyXG5cclxuXHRcdHB1YmxpYyBnZXQgdXNlRnJhbWVzKCk6Ym9vbGVhbiB7XHJcblx0XHRcdHJldHVybiB0aGlzLl91c2VGcmFtZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHNldCB1c2VGcmFtZXModmFsdWU6Ym9vbGVhbikge1xyXG5cdFx0XHR2YXIgdERlbGF5Om51bWJlciA9IHRoaXMuZGVsYXk7XHJcblx0XHRcdHZhciB0VGltZTpudW1iZXIgPSB0aGlzLnRpbWU7XHJcblx0XHRcdHRoaXMuX3VzZUZyYW1lcyA9IHZhbHVlO1xyXG5cdFx0XHR0aGlzLnRpbWVTdGFydCA9IHRoaXMuX3VzZUZyYW1lcyA/IFpUd2Vlbi5jdXJyZW50VGltZUZyYW1lIDogWlR3ZWVuLmN1cnJlbnRUaW1lO1xyXG5cdFx0XHR0aGlzLmRlbGF5ID0gdERlbGF5O1xyXG5cdFx0XHR0aGlzLnRpbWUgPSB0VGltZTtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgZ2V0IHRhcmdldCgpOmFueSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl90YXJnZXQ7XHJcblx0XHR9XHJcblx0XHRwdWJsaWMgc2V0IHRhcmdldCh0YXJnZXQ6YW55KSB7XHJcblx0XHRcdHRoaXMuX3RhcmdldCA9IHRhcmdldDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgZ2V0IG9uU3RhcnQoKTogemVoZmVybmFuZG8uc2lnbmFscy5TaW1wbGVTaWduYWwge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fb25TdGFydDtcclxuXHRcdH1cclxuXHRcdHB1YmxpYyBnZXQgb25VcGRhdGUoKTogemVoZmVybmFuZG8uc2lnbmFscy5TaW1wbGVTaWduYWwge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fb25VcGRhdGU7XHJcblx0XHR9XHJcblx0XHRwdWJsaWMgZ2V0IG9uQ29tcGxldGUoKTp6ZWhmZXJuYW5kby5zaWduYWxzLlNpbXBsZVNpZ25hbCB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9vbkNvbXBsZXRlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xhc3MgWlR3ZWVuUHJvcGVydHkge1xyXG5cclxuXHRcdHB1YmxpYyB2YWx1ZVN0YXJ0OiBudW1iZXI7XHRcdFx0XHRcdC8vIFN0YXJ0aW5nIHZhbHVlIG9mIHRoZSB0d2VlbmluZyAoTmFOIGlmIG5vdCBzdGFydGVkIHlldClcclxuXHRcdHB1YmxpYyB2YWx1ZUNvbXBsZXRlOiBudW1iZXI7XHRcdFx0XHQvLyBGaW5hbCBkZXNpcmVkIHZhbHVlXHJcblx0XHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuXHRcdHB1YmxpYyB2YWx1ZUNoYW5nZTogbnVtYmVyO1x0XHRcdFx0XHQvLyBDaGFuZ2UgbmVlZGVkIGluIHZhbHVlIChjYWNoZSlcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihuYW1lOnN0cmluZywgdmFsdWVDb21wbGV0ZTpudW1iZXIpIHtcclxuXHRcdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdFx0dGhpcy52YWx1ZUNvbXBsZXRlID0gdmFsdWVDb21wbGV0ZTtcclxuXHRcdFx0Ly9oYXNNb2RpZmllclx0XHRcdD1cdGJvb2xlYW4ocF9tb2RpZmllckZ1bmN0aW9uKTtcclxuXHRcdFx0Ly9tb2RpZmllckZ1bmN0aW9uIFx0PVx0cF9tb2RpZmllckZ1bmN0aW9uO1xyXG5cdFx0XHQvL21vZGlmaWVyUGFyYW1ldGVyc1x0PVx0cF9tb2RpZmllclBhcmFtZXRlcnM7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRaVHdlZW4uX2luaXQoKTtcclxufVxyXG4iXX0=