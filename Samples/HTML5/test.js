$estr = function() { return js.Boot.__string_rec(this,''); }
CATransitionInterface = function() { }
CATransitionInterface.__name__ = ["CATransitionInterface"];
CATransitionInterface.prototype.init = null;
CATransitionInterface.prototype.animate = null;
CATransitionInterface.prototype.__class__ = CATransitionInterface;
if(typeof _RCMouse=='undefined') _RCMouse = {}
_RCMouse.Position = { __ename__ : ["_RCMouse","Position"], __constructs__ : ["left","middle","right","outside","over"] }
_RCMouse.Position.left = ["left",0];
_RCMouse.Position.left.toString = $estr;
_RCMouse.Position.left.__enum__ = _RCMouse.Position;
_RCMouse.Position.middle = ["middle",1];
_RCMouse.Position.middle.toString = $estr;
_RCMouse.Position.middle.__enum__ = _RCMouse.Position;
_RCMouse.Position.right = ["right",2];
_RCMouse.Position.right.toString = $estr;
_RCMouse.Position.right.__enum__ = _RCMouse.Position;
_RCMouse.Position.outside = ["outside",3];
_RCMouse.Position.outside.toString = $estr;
_RCMouse.Position.outside.__enum__ = _RCMouse.Position;
_RCMouse.Position.over = ["over",4];
_RCMouse.Position.over.toString = $estr;
_RCMouse.Position.over.__enum__ = _RCMouse.Position;
RCMouse = function(parent,target,target_over) {
	if( parent === $_ ) return;
	this._w = 200;
	this._parent = parent;
	this._target = target;
	this._over = target_over == null?target:target_over;
	this._is_idle = false;
	this.resume();
}
RCMouse.__name__ = ["RCMouse"];
RCMouse.prototype._parent = null;
RCMouse.prototype._target = null;
RCMouse.prototype._over = null;
RCMouse.prototype._last_position = null;
RCMouse.prototype._interval = null;
RCMouse.prototype._is_idle = null;
RCMouse.prototype._is_over = null;
RCMouse.prototype._w = null;
RCMouse.prototype.onOver = function() {
}
RCMouse.prototype.onOut = function() {
}
RCMouse.prototype.onLeft = function() {
}
RCMouse.prototype.onMiddle = function() {
}
RCMouse.prototype.onMiddleOut = function() {
}
RCMouse.prototype.onRight = function() {
}
RCMouse.prototype.onClick = function() {
}
RCMouse.prototype.onDoubleClick = function() {
}
RCMouse.prototype.onClickLeft = function() {
}
RCMouse.prototype.onClickMiddle = function() {
}
RCMouse.prototype.onClickRight = function() {
}
RCMouse.prototype.onIdle = function() {
}
RCMouse.prototype.onResume = function() {
}
RCMouse.prototype.resume = function() {
	this._interval = new haxe.Timer(3000);
	this._over.onmouseover = $closure(this,"mouseOverHandler");
	this._over.onclick = $closure(this,"clickHandler");
}
RCMouse.prototype.hold = function() {
	this._interval.stop();
	this._interval = null;
	this._over.onmouseover = null;
	this._over.onmouseout = null;
	this._over.onclick = null;
}
RCMouse.prototype.mouseOverHandler = function(e) {
	this._last_position = _RCMouse.Position.over;
	this.onOver();
	haxe.Log.trace("mouseOver",{ fileName : "RCMouse.hx", lineNumber : 130, className : "RCMouse", methodName : "mouseOverHandler"});
	this._over.onmousemove = $closure(this,"mouseMoveHandler");
	this._over.ondblclick = $closure(this,"doubleClickHandler");
}
RCMouse.prototype.mouseOutHandler = function(e) {
	haxe.Log.trace("mouseOut",{ fileName : "RCMouse.hx", lineNumber : 140, className : "RCMouse", methodName : "mouseOutHandler"});
	this._over.onmousemove = null;
	this._over.ondblclick = null;
	this.onOut();
}
RCMouse.prototype.mouseMoveHandler = function(e) {
	this._interval.stop();
	this._interval = new haxe.Timer(3000);
	this._interval.run = $closure(this,"goIdle");
	haxe.Log.trace(e.clientX + ", " + e.screenX,{ fileName : "RCMouse.hx", lineNumber : 157, className : "RCMouse", methodName : "mouseMoveHandler"});
	if(this._is_idle) this.resumeIdle();
	var position = this.getPosition(e);
	if(this._last_position == _RCMouse.Position.middle && position != _RCMouse.Position.middle) this.onMiddleOut();
	if(this._last_position != position) {
		this._last_position = position;
		this.dispatchPosition(position);
	}
}
RCMouse.prototype.clickHandler = function(e) {
	switch( (this.getPosition(e))[1] ) {
	case 0:
		this.onClickLeft();
		this.onClick();
		break;
	case 2:
		this.onClickRight();
		this.onClick();
		break;
	case 1:
		this.onClickMiddle();
		this.onClick();
		break;
	case 3:
		return;
	case 4:
		return;
	}
}
RCMouse.prototype.doubleClickHandler = function(e) {
	this.onDoubleClick();
}
RCMouse.prototype.dispatchPosition = function(position) {
	switch( (position)[1] ) {
	case 0:
		this.onLeft();
		break;
	case 1:
		this.onMiddle();
		break;
	case 2:
		this.onRight();
		break;
	case 3:
		this.mouseOutHandler(null);
		break;
	case 4:
		null;
		break;
	}
}
RCMouse.prototype.refresh = function() {
	this.mouseMoveHandler(null);
}
RCMouse.prototype.setMiddleWidth = function(w) {
	this._w = w;
}
RCMouse.prototype.getPosition = function(e) {
	haxe.Log.trace([e.clientX,this._target.offsetLeft,this._target.offsetWidth],{ fileName : "RCMouse.hx", lineNumber : 225, className : "RCMouse", methodName : "getPosition"});
	if(e.clientX > this._target.offsetLeft && e.clientX < this._target.offsetLeft + this._target.offsetWidth && e.clientY > this._target.offsetTop && e.clientY < this._target.offsetTop + this._target.offsetHeight) {
		var realX = e.clientX - this._target.offsetLeft;
		if(realX < (this._target.offsetWidth - this._w) / 2) return _RCMouse.Position.left; else if(realX > (this._target.offsetWidth - this._w) / 2 + this._w) return _RCMouse.Position.right; else return _RCMouse.Position.middle;
	}
	return _RCMouse.Position.outside;
}
RCMouse.prototype.goIdle = function() {
	this._interval.stop();
	this._is_idle = true;
	this.onIdle();
}
RCMouse.prototype.resumeIdle = function() {
	this._is_idle = false;
	this.onResume();
}
RCMouse.prototype.destroy = function() {
	this.hold();
	this.mouseOutHandler(null);
}
RCMouse.prototype.__class__ = RCMouse;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
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
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
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
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
if(typeof haxe=='undefined') haxe = {}
haxe.Serializer = function(p) {
	if( p === $_ ) return;
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
}
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype.buf = null;
haxe.Serializer.prototype.cache = null;
haxe.Serializer.prototype.shash = null;
haxe.Serializer.prototype.scount = null;
haxe.Serializer.prototype.useCache = null;
haxe.Serializer.prototype.useEnumIndex = null;
haxe.Serializer.prototype.toString = function() {
	return this.buf.b.join("");
}
haxe.Serializer.prototype.serializeString = function(s) {
	var x = this.shash.get(s);
	if(x != null) {
		this.buf.add("R");
		this.buf.add(x);
		return;
	}
	this.shash.set(s,this.scount++);
	this.buf.add("y");
	s = StringTools.urlEncode(s);
	this.buf.add(s.length);
	this.buf.add(":");
	this.buf.add(s);
}
haxe.Serializer.prototype.serializeRef = function(v) {
	var vt = typeof(v);
	var _g1 = 0, _g = this.cache.length;
	while(_g1 < _g) {
		var i = _g1++;
		var ci = this.cache[i];
		if(typeof(ci) == vt && ci == v) {
			this.buf.add("r");
			this.buf.add(i);
			return true;
		}
	}
	this.cache.push(v);
	return false;
}
haxe.Serializer.prototype.serializeFields = function(v) {
	var _g = 0, _g1 = Reflect.fields(v);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		this.serializeString(f);
		this.serialize(Reflect.field(v,f));
	}
	this.buf.add("g");
}
haxe.Serializer.prototype.serialize = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		this.buf.add("n");
		break;
	case 1:
		if(v == 0) {
			this.buf.add("z");
			return;
		}
		this.buf.add("i");
		this.buf.add(v);
		break;
	case 2:
		if(Math.isNaN(v)) this.buf.add("k"); else if(!Math.isFinite(v)) this.buf.add(v < 0?"m":"p"); else {
			this.buf.add("d");
			this.buf.add(v);
		}
		break;
	case 3:
		this.buf.add(v?"t":"f");
		break;
	case 6:
		var c = $e[2];
		if(c == String) {
			this.serializeString(v);
			return;
		}
		if(this.useCache && this.serializeRef(v)) return;
		switch(c) {
		case Array:
			var ucount = 0;
			this.buf.add("a");
			var l = v["length"];
			var _g = 0;
			while(_g < l) {
				var i = _g++;
				if(v[i] == null) ucount++; else {
					if(ucount > 0) {
						if(ucount == 1) this.buf.add("n"); else {
							this.buf.add("u");
							this.buf.add(ucount);
						}
						ucount = 0;
					}
					this.serialize(v[i]);
				}
			}
			if(ucount > 0) {
				if(ucount == 1) this.buf.add("n"); else {
					this.buf.add("u");
					this.buf.add(ucount);
				}
			}
			this.buf.add("h");
			break;
		case List:
			this.buf.add("l");
			var v1 = v;
			var $it0 = v1.iterator();
			while( $it0.hasNext() ) {
				var i = $it0.next();
				this.serialize(i);
			}
			this.buf.add("h");
			break;
		case Date:
			var d = v;
			this.buf.add("v");
			this.buf.add(d.toString());
			break;
		case Hash:
			this.buf.add("b");
			var v1 = v;
			var $it1 = v1.keys();
			while( $it1.hasNext() ) {
				var k = $it1.next();
				this.serializeString(k);
				this.serialize(v1.get(k));
			}
			this.buf.add("h");
			break;
		case IntHash:
			this.buf.add("q");
			var v1 = v;
			var $it2 = v1.keys();
			while( $it2.hasNext() ) {
				var k = $it2.next();
				this.buf.add(":");
				this.buf.add(k);
				this.serialize(v1.get(k));
			}
			this.buf.add("h");
			break;
		case haxe.io.Bytes:
			var v1 = v;
			var i = 0;
			var max = v1.length - 2;
			var chars = "";
			var b64 = haxe.Serializer.BASE64;
			while(i < max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				var b3 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt((b2 << 2 | b3 >> 6) & 63) + b64.charAt(b3 & 63);
			}
			if(i == max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt(b2 << 2 & 63);
			} else if(i == max + 1) {
				var b1 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt(b1 << 4 & 63);
			}
			this.buf.add("s");
			this.buf.add(chars.length);
			this.buf.add(":");
			this.buf.add(chars);
			break;
		default:
			this.cache.pop();
			if(v.hxSerialize != null) {
				this.buf.add("C");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				v.hxSerialize(this);
				this.buf.add("g");
			} else {
				this.buf.add("c");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				this.serializeFields(v);
			}
		}
		break;
	case 4:
		if(this.useCache && this.serializeRef(v)) return;
		this.buf.add("o");
		this.serializeFields(v);
		break;
	case 7:
		var e = $e[2];
		if(this.useCache && this.serializeRef(v)) return;
		this.cache.pop();
		this.buf.add(this.useEnumIndex?"j":"w");
		this.serializeString(Type.getEnumName(e));
		if(this.useEnumIndex) {
			this.buf.add(":");
			this.buf.add(v[1]);
		} else this.serializeString(v[0]);
		this.buf.add(":");
		var l = v["length"];
		this.buf.add(l - 2);
		var _g = 2;
		while(_g < l) {
			var i = _g++;
			this.serialize(v[i]);
		}
		this.cache.push(v);
		break;
	case 5:
		throw "Cannot serialize function";
		break;
	default:
		throw "Cannot serialize " + Std.string(v);
	}
}
haxe.Serializer.prototype.serializeException = function(e) {
	this.buf.add("x");
	this.serialize(e);
}
haxe.Serializer.prototype.__class__ = haxe.Serializer;
RCGradient = function(colors,alphas,linear) {
	if( colors === $_ ) return;
	if(linear == null) linear = true;
	this.gradientColors = colors;
	this.gradientAlphas = alphas == null?[1.0,1.0]:alphas;
	this.gradientRatios = [0,255];
	this.focalPointRatio = 0;
	this.tx = 0;
	this.ty = 0;
	this.matrixRotation = Math.PI * 0.5;
}
RCGradient.__name__ = ["RCGradient"];
RCGradient.prototype.borderColor = null;
RCGradient.prototype.gradientColors = null;
RCGradient.prototype.gradientAlphas = null;
RCGradient.prototype.gradientRatios = null;
RCGradient.prototype.spreadMethod = null;
RCGradient.prototype.interpolationMethod = null;
RCGradient.prototype.gradientType = null;
RCGradient.prototype.focalPointRatio = null;
RCGradient.prototype.tx = null;
RCGradient.prototype.ty = null;
RCGradient.prototype.matrixRotation = null;
RCGradient.prototype.__class__ = RCGradient;
RCColor = function(fillColor,strokeColor,a) {
	if( fillColor === $_ ) return;
	this.strokeColor = strokeColor;
	this.fillColor = fillColor;
	this.alpha = a == null?1.0:a;
	this.redComponent = (fillColor >> 16 & 255) / 255;
	this.greenComponent = (fillColor >> 8 & 255) / 255;
	this.blueComponent = (fillColor & 255) / 255;
	this.fillColorStyle = RCColor.HEXtoString(fillColor);
	this.strokeColorStyle = RCColor.HEXtoString(strokeColor);
}
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
RCColor.colorWithFillAndStroke = function(fillColor,borderColor) {
	return new RCColor(fillColor,borderColor);
}
RCColor.HEXtoString = function(color) {
	return "#" + StringTools.lpad(StringTools.hex(color),"0",6);
}
RCColor.RGBtoHEX = function(r,g,b) {
	return Math.round(r * 255) << 16 | Math.round(g * 255) << 8 | Math.round(b * 255);
}
RCColor.prototype.fillColor = null;
RCColor.prototype.strokeColor = null;
RCColor.prototype.fillColorStyle = null;
RCColor.prototype.strokeColorStyle = null;
RCColor.prototype.redComponent = null;
RCColor.prototype.greenComponent = null;
RCColor.prototype.blueComponent = null;
RCColor.prototype.alpha = null;
RCColor.prototype.__class__ = RCColor;
if(typeof js=='undefined') js = {}
js.Cookie = function() { }
js.Cookie.__name__ = ["js","Cookie"];
js.Cookie.set = function(name,value,expireDelay,path,domain) {
	var s = name + "=" + StringTools.urlEncode(value);
	if(expireDelay != null) {
		var d = DateTools.delta(Date.now(),expireDelay * 1000);
		s += ";expires=" + d.toGMTString();
	}
	if(path != null) s += ";path=" + path;
	if(domain != null) s += ";domain=" + domain;
	js.Lib.document.cookie = s;
}
js.Cookie.all = function() {
	var h = new Hash();
	var a = js.Lib.document.cookie.split(";");
	var _g = 0;
	while(_g < a.length) {
		var e = a[_g];
		++_g;
		e = StringTools.ltrim(e);
		var t = e.split("=");
		if(t.length < 2) continue;
		h.set(t[0],StringTools.urlDecode(t[1]));
	}
	return h;
}
js.Cookie.get = function(name) {
	return js.Cookie.all().get(name);
}
js.Cookie.exists = function(name) {
	return js.Cookie.all().exists(name);
}
js.Cookie.remove = function(name,path,domain) {
	js.Cookie.set(name,"",-10,path,domain);
}
js.Cookie.prototype.__class__ = js.Cookie;
RCSignal = function(p) {
	if( p === $_ ) return;
	this.removeAll();
}
RCSignal.__name__ = ["RCSignal"];
RCSignal.prototype.listeners = null;
RCSignal.prototype.exposableListener = null;
RCSignal.prototype.add = function(listener) {
	this.listeners.add(listener);
}
RCSignal.prototype.addOnce = function(listener) {
	this.exposableListener = listener;
}
RCSignal.prototype.remove = function(listener) {
	var $it0 = this.listeners.iterator();
	while( $it0.hasNext() ) {
		var l = $it0.next();
		if(Reflect.compareMethods(l,listener)) {
			this.listeners.remove(listener);
			return;
		}
	}
	if(Reflect.compareMethods(this.exposableListener,listener)) this.exposableListener = null;
}
RCSignal.prototype.removeAll = function() {
	this.listeners = new List();
	this.exposableListener = null;
}
RCSignal.prototype.dispatch = function(args,pos) {
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
RCSignal.prototype.callMethod = function(listener,args,pos) {
	try {
		listener.apply(null,args);
	} catch( e ) {
		haxe.Log.trace("[RCSignal error: " + Std.string(pos) + "]",{ fileName : "RCSignal.hx", lineNumber : 51, className : "RCSignal", methodName : "callMethod"});
	}
}
RCSignal.prototype.exists = function(listener) {
	return false;
}
RCSignal.prototype.destroy = function() {
	this.listeners = null;
	this.exposableListener = null;
}
RCSignal.prototype.__class__ = RCSignal;
EVFullScreen = function(p) {
	if( p === $_ ) return;
	RCSignal.call(this);
}
EVFullScreen.__name__ = ["EVFullScreen"];
EVFullScreen.__super__ = RCSignal;
for(var k in RCSignal.prototype ) EVFullScreen.prototype[k] = RCSignal.prototype[k];
EVFullScreen.prototype.__class__ = EVFullScreen;
JSView = function(x,y) {
	if( x === $_ ) return;
	this.size = new RCSize(0,0);
	this.scaleX_ = 1;
	this.scaleY_ = 1;
	this.alpha_ = 1;
	this.view = js.Lib.document.createElement("div");
	this.view.style.position = "absolute";
	this.view.style.paddingTop = "0px";
	this.view.style.paddingLeft = "0px";
	this.setX(x);
	this.setY(y);
}
JSView.__name__ = ["JSView"];
JSView.COL = function(color) {
	return "rgb(" + (color >> 16) + "," + (color >> 8 & 255) + "," + (color & 255) + ")";
}
JSView.prototype.parent = null;
JSView.prototype.view = null;
JSView.prototype.size = null;
JSView.prototype.center = null;
JSView.prototype.clipsToBounds = null;
JSView.prototype.backgroundColor = null;
JSView.prototype.x = null;
JSView.prototype.y = null;
JSView.prototype.scaleX = null;
JSView.prototype.scaleY = null;
JSView.prototype.width = null;
JSView.prototype.height = null;
JSView.prototype.alpha = null;
JSView.prototype.visible = null;
JSView.prototype.viewMask = null;
JSView.prototype.lastW = null;
JSView.prototype.lastH = null;
JSView.prototype.scaleX_ = null;
JSView.prototype.scaleY_ = null;
JSView.prototype.alpha_ = null;
JSView.prototype.caobj = null;
JSView.prototype.graphics = null;
JSView.prototype.viewWillAppear = function() {
}
JSView.prototype.viewWillDisappear = function() {
}
JSView.prototype.viewDidAppear = function() {
}
JSView.prototype.viewDidDisappear = function() {
}
JSView.prototype.viewWillAppearHandler = function() {
	this.viewWillAppear();
}
JSView.prototype.viewWillDisappearHandler = function() {
	this.viewWillDisappear();
}
JSView.prototype.viewDidAppearHandler = function() {
	this.viewDidAppear();
}
JSView.prototype.viewDidDisappearHandler = function() {
	this.viewDidDisappear();
}
JSView.prototype.addChild = function(child) {
	if(child == null) return;
	child.viewWillAppearHandler();
	child.parent = this.view;
	this.view.appendChild(child.view);
	child.viewDidAppearHandler();
}
JSView.prototype.removeChild = function(child) {
	if(child == null) return;
	child.viewWillDisappearHandler();
	child.parent = null;
	this.view.removeChild(child.view);
	child.viewDidDisappearHandler();
}
JSView.prototype.setBackgroundColor = function(color) {
	if(color == null) {
		this.view.style.background = null;
		return color;
	}
	var red = (color & 16711680) >> 16;
	var green = (color & 65280) >> 8;
	var blue = color & 255;
	var alpha = 1;
	var color_ = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
	this.view.style.background = color_;
	return color;
}
JSView.prototype.setCenter = function(pos) {
	this.center = pos;
	this.setX(Std["int"](pos.x - this.size.width / 2));
	this.setY(Std["int"](pos.y - this.size.height / 2));
	return this.center;
}
JSView.prototype.setClipsToBounds = function(clip) {
	if(clip) {
		this.view.style.overflow = "hidden";
		this.viewMask = js.Lib.document.createElement("div");
		this.viewMask.style.width = this.size.width + "px";
		this.viewMask.style.height = this.size.height + "px";
		while(this.view.hasChildNodes()) this.viewMask.appendChild(this.view.removeChild(this.view.firstChild));
		this.view.appendChild(this.viewMask);
	} else {
		this.view.style.overflow = null;
		this.view.removeChild(this.viewMask);
		while(this.viewMask.hasChildNodes()) this.view.appendChild(this.viewMask.removeChild(this.viewMask.firstChild));
		this.viewMask = this.view;
	}
	return clip;
}
JSView.prototype.scaleToFit = function(w,h) {
	if(this.size.width / w > this.size.height / h && this.size.width > w) {
		this.setWidth(w);
		this.setHeight(this.getWidth() * this.size.height / this.size.width);
	} else if(this.size.height > h) {
		this.setHeight(h);
		this.setWidth(this.getHeight() * this.size.width / this.size.height);
	} else if(this.size.width > this.lastW && this.size.height > this.lastH) {
		this.setWidth(this.size.width);
		this.setHeight(this.size.height);
	} else this.resetScale();
	this.lastW = this.getWidth();
	this.lastH = this.getHeight();
}
JSView.prototype.scaleToFill = function(w,h) {
	if(w / this.size.width > h / this.size.height) {
		this.setWidth(w);
		this.setHeight(this.getWidth() * this.size.height / this.size.width);
	} else {
		this.setHeight(h);
		this.setWidth(this.getHeight() * this.size.width / this.size.height);
	}
}
JSView.prototype.resetScale = function() {
	this.setWidth(this.lastW);
	this.setHeight(this.lastH);
}
JSView.prototype.animate = function(obj) {
	CoreAnimation.add(this.caobj = obj);
}
JSView.prototype.destroy = function() {
	CoreAnimation.remove(this.caobj);
}
JSView.prototype.removeFromSuperView = function() {
	if(this.parent != null) this.parent.removeChild(this.view);
}
JSView.prototype.setVisible = function(v) {
	this.visible = v;
	this.view.style.visibility = v?"visible":"hidden";
	return v;
}
JSView.prototype.setAlpha = function(a) {
	this.alpha_ = a;
	this.view.style.opacity = Std.string(a);
	return a;
}
JSView.prototype.setX = function(x) {
	this.x = x;
	this.view.style.left = Std.string(x) + "px";
	return x;
}
JSView.prototype.setY = function(y) {
	this.y = y;
	this.view.style.top = Std.string(y) + "px";
	return y;
}
JSView.prototype.getWidth = function() {
	if(this.parent == null) haxe.Log.trace("This view doesn't have a parent, the width would be 0",{ fileName : "JSView.hx", lineNumber : 225, className : "JSView", methodName : "getWidth"});
	return this.view.offsetWidth;
	return this.view.scrollWidth;
	return this.view.clientWidth;
}
JSView.prototype.setWidth = function(w) {
	this.width = w;
	this.view.style.width = w + "px";
	return w;
}
JSView.prototype.getHeight = function() {
	if(this.parent == null) haxe.Log.trace("This view doesn't have a parent, the height would be 0",{ fileName : "JSView.hx", lineNumber : 236, className : "JSView", methodName : "getHeight"});
	return this.view.offsetHeight;
	return this.view.scrollHeight;
	return this.view.clientHeight;
}
JSView.prototype.setHeight = function(h) {
	this.height = h;
	this.view.style.height = h + "px";
	return h;
}
JSView.prototype.setScaleX = function(sx) {
	this.scaleX_ = this.scaleX = sx;
	this.scale(this.scaleX_,this.scaleY_);
	return this.scaleX_;
}
JSView.prototype.setScaleY = function(sy) {
	this.scaleY_ = this.scaleY = sy;
	this.scale(this.scaleX_,this.scaleY_);
	return this.scaleY_;
}
JSView.prototype.scale = function(sx,sy) {
	this.view.style.WebkitTransformOrigin = "top left";
	this.view.style.WebkitTransform = "scale(" + sx + "," + sy + ")";
}
JSView.prototype.clear = function() {
	this.graphics.clearRect(0,0,this.graphics.canvas.width,this.graphics.canvas.height);
}
JSView.prototype.lineStyle = function(width,color) {
	if(width == null) return;
	this.graphics.lineWidth = width;
	this.graphics.strokeStyle = "rgb(" + (color >> 16) + "," + (color >> 8 & 255) + "," + (color & 255) + ")";
}
JSView.prototype.beginFill = function(color,alpha) {
	this.graphics.fillStyle = "rgb(" + (color >> 16) + "," + (color >> 8 & 255) + "," + (color & 255) + ")";
	this.graphics.beginPath();
}
JSView.prototype.endFill = function() {
	this.graphics.fill();
	this.graphics.stroke();
}
JSView.prototype.drawCircle = function(x,y,radius) {
	this.graphics.arc(x,y,radius,0,6.29,true);
}
JSView.prototype.drawRect = function(x,y,w,h) {
	this.graphics.rect(x,y,w,h);
}
JSView.prototype.moveTo = function(x,y) {
	this.graphics.moveTo(x,y);
}
JSView.prototype.lineTo = function(x,y) {
	this.graphics.lineTo(x,y);
}
JSView.prototype.__class__ = JSView;
RCControl = function(x,y) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.configureDispatchers();
	this.setEnabled(true);
	this.setState(RCControlState.NORMAL);
}
RCControl.__name__ = ["RCControl"];
RCControl.__super__ = JSView;
for(var k in JSView.prototype ) RCControl.prototype[k] = JSView.prototype[k];
RCControl.prototype.click = null;
RCControl.prototype.press = null;
RCControl.prototype.release = null;
RCControl.prototype.over = null;
RCControl.prototype.out = null;
RCControl.prototype.valueChanged = null;
RCControl.prototype.editingDidBegin = null;
RCControl.prototype.editingChanged = null;
RCControl.prototype.editingDidEnd = null;
RCControl.prototype.editingDidEndOnExit = null;
RCControl.prototype.enabled = null;
RCControl.prototype.highlighted = null;
RCControl.prototype.selected = null;
RCControl.prototype.enabled_ = null;
RCControl.prototype.state_ = null;
RCControl.prototype.onClick = function() {
}
RCControl.prototype.onPress = function() {
}
RCControl.prototype.onRelease = function() {
}
RCControl.prototype.onOver = function() {
}
RCControl.prototype.onOut = function() {
}
RCControl.prototype.configureListeners = function(dispatcher) {
	this.view.onmousedown = $closure(this,"mouseDownHandler");
	this.view.onmouseup = $closure(this,"mouseUpHandler");
	this.view.onmouseover = $closure(this,"rollOverHandler");
	this.view.onmouseout = $closure(this,"rollOutHandler");
	this.view.onclick = $closure(this,"clickHandler");
}
RCControl.prototype.removeListeners = function(dispatcher) {
	this.view.onmousedown = null;
	this.view.onmouseup = null;
	this.view.onmouseover = null;
	this.view.onmouseout = null;
	this.view.onclick = null;
}
RCControl.prototype.configureDispatchers = function() {
	this.click = new RCSignal();
	this.press = new RCSignal();
	this.release = new RCSignal();
	this.over = new RCSignal();
	this.out = new RCSignal();
}
RCControl.prototype.mouseDownHandler = function(e) {
	this.setState(RCControlState.SELECTED);
	this.onPress();
}
RCControl.prototype.mouseUpHandler = function(e) {
	this.setState(RCControlState.HIGHLIGHTED);
	this.onRelease();
}
RCControl.prototype.rollOverHandler = function(e) {
	this.setState(RCControlState.HIGHLIGHTED);
	this.onOver();
}
RCControl.prototype.rollOutHandler = function(e) {
	this.setState(RCControlState.NORMAL);
	this.onOut();
}
RCControl.prototype.clickHandler = function(e) {
	haxe.Log.trace("click",{ fileName : "RCControl.hx", lineNumber : 143, className : "RCControl", methodName : "clickHandler"});
	this.onClick();
}
RCControl.prototype.setState = function(state) {
	this.state_ = state;
}
RCControl.prototype.getSelected = function() {
	return this.state_ == RCControlState.SELECTED;
}
RCControl.prototype.getEnabled = function() {
	return this.enabled_;
}
RCControl.prototype.setEnabled = function(c) {
	this.enabled_ = c;
	if(this.enabled_) this.configureListeners(this); else this.removeListeners(this);
	return this.enabled_;
}
RCControl.prototype.getHighlighted = function() {
	return this.state_ == RCControlState.HIGHLIGHTED;
}
RCControl.prototype.lock = function() {
	this.setEnabled(false);
}
RCControl.prototype.unlock = function() {
	this.setEnabled(true);
}
RCControl.prototype.destroy = function() {
	this.removeListeners(this);
	JSView.prototype.destroy.call(this);
}
RCControl.prototype.__class__ = RCControl;
RCButton = function(x,y,skin) {
	if( x === $_ ) return;
	this.skin = skin;
	this.skin.hit.setAlpha(0);
	this.fixSkin();
	RCControl.call(this,x,y);
}
RCButton.__name__ = ["RCButton"];
RCButton.__super__ = RCControl;
for(var k in RCControl.prototype ) RCButton.prototype[k] = RCControl.prototype[k];
RCButton.prototype.skin = null;
RCButton.prototype.toggable_ = null;
RCButton.prototype.setTitle = function(title,state) {
}
RCButton.prototype.setTitleColor = function(color,state) {
}
RCButton.prototype.currentTitle = null;
RCButton.prototype.currentTitleColor = null;
RCButton.prototype.currentImage = null;
RCButton.prototype.currentBackground = null;
RCButton.prototype.setState = function(state) {
	if(this.state_ == state) return;
	if(this.currentBackground != null) this.currentBackground.removeFromSuperView();
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
	RCControl.prototype.setState.call(this,state);
}
RCButton.prototype.fixSkin = function() {
	if(this.skin.highlighted.background == null) this.skin.highlighted.background = this.skin.normal.background;
	if(this.skin.highlighted.label == null) this.skin.highlighted.label = this.skin.normal.label;
	if(this.skin.highlighted.image == null) this.skin.highlighted.image = this.skin.normal.image;
	if(this.skin.highlighted.otherView == null) this.skin.highlighted.otherView = this.skin.normal.otherView;
	if(this.skin.selected.background == null) this.skin.selected.background = this.skin.highlighted.background;
	if(this.skin.selected.label == null) this.skin.selected.label = this.skin.highlighted.label;
	if(this.skin.selected.image == null) this.skin.selected.image = this.skin.highlighted.image;
	if(this.skin.selected.otherView == null) this.skin.selected.otherView = this.skin.highlighted.otherView;
	if(this.skin.disabled.background == null) this.skin.disabled.background = this.skin.normal.background;
	if(this.skin.disabled.label == null) this.skin.disabled.label = this.skin.normal.label;
	if(this.skin.disabled.image == null) this.skin.disabled.image = this.skin.normal.image;
	if(this.skin.disabled.otherView == null) this.skin.disabled.otherView = this.skin.normal.otherView;
}
RCButton.prototype.setObjectColor = function(obj,color) {
	if(obj == null || color == null) return;
}
RCButton.prototype.setObjectBrightness = function(obj,brightness) {
}
RCButton.prototype.__class__ = RCButton;
RCTextView = function(x,y,w,h,str,properties) {
	if( x === $_ ) return;
	JSView.call(this,Math.round(x),Math.round(y));
	this.size.width = w;
	this.size.height = h;
	this.setWidth(w);
	this.setHeight(h);
	this.init(properties);
	this.setText(str);
}
RCTextView.__name__ = ["RCTextView"];
RCTextView.__super__ = JSView;
for(var k in JSView.prototype ) RCTextView.prototype[k] = JSView.prototype[k];
RCTextView.prototype.target = null;
RCTextView.prototype.properties = null;
RCTextView.prototype.text = null;
RCTextView.prototype.init = function(properties) {
	this.properties = properties;
	this.redraw();
}
RCTextView.prototype.redraw = function() {
	var wrap = this.size.width != null;
	var multiline = this.size.height != 0;
	this.view.style.whiteSpace = wrap?"normal":"nowrap";
	this.view.style.wordWrap = wrap?"break-word":"normal";
	var style = this.properties.selectable?"text":"none";
	this.view.style.WebkitUserSelect = style;
	this.view.style.MozUserSelect = style;
	this.view.style.lineHeight = this.properties.leading + this.properties.size + "px";
	this.view.style.fontFamily = this.properties.font;
	this.view.style.fontSize = this.properties.size + "px";
	this.view.style.fontWeight = this.properties.bold?"bold":"normal";
	this.view.style.fontStyle = this.properties.italic?"italic":"normal";
	this.view.style.letterSpacing = this.properties.letterSpacing + "px";
	this.view.style.textAlign = this.properties.align;
	if(this.properties.autoSize) {
		this.view.style.width = multiline?this.size.width + "px":"auto";
		this.view.style.height = "auto";
	} else {
		this.view.style.width = this.size.width + "px";
		this.view.style.height = this.size.height + "px";
	}
	this.view.innerHTML = "";
	this.view.style.color = RCColor.HEXtoString(this.properties.color);
	this.view.style.fontFamily = this.properties.font;
	this.view.style.fontWeight = this.properties.bold;
	this.view.style.fontSize = this.properties.size;
	this.view.style.fontStyle = this.properties.style;
	if(this.size.width != null) this.setWidth(this.size.width);
	this.view.style.textAlign = this.properties.align;
}
RCTextView.prototype.getText = function() {
	return this.view.innerHTML;
}
RCTextView.prototype.setText = function(str) {
	if(this.properties.html) this.view.innerHTML = str; else this.view.innerHTML = str;
	return str;
}
RCTextView.prototype.wheelHandler = function(e) {
}
RCTextView.prototype.destroy = function() {
	this.target = null;
	JSView.prototype.destroy.call(this);
}
RCTextView.prototype.__class__ = RCTextView;
RCSize = function(w,h) {
	if( w === $_ ) return;
	this.width = w;
	this.height = h;
}
RCSize.__name__ = ["RCSize"];
RCSize.prototype.width = null;
RCSize.prototype.height = null;
RCSize.prototype.__class__ = RCSize;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
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
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
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
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
CASequence = function(objs) {
	if( objs === $_ ) return;
	this.objs = objs;
}
CASequence.__name__ = ["CASequence"];
CASequence.prototype.objs = null;
CASequence.prototype.start = function() {
	var obj = this.objs.shift();
	if(this.objs.length > 0) {
		var arguments = obj.delegate.animationDidStop;
		obj.delegate.animationDidStop = $closure(this,"animationDidStop");
		obj.delegate.arguments = [arguments];
	}
	CoreAnimation.add(obj);
}
CASequence.prototype.animationDidStop = function(func) {
	if(func != null) {
		if(Reflect.isFunction(func)) try {
			func.apply(null,[]);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CASequence.hx", lineNumber : 31, className : "CASequence", methodName : "animationDidStop"});
		}
	}
	if(this.objs.length > 0) this.start();
}
CASequence.prototype.__class__ = CASequence;
RCPoint = function(x,y) {
	if( x === $_ ) return;
	this.x = x;
	this.y = y;
}
RCPoint.__name__ = ["RCPoint"];
RCPoint.prototype.x = null;
RCPoint.prototype.y = null;
RCPoint.prototype.__class__ = RCPoint;
if(typeof caequations=='undefined') caequations = {}
caequations.Linear = function() { }
caequations.Linear.__name__ = ["caequations","Linear"];
caequations.Linear.NONE = function(t,b,c,d,p_params) {
	return c * t / d + b;
}
caequations.Linear.prototype.__class__ = caequations.Linear;
CoreAnimation = function() { }
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
		CoreAnimation.ticker = new haxe.Timer(10);
		CoreAnimation.ticker.run = CoreAnimation.updateAnimations;
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
		CoreAnimation.ticker.stop();
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
CoreAnimation.prototype.__class__ = CoreAnimation;
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return haxe.Stack.makeStack("$s");
}
haxe.Stack.exceptionStack = function() {
	return haxe.Stack.makeStack("$e");
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from " == null?"null":"\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b[b.b.length] = "a C function" == null?"null":"a C function";
		break;
	case 1:
		var m = $e[2];
		b.b[b.b.length] = "module " == null?"null":"module ";
		b.b[b.b.length] = m == null?"null":m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (" == null?"null":" (";
		}
		b.b[b.b.length] = file == null?"null":file;
		b.b[b.b.length] = " line " == null?"null":" line ";
		b.b[b.b.length] = line == null?"null":line;
		if(s1 != null) b.b[b.b.length] = ")" == null?"null":")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname == null?"null":cname;
		b.b[b.b.length] = "." == null?"null":".";
		b.b[b.b.length] = meth == null?"null":meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #" == null?"null":"local function #";
		b.b[b.b.length] = n == null?"null":n;
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		} catch( e ) {
			$r = [];
		}
		return $r;
	}(this));
	var m = new Array();
	var _g1 = 0, _g = a.length - (s == "$s"?2:0);
	while(_g1 < _g) {
		var i = _g1++;
		var d = a[i].split("::");
		m.unshift(haxe.StackItem.Method(d[0],d[1]));
	}
	return m;
}
haxe.Stack.prototype.__class__ = haxe.Stack;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
RCPhoto = function(x,y,URL) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.load(URL);
	this.addListeners();
}
RCPhoto.__name__ = ["RCPhoto"];
RCPhoto.__super__ = JSView;
for(var k in JSView.prototype ) RCPhoto.prototype[k] = JSView.prototype[k];
RCPhoto.prototype.loader = null;
RCPhoto.prototype.isLoaded = null;
RCPhoto.prototype.percentLoaded = null;
RCPhoto.prototype.errorMessage = null;
RCPhoto.prototype.onComplete = function() {
}
RCPhoto.prototype.onProgress = function() {
}
RCPhoto.prototype.onError = function() {
}
RCPhoto.prototype.load = function(URL) {
	this.isLoaded = false;
	this.percentLoaded = 0;
	this.loader = js.Lib.document.createElement("img");
	this.loader.src = URL;
}
RCPhoto.prototype.completeHandler = function(e) {
	this.size.width = this.lastW = this.setWidth(this.loader.width);
	this.size.height = this.lastH = this.setHeight(this.loader.height);
	this.isLoaded = true;
	this.view.appendChild(this.loader);
	this.onComplete();
}
RCPhoto.prototype.errorHandler = function(e) {
	this.errorMessage = Std.string(e);
	this.onError();
}
RCPhoto.prototype.ioErrorHandler = function(e) {
	this.errorMessage = Std.string(e);
	this.onError();
}
RCPhoto.prototype.addListeners = function() {
	this.loader.onload = $closure(this,"completeHandler");
	this.loader.onerror = $closure(this,"errorHandler");
}
RCPhoto.prototype.removeListeners = function() {
	this.loader.onload = null;
	this.loader.onerror = null;
}
RCPhoto.prototype.destroy = function() {
	this.removeListeners();
	this.loader = null;
}
RCPhoto.prototype.scaleToFit = function(w,h) {
	JSView.prototype.scaleToFit.call(this,w,h);
	this.loader.style.width = this.getWidth() + "px";
	this.loader.style.height = this.getHeight() + "px";
}
RCPhoto.prototype.scaleToFill = function(w,h) {
	JSView.prototype.scaleToFill.call(this,w,h);
	this.loader.style.width = this.getWidth() + "px";
	this.loader.style.height = this.getHeight() + "px";
}
RCPhoto.prototype.__class__ = RCPhoto;
RCDrawInterface = function() { }
RCDrawInterface.__name__ = ["RCDrawInterface"];
RCDrawInterface.prototype.configure = null;
RCDrawInterface.prototype.redraw = null;
RCDrawInterface.prototype.__class__ = RCDrawInterface;
CADelegate = function(p) {
	if( p === $_ ) return;
	this.startPointPassed = false;
	this.kenBurnsPointInPassed = false;
	this.kenBurnsPointOutPassed = false;
}
CADelegate.__name__ = ["CADelegate"];
CADelegate.prototype.animationDidStart = null;
CADelegate.prototype.animationDidStop = null;
CADelegate.prototype.animationDidReversed = null;
CADelegate.prototype.arguments = null;
CADelegate.prototype.kenBurnsDidFadedIn = null;
CADelegate.prototype.kenBurnsBeginsFadingOut = null;
CADelegate.prototype.kenBurnsArgs = null;
CADelegate.prototype.startPointPassed = null;
CADelegate.prototype.kenBurnsPointInPassed = null;
CADelegate.prototype.kenBurnsPointOutPassed = null;
CADelegate.prototype.kenBurnsPointIn = null;
CADelegate.prototype.kenBurnsPointOut = null;
CADelegate.prototype.pos = null;
CADelegate.prototype.start = function() {
	this.startPointPassed = true;
	if(Reflect.isFunction(this.animationDidStart)) try {
		this.animationDidStart.apply(null,this.arguments);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 36, className : "CADelegate", methodName : "start"});
	}
}
CADelegate.prototype.stop = function() {
	if(Reflect.isFunction(this.animationDidStop)) try {
		this.animationDidStop.apply(null,this.arguments);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 42, className : "CADelegate", methodName : "stop"});
		haxe.Log.trace(this.pos.className + " -> " + this.pos.methodName + " -> " + this.pos.lineNumber,{ fileName : "CADelegate.hx", lineNumber : 43, className : "CADelegate", methodName : "stop"});
		var stack = haxe.Stack.exceptionStack();
		haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "CADelegate.hx", lineNumber : 45, className : "CADelegate", methodName : "stop"});
	}
}
CADelegate.prototype.repeat = function() {
	if(Reflect.isFunction(this.animationDidReversed)) try {
		this.animationDidReversed.apply(null,this.arguments);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 52, className : "CADelegate", methodName : "repeat"});
	}
}
CADelegate.prototype.kbIn = function() {
	this.kenBurnsPointInPassed = true;
	if(Reflect.isFunction(this.kenBurnsDidFadedIn)) try {
		this.kenBurnsDidFadedIn.apply(null,this.kenBurnsArgs);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 58, className : "CADelegate", methodName : "kbIn"});
	}
}
CADelegate.prototype.kbOut = function() {
	this.kenBurnsPointOutPassed = true;
	if(Reflect.isFunction(this.kenBurnsBeginsFadingOut)) try {
		this.kenBurnsBeginsFadingOut.apply(null,this.kenBurnsArgs);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 64, className : "CADelegate", methodName : "kbOut"});
	}
}
CADelegate.prototype.__class__ = CADelegate;
RCRect = function(x,y,w,h) {
	if( x === $_ ) return;
	this.origin = new RCPoint(x,y);
	this.size = new RCSize(w,h);
}
RCRect.__name__ = ["RCRect"];
RCRect.prototype.origin = null;
RCRect.prototype.size = null;
RCRect.prototype.__class__ = RCRect;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
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
Type = function() { }
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
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
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
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
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
Type.prototype.__class__ = Type;
RCDraw = function(x,y,w,h,color,alpha) {
	if( x === $_ ) return;
	if(alpha == null) alpha = 1.0;
	JSView.call(this,x,y);
	this.size.width = w;
	this.size.height = h;
	this.setAlpha(alpha);
	this.borderThickness = 1;
	try {
		this.graphics = this.view;
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "RCDraw.hx", lineNumber : 32, className : "RCDraw", methodName : "new"});
	}
	if(Std["is"](color,RCColor) || Std["is"](color,RCGradient)) this.color = color; else if(Std["is"](color,Int) || Std["is"](color,Int)) this.color = new RCColor(color); else if(Std["is"](color,Array)) this.color = new RCColor(color[0],color[1]); else this.color = new RCColor(0);
}
RCDraw.__name__ = ["RCDraw"];
RCDraw.__super__ = JSView;
for(var k in JSView.prototype ) RCDraw.prototype[k] = JSView.prototype[k];
RCDraw.prototype.color = null;
RCDraw.prototype.borderThickness = null;
RCDraw.prototype.configure = function() {
	if(Std["is"](this.color,RCColor)) {
		if(this.color.fillColor != null) this.graphics.beginFill(this.color.fillColor,this.color.alpha);
		if(this.color.borderColor != null) {
			var pixelHinting = true;
			var scaleMode = _RCDraw.LineScaleMode.NONE;
			var caps = null;
			var joints = null;
			var miterLimit = 3;
			this.graphics.lineStyle(this.borderThickness,this.color.borderColor,this.color.alpha,pixelHinting,scaleMode,caps,joints,miterLimit);
		}
	}
}
RCDraw.prototype.frame = function() {
	return new RCRect(this.x,this.y,this.size.width,this.size.height);
}
RCDraw.prototype.__class__ = RCDraw;
RCRectangle = function(x,y,w,h,color,alpha,r) {
	if( x === $_ ) return;
	if(alpha == null) alpha = 1.0;
	RCDraw.call(this,x,y,w,h,color,alpha);
	this.roundness = r;
	this.redraw();
}
RCRectangle.__name__ = ["RCRectangle"];
RCRectangle.__super__ = RCDraw;
for(var k in RCDraw.prototype ) RCRectangle.prototype[k] = RCDraw.prototype[k];
RCRectangle.prototype.roundness = null;
RCRectangle.prototype.redraw = function() {
	this.view.innerHTML = "<div style=\"position:absolute;overflow:hidden;left:0px;top:0px;width:" + this.size.width + "px;height:" + this.size.height + "px;background-color:" + ((function($this) {
		var $r;
		var $t = $this.color;
		if(Std["is"]($t,RCColor)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).fillColorStyle + "\"></div>";
}
RCRectangle.prototype.__class__ = RCRectangle;
RCRectangle.__interfaces__ = [RCDrawInterface];
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
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
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
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
		if(x != x) return null;
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
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
haxe.Firebug = function() { }
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
	js.Lib.setErrorHandler(haxe.Firebug.onError);
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
haxe.Firebug.prototype.__class__ = haxe.Firebug;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
}
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
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	var arr = haxe_timers;
	arr[this.id] = null;
	if(this.id > 100 && this.id == arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && arr[p] == null) p--;
		arr = arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
caequations.Cubic = function() { }
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
caequations.Cubic.prototype.__class__ = caequations.Cubic;
IntHash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	for( x in this.h ) a.push(x);
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
CAObject = function(obj,properties,duration,delay,Eq,pos) {
	if( obj === $_ ) return;
	this.target = obj;
	this.properties = properties;
	this.repeatCount = 0;
	this.autoreverses = false;
	this.fromTime = Date.now().getTime();
	this.duration = duration == null?CoreAnimation.defaultDuration:duration <= 0?0.001:duration;
	this.delay = delay == null || delay < 0?0:delay;
	this.timingFunction = Eq == null?CoreAnimation.defaultTimingFunction:Eq;
	this.delegate = new CADelegate();
	this.delegate.pos = pos;
	this.fromValues = { };
	this.toValues = { };
}
CAObject.__name__ = ["CAObject"];
CAObject.prototype.target = null;
CAObject.prototype.prev = null;
CAObject.prototype.next = null;
CAObject.prototype.properties = null;
CAObject.prototype.fromValues = null;
CAObject.prototype.toValues = null;
CAObject.prototype.fromTime = null;
CAObject.prototype.delay = null;
CAObject.prototype.duration = null;
CAObject.prototype.repeatCount = null;
CAObject.prototype.autoreverses = null;
CAObject.prototype.timingFunction = null;
CAObject.prototype.modifierFunction = null;
CAObject.prototype.constraintBounds = null;
CAObject.prototype.delegate = null;
CAObject.prototype.init = function() {
	throw "CAObject should be extended (" + this.delegate.pos + ")";
}
CAObject.prototype.animate = function(time_diff) {
	throw "CAObject should be extended (" + this.delegate.pos + ")";
}
CAObject.prototype.initTime = function() {
	this.fromTime = Date.now().getTime();
	this.duration = this.duration * 1000;
	this.delay = this.delay * 1000;
}
CAObject.prototype.repeat = function() {
	this.fromTime = Date.now().getTime();
	this.delay = 0;
	if(this.autoreverses) {
		var v = this.fromValues;
		this.fromValues = this.toValues;
		this.toValues = v;
	}
	this.repeatCount--;
}
CAObject.prototype.calculate = function(time_diff,prop) {
	return this.timingFunction(time_diff,Reflect.field(this.fromValues,prop),Reflect.field(this.toValues,prop) - Reflect.field(this.fromValues,prop),this.duration,null);
}
CAObject.prototype.toString = function() {
	return "[CAObject: target=" + this.target + ", duration=" + this.duration + ", delay=" + this.delay + ", fromTime=" + this.fromTime + ", properties=" + this.properties + ", repeatCount=" + this.repeatCount + "]";
}
CAObject.prototype.__class__ = CAObject;
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.Connection = function() { }
haxe.remoting.Connection.__name__ = ["haxe","remoting","Connection"];
haxe.remoting.Connection.prototype.resolve = null;
haxe.remoting.Connection.prototype.call = null;
haxe.remoting.Connection.prototype.__class__ = haxe.remoting.Connection;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
haxe.remoting.ExternalConnection = function(data,path) {
	if( data === $_ ) return;
	this.__data = data;
	this.__path = path;
}
haxe.remoting.ExternalConnection.__name__ = ["haxe","remoting","ExternalConnection"];
haxe.remoting.ExternalConnection.escapeString = function(s) {
	return s;
}
haxe.remoting.ExternalConnection.doCall = function(name,path,params) {
	try {
		var cnx = haxe.remoting.ExternalConnection.connections.get(name);
		if(cnx == null) throw "Unknown connection : " + name;
		if(cnx.__data.ctx == null) throw "No context shared for the connection " + name;
		var params1 = new haxe.Unserializer(params).unserialize();
		var ret = cnx.__data.ctx.call(path.split("."),params1);
		var s = new haxe.Serializer();
		s.serialize(ret);
		return s.toString() + "#";
	} catch( e ) {
		var s = new haxe.Serializer();
		s.serializeException(e);
		return s.toString();
	}
}
haxe.remoting.ExternalConnection.flashConnect = function(name,flashObjectID,ctx) {
	var cnx = new haxe.remoting.ExternalConnection({ ctx : ctx, name : name, flash : flashObjectID},[]);
	haxe.remoting.ExternalConnection.connections.set(name,cnx);
	return cnx;
}
haxe.remoting.ExternalConnection.prototype.__data = null;
haxe.remoting.ExternalConnection.prototype.__path = null;
haxe.remoting.ExternalConnection.prototype.resolve = function(field) {
	var e = new haxe.remoting.ExternalConnection(this.__data,this.__path.copy());
	e.__path.push(field);
	return e;
}
haxe.remoting.ExternalConnection.prototype.close = function() {
	haxe.remoting.ExternalConnection.connections.remove(this.__data.name);
}
haxe.remoting.ExternalConnection.prototype.call = function(params) {
	var s = new haxe.Serializer();
	s.serialize(params);
	var params1 = s.toString();
	var data = null;
	var fobj = window.document[this.__data.flash];
	if(fobj == null) fobj = window.document.getElementById(this.__data.flash);
	if(fobj == null) throw "Could not find flash object '" + this.__data.flash + "'";
	try {
		data = fobj.externalRemotingCall(this.__data.name,this.__path.join("."),params1);
	} catch( e ) {
	}
	if(data == null) {
		var domain, pageDomain;
		try {
			domain = fobj.src.split("/")[2];
			pageDomain = js.Lib.window.location.host;
		} catch( e ) {
			domain = null;
			pageDomain = null;
		}
		if(domain != pageDomain) throw "ExternalConnection call failure : SWF need allowDomain('" + pageDomain + "')";
		throw "Call failure : ExternalConnection is not " + "initialized in Flash";
	}
	return new haxe.Unserializer(data).unserialize();
}
haxe.remoting.ExternalConnection.prototype.__class__ = haxe.remoting.ExternalConnection;
haxe.remoting.ExternalConnection.__interfaces__ = [haxe.remoting.Connection];
RCEllipse = function(x,y,w,h,color,alpha) {
	if( x === $_ ) return;
	if(alpha == null) alpha = 1.0;
	RCDraw.call(this,x,y,w,h,color,alpha);
	this.redraw();
}
RCEllipse.__name__ = ["RCEllipse"];
RCEllipse.__super__ = RCDraw;
for(var k in RCDraw.prototype ) RCEllipse.prototype[k] = RCDraw.prototype[k];
RCEllipse.prototype.redraw = function() {
	this.fillEllipse(0,0,this.size.width,this.size.height);
}
RCEllipse.prototype.fillEllipse = function(xc,yc,width,height) {
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
	this.view.innerHTML = iHtml.join("");
	return this.view;
}
RCEllipse.prototype.__class__ = RCEllipse;
RCEllipse.__interfaces__ = [RCDrawInterface];
RCNotificationCenter = function() { }
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
	RCNotificationCenter.postNotification("resize",[w,h],{ fileName : "RCNotificationCenter.hx", lineNumber : 25, className : "RCNotificationCenter", methodName : "resizeHandler"});
}
RCNotificationCenter.fullScreenHandler = function(b) {
	RCNotificationCenter.postNotification("fullscreen",[b],{ fileName : "RCNotificationCenter.hx", lineNumber : 28, className : "RCNotificationCenter", methodName : "fullScreenHandler"});
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
			haxe.Log.trace("[RCNotificationCenter error calling function: " + notification.functionToCall + " from: " + Std.string(pos) + "]",{ fileName : "RCNotificationCenter.hx", lineNumber : 70, className : "RCNotificationCenter", methodName : "postNotification"});
		}
	}
	return notificationFound;
}
RCNotificationCenter.list = function() {
	var $it0 = RCNotificationCenter.notificationsList.iterator();
	while( $it0.hasNext() ) {
		var notification = $it0.next();
		haxe.Log.trace(notification,{ fileName : "RCNotificationCenter.hx", lineNumber : 81, className : "RCNotificationCenter", methodName : "list"});
	}
}
RCNotificationCenter.prototype.__class__ = RCNotificationCenter;
RCTextRoll = function(x,y,w,h,str,properties) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.size.width = w;
	this.continuous = true;
	this.txt1 = new RCTextView(0,0,null,h,str,properties);
	this.addChild(this.txt1);
	this.size.height = 20;
}
RCTextRoll.__name__ = ["RCTextRoll"];
RCTextRoll.__super__ = JSView;
for(var k in JSView.prototype ) RCTextRoll.prototype[k] = JSView.prototype[k];
RCTextRoll.prototype.txt1 = null;
RCTextRoll.prototype.txt2 = null;
RCTextRoll.prototype.timer = null;
RCTextRoll.prototype.timerLoop = null;
RCTextRoll.prototype.continuous = null;
RCTextRoll.prototype.text = null;
RCTextRoll.prototype.viewDidAppear = function() {
	if(this.txt1.getWidth() > this.size.width) {
		this.txt2 = new RCTextView(Math.round(this.txt1.getWidth() + 20),0,null,this.size.height,this.getText(),this.txt1.properties);
		this.addChild(this.txt2);
		haxe.Log.trace(this.size.width + ", " + this.size.height,{ fileName : "RCTextRoll.hx", lineNumber : 41, className : "RCTextRoll", methodName : "viewDidAppear"});
	}
}
RCTextRoll.prototype.getText = function() {
	return this.txt1.getText();
}
RCTextRoll.prototype.setText = function(str) {
	return str;
}
RCTextRoll.prototype.start = function() {
	if(this.txt2 == null) return;
	if(this.continuous) this.startRolling(); else this.timer = haxe.Timer.delay($closure(this,"startRolling"),3000);
}
RCTextRoll.prototype.stop = function() {
	if(this.txt2 == null) return;
	this.stopRolling();
	this.reset();
}
RCTextRoll.prototype.stopRolling = function() {
	if(this.timerLoop != null) this.timerLoop.stop();
	this.timerLoop = null;
}
RCTextRoll.prototype.startRolling = function() {
	this.stopRolling();
	this.timerLoop = new haxe.Timer(20);
	this.timerLoop.run = $closure(this,"loop");
}
RCTextRoll.prototype.loop = function() {
	var _g = this.txt1, _g1 = _g.x;
	_g.setX(_g1 - 1);
	_g1;
	var _g = this.txt2, _g1 = _g.x;
	_g.setX(_g1 - 1);
	_g1;
	if(!this.continuous && this.txt2.x <= 0) {
		this.stop();
		this.timer = haxe.Timer.delay($closure(this,"startRolling"),3000);
	}
	if(this.txt1.x < -this.txt1.getWidth()) this.txt1.setX(Math.round(this.txt2.x + this.txt2.getWidth() + 20));
	if(this.txt2.x < -this.txt2.getWidth()) this.txt2.setX(Math.round(this.txt1.x + this.txt1.getWidth() + 20));
}
RCTextRoll.prototype.reset = function() {
	if(this.timer != null) {
		this.timer.stop();
		this.timer = null;
	}
	this.txt1.setX(0);
	this.txt2.setX(Math.round(this.txt1.getWidth() + 20));
}
RCTextRoll.prototype.destroy = function() {
	this.stop();
	JSView.prototype.destroy.call(this);
}
RCTextRoll.prototype.__class__ = RCTextRoll;
EVResize = function(p) {
	if( p === $_ ) return;
	RCSignal.call(this);
	js.Lib.window.onresize = $closure(this,"resizeHandler");
}
EVResize.__name__ = ["EVResize"];
EVResize.__super__ = RCSignal;
for(var k in RCSignal.prototype ) EVResize.prototype[k] = RCSignal.prototype[k];
EVResize.prototype.resizeHandler = function(e) {
	var w = js.Lib.document.body.scrollWidth;
	var h = js.Lib.document.body.scrollHeight;
	this.dispatch([w,h],{ fileName : "EVResize.hx", lineNumber : 27, className : "EVResize", methodName : "resizeHandler"});
}
EVResize.prototype.__class__ = EVResize;
haxe.remoting.Context = function(p) {
	if( p === $_ ) return;
	this.objects = new Hash();
}
haxe.remoting.Context.__name__ = ["haxe","remoting","Context"];
haxe.remoting.Context.share = function(name,obj) {
	var ctx = new haxe.remoting.Context();
	ctx.addObject(name,obj);
	return ctx;
}
haxe.remoting.Context.prototype.objects = null;
haxe.remoting.Context.prototype.addObject = function(name,obj,recursive) {
	this.objects.set(name,{ obj : obj, rec : recursive});
}
haxe.remoting.Context.prototype.call = function(path,params) {
	if(path.length < 2) throw "Invalid path '" + path.join(".") + "'";
	var inf = this.objects.get(path[0]);
	if(inf == null) throw "No such object " + path[0];
	var o = inf.obj;
	var m = Reflect.field(o,path[1]);
	if(path.length > 2) {
		if(!inf.rec) throw "Can't access " + path.join(".");
		var _g1 = 2, _g = path.length;
		while(_g1 < _g) {
			var i = _g1++;
			o = m;
			m = Reflect.field(o,path[i]);
		}
	}
	if(!Reflect.isFunction(m)) throw "No such method " + path.join(".");
	return m.apply(o,params);
}
haxe.remoting.Context.prototype.__class__ = haxe.remoting.Context;
RCSkin = function(colors) {
	if( colors === $_ ) return;
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
}
RCSkin.__name__ = ["RCSkin"];
RCSkin.prototype.normal = null;
RCSkin.prototype.highlighted = null;
RCSkin.prototype.disabled = null;
RCSkin.prototype.selected = null;
RCSkin.prototype.hit = null;
RCSkin.prototype.__class__ = RCSkin;
HXButton = function(label_str,colors) {
	if( label_str === $_ ) return;
	RCSkin.call(this,colors);
	var f = new RCFont();
	f.color = 0;
	f.font = "Arial";
	f.bold = true;
	f.size = 12;
	this.normal.label = new RCTextView(0,0,70,20,label_str,f);
	this.normal.background = new RCRectangle(0,0,70,20,16763904);
	this.highlighted.background = new RCRectangle(0,0,70,20,16770816);
	this.hit = new RCRectangle(0,0,70,20,16777215,0);
}
HXButton.__name__ = ["HXButton"];
HXButton.__super__ = RCSkin;
for(var k in RCSkin.prototype ) HXButton.prototype[k] = RCSkin.prototype[k];
HXButton.prototype.__class__ = HXButton;
js.Lib = function() { }
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
js.Lib.prototype.__class__ = js.Lib;
RCWindow = function() { }
RCWindow.__name__ = ["RCWindow"];
RCWindow.width = null;
RCWindow.height = null;
RCWindow.backgroundColor = null;
RCWindow.init = function() {
	js.Lib.document.body.style.position = "absolute";
	RCWindow.width = js.Lib.document.body.scrollWidth;
	RCWindow.height = js.Lib.document.body.scrollHeight;
	RCWindow.setBackgroundColor(3355443);
	var url = RCWindow.URL.split("/");
	url.pop();
	RCWindow.URL = url.join("/") + "/";
	RCNotificationCenter.addObserver("resize",RCWindow.resizeHandler);
}
RCWindow.resizeHandler = function(w,h) {
	RCWindow.width = w;
	RCWindow.height = h;
}
RCWindow.getCenterX = function(w) {
	return Math.round(RCWindow.width / 2 - w / 2);
}
RCWindow.getCenterY = function(h) {
	return Math.round(RCWindow.height / 2 - h / 2);
}
RCWindow.fullscreen = function() {
}
RCWindow.normal = function() {
}
RCWindow.isFullScreen = function() {
	return false;
}
RCWindow.setBackgroundColor = function(color) {
	js.Lib.document.body.style.backgroundColor = RCColor.HEXtoString(color);
	return color;
}
RCWindow.addChild = function(child) {
	if(child != null) {
		child.viewWillAppear();
		child.parent = js.Lib.document.body;
		js.Lib.document.body.appendChild(child.view);
		child.viewDidAppear();
	}
}
RCWindow.removeChild = function(child) {
	if(child != null) {
		child.viewWillDisappear();
		child.parent = null;
		js.Lib.document.body.removeChild(child.view);
		child.viewDidDisappear();
	}
}
RCWindow.prototype.__class__ = RCWindow;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
RCControlState = { __ename__ : ["RCControlState"], __constructs__ : ["NORMAL","HIGHLIGHTED","DISABLED","SELECTED"] }
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
RCKeys = function(p) {
	if( p === $_ ) return;
	this.resume();
}
RCKeys.__name__ = ["RCKeys"];
RCKeys.prototype.onLeft = function() {
}
RCKeys.prototype.onRight = function() {
}
RCKeys.prototype.onUp = function() {
}
RCKeys.prototype.onDown = function() {
}
RCKeys.prototype.onEnter = function() {
}
RCKeys.prototype.onSpace = function() {
}
RCKeys.prototype.onEsc = function() {
}
RCKeys.prototype.onKeyUp = function() {
}
RCKeys.prototype.onKeyDown = function() {
}
RCKeys.prototype["char"] = null;
RCKeys.prototype.keyCode = null;
RCKeys.prototype.keyDownHandler = function(e) {
	this.keyCode = e.keyCode;
	haxe.Log.trace(this.keyCode,{ fileName : "RCKeys.hx", lineNumber : 42, className : "RCKeys", methodName : "keyDownHandler"});
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
RCKeys.prototype.keyUpHandler = function(e) {
	this["char"] = "";
	this.onKeyUp();
}
RCKeys.prototype.resume = function() {
	js.Lib.document.onkeydown = $closure(this,"keyDownHandler");
	js.Lib.document.onkeyup = $closure(this,"keyUpHandler");
}
RCKeys.prototype.hold = function() {
	js.Lib.document.onkeydown = null;
	js.Lib.document.onkeyup = null;
}
RCKeys.prototype.destroy = function() {
	this.hold();
}
RCKeys.prototype.__class__ = RCKeys;
Keyboard = function() { }
Keyboard.__name__ = ["Keyboard"];
Keyboard.prototype.__class__ = Keyboard;
RCLine = function(x1,y1,x2,y2,color,alpha,lineWeight) {
	if( x1 === $_ ) return;
	if(lineWeight == null) lineWeight = 1;
	if(alpha == null) alpha = 1.0;
	RCDraw.call(this,x1,y1,x2 - x1,y2 - y1,color,alpha);
	this.lineWeight = lineWeight;
	this.redraw();
}
RCLine.__name__ = ["RCLine"];
RCLine.__super__ = RCDraw;
for(var k in RCDraw.prototype ) RCLine.prototype[k] = RCDraw.prototype[k];
RCLine.prototype.lineWeight = null;
RCLine.prototype.redraw = function() {
	this.view.innerHTML = "";
	this.drawLine(0,0,Math.round(this.size.width),Math.round(this.size.height));
}
RCLine.prototype.drawLine = function(x0,y0,x1,y1) {
	var hexColor = ((function($this) {
		var $r;
		var $t = $this.color;
		if(Std["is"]($t,RCColor)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).fillColorStyle;
	if(y0 == y1) {
		if(x0 <= x1) this.view.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + (x1 - x0 + 1) + "px;height:" + this.lineWeight + ";background-color:" + hexColor + "\"></DIV>"; else if(x0 > x1) this.view.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x1 + "px;top:" + y0 + "px;width:" + (x0 - x1 + 1) + "px;height:" + this.lineWeight + ";background-color:" + hexColor + "\"></DIV>";
		return this.view;
	}
	if(x0 == x1) {
		if(y0 <= y1) this.view.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + this.lineWeight + ";height:" + (y1 - y0 + 1) + "px;background-color:" + hexColor + "\"></DIV>"; else if(y0 > y1) this.view.innerHTML = "<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y1 + "px;width:" + this.lineWeight + ";height:" + (y0 - y1 + 1) + "px;background-color:" + hexColor + "\"></DIV>";
		return this.view;
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
	this.view.innerHTML = iHtml.join("");
	return this.view;
}
RCLine.prototype.__class__ = RCLine;
RCLine.__interfaces__ = [RCDrawInterface];
CATween = function(obj,properties,duration,delay,Eq,pos) {
	if( obj === $_ ) return;
	CAObject.call(this,obj,properties,duration,delay,Eq,pos);
}
CATween.__name__ = ["CATween"];
CATween.__super__ = CAObject;
for(var k in CAObject.prototype ) CATween.prototype[k] = CAObject.prototype[k];
CATween.prototype.init = function() {
	var _g = 0, _g1 = Reflect.fields(this.properties);
	while(_g < _g1.length) {
		var p = _g1[_g];
		++_g;
		if(Std["is"](Reflect.field(this.properties,p),Int) || Std["is"](Reflect.field(this.properties,p),Float)) {
			this.fromValues[p] = Reflect.field(this.target,p);
			this.toValues[p] = Reflect.field(this.properties,p);
		} else try {
			this.fromValues[p] = Reflect.field(Reflect.field(this.properties,p),"fromValue");
			this.target[p] = Reflect.field(this.fromValues,p);
			this.toValues[p] = Reflect.field(Reflect.field(this.properties,p),"toValue");
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CATween.hx", lineNumber : 26, className : "CATween", methodName : "init"});
		}
	}
}
CATween.prototype.animate = function(time_diff) {
	var _g = 0, _g1 = Reflect.fields(this.toValues);
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		try {
			var val = this.timingFunction(time_diff,Reflect.field(this.fromValues,prop),Reflect.field(this.toValues,prop) - Reflect.field(this.fromValues,prop),this.duration,null);
			switch(prop) {
			case "x":
				this.target.setX(val);
				break;
			case "y":
				this.target.setY(val);
				break;
			case "width":
				this.target.setWidth(val);
				break;
			case "height":
				this.target.setHeight(val);
				break;
			case "scaleX":
				this.target.setScaleX(val);
				break;
			case "scaleY":
				this.target.setScaleY(val);
				break;
			case "alpha":
				this.target.setAlpha(val);
				break;
			}
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CATween.hx", lineNumber : 49, className : "CATween", methodName : "animate"});
		}
	}
}
CATween.prototype.__class__ = CATween;
CATween.__interfaces__ = [CATransitionInterface];
RCNotification = function(name,functionToCall) {
	if( name === $_ ) return;
	this.name = name;
	this.functionToCall = functionToCall;
}
RCNotification.__name__ = ["RCNotification"];
RCNotification.prototype.name = null;
RCNotification.prototype.functionToCall = null;
RCNotification.prototype.toString = function() {
	return "[RCNotification with name: '" + this.name + "', functionToCall: " + this.functionToCall + "]";
}
RCNotification.prototype.__class__ = RCNotification;
DateTools = function() { }
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	return (function($this) {
		var $r;
		switch(e) {
		case "%":
			$r = "%";
			break;
		case "C":
			$r = StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
			break;
		case "d":
			$r = StringTools.lpad(Std.string(d.getDate()),"0",2);
			break;
		case "D":
			$r = DateTools.__format(d,"%m/%d/%y");
			break;
		case "e":
			$r = Std.string(d.getDate());
			break;
		case "H":case "k":
			$r = StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
			break;
		case "I":case "l":
			$r = (function($this) {
				var $r;
				var hour = d.getHours() % 12;
				$r = StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
				return $r;
			}($this));
			break;
		case "m":
			$r = StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
			break;
		case "M":
			$r = StringTools.lpad(Std.string(d.getMinutes()),"0",2);
			break;
		case "n":
			$r = "\n";
			break;
		case "p":
			$r = d.getHours() > 11?"PM":"AM";
			break;
		case "r":
			$r = DateTools.__format(d,"%I:%M:%S %p");
			break;
		case "R":
			$r = DateTools.__format(d,"%H:%M");
			break;
		case "s":
			$r = Std.string(Std["int"](d.getTime() / 1000));
			break;
		case "S":
			$r = StringTools.lpad(Std.string(d.getSeconds()),"0",2);
			break;
		case "t":
			$r = "\t";
			break;
		case "T":
			$r = DateTools.__format(d,"%H:%M:%S");
			break;
		case "u":
			$r = (function($this) {
				var $r;
				var t = d.getDay();
				$r = t == 0?"7":Std.string(t);
				return $r;
			}($this));
			break;
		case "w":
			$r = Std.string(d.getDay());
			break;
		case "y":
			$r = StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
			break;
		case "Y":
			$r = Std.string(d.getFullYear());
			break;
		default:
			$r = (function($this) {
				var $r;
				throw "Date.format %" + e + "- not implemented yet.";
				return $r;
			}($this));
		}
		return $r;
	}(this));
}
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.b[r.b.length] = f.substr(p,np - p);
		r.add(DateTools.__format_get(d,f.substr(np + 1,1)));
		p = np + 2;
	}
	r.b[r.b.length] = f.substr(p,f.length - p);
	return r.b.join("");
}
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
}
DateTools.delta = function(d,t) {
	return Date.fromTime(d.getTime() + t);
}
DateTools.getMonthDays = function(d) {
	var month = d.getMonth();
	var year = d.getFullYear();
	if(month != 1) return DateTools.DAYS_OF_MONTH[month];
	var isB = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
	return isB?29:28;
}
DateTools.seconds = function(n) {
	return n * 1000.0;
}
DateTools.minutes = function(n) {
	return n * 60.0 * 1000.0;
}
DateTools.hours = function(n) {
	return n * 60.0 * 60.0 * 1000.0;
}
DateTools.days = function(n) {
	return n * 24.0 * 60.0 * 60.0 * 1000.0;
}
DateTools.parse = function(t) {
	var s = t / 1000;
	var m = s / 60;
	var h = m / 60;
	return { ms : t % 1000, seconds : Std["int"](s % 60), minutes : Std["int"](m % 60), hours : Std["int"](h % 24), days : Std["int"](h / 24)};
}
DateTools.make = function(o) {
	return o.ms + 1000.0 * (o.seconds + 60.0 * (o.minutes + 60.0 * (o.hours + 24.0 * o.days)));
}
DateTools.prototype.__class__ = DateTools;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
RCUserDefaults = function() { }
RCUserDefaults.__name__ = ["RCUserDefaults"];
RCUserDefaults.sharedObject = null;
RCUserDefaults.init = function(identifier) {
	if(identifier == null) identifier = "com.ralcr";
	if(RCUserDefaults.sharedObject == null) RCUserDefaults.sharedObject = SharedObject.getLocal(identifier);
}
RCUserDefaults.objectForKey = function(key) {
	RCUserDefaults.init();
	return Reflect.field(RCUserDefaults.sharedObject.data,key);
}
RCUserDefaults.arrayForKey = function(key) {
	return RCUserDefaults.objectForKey(key);
}
RCUserDefaults.boolForKey = function(key) {
	return RCUserDefaults.objectForKey(key) == true;
}
RCUserDefaults.stringForKey = function(key) {
	return RCUserDefaults.objectForKey(key);
}
RCUserDefaults.intForKey = function(key) {
	return RCUserDefaults.objectForKey(key);
}
RCUserDefaults.floatForKey = function(key) {
	return RCUserDefaults.objectForKey(key);
}
RCUserDefaults.set = function(key,value) {
	RCUserDefaults.init();
	try {
		RCUserDefaults.sharedObject.data[key] = value;
		RCUserDefaults.sharedObject.flush();
	} catch( e ) {
		haxe.Log.trace("Error setting a SharedObject {" + e + "}",{ fileName : "RCUserDefaults.hx", lineNumber : 54, className : "RCUserDefaults", methodName : "set"});
	}
	return value;
}
RCUserDefaults.removeObjectForKey = function(key) {
	RCUserDefaults.set(key,null);
}
RCUserDefaults.removeAllObjects = function() {
	var _g = 0, _g1 = Reflect.fields(RCUserDefaults.sharedObject.data);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		Reflect.deleteField(RCUserDefaults.sharedObject.data,key);
	}
	RCUserDefaults.sharedObject.flush();
}
RCUserDefaults.prototype.__class__ = RCUserDefaults;
SharedObject = function(identifier) {
	if( identifier === $_ ) return;
	this.identifier = identifier;
	this.data = { };
	var $it0 = js.Cookie.all().keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		if(key.indexOf(identifier) == 0) this.data[key.substr(identifier.length)] = haxe.Unserializer.run(js.Cookie.get(key));
	}
}
SharedObject.__name__ = ["SharedObject"];
SharedObject.getLocal = function(identifier) {
	var so = new SharedObject(identifier);
	return so;
}
SharedObject.prototype.identifier = null;
SharedObject.prototype.data = null;
SharedObject.prototype.flush = function() {
	var _g = 0, _g1 = Reflect.fields(this.data);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		var value = Reflect.field(this.data,key);
		if(value != null) js.Cookie.set(this.identifier + key,haxe.Serializer.run(value),31536000); else js.Cookie.remove(this.identifier + key);
	}
}
SharedObject.prototype.__class__ = SharedObject;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
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
Std.prototype.__class__ = Std;
RCFont = function(p) {
	if( p === $_ ) return;
	this.html = true;
	this.embedFonts = true;
	this.autoSize = true;
	this.selectable = false;
}
RCFont.__name__ = ["RCFont"];
RCFont.prototype.html = null;
RCFont.prototype.format = null;
RCFont.prototype.style = null;
RCFont.prototype.embedFonts = null;
RCFont.prototype.type = null;
RCFont.prototype.antiAliasType = null;
RCFont.prototype.autoSize = null;
RCFont.prototype.displayAsPassword = null;
RCFont.prototype.selectable = null;
RCFont.prototype.sharpness = null;
RCFont.prototype.thickness = null;
RCFont.prototype.align = null;
RCFont.prototype.blockIndent = null;
RCFont.prototype.bold = null;
RCFont.prototype.bullet = null;
RCFont.prototype.color = null;
RCFont.prototype.display = null;
RCFont.prototype.font = null;
RCFont.prototype.indent = null;
RCFont.prototype.italic = null;
RCFont.prototype.kerning = null;
RCFont.prototype.leading = null;
RCFont.prototype.leftMargin = null;
RCFont.prototype.letterSpacing = null;
RCFont.prototype.rightMargin = null;
RCFont.prototype.size = null;
RCFont.prototype.tabStops = null;
RCFont.prototype.target = null;
RCFont.prototype.underline = null;
RCFont.prototype.url = null;
RCFont.prototype.copy = function(exceptions) {
	var rcfont = new RCFont();
	var fields = Type.getInstanceFields(RCFont);
	var _g = 0;
	while(_g < fields.length) {
		var field = fields[_g];
		++_g;
		if(field == "copy") continue;
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
	rcfont.format = { };
	rcfont.format.align = rcfont.align;
	rcfont.format.blockIndent = rcfont.blockIndent;
	rcfont.format.bold = rcfont.bold;
	rcfont.format.bullet = rcfont.bullet;
	rcfont.format.color = rcfont.color;
	rcfont.format.font = rcfont.font;
	rcfont.format.italic = rcfont.italic;
	rcfont.format.indent = rcfont.indent;
	rcfont.format.kerning = rcfont.kerning;
	rcfont.format.leading = rcfont.leading;
	rcfont.format.leftMargin = rcfont.leftMargin;
	rcfont.format.letterSpacing = rcfont.letterSpacing;
	rcfont.format.rightMargin = rcfont.rightMargin;
	rcfont.format.size = rcfont.size;
	rcfont.format.tabStops = rcfont.tabStops;
	rcfont.format.target = rcfont.target;
	rcfont.format.underline = rcfont.underline;
	rcfont.format.url = rcfont.url;
	return rcfont;
}
RCFont.prototype.__class__ = RCFont;
Main = function() { }
Main.__name__ = ["Main"];
Main.lin = null;
Main.ph = null;
Main.circ = null;
Main.signal = null;
Main.main = function() {
	haxe.Firebug.redirectTraces();
	RCWindow.init();
	RCWindow.setBackgroundColor(14540253);
	var rect = new RCRectangle(200,30,300,150,16724736);
	RCWindow.addChild(rect);
	rect.setClipsToBounds(true);
	rect.setCenter(new RCPoint(RCWindow.width / 2,RCWindow.height / 2));
	Main.circ = new RCEllipse(50,50,100,100,RCColor.darkGrayColor());
	RCWindow.addChild(Main.circ);
	var a1 = new CATween(Main.circ,{ x : RCWindow.width - 50, y : 50},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 34, className : "Main", methodName : "main"});
	var a2 = new CATween(Main.circ,{ x : RCWindow.width - 50, y : RCWindow.height - 50},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 35, className : "Main", methodName : "main"});
	var a3 = new CATween(Main.circ,{ x : 50, y : RCWindow.height - 50},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 36, className : "Main", methodName : "main"});
	var a4 = new CATween(Main.circ,{ x : 50, y : 50},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 37, className : "Main", methodName : "main"});
	var seq = new CASequence([a1,a2,a3,a4]);
	seq.start();
	Main.ph = new RCPhoto(1,1,"../CoreAnimation/3134265_large.jpg");
	Main.ph.onComplete = Main.resizePhoto;
	rect.addChild(Main.ph);
	var f = new RCFont();
	f.color = 16777215;
	f.font = "Arial";
	f.size = 30;
	var t = new RCTextView(50,30,null,null,"IMAGIN",f);
	RCWindow.addChild(t);
	var f2 = f.copy();
	f2.size = 16;
	var r = new RCTextRoll(50,60,200,null,"We are working on the HTML5 version of the gallery...",f2);
	RCWindow.addChild(r);
	r.setBackgroundColor(16777215);
	var k = new RCKeys();
	k.onLeft = Main.moveLeft;
	k.onRight = Main.moveRight;
	var m = new RCMouse(js.Lib.document.body,rect.view);
	m.onLeft = function() {
		haxe.Log.trace("onLeft",{ fileName : "Main.hx", lineNumber : 68, className : "Main", methodName : "main"});
	};
	Main.signal = new RCSignal();
	Main.signal.add(Main.printNr);
	Main.signal.addOnce(Main.printNr2);
	Main.signal.remove(Main.printNr);
	Main.signal.removeAll();
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		Main.signal.dispatch([Math.random()],{ fileName : "Main.hx", lineNumber : 77, className : "Main", methodName : "main"});
	}
	RCUserDefaults.init("com.ralcr.html5.");
	haxe.Log.trace(RCUserDefaults.stringForKey("key1"),{ fileName : "Main.hx", lineNumber : 82, className : "Main", methodName : "main"});
	RCUserDefaults.set("key1","blah blah");
	haxe.Log.trace(RCUserDefaults.stringForKey("key1"),{ fileName : "Main.hx", lineNumber : 84, className : "Main", methodName : "main"});
	var s = new HXButton("PLAY");
	var b = new RCButton(50,200,s);
	b.onClick = function() {
		haxe.Log.trace("click",{ fileName : "Main.hx", lineNumber : 90, className : "Main", methodName : "main"});
	};
	b.onOver = function() {
		haxe.Log.trace("over",{ fileName : "Main.hx", lineNumber : 91, className : "Main", methodName : "main"});
	};
	b.onOut = function() {
		haxe.Log.trace("out",{ fileName : "Main.hx", lineNumber : 92, className : "Main", methodName : "main"});
	};
	b.onPress = function() {
		haxe.Log.trace("press",{ fileName : "Main.hx", lineNumber : 93, className : "Main", methodName : "main"});
	};
	b.onRelease = function() {
		haxe.Log.trace("release",{ fileName : "Main.hx", lineNumber : 94, className : "Main", methodName : "main"});
	};
	RCWindow.addChild(b);
}
Main.moveLine = function(e) {
	Main.lin.size.width = e.clientX - Main.lin.x;
	Main.lin.size.height = e.clientY - Main.lin.y;
	Main.lin.redraw();
}
Main.resizePhoto = function() {
	Main.ph.scaleToFill(298,148);
	var anim = new CATween(Main.ph,{ x : { fromValue : -Main.ph.getWidth(), toValue : Main.ph.getWidth()}},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 115, className : "Main", methodName : "resizePhoto"});
	anim.repeatCount = 5;
	anim.autoreverses = true;
	CoreAnimation.add(anim);
}
Main.printNr = function(nr) {
	haxe.Log.trace("printNr " + nr,{ fileName : "Main.hx", lineNumber : 123, className : "Main", methodName : "printNr"});
}
Main.printNr2 = function(nr) {
	haxe.Log.trace("printNr2 " + nr,{ fileName : "Main.hx", lineNumber : 126, className : "Main", methodName : "printNr2"});
}
Main.moveLeft = function() {
	var _g = Main.circ;
	_g.setX(_g.x - 10);
}
Main.moveRight = function() {
	var _g = Main.circ;
	_g.setX(_g.x + 10);
}
Main.prototype.__class__ = Main;
haxe.Unserializer = function(buf) {
	if( buf === $_ ) return;
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveClass : function(_) {
		return null;
	}, resolveEnum : function(_) {
		return null;
	}}; else this.resolver = r;
}
haxe.Unserializer.prototype.getResolver = function() {
	return this.resolver;
}
haxe.Unserializer.prototype.get = function(p) {
	return this.buf.cca(p);
}
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(c != c) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	return e;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.cca(this.pos++)) {
	case 110:
		return null;
	case 116:
		return true;
	case 102:
		return false;
	case 122:
		return 0;
	case 105:
		return this.readDigits();
	case 100:
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
	case 121:
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		return s;
	case 107:
		return Math.NaN;
	case 109:
		return Math.NEGATIVE_INFINITY;
	case 112:
		return Math.POSITIVE_INFINITY;
	case 97:
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			} else a.push(this.unserialize());
		}
		return a;
	case 111:
		var o = { };
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 114:
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		return this.cache[n];
	case 82:
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		return this.scache[n];
	case 120:
		throw this.unserialize();
		break;
	case 99:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 119:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		return this.unserializeEnum(edecl,this.unserialize());
	case 106:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw "Unknown enum index " + name + "@" + index;
		return this.unserializeEnum(edecl,tag);
	case 108:
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	case 98:
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	case 113:
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	case 118:
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		return d;
	case 115:
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c3 << 6 | c4) & 255;
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		return bytes;
	case 67:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		return o;
	default:
	}
	this.pos--;
	throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
if(!haxe.io) haxe.io = {}
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	this.length = length;
	this.b = b;
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) return b1[i] - b2[i];
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = String.fromCharCode;
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.toHex = function() {
	var s = new StringBuf();
	var chars = [];
	var str = "0123456789abcdef";
	var _g1 = 0, _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars.push(str.charCodeAt(i));
	}
	var _g1 = 0, _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.b[i];
		s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
		s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
	}
	return s.b.join("");
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
if(typeof _RCDraw=='undefined') _RCDraw = {}
_RCDraw.LineScaleMode = function() { }
_RCDraw.LineScaleMode.__name__ = ["_RCDraw","LineScaleMode"];
_RCDraw.LineScaleMode.prototype.__class__ = _RCDraw.LineScaleMode;
StringTools = function() { }
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
StringTools.prototype.__class__ = StringTools;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
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
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
RCMouse.IDLE_TIME = 3000;
RCMouse.MIDDLE_W = 200;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
RCColor.BLACK = 0;
RCColor.WHITE = 16777215;
RCColor.RED = 16711680;
RCColor.GREEN = 65280;
RCColor.BLUE = 255;
RCColor.CYAN = 65535;
RCColor.YELLOW = 16776960;
CoreAnimation.defaultTimingFunction = caequations.Linear.NONE;
CoreAnimation.defaultDuration = 0.8;
haxe.remoting.ExternalConnection.connections = new Hash();
RCTextRoll.GAP = 20;
js.Lib.onerror = null;
RCWindow.target = js.Lib.document.body;
RCWindow.stage = js.Lib.document.body;
RCWindow.SCREEN_W = js.Lib.window.screen.width;
RCWindow.SCREEN_H = js.Lib.window.screen.height;
RCWindow.URL = "";
RCWindow.ID = "";
Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;
Keyboard.ENTER = 13;
Keyboard.SPACE = 32;
Keyboard.ESCAPE = 27;
DateTools.DAYS_OF_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
_RCDraw.LineScaleMode.NONE = null;
Main.main()