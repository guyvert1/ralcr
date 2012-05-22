var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var CADelegate = $hxClasses["CADelegate"] = function() {
	this.startPointPassed = false;
	this.kenBurnsPointInPassed = false;
	this.kenBurnsPointOutPassed = false;
};
CADelegate.__name__ = ["CADelegate"];
CADelegate.prototype = {
	animationDidStart: null
	,animationDidStop: null
	,animationDidReversed: null
	,arguments: null
	,kenBurnsDidFadedIn: null
	,kenBurnsBeginsFadingOut: null
	,kenBurnsArgs: null
	,startPointPassed: null
	,kenBurnsPointInPassed: null
	,kenBurnsPointOutPassed: null
	,kenBurnsPointIn: null
	,kenBurnsPointOut: null
	,pos: null
	,start: function() {
		this.startPointPassed = true;
		if(Reflect.isFunction(this.animationDidStart)) try {
			this.animationDidStart.apply(null,this.arguments);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 37, className : "CADelegate", methodName : "start"});
		}
	}
	,stop: function() {
		if(Reflect.isFunction(this.animationDidStop)) try {
			this.animationDidStop.apply(null,this.arguments);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 43, className : "CADelegate", methodName : "stop"});
			haxe.Log.trace(this.pos.className + " -> " + this.pos.methodName + " -> " + this.pos.lineNumber,{ fileName : "CADelegate.hx", lineNumber : 44, className : "CADelegate", methodName : "stop"});
			var stack = haxe.Stack.exceptionStack();
			haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "CADelegate.hx", lineNumber : 46, className : "CADelegate", methodName : "stop"});
		}
	}
	,repeat: function() {
		if(Reflect.isFunction(this.animationDidReversed)) try {
			this.animationDidReversed.apply(null,this.arguments);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 53, className : "CADelegate", methodName : "repeat"});
		}
	}
	,kbIn: function() {
		this.kenBurnsPointInPassed = true;
		if(Reflect.isFunction(this.kenBurnsDidFadedIn)) try {
			this.kenBurnsDidFadedIn.apply(null,this.kenBurnsArgs);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 59, className : "CADelegate", methodName : "kbIn"});
		}
	}
	,kbOut: function() {
		this.kenBurnsPointOutPassed = true;
		if(Reflect.isFunction(this.kenBurnsBeginsFadingOut)) try {
			this.kenBurnsBeginsFadingOut.apply(null,this.kenBurnsArgs);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 65, className : "CADelegate", methodName : "kbOut"});
		}
	}
	,__class__: CADelegate
}
var CAObject = $hxClasses["CAObject"] = function(target,properties,duration,delay,Eq,pos) {
	this.target = target;
	this.properties = properties;
	this.repeatCount = 0;
	this.autoreverses = false;
	this.fromTime = Date.now().getTime();
	this.duration = duration == null?CoreAnimation.defaultDuration:duration <= 0?0.001:duration;
	this.delay = delay == null || delay < 0?0:delay;
	if(Eq == null) this.timingFunction = CoreAnimation.defaultTimingFunction; else this.timingFunction = Eq;
	this.delegate = new CADelegate();
	this.delegate.pos = pos;
	this.fromValues = { };
	this.toValues = { };
};
CAObject.__name__ = ["CAObject"];
CAObject.prototype = {
	target: null
	,prev: null
	,next: null
	,properties: null
	,fromValues: null
	,toValues: null
	,fromTime: null
	,delay: null
	,duration: null
	,repeatCount: null
	,autoreverses: null
	,timingFunction: null
	,constraintBounds: null
	,delegate: null
	,init: function() {
		throw "CAObject should be extended (" + this.delegate.pos + ")";
	}
	,animate: function(time_diff) {
		throw "CAObject should be extended (" + this.delegate.pos + ")";
	}
	,initTime: function() {
		this.fromTime = Date.now().getTime();
		this.duration = this.duration * 1000;
		this.delay = this.delay * 1000;
	}
	,repeat: function() {
		this.fromTime = Date.now().getTime();
		this.delay = 0;
		if(this.autoreverses) {
			var v = this.fromValues;
			this.fromValues = this.toValues;
			this.toValues = v;
		}
		this.repeatCount--;
	}
	,calculate: function(time_diff,prop) {
		return this.timingFunction(time_diff,Reflect.field(this.fromValues,prop),Reflect.field(this.toValues,prop) - Reflect.field(this.fromValues,prop),this.duration,null);
	}
	,toString: function() {
		return "[CAObject: target=" + this.target + ", duration=" + this.duration + ", delay=" + this.delay + ", fromTime=" + this.fromTime + ", properties=" + this.properties + ", repeatCount=" + this.repeatCount + "]";
	}
	,__class__: CAObject
}
var CASequence = $hxClasses["CASequence"] = function(objs) {
	this.objs = objs;
};
CASequence.__name__ = ["CASequence"];
CASequence.prototype = {
	objs: null
	,start: function() {
		var obj = this.objs.shift();
		if(this.objs.length > 0) {
			var arguments = obj.delegate.animationDidStop;
			obj.delegate.animationDidStop = this.animationDidStop.$bind(this);
			obj.delegate.arguments = [arguments];
		}
		CoreAnimation.add(obj);
	}
	,animationDidStop: function(func) {
		if(func != null) {
			if(Reflect.isFunction(func)) try {
				func.apply(null,[]);
			} catch( e ) {
				haxe.Log.trace(e,{ fileName : "CASequence.hx", lineNumber : 33, className : "CASequence", methodName : "animationDidStop"});
				Fugu.stack();
			}
		}
		if(this.objs.length > 0) this.start();
	}
	,__class__: CASequence
}
var CATransitionInterface = $hxClasses["CATransitionInterface"] = function() { }
CATransitionInterface.__name__ = ["CATransitionInterface"];
CATransitionInterface.prototype = {
	init: null
	,animate: null
	,__class__: CATransitionInterface
}
var CATCallFunc = $hxClasses["CATCallFunc"] = function(target,properties,duration,delay,Eq,pos) {
	CAObject.call(this,target,properties,duration,delay,Eq,pos);
};
CATCallFunc.__name__ = ["CATCallFunc"];
CATCallFunc.__interfaces__ = [CATransitionInterface];
CATCallFunc.__super__ = CAObject;
CATCallFunc.prototype = $extend(CAObject.prototype,{
	init: function() {
		if(!Reflect.isFunction(this.target)) throw "Function must be of type: Float->Void";
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(Std["is"](Reflect.field(this.properties,p),Int) || Std["is"](Reflect.field(this.properties,p),Float)) {
				this.fromValues[p] = 0;
				this.toValues[p] = Reflect.field(this.properties,p);
			} else try {
				this.fromValues[p] = Reflect.field(Reflect.field(this.properties,p),"fromValue");
				try {
					this.target(Reflect.field(this.fromValues,p));
				} catch( e ) {
					haxe.Log.trace(e,{ fileName : "CATCallFunc.hx", lineNumber : 27, className : "CATCallFunc", methodName : "init"});
				}
				this.toValues[p] = Reflect.field(Reflect.field(this.properties,p),"toValue");
			} catch( e ) {
				haxe.Log.trace(e,{ fileName : "CATCallFunc.hx", lineNumber : 30, className : "CATCallFunc", methodName : "init"});
			}
		}
	}
	,animate: function(time_diff) {
		var _g = 0, _g1 = Reflect.fields(this.toValues);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			try {
				this.target(this.timingFunction(time_diff,Reflect.field(this.fromValues,prop),Reflect.field(this.toValues,prop) - Reflect.field(this.fromValues,prop),this.duration,null));
			} catch( e ) {
				haxe.Log.trace(e,{ fileName : "CATCallFunc.hx", lineNumber : 40, className : "CATCallFunc", methodName : "animate"});
			}
		}
	}
	,__class__: CATCallFunc
});
var CATween = $hxClasses["CATween"] = function(target,properties,duration,delay,Eq,pos) {
	CAObject.call(this,target,properties,duration,delay,Eq,pos);
};
CATween.__name__ = ["CATween"];
CATween.__interfaces__ = [CATransitionInterface];
CATween.__super__ = CAObject;
CATween.prototype = $extend(CAObject.prototype,{
	init: function() {
		var _g = 0, _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(Std["is"](Reflect.field(this.properties,p),Int) || Std["is"](Reflect.field(this.properties,p),Float)) {
				var getter = "get" + p.substr(0,1).toUpperCase() + p.substr(1);
				if(getter == null) this.fromValues[p] = Reflect.field(this.target,p); else this.fromValues[p] = Reflect.field(this.target,getter).apply(this.target,[]);
				this.toValues[p] = Reflect.field(this.properties,p);
			} else try {
				this.fromValues[p] = Reflect.field(Reflect.field(this.properties,p),"fromValue");
				this.target[p] = Reflect.field(this.fromValues,p);
				this.toValues[p] = Reflect.field(Reflect.field(this.properties,p),"toValue");
			} catch( e ) {
				haxe.Log.trace(e,{ fileName : "CATween.hx", lineNumber : 31, className : "CATween", methodName : "init"});
			}
		}
	}
	,animate: function(time_diff) {
		var _g = 0, _g1 = Reflect.fields(this.toValues);
		while(_g < _g1.length) {
			var prop = _g1[_g];
			++_g;
			try {
				var setter = "set" + prop.substr(0,1).toUpperCase() + prop.substr(1);
				if(setter != null) Reflect.field(this.target,setter).apply(this.target,[this.timingFunction(time_diff,Reflect.field(this.fromValues,prop),Reflect.field(this.toValues,prop) - Reflect.field(this.fromValues,prop),this.duration,null)]);
			} catch( e ) {
				haxe.Log.trace(e,{ fileName : "CATween.hx", lineNumber : 50, className : "CATween", methodName : "animate"});
			}
		}
	}
	,__class__: CATween
});
var caequations = caequations || {}
caequations.Linear = $hxClasses["caequations.Linear"] = function() { }
caequations.Linear.__name__ = ["caequations","Linear"];
caequations.Linear.NONE = function(t,b,c,d,p_params) {
	return c * t / d + b;
}
caequations.Linear.prototype = {
	__class__: caequations.Linear
}
var CoreAnimation = $hxClasses["CoreAnimation"] = function() { }
CoreAnimation.__name__ = ["CoreAnimation"];
CoreAnimation.latest = null;
CoreAnimation.ticker = null;
CoreAnimation.add = function(obj) {
	if(obj == null) return;
	if(obj.target == null) return;
	var a = CoreAnimation.latest;
	var prev = CoreAnimation.latest;
	if(prev != null) prev.next = obj;
	obj.prev = prev;
	CoreAnimation.latest = obj;
	obj.init();
	obj.initTime();
	if(CoreAnimation.ticker == null) {
		CoreAnimation.ticker = new EVLoop();
		CoreAnimation.ticker.setFuncToCall(CoreAnimation.updateAnimations);
	}
}
CoreAnimation.remove = function(obj) {
	if(obj == null) return;
	var a = CoreAnimation.latest;
	while(a != null) {
		if(a.target == obj) CoreAnimation.removeCAObject(a);
		a = a.prev;
	}
}
CoreAnimation.removeCAObject = function(a) {
	if(a.prev != null) a.prev.next = a.next;
	if(a.next != null) a.next.prev = a.prev;
	if(CoreAnimation.latest == a) CoreAnimation.latest = a.prev != null?a.prev:null;
	CoreAnimation.removeTimer();
	a = null;
}
CoreAnimation.removeTimer = function() {
	if(CoreAnimation.latest == null && CoreAnimation.ticker != null) {
		CoreAnimation.ticker.destroy();
		CoreAnimation.ticker = null;
	}
}
CoreAnimation.destroy = function() {
	CoreAnimation.latest = null;
	CoreAnimation.removeTimer();
}
CoreAnimation.updateAnimations = function() {
	var current_time = Date.now().getTime();
	var time_diff = 0.0;
	var a = CoreAnimation.latest;
	while(a != null) {
		if(a.target == null) {
			a = a.prev;
			CoreAnimation.removeCAObject(a);
			break;
		}
		time_diff = current_time - a.fromTime - a.delay;
		if(time_diff >= a.duration) time_diff = a.duration;
		if(time_diff > 0) {
			a.animate(time_diff);
			if(time_diff > 0 && !a.delegate.startPointPassed) a.delegate.start();
			if(time_diff >= a.duration) {
				if(a.repeatCount > 0) {
					a.repeat();
					a.delegate.repeat();
				} else {
					CoreAnimation.removeCAObject(a);
					a.delegate.stop();
				}
			}
			if(a.delegate.kenBurnsPointIn != null) {
				if(time_diff > a.delegate.kenBurnsPointIn && !a.delegate.kenBurnsPointInPassed) a.delegate.kbIn();
				if(time_diff > a.delegate.kenBurnsPointOut && !a.delegate.kenBurnsPointOutPassed) a.delegate.kbOut();
			}
		}
		a = a.prev;
	}
}
CoreAnimation.timestamp = function() {
	return Date.now().getTime();
}
CoreAnimation.prototype = {
	__class__: CoreAnimation
}
var RCSignal = $hxClasses["RCSignal"] = function() {
	this.enabled = true;
	this.removeAll();
};
RCSignal.__name__ = ["RCSignal"];
RCSignal.prototype = {
	listeners: null
	,exposableListener: null
	,enabled: null
	,add: function(listener) {
		this.listeners.add(listener);
	}
	,addOnce: function(listener,pos) {
		if(this.exists(listener)) haxe.Log.trace("This listener is already added, it will not be called only once as you expect. " + pos,{ fileName : "RCSignal.hx", lineNumber : 23, className : "RCSignal", methodName : "addOnce"});
		this.exposableListener = listener;
	}
	,addFirst: function(listener,pos) {
		this.listeners.push(listener);
	}
	,remove: function(listener) {
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			if(Reflect.compareMethods(l,listener)) {
				this.listeners.remove(l);
				break;
			}
		}
		if(Reflect.compareMethods(this.exposableListener,listener)) this.exposableListener = null;
	}
	,removeAll: function() {
		this.listeners = new List();
		this.exposableListener = null;
	}
	,dispatch: function(p1,p2,p3,p4,pos) {
		if(!this.enabled) return;
		var args = new Array();
		var _g = 0, _g1 = [p1,p2,p3,p4];
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(p != null) args.push(p); else break;
		}
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var listener = $it0.next();
			this.callMethod(listener,args,pos);
		}
		if(this.exposableListener != null) {
			this.callMethod(this.exposableListener,args,pos);
			this.exposableListener = null;
		}
	}
	,callMethod: function(listener,args,pos) {
		try {
			listener.apply(null,args);
		} catch( e ) {
			haxe.Log.trace("[RCSignal error: " + e + ", called from: " + Std.string(pos) + "]",{ fileName : "RCSignal.hx", lineNumber : 74, className : "RCSignal", methodName : "callMethod"});
			Fugu.stack();
		}
	}
	,exists: function(listener) {
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			if(l == listener) return true;
		}
		return false;
	}
	,destroy: function(pos) {
		this.listeners = null;
		this.exposableListener = null;
	}
	,__class__: RCSignal
}
var EVFullScreen = $hxClasses["EVFullScreen"] = function() {
	RCSignal.call(this);
};
EVFullScreen.__name__ = ["EVFullScreen"];
EVFullScreen.__super__ = RCSignal;
EVFullScreen.prototype = $extend(RCSignal.prototype,{
	__class__: EVFullScreen
});
var EVLoop = $hxClasses["EVLoop"] = function() {
};
EVLoop.__name__ = ["EVLoop"];
EVLoop.prototype = {
	ticker: null
	,run: null
	,setFuncToCall: function(func) {
		this.stop();
		this.run = func;
		this.ticker = new haxe.Timer(Math.round(1 / EVLoop.FPS * 1000));
		this.ticker.run = this.loop.$bind(this);
		return func;
	}
	,loop: function() {
		if(this.run != null) this.run();
	}
	,stop: function() {
		if(this.ticker == null) return;
		this.ticker.stop();
		this.ticker = null;
	}
	,destroy: function() {
		this.stop();
	}
	,__class__: EVLoop
	,__properties__: {set_run:"setFuncToCall"}
}
var EVMouse = $hxClasses["EVMouse"] = function(type,target,pos) {
	if(target == null) throw "Can't use a null target. " + pos;
	RCSignal.call(this);
	this.type = type;
	this.target = target;
	this.delta = 0;
	this.targets = new List();
	if(Std["is"](target,JSView)) this.layer = ((function($this) {
		var $r;
		var $t = target;
		if(Std["is"]($t,JSView)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).layer;
	if(this.layer == null) this.layer = target;
	this.addEventListener(pos);
};
EVMouse.__name__ = ["EVMouse"];
EVMouse.__super__ = RCSignal;
EVMouse.prototype = $extend(RCSignal.prototype,{
	target: null
	,type: null
	,e: null
	,delta: null
	,layer: null
	,targets: null
	,addEventListener: function(pos) {
		var $it0 = this.targets.iterator();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			if(t.target == this.target && t.type == this.type) {
				haxe.Log.trace("Target already in use by this event type. Called from " + pos,{ fileName : "EVMouse.hx", lineNumber : 85, className : "EVMouse", methodName : "addEventListener"});
				return;
			}
		}
		switch(this.type) {
		case "mouseup":
			this.layer.onmouseup = this.mouseHandler.$bind(this);
			break;
		case "mousedown":
			this.layer.onmousedown = this.mouseHandler.$bind(this);
			break;
		case "mouseover":
			this.layer.onmouseover = this.mouseHandler.$bind(this);
			break;
		case "mouseout":
			this.layer.onmouseout = this.mouseHandler.$bind(this);
			break;
		case "mousemove":
			this.layer.onmousemove = this.mouseHandler.$bind(this);
			break;
		case "mouseclick":
			this.layer.onclick = this.mouseHandler.$bind(this);
			break;
		case "mousedoubleclick":
			this.layer.ondblclick = this.mouseHandler.$bind(this);
			break;
		case "mousewheel":
			this.addWheelListener();
			break;
		default:
			haxe.Log.trace("The mouse event you're trying to add does not exist. " + pos,{ fileName : "EVMouse.hx", lineNumber : 100, className : "EVMouse", methodName : "addEventListener"});
		}
	}
	,removeEventListener: function() {
		switch(this.type) {
		case "mouseup":
			this.layer.onmouseup = null;
			break;
		case "mousedown":
			this.layer.onmousedown = null;
			break;
		case "mouseover":
			this.layer.onmouseover = null;
			break;
		case "mouseout":
			this.layer.onmouseout = null;
			break;
		case "mousemove":
			this.layer.onmousemove = null;
			break;
		case "mouseclick":
			this.layer.onclick = null;
			break;
		case "mousedoubleclick":
			this.layer.ondblclick = null;
			break;
		case "mousewheel":
			this.removeWheelListener();
			break;
		}
	}
	,mouseHandler: function(e) {
		if(e == null) e = js.Lib.window.event;
		this.e = e;
		this.dispatch(this,null,null,null,{ fileName : "EVMouse.hx", lineNumber : 142, className : "EVMouse", methodName : "mouseHandler"});
	}
	,updateAfterEvent: function() {
	}
	,addWheelListener: function() {
		this.mouseScrollHandler = this.MouseScroll.$bind(this);
		if(this.layer.addEventListener) {
			this.layer.addEventListener("mousewheel",this.mouseScrollHandler,false);
			this.layer.addEventListener("DOMMouseScroll",this.mouseScrollHandler,false);
		} else if(this.layer.attachEvent) this.layer.attachEvent("onmousewheel",this.mouseScrollHandler);
	}
	,removeWheelListener: function() {
		if(this.layer.removeEventListener) {
			this.layer.removeEventListener("mousewheel",this.mouseScrollHandler,false);
			this.layer.removeEventListener("DOMMouseScroll",this.mouseScrollHandler,false);
		} else if(this.layer.detachEvent) this.layer.detachEvent("onmousewheel",this.mouseScrollHandler);
	}
	,mouseScrollHandler: null
	,MouseScroll: function(e) {
		if(Reflect.field(e,"wheelDelta") != null) this.delta = e.wheelDelta; else if(Reflect.field(e,"detail") != null) this.delta = -Math.round(e.detail * 5);
		this.e = e;
		this.dispatch(this,null,null,null,{ fileName : "EVMouse.hx", lineNumber : 199, className : "EVMouse", methodName : "MouseScroll"});
	}
	,destroy: function(pos) {
		this.removeEventListener();
		RCSignal.prototype.destroy.call(this,{ fileName : "EVMouse.hx", lineNumber : 207, className : "EVMouse", methodName : "destroy"});
	}
	,__class__: EVMouse
});
var EVResize = $hxClasses["EVResize"] = function() {
	RCSignal.call(this);
	js.Lib.window.onresize = this.resizeHandler.$bind(this);
};
EVResize.__name__ = ["EVResize"];
EVResize.__super__ = RCSignal;
EVResize.prototype = $extend(RCSignal.prototype,{
	resizeHandler: function(e) {
		var w = js.Lib.window.innerWidth;
		var h = js.Lib.window.innerHeight;
		this.dispatch(w,h,null,null,{ fileName : "EVResize.hx", lineNumber : 34, className : "EVResize", methodName : "resizeHandler"});
	}
	,__class__: EVResize
});
var Fugu = $hxClasses["Fugu"] = function() { }
Fugu.__name__ = ["Fugu"];
Fugu.safeDestroy = function(obj,destroy,pos) {
	if(destroy == null) destroy = true;
	if(obj == null) return false;
	var objs = Std["is"](obj,Array)?obj:[obj];
	var _g = 0;
	while(_g < objs.length) {
		var o = objs[_g];
		++_g;
		if(o == null) continue;
		if(destroy) try {
			o.destroy();
		} catch( e ) {
			haxe.Log.trace("[Error when destroying object: " + o + ", called from " + Std.string(pos) + "]",{ fileName : "Fugu.hx", lineNumber : 28, className : "Fugu", methodName : "safeDestroy"});
			haxe.Log.trace(Fugu.stack(),{ fileName : "Fugu.hx", lineNumber : 29, className : "Fugu", methodName : "safeDestroy"});
		}
		if(Std["is"](o,JSView)) ((function($this) {
			var $r;
			var $t = o;
			if(Std["is"]($t,JSView)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).removeFromSuperView(); else {
			var parent = null;
			try {
				parent = o.parent;
			} catch( e ) {
				null;
			}
			if(parent != null) {
				if(parent.contains(o)) parent.removeChild(o);
			}
		}
	}
	return true;
}
Fugu.safeRemove = function(obj) {
	return Fugu.safeDestroy(obj,false,{ fileName : "Fugu.hx", lineNumber : 46, className : "Fugu", methodName : "safeRemove"});
}
Fugu.safeAdd = function(target,obj) {
	if(target == null || obj == null) return false;
	var objs = Std["is"](obj,Array)?obj:[obj];
	var _g = 0;
	while(_g < objs.length) {
		var o = objs[_g];
		++_g;
		if(o != null) target.addChild(o);
	}
	return true;
}
Fugu.glow = function(target,color,alpha,blur,strength) {
	if(strength == null) strength = 0.6;
}
Fugu.color = function(target,color) {
}
Fugu.resetColor = function(target) {
}
Fugu.brightness = function(target,brightness) {
}
Fugu.align = function(obj,alignment,constraint_w,constraint_h,obj_w,obj_h,delay_x,delay_y) {
	if(delay_y == null) delay_y = 0;
	if(delay_x == null) delay_x = 0;
	if(obj == null) return;
	var arr = alignment.toLowerCase().split(",");
	if(obj_w == null) obj_w = obj.getWidth();
	if(obj_h == null) obj_h = obj.getHeight();
	obj.setX((function($this) {
		var $r;
		switch(arr[0]) {
		case "l":
			$r = delay_x;
			break;
		case "m":
			$r = Math.round((constraint_w - obj_w) / 2);
			break;
		case "r":
			$r = Math.round(constraint_w - obj_w - delay_x);
			break;
		default:
			$r = Std.parseInt(arr[0]);
		}
		return $r;
	}(this)));
	obj.setY((function($this) {
		var $r;
		switch(arr[1]) {
		case "t":
			$r = delay_y;
			break;
		case "m":
			$r = Math.round((constraint_h - obj_h) / 2);
			break;
		case "b":
			$r = Math.round(constraint_h - obj_h - delay_y);
			break;
		default:
			$r = Std.parseInt(arr[1]);
		}
		return $r;
	}(this)));
}
Fugu.stack = function() {
	var stack = haxe.Stack.exceptionStack();
	haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "Fugu.hx", lineNumber : 161, className : "Fugu", methodName : "stack"});
}
Fugu.prototype = {
	__class__: Fugu
}
var _HTTPRequest = _HTTPRequest || {}
_HTTPRequest.URLVariables = $hxClasses["_HTTPRequest.URLVariables"] = function() {
};
_HTTPRequest.URLVariables.__name__ = ["_HTTPRequest","URLVariables"];
_HTTPRequest.URLVariables.prototype = {
	__class__: _HTTPRequest.URLVariables
}
var RCRequest = $hxClasses["RCRequest"] = function() {
};
RCRequest.__name__ = ["RCRequest"];
RCRequest.prototype = {
	loader: null
	,result: null
	,status: null
	,percentLoaded: null
	,onOpen: function() {
	}
	,onComplete: function() {
	}
	,onError: function() {
	}
	,onProgress: function() {
	}
	,onStatus: function() {
	}
	,load: function(URL,variables,method) {
		if(method == null) method = "POST";
		this.loader = new haxe.Http(URL);
		this.loader.async = true;
		var _g = 0, _g1 = Reflect.fields(variables);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			this.loader.setParameter(key,Reflect.field(variables,key));
		}
		this.addListeners(this.loader);
		this.loader.request(method == "POST"?true:false);
	}
	,addListeners: function(dispatcher) {
		dispatcher.onData = this.completeHandler.$bind(this);
		dispatcher.onError = this.securityErrorHandler.$bind(this);
		dispatcher.onStatus = this.httpStatusHandler.$bind(this);
	}
	,removeListeners: function(dispatcher) {
		dispatcher.onData = null;
		dispatcher.onError = null;
		dispatcher.onStatus = null;
	}
	,openHandler: function(e) {
		this.onOpen();
	}
	,completeHandler: function(e) {
		this.result = e;
		if(this.result.indexOf("error::") != -1) {
			this.result = this.result.split("error::").pop();
			this.onError();
		} else this.onComplete();
	}
	,progressHandler: function(e) {
	}
	,securityErrorHandler: function(e) {
		this.result = e;
		this.onError();
	}
	,httpStatusHandler: function(e) {
		this.status = e;
		this.onStatus();
	}
	,ioErrorHandler: function(e) {
		this.result = e;
		this.onError();
	}
	,destroy: function() {
		this.removeListeners(this.loader);
		this.loader = null;
	}
	,__class__: RCRequest
}
var HTTPRequest = $hxClasses["HTTPRequest"] = function(scripts_path) {
	this.scripts_path = scripts_path;
	RCRequest.call(this);
};
HTTPRequest.__name__ = ["HTTPRequest"];
HTTPRequest.__super__ = RCRequest;
HTTPRequest.prototype = $extend(RCRequest.prototype,{
	scripts_path: null
	,readFile: function(file) {
		this.load(file);
	}
	,readDirectory: function(directoryName) {
		var variables = new _HTTPRequest.URLVariables();
		variables.path = directoryName;
		this.load(this.scripts_path + "filesystem/readDirectory.php",variables);
	}
	,call: function(script,variables_list,method) {
		if(method == null) method = "POST";
		var variables = new _HTTPRequest.URLVariables();
		if(variables_list != null) {
			var _g = 0, _g1 = Reflect.fields(variables_list);
			while(_g < _g1.length) {
				var f = _g1[_g];
				++_g;
				variables[f] = Reflect.field(variables_list,f);
			}
		}
		this.load(this.scripts_path + script,variables,method);
	}
	,__class__: HTTPRequest
});
var JSExternalInterface = $hxClasses["JSExternalInterface"] = function() { }
JSExternalInterface.__name__ = ["JSExternalInterface"];
JSExternalInterface.addCallback = function(functionName,closure) {
	switch(functionName) {
	case "setSWFAddressValue":
		SWFAddress.addEventListener("change",function(e) {
			closure(e.value);
		});
		break;
	}
}
JSExternalInterface.call = function(functionName,p1,p2,p3,p4,p5) {
	switch(functionName) {
	case "SWFAddress.back":
		SWFAddress.back();
		break;
	case "SWFAddress.forward":
		SWFAddress.forward();
		break;
	case "SWFAddress.go":
		SWFAddress.go(p1);
		break;
	case "SWFAddress.href":
		SWFAddress.href(p1,p2);
		break;
	case "SWFAddress.popup":
		SWFAddress.popup(p1,p2,p3,p4);
		break;
	case "SWFAddress.getBaseURL":
		return SWFAddress.getBaseURL();
	case "SWFAddress.getStrict":
		return SWFAddress.getStrict();
	case "SWFAddress.setStrict":
		SWFAddress.setStrict(p1);
		break;
	case "SWFAddress.getHistory":
		return SWFAddress.getHistory();
	case "SWFAddress.setHistory":
		SWFAddress.setHistory(p1);
		break;
	case "SWFAddress.getTracker":
		return SWFAddress.getTracker();
	case "SWFAddress.setTracker":
		SWFAddress.setTracker(p1);
		break;
	case "SWFAddress.getTitle":
		return SWFAddress.getTitle();
	case "SWFAddress.setTitle":
		SWFAddress.setTitle(p1);
		break;
	case "SWFAddress.getStatus":
		return SWFAddress.getStatus();
	case "SWFAddress.setStatus":
		SWFAddress.setStatus(p1);
		break;
	case "SWFAddress.resetStatus":
		SWFAddress.resetStatus();
		break;
	case "SWFAddress.getValue":
		return SWFAddress.getValue();
	case "SWFAddress.setValue":
		SWFAddress.setValue(p1);
		break;
	case "SWFAddress.getIds":
		return SWFAddress.getIds();
	case "function() { return (typeof SWFAddress != \"undefined\"); }":
		return function() { return (typeof SWFAddress != "undefined"); }();
	default:
		throw "You are trying to call an inexisting extern method";
	}
	return null;
}
JSExternalInterface.prototype = {
	__class__: JSExternalInterface
}
var HXAddressSignal = $hxClasses["HXAddressSignal"] = function() {
	this.removeAll();
};
HXAddressSignal.__name__ = ["HXAddressSignal"];
HXAddressSignal.prototype = {
	listeners: null
	,add: function(listener) {
		this.listeners.add(listener);
	}
	,remove: function(listener) {
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var l = $it0.next();
			if(Reflect.compareMethods(l,listener)) {
				this.listeners.remove(listener);
				return;
			}
		}
	}
	,removeAll: function() {
		this.listeners = new List();
	}
	,dispatch: function(args) {
		var $it0 = this.listeners.iterator();
		while( $it0.hasNext() ) {
			var listener = $it0.next();
			try {
				listener.apply(null,[args.copy()]);
			} catch( e ) {
				haxe.Log.trace("[HXAddressEvent error calling: " + listener + "]",{ fileName : "HXAddress.hx", lineNumber : 524, className : "HXAddressSignal", methodName : "dispatch"});
			}
		}
	}
	,__class__: HXAddressSignal
}
var haxe = haxe || {}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
var HXAddress = $hxClasses["HXAddress"] = function() {
	throw "HXAddress should not be instantiated.";
};
HXAddress.__name__ = ["HXAddress"];
HXAddress._queueTimer = null;
HXAddress._initTimer = null;
HXAddress.init = null;
HXAddress.change = null;
HXAddress.externalChange = null;
HXAddress.internalChange = null;
HXAddress._initialize = function() {
	if(HXAddress._availability) try {
		HXAddress._availability = JSExternalInterface.call("function() { return (typeof SWFAddress != \"undefined\"); }");
		JSExternalInterface.addCallback("getSWFAddressValue",function() {
			return HXAddress._value;
		});
		JSExternalInterface.addCallback("setSWFAddressValue",HXAddress._setValue);
	} catch( e ) {
		HXAddress._availability = false;
	}
	HXAddress.init = new HXAddressSignal();
	HXAddress.change = new HXAddressSignal();
	HXAddress.externalChange = new HXAddressSignal();
	HXAddress.internalChange = new HXAddressSignal();
	HXAddress._initTimer = new haxe.Timer(10);
	HXAddress._initTimer.run = HXAddress._check;
	return true;
}
HXAddress._check = function() {
	if(HXAddress.init.listeners.length > 0 && !HXAddress._init) {
		HXAddress._setValueInit(HXAddress._getValue());
		HXAddress._init = true;
	}
	if(HXAddress.change.listeners.length > 0) {
		if(HXAddress._initTimer != null) HXAddress._initTimer.stop();
		HXAddress._initTimer = null;
		HXAddress._init = true;
		HXAddress._setValueInit(HXAddress._getValue());
	}
}
HXAddress._strictCheck = function(value,force) {
	if(HXAddress.getStrict()) {
		if(force) {
			if(value.substr(0,1) != "/") value = "/" + value;
		} else if(value == "") value = "/";
	}
	return value;
}
HXAddress._getValue = function() {
	var value = null, ids = null;
	if(HXAddress._availability) {
		value = Std.string(JSExternalInterface.call("SWFAddress.getValue"));
		var arr = JSExternalInterface.call("SWFAddress.getIds");
		if(arr != null) ids = arr.toString();
	}
	if(HXAddress.isNull(ids) || !HXAddress._availability || HXAddress._initChanged) value = HXAddress._value; else if(HXAddress.isNull(value)) value = "";
	return HXAddress._strictCheck(value,false);
}
HXAddress._setValueInit = function(value) {
	HXAddress._value = value;
	var pathNames = HXAddress.getPathNames();
	if(!HXAddress._init) HXAddress.init.dispatch(pathNames); else {
		HXAddress.change.dispatch(pathNames);
		HXAddress.externalChange.dispatch(pathNames);
	}
	HXAddress._initChange = true;
}
HXAddress._setValue = function(value) {
	if(HXAddress.isNull(value)) value = "";
	if(HXAddress._value == value && HXAddress._init) return;
	if(!HXAddress._initChange) return;
	HXAddress._value = value;
	var pathNames = HXAddress.getPathNames();
	if(!HXAddress._init) {
		HXAddress._init = true;
		HXAddress.init.dispatch(pathNames);
	}
	HXAddress.change.dispatch(pathNames);
	HXAddress.externalChange.dispatch(pathNames);
}
HXAddress._callQueue = function() {
	haxe.Log.trace("If you see this trace means something went wrong, _callQueue is used in flash on Mac only",{ fileName : "HXAddress.hx", lineNumber : 142, className : "HXAddress", methodName : "_callQueue"});
	if(HXAddress._queue.length != 0) {
		var script = "";
		var _g = 0, _g1 = HXAddress._queue;
		while(_g < _g1.length) {
			var q = _g1[_g];
			++_g;
			if(Std["is"](q.param,String)) q.param = "\"" + q.param + "\"";
			script += q.fn + "(" + q.param + ");";
		}
		HXAddress._queue = [];
	} else if(HXAddress._queueTimer != null) {
		HXAddress._queueTimer.stop();
		HXAddress._queueTimer = null;
	}
}
HXAddress._call = function(fn,param) {
	if(param == null) param = "";
	if(HXAddress._availability) {
		JSExternalInterface.call(fn,param);
		return;
		if(HXAddress.isMac()) {
			if(HXAddress._queue.length == 0) {
				if(HXAddress._queueTimer != null) HXAddress._queueTimer.stop();
				HXAddress._queueTimer = new haxe.Timer(10);
				HXAddress._queueTimer.run = HXAddress._callQueue;
			}
			var q = { fn : fn, param : param};
			HXAddress._queue.push(q);
		} else JSExternalInterface.call(fn,param);
	}
}
HXAddress.back = function() {
	HXAddress._call("SWFAddress.back");
}
HXAddress.forward = function() {
	HXAddress._call("SWFAddress.forward");
}
HXAddress.up = function() {
	var path = HXAddress.getPath();
	HXAddress.setValue(path.substr(0,path.lastIndexOf("/",path.length - 2) + (path.substr(path.length - 1) == "/"?1:0)));
}
HXAddress.go = function(delta) {
	HXAddress._call("SWFAddress.go",delta);
}
HXAddress.href = function(url,target) {
	if(target == null) target = "_self";
	if(HXAddress._availability && (HXAddress.isActiveX() || HXAddress.isJS())) {
		JSExternalInterface.call("SWFAddress.href",url,target);
		return;
	}
}
HXAddress.popup = function(url,name,options,handler) {
	if(handler == null) handler = "";
	if(options == null) options = "\"\"";
	if(name == null) name = "popup";
	if(HXAddress._availability && (HXAddress.isActiveX() || HXAddress.isJS() || JSExternalInterface.call("asual.util.Browser.isSafari"))) {
		haxe.Log.trace("good to go",{ fileName : "HXAddress.hx", lineNumber : 243, className : "HXAddress", methodName : "popup"});
		JSExternalInterface.call("SWFAddress.popup",url,name,options,handler);
		return;
	}
}
HXAddress.getBaseURL = function() {
	var url = null;
	if(HXAddress._availability) url = Std.string(JSExternalInterface.call("SWFAddress.getBaseURL"));
	return HXAddress.isNull(url) || !HXAddress._availability?"":url;
}
HXAddress.getStrict = function() {
	var strict = null;
	if(HXAddress._availability) strict = Std.string(JSExternalInterface.call("SWFAddress.getStrict"));
	return HXAddress.isNull(strict)?HXAddress._strict:strict == "true";
}
HXAddress.setStrict = function(strict) {
	HXAddress._call("SWFAddress.setStrict",strict);
	HXAddress._strict = strict;
}
HXAddress.getHistory = function() {
	if(HXAddress._availability) {
		var hasHistory = JSExternalInterface.call("SWFAddress.getHistory");
		return hasHistory == "true" || hasHistory == true;
	}
	return false;
}
HXAddress.setHistory = function(history) {
	HXAddress._call("SWFAddress.setHistory",history);
}
HXAddress.getTracker = function() {
	return HXAddress._availability?Std.string(JSExternalInterface.call("SWFAddress.getTracker")):"";
}
HXAddress.setTracker = function(tracker) {
	HXAddress._call("SWFAddress.setTracker",tracker);
}
HXAddress.getTitle = function() {
	var title = HXAddress._availability?Std.string(JSExternalInterface.call("SWFAddress.getTitle")):"";
	if(HXAddress.isNull(title)) title = "";
	return StringTools.htmlUnescape(title);
}
HXAddress.setTitle = function(title) {
	HXAddress._call("SWFAddress.setTitle",StringTools.htmlEscape(StringTools.htmlUnescape(title)));
}
HXAddress.getStatus = function() {
	var status = HXAddress._availability?Std.string(JSExternalInterface.call("SWFAddress.getStatus")):"";
	if(HXAddress.isNull(status)) status = "";
	return StringTools.htmlUnescape(status);
}
HXAddress.setStatus = function(status) {
	HXAddress._call("SWFAddress.setStatus",StringTools.htmlEscape(StringTools.htmlUnescape(status)));
}
HXAddress.resetStatus = function() {
	HXAddress._call("SWFAddress.resetStatus");
}
HXAddress.getValue = function() {
	return StringTools.htmlUnescape(HXAddress._strictCheck(HXAddress._value,false));
}
HXAddress.setValue = function(value) {
	if(HXAddress.isNull(value)) value = "";
	value = StringTools.htmlEscape(StringTools.htmlUnescape(HXAddress._strictCheck(value,true)));
	if(HXAddress._value == value) return;
	HXAddress._value = value;
	HXAddress._call("SWFAddress.setValue",value);
	if(HXAddress._init) {
		var pathNames = HXAddress.getPathNames();
		HXAddress.change.dispatch(pathNames);
		HXAddress.internalChange.dispatch(pathNames);
	} else HXAddress._initChanged = true;
}
HXAddress.getPath = function() {
	var value = HXAddress.getValue();
	if(value.indexOf("?") != -1) return value.split("?")[0]; else if(value.indexOf("#") != -1) return value.split("#")[0]; else return value;
}
HXAddress.getPathNames = function() {
	var path = HXAddress.getPath();
	var names = path.split("/");
	if(path.substr(0,1) == "/" || path.length == 0) names.splice(0,1);
	if(path.substr(path.length - 1,1) == "/") names.splice(names.length - 1,1);
	return names;
}
HXAddress.getQueryString = function() {
	var value = HXAddress.getValue();
	var index = value.indexOf("?");
	if(index != -1 && index < value.length) return value.substr(index + 1);
	return null;
}
HXAddress.getParameter = function(param) {
	var value = HXAddress.getValue();
	var index = value.indexOf("?");
	if(index != -1) {
		value = value.substr(index + 1);
		var params = value.split("&");
		var i = params.length;
		while(i-- >= 0) {
			var p = params[i].split("=");
			if(p[0] == param) return p[1];
		}
	}
	return null;
}
HXAddress.getParameterNames = function() {
	var value = HXAddress.getValue();
	var index = value.indexOf("?");
	var names = new Array();
	if(index != -1) {
		value = value.substr(index + 1);
		if(value != "" && value.indexOf("=") != -1) {
			var params = value.split("&");
			var i = 0;
			while(i < params.length) {
				names.push(params[i].split("=")[0]);
				i++;
			}
		}
	}
	return names;
}
HXAddress.isNull = function(value) {
	return value == "undefined" || value == "null" || value == null;
}
HXAddress.isMac = function() {
	return true;
}
HXAddress.isActiveX = function() {
	return true;
}
HXAddress.isJS = function() {
	return true;
}
HXAddress.prototype = {
	__class__: HXAddress
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
var HashArray = $hxClasses["HashArray"] = function() {
	Hash.call(this);
	this.array = new Array();
};
HashArray.__name__ = ["HashArray"];
HashArray.__super__ = Hash;
HashArray.prototype = $extend(Hash.prototype,{
	array: null
	,set: function(key,value) {
		if(!Hash.prototype.exists.call(this,key)) this.array.push(key);
		Hash.prototype.set.call(this,key,value);
	}
	,remove: function(key) {
		this.array.remove(key);
		return Hash.prototype.remove.call(this,key);
	}
	,insert: function(pos,key,value) {
		if(Hash.prototype.exists.call(this,key)) return;
		this.array.insert(pos,key);
		Hash.prototype.set.call(this,key,value);
	}
	,indexForKey: function(key) {
		var _g1 = 0, _g = this.array.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.array[i] == key) return i;
		}
		return -1;
	}
	,__class__: HashArray
});
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
var JSCanvas = $hxClasses["JSCanvas"] = function() { }
JSCanvas.__name__ = ["JSCanvas"];
JSCanvas.prototype = {
	__class__: JSCanvas
}
var RCDisplayObject = $hxClasses["RCDisplayObject"] = function() {
	this.viewWillAppear = new RCSignal();
	this.viewWillDisappear = new RCSignal();
	this.viewDidAppear = new RCSignal();
	this.viewDidDisappear = new RCSignal();
};
RCDisplayObject.__name__ = ["RCDisplayObject"];
RCDisplayObject.prototype = {
	viewWillAppear: null
	,viewWillDisappear: null
	,viewDidAppear: null
	,viewDidDisappear: null
	,bounds: null
	,size: null
	,contentSize: null
	,center: null
	,clipsToBounds: null
	,backgroundColor: null
	,x: null
	,y: null
	,width: null
	,height: null
	,scaleX: null
	,scaleY: null
	,alpha: null
	,rotation: null
	,visible: null
	,mouseX: null
	,mouseY: null
	,parent: null
	,x_: null
	,y_: null
	,scaleX_: null
	,scaleY_: null
	,contentSize_: null
	,originalSize: null
	,caobj: null
	,init: function() {
	}
	,setVisible: function(v) {
		return this.visible = v;
	}
	,getAlpha: function() {
		return this.alpha;
	}
	,setAlpha: function(a) {
		return this.alpha = a;
	}
	,getX: function() {
		return this.x_;
	}
	,setX: function(x) {
		return this.x_ = x;
	}
	,getY: function() {
		return this.y_;
	}
	,setY: function(y) {
		return this.y_ = y;
	}
	,getWidth: function() {
		return this.size.width;
	}
	,setWidth: function(w) {
		return this.size.width = w;
	}
	,getHeight: function() {
		return this.size.height;
	}
	,setHeight: function(h) {
		return this.size.height = h;
	}
	,getContentSize: function() {
		return this.size;
	}
	,setContentSize: function(s) {
		return this.contentSize = s;
	}
	,setRotation: function(r) {
		return this.rotation = r;
	}
	,getRotation: function() {
		return this.rotation;
	}
	,getBounds: function() {
		return new RCRect(this.x_,this.y_,this.size.width,this.size.height);
	}
	,setBounds: function(b) {
		this.setX(b.origin.x);
		this.setY(b.origin.y);
		this.setWidth(b.size.width);
		this.setHeight(b.size.height);
		return b;
	}
	,getScaleX: function() {
		return this.scaleX_;
	}
	,setScaleX: function(sx) {
		this.scaleX_ = sx;
		this.scale(this.scaleX_,this.scaleY_);
		return this.scaleX_;
	}
	,getScaleY: function() {
		return this.scaleY_;
	}
	,setScaleY: function(sy) {
		this.scaleY_ = sy;
		this.scale(this.scaleX_,this.scaleY_);
		return this.scaleY_;
	}
	,setClipsToBounds: function(clip) {
		return clip;
	}
	,setBackgroundColor: function(color) {
		return color;
	}
	,setCenter: function(pos) {
		this.center = pos;
		this.setX(pos.x - this.size.width / 2 | 0);
		this.setY(pos.y - this.size.height / 2 | 0);
		return this.center;
	}
	,scaleToFit: function(w,h) {
		if(this.size.width / w > this.size.height / h && this.size.width > w) {
			this.setWidth(w);
			this.setHeight(w * this.originalSize.height / this.originalSize.width);
		} else if(this.size.height > h) {
			this.setHeight(h);
			this.setWidth(h * this.originalSize.width / this.originalSize.height);
		} else if(this.size.width > this.originalSize.width && this.size.height > this.originalSize.height) {
			this.setWidth(this.size.width);
			this.setHeight(this.size.height);
		} else this.resetScale();
	}
	,scaleToFill: function(w,h) {
		if(w / this.originalSize.width > h / this.originalSize.height) {
			this.setWidth(w);
			this.setHeight(w * this.originalSize.height / this.originalSize.width);
		} else {
			this.setHeight(h);
			this.setWidth(h * this.originalSize.width / this.originalSize.height);
		}
	}
	,scale: function(sx,sy) {
	}
	,resetScale: function() {
		this.setWidth(this.originalSize.width);
		this.setHeight(this.originalSize.height);
	}
	,getMouseX: function() {
		return 0;
	}
	,getMouseY: function() {
		return 0;
	}
	,addChild: function(child) {
	}
	,addChildAt: function(child,index) {
	}
	,removeChild: function(child) {
	}
	,addAnimation: function(obj) {
		CoreAnimation.add(this.caobj = obj);
	}
	,destroy: function() {
		CoreAnimation.remove(this.caobj);
		this.size = null;
	}
	,toString: function() {
		return "[RCView bounds:" + this.getBounds().origin.x + "x" + this.getBounds().origin.x + "," + this.getBounds().size.width + "x" + this.getBounds().size.height + "]";
	}
	,__class__: RCDisplayObject
	,__properties__: {get_mouseY:"getMouseY",get_mouseX:"getMouseX",set_visible:"setVisible",set_rotation:"setRotation",get_rotation:"getRotation",set_alpha:"setAlpha",get_alpha:"getAlpha",set_scaleY:"setScaleY",get_scaleY:"getScaleY",set_scaleX:"setScaleX",get_scaleX:"getScaleX",set_height:"setHeight",get_height:"getHeight",set_width:"setWidth",get_width:"getWidth",set_y:"setY",get_y:"getY",set_x:"setX",get_x:"getX",set_backgroundColor:"setBackgroundColor",set_clipsToBounds:"setClipsToBounds",set_center:"setCenter",set_contentSize:"setContentSize",get_contentSize:"getContentSize",set_bounds:"setBounds",get_bounds:"getBounds"}
}
var JSView = $hxClasses["JSView"] = function(x,y,w,h) {
	RCDisplayObject.call(this);
	this.size = new RCSize(w,h);
	this.contentSize_ = this.size.copy();
	this.scaleX_ = 1;
	this.scaleY_ = 1;
	this.alpha_ = 1;
	this.layer = js.Lib.document.createElement("div");
	this.layer.style.position = "absolute";
	this.layer.style.margin = "0px 0px 0px 0px";
	this.layer.style.width = "auto";
	this.layer.style.height = "auto";
	this.setX(x);
	this.setY(y);
};
JSView.__name__ = ["JSView"];
JSView.__super__ = RCDisplayObject;
JSView.prototype = $extend(RCDisplayObject.prototype,{
	layer: null
	,layerScrollable: null
	,graphics: null
	,alpha_: null
	,addChild: function(child) {
		if(child == null) return;
		child.viewWillAppear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 57, className : "JSView", methodName : "addChild"});
		child.parent = this;
		this.layer.appendChild(child.layer);
		child.viewDidAppear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 60, className : "JSView", methodName : "addChild"});
	}
	,addChildAt: function(child,index) {
		if(this.layer.childNodes[index] != null) this.layer.insertBefore(child.layer,this.layer.childNodes[index]); else this.layer.appendChild(child.layer);
	}
	,removeChild: function(child) {
		if(child == null) return;
		child.viewWillDisappear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 74, className : "JSView", methodName : "removeChild"});
		child.parent = null;
		this.layer.removeChild(child.layer);
		child.viewDidDisappear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 77, className : "JSView", methodName : "removeChild"});
	}
	,removeFromSuperView: function() {
		if(this.parent != null) this.parent.removeChild(this);
	}
	,setBackgroundColor: function(color) {
		if(color == null) {
			this.layer.style.background = null;
			return color;
		}
		var red = (color & 16711680) >> 16;
		var green = (color & 65280) >> 8;
		var blue = color & 255;
		this.layer.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
		return color;
	}
	,setClipsToBounds: function(clip) {
		if(clip) {
			this.layer.style.overflow = "hidden";
			this.layerScrollable = js.Lib.document.createElement("div");
			this.layerScrollable.style.width = this.size.width + "px";
			this.layerScrollable.style.height = this.size.height + "px";
			while(this.layer.hasChildNodes()) this.layerScrollable.appendChild(this.layer.removeChild(this.layer.firstChild));
			this.layer.appendChild(this.layerScrollable);
		} else {
			while(this.layerScrollable.hasChildNodes()) this.layer.appendChild(this.layerScrollable.removeChild(this.layerScrollable.firstChild));
			this.layer.style.overflow = null;
			this.layer.removeChild(this.layerScrollable);
			this.layerScrollable = null;
		}
		return clip;
	}
	,setVisible: function(v) {
		this.layer.style.visibility = v?"visible":"hidden";
		return RCDisplayObject.prototype.setVisible.call(this,v);
	}
	,setAlpha: function(a) {
		if(js.Lib.isIE) {
			this.layer.style.msFilter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Std.string(a * 100) + ")";
			this.layer.style.filter = "alpha(opacity=" + Std.string(a * 100) + ")";
		} else this.layer.style.opacity = Std.string(a);
		return RCDisplayObject.prototype.setAlpha.call(this,a);
	}
	,setX: function(x) {
		this.layer.style.left = Std.string(x * RCDevice.currentDevice().dpiScale) + "px";
		return RCDisplayObject.prototype.setX.call(this,x);
	}
	,setY: function(y) {
		this.layer.style.top = Std.string(y * RCDevice.currentDevice().dpiScale) + "px";
		return RCDisplayObject.prototype.setY.call(this,y);
	}
	,setWidth: function(w) {
		this.layer.style.width = w + "px";
		return RCDisplayObject.prototype.setWidth.call(this,w);
	}
	,setHeight: function(h) {
		this.layer.style.height = h + "px";
		return RCDisplayObject.prototype.setHeight.call(this,h);
	}
	,getContentSize: function() {
		this.contentSize_.width = this.layer.scrollWidth;
		this.contentSize_.height = this.layer.scrollHeight;
		return this.contentSize_;
	}
	,transformProperty: null
	,scale: function(sx,sy) {
		this.layer.style[this.getTransformProperty() + "Origin"] = "top left";
		this.layer.style[this.getTransformProperty()] = "scale(" + sx + "," + sy + ")";
	}
	,getTransformProperty: function() {
		if(this.transformProperty != null) return this.transformProperty;
		var _g = 0, _g1 = ["transform","WebkitTransform","msTransform","MozTransform","OTransform"];
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			if(this.layer.style[p] != null) {
				this.transformProperty = p;
				return p;
			}
		}
		return "transform";
	}
	,setRotation: function(r) {
		this.layer.style[this.getTransformProperty()] = "rotate(" + r + "deg)";
		return RCDisplayObject.prototype.setRotation.call(this,r);
	}
	,startDrag: function(lockCenter,rect) {
	}
	,stopDrag: function() {
	}
	,getMouseX: function() {
		return this.layer.clientX;
		if(this.parent == null) return this.mouseX;
		return this.parent.getMouseX() - this.getX();
	}
	,getMouseY: function() {
		if(this.parent == null) return this.mouseY;
		return this.parent.getMouseY() - this.getY();
	}
	,__class__: JSView
});
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var Main = $hxClasses["Main"] = function() { }
Main.__name__ = ["Main"];
Main.lin = null;
Main.ph = null;
Main.circ = null;
Main.req = null;
Main.win = null;
Main.main = function() {
	haxe.Firebug.redirectTraces();
	var mousew = new EVMouse("mousewheel",RCWindow.sharedWindow().target,{ fileName : "Main.hx", lineNumber : 24, className : "Main", methodName : "main"});
	try {
		RCWindow.sharedWindow();
		var group = new RCGroup(200,230,0,null,Main.createRadioButton);
		RCWindow.sharedWindow().addChild(group);
		group.add([1,2,3,4,5,5]);
		var f = new RCFont();
		f.color = 16777215;
		f.font = "Arial";
		f.size = 30;
		f.embedFonts = false;
		var t = new RCTextView(50,30,null,null,"HTML5",f);
		RCWindow.sharedWindow().addChild(t);
		haxe.Log.trace("t.width " + t.getWidth(),{ fileName : "Main.hx", lineNumber : 43, className : "Main", methodName : "main"});
		return;
		Main.win = RCWindow.sharedWindow();
		Main.win.setBackgroundColor(15724527);
		RCFontManager.init();
		RCAssets.loadFileWithKey("photo","../assets/900x600.jpg");
		RCAssets.loadFileWithKey("some_text","../assets/data.txt");
		RCAssets.loadFileWithKey("Urban","../assets/FFF Urban.ttf");
		RCAssets.loadFontWithKey("Futu","../assets/FUTUNEBI.TTF");
		RCAssets.onComplete = Main.testJsFont;
		var rect = new RCRectangle(0,0,300,150,RCColor.redColor());
		RCWindow.sharedWindow().addChild(rect);
		rect.setClipsToBounds(true);
		rect.setCenter(new RCPoint(RCWindow.sharedWindow().getWidth() / 2,RCWindow.sharedWindow().getHeight() / 2));
		Main.ph = new RCImage(1,1,"../assets/900x600.jpg");
		Main.ph.onComplete = Main.resizePhoto;
		rect.addChild(Main.ph);
		Main.circ = new RCEllipse(0,0,100,100,RCColor.darkGrayColor());
		RCWindow.sharedWindow().addChild(Main.circ);
		var size = RCWindow.sharedWindow().size;
		haxe.Log.trace(size,{ fileName : "Main.hx", lineNumber : 99, className : "Main", methodName : "main"});
		var a1 = new CATween(Main.circ,{ x : size.width - 100, y : 0},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 100, className : "Main", methodName : "main"});
		var a2 = new CATween(Main.circ,{ x : size.width - 100, y : size.height - 100},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 101, className : "Main", methodName : "main"});
		var a3 = new CATween(Main.circ,{ x : 0, y : size.height - 100},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 102, className : "Main", methodName : "main"});
		var a4 = new CATween(Main.circ,{ x : 0, y : 0},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 103, className : "Main", methodName : "main"});
		var seq = new CASequence([a1,a2,a3,a4]);
		seq.start();
		Main.lin = new RCLine(30,300,400,600,16724736);
		RCWindow.sharedWindow().addChild(Main.lin);
		var k = new RCKeys();
		k.onLeft = Main.moveLeft;
		k.onRight = Main.moveRight;
		var m = new EVMouse("mouseover",rect.layer,{ fileName : "Main.hx", lineNumber : 118, className : "Main", methodName : "main"});
		m.add(function(_) {
			haxe.Log.trace("onOver",{ fileName : "Main.hx", lineNumber : 119, className : "Main", methodName : "main"});
		});
		Main.testTexts();
		Main.testSignals();
		Main.testButtons();
		var s = new haxe.SKSlider();
		var sl = new RCSlider(50,250,160,10,s);
		RCWindow.sharedWindow().addChild(sl);
		sl.setMaxValue(500);
		sl.setValue(30);
		Main.req = new HTTPRequest();
		Main.req.onComplete = function() {
			haxe.Log.trace("http result " + Main.req.result,{ fileName : "Main.hx", lineNumber : 148, className : "Main", methodName : "main"});
		};
		Main.req.onError = function() {
			haxe.Log.trace("http error " + Main.req.result,{ fileName : "Main.hx", lineNumber : 149, className : "Main", methodName : "main"});
		};
		Main.req.onStatus = function() {
			haxe.Log.trace("http status " + Main.req.status,{ fileName : "Main.hx", lineNumber : 150, className : "Main", methodName : "main"});
		};
		Main.req.readFile("../assets/data.txt");
		var anim = new CATCallFunc(Main.setAlpha_,{ alpha : { fromValue : 0, toValue : 1}},2.8,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 154, className : "Main", methodName : "main"});
		CoreAnimation.add(anim);
	} catch( e ) {
		Fugu.stack();
		haxe.Log.trace(e,{ fileName : "Main.hx", lineNumber : 158, className : "Main", methodName : "main"});
	}
}
Main.setAlpha_ = function(a) {
	Main.lin.setAlpha(a);
}
Main.testJsFont = function() {
	var f = new RCFont();
	f.color = 0;
	f.font = "Futu";
	f.size = 34;
	f.embedFonts = false;
	var t = new RCTextView(50,120,null,null,"blah blah blah",f);
	RCWindow.sharedWindow().addChild(t);
	haxe.Log.trace("t.width " + t.getWidth(),{ fileName : "Main.hx", lineNumber : 170, className : "Main", methodName : "testJsFont"});
}
Main.resizePhoto = function() {
	haxe.Log.trace("startResizing",{ fileName : "Main.hx", lineNumber : 183, className : "Main", methodName : "resizePhoto"});
	haxe.Log.trace(Main.ph.getContentSize(),{ fileName : "Main.hx", lineNumber : 198, className : "Main", methodName : "resizePhoto"});
	var scrollview = new RCScrollView(780,10,300,300);
	RCWindow.sharedWindow().addChild(scrollview);
	scrollview.setContentView(Main.ph);
	return;
	var anim = new CATween(Main.ph,{ x : { fromValue : -Main.ph.getWidth(), toValue : Main.ph.getWidth()}},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 206, className : "Main", methodName : "resizePhoto"});
	anim.repeatCount = 5;
	anim.autoreverses = true;
	CoreAnimation.add(anim);
}
Main.moveLeft = function() {
	var _g = Main.circ;
	_g.setX(_g.getX() - 10);
}
Main.moveRight = function() {
	var _g = Main.circ;
	_g.setX(_g.getX() + 10);
}
Main.signal = null;
Main.testSignals = function() {
	Main.signal = new RCSignal();
	Main.signal.add(Main.printNr);
	Main.signal.addOnce(Main.printNr2,{ fileName : "Main.hx", lineNumber : 225, className : "Main", methodName : "testSignals"});
	Main.signal.remove(Main.printNr);
	Main.signal.removeAll();
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		Main.signal.dispatch(Math.random(),null,null,null,{ fileName : "Main.hx", lineNumber : 229, className : "Main", methodName : "testSignals"});
	}
}
Main.printNr = function(nr) {
}
Main.printNr2 = function(nr) {
}
Main.testButtons = function() {
	try {
		var s = new haxe.SKButton("Switch");
		var b = new RCButton(50,200,s);
		RCWindow.sharedWindow().addChild(b);
		b.onRelease = function() {
			HXAddress.href("flash.html");
		};
		b.onOver = function() {
			haxe.Log.trace("over",{ fileName : "Main.hx", lineNumber : 249, className : "Main", methodName : "testButtons"});
		};
		b.onOut = function() {
			haxe.Log.trace("out",{ fileName : "Main.hx", lineNumber : 250, className : "Main", methodName : "testButtons"});
		};
		b.onPress = function() {
			haxe.Log.trace("press",{ fileName : "Main.hx", lineNumber : 251, className : "Main", methodName : "testButtons"});
		};
		var s1 = new haxe.SKButtonRadio();
		var b1 = new RCButtonRadio(200,200,s1);
		RCWindow.sharedWindow().addChild(b1);
		var group = new RCGroup(200,230,0,null,Main.createRadioButton);
		RCWindow.sharedWindow().addChild(group);
		group.add([1,2,3,4,5,5]);
	} catch( e ) {
		Fugu.stack();
	}
}
Main.createRadioButton = function(indexPath) {
	var s = new haxe.SKButtonRadio();
	var s1 = new SkinButtonWithText("blah blah",null);
	var b = new RCButtonRadio(0,0,s1);
	return b;
}
Main.segClick = function(s) {
	haxe.Log.trace(s.getSelectedIndex(),{ fileName : "Main.hx", lineNumber : 276, className : "Main", methodName : "segClick"});
}
Main.testTexts = function() {
	try {
		var f = new RCFont();
		f.color = 16777215;
		f.font = "Arial";
		f.size = 30;
		f.embedFonts = false;
		var t = new RCTextView(50,30,null,null,"HTML5",f);
		RCWindow.sharedWindow().addChild(t);
		haxe.Log.trace("t.width " + t.getWidth(),{ fileName : "Main.hx", lineNumber : 288, className : "Main", methodName : "testTexts"});
		var f2 = f.copy();
		f2.color = 16777215;
		f2.size = 16;
		var r = new RCTextRoll(50,60,200,null,"We are working on the HTML5 version of the gallery...",f2);
		RCWindow.sharedWindow().addChild(r);
		r.start();
		r.setBackgroundColor(16724736);
	} catch( e ) {
		Fugu.stack();
	}
}
Main.prototype = {
	x__: function() {
	}
	,__class__: Main
}
var RCAssets = $hxClasses["RCAssets"] = function() {
	this.photoList = new Hash();
	this.swfList = new Hash();
	this.dataList = new Hash();
	this.nr = 0;
	this.max = 0;
};
RCAssets.__name__ = ["RCAssets"];
RCAssets.INSTANCE = null;
RCAssets.errorMessage = null;
RCAssets.currentPercentLoaded = null;
RCAssets.percentLoaded = null;
RCAssets.useCache = null;
RCAssets.onComplete = function() {
}
RCAssets.onProgress = function() {
}
RCAssets.onError = function() {
}
RCAssets.init = function() {
	if(RCAssets.INSTANCE != null) return;
	RCAssets.INSTANCE = new RCAssets();
	RCAssets.currentPercentLoaded = new Hash();
	RCAssets.useCache = false;
}
RCAssets.sharedAssets = function() {
	RCAssets.init();
	return RCAssets.INSTANCE;
}
RCAssets.loadFileWithKey = function(key,URL) {
	return RCAssets.sharedAssets().set(key,URL);
}
RCAssets.loadFontWithKey = function(key,URL) {
	return RCAssets.sharedAssets().set(key,URL,false);
}
RCAssets.getFileWithKey = function(key,returnAsBitmap) {
	if(returnAsBitmap == null) returnAsBitmap = true;
	return RCAssets.sharedAssets().get(key,returnAsBitmap);
}
RCAssets.prototype = {
	photoList: null
	,swfList: null
	,dataList: null
	,nr: null
	,max: null
	,set: function(key,URL,newDomain) {
		if(newDomain == null) newDomain = true;
		this.max++;
		if(key == null) key = Std.string(Math.random());
		if(URL.toLowerCase().indexOf(".swf") != -1) this.loadSwf(key,URL,newDomain); else if(URL.toLowerCase().indexOf(".xml") != -1 || URL.toLowerCase().indexOf(".txt") != -1 || URL.toLowerCase().indexOf(".css") != -1) this.loadText(key,URL); else if(URL.toLowerCase().indexOf(".ttf") != -1 || URL.toLowerCase().indexOf(".otf") != -1) this.loadFont(key,URL); else {
			if(RCDevice.currentDevice().dpiScale == 2) {
				var u = URL.split(".");
				var ext = u.pop();
				URL = u.join(".") + "@2x." + ext;
			}
			this.loadPhoto(key,URL);
		}
		return true;
	}
	,loadPhoto: function(key,URL) {
		var photo = new RCImage(0,0,URL);
		photo.onProgress = (function(f,a1,a2) {
			return function() {
				return f(a1,a2);
			};
		})(this.progressHandler.$bind(this),key,photo);
		photo.onComplete = (function(f,a1,a2) {
			return function() {
				return f(a1,a2);
			};
		})(this.completeHandler.$bind(this),key,photo);
		photo.onError = (function(f,a1,a2) {
			return function() {
				return f(a1,a2);
			};
		})(this.errorHandler.$bind(this),key,photo);
	}
	,loadSwf: function(key,URL,newDomain) {
		if(newDomain == null) newDomain = true;
		var swf = new RCSwf(0,0,URL,newDomain);
		swf.onProgress = (function(f,a1,a2) {
			return function() {
				return f(a1,a2);
			};
		})(this.progressHandler.$bind(this),key,swf);
		swf.onComplete = (function(f,a1,a2) {
			return function() {
				return f(a1,a2);
			};
		})(this.completeHandler.$bind(this),key,swf);
		swf.onError = (function(f,a1,a2) {
			return function() {
				return f(a1,a2);
			};
		})(this.errorHandler.$bind(this),key,swf);
	}
	,loadText: function(key,URL) {
		var me = this;
		var data = new HTTPRequest();
		if(data.result == null) {
			data.onProgress = (function(f,a1,a2) {
				return function() {
					return f(a1,a2);
				};
			})(this.progressHandler.$bind(this),key,data);
			data.onComplete = (function(f,a1,a2) {
				return function() {
					return f(a1,a2);
				};
			})(this.completeHandler.$bind(this),key,data);
			data.onError = (function(f,a1,a2) {
				return function() {
					return f(a1,a2);
				};
			})(this.errorHandler.$bind(this),key,data);
			data.readFile(URL);
		} else haxe.Timer.delay(function() {
			me.completeHandler(key,data);
		},10);
	}
	,loadFont: function(key,URL) {
		var fontType = "";
		var st = js.Lib.document.createElement("style");
		st.innerHTML = "@font-face{font-family:" + key + "; src: url('" + URL + "')" + fontType + ";}";
		js.Lib.document.getElementsByTagName("head")[0].appendChild(st);
		haxe.Timer.delay(this.onCompleteHandler.$bind(this),16);
	}
	,errorHandler: function(key,media) {
		this.max--;
		RCAssets.onError();
		if(this.nr >= this.max) RCAssets.onComplete();
	}
	,progressHandler: function(key,obj) {
		RCAssets.currentPercentLoaded.set(key,obj.percentLoaded);
		this.totalProgress();
	}
	,completeHandler: function(key,obj) {
		switch(Type.getClassName(Type.getClass(obj))) {
		case "RCImage":
			this.photoList.set(key,obj);
			break;
		case "HTTPRequest":
			this.dataList.set(key,obj.result);
			break;
		case "RCSwf":
			this.swfList.set(key,obj);
			break;
		default:
			haxe.Log.trace("This asset is not added to any list. key=" + key,{ fileName : "RCAssets.hx", lineNumber : 192, className : "RCAssets", methodName : "completeHandler"});
		}
		this.onCompleteHandler();
	}
	,onCompleteHandler: function() {
		this.nr++;
		if(this.nr >= this.max) RCAssets.onComplete();
	}
	,totalProgress: function() {
		var totalPercent = 0;
		var i = 0;
		var $it0 = RCAssets.currentPercentLoaded.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			i++;
			totalPercent += RCAssets.currentPercentLoaded.get(key);
		}
		RCAssets.percentLoaded = Math.round(totalPercent / i);
		RCAssets.onProgress();
	}
	,get: function(key,returnAsBitmap) {
		if(returnAsBitmap == null) returnAsBitmap = true;
		RCAssets.init();
		if(this.photoList.exists(key)) return this.photoList.get(key).copy(); else if(this.dataList.exists(key)) return this.dataList.get(key); else if(this.swfList.exists(key)) return this.swfList.get(key);
		haxe.Log.trace("Asset with key: " + key + "  was not found.",{ fileName : "RCAssets.hx", lineNumber : 258, className : "RCAssets", methodName : "get"});
		return null;
	}
	,__class__: RCAssets
}
var RCControl = $hxClasses["RCControl"] = function(x,y,w,h) {
	JSView.call(this,x,y,w,h);
	this.configureDispatchers();
	this.setEnabled(true);
};
RCControl.__name__ = ["RCControl"];
RCControl.__super__ = JSView;
RCControl.prototype = $extend(JSView.prototype,{
	click: null
	,press: null
	,release: null
	,over: null
	,out: null
	,editingDidBegin: null
	,editingChanged: null
	,editingDidEnd: null
	,editingDidEndOnExit: null
	,enabled: null
	,highlighted: null
	,selected: null
	,enabled_: null
	,state_: null
	,onClick: function() {
	}
	,onPress: function() {
	}
	,onRelease: function() {
	}
	,onOver: function() {
	}
	,onOut: function() {
	}
	,init: function() {
		this.setState(RCControlState.NORMAL);
	}
	,configureDispatchers: function() {
		this.click = new EVMouse("mouseclick",this,{ fileName : "RCControl.hx", lineNumber : 80, className : "RCControl", methodName : "configureDispatchers"});
		this.press = new EVMouse("mousedown",this,{ fileName : "RCControl.hx", lineNumber : 82, className : "RCControl", methodName : "configureDispatchers"});
		this.release = new EVMouse("mouseup",this,{ fileName : "RCControl.hx", lineNumber : 83, className : "RCControl", methodName : "configureDispatchers"});
		this.over = new EVMouse("mouseover",this,{ fileName : "RCControl.hx", lineNumber : 84, className : "RCControl", methodName : "configureDispatchers"});
		this.out = new EVMouse("mouseout",this,{ fileName : "RCControl.hx", lineNumber : 85, className : "RCControl", methodName : "configureDispatchers"});
		this.click.addFirst(this.clickHandler.$bind(this),{ fileName : "RCControl.hx", lineNumber : 87, className : "RCControl", methodName : "configureDispatchers"});
		this.press.addFirst(this.mouseDownHandler.$bind(this),{ fileName : "RCControl.hx", lineNumber : 88, className : "RCControl", methodName : "configureDispatchers"});
		this.release.addFirst(this.mouseUpHandler.$bind(this),{ fileName : "RCControl.hx", lineNumber : 89, className : "RCControl", methodName : "configureDispatchers"});
		this.over.addFirst(this.rollOverHandler.$bind(this),{ fileName : "RCControl.hx", lineNumber : 90, className : "RCControl", methodName : "configureDispatchers"});
		this.out.addFirst(this.rollOutHandler.$bind(this),{ fileName : "RCControl.hx", lineNumber : 91, className : "RCControl", methodName : "configureDispatchers"});
	}
	,mouseDownHandler: function(e) {
		this.setState(RCControlState.SELECTED);
		this.onPress();
	}
	,mouseUpHandler: function(e) {
		this.setState(RCControlState.HIGHLIGHTED);
		this.onRelease();
	}
	,rollOverHandler: function(e) {
		this.setState(RCControlState.HIGHLIGHTED);
		this.onOver();
	}
	,rollOutHandler: function(e) {
		this.setState(RCControlState.NORMAL);
		this.onOut();
	}
	,clickHandler: function(e) {
		this.setState(RCControlState.SELECTED);
		this.onClick();
	}
	,setState: function(state) {
		this.state_ = state;
		switch( (this.state_)[1] ) {
		case 0:
			js.Lib.document.body.style.cursor = "auto";
			break;
		case 1:
			js.Lib.document.body.style.cursor = "pointer";
			break;
		case 2:
			js.Lib.document.body.style.cursor = "auto";
			break;
		case 3:
			js.Lib.document.body.style.cursor = "auto";
			break;
		}
	}
	,getSelected: function() {
		return this.state_ == RCControlState.SELECTED;
	}
	,getEnabled: function() {
		return this.enabled_;
	}
	,setEnabled: function(c) {
		this.enabled_ = c;
		this.click.enabled = this.enabled_;
		this.press.enabled = this.enabled_;
		this.release.enabled = this.enabled_;
		this.over.enabled = this.enabled_;
		this.out.enabled = this.enabled_;
		return this.enabled_;
	}
	,getHighlighted: function() {
		return this.state_ == RCControlState.HIGHLIGHTED;
	}
	,destroy: function() {
		this.click.destroy({ fileName : "RCControl.hx", lineNumber : 171, className : "RCControl", methodName : "destroy"});
		this.press.destroy({ fileName : "RCControl.hx", lineNumber : 172, className : "RCControl", methodName : "destroy"});
		this.release.destroy({ fileName : "RCControl.hx", lineNumber : 173, className : "RCControl", methodName : "destroy"});
		this.over.destroy({ fileName : "RCControl.hx", lineNumber : 174, className : "RCControl", methodName : "destroy"});
		this.out.destroy({ fileName : "RCControl.hx", lineNumber : 175, className : "RCControl", methodName : "destroy"});
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCControl
	,__properties__: $extend(JSView.prototype.__properties__,{get_selected:"getSelected",get_highlighted:"getHighlighted",set_enabled:"setEnabled",get_enabled:"getEnabled"})
});
var RCButton = $hxClasses["RCButton"] = function(x,y,skin) {
	this.skin = skin;
	this.skin.hit.setAlpha(0);
	this.fixSkin();
	RCControl.call(this,x,y,this.currentBackground.getWidth(),this.currentBackground.getHeight());
};
RCButton.__name__ = ["RCButton"];
RCButton.__super__ = RCControl;
RCButton.prototype = $extend(RCControl.prototype,{
	skin: null
	,currentTitle: null
	,currentTitleColor: null
	,currentImage: null
	,currentBackground: null
	,setState: function(state) {
		if(this.state_ == state) return;
		Fugu.safeRemove([this.currentBackground,this.currentImage]);
		switch( (state)[1] ) {
		case 0:
			this.currentBackground = this.skin.normal.background;
			this.currentImage = this.skin.normal.label;
			break;
		case 1:
			this.currentBackground = this.skin.highlighted.background;
			this.currentImage = this.skin.highlighted.label;
			break;
		case 2:
			this.currentBackground = this.skin.disabled.background;
			this.currentImage = this.skin.disabled.label;
			break;
		case 3:
			this.currentBackground = this.skin.selected.background;
			this.currentImage = this.skin.selected.label;
			break;
		}
		this.addChild(this.currentBackground);
		this.addChild(this.currentImage);
		this.addChild(this.skin.hit);
		this.size.width = this.currentBackground.getWidth();
		this.size.height = this.currentBackground.getHeight();
		RCControl.prototype.setState.call(this,state);
	}
	,fixSkin: function() {
		if(this.skin.normal.label == null) this.skin.normal.label = this.skin.normal.image;
		if(this.skin.normal.label == null) this.skin.normal.label = this.skin.normal.otherView;
		var _g = 0, _g1 = Reflect.fields(this.skin.normal);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			if(key == "colors") continue;
			if(Reflect.field(this.skin.highlighted,key) == null) this.skin.highlighted[key] = Reflect.field(this.skin.normal,key);
			if(Reflect.field(this.skin.selected,key) == null) this.skin.selected[key] = Reflect.field(this.skin.highlighted,key);
			if(Reflect.field(this.skin.disabled,key) == null) this.skin.disabled[key] = Reflect.field(this.skin.normal,key);
		}
		this.currentBackground = this.skin.normal.background;
		this.currentImage = this.skin.normal.label;
	}
	,setTitle: function(title,state) {
	}
	,setTitleColor: function(color,state) {
	}
	,setBackgroundImage: function(image,state) {
	}
	,__class__: RCButton
});
var RCButtonRadio = $hxClasses["RCButtonRadio"] = function(x,y,skin) {
	RCButton.call(this,x,y,skin);
	this.toggable_ = true;
};
RCButtonRadio.__name__ = ["RCButtonRadio"];
RCButtonRadio.__super__ = RCButton;
RCButtonRadio.prototype = $extend(RCButton.prototype,{
	toggable_: null
	,toggable: null
	,mouseDownHandler: function(e) {
		this.onPress();
	}
	,mouseUpHandler: function(e) {
		this.onRelease();
	}
	,clickHandler: function(e) {
		this.setState(this.getSelected()?RCControlState.NORMAL:RCControlState.SELECTED);
		this.onClick();
	}
	,rollOverHandler: function(e) {
		if(!this.getSelected()) this.setState(RCControlState.HIGHLIGHTED);
		this.onOver();
	}
	,rollOutHandler: function(e) {
		if(!this.getSelected()) this.setState(RCControlState.NORMAL);
		this.onOut();
	}
	,getToggable: function() {
		return this.toggable_;
	}
	,setToggable: function(v) {
		if(!v) this.setState(RCControlState.NORMAL);
		return this.toggable_ = v;
	}
	,toggle: function() {
		if(this.toggable_) this.setState(RCControlState.SELECTED);
	}
	,untoggle: function() {
		if(this.toggable_) this.setState(RCControlState.NORMAL);
	}
	,__class__: RCButtonRadio
	,__properties__: $extend(RCButton.prototype.__properties__,{set_toggable:"setToggable",get_toggable:"getToggable"})
});
var RCColor = $hxClasses["RCColor"] = function(fillColor,strokeColor,a) {
	this.fillColor = fillColor;
	this.strokeColor = strokeColor;
	this.alpha = a == null?1.0:a;
	this.redComponent = (fillColor >> 16 & 255) / 255;
	this.greenComponent = (fillColor >> 8 & 255) / 255;
	this.blueComponent = (fillColor & 255) / 255;
	this.fillColorStyle = RCColor.HEXtoString(fillColor);
	this.strokeColorStyle = RCColor.HEXtoString(strokeColor);
};
RCColor.__name__ = ["RCColor"];
RCColor.blackColor = function() {
	return RCColor.colorWithWhite(0);
}
RCColor.darkGrayColor = function() {
	return RCColor.colorWithWhite(0.333);
}
RCColor.lightGrayColor = function() {
	return RCColor.colorWithWhite(0.667);
}
RCColor.whiteColor = function() {
	return RCColor.colorWithWhite(1);
}
RCColor.grayColor = function() {
	return RCColor.colorWithWhite(0.5);
}
RCColor.redColor = function() {
	return RCColor.colorWithRGBA(1,0,0);
}
RCColor.greenColor = function() {
	return RCColor.colorWithRGBA(0,1,0);
}
RCColor.blueColor = function() {
	return RCColor.colorWithRGBA(0,0,1);
}
RCColor.cyanColor = function() {
	return RCColor.colorWithRGBA(0,1,1);
}
RCColor.yellowColor = function() {
	return RCColor.colorWithRGBA(1,1,0);
}
RCColor.magentaColor = function() {
	return RCColor.colorWithRGBA(1,0,1);
}
RCColor.orangeColor = function() {
	return RCColor.colorWithRGBA(1,0.5,0);
}
RCColor.purpleColor = function() {
	return RCColor.colorWithRGBA(0.5,0,0.5);
}
RCColor.brownColor = function() {
	return RCColor.colorWithRGBA(0.6,0.4,0.2);
}
RCColor.clearColor = function() {
	return RCColor.colorWithWhite(0,0);
}
RCColor.colorWithWhite = function(white,alpha) {
	if(alpha == null) alpha = 1.0;
	return new RCColor(RCColor.RGBtoHEX(white,white,white),null,alpha);
}
RCColor.colorWithRGBA = function(red,green,blue,alpha) {
	if(alpha == null) alpha = 1.0;
	return new RCColor(RCColor.RGBtoHEX(red,green,blue),null,alpha);
}
RCColor.colorWithHSBA = function(hue,saturation,brightness,alpha) {
	if(alpha == null) alpha = 1.0;
	return new RCColor(RCColor.RGBtoHEX(hue,saturation,brightness),null,alpha);
}
RCColor.colorWithFillAndStroke = function(fillColor,strokeColor) {
	return new RCColor(fillColor,strokeColor);
}
RCColor.HEXtoString = function(color) {
	if(color == null) return null;
	return "#" + StringTools.lpad(StringTools.hex(color),"0",6);
}
RCColor.RGBtoHEX = function(r,g,b) {
	return Math.round(r * 255) << 16 | Math.round(g * 255) << 8 | Math.round(b * 255);
}
RCColor.prototype = {
	fillColor: null
	,strokeColor: null
	,fillColorStyle: null
	,strokeColorStyle: null
	,redComponent: null
	,greenComponent: null
	,blueComponent: null
	,alpha: null
	,__class__: RCColor
}
var RCControlState = $hxClasses["RCControlState"] = { __ename__ : ["RCControlState"], __constructs__ : ["NORMAL","HIGHLIGHTED","DISABLED","SELECTED"] }
RCControlState.NORMAL = ["NORMAL",0];
RCControlState.NORMAL.toString = $estr;
RCControlState.NORMAL.__enum__ = RCControlState;
RCControlState.HIGHLIGHTED = ["HIGHLIGHTED",1];
RCControlState.HIGHLIGHTED.toString = $estr;
RCControlState.HIGHLIGHTED.__enum__ = RCControlState;
RCControlState.DISABLED = ["DISABLED",2];
RCControlState.DISABLED.toString = $estr;
RCControlState.DISABLED.__enum__ = RCControlState;
RCControlState.SELECTED = ["SELECTED",3];
RCControlState.SELECTED.toString = $estr;
RCControlState.SELECTED.__enum__ = RCControlState;
var RCDeviceOrientation = $hxClasses["RCDeviceOrientation"] = { __ename__ : ["RCDeviceOrientation"], __constructs__ : ["UIDeviceOrientationUnknown","UIDeviceOrientationPortrait","UIDeviceOrientationPortraitUpsideDown","UIDeviceOrientationLandscapeLeft","UIDeviceOrientationLandscapeRight","UIDeviceOrientationFaceUp","UIDeviceOrientationFaceDown"] }
RCDeviceOrientation.UIDeviceOrientationUnknown = ["UIDeviceOrientationUnknown",0];
RCDeviceOrientation.UIDeviceOrientationUnknown.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationUnknown.__enum__ = RCDeviceOrientation;
RCDeviceOrientation.UIDeviceOrientationPortrait = ["UIDeviceOrientationPortrait",1];
RCDeviceOrientation.UIDeviceOrientationPortrait.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationPortrait.__enum__ = RCDeviceOrientation;
RCDeviceOrientation.UIDeviceOrientationPortraitUpsideDown = ["UIDeviceOrientationPortraitUpsideDown",2];
RCDeviceOrientation.UIDeviceOrientationPortraitUpsideDown.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationPortraitUpsideDown.__enum__ = RCDeviceOrientation;
RCDeviceOrientation.UIDeviceOrientationLandscapeLeft = ["UIDeviceOrientationLandscapeLeft",3];
RCDeviceOrientation.UIDeviceOrientationLandscapeLeft.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationLandscapeLeft.__enum__ = RCDeviceOrientation;
RCDeviceOrientation.UIDeviceOrientationLandscapeRight = ["UIDeviceOrientationLandscapeRight",4];
RCDeviceOrientation.UIDeviceOrientationLandscapeRight.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationLandscapeRight.__enum__ = RCDeviceOrientation;
RCDeviceOrientation.UIDeviceOrientationFaceUp = ["UIDeviceOrientationFaceUp",5];
RCDeviceOrientation.UIDeviceOrientationFaceUp.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationFaceUp.__enum__ = RCDeviceOrientation;
RCDeviceOrientation.UIDeviceOrientationFaceDown = ["UIDeviceOrientationFaceDown",6];
RCDeviceOrientation.UIDeviceOrientationFaceDown.toString = $estr;
RCDeviceOrientation.UIDeviceOrientationFaceDown.__enum__ = RCDeviceOrientation;
var RCDeviceType = $hxClasses["RCDeviceType"] = { __ename__ : ["RCDeviceType"], __constructs__ : ["IPhone","IPad","Android","WebOS","Mac","Flash"] }
RCDeviceType.IPhone = ["IPhone",0];
RCDeviceType.IPhone.toString = $estr;
RCDeviceType.IPhone.__enum__ = RCDeviceType;
RCDeviceType.IPad = ["IPad",1];
RCDeviceType.IPad.toString = $estr;
RCDeviceType.IPad.__enum__ = RCDeviceType;
RCDeviceType.Android = ["Android",2];
RCDeviceType.Android.toString = $estr;
RCDeviceType.Android.__enum__ = RCDeviceType;
RCDeviceType.WebOS = ["WebOS",3];
RCDeviceType.WebOS.toString = $estr;
RCDeviceType.WebOS.__enum__ = RCDeviceType;
RCDeviceType.Mac = ["Mac",4];
RCDeviceType.Mac.toString = $estr;
RCDeviceType.Mac.__enum__ = RCDeviceType;
RCDeviceType.Flash = ["Flash",5];
RCDeviceType.Flash.toString = $estr;
RCDeviceType.Flash.__enum__ = RCDeviceType;
var RCUserAgent = $hxClasses["RCUserAgent"] = { __ename__ : ["RCUserAgent"], __constructs__ : ["MSIE","GECKO","WEBKIT","OTHER"] }
RCUserAgent.MSIE = ["MSIE",0];
RCUserAgent.MSIE.toString = $estr;
RCUserAgent.MSIE.__enum__ = RCUserAgent;
RCUserAgent.GECKO = ["GECKO",1];
RCUserAgent.GECKO.toString = $estr;
RCUserAgent.GECKO.__enum__ = RCUserAgent;
RCUserAgent.WEBKIT = ["WEBKIT",2];
RCUserAgent.WEBKIT.toString = $estr;
RCUserAgent.WEBKIT.__enum__ = RCUserAgent;
RCUserAgent.OTHER = ["OTHER",3];
RCUserAgent.OTHER.toString = $estr;
RCUserAgent.OTHER.__enum__ = RCUserAgent;
var RCDevice = $hxClasses["RCDevice"] = function() {
	this.dpiScale = 1;
	this.userAgent = this.detectUserAgent();
};
RCDevice.__name__ = ["RCDevice"];
RCDevice._currentDevice = null;
RCDevice.currentDevice = function() {
	if(RCDevice._currentDevice == null) RCDevice._currentDevice = new RCDevice();
	return RCDevice._currentDevice;
}
RCDevice.prototype = {
	name: null
	,model: null
	,systemName: null
	,systemVersion: null
	,orientation: null
	,userInterfaceIdiom: null
	,uniqueIdentifier: null
	,dpiScale: null
	,userAgent: null
	,detectUserAgent: function() {
		var agent = js.Lib.window.navigator.userAgent.toLowerCase();
		if(agent.indexOf("msie") > -1) return RCUserAgent.MSIE;
		if(agent.indexOf("webkit") > -1) return RCUserAgent.WEBKIT;
		if(agent.indexOf("gecko") > -1) return RCUserAgent.GECKO;
		return RCUserAgent.OTHER;
	}
	,__class__: RCDevice
}
var _RCDraw = _RCDraw || {}
_RCDraw.LineScaleMode = $hxClasses["_RCDraw.LineScaleMode"] = function() { }
_RCDraw.LineScaleMode.__name__ = ["_RCDraw","LineScaleMode"];
_RCDraw.LineScaleMode.prototype = {
	__class__: _RCDraw.LineScaleMode
}
var RCDraw = $hxClasses["RCDraw"] = function(x,y,w,h,color,alpha) {
	if(alpha == null) alpha = 1.0;
	JSView.call(this,x,y,w,h);
	this.setAlpha(alpha);
	this.borderThickness = 1;
	try {
		this.graphics = this.layer;
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "RCDraw.hx", lineNumber : 37, className : "RCDraw", methodName : "new"});
	}
	if(Std["is"](color,RCColor) || Std["is"](color,RCGradient)) this.color = color; else if(Std["is"](color,Int) || Std["is"](color,Int)) this.color = new RCColor(color); else if(Std["is"](color,Array)) this.color = new RCColor(color[0],color[1]); else this.color = new RCColor(0);
};
RCDraw.__name__ = ["RCDraw"];
RCDraw.__super__ = JSView;
RCDraw.prototype = $extend(JSView.prototype,{
	color: null
	,borderThickness: null
	,configure: function() {
		if(Std["is"](this.color,RCColor)) {
			if(this.color.fillColor != null) this.graphics.beginFill(this.color.fillColor,this.color.alpha);
			if(this.color.strokeColor != null) {
				var pixelHinting = true;
				var scaleMode = _RCDraw.LineScaleMode.NONE;
				var caps = null;
				var joints = null;
				var miterLimit = 3;
				this.graphics.lineStyle(this.borderThickness,this.color.strokeColor,this.color.alpha,pixelHinting,scaleMode,caps,joints,miterLimit);
			}
		}
	}
	,frame: function() {
		return new RCRect(this.getX(),this.getY(),this.size.width,this.size.height);
	}
	,__class__: RCDraw
});
var RCDrawInterface = $hxClasses["RCDrawInterface"] = function() { }
RCDrawInterface.__name__ = ["RCDrawInterface"];
RCDrawInterface.prototype = {
	configure: null
	,redraw: null
	,__class__: RCDrawInterface
}
var RCEllipse = $hxClasses["RCEllipse"] = function(x,y,w,h,color,alpha) {
	if(alpha == null) alpha = 1.0;
	RCDraw.call(this,x,y,w,h,color,alpha);
	this.redraw();
};
RCEllipse.__name__ = ["RCEllipse"];
RCEllipse.__interfaces__ = [RCDrawInterface];
RCEllipse.__super__ = RCDraw;
RCEllipse.prototype = $extend(RCDraw.prototype,{
	redraw: function() {
		this.fillEllipse(Math.round(this.size.width / 2),Math.round(this.size.height / 2),this.size.width,this.size.height);
	}
	,fillEllipse: function(xc,yc,width,height) {
		var iHtml = new Array();
		var a = Math.round(width / 2);
		var b = Math.round(height / 2);
		var hexColor = ((function($this) {
			var $r;
			var $t = $this.color;
			if(Std["is"]($t,RCColor)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).fillColorStyle;
		var x = 0;
		var y = b;
		var a2 = a * a;
		var b2 = b * b;
		var xp, yp;
		xp = 1;
		yp = y;
		while(b2 * x < a2 * y) {
			x++;
			if(b2 * x * x + a2 * (y - 0.5) * (y - 0.5) - a2 * b2 >= 0) y--;
			if(x == 1 && y != yp) {
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;width:1px;height:1px;left:" + xc + "px;top:" + (yc + yp - 1) + "px;background-color:" + hexColor + "\"></DIV>";
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;width:1px;height:1px;left:" + xc + "px;top:" + (yc - yp) + "px;background-color:" + hexColor + "\"></DIV>";
			}
			if(y != yp) {
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc - x + 1) + "px;top:" + (yc - yp) + "px;width:" + (2 * x - 1) + "px;background-color:" + hexColor + "\"></DIV>";
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc - x + 1) + "px;top:" + (yc + yp) + "px;width:" + (2 * x - 1) + "px;background-color:" + hexColor + "\"></DIV>";
				yp = y;
				xp = x;
			}
			if(b2 * x >= a2 * y) {
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc - x) + "px;top:" + (yc - yp) + "px;width:" + (2 * x + 1) + "px;background-color:" + hexColor + "\"></DIV>";
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;height:1px;left:" + (xc - x) + "px;top:" + (yc + yp) + "px;width:" + (2 * x + 1) + "px;background-color:" + hexColor + "\"></DIV>";
			}
		}
		xp = x;
		yp = y;
		var divHeight = 1;
		while(y != 0) {
			y--;
			if(b2 * (x + 0.5) * (x + 0.5) + a2 * y * y - a2 * b2 <= 0) x++;
			if(x != xp) {
				divHeight = yp - y;
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + (xc - xp) + "px;top:" + (yc - yp) + "px;width:" + (2 * xp + 1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + (xc - xp) + "px;top:" + (yc + y + 1) + "px;width:" + (2 * xp + 1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				xp = x;
				yp = y;
			}
			if(y == 0) {
				divHeight = yp - y + 1;
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + (xc - xp) + "px;top:" + (yc - yp) + "px;width:" + (2 * x + 1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + (xc - xp) + "px;top:" + (yc + y) + "px;width:" + (2 * x + 1) + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
			}
		}
		this.layer.innerHTML = iHtml.join("");
		return this.layer;
	}
	,__class__: RCEllipse
});
var RCFont = $hxClasses["RCFont"] = function() {
	this.font = "Arial";
	this.html = true;
	this.embedFonts = true;
	this.autoSize = true;
	this.selectable = false;
	this.color = 14540253;
	this.size = 12;
	this.leading = 4;
	this.leftMargin = 0;
	this.rightMargin = 0;
	this.letterSpacing = 0;
	this.format = { };
	this.style = { };
};
RCFont.__name__ = ["RCFont"];
RCFont.fontWithName = function(fontName,size) {
	var fnt = new RCFont();
	fnt.font = fontName;
	fnt.size = size;
	return fnt;
}
RCFont.familyNames = function() {
	return [];
}
RCFont.systemFontOfSize = function(size) {
	var fnt = new RCFont();
	fnt.size = size;
	fnt.embedFonts = false;
	return fnt;
}
RCFont.boldSystemFontOfSize = function(size) {
	var fnt = RCFont.systemFontOfSize(size);
	fnt.bold = true;
	return fnt;
}
RCFont.italicSystemFontOfSize = function(size) {
	var fnt = RCFont.systemFontOfSize(size);
	fnt.italic = true;
	return fnt;
}
RCFont.prototype = {
	html: null
	,format: null
	,style: null
	,embedFonts: null
	,type: null
	,antiAliasType: null
	,autoSize: null
	,displayAsPassword: null
	,selectable: null
	,sharpness: null
	,thickness: null
	,align: null
	,blockIndent: null
	,bold: null
	,bullet: null
	,color: null
	,display: null
	,font: null
	,indent: null
	,italic: null
	,kerning: null
	,leading: null
	,leftMargin: null
	,letterSpacing: null
	,rightMargin: null
	,size: null
	,tabStops: null
	,target: null
	,underline: null
	,url: null
	,copy: function(exceptions) {
		var rcfont = new RCFont();
		var fields = Type.getInstanceFields(RCFont);
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			if(field == "copy" || field == "getFormat" || field == "getStyleSheet") continue;
			rcfont[field] = Reflect.field(this,field);
		}
		if(exceptions != null) {
			var _g = 0, _g1 = Reflect.fields(exceptions);
			while(_g < _g1.length) {
				var excp = _g1[_g];
				++_g;
				if(Reflect.hasField(rcfont,excp)) rcfont[excp] = Reflect.field(exceptions,excp);
			}
		}
		return rcfont;
	}
	,getFormat: function() {
		this.format.align = null;
		this.format.blockIndent = this.blockIndent;
		this.format.bold = this.bold;
		this.format.bullet = this.bullet;
		this.format.color = this.color;
		this.format.font = this.font;
		this.format.italic = this.italic;
		this.format.indent = this.indent;
		this.format.kerning = this.kerning;
		this.format.leading = this.leading * RCDevice.currentDevice().dpiScale;
		this.format.leftMargin = this.leftMargin * RCDevice.currentDevice().dpiScale;
		this.format.letterSpacing = this.letterSpacing;
		this.format.rightMargin = this.rightMargin * RCDevice.currentDevice().dpiScale;
		this.format.size = this.size * RCDevice.currentDevice().dpiScale;
		this.format.tabStops = this.tabStops;
		this.format.target = this.target;
		this.format.underline = this.underline;
		this.format.url = this.url;
		return this.format;
	}
	,getStyleSheet: function() {
		return this.style;
	}
	,__class__: RCFont
	,__properties__: {get_style:"getStyleSheet",get_format:"getFormat"}
}
var RCFontManager = $hxClasses["RCFontManager"] = function() {
};
RCFontManager.__name__ = ["RCFontManager"];
RCFontManager.INSTANCE = null;
RCFontManager.init = function() {
	if(RCFontManager.INSTANCE == null) {
		RCFontManager.INSTANCE = new RCFontManager();
		RCFontManager.INSTANCE.initDefaults();
	}
}
RCFontManager.instance = function() {
	if(RCFontManager.INSTANCE == null) RCFontManager.init();
	return RCFontManager.INSTANCE;
}
RCFontManager.registerFont = function(key,data) {
	RCFontManager.instance().hash_rcfont.set(key,data);
}
RCFontManager.registerStyle = function(key,data) {
	RCFontManager.instance().hash_style.set(key,data);
}
RCFontManager.remove = function(key) {
	RCFontManager.instance().hash_style.remove(key);
	RCFontManager.instance().hash_rcfont.remove(key);
}
RCFontManager.getFont = function(key,exceptions) {
	if(key == null) key = "system";
	return RCFontManager.instance().hash_rcfont.get(key).copy(exceptions);
}
RCFontManager.getStyleSheet = function(key,exception) {
	if(key == null) key = "default";
	if(key == "css" && RCFontManager.instance().hash_style.exists("css")) return RCFontManager.instance().hash_style.get("css");
	return RCFontManager.instance().createStyle(RCFontManager.INSTANCE.hash_style.get(key),exception);
}
RCFontManager.addSwf = function(swf) {
	RCFontManager.instance().push(swf);
}
RCFontManager.setCSS = function(css) {
	RCFontManager.instance().setCSSFile(css);
}
RCFontManager.registerSwfFont = function(str) {
	return false;
}
RCFontManager.prototype = {
	fontsDomain: null
	,fontsSwfList: null
	,event: null
	,_defaultStyleSheetData: null
	,hash_style: null
	,hash_rcfont: null
	,initDefaults: function() {
		this.hash_style = new Hash();
		this.hash_rcfont = new Hash();
		this.fontsSwfList = new Array();
		this._defaultStyleSheetData = { a_link : { color : "#999999", textDecoration : "underline"}, a_hover : { color : "#33CCFF"}, h1 : { size : 16}};
		RCFontManager.registerStyle("default",this._defaultStyleSheetData);
	}
	,push: function(e) {
		this.fontsSwfList.push(e);
	}
	,setCSSFile: function(css) {
	}
	,createStyle: function(properties,exceptions) {
		var style = null;
		return style;
	}
	,__class__: RCFontManager
}
var RCGradient = $hxClasses["RCGradient"] = function(colors,alphas,linear) {
	if(linear == null) linear = true;
	this.gradientColors = colors;
	this.gradientAlphas = alphas == null?[1.0,1.0]:alphas;
	this.gradientRatios = [0,255];
	this.focalPointRatio = 0;
	this.tx = 0;
	this.ty = 0;
	this.matrixRotation = Math.PI * 0.5;
};
RCGradient.__name__ = ["RCGradient"];
RCGradient.prototype = {
	strokeColor: null
	,gradientColors: null
	,gradientAlphas: null
	,gradientRatios: null
	,spreadMethod: null
	,interpolationMethod: null
	,gradientType: null
	,focalPointRatio: null
	,tx: null
	,ty: null
	,matrixRotation: null
	,__class__: RCGradient
}
var RCGroup = $hxClasses["RCGroup"] = function(x,y,gapX,gapY,constructor_) {
	JSView.call(this,x,y);
	this.gapX = gapX;
	this.gapY = gapY;
	this.constructor_ = constructor_;
	this.items = new Array();
	this.itemPush = new RCSignal();
	this.itemRemove = new RCSignal();
	this.update = new RCSignal();
};
RCGroup.__name__ = ["RCGroup"];
RCGroup.__super__ = JSView;
RCGroup.prototype = $extend(JSView.prototype,{
	items: null
	,constructor_: null
	,gapX: null
	,gapY: null
	,itemPush: null
	,itemRemove: null
	,update: null
	,add: function(params,alternativeConstructor) {
		if(!Reflect.isFunction(this.constructor_) && !Reflect.isFunction(alternativeConstructor)) return;
		if(alternativeConstructor != null) this.constructor_ = alternativeConstructor;
		if(this.constructor_ == null) throw "RCGroup needs passed a constructor function.";
		var i = 0;
		var _g = 0;
		while(_g < params.length) {
			var param = params[_g];
			++_g;
			var s = this.constructor_(new RCIndexPath(0,i));
			this.addChild(s);
			this.items.push(s);
			s.init();
			this.itemPush.dispatch(new RCIndexPath(0,i),null,null,null,{ fileName : "RCGroup.hx", lineNumber : 59, className : "RCGroup", methodName : "add"});
			i++;
		}
		this.keepItemsArranged();
	}
	,remove: function(i) {
		Fugu.safeDestroy(this.items[i],null,{ fileName : "RCGroup.hx", lineNumber : 69, className : "RCGroup", methodName : "remove"});
		this.keepItemsArranged();
		this.itemRemove.dispatch(new RCIndexPath(0,i),null,null,null,{ fileName : "RCGroup.hx", lineNumber : 74, className : "RCGroup", methodName : "remove"});
	}
	,keepItemsArranged: function() {
		var _g1 = 0, _g = this.items.length;
		while(_g1 < _g) {
			var i = _g1++;
			var newX = 0.0, newY = 0.0;
			var new_s = this.items[i];
			var old_s = this.items[i - 1];
			if(i != 0) {
				if(this.gapX != null) newX = old_s.getX() + old_s.getWidth() + this.gapX;
				if(this.gapY != null) newY = old_s.getY() + old_s.getHeight() + this.gapY;
			}
			new_s.setX(newX);
			new_s.setY(newY);
			this.size.width = newX + new_s.size.width;
			this.size.height = newY + new_s.size.height;
		}
		this.update.dispatch(this,null,null,null,{ fileName : "RCGroup.hx", lineNumber : 101, className : "RCGroup", methodName : "keepItemsArranged"});
	}
	,get: function(i) {
		return this.items[i];
	}
	,destroy: function() {
		Fugu.safeDestroy(this.items,null,{ fileName : "RCGroup.hx", lineNumber : 130, className : "RCGroup", methodName : "destroy"});
		this.items = null;
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCGroup
});
var RCImage = $hxClasses["RCImage"] = function(x,y,URL) {
	JSView.call(this,x,y);
	this.loader = js.Lib.document.createElement("img");
	this.addListeners();
	this.initWithContentsOfFile(URL);
};
RCImage.__name__ = ["RCImage"];
RCImage.imageNamed = function(name) {
	return new RCImage(0,0,name);
}
RCImage.imageWithContentsOfFile = function(path) {
	return new RCImage(0,0,path);
}
RCImage.resizableImageWithCapInsets = function(path,capWidth) {
	return new RCImage(0,0,path);
}
RCImage.__super__ = JSView;
RCImage.prototype = $extend(JSView.prototype,{
	loader: null
	,bitmapData: null
	,isLoaded: null
	,percentLoaded: null
	,errorMessage: null
	,onComplete: function() {
	}
	,onProgress: function() {
	}
	,onError: function() {
	}
	,initWithContentsOfFile: function(URL) {
		this.isLoaded = false;
		this.percentLoaded = 0;
		if(URL == null) return;
		this.loader.draggable = false;
		this.loader.src = URL;
	}
	,completeHandler: function(e) {
		var me = this;
		this.size.width = this.loader.width;
		this.size.height = this.loader.height;
		this.layer.appendChild(this.loader);
		this.originalSize = this.size.copy();
		this.isLoaded = true;
		if(js.Lib.isIE) {
			haxe.Timer.delay(function() {
				me.onComplete();
			},1);
			return;
		}
		this.onComplete();
	}
	,errorHandler: function(e) {
		this.errorMessage = Std.string(e);
		this.onError();
	}
	,ioErrorHandler: function(e) {
		this.errorMessage = Std.string(e);
		this.onError();
	}
	,copy: function() {
		return new RCImage(0,0,this.loader.src);
	}
	,addListeners: function() {
		this.loader.onload = this.completeHandler.$bind(this);
		this.loader.onerror = this.errorHandler.$bind(this);
	}
	,removeListeners: function() {
		this.loader.onload = null;
		this.loader.onerror = null;
	}
	,destroy: function() {
		this.removeListeners();
		this.loader = null;
		JSView.prototype.destroy.call(this);
	}
	,scaleToFit: function(w,h) {
		JSView.prototype.scaleToFit.call(this,w,h);
		this.loader.style.width = this.size.width + "px";
		this.loader.style.height = this.size.height + "px";
	}
	,scaleToFill: function(w,h) {
		JSView.prototype.scaleToFill.call(this,w,h);
		this.loader.style.width = this.size.width + "px";
		this.loader.style.height = this.size.height + "px";
	}
	,__class__: RCImage
});
var RCImageStretchable = $hxClasses["RCImageStretchable"] = function(x,y,imageLeft,imageMiddle,imageRight) {
	JSView.call(this,x,y);
	this.l = new RCImage(0,0,imageLeft);
	this.l.onComplete = this.onCompleteHandler.$bind(this);
	this.m = new RCImage(0,0,imageMiddle);
	this.m.onComplete = this.onCompleteHandler.$bind(this);
	this.r = new RCImage(0,0,imageRight);
	this.r.onComplete = this.onCompleteHandler.$bind(this);
	this.addChild(this.l);
	this.addChild(this.m);
	this.addChild(this.r);
};
RCImageStretchable.__name__ = ["RCImageStretchable"];
RCImageStretchable.__super__ = JSView;
RCImageStretchable.prototype = $extend(JSView.prototype,{
	l: null
	,m: null
	,r: null
	,onComplete: function() {
	}
	,onCompleteHandler: function() {
		if(this.l.isLoaded && this.m.isLoaded && this.r.isLoaded && this.size.width != 0) this.setWidth(this.size.width);
		this.onComplete();
	}
	,setWidth: function(w) {
		this.size.width = w;
		if(!this.l.isLoaded || !this.m.isLoaded || !this.r.isLoaded) return w;
		this.l.setX(0);
		this.m.setX(Math.round(this.l.getWidth()));
		var mw = Math.round(w - this.l.getWidth() - this.r.getWidth());
		if(mw < 0) mw = 0;
		this.m.setWidth(mw);
		var rx = Math.round(w - this.r.getWidth());
		if(rx < this.m.getX() + mw) rx = Math.round(this.m.getX() + mw);
		this.r.setX(rx);
		return w;
	}
	,destroy: function() {
		this.l.destroy();
		this.m.destroy();
		this.r.destroy();
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCImageStretchable
});
var RCIndexPath = $hxClasses["RCIndexPath"] = function(section,row) {
	this.section = section;
	this.row = row;
};
RCIndexPath.__name__ = ["RCIndexPath"];
RCIndexPath.prototype = {
	section: null
	,row: null
	,hasNext: function() {
		return true;
	}
	,next: function() {
		return this;
	}
	,toString: function() {
		return "[RCIndexPath section : " + this.section + ", row : " + this.row + "]";
	}
	,__class__: RCIndexPath
}
var RCKeys = $hxClasses["RCKeys"] = function() {
	this.resume();
};
RCKeys.__name__ = ["RCKeys"];
RCKeys.prototype = {
	onLeft: function() {
	}
	,onRight: function() {
	}
	,onUp: function() {
	}
	,onDown: function() {
	}
	,onEnter: function() {
	}
	,onSpace: function() {
	}
	,onEsc: function() {
	}
	,onKeyUp: function() {
	}
	,onKeyDown: function() {
	}
	,'char': null
	,keyCode: null
	,keyDownHandler: function(e) {
		this.keyCode = e.keyCode;
		haxe.Log.trace(this.keyCode,{ fileName : "RCKeys.hx", lineNumber : 43, className : "RCKeys", methodName : "keyDownHandler"});
		this["char"] = "";
		this.onKeyDown();
		switch(e.keyCode) {
		case 37:
			this.onLeft();
			break;
		case 39:
			this.onRight();
			break;
		case 38:
			this.onUp();
			break;
		case 40:
			this.onDown();
			break;
		case 13:
			this.onEnter();
			break;
		case 32:
			this.onSpace();
			break;
		case 27:
			this.onEsc();
			break;
		}
	}
	,keyUpHandler: function(e) {
		this["char"] = "";
		this.onKeyUp();
	}
	,resume: function() {
		js.Lib.document.onkeydown = this.keyDownHandler.$bind(this);
		js.Lib.document.onkeyup = this.keyUpHandler.$bind(this);
	}
	,hold: function() {
		js.Lib.document.onkeydown = null;
		js.Lib.document.onkeyup = null;
	}
	,destroy: function() {
		this.hold();
	}
	,__class__: RCKeys
}
var Keyboard = $hxClasses["Keyboard"] = function() { }
Keyboard.__name__ = ["Keyboard"];
Keyboard.prototype = {
	__class__: Keyboard
}
var RCLine = $hxClasses["RCLine"] = function(x1,y1,x2,y2,color,alpha,lineWeight) {
	if(lineWeight == null) lineWeight = 1;
	if(alpha == null) alpha = 1.0;
	RCDraw.call(this,x1,y1,x2 - x1,y2 - y1,color,alpha);
	this.lineWeight = lineWeight;
	this.redraw();
};
RCLine.__name__ = ["RCLine"];
RCLine.__interfaces__ = [RCDrawInterface];
RCLine.__super__ = RCDraw;
RCLine.prototype = $extend(RCDraw.prototype,{
	lineWeight: null
	,redraw: function() {
		this.layer.innerHTML = "";
		this.drawLine(0,0,Math.round(this.size.width),Math.round(this.size.height));
	}
	,drawLine: function(x0,y0,x1,y1) {
		var hexColor = ((function($this) {
			var $r;
			var $t = $this.color;
			if(Std["is"]($t,RCColor)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).fillColorStyle;
		if(y0 == y1) {
			if(x0 <= x1) this.layer.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + (x1 - x0 + 1) + "px;height:" + this.lineWeight + ";background-color:" + hexColor + "\"></DIV>"; else if(x0 > x1) this.layer.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x1 + "px;top:" + y0 + "px;width:" + (x0 - x1 + 1) + "px;height:" + this.lineWeight + ";background-color:" + hexColor + "\"></DIV>";
			return this.layer;
		}
		if(x0 == x1) {
			if(y0 <= y1) this.layer.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + this.lineWeight + ";height:" + (y1 - y0 + 1) + "px;background-color:" + hexColor + "\"></DIV>"; else if(y0 > y1) this.layer.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y1 + "px;width:" + this.lineWeight + ";height:" + (y0 - y1 + 1) + "px;background-color:" + hexColor + "\"></DIV>";
			return this.layer;
		}
		var iHtml = new Array();
		var yArray = new Array();
		var dx = Math.abs(x1 - x0);
		var dy = Math.abs(y1 - y0);
		var pixHeight = Math.round(Math.sqrt(this.lineWeight * this.lineWeight / (dy * dy / (dx * dx) + 1)));
		var pixWidth = Math.round(Math.sqrt(this.lineWeight * this.lineWeight - pixHeight * pixHeight));
		if(pixWidth == 0) pixWidth = 1;
		if(pixHeight == 0) pixHeight = 1;
		var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
		if(steep) {
			var tmp = x0;
			x0 = y0;
			y0 = tmp;
			tmp = x1;
			x1 = y1;
			y1 = tmp;
		}
		if(x0 > x1) {
			var tmp = x0;
			x0 = x1;
			x1 = tmp;
			tmp = y0;
			y0 = y1;
			y1 = tmp;
		}
		var deltax = x1 - x0;
		var deltay = Math.abs(y1 - y0);
		var error = deltax / 2;
		var ystep;
		var y = y0;
		ystep = y0 < y1?1:-1;
		var xp = 0;
		var yp = 0;
		var divWidth = 0;
		var divHeight = 0;
		if(steep) divWidth = pixWidth; else divHeight = pixHeight;
		var _g1 = x0, _g = x1 + 1;
		while(_g1 < _g) {
			var x = _g1++;
			if(steep) {
				if(x == x0) {
					xp = y;
					yp = x;
				} else if(y == xp) divHeight = divHeight + 1; else {
					divHeight = divHeight + pixHeight;
					iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					divHeight = 0;
					xp = y;
					yp = x;
				}
				if(x == x1) {
					if(divHeight != 0) {
						divHeight = divHeight + pixHeight;
						iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					} else {
						divHeight = pixHeight;
						iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + y + "px;top:" + x + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					}
				}
			} else {
				if(x == x0) {
					xp = x;
					yp = y;
				} else if(y == yp) divWidth = divWidth + 1; else {
					divWidth = divWidth + pixWidth;
					iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					divWidth = 0;
					xp = x;
					yp = y;
				}
				if(x == x1) {
					if(divWidth != 0) {
						divWidth = divWidth + pixWidth;
						iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					} else {
						divWidth = pixWidth;
						iHtml[iHtml.length] = "<DIV style=\"position:absolute;overflow:hidden;left:" + x + "px;top:" + y + "px;width:" + divWidth + "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					}
				}
			}
			error = error - deltay;
			if(error < 0) {
				y = y + ystep;
				error = error + deltax;
			}
		}
		this.layer.innerHTML = iHtml.join("");
		return this.layer;
	}
	,__class__: RCLine
});
var RCNotification = $hxClasses["RCNotification"] = function(name,functionToCall) {
	this.name = name;
	this.functionToCall = functionToCall;
};
RCNotification.__name__ = ["RCNotification"];
RCNotification.prototype = {
	name: null
	,functionToCall: null
	,toString: function() {
		return "[RCNotification with name: '" + this.name + "', functionToCall: " + this.functionToCall + "]";
	}
	,__class__: RCNotification
}
var RCNotificationCenter = $hxClasses["RCNotificationCenter"] = function() { }
RCNotificationCenter.__name__ = ["RCNotificationCenter"];
RCNotificationCenter.notificationsList = null;
RCNotificationCenter.init = function() {
	if(RCNotificationCenter.notificationsList == null) {
		RCNotificationCenter.notificationsList = new List();
		var fs = new EVFullScreen();
		fs.add(RCNotificationCenter.fullScreenHandler);
		var rs = new EVResize();
		rs.add(RCNotificationCenter.resizeHandler);
	}
}
RCNotificationCenter.resizeHandler = function(w,h) {
	RCNotificationCenter.postNotification("resize",[w,h],{ fileName : "RCNotificationCenter.hx", lineNumber : 26, className : "RCNotificationCenter", methodName : "resizeHandler"});
}
RCNotificationCenter.fullScreenHandler = function(b) {
	RCNotificationCenter.postNotification("fullscreen",[b],{ fileName : "RCNotificationCenter.hx", lineNumber : 29, className : "RCNotificationCenter", methodName : "fullScreenHandler"});
}
RCNotificationCenter.addObserver = function(name,func) {
	RCNotificationCenter.init();
	RCNotificationCenter.notificationsList.add(new RCNotification(name,func));
}
RCNotificationCenter.removeObserver = function(name,func) {
	RCNotificationCenter.init();
	var $it0 = RCNotificationCenter.notificationsList.iterator();
	while( $it0.hasNext() ) {
		var notification = $it0.next();
		if(notification.name == name && Reflect.compareMethods(notification.functionToCall,func)) RCNotificationCenter.notificationsList.remove(notification);
	}
}
RCNotificationCenter.postNotification = function(name,args,pos) {
	RCNotificationCenter.init();
	var notificationFound = false;
	var $it0 = RCNotificationCenter.notificationsList.iterator();
	while( $it0.hasNext() ) {
		var notification = $it0.next();
		if(notification.name == name) try {
			notificationFound = true;
			notification.functionToCall.apply(null,args);
		} catch( e ) {
			haxe.Log.trace("[RCNotificationCenter error calling function: " + notification.functionToCall + " from: " + Std.string(pos) + "]",{ fileName : "RCNotificationCenter.hx", lineNumber : 71, className : "RCNotificationCenter", methodName : "postNotification"});
		}
	}
	return notificationFound;
}
RCNotificationCenter.list = function() {
	var $it0 = RCNotificationCenter.notificationsList.iterator();
	while( $it0.hasNext() ) {
		var notification = $it0.next();
		haxe.Log.trace(notification,{ fileName : "RCNotificationCenter.hx", lineNumber : 82, className : "RCNotificationCenter", methodName : "list"});
	}
}
RCNotificationCenter.prototype = {
	__class__: RCNotificationCenter
}
var RCPoint = $hxClasses["RCPoint"] = function(x,y) {
	this.x = x == null?0:x;
	this.y = y == null?0:y;
};
RCPoint.__name__ = ["RCPoint"];
RCPoint.prototype = {
	x: null
	,y: null
	,copy: function() {
		return new RCPoint(this.x,this.y);
	}
	,toString: function() {
		return "[RCPoint x:" + this.x + ", y:" + this.y + "]";
	}
	,__class__: RCPoint
}
var RCRect = $hxClasses["RCRect"] = function(x,y,w,h) {
	this.origin = new RCPoint(x,y);
	this.size = new RCSize(w,h);
};
RCRect.__name__ = ["RCRect"];
RCRect.prototype = {
	origin: null
	,size: null
	,copy: function() {
		return new RCRect(this.origin.x,this.origin.y,this.size.width,this.size.height);
	}
	,toString: function() {
		return "[RCRect x:" + this.origin.x + ", y:" + this.origin.y + ", width:" + this.size.width + ", height:" + this.size.height + "]";
	}
	,__class__: RCRect
}
var RCRectangle = $hxClasses["RCRectangle"] = function(x,y,w,h,color,alpha,r) {
	if(alpha == null) alpha = 1.0;
	RCDraw.call(this,x,y,w,h,color,alpha);
	this.roundness = r;
	this.redraw();
};
RCRectangle.__name__ = ["RCRectangle"];
RCRectangle.__interfaces__ = [RCDrawInterface];
RCRectangle.__super__ = RCDraw;
RCRectangle.prototype = $extend(RCDraw.prototype,{
	roundness: null
	,redraw: function() {
		var fillColorStyle = ((function($this) {
			var $r;
			var $t = $this.color;
			if(Std["is"]($t,RCColor)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).fillColorStyle;
		var strokeColorStyle = ((function($this) {
			var $r;
			var $t = $this.color;
			if(Std["is"]($t,RCColor)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).strokeColorStyle;
		this.layer.style.margin = "0px 0px 0px 0px";
		this.layer.style.width = this.size.width * RCDevice.currentDevice().dpiScale + "px";
		this.layer.style.height = this.size.height * RCDevice.currentDevice().dpiScale + "px";
		this.layer.style.backgroundColor = fillColorStyle;
		if(strokeColorStyle != null) {
			this.layer.style.borderStyle = "solid";
			this.layer.style.borderWidth = this.borderThickness + "px";
			this.layer.style.borderColor = strokeColorStyle;
		}
		if(this.roundness != null) {
			this.layer.style.MozBorderRadius = this.roundness * RCDevice.currentDevice().dpiScale / 2 + "px";
			this.layer.style.borderRadius = this.roundness * RCDevice.currentDevice().dpiScale / 2 + "px";
		}
	}
	,setWidth: function(w) {
		this.size.width = w;
		this.redraw();
		return w;
	}
	,setHeight: function(h) {
		this.size.height = h;
		this.redraw();
		return h;
	}
	,__class__: RCRectangle
});
var _RCScrollBar = _RCScrollBar || {}
_RCScrollBar.Direction = $hxClasses["_RCScrollBar.Direction"] = { __ename__ : ["_RCScrollBar","Direction"], __constructs__ : ["HORIZONTAL","VERTICAL"] }
_RCScrollBar.Direction.HORIZONTAL = ["HORIZONTAL",0];
_RCScrollBar.Direction.HORIZONTAL.toString = $estr;
_RCScrollBar.Direction.HORIZONTAL.__enum__ = _RCScrollBar.Direction;
_RCScrollBar.Direction.VERTICAL = ["VERTICAL",1];
_RCScrollBar.Direction.VERTICAL.toString = $estr;
_RCScrollBar.Direction.VERTICAL.__enum__ = _RCScrollBar.Direction;
var RCScrollBar = $hxClasses["RCScrollBar"] = function(x,y,w,h,indicatorSize,skin) {
	RCControl.call(this,x,y,w,h);
	this.moving = false;
	this.minValue_ = 0;
	this.maxValue_ = 100;
	this.value_ = 0.0;
	this.skin = skin;
	this.indicatorSize = indicatorSize;
	this.viewDidAppear.add(this.init.$bind(this));
};
RCScrollBar.__name__ = ["RCScrollBar"];
RCScrollBar.__super__ = RCControl;
RCScrollBar.prototype = $extend(RCControl.prototype,{
	skin: null
	,background: null
	,scrollbar: null
	,indicatorSize: null
	,direction_: null
	,value_: null
	,minValue_: null
	,maxValue_: null
	,moving: null
	,mouseUpOverStage_: null
	,mouseMoveOverStage_: null
	,value: null
	,valueChanged: null
	,init: function() {
		RCControl.prototype.init.call(this);
		this.direction_ = this.size.width > this.size.height?_RCScrollBar.Direction.HORIZONTAL:_RCScrollBar.Direction.VERTICAL;
		this.background = this.skin.normal.background;
		this.background.setWidth(this.size.width);
		this.background.setHeight(this.size.height);
		this.addChild(this.background);
		this.scrollbar = this.skin.normal.otherView;
		this.scrollbar.setWidth(this.direction_ == _RCScrollBar.Direction.HORIZONTAL?this.indicatorSize:this.size.width);
		this.scrollbar.setHeight(this.direction_ == _RCScrollBar.Direction.VERTICAL?this.indicatorSize:this.size.height);
		this.scrollbar.setAlpha(0.4);
		this.addChild(this.scrollbar);
	}
	,configureDispatchers: function() {
		RCControl.prototype.configureDispatchers.call(this);
		this.valueChanged = new RCSignal();
		this.mouseUpOverStage_ = new EVMouse("mouseup",RCWindow.sharedWindow().stage,{ fileName : "RCScrollBar.hx", lineNumber : 75, className : "RCScrollBar", methodName : "configureDispatchers"});
		this.mouseMoveOverStage_ = new EVMouse("mousemove",RCWindow.sharedWindow().stage,{ fileName : "RCScrollBar.hx", lineNumber : 76, className : "RCScrollBar", methodName : "configureDispatchers"});
	}
	,mouseDownHandler: function(e) {
		haxe.Log.trace("mouseDownHandler",{ fileName : "RCScrollBar.hx", lineNumber : 79, className : "RCScrollBar", methodName : "mouseDownHandler"});
		this.moving = true;
		this.mouseUpOverStage_.add(this.mouseUpHandler.$bind(this));
		this.mouseMoveOverStage_.add(this.mouseMoveHandler.$bind(this));
		this.mouseMoveHandler(e);
		this.setState(RCControlState.SELECTED);
		this.onPress();
	}
	,mouseUpHandler: function(e) {
		this.moving = false;
		this.mouseUpOverStage_.remove(this.mouseUpHandler.$bind(this));
		this.mouseMoveOverStage_.remove(this.mouseMoveHandler.$bind(this));
		this.setState(RCControlState.HIGHLIGHTED);
		this.onRelease();
	}
	,rollOverHandler: function(e) {
		this.setState(RCControlState.HIGHLIGHTED);
		this.scrollbar.setAlpha(1);
		this.onOver();
	}
	,rollOutHandler: function(e) {
		this.setState(RCControlState.NORMAL);
		this.scrollbar.setAlpha(0.4);
		this.onOut();
	}
	,clickHandler: function(e) {
		this.setState(RCControlState.SELECTED);
		this.onClick();
	}
	,mouseMoveHandler: function(e) {
		var y0 = 0.0, y1 = 0.0, y2 = 0.0;
		switch( (this.direction_)[1] ) {
		case 0:
			y2 = this.size.width - this.scrollbar.getWidth();
			y0 = Zeta.limitsInt(this.getMouseX() - this.scrollbar.getWidth() / 2,0,y2);
			break;
		case 1:
			y2 = this.size.height - this.scrollbar.getHeight();
			y0 = Zeta.limitsInt(this.getMouseY() - this.scrollbar.getHeight() / 2,0,y2);
			break;
		}
		this.setValue(Zeta.lineEquation(this.minValue_,this.maxValue_,y0,y1,y2));
		e.updateAfterEvent();
	}
	,getValue: function() {
		return this.value_;
	}
	,setValue: function(v) {
		var x1 = 0.0, x2 = 0.0;
		this.value_ = v;
		switch( (this.direction_)[1] ) {
		case 0:
			x2 = this.size.width - this.scrollbar.getWidth();
			this.scrollbar.setX(Zeta.lineEquationInt(x1,x2,v,this.minValue_,this.maxValue_));
			break;
		case 1:
			x2 = this.size.height - this.scrollbar.getHeight();
			this.scrollbar.setY(Zeta.lineEquationInt(x1,x2,v,this.minValue_,this.maxValue_));
			break;
		}
		this.valueChanged.dispatch(this,null,null,null,{ fileName : "RCScrollBar.hx", lineNumber : 154, className : "RCScrollBar", methodName : "setValue"});
		return this.value_;
	}
	,destroy: function() {
		this.valueChanged.destroy({ fileName : "RCScrollBar.hx", lineNumber : 163, className : "RCScrollBar", methodName : "destroy"});
		this.mouseUpOverStage_.destroy({ fileName : "RCScrollBar.hx", lineNumber : 164, className : "RCScrollBar", methodName : "destroy"});
		this.mouseMoveOverStage_.destroy({ fileName : "RCScrollBar.hx", lineNumber : 165, className : "RCScrollBar", methodName : "destroy"});
		this.skin.destroy();
		RCControl.prototype.destroy.call(this);
	}
	,__class__: RCScrollBar
	,__properties__: $extend(RCControl.prototype.__properties__,{set_value:"setValue",get_value:"getValue"})
});
var RCScrollView = $hxClasses["RCScrollView"] = function(x,y,w,h) {
	JSView.call(this,x,y,w,h);
	this.setClipsToBounds(true);
	this.setContentView(new JSView(0,0));
};
RCScrollView.__name__ = ["RCScrollView"];
RCScrollView.__super__ = JSView;
RCScrollView.prototype = $extend(JSView.prototype,{
	vertScrollBar: null
	,horizScrollBar: null
	,vertScrollBarSync: null
	,horizScrollBarSync: null
	,contentView: null
	,dragging: null
	,autohideSliders: null
	,enableMarginsFade: null
	,bounces: null
	,decelerationRate: null
	,pagingEnabled: null
	,scrollEnabled: null
	,scrollIndicatorInsets: null
	,scrollViewDidScroll: function() {
	}
	,scrollViewWillBeginDragging: function() {
	}
	,scrollViewDidEndDragging: function() {
	}
	,scrollViewDidScrollToTop: function() {
	}
	,scrollViewDidEndScrollingAnimation: function() {
	}
	,setContentView: function(content) {
		Fugu.safeRemove(this.contentView);
		this.contentView = content;
		this.addChild(this.contentView);
		this.setContentSize(this.contentView.getContentSize());
		this.setScrollEnabled(true);
	}
	,setScrollEnabled: function(b) {
		haxe.Log.trace("setScrollEnabled " + b,{ fileName : "RCScrollView.hx", lineNumber : 59, className : "RCScrollView", methodName : "setScrollEnabled"});
		var colors = [null,null,14540253,16777215];
		haxe.Log.trace("contentSize " + this.contentView.getContentSize(),{ fileName : "RCScrollView.hx", lineNumber : 61, className : "RCScrollView", methodName : "setScrollEnabled"});
		haxe.Log.trace(this.size,{ fileName : "RCScrollView.hx", lineNumber : 62, className : "RCScrollView", methodName : "setScrollEnabled"});
		if(this.getContentSize().width > this.size.width && this.horizScrollBarSync == null && b && false) {
			haxe.Log.trace("add horiz",{ fileName : "RCScrollView.hx", lineNumber : 66, className : "RCScrollView", methodName : "setScrollEnabled"});
			var scroller_w = Zeta.lineEquationInt(this.size.width / 2,this.size.width,this.getContentSize().width,this.size.width * 2,this.size.width);
			var skinH = new haxe.SKScrollBar(colors);
			this.horizScrollBar = new RCScrollBar(0,this.size.height - 10,this.size.width,8,scroller_w,skinH);
			this.horizScrollBarSync = new RCSliderSync(RCWindow.sharedWindow().target,this.contentView,this.horizScrollBar,this.size.width,"horizontal");
			this.horizScrollBarSync.valueChanged.add(this.scrollViewDidScrollHandler.$bind(this));
			this.addChild(this.horizScrollBar);
		} else {
			Fugu.safeDestroy([this.horizScrollBar,this.horizScrollBarSync],null,{ fileName : "RCScrollView.hx", lineNumber : 75, className : "RCScrollView", methodName : "setScrollEnabled"});
			this.horizScrollBar = null;
			this.horizScrollBarSync = null;
		}
		haxe.Log.trace("contentView.height " + this.contentView.getHeight(),{ fileName : "RCScrollView.hx", lineNumber : 79, className : "RCScrollView", methodName : "setScrollEnabled"});
		if(this.contentView.getHeight() > this.size.height && this.vertScrollBarSync == null && b) {
			haxe.Log.trace("add vert",{ fileName : "RCScrollView.hx", lineNumber : 84, className : "RCScrollView", methodName : "setScrollEnabled"});
			var scroller_h = Zeta.lineEquationInt(this.size.height / 2,this.size.height,this.getContentSize().height,this.size.height * 2,this.size.height);
			var skinV = new haxe.SKScrollBar(colors);
			this.vertScrollBar = new RCScrollBar(this.size.width - 10,0,8,this.size.height,scroller_h,skinV);
			this.vertScrollBarSync = new RCSliderSync(RCWindow.sharedWindow().target,this.contentView,this.vertScrollBar,this.size.height,"vertical");
			this.vertScrollBarSync.valueChanged.add(this.scrollViewDidScrollHandler.$bind(this));
			this.addChild(this.vertScrollBar);
		} else {
			Fugu.safeDestroy([this.vertScrollBar,this.vertScrollBarSync],null,{ fileName : "RCScrollView.hx", lineNumber : 93, className : "RCScrollView", methodName : "setScrollEnabled"});
			this.vertScrollBar = null;
			this.vertScrollBarSync = null;
		}
		return b;
	}
	,scrollViewDidScrollHandler: function(s) {
		this.scrollViewDidScroll();
	}
	,scrollRectToVisible: function(rect,animated) {
	}
	,zoomToRect: function(rect,animated) {
	}
	,setBounce: function(b) {
		this.bounces = b;
		return b;
	}
	,setMarginsFade: function(b) {
		return b;
	}
	,resume: function() {
		if(this.vertScrollBarSync != null) this.vertScrollBarSync.resume();
		if(this.horizScrollBarSync != null) this.horizScrollBarSync.resume();
	}
	,hold: function() {
		if(this.vertScrollBarSync != null) this.vertScrollBarSync.hold();
		if(this.horizScrollBarSync != null) this.horizScrollBarSync.hold();
	}
	,destroy: function() {
		Fugu.safeDestroy([this.vertScrollBarSync,this.horizScrollBarSync,this.vertScrollBar,this.horizScrollBar],null,{ fileName : "RCScrollView.hx", lineNumber : 139, className : "RCScrollView", methodName : "destroy"});
		this.vertScrollBarSync = null;
		this.horizScrollBarSync = null;
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCScrollView
	,__properties__: $extend(JSView.prototype.__properties__,{set_scrollEnabled:"setScrollEnabled",set_bounces:"setBounce",set_enableMarginsFade:"setMarginsFade"})
});
var RCSegmentedControl = $hxClasses["RCSegmentedControl"] = function(x,y,w,h,skin) {
	JSView.call(this,x,y,w,h);
	this.items = new HashArray();
	this.click = new RCSignal();
	this.itemAdded = new RCSignal();
	this.itemRemoved = new RCSignal();
	if(skin == null) skin = ios.SKSegment;
	this.skin = skin;
};
RCSegmentedControl.__name__ = ["RCSegmentedControl"];
RCSegmentedControl.__super__ = JSView;
RCSegmentedControl.prototype = $extend(JSView.prototype,{
	skin: null
	,labels: null
	,items: null
	,segmentsWidth: null
	,selectedIndex_: null
	,click: null
	,itemAdded: null
	,itemRemoved: null
	,selectedIndex: null
	,initWithLabels: function(labels,equalSizes) {
		if(equalSizes == null) equalSizes = true;
		this.labels = labels;
		this.segmentsWidth = new Array();
		if(equalSizes) {
			var segmentWidth = Math.round(this.size.width / labels.length);
			var _g = 0;
			while(_g < labels.length) {
				var l = labels[_g];
				++_g;
				this.segmentsWidth.push(segmentWidth);
			}
		} else {
			var labelLengths = new Array();
			var totalLabelsLength = 0;
			var _g = 0;
			while(_g < labels.length) {
				var l = labels[_g];
				++_g;
				labelLengths.push(l.length);
				totalLabelsLength += l.length;
			}
			var _g = 0;
			while(_g < labelLengths.length) {
				var ll = labelLengths[_g];
				++_g;
				var p = ll * 100 / totalLabelsLength;
				this.segmentsWidth.push(Math.round(p * this.size.width / 100));
			}
		}
		var i = 0;
		var _g = 0;
		while(_g < labels.length) {
			var label = labels[_g];
			++_g;
			if(this.items.exists(label)) continue;
			var b = this.constructButton(i);
			b.onClick = (function(f,a1) {
				return function() {
					return f(a1);
				};
			})(this.clickHandler.$bind(this),label);
			this.addChild(b);
			this.items.set(label,b);
			this.itemAdded.dispatch(this,null,null,null,{ fileName : "RCSegmentedControl.hx", lineNumber : 83, className : "RCSegmentedControl", methodName : "initWithLabels"});
			i++;
		}
		this.keepButtonsArranged();
	}
	,constructButton: function(i) {
		var position = (function($this) {
			var $r;
			switch(i) {
			case 0:
				$r = "left";
				break;
			case $this.labels.length - 1:
				$r = "right";
				break;
			default:
				$r = "middle";
			}
			return $r;
		}(this));
		var segmentX = 0;
		var _g = 0;
		while(_g < i) {
			var j = _g++;
			segmentX += this.segmentsWidth[j];
		}
		var s = Type.createInstance(this.skin,[this.labels[i],this.segmentsWidth[i],this.size.height,position,null]);
		var b = new RCButtonRadio(segmentX,0,s);
		return b;
	}
	,getSelectedIndex: function() {
		return this.selectedIndex_;
	}
	,setSelectedIndex: function(i) {
		haxe.Log.trace("setIndex " + i,{ fileName : "RCSegmentedControl.hx", lineNumber : 118, className : "RCSegmentedControl", methodName : "setSelectedIndex"});
		if(this.selectedIndex_ == i) return i;
		this.selectedIndex_ = i;
		this.select(this.labels[i]);
		return this.selectedIndex_;
	}
	,remove: function(label) {
		if(this.items.exists(label)) {
			Fugu.safeDestroy(this.items.get(label),null,{ fileName : "RCSegmentedControl.hx", lineNumber : 133, className : "RCSegmentedControl", methodName : "remove"});
			this.items.remove(label);
		}
		this.keepButtonsArranged();
		this.itemRemoved.dispatch(this,null,null,null,{ fileName : "RCSegmentedControl.hx", lineNumber : 141, className : "RCSegmentedControl", methodName : "remove"});
	}
	,keepButtonsArranged: function() {
		return;
		var _g1 = 0, _g = this.items.array.length;
		while(_g1 < _g) {
			var i = _g1++;
			var newX = 0.0, newY = 0.0;
			var new_b = this.items.get(this.items.array[i]);
		}
	}
	,select: function(label,can_unselect) {
		if(can_unselect == null) can_unselect = true;
		haxe.Log.trace("select " + label + ", " + can_unselect,{ fileName : "RCSegmentedControl.hx", lineNumber : 164, className : "RCSegmentedControl", methodName : "select"});
		if(this.items.exists(label)) {
			this.items.get(label).toggle();
			if(can_unselect) this.items.get(label).setEnabled(false); else this.items.get(label).setEnabled(true);
		}
		if(can_unselect) {
			var $it0 = this.items.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				if(key != label) this.unselect(key);
			}
		}
	}
	,unselect: function(label) {
		this.items.get(label).setEnabled(true);
		this.items.get(label).untoggle();
	}
	,toggled: function(label) {
		return this.items.get(label).getSelected();
	}
	,get: function(label) {
		return this.items.get(label);
	}
	,exists: function(label) {
		return this.items.exists(label);
	}
	,enable: function(label) {
		this.items.get(label).setEnabled(true);
		this.items.get(label).setAlpha(1);
	}
	,disable: function(label) {
		this.items.get(label).setEnabled(false);
		this.items.get(label).setAlpha(0.4);
	}
	,clickHandler: function(label) {
		this.setSelectedIndex(this.items.indexForKey(label));
		this.click.dispatch(this,null,null,null,{ fileName : "RCSegmentedControl.hx", lineNumber : 225, className : "RCSegmentedControl", methodName : "clickHandler"});
	}
	,destroy: function() {
		if(this.items != null) {
			var $it0 = this.items.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				Fugu.safeDestroy(this.items.get(key),null,{ fileName : "RCSegmentedControl.hx", lineNumber : 231, className : "RCSegmentedControl", methodName : "destroy"});
			}
		}
		this.items = null;
		this.click.destroy({ fileName : "RCSegmentedControl.hx", lineNumber : 233, className : "RCSegmentedControl", methodName : "destroy"});
		this.itemAdded.destroy({ fileName : "RCSegmentedControl.hx", lineNumber : 234, className : "RCSegmentedControl", methodName : "destroy"});
		this.itemRemoved.destroy({ fileName : "RCSegmentedControl.hx", lineNumber : 235, className : "RCSegmentedControl", methodName : "destroy"});
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCSegmentedControl
	,__properties__: $extend(JSView.prototype.__properties__,{set_selectedIndex:"setSelectedIndex",get_selectedIndex:"getSelectedIndex"})
});
var RCSize = $hxClasses["RCSize"] = function(w,h) {
	this.width = w == null?0:w;
	this.height = h == null?0:h;
};
RCSize.__name__ = ["RCSize"];
RCSize.prototype = {
	width: null
	,height: null
	,copy: function() {
		return new RCSize(this.width,this.height);
	}
	,toString: function() {
		return "[RCSize width:" + this.width + ", height:" + this.height + "]";
	}
	,__class__: RCSize
}
var RCSkin = $hxClasses["RCSkin"] = function(colors) {
	this.normal = { background : null, label : null, image : null, otherView : null, colors : { background : null, label : null, image : null, otherView : null}};
	this.highlighted = { background : null, label : null, image : null, otherView : null, colors : { background : null, label : null, image : null, otherView : null}};
	this.disabled = { background : null, label : null, image : null, otherView : null, colors : { background : null, label : null, image : null, otherView : null}};
	this.selected = { background : null, label : null, image : null, otherView : null, colors : { background : null, label : null, image : null, otherView : null}};
	if(colors != null) {
		this.normal.colors.background = colors[0];
		this.normal.colors.label = colors[1];
		this.highlighted.colors.background = colors[2];
		this.highlighted.colors.label = colors[3];
		this.disabled.colors.background = colors[2];
		this.disabled.colors.label = colors[3];
	}
};
RCSkin.__name__ = ["RCSkin"];
RCSkin.prototype = {
	normal: null
	,highlighted: null
	,disabled: null
	,selected: null
	,hit: null
	,destroy: function() {
	}
	,__class__: RCSkin
}
var _RCSlider = _RCSlider || {}
_RCSlider.Direction = $hxClasses["_RCSlider.Direction"] = { __ename__ : ["_RCSlider","Direction"], __constructs__ : ["HORIZONTAL","VERTICAL"] }
_RCSlider.Direction.HORIZONTAL = ["HORIZONTAL",0];
_RCSlider.Direction.HORIZONTAL.toString = $estr;
_RCSlider.Direction.HORIZONTAL.__enum__ = _RCSlider.Direction;
_RCSlider.Direction.VERTICAL = ["VERTICAL",1];
_RCSlider.Direction.VERTICAL.toString = $estr;
_RCSlider.Direction.VERTICAL.__enum__ = _RCSlider.Direction;
var RCSlider = $hxClasses["RCSlider"] = function(x,y,w,h,skin) {
	this.init_ = false;
	this.moving_ = false;
	this.minValue_ = 0.0;
	this.maxValue_ = 100.0;
	this.value_ = 0.0;
	this.direction_ = w > h?_RCSlider.Direction.HORIZONTAL:_RCSlider.Direction.VERTICAL;
	if(skin == null) skin = new haxe.SKSlider();
	this.skin = skin;
	RCControl.call(this,x,y,w,h);
	this.viewDidAppear.add(this.viewDidAppear_.$bind(this));
};
RCSlider.__name__ = ["RCSlider"];
RCSlider.__super__ = RCControl;
RCSlider.prototype = $extend(RCControl.prototype,{
	init_: null
	,value_: null
	,minValue_: null
	,maxValue_: null
	,moving_: null
	,direction_: null
	,mouseUpOverStage_: null
	,mouseMoveOverStage_: null
	,skin: null
	,sliderNormal: null
	,sliderHighlighted: null
	,scrubber: null
	,minValue: null
	,maxValue: null
	,value: null
	,minimumValueImage: null
	,maximumValueImage: null
	,valueChanged: null
	,viewDidAppear_: function() {
		this.sliderNormal = this.skin.normal.background;
		if(this.sliderNormal == null) this.sliderNormal = new JSView(0,0);
		this.sliderNormal.setWidth(this.size.width);
		this.sliderHighlighted = this.skin.highlighted.background;
		if(this.sliderHighlighted == null) this.sliderHighlighted = new JSView(0,0);
		this.sliderHighlighted.setWidth(this.size.width);
		this.scrubber = this.skin.normal.otherView;
		if(this.scrubber == null) this.scrubber = new JSView(0,0);
		this.scrubber.setY(Math.round((this.size.height - this.scrubber.getHeight()) / 2));
		this.addChild(this.sliderNormal);
		this.addChild(this.sliderHighlighted);
		this.addChild(this.scrubber);
		this.press.add(this.mouseDownHandler.$bind(this));
		this.over.add(this.rollOverHandler.$bind(this));
		this.out.add(this.rollOutHandler.$bind(this));
		this.init_ = true;
		this.setValue(this.value_);
	}
	,configureDispatchers: function() {
		RCControl.prototype.configureDispatchers.call(this);
		this.valueChanged = new RCSignal();
		this.mouseUpOverStage_ = new EVMouse("mouseup",RCWindow.sharedWindow().stage,{ fileName : "RCSlider.hx", lineNumber : 94, className : "RCSlider", methodName : "configureDispatchers"});
		this.mouseMoveOverStage_ = new EVMouse("mousemove",RCWindow.sharedWindow().stage,{ fileName : "RCSlider.hx", lineNumber : 95, className : "RCSlider", methodName : "configureDispatchers"});
	}
	,setEnabled: function(c) {
		return this.enabled_ = false;
	}
	,mouseDownHandler: function(e) {
		this.moving_ = true;
		this.mouseUpOverStage_.add(this.mouseUpHandler.$bind(this));
		this.mouseMoveOverStage_.add(this.mouseMoveHandler.$bind(this));
		this.mouseMoveHandler(e);
	}
	,mouseUpHandler: function(e) {
		this.moving_ = false;
		this.mouseUpOverStage_.remove(this.mouseUpHandler.$bind(this));
		this.mouseMoveOverStage_.remove(this.mouseMoveHandler.$bind(this));
	}
	,mouseMoveHandler: function(e) {
		var y0 = 0.0, y1 = 0.0, y2 = 0.0;
		switch( (this.direction_)[1] ) {
		case 0:
			y2 = this.size.width - this.scrubber.getWidth();
			y0 = Zeta.limitsInt(this.getMouseX() - this.scrubber.getWidth() / 2,0,y2);
			break;
		case 1:
			y2 = this.size.height - this.scrubber.getHeight();
			y0 = Zeta.limitsInt(this.getMouseY() - this.scrubber.getHeight() / 2,0,y2);
			break;
		}
		this.setValue(Zeta.lineEquation(this.minValue_,this.maxValue_,y0,y1,y2));
	}
	,getValue: function() {
		return this.value_;
	}
	,setValue: function(v) {
		this.value_ = v;
		if(!this.init_) return v;
		var x1 = 0.0, x2 = 0.0;
		switch( (this.direction_)[1] ) {
		case 0:
			x2 = this.size.width - this.scrubber.getWidth();
			this.scrubber.setX(Zeta.lineEquationInt(x1,x2,v,this.minValue_,this.maxValue_));
			this.scrubber.setY(Math.round((this.size.height - this.scrubber.getHeight()) / 2));
			this.sliderHighlighted.setWidth(this.scrubber.getX() + this.scrubber.getWidth() / 2);
			break;
		case 1:
			x2 = this.size.height - this.scrubber.getHeight();
			this.scrubber.setY(Zeta.lineEquationInt(x1,x2,v,this.minValue_,this.maxValue_));
			this.sliderHighlighted.setHeight(this.scrubber.getY() + this.scrubber.getHeight() / 2);
			break;
		}
		this.valueChanged.dispatch(this,null,null,null,{ fileName : "RCSlider.hx", lineNumber : 172, className : "RCSlider", methodName : "setValue"});
		return this.value_;
	}
	,setMinValue: function(v) {
		this.minValue_ = v;
		this.setValue(this.value_);
		return v;
	}
	,setMaxValue: function(v) {
		this.maxValue_ = v;
		this.setValue(this.value_);
		return v;
	}
	,setMinimumValueImage: function(v) {
		return v;
	}
	,setMaximumValueImage: function(v) {
		return v;
	}
	,destroy: function() {
		this.mouseUpOverStage_.destroy({ fileName : "RCSlider.hx", lineNumber : 216, className : "RCSlider", methodName : "destroy"});
		this.mouseMoveOverStage_.destroy({ fileName : "RCSlider.hx", lineNumber : 217, className : "RCSlider", methodName : "destroy"});
		this.valueChanged.destroy({ fileName : "RCSlider.hx", lineNumber : 218, className : "RCSlider", methodName : "destroy"});
		this.skin.destroy();
		RCControl.prototype.destroy.call(this);
	}
	,__class__: RCSlider
	,__properties__: $extend(RCControl.prototype.__properties__,{set_maximumValueImage:"setMaximumValueImage",set_minimumValueImage:"setMinimumValueImage",set_value:"setValue",get_value:"getValue",set_maxValue:"setMaxValue",set_minValue:"setMinValue"})
});
var _RCSliderSync = _RCSliderSync || {}
_RCSliderSync.Direction = $hxClasses["_RCSliderSync.Direction"] = { __ename__ : ["_RCSliderSync","Direction"], __constructs__ : ["HORIZONTAL","VERTICAL"] }
_RCSliderSync.Direction.HORIZONTAL = ["HORIZONTAL",0];
_RCSliderSync.Direction.HORIZONTAL.toString = $estr;
_RCSliderSync.Direction.HORIZONTAL.__enum__ = _RCSliderSync.Direction;
_RCSliderSync.Direction.VERTICAL = ["VERTICAL",1];
_RCSliderSync.Direction.VERTICAL.toString = $estr;
_RCSliderSync.Direction.VERTICAL.__enum__ = _RCSliderSync.Direction;
_RCSliderSync.DecelerationRate = $hxClasses["_RCSliderSync.DecelerationRate"] = { __ename__ : ["_RCSliderSync","DecelerationRate"], __constructs__ : ["RCScrollViewDecelerationRateNormal","RCScrollViewDecelerationRateFast"] }
_RCSliderSync.DecelerationRate.RCScrollViewDecelerationRateNormal = ["RCScrollViewDecelerationRateNormal",0];
_RCSliderSync.DecelerationRate.RCScrollViewDecelerationRateNormal.toString = $estr;
_RCSliderSync.DecelerationRate.RCScrollViewDecelerationRateNormal.__enum__ = _RCSliderSync.DecelerationRate;
_RCSliderSync.DecelerationRate.RCScrollViewDecelerationRateFast = ["RCScrollViewDecelerationRateFast",1];
_RCSliderSync.DecelerationRate.RCScrollViewDecelerationRateFast.toString = $estr;
_RCSliderSync.DecelerationRate.RCScrollViewDecelerationRateFast.__enum__ = _RCSliderSync.DecelerationRate;
var RCSliderSync = $hxClasses["RCSliderSync"] = function(target,contentView,slider,valueMax,direction) {
	this.target = target;
	this.contentView = contentView;
	this.slider = slider;
	this.direction = direction == "horizontal"?_RCSliderSync.Direction.HORIZONTAL:_RCSliderSync.Direction.VERTICAL;
	this.setMaxValue(Math.round(valueMax));
	this.setStartValue(Math.round(this.getContentPosition()));
	this.setFinalValue(this.valueStart);
	this.f = 1;
	this.valueChanged = new RCSignal();
	this.ticker = new EVLoop();
	this.mouseWheel = new EVMouse("mousewheel",target,{ fileName : "RCSliderSync.hx", lineNumber : 61, className : "RCSliderSync", methodName : "new"});
	this.resume();
};
RCSliderSync.__name__ = ["RCSliderSync"];
RCSliderSync.prototype = {
	target: null
	,contentView: null
	,slider: null
	,direction: null
	,f: null
	,decelerationRate: null
	,ticker: null
	,mouseWheel: null
	,valueMax: null
	,valueStart: null
	,valueFinal: null
	,valueChanged: null
	,contentValueChanged: null
	,onScrollLeft: function() {
	}
	,onScrollRight: function() {
	}
	,hold: function() {
		this.mouseWheel.remove(this.wheelHandler.$bind(this));
		this.slider.valueChanged.remove(this.sliderChangedHandler.$bind(this));
	}
	,resume: function() {
		this.mouseWheel.add(this.wheelHandler.$bind(this));
		this.slider.valueChanged.add(this.sliderChangedHandler.$bind(this));
	}
	,wheelHandler: function(e) {
		var _g = this;
		_g.setFinalValue(_g.valueFinal + e.delta);
		this.startLoop();
		this.slider.setValue(Zeta.lineEquationInt(0,100,this.valueFinal,this.valueStart,this.valueStart + this.valueMax - this.getContentSize()));
		if(e.delta < 0) this.onScrollRight(); else this.onScrollLeft();
	}
	,sliderChangedHandler: function(e) {
		this.setFinalValue(Zeta.lineEquationInt(this.valueStart,this.valueStart + this.valueMax - this.getContentSize(),e.getValue(),0,100));
		this.startLoop();
	}
	,startLoop: function() {
		if(this.valueFinal > this.valueStart) this.setFinalValue(this.valueStart);
		if(this.valueFinal < this.valueStart + this.valueMax - this.getContentSize()) this.setFinalValue(Math.round(this.valueStart + this.valueMax - this.getContentSize()));
		this.ticker.setFuncToCall(this.loop.$bind(this));
	}
	,loop: function() {
		var next_value = (this.valueFinal - this.getContentPosition()) / 3;
		if(Math.abs(next_value) < 1) {
			this.ticker.setFuncToCall(null);
			this.moveContentTo(this.valueFinal);
		} else this.moveContentTo(this.getContentPosition() + next_value);
		this.valueChanged.dispatch(this,null,null,null,{ fileName : "RCSliderSync.hx", lineNumber : 132, className : "RCSliderSync", methodName : "loop"});
	}
	,moveContentTo: function(next_value) {
		if(this.direction == _RCSliderSync.Direction.HORIZONTAL) this.contentView.setX(Math.round(next_value)); else this.contentView.setY(Math.round(next_value));
	}
	,getContentPosition: function() {
		return this.direction == _RCSliderSync.Direction.HORIZONTAL?this.contentView.getX():this.contentView.getY();
	}
	,getContentSize: function() {
		return this.direction == _RCSliderSync.Direction.HORIZONTAL?this.contentView.getWidth():this.contentView.getHeight();
	}
	,setMaxValue: function(value) {
		return this.valueMax = value;
	}
	,setFinalValue: function(value) {
		return this.valueFinal = value;
	}
	,setStartValue: function(value) {
		return this.valueStart = value;
	}
	,destroy: function() {
		this.hold();
		this.valueChanged.destroy({ fileName : "RCSliderSync.hx", lineNumber : 168, className : "RCSliderSync", methodName : "destroy"});
		this.ticker.destroy();
		this.mouseWheel.destroy({ fileName : "RCSliderSync.hx", lineNumber : 170, className : "RCSliderSync", methodName : "destroy"});
	}
	,__class__: RCSliderSync
	,__properties__: {set_valueFinal:"setFinalValue",set_valueStart:"setStartValue",set_valueMax:"setMaxValue"}
}
var RCSwf = $hxClasses["RCSwf"] = function(x,y,URL,newDomain) {
	if(newDomain == null) newDomain = true;
	this.newDomain = newDomain;
	this.id_ = "swf_" + Date.now().toString();
	RCImage.call(this,x,y,URL);
};
RCSwf.__name__ = ["RCSwf"];
RCSwf.__super__ = RCImage;
RCSwf.prototype = $extend(RCImage.prototype,{
	target: null
	,event: null
	,newDomain: null
	,id_: null
	,initWithContentsOfFile: function(URL) {
		this.isLoaded = false;
		this.percentLoaded = 0;
		this.layer.id = this.id_;
		this.layer.appendChild(this.layer);
	}
	,completeHandler: function(e) {
		haxe.Log.trace(e,{ fileName : "RCSwf.hx", lineNumber : 59, className : "RCSwf", methodName : "completeHandler"});
		this.isLoaded = true;
		this.onComplete();
	}
	,callMethod: function(method,params) {
		return Reflect.field(this.target,method).apply(this.target,params);
	}
	,destroy: function() {
		this.removeListeners();
		try {
			this.loader.contentLoaderInfo.content.destroy();
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "RCSwf.hx", lineNumber : 88, className : "RCSwf", methodName : "destroy"});
			var stack = haxe.Stack.exceptionStack();
			haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "RCSwf.hx", lineNumber : 90, className : "RCSwf", methodName : "destroy"});
		}
	}
	,__class__: RCSwf
});
var RCTextRoll = $hxClasses["RCTextRoll"] = function(x,y,w,h,str,properties) {
	JSView.call(this,x,y,w,h);
	this.continuous = true;
	this.txt1 = new RCTextView(0,0,null,h,str,properties);
	this.addChild(this.txt1);
	this.viewDidAppear.add(this.viewDidAppear_.$bind(this));
};
RCTextRoll.__name__ = ["RCTextRoll"];
RCTextRoll.__super__ = JSView;
RCTextRoll.prototype = $extend(JSView.prototype,{
	txt1: null
	,txt2: null
	,timer: null
	,timerLoop: null
	,continuous: null
	,text: null
	,viewDidAppear_: function() {
		this.size.height = this.txt1.getContentSize().height;
		if(this.txt1.getContentSize().width > this.size.width) {
			if(this.txt2 != null) return;
			this.txt2 = new RCTextView(Math.round(this.txt1.getContentSize().width + 20),0,null,null,this.getText(),this.txt1.rcfont);
			this.addChild(this.txt2);
			this.setClipsToBounds(true);
		}
	}
	,getText: function() {
		return this.txt1.getText();
	}
	,setText: function(str) {
		return str;
	}
	,start: function() {
		if(this.txt2 == null) return;
		if(this.continuous) this.startRolling(); else this.timer = haxe.Timer.delay(this.startRolling.$bind(this),3000);
	}
	,stop: function() {
		if(this.txt2 == null) return;
		this.stopRolling({ fileName : "RCTextRoll.hx", lineNumber : 71, className : "RCTextRoll", methodName : "stop"});
		this.reset();
	}
	,stopRolling: function(pos) {
		if(this.timerLoop != null) this.timerLoop.stop();
		this.timerLoop = null;
	}
	,startRolling: function() {
		this.stopRolling({ fileName : "RCTextRoll.hx", lineNumber : 81, className : "RCTextRoll", methodName : "startRolling"});
		this.timerLoop = new haxe.Timer(20);
		this.timerLoop.run = this.loop.$bind(this);
	}
	,loop: function() {
		var _g = this.txt1, _g1 = _g.getX();
		_g.setX(_g1 - 1);
		_g1;
		var _g = this.txt2, _g1 = _g.getX();
		_g.setX(_g1 - 1);
		_g1;
		if(!this.continuous && this.txt2.getX() <= 0) {
			this.stop();
			this.timer = haxe.Timer.delay(this.startRolling.$bind(this),3000);
		}
		if(this.txt1.getX() < -this.txt1.getContentSize().width) this.txt1.setX(Math.round(this.txt2.getX() + this.txt2.getContentSize().width + 20));
		if(this.txt2.getX() < -this.txt2.getContentSize().width) this.txt2.setX(Math.round(this.txt1.getX() + this.txt1.getContentSize().width + 20));
	}
	,reset: function() {
		if(this.timer != null) {
			this.timer.stop();
			this.timer = null;
		}
		this.txt1.setX(0);
		this.txt2.setX(Math.round(this.txt1.getWidth() + 20));
	}
	,destroy: function() {
		this.stop();
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCTextRoll
	,__properties__: $extend(JSView.prototype.__properties__,{set_text:"setText",get_text:"getText"})
});
var RCTextView = $hxClasses["RCTextView"] = function(x,y,w,h,str,rcfont) {
	JSView.call(this,Math.round(x),Math.round(y),w,h);
	this.rcfont = rcfont.copy();
	this.setWidth(this.size.width);
	this.setHeight(this.size.height);
	this.viewDidAppear.add(this.viewDidAppear_.$bind(this));
	this.init();
	this.setText(str);
};
RCTextView.__name__ = ["RCTextView"];
RCTextView.__super__ = JSView;
RCTextView.prototype = $extend(JSView.prototype,{
	target: null
	,rcfont: null
	,text: null
	,init: function() {
		JSView.prototype.init.call(this);
		this.redraw();
	}
	,redraw: function() {
		var wrap = this.size.width != 0;
		var multiline = this.size.height != 0;
		this.layer.style.whiteSpace = wrap?"normal":"nowrap";
		this.layer.style.wordWrap = wrap?"break-word":"normal";
		var style = this.rcfont.selectable?"text":"none";
		this.layer.style.WebkitUserSelect = style;
		this.layer.style.MozUserSelect = style;
		this.layer.style.lineHeight = this.rcfont.leading + this.rcfont.size + "px";
		this.layer.style.fontFamily = this.rcfont.font;
		this.layer.style.fontSize = this.rcfont.size + "px";
		this.layer.style.fontWeight = this.rcfont.bold?"bold":"normal";
		this.layer.style.fontStyle = this.rcfont.italic?"italic":"normal";
		this.layer.style.letterSpacing = this.rcfont.letterSpacing + "px";
		this.layer.style.textAlign = this.rcfont.align;
		this.layer.style.color = RCColor.HEXtoString(this.rcfont.color);
		this.layer.style.contentEditable = "true";
		if(this.rcfont.autoSize) {
			this.layer.style.width = multiline?this.size.width + "px":"auto";
			this.layer.style.height = "auto";
		} else {
			this.layer.style.width = this.size.width + "px";
			this.layer.style.height = this.size.height + "px";
		}
		if(this.size.width != 0) this.setWidth(this.size.width);
	}
	,viewDidAppear_: function() {
		this.size.width = this.getContentSize().width;
	}
	,getText: function() {
		return this.layer.innerHTML;
	}
	,setText: function(str) {
		if(this.rcfont.html) this.layer.innerHTML = str; else this.layer.innerHTML = str;
		this.size.width = this.getContentSize().width;
		return str;
	}
	,destroy: function() {
		this.target = null;
		JSView.prototype.destroy.call(this);
	}
	,__class__: RCTextView
	,__properties__: $extend(JSView.prototype.__properties__,{set_text:"setText",get_text:"getText"})
});
var RCWindow = $hxClasses["RCWindow"] = function(id) {
	JSView.call(this,0.0,0.0,0.0,0.0);
	this.stage = js.Lib.document;
	this.setTarget(id);
	this.SCREEN_W = js.Lib.window.screen.width;
	this.SCREEN_H = js.Lib.window.screen.height;
	RCNotificationCenter.addObserver("resize",this.resizeHandler.$bind(this));
};
RCWindow.__name__ = ["RCWindow"];
RCWindow.sharedWindow_ = null;
RCWindow.sharedWindow = function(id) {
	if(RCWindow.sharedWindow_ == null) RCWindow.sharedWindow_ = new RCWindow(id);
	return RCWindow.sharedWindow_;
}
RCWindow.__super__ = JSView;
RCWindow.prototype = $extend(JSView.prototype,{
	target: null
	,stage: null
	,SCREEN_W: null
	,SCREEN_H: null
	,modalView: null
	,resizeHandler: function(w,h) {
		this.size.width = w;
		this.size.height = h;
	}
	,setTarget: function(id) {
		if(id != null) this.target = js.Lib.document.getElementById(id); else {
			this.target = js.Lib.document.body;
			this.target.style.margin = "0px 0px 0px 0px";
			this.target.style.overflow = "hidden";
			if(js.Lib.isIE) {
				this.target.style.width = js.Lib.document.documentElement.clientWidth + "px";
				this.target.style.height = js.Lib.document.documentElement.clientHeight + "px";
			} else {
				this.target.style.width = js.Lib.window.innerWidth + "px";
				this.target.style.height = js.Lib.window.innerHeight + "px";
			}
		}
		this.size.width = this.target.scrollWidth;
		this.size.height = this.target.scrollHeight;
		this.target.appendChild(this.layer);
	}
	,setBackgroundColor: function(color) {
		if(color == null) {
			this.target.style.background = null;
			return color;
		}
		var red = (color & 16711680) >> 16;
		var green = (color & 65280) >> 8;
		var blue = color & 255;
		var alpha = 1;
		this.target.style.background = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		return color;
	}
	,fsprefix: null
	,fullscreen: function() {
		if(this.supportsFullScreen()) {
			if(this.fsprefix == null) "requestFullScreen".apply(this.target,[]); else Reflect.field(this.target,this.fsprefix + "RequestFullScreen").apply(this.target,[]);
		}
	}
	,normal: function() {
		if(this.supportsFullScreen()) {
			if(this.fsprefix == "") "cancelFullScreen".apply(this.target,[]); else Reflect.field(this.target,this.fsprefix + "CancelFullScreen").apply(this.target,[]);
		}
	}
	,isFullScreen: function() {
		if(this.supportsFullScreen()) switch(this.fsprefix) {
		case "":
			return this.target.fullScreen;
		case "webkit":
			return this.target.webkitIsFullScreen;
		default:
			return Reflect.field(this.target,this.fsprefix + "FullScreen");
		}
		return false;
	}
	,supportsFullScreen: function() {
		if(Reflect.field(this.target,"cancelFullScreen") != null) return true; else {
			var _g = 0, _g1 = ["webkit","moz","o","ms","khtml"];
			while(_g < _g1.length) {
				var prefix = _g1[_g];
				++_g;
				if(Reflect.field(js.Lib.document,prefix + "CancelFullScreen") != null) {
					this.fsprefix = prefix;
					return true;
				}
			}
		}
		return false;
	}
	,addModalViewController: function(view) {
		this.modalView = view;
		this.modalView.setX(0);
		CoreAnimation.add(new CATween(this.modalView,{ y : { fromValue : this.getHeight(), toValue : 0}},0.5,0,caequations.Cubic.IN_OUT,{ fileName : "RCWindow.hx", lineNumber : 228, className : "RCWindow", methodName : "addModalViewController"}));
		this.addChild(this.modalView);
	}
	,dismissModalViewController: function() {
		if(this.modalView == null) return;
		var anim = new CATween(this.modalView,{ y : this.getHeight()},0.3,0,caequations.Cubic.IN,{ fileName : "RCWindow.hx", lineNumber : 233, className : "RCWindow", methodName : "dismissModalViewController"});
		anim.delegate.animationDidStop = this.destroyModalViewController.$bind(this);
		CoreAnimation.add(anim);
	}
	,destroyModalViewController: function() {
		this.modalView.destroy();
		this.modalView = null;
	}
	,getCenterX: function(w) {
		return Math.round(this.getWidth() / 2 - w / RCDevice.currentDevice().dpiScale / 2);
	}
	,getCenterY: function(h) {
		return Math.round(this.getHeight() / 2 - h / RCDevice.currentDevice().dpiScale / 2);
	}
	,toString: function() {
		return "[RCWindow target=" + this.target + "]";
	}
	,__class__: RCWindow
});
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
Reflect.prototype = {
	__class__: Reflect
}
var SkinButtonWithText = $hxClasses["SkinButtonWithText"] = function(label_str,colors) {
	RCSkin.call(this,colors);
	var format = RCFont.systemFontOfSize(12);
	var formatHighlighted = format.copy();
	formatHighlighted.color = 3355443;
	this.normal.label = new RCTextView(0,0,null,null,label_str,format);
	this.normal.label.viewDidAppear.add(this.viewDidAppear_.$bind(this));
	this.highlighted.label = new RCTextView(0,0,null,null,label_str,formatHighlighted);
	this.normal.background = new RCRectangle(0,0,this.normal.label.getWidth(),this.normal.label.getHeight(),16777215,0);
	this.hit = new RCRectangle(0,0,this.normal.label.getWidth(),this.normal.label.getHeight(),16777215,0);
};
SkinButtonWithText.__name__ = ["SkinButtonWithText"];
SkinButtonWithText.__super__ = RCSkin;
SkinButtonWithText.prototype = $extend(RCSkin.prototype,{
	viewDidAppear_: function() {
		haxe.Log.trace("bg appear " + this.normal.label.getWidth(),{ fileName : "SkinButtonWithText.hx", lineNumber : 33, className : "SkinButtonWithText", methodName : "viewDidAppear_"});
		this.normal.background.size = this.normal.label.getContentSize();
		this.hit.size = this.normal.label.getContentSize();
		((function($this) {
			var $r;
			var $t = $this.normal.background;
			if(Std["is"]($t,RCRectangle)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).redraw();
		((function($this) {
			var $r;
			var $t = $this.hit;
			if(Std["is"]($t,RCRectangle)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).redraw();
		this.normal.label.viewDidAppear.removeAll();
	}
	,__class__: SkinButtonWithText
});
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	a.remove("__class__");
	a.remove("__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__properties__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
Type.prototype = {
	__class__: Type
}
var Zeta = $hxClasses["Zeta"] = function() { }
Zeta.__name__ = ["Zeta"];
Zeta.isIn = function(search_this,in_this,pos) {
	if(pos == null) pos = "fit";
	if(search_this == null || in_this == null) return false;
	var arr1 = Std["is"](search_this,Array)?search_this:[search_this];
	var arr2 = Std["is"](in_this,Array)?in_this:[in_this];
	var _g = 0;
	while(_g < arr1.length) {
		var a1 = arr1[_g];
		++_g;
		var _g1 = 0;
		while(_g1 < arr2.length) {
			var a2 = arr2[_g1];
			++_g1;
			switch(pos.toLowerCase()) {
			case "anywhere":
				if(a1.toLowerCase().indexOf(a2.toLowerCase()) != -1) return true;
				break;
			case "end":
				if(a1.toLowerCase().substr(a1.length - a2.length) == a2.toLowerCase()) return true;
				break;
			case "fit":
				if(a1 == a2) return true;
				break;
			case "lowercase":
				if(a1.toLowerCase() == a2.toLowerCase()) return true;
				break;
			default:
				haxe.Log.trace("Position in string not implemented",{ fileName : "Zeta.hx", lineNumber : 49, className : "Zeta", methodName : "isIn"});
				return false;
			}
		}
	}
	return false;
}
Zeta.concatObjects = function(objs) {
	var finalObject = { };
	var _g = 0;
	while(_g < objs.length) {
		var currentObject = objs[_g];
		++_g;
		var _g1 = 0, _g2 = Reflect.fields(currentObject);
		while(_g1 < _g2.length) {
			var prop = _g2[_g1];
			++_g1;
			if(Reflect.field(currentObject,prop) != null) finalObject[prop] = Reflect.field(currentObject,prop);
		}
	}
	return finalObject;
}
Zeta.sort = function(array,sort_type,sort_array) {
	if(sort_type.toLowerCase() == "lastmodifieddescending") return array;
	if(sort_type.toLowerCase() == "lastmodifiedascending") sort_type = "reverse";
	if(sort_type.toLowerCase() == "customascending" && sort_array != null) sort_type = "custom";
	if(sort_type.toLowerCase() == "customdescending" && sort_array != null) {
		sort_array.reverse();
		sort_type = "custom";
	}
	switch(sort_type.toLowerCase()) {
	case "reverse":
		array.reverse();
		break;
	case "ascending":
		array.sort(Zeta.ascendingSort);
		break;
	case "descending":
		array.sort(Zeta.descendingSort);
		break;
	case "random":
		array.sort(Zeta.randomSort);
		break;
	case "custom":
		var arr = new Array();
		var _g = 0;
		while(_g < sort_array.length) {
			var a = sort_array[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < array.length) {
				var b = array[_g1];
				++_g1;
				if(a == b) {
					arr.push(a);
					array.remove(a);
					break;
				}
			}
		}
		return arr.concat(array);
	default:
		array.sortOn(sort_type,Array.NUMERIC);
	}
	return array;
}
Zeta.randomSort = function(a,b) {
	return -1 + Std.random(3);
}
Zeta.ascendingSort = function(a,b) {
	return Std.string(a) > Std.string(b)?1:-1;
}
Zeta.descendingSort = function(a,b) {
	return Std.string(a) > Std.string(b)?-1:1;
}
Zeta.array = function(len,zeros) {
	if(zeros == null) zeros = false;
	var a = new Array();
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		a.push(zeros?0:i);
	}
	return a;
}
Zeta.duplicateArray = function(arr) {
	var newArr = new Array();
	var _g = 0;
	while(_g < arr.length) {
		var a = arr[_g];
		++_g;
		newArr.push(a);
	}
	return newArr;
}
Zeta.lineEquation = function(x1,x2,y0,y1,y2) {
	return (x2 - x1) * (y0 - y1) / (y2 - y1) + x1;
}
Zeta.lineEquationInt = function(x1,x2,y0,y1,y2) {
	return Math.round((x2 - x1) * (y0 - y1) / (y2 - y1) + x1);
}
Zeta.limits = function(val,min,max) {
	return val < min?min:val > max?max:val;
}
Zeta.limitsInt = function(val,min,max) {
	return Math.round(val < min?min:val > max?max:val);
}
Zeta.prototype = {
	__class__: Zeta
}
caequations.Cubic = $hxClasses["caequations.Cubic"] = function() { }
caequations.Cubic.__name__ = ["caequations","Cubic"];
caequations.Cubic.IN = function(t,b,c,d,p_params) {
	return c * (t /= d) * t * t + b;
}
caequations.Cubic.OUT = function(t,b,c,d,p_params) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}
caequations.Cubic.IN_OUT = function(t,b,c,d,p_params) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t + 2) + b;
}
caequations.Cubic.OUT_IN = function(t,b,c,d,p_params) {
	if(t < d / 2) return caequations.Cubic.OUT(t * 2,b,c / 2,d,null);
	return caequations.Cubic.IN(t * 2 - d,b + c / 2,c / 2,d,null);
}
caequations.Cubic.prototype = {
	__class__: caequations.Cubic
}
haxe.Firebug = $hxClasses["haxe.Firebug"] = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.onerror = haxe.Firebug.onError;
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype = {
	__class__: haxe.Firebug
}
haxe.Http = $hxClasses["haxe.Http"] = function(url) {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	url: null
	,async: null
	,postData: null
	,headers: null
	,params: null
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setPostData: function(data) {
		this.postData = data;
	}
	,request: function(post) {
		var me = this;
		var r = new js.XMLHttpRequest();
		var onreadystatechange = function() {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
			case null: case undefined:
				me.onError("Failed to connect or resolve host");
				break;
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange();
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe.Http
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
haxe.SKButton = $hxClasses["haxe.SKButton"] = function(label_str,colors) {
	RCSkin.call(this,colors);
	var f = RCFont.boldSystemFontOfSize(11);
	f.color = 0;
	f.align = "center";
	this.normal.label = new RCTextView(0,4,70,20,label_str,f);
	this.normal.label.setY(Math.round(4.5));
	this.normal.background = new RCRectangle(0,0,70,20,10066329,1,8);
	this.normal.background.addChild(new RCRectangle(1,1,68,18,16711422,1,6));
	this.highlighted.background = new RCRectangle(0,0,70,20,3355443,1,8);
	this.highlighted.background.addChild(new RCRectangle(1,1,68,18,16770816,1,6));
	this.hit = new RCRectangle(0,0,70,20,16777215,0);
};
haxe.SKButton.__name__ = ["haxe","SKButton"];
haxe.SKButton.__super__ = RCSkin;
haxe.SKButton.prototype = $extend(RCSkin.prototype,{
	__class__: haxe.SKButton
});
haxe.SKButtonRadio = $hxClasses["haxe.SKButtonRadio"] = function(colors) {
	RCSkin.call(this,colors);
	var r = 14;
	this.normal.background = new RCEllipse(0,0,r,r,10066329);
	this.normal.background.addChild(new RCEllipse(1,1,r - 2,r - 2,16645629));
	this.normal.label = new JSView(0,0);
	this.highlighted.background = new RCEllipse(0,0,r,r,3355443);
	this.highlighted.background.addChild(new RCEllipse(1,1,r - 2,r - 2,10066329));
	this.highlighted.label = new RCEllipse(r / 2 - 2.,r / 2 - 2.,4,4,16777215);
	this.selected.background = new RCEllipse(0,0,r,r,3355443);
	this.selected.background.addChild(new RCEllipse(1,1,r - 2,r - 2,16770816));
	this.selected.label = new RCEllipse(r / 2 - 2.,r / 2 - 2.,4,4,3355443);
	this.hit = new RCRectangle(0,0,r,r,16777215);
};
haxe.SKButtonRadio.__name__ = ["haxe","SKButtonRadio"];
haxe.SKButtonRadio.__super__ = RCSkin;
haxe.SKButtonRadio.prototype = $extend(RCSkin.prototype,{
	__class__: haxe.SKButtonRadio
});
haxe.SKScrollBar = $hxClasses["haxe.SKScrollBar"] = function(colors) {
	RCSkin.call(this,colors);
	var w = 8, h = 8;
	this.normal.background = new RCRectangle(0,0,w,h,10066329,0.6,8);
	this.normal.otherView = new RCRectangle(0,0,w,h,3355443,1,8);
	this.hit = new RCRectangle(0,0,w,h,6710886,0);
};
haxe.SKScrollBar.__name__ = ["haxe","SKScrollBar"];
haxe.SKScrollBar.__super__ = RCSkin;
haxe.SKScrollBar.prototype = $extend(RCSkin.prototype,{
	__class__: haxe.SKScrollBar
});
haxe.SKSlider = $hxClasses["haxe.SKSlider"] = function(colors) {
	RCSkin.call(this,colors);
	var w = 160;
	var h = 8;
	this.normal.background = new RCRectangle(0,0,w,h,7829367,1,8);
	this.normal.otherView = new RCEllipse(0,0,h * 2,h * 2,3355443);
	this.normal.otherView.addChild(new RCEllipse(1,1,h * 2 - 2,h * 2 - 2,16763904));
	this.highlighted.background = new RCRectangle(0,0,w,h,0,1,8);
	this.hit = new JSView(0,0);
};
haxe.SKSlider.__name__ = ["haxe","SKSlider"];
haxe.SKSlider.__super__ = RCSkin;
haxe.SKSlider.prototype = $extend(RCSkin.prototype,{
	__class__: haxe.SKSlider
});
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return [];
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b[b.b.length] = "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m == null?"null":m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file == null?"null":file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line == null?"null":line;
		if(s1 != null) b.b[b.b.length] = ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname == null?"null":cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth == null?"null":meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n == null?"null":n;
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	return null;
}
haxe.Stack.prototype = {
	__class__: haxe.Stack
}
var ios = ios || {}
ios.SKSegment = $hxClasses["ios.SKSegment"] = function(label,w,h,buttonPosition,colors) {
	RCSkin.call(this,colors);
	var segmentLeft;
	var segmentMiddle;
	var segmentRight;
	var segmentLeftSelected;
	var segmentMiddleSelected;
	var segmentRightSelected;
	switch(buttonPosition) {
	case "left":
		segmentLeft = "LL";
		segmentMiddle = "M";
		segmentRight = "M";
		segmentLeftSelected = "LL";
		segmentMiddleSelected = "M";
		segmentRightSelected = "LR";
		break;
	case "right":
		segmentLeft = "M";
		segmentMiddle = "M";
		segmentRight = "RR";
		segmentLeftSelected = "RL";
		segmentMiddleSelected = "M";
		segmentRightSelected = "RR";
		break;
	default:
		segmentLeft = "M";
		segmentMiddle = "M";
		segmentRight = "M";
		segmentLeftSelected = "RL";
		segmentMiddleSelected = "M";
		segmentRightSelected = "LR";
	}
	var hd = RCDevice.currentDevice().dpiScale == 2?"@2x":"";
	var sl = "Resources/ios/RCSegmentedControl/" + segmentLeft + hd + ".png";
	var sm = "Resources/ios/RCSegmentedControl/" + segmentMiddle + hd + ".png";
	var sr = "Resources/ios/RCSegmentedControl/" + segmentRight + hd + ".png";
	this.normal.background = new RCImageStretchable(0,0,sl,sm,sr);
	this.normal.background.setWidth(w);
	var slh = "Resources/ios/RCSegmentedControl/" + segmentLeftSelected + "Selected" + hd + ".png";
	var smh = "Resources/ios/RCSegmentedControl/" + segmentMiddleSelected + "Selected" + hd + ".png";
	var srh = "Resources/ios/RCSegmentedControl/" + segmentRightSelected + "Selected" + hd + ".png";
	this.highlighted.background = new RCImageStretchable(0,0,slh,smh,srh);
	this.highlighted.background.setWidth(w);
	var font = RCFont.boldSystemFontOfSize(13);
	font.align = "center";
	font.color = 3355443;
	this.normal.label = new RCTextView(0,0,w,null,label,font);
	this.normal.label.setY(Math.round((h - 20) / 2));
	font.color = 16777215;
	this.highlighted.label = new RCTextView(0,0,w,null,label,font);
	this.highlighted.label.setY(Math.round((h - 20) / 2));
	this.hit = new RCRectangle(0,0,w,h,0);
};
ios.SKSegment.__name__ = ["ios","SKSegment"];
ios.SKSegment.__super__ = RCSkin;
ios.SKSegment.prototype = $extend(RCSkin.prototype,{
	__class__: ios.SKSegment
});
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
CoreAnimation.defaultTimingFunction = caequations.Linear.NONE;
CoreAnimation.defaultDuration = 0.8;
EVLoop.FPS = 60;
EVMouse.UP = "mouseup";
EVMouse.DOWN = "mousedown";
EVMouse.OVER = "mouseover";
EVMouse.OUT = "mouseout";
EVMouse.MOVE = "mousemove";
EVMouse.CLICK = "mouseclick";
EVMouse.DOUBLE_CLICK = "mousedoubleclick";
EVMouse.WHEEL = "mousewheel";
JSExternalInterface.available = true;
HXAddress._init = false;
HXAddress._initChange = false;
HXAddress._initChanged = false;
HXAddress._strict = true;
HXAddress._value = "";
HXAddress._queue = new Array();
HXAddress._availability = JSExternalInterface.available;
HXAddress._initializer = HXAddress._initialize();
RCColor.BLACK = 0;
RCColor.WHITE = 16777215;
RCColor.RED = 16711680;
RCColor.GREEN = 65280;
RCColor.BLUE = 255;
RCColor.CYAN = 65535;
RCColor.YELLOW = 16776960;
_RCDraw.LineScaleMode.NONE = null;
Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;
Keyboard.ENTER = 13;
Keyboard.SPACE = 32;
Keyboard.ESCAPE = 27;
RCTextRoll.GAP = 20;
Zeta.FIT = "fit";
Zeta.END = "end";
Zeta.ANYWHERE = "anywhere";
Zeta.LOWERCASE = "lowercase";
js.Lib.onerror = null;
Main.main()