var zehfernando;!function(n){var t;!function(n){var t=function(){function n(){this.functions=[]}return n.prototype.add=function(n){return-1==this.functions.indexOf(n)?(this.functions.push(n),!0):!1},n.prototype.remove=function(n){return this.ifr=this.functions.indexOf(n),this.ifr>-1?(this.functions.splice(this.ifr,1),!0):!1},n.prototype.removeAll=function(){return this.functions.length>0?(this.functions.length=0,!0):!1},n.prototype.dispatch=function(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];for(var i=this.functions.concat(),e=0;e<i.length;e++)i[e].apply(void 0,n)},Object.defineProperty(n.prototype,"numItems",{get:function(){return this.functions.length},enumerable:!0,configurable:!0}),n}();n.SimpleSignal=t}(t=n.signals||(n.signals={}))}(zehfernando||(zehfernando={}));