$estr = function() { return js.Boot.__string_rec(this,''); }
CATransitionInterface = function() { }
CATransitionInterface.__name__ = ["CATransitionInterface"];
CATransitionInterface.prototype.init = null;
CATransitionInterface.prototype.animate = null;
CATransitionInterface.prototype.__class__ = CATransitionInterface;
if(typeof haxe=='undefined') haxe = {}
haxe.Http = function(url) {
	if( url === $_ ) return;
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}
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
haxe.Http.prototype.url = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers.set(header,value);
}
haxe.Http.prototype.setParameter = function(param,value) {
	this.params.set(param,value);
}
haxe.Http.prototype.setPostData = function(data) {
	this.postData = data;
}
haxe.Http.prototype.request = function(post) {
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
			uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
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
haxe.Http.prototype.onData = function(data) {
}
haxe.Http.prototype.onError = function(msg) {
}
haxe.Http.prototype.onStatus = function(status) {
}
haxe.Http.prototype.__class__ = haxe.Http;
JSView = function(x,y,w,h) {
	if( x === $_ ) return;
	this.size = new RCSize(w,h);
	this.scaleX_ = 1;
	this.scaleY_ = 1;
	this.alpha_ = 1;
	this.layer = js.Lib.document.createElement("div");
	this.layer.style.position = "absolute";
	this.layer.style.margin = "0px 0px 0px 0px";
	this.setX(x);
	this.setY(y);
}
JSView.__name__ = ["JSView"];
JSView.prototype.parent = null;
JSView.prototype.layer = null;
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
JSView.prototype.mouseX = null;
JSView.prototype.mouseY = null;
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
	child.parent = this.layer;
	this.layer.appendChild(child.layer);
	child.viewDidAppearHandler();
}
JSView.prototype.removeChild = function(child) {
	if(child == null) return;
	child.viewWillDisappearHandler();
	child.parent = null;
	this.layer.removeChild(child.layer);
	child.viewDidDisappearHandler();
}
JSView.prototype.setBackgroundColor = function(color) {
	if(color == null) {
		this.layer.style.background = null;
		return color;
	}
	var red = (color & 16711680) >> 16;
	var green = (color & 65280) >> 8;
	var blue = color & 255;
	var alpha = 1;
	var color_ = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
	this.layer.style.background = color_;
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
		this.layer.style.overflow = "hidden";
		this.viewMask = js.Lib.document.createElement("div");
		this.viewMask.style.width = this.size.width + "px";
		this.viewMask.style.height = this.size.height + "px";
		while(this.layer.hasChildNodes()) this.viewMask.appendChild(this.layer.removeChild(this.layer.firstChild));
		this.layer.appendChild(this.viewMask);
	} else {
		this.layer.style.overflow = null;
		this.layer.removeChild(this.viewMask);
		while(this.viewMask.hasChildNodes()) this.layer.appendChild(this.viewMask.removeChild(this.viewMask.firstChild));
		this.viewMask = this.layer;
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
	if(this.parent != null) this.parent.removeChild(this.layer);
}
JSView.prototype.setVisible = function(v) {
	this.visible = v;
	this.layer.style.visibility = v?"visible":"hidden";
	return v;
}
JSView.prototype.setAlpha = function(a) {
	this.alpha_ = a;
	this.layer.style.opacity = Std.string(a);
	return a;
}
JSView.prototype.setX = function(x) {
	this.x = x;
	this.layer.style.left = Std.string(x) + "px";
	return x;
}
JSView.prototype.setY = function(y) {
	this.y = y;
	this.layer.style.top = Std.string(y) + "px";
	return y;
}
JSView.prototype.getWidth = function() {
	if(this.parent == null) haxe.Log.trace("This view doesn't have a parent, the width will be 0",{ fileName : "JSView.hx", lineNumber : 226, className : "JSView", methodName : "getWidth"});
	return this.layer.offsetWidth;
	return this.layer.scrollWidth;
	return this.layer.clientWidth;
}
JSView.prototype.setWidth = function(w) {
	this.width = w;
	this.layer.style.width = w + "px";
	return w;
}
JSView.prototype.getHeight = function() {
	if(this.parent == null) haxe.Log.trace("This view doesn't have a parent, the height will be 0",{ fileName : "JSView.hx", lineNumber : 237, className : "JSView", methodName : "getHeight"});
	return this.layer.offsetHeight;
	return this.layer.scrollHeight;
	return this.layer.clientHeight;
}
JSView.prototype.setHeight = function(h) {
	this.height = h;
	this.layer.style.height = h + "px";
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
	this.layer.style.WebkitTransformOrigin = "top left";
	this.layer.style.WebkitTransform = "scale(" + sx + "," + sy + ")";
}
JSView.prototype.startDrag = function(lockCenter,rect) {
}
JSView.prototype.stopDrag = function() {
}
JSView.prototype.getMouseX = function() {
	return this.layer.clientX;
	if(this.parent == null) return this.mouseX;
	return this.parent.mouseX - this.x;
}
JSView.prototype.getMouseY = function() {
	if(this.parent == null) return this.mouseY;
	return this.parent.mouseY - this.y;
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
RCControl.prototype.configureDispatchers = function() {
	this.click = new EVMouse(EVMouse.CLICK,this,{ fileName : "RCControl.hx", lineNumber : 71, className : "RCControl", methodName : "configureDispatchers"});
	this.press = new EVMouse(EVMouse.DOWN,this,{ fileName : "RCControl.hx", lineNumber : 72, className : "RCControl", methodName : "configureDispatchers"});
	this.release = new EVMouse(EVMouse.UP,this,{ fileName : "RCControl.hx", lineNumber : 73, className : "RCControl", methodName : "configureDispatchers"});
	this.over = new EVMouse(EVMouse.OVER,this,{ fileName : "RCControl.hx", lineNumber : 74, className : "RCControl", methodName : "configureDispatchers"});
	this.out = new EVMouse(EVMouse.OUT,this,{ fileName : "RCControl.hx", lineNumber : 75, className : "RCControl", methodName : "configureDispatchers"});
}
RCControl.prototype.configureListeners = function() {
	this.click.addFirst($closure(this,"clickHandler"),{ fileName : "RCControl.hx", lineNumber : 79, className : "RCControl", methodName : "configureListeners"});
	this.press.addFirst($closure(this,"mouseDownHandler"),{ fileName : "RCControl.hx", lineNumber : 80, className : "RCControl", methodName : "configureListeners"});
	this.release.addFirst($closure(this,"mouseUpHandler"),{ fileName : "RCControl.hx", lineNumber : 81, className : "RCControl", methodName : "configureListeners"});
	this.over.addFirst($closure(this,"rollOverHandler"),{ fileName : "RCControl.hx", lineNumber : 82, className : "RCControl", methodName : "configureListeners"});
	this.out.addFirst($closure(this,"rollOutHandler"),{ fileName : "RCControl.hx", lineNumber : 83, className : "RCControl", methodName : "configureListeners"});
}
RCControl.prototype.removeListeners = function() {
	this.click.remove($closure(this,"clickHandler"));
	this.press.remove($closure(this,"mouseDownHandler"));
	this.release.remove($closure(this,"mouseUpHandler"));
	this.over.remove($closure(this,"rollOverHandler"));
	this.out.remove($closure(this,"rollOutHandler"));
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
	this.setState(RCControlState.SELECTED);
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
	if(this.enabled_) this.configureListeners(); else this.removeListeners();
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
	this.click.destroy();
	this.press.destroy();
	this.release.destroy();
	this.over.destroy();
	this.out.destroy();
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
	RCControl.prototype.setState.call(this,state);
}
RCButton.prototype.fixSkin = function() {
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
}
RCButton.prototype.setObjectColor = function(obj,color) {
	if(obj == null || color == null) return;
}
RCButton.prototype.setObjectBrightness = function(obj,brightness) {
}
RCButton.prototype.__class__ = RCButton;
RCButtonRadio = function(x,y,skin) {
	if( x === $_ ) return;
	RCButton.call(this,x,y,skin);
	this.toggable_ = true;
}
RCButtonRadio.__name__ = ["RCButtonRadio"];
RCButtonRadio.__super__ = RCButton;
for(var k in RCButton.prototype ) RCButtonRadio.prototype[k] = RCButton.prototype[k];
RCButtonRadio.prototype.toggable_ = null;
RCButtonRadio.prototype.toggable = null;
RCButtonRadio.prototype.mouseDownHandler = function(e) {
	this.onPress();
}
RCButtonRadio.prototype.mouseUpHandler = function(e) {
	this.onRelease();
}
RCButtonRadio.prototype.clickHandler = function(e) {
	this.setState(this.getSelected()?RCControlState.NORMAL:RCControlState.SELECTED);
	this.onClick();
}
RCButtonRadio.prototype.rollOverHandler = function(e) {
	if(!this.getSelected()) this.setState(RCControlState.HIGHLIGHTED);
	this.onOver();
}
RCButtonRadio.prototype.rollOutHandler = function(e) {
	if(!this.getSelected()) this.setState(RCControlState.NORMAL);
	this.onOut();
}
RCButtonRadio.prototype.getToggable = function() {
	return this.toggable_;
}
RCButtonRadio.prototype.setToggable = function(v) {
	if(!v) this.setState(RCControlState.NORMAL);
	return this.toggable_ = v;
}
RCButtonRadio.prototype.toggle = function() {
	if(this.toggable_) this.setState(RCControlState.SELECTED);
}
RCButtonRadio.prototype.untoggle = function() {
	if(this.toggable_) this.setState(RCControlState.NORMAL);
}
RCButtonRadio.prototype.__class__ = RCButtonRadio;
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
if(typeof _HTTPRequest=='undefined') _HTTPRequest = {}
_HTTPRequest.URLVariables = function(p) {
}
_HTTPRequest.URLVariables.__name__ = ["_HTTPRequest","URLVariables"];
_HTTPRequest.URLVariables.prototype.__class__ = _HTTPRequest.URLVariables;
RCRequest = function(p) {
}
RCRequest.__name__ = ["RCRequest"];
RCRequest.prototype.loader = null;
RCRequest.prototype.result = null;
RCRequest.prototype.status = null;
RCRequest.prototype.percentLoaded = null;
RCRequest.prototype.onOpen = function() {
}
RCRequest.prototype.onComplete = function() {
}
RCRequest.prototype.onError = function() {
}
RCRequest.prototype.onProgress = function() {
}
RCRequest.prototype.onStatus = function() {
}
RCRequest.prototype.load = function(URL,variables,method) {
	if(method == null) method = "POST";
	this.loader = new haxe.Http(URL);
	this.configureListeners(this.loader);
	this.loader.request(method == "POST"?true:false);
}
RCRequest.prototype.configureListeners = function(dispatcher) {
	dispatcher.onData = $closure(this,"completeHandler");
	dispatcher.onError = $closure(this,"securityErrorHandler");
	dispatcher.onStatus = $closure(this,"httpStatusHandler");
}
RCRequest.prototype.removeListeners = function(dispatcher) {
	dispatcher.onData = null;
	dispatcher.onError = null;
	dispatcher.onStatus = null;
}
RCRequest.prototype.openHandler = function(e) {
	this.onOpen();
}
RCRequest.prototype.completeHandler = function(e) {
	this.result = e;
	if(this.result.indexOf("error::") != -1) {
		this.result = this.result.split("error::").pop();
		this.onError();
	} else this.onComplete();
}
RCRequest.prototype.progressHandler = function(e) {
}
RCRequest.prototype.securityErrorHandler = function(e) {
	this.result = e;
	this.onError();
}
RCRequest.prototype.httpStatusHandler = function(e) {
	this.status = e;
	this.onStatus();
}
RCRequest.prototype.ioErrorHandler = function(e) {
	this.result = e;
	this.onError();
}
RCRequest.prototype.destroy = function() {
	this.removeListeners(this.loader);
	this.loader = null;
}
RCRequest.prototype.__class__ = RCRequest;
HTTPRequest = function(scripts_path) {
	if( scripts_path === $_ ) return;
	this.scripts_path = scripts_path;
	RCRequest.call(this);
}
HTTPRequest.__name__ = ["HTTPRequest"];
HTTPRequest.__super__ = RCRequest;
for(var k in RCRequest.prototype ) HTTPRequest.prototype[k] = RCRequest.prototype[k];
HTTPRequest.prototype.scripts_path = null;
HTTPRequest.prototype.readFile = function(file) {
	this.load(file);
}
HTTPRequest.prototype.readDirectory = function(directory) {
	var variables = new _HTTPRequest.URLVariables();
	variables.path = directory;
	this.load(this.scripts_path + "filesystem/readDirectory.php",variables);
}
HTTPRequest.prototype.call = function(script,variables_list,method) {
	if(method == null) method = "POST";
}
HTTPRequest.prototype.__class__ = HTTPRequest;
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
RCGradient.prototype.strokeColor = null;
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
	this.fillColor = fillColor;
	this.strokeColor = strokeColor;
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
RCColor.prototype.fillColor = null;
RCColor.prototype.strokeColor = null;
RCColor.prototype.fillColorStyle = null;
RCColor.prototype.strokeColorStyle = null;
RCColor.prototype.redComponent = null;
RCColor.prototype.greenComponent = null;
RCColor.prototype.blueComponent = null;
RCColor.prototype.alpha = null;
RCColor.prototype.__class__ = RCColor;
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
RCSignal.prototype.addOnce = function(listener,pos) {
	if(this.exists(listener)) haxe.Log.trace("This listener is already added, it will not be called only once as you expect. " + pos,{ fileName : "RCSignal.hx", lineNumber : 20, className : "RCSignal", methodName : "addOnce"});
	this.exposableListener = listener;
}
RCSignal.prototype.addFirst = function(listener,pos) {
	this.listeners.push(listener);
}
RCSignal.prototype.remove = function(listener) {
	var $it0 = this.listeners.iterator();
	while( $it0.hasNext() ) {
		var l = $it0.next();
		if(Reflect.compareMethods(l,listener)) {
			this.listeners.remove(listener);
			break;
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
		haxe.Log.trace("[RCSignal error when calling: " + listener + " from: " + Std.string(pos) + "]",{ fileName : "RCSignal.hx", lineNumber : 57, className : "RCSignal", methodName : "callMethod"});
	}
}
RCSignal.prototype.exists = function(listener) {
	var $it0 = this.listeners.iterator();
	while( $it0.hasNext() ) {
		var l = $it0.next();
		if(l == listener) return true;
	}
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
RCTextView = function(x,y,w,h,str,rcfont) {
	if( x === $_ ) return;
	JSView.call(this,Math.round(x),Math.round(y));
	this.size.width = w;
	this.size.height = h;
	this.rcfont = rcfont.copy();
	this.setWidth(w);
	this.setHeight(h);
	this.init();
	this.setText(str);
}
RCTextView.__name__ = ["RCTextView"];
RCTextView.__super__ = JSView;
for(var k in JSView.prototype ) RCTextView.prototype[k] = JSView.prototype[k];
RCTextView.prototype.target = null;
RCTextView.prototype.rcfont = null;
RCTextView.prototype.text = null;
RCTextView.prototype.init = function() {
	this.redraw();
}
RCTextView.prototype.redraw = function() {
	var wrap = this.size.width != null;
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
	if(this.rcfont.autoSize) {
		this.layer.style.width = multiline?this.size.width + "px":"auto";
		this.layer.style.height = "auto";
	} else {
		this.layer.style.width = this.size.width + "px";
		this.layer.style.height = this.size.height + "px";
	}
	this.layer.innerHTML = "";
	this.layer.style.color = RCColor.HEXtoString(this.rcfont.color);
	this.layer.style.fontFamily = this.rcfont.font;
	this.layer.style.fontWeight = this.rcfont.bold;
	this.layer.style.fontSize = this.rcfont.size;
	this.layer.style.fontStyle = this.rcfont.getStyleSheet();
	if(this.size.width != null) this.setWidth(this.size.width);
}
RCTextView.prototype.getText = function() {
	return this.layer.innerHTML;
}
RCTextView.prototype.setText = function(str) {
	if(this.rcfont.html) this.layer.innerHTML = str; else this.layer.innerHTML = str;
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
RCPoint = function(x,y) {
	if( x === $_ ) return;
	this.x = x;
	this.y = y;
}
RCPoint.__name__ = ["RCPoint"];
RCPoint.prototype.x = null;
RCPoint.prototype.y = null;
RCPoint.prototype.__class__ = RCPoint;
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
RCImage = function(x,y,URL) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.loader = js.Lib.document.createElement("img");
	this.addListeners();
	this.initWithContentsOfFile(URL);
}
RCImage.__name__ = ["RCImage"];
RCImage.__super__ = JSView;
for(var k in JSView.prototype ) RCImage.prototype[k] = JSView.prototype[k];
RCImage.imageNamed = function(name) {
	return new RCImage(0,0,name);
}
RCImage.imageWithContentsOfFile = function(path) {
	return new RCImage(0,0,path);
}
RCImage.resizableImageWithCapInsets = function(path,capWidth) {
	return new RCImage(0,0,path);
}
RCImage.prototype.loader = null;
RCImage.prototype.bitmapData = null;
RCImage.prototype.isLoaded = null;
RCImage.prototype.percentLoaded = null;
RCImage.prototype.errorMessage = null;
RCImage.prototype.onComplete = function() {
}
RCImage.prototype.onProgress = function() {
}
RCImage.prototype.onError = function() {
}
RCImage.prototype.initWithContentsOfFile = function(URL) {
	this.isLoaded = false;
	this.percentLoaded = 0;
	if(URL == null) return;
	this.loader.draggable = false;
	this.loader.src = URL;
}
RCImage.prototype.completeHandler = function(e) {
	this.size.width = this.lastW = this.setWidth(this.loader.width);
	this.size.height = this.lastH = this.setHeight(this.loader.height);
	this.layer.appendChild(this.loader);
	this.isLoaded = true;
	this.onComplete();
}
RCImage.prototype.errorHandler = function(e) {
	this.errorMessage = Std.string(e);
	this.onError();
}
RCImage.prototype.ioErrorHandler = function(e) {
	this.errorMessage = Std.string(e);
	this.onError();
}
RCImage.prototype.copy = function() {
	return new RCImage(0,0,this.loader.src);
}
RCImage.prototype.addListeners = function() {
	this.loader.onload = $closure(this,"completeHandler");
	this.loader.onerror = $closure(this,"errorHandler");
}
RCImage.prototype.removeListeners = function() {
	this.loader.onload = null;
	this.loader.onerror = null;
}
RCImage.prototype.destroy = function() {
	this.removeListeners();
	this.loader = null;
}
RCImage.prototype.scaleToFit = function(w,h) {
	JSView.prototype.scaleToFit.call(this,w,h);
	this.loader.style.width = this.getWidth() + "px";
	this.loader.style.height = this.getHeight() + "px";
}
RCImage.prototype.scaleToFill = function(w,h) {
	JSView.prototype.scaleToFill.call(this,w,h);
	this.loader.style.width = this.getWidth() + "px";
	this.loader.style.height = this.getHeight() + "px";
}
RCImage.prototype.__class__ = RCImage;
RCSwf = function(x,y,URL,newDomain) {
	if( x === $_ ) return;
	if(newDomain == null) newDomain = true;
	this.newDomain = newDomain;
	this.id_ = "swf_";
	RCImage.call(this,x,y,URL);
}
RCSwf.__name__ = ["RCSwf"];
RCSwf.__super__ = RCImage;
for(var k in RCImage.prototype ) RCSwf.prototype[k] = RCImage.prototype[k];
RCSwf.prototype.target = null;
RCSwf.prototype.event = null;
RCSwf.prototype.newDomain = null;
RCSwf.prototype.id_ = null;
RCSwf.prototype.initWithContentsOfFile = function(URL) {
	this.isLoaded = false;
	this.percentLoaded = 0;
	this.layer.id = this.id_;
	RCWindow.target.appendChild(this.layer);
	this.target = new js.SWFObject(URL,this.id_,500,400,"9","#cecece");
	this.target.addParam("AllowScriptAccess","always");
	this.target.addParam("AllowNetworking","all");
	this.target.addParam("wmode","transparent");
	this.target.write(this.id_);
}
RCSwf.prototype.completeHandler = function(e) {
	this.onComplete();
}
RCSwf.prototype.callMethod = function(method,params) {
	return Reflect.field(this.target,method).apply(this.target,params);
}
RCSwf.prototype.destroy = function() {
	this.removeListeners();
	try {
		this.loader.contentLoaderInfo.content.destroy();
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "RCSwf.hx", lineNumber : 87, className : "RCSwf", methodName : "destroy"});
		var stack = haxe.Stack.exceptionStack();
		haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "RCSwf.hx", lineNumber : 89, className : "RCSwf", methodName : "destroy"});
	}
}
RCSwf.prototype.__class__ = RCSwf;
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
		this.graphics = view;
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "RCDraw.hx", lineNumber : 36, className : "RCDraw", methodName : "new"});
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
	var html = "<div style=\"position:absolute; overflow:hidden;";
	html += "left:0px; top:0px;";
	html += "margin:0px 0px 0px 0px;";
	html += "width:" + this.size.width + "px;";
	html += "height:" + this.size.height + "px;";
	html += "background-color:" + fillColorStyle + ";";
	if(strokeColorStyle != null) html += "border-style:solid; border-width:" + this.borderThickness + "px; border-color:" + strokeColorStyle + ";";
	if(this.roundness != null) html += "-moz-border-radius:" + this.roundness / 2 + "px; border-radius:" + this.roundness / 2 + "px;";
	html += "\"></div>";
	this.layer.innerHTML = html;
}
RCRectangle.prototype.__class__ = RCRectangle;
RCRectangle.__interfaces__ = [RCDrawInterface];
if(typeof js=='undefined') js = {}
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
EVMouse = function(type,target,pos) {
	if( type === $_ ) return;
	if(target == null) throw "Can't use a null target. " + pos;
	RCSignal.call(this);
	this.type = type;
	this.targets = new List();
	if(Std["is"](target,JSView)) this.target = target.view; else this.target = target;
	return this.addEventListener(pos);
}
EVMouse.__name__ = ["EVMouse"];
EVMouse.__super__ = RCSignal;
for(var k in RCSignal.prototype ) EVMouse.prototype[k] = RCSignal.prototype[k];
EVMouse.prototype.target = null;
EVMouse.prototype.type = null;
EVMouse.prototype.e = null;
EVMouse.prototype.targets = null;
EVMouse.prototype.addEventListener = function(pos) {
	var $it0 = this.targets.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t.target == this.target && t.type == this.type) {
			haxe.Log.trace("Target already in use by this event type. Called from " + pos,{ fileName : "EVMouse.hx", lineNumber : 71, className : "EVMouse", methodName : "addEventListener"});
			return t.instance;
		}
	}
	this.targets.add({ target : this.target, type : this.type, instance : this});
	switch(this.type) {
	case EVMouse.UP:
		this.target.onmouseup = $closure(this,"mouseHandler");
		break;
	case EVMouse.DOWN:
		this.target.onmousedown = $closure(this,"mouseHandler");
		break;
	case EVMouse.OVER:
		this.target.onmouseover = $closure(this,"mouseHandler");
		break;
	case EVMouse.OUT:
		this.target.onmouseout = $closure(this,"mouseHandler");
		break;
	case EVMouse.MOVE:
		this.target.onmousemove = $closure(this,"mouseHandler");
		break;
	case EVMouse.CLICK:
		this.target.onclick = $closure(this,"mouseHandler");
		break;
	case EVMouse.DOUBLE_CLICK:
		this.target.ondblclick = $closure(this,"mouseHandler");
		break;
	default:
		haxe.Log.trace("The mouse event you're trying to add does not exist. " + pos,{ fileName : "EVMouse.hx", lineNumber : 84, className : "EVMouse", methodName : "addEventListener"});
	}
	return this;
}
EVMouse.prototype.removeEventListener = function() {
	switch(this.type) {
	case EVMouse.UP:
		this.target.onmouseup = null;
		break;
	case EVMouse.DOWN:
		this.target.onmousedown = null;
		break;
	case EVMouse.OVER:
		this.target.onmouseover = null;
		break;
	case EVMouse.OUT:
		this.target.onmouseout = null;
		break;
	case EVMouse.MOVE:
		this.target.onmousemove = null;
		break;
	case EVMouse.CLICK:
		this.target.onclick = null;
		break;
	case EVMouse.DOUBLE_CLICK:
		this.target.ondblclick = null;
		break;
	}
}
EVMouse.prototype.mouseHandler = function(e) {
	this.dispatch([this],{ fileName : "EVMouse.hx", lineNumber : 113, className : "EVMouse", methodName : "mouseHandler"});
}
EVMouse.prototype.destroy = function() {
	this.removeEventListener();
	RCSignal.prototype.destroy.call(this);
}
EVMouse.prototype.__class__ = EVMouse;
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
if(typeof _RCSlider=='undefined') _RCSlider = {}
_RCSlider.Direction = { __ename__ : ["_RCSlider","Direction"], __constructs__ : ["HORIZONTAL","VERTICAL"] }
_RCSlider.Direction.HORIZONTAL = ["HORIZONTAL",0];
_RCSlider.Direction.HORIZONTAL.toString = $estr;
_RCSlider.Direction.HORIZONTAL.__enum__ = _RCSlider.Direction;
_RCSlider.Direction.VERTICAL = ["VERTICAL",1];
_RCSlider.Direction.VERTICAL.toString = $estr;
_RCSlider.Direction.VERTICAL.__enum__ = _RCSlider.Direction;
RCSlider = function(x,y,w,h,skin) {
	if( x === $_ ) return;
	RCControl.call(this,x,y);
	this.size.width = w;
	this.size.height = h;
	this.moving_ = false;
	this.minValue_ = 0.0;
	this.maxValue_ = 100.0;
	this.value_ = 0.0;
	this.skin = skin;
	try {
		skin.normal.background.setWidth(w);
	} catch( e ) {
	}
	skin.normal.otherView.setY(Math.round((h - skin.normal.otherView.getHeight()) / 2));
	this.scrubber = skin.normal.otherView;
	this.addChild(skin.normal.background);
	this.addChild(this.scrubber);
	this.direction_ = this.size.width > this.size.height?_RCSlider.Direction.HORIZONTAL:_RCSlider.Direction.VERTICAL;
	this.press.add($closure(this,"mouseDownHandler"));
	this.over.add($closure(this,"rollOverHandler"));
	this.out.add($closure(this,"rollOutHandler"));
}
RCSlider.__name__ = ["RCSlider"];
RCSlider.__super__ = RCControl;
for(var k in RCControl.prototype ) RCSlider.prototype[k] = RCControl.prototype[k];
RCSlider.prototype.value_ = null;
RCSlider.prototype.minValue_ = null;
RCSlider.prototype.maxValue_ = null;
RCSlider.prototype.moving_ = null;
RCSlider.prototype.direction_ = null;
RCSlider.prototype.mouseUpOverStage_ = null;
RCSlider.prototype.mouseMoveOverStage_ = null;
RCSlider.prototype.skin = null;
RCSlider.prototype.minValue = null;
RCSlider.prototype.maxValue = null;
RCSlider.prototype.value = null;
RCSlider.prototype.minimumValueImage = null;
RCSlider.prototype.maximumValueImage = null;
RCSlider.prototype.background = null;
RCSlider.prototype.scrubber = null;
RCSlider.prototype.valueChanged = null;
RCSlider.prototype.configureDispatchers = function() {
	RCControl.prototype.configureDispatchers.call(this);
	this.valueChanged = new RCSignal();
	this.mouseUpOverStage_ = new EVMouse(EVMouse.UP,RCWindow.stage,{ fileName : "RCSlider.hx", lineNumber : 71, className : "RCSlider", methodName : "configureDispatchers"});
	this.mouseMoveOverStage_ = new EVMouse(EVMouse.MOVE,RCWindow.stage,{ fileName : "RCSlider.hx", lineNumber : 72, className : "RCSlider", methodName : "configureDispatchers"});
}
RCSlider.prototype.setEnabled = function(c) {
	return this.enabled_ = false;
}
RCSlider.prototype.mouseDownHandler = function(e) {
	haxe.Log.trace("mouseDownHandler",{ fileName : "RCSlider.hx", lineNumber : 83, className : "RCSlider", methodName : "mouseDownHandler"});
	this.moving_ = true;
	this.mouseUpOverStage_.add($closure(this,"mouseUpHandler"));
	this.mouseMoveOverStage_.add($closure(this,"mouseMoveHandler"));
	this.mouseMoveHandler(e);
}
RCSlider.prototype.mouseUpHandler = function(e) {
	this.moving_ = false;
	this.mouseUpOverStage_.remove($closure(this,"mouseUpHandler"));
	this.mouseMoveOverStage_.remove($closure(this,"mouseMoveHandler"));
}
RCSlider.prototype.mouseMoveHandler = function(e) {
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
RCSlider.prototype.getValue = function() {
	return this.value_;
}
RCSlider.prototype.setValue = function(v) {
	var x1 = 0.0, x2 = 0.0;
	this.value_ = v;
	switch( (this.direction_)[1] ) {
	case 0:
		x2 = this.size.width - this.scrubber.getWidth();
		this.scrubber.setX(Zeta.lineEquationInt(x1,x2,v,this.minValue_,this.maxValue_));
		if(this.skin.highlighted.background != null) this.skin.highlighted.background.setWidth(this.scrubber.x);
		break;
	case 1:
		x2 = this.size.height - this.scrubber.getHeight();
		this.scrubber.setY(Zeta.lineEquationInt(x1,x2,v,this.minValue_,this.maxValue_));
		break;
	}
	this.valueChanged.dispatch([this],{ fileName : "RCSlider.hx", lineNumber : 144, className : "RCSlider", methodName : "setValue"});
	return this.value_;
}
RCSlider.prototype.setMinValue = function(v) {
	this.minValue_ = v;
	this.setValue(this.value_);
	return v;
}
RCSlider.prototype.setMaxValue = function(v) {
	this.maxValue_ = v;
	this.setValue(this.value_);
	return v;
}
RCSlider.prototype.setMinimumValueImage = function(v) {
	return v;
}
RCSlider.prototype.setMaximumValueImage = function(v) {
	return v;
}
RCSlider.prototype.destroy = function() {
	this.mouseUpOverStage_.destroy();
	this.mouseMoveOverStage_.destroy();
	this.valueChanged.destroy();
	this.skin.destroy();
	RCControl.prototype.destroy.call(this);
}
RCSlider.prototype.__class__ = RCSlider;
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
RCSkin.prototype.destroy = function() {
}
RCSkin.prototype.__class__ = RCSkin;
haxe.SKSlider = function(colors) {
	if( colors === $_ ) return;
	RCSkin.call(this,colors);
	var w = 160;
	var h = 8;
	this.normal.background = new RCRectangle(0,0,w,h,6710886,1,8);
	this.normal.background.addChild(new RCRectangle(4,2,w - 8,2,16777215,0.2));
	this.normal.otherView = new RCEllipse(0,-h / 2,h * 2,h * 2,3355443);
	this.normal.otherView.addChild(new RCEllipse(1,1,h * 2 - 2,h * 2 - 2,16763904));
	this.normal.otherView.addChild(new RCEllipse(3,3,h * 2 - 6,h * 2 - 6,16777215,0.1));
	this.hit = new JSView(0,0);
}
haxe.SKSlider.__name__ = ["haxe","SKSlider"];
haxe.SKSlider.__super__ = RCSkin;
for(var k in RCSkin.prototype ) haxe.SKSlider.prototype[k] = RCSkin.prototype[k];
haxe.SKSlider.prototype.__class__ = haxe.SKSlider;
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
CAObject = function(obj,properties,duration,delay,Eq,pos) {
	if( obj === $_ ) return;
	this.target = obj;
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
	this.fillEllipse(Math.round(this.size.width / 2),Math.round(this.size.height / 2),this.size.width,this.size.height);
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
	this.layer.innerHTML = iHtml.join("");
	return this.layer;
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
RCAttach = function(x,y,id) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.id = id;
	this.target = RCAssets.getFileWithKey(id);
}
RCAttach.__name__ = ["RCAttach"];
RCAttach.__super__ = JSView;
for(var k in JSView.prototype ) RCAttach.prototype[k] = JSView.prototype[k];
RCAttach.prototype.target = null;
RCAttach.prototype.id = null;
RCAttach.prototype.clone = function() {
	return new RCAttach(this.x,this.y,this.id);
}
RCAttach.prototype.__class__ = RCAttach;
RCTextRoll = function(x,y,w,h,str,properties) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.size.width = w;
	this.continuous = true;
	this.txt1 = new RCTextView(0,0,null,h,str,properties);
	this.addChild(this.txt1);
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
	haxe.Log.trace("viewdidappear",{ fileName : "RCTextRoll.hx", lineNumber : 41, className : "RCTextRoll", methodName : "viewDidAppear"});
	this.size.height = this.txt1.getHeight();
	haxe.Log.trace(this.size,{ fileName : "RCTextRoll.hx", lineNumber : 42, className : "RCTextRoll", methodName : "viewDidAppear"});
	if(this.txt1.getWidth() > this.size.width) {
		this.txt2 = new RCTextView(Math.round(this.txt1.getWidth() + 20),0,null,this.size.height,this.getText(),this.txt1.rcfont);
		this.addChild(this.txt2);
		this.setClipsToBounds(true);
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
	this.dispatch([w,h],{ fileName : "EVResize.hx", lineNumber : 26, className : "EVResize", methodName : "resizeHandler"});
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
	haxe.Log.trace("init",{ fileName : "RCWindow.hx", lineNumber : 47, className : "RCWindow", methodName : "init"});
	if(RCWindow.init_) return;
	RCWindow.init_ = true;
	RCWindow.target.style.position = "absolute";
	RCWindow.target.style.margin = "0px 0px 0px 0px";
	RCWindow.width = RCWindow.target.scrollWidth;
	RCWindow.height = RCWindow.target.scrollHeight;
	RCWindow.setBackgroundColor(3355443);
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
	RCWindow.target.style.backgroundColor = RCColor.HEXtoString(color);
	return color;
}
RCWindow.setTarget = function(id) {
	RCWindow.target = js.Lib.document.getElementById(id);
}
RCWindow.addChild = function(child) {
	RCWindow.init();
	if(child != null) {
		child.viewWillAppear();
		child.parent = RCWindow.target;
		RCWindow.target.appendChild(child.layer);
		child.viewDidAppear();
	}
}
RCWindow.removeChild = function(child) {
	if(child != null) {
		child.viewWillDisappear();
		child.parent = null;
		RCWindow.target.removeChild(child.layer);
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
RCSegmentedControl = function(x,y,w,h,skin) {
	if( x === $_ ) return;
	JSView.call(this,x,y,w,h);
	this.skin = skin;
	this.items = new HashArray();
	this.click = new RCSignal();
}
RCSegmentedControl.__name__ = ["RCSegmentedControl"];
RCSegmentedControl.__super__ = JSView;
for(var k in JSView.prototype ) RCSegmentedControl.prototype[k] = JSView.prototype[k];
RCSegmentedControl.prototype.skin = null;
RCSegmentedControl.prototype.labels = null;
RCSegmentedControl.prototype.items = null;
RCSegmentedControl.prototype.gapX = null;
RCSegmentedControl.prototype.gapY = null;
RCSegmentedControl.prototype.click = null;
RCSegmentedControl.prototype.selectedIndex = null;
RCSegmentedControl.prototype.initWithLabels = function(labels) {
	this.labels = labels;
	var i = 0;
	var _g = 0;
	while(_g < labels.length) {
		var label = labels[_g];
		++_g;
		if(this.items.exists(label)) continue;
		var b = this.constructButton(i);
		b.click.add($closure(this,"clickHandler"));
		this.items.set(label,b);
		i++;
	}
	this.keepButtonsArranged();
}
RCSegmentedControl.prototype.constructButton = function(i) {
	var position = "left";
	switch(i) {
	case 0:
		position = "left";
		break;
	case this.items.arr.length - 1:
		position = "right";
		break;
	default:
		position = "middle";
	}
	var segmentWidth = Math.round(this.size.width / this.items.arr.length);
	var s = new ios.SKSegment(this.labels[i],segmentWidth,this.size.height,position,null);
	var b = new RCButtonRadio(0,0,s);
	return b;
}
RCSegmentedControl.prototype.getIndex = function() {
	return this.selectedIndex;
}
RCSegmentedControl.prototype.setIndex = function(i) {
	this.selectedIndex = i;
	return this.getIndex();
}
RCSegmentedControl.prototype.remove = function(label) {
	if(this.items.exists(label)) {
		Fugu.safeDestroy(this.items.get(label),null,{ fileName : "RCSegmentedControl.hx", lineNumber : 86, className : "RCSegmentedControl", methodName : "remove"});
		this.items.remove(label);
	}
	this.keepButtonsArranged();
}
RCSegmentedControl.prototype.update = function(labels,constructor_) {
	this.destroy();
	this.items = new HashArray();
	this.initWithLabels(labels);
}
RCSegmentedControl.prototype.keepButtonsArranged = function() {
	var _g1 = 0, _g = this.items.array().length;
	while(_g1 < _g) {
		var i = _g1++;
		var newX = 0.0, newY = 0.0;
		var new_b = this.items.get(this.items.array()[i]);
		var old_b = this.items.get(this.items.array()[i - 1]);
		if(i != 0) {
			if(this.gapX != null) newX = old_b.x + old_b.getWidth() + this.gapX;
			if(this.gapY != null) newY = old_b.y + old_b.getHeight() + this.gapY;
		}
		new_b.setX(newX);
		new_b.setY(newY);
		this.addChild(new_b);
	}
}
RCSegmentedControl.prototype.getIndexForLabel = function(label) {
	var _g1 = 0, _g = this.items.arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this.items.arr[i] == label) return i;
	}
	return -1;
}
RCSegmentedControl.prototype.select = function(label,can_unselect) {
	if(can_unselect == null) can_unselect = true;
	if(this.items.exists(label)) {
		this.items.get(label).toggle();
		if(can_unselect) this.items.get(label).lock(); else this.items.get(label).unlock();
	}
	if(can_unselect) {
		var $it0 = this.items.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			if(key != label) {
				if(this.items.get(key).getToggable()) this.unselect(key);
			}
		}
	}
}
RCSegmentedControl.prototype.unselect = function(label) {
	this.items.get(label).unlock();
	this.items.get(label).untoggle();
}
RCSegmentedControl.prototype.toggled = function(label) {
	return this.items.get(label).getSelected();
}
RCSegmentedControl.prototype.get = function(label) {
	return this.items.get(label);
}
RCSegmentedControl.prototype.exists = function(key) {
	return this.items.exists(key);
}
RCSegmentedControl.prototype.clickHandler = function(b) {
}
RCSegmentedControl.prototype.destroy = function() {
	if(this.items != null) {
		var $it0 = this.items.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			Fugu.safeDestroy(this.items.get(key),null,{ fileName : "RCSegmentedControl.hx", lineNumber : 213, className : "RCSegmentedControl", methodName : "destroy"});
		}
	}
	this.items = null;
	this.click.destroy();
	JSView.prototype.destroy.call(this);
}
RCSegmentedControl.prototype.__class__ = RCSegmentedControl;
RCGroup = function(x,y,gapX,gapY,constructor_) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.gapX = gapX;
	this.gapY = gapY;
	this.constructor_ = constructor_;
	this.items = new Array();
	this.itemPush = new RCSignal();
	this.itemRemove = new RCSignal();
	this.update = new RCSignal();
}
RCGroup.__name__ = ["RCGroup"];
RCGroup.__super__ = JSView;
for(var k in JSView.prototype ) RCGroup.prototype[k] = JSView.prototype[k];
RCGroup.prototype.items = null;
RCGroup.prototype.constructor_ = null;
RCGroup.prototype.gapX = null;
RCGroup.prototype.gapY = null;
RCGroup.prototype.itemPush = null;
RCGroup.prototype.itemRemove = null;
RCGroup.prototype.update = null;
RCGroup.prototype.add = function(params,alternativeConstructor) {
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
		this.itemPush.dispatch([new RCIndexPath(0,i)],{ fileName : "RCGroup.hx", lineNumber : 56, className : "RCGroup", methodName : "add"});
		i++;
	}
	this.keepItemsArranged();
}
RCGroup.prototype.remove = function(i) {
	Fugu.safeDestroy(this.items[i],null,{ fileName : "RCGroup.hx", lineNumber : 66, className : "RCGroup", methodName : "remove"});
	this.keepItemsArranged();
	this.itemRemove.dispatch([new RCIndexPath(0,i)],{ fileName : "RCGroup.hx", lineNumber : 71, className : "RCGroup", methodName : "remove"});
}
RCGroup.prototype.keepItemsArranged = function() {
	var _g1 = 0, _g = this.items.length;
	while(_g1 < _g) {
		var i = _g1++;
		var newX = 0.0, newY = 0.0;
		var new_s = this.items[i];
		var old_s = this.items[i - 1];
		if(i != 0) {
			if(this.gapX != null) newX = old_s.x + old_s.size.width + this.gapX;
			if(this.gapY != null) newY = old_s.y + old_s.size.height + this.gapY;
		}
		new_s.setX(newX);
		new_s.setY(newY);
	}
	this.update.dispatch(null,{ fileName : "RCGroup.hx", lineNumber : 94, className : "RCGroup", methodName : "keepItemsArranged"});
}
RCGroup.prototype.viewDidAppear = function() {
}
RCGroup.prototype.get = function(i) {
	return this.items[i];
}
RCGroup.prototype.destroy = function() {
	Fugu.safeDestroy(this.items,null,{ fileName : "RCGroup.hx", lineNumber : 124, className : "RCGroup", methodName : "destroy"});
	this.items = null;
}
RCGroup.prototype.__class__ = RCGroup;
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
	this.layer.innerHTML = "";
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
			var setter = "set" + prop.substr(0,1).toUpperCase() + prop.substr(1);
			if(setter != null) Reflect.field(this.target,setter).apply(this.target,[val]);
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "CATween.hx", lineNumber : 52, className : "CATween", methodName : "animate"});
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
HashArray = function(p) {
	if( p === $_ ) return;
	Hash.call(this);
	this.arr = new Array();
}
HashArray.__name__ = ["HashArray"];
HashArray.__super__ = Hash;
for(var k in Hash.prototype ) HashArray.prototype[k] = Hash.prototype[k];
HashArray.prototype.arr = null;
HashArray.prototype.set = function(key,value) {
	if(!Hash.prototype.exists.call(this,key)) this.arr.push(key);
	Hash.prototype.set.call(this,key,value);
}
HashArray.prototype.remove = function(key) {
	this.arr.remove(key);
	return Hash.prototype.remove.call(this,key);
}
HashArray.prototype.insert = function(pos,key,value) {
	if(Hash.prototype.exists.call(this,key)) return;
	this.arr.insert(pos,key);
	Hash.prototype.set.call(this,key,value);
}
HashArray.prototype.array = function() {
	return this.arr;
}
HashArray.prototype.__class__ = HashArray;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
RCIndexPath = function(section,row) {
	if( section === $_ ) return;
	this.section = section;
	this.row = row;
}
RCIndexPath.__name__ = ["RCIndexPath"];
RCIndexPath.prototype.section = null;
RCIndexPath.prototype.row = null;
RCIndexPath.prototype.hasNext = function() {
	return true;
}
RCIndexPath.prototype.next = function() {
	return this;
}
RCIndexPath.prototype.toString = function() {
	return "[RCIndexPath section : " + this.section + ", row : " + this.row + "]";
}
RCIndexPath.prototype.__class__ = RCIndexPath;
if(typeof ios=='undefined') ios = {}
ios.SKSegment = function(label,w,h,pos,colors) {
	if( label === $_ ) return;
	RCSkin.call(this,colors);
	var segmentLeft;
	var segmentMiddle;
	var segmentRight;
	switch(pos) {
	case "left":
		segmentLeft = "L";
		segmentMiddle = "M";
		segmentRight = "MR";
		break;
	case "right":
		segmentLeft = "ML";
		segmentMiddle = "M";
		segmentRight = "R";
		break;
	default:
		segmentLeft = "ML";
		segmentMiddle = "M";
		segmentRight = "MR";
	}
	var segLeft = new RCAttach(0,0,"Segment" + segmentLeft);
	var segMiddle = new RCAttach(0,0,"Segment" + segmentMiddle);
	var segRight = new RCAttach(0,0,"Segment" + segmentRight);
	var segLeftSelected = new RCAttach(0,0,"Segment" + segmentLeft + "Selected");
	var segMiddleSelected = new RCAttach(0,0,"Segment" + segmentMiddle + "Selected");
	var segRightSelected = new RCAttach(0,0,"Segment" + segmentRight + "Selected");
	segLeft.setX(0);
	segMiddle.setX(segLeft.getWidth());
	segMiddle.setWidth(w - segLeft.getWidth() - segRight.getWidth());
	segRight.setX(w - segRight.getWidth());
	segLeftSelected.setX(0);
	segMiddleSelected.setX(segLeftSelected.getWidth());
	segMiddleSelected.setWidth(w - segLeftSelected.getWidth() - segRightSelected.getWidth());
	segRightSelected.setX(w - segRightSelected.getWidth());
	var font = RCFont.boldSystemFontOfSize(25);
	this.normal.background = new JSView(0,0);
	this.normal.background.addChild(segLeft);
	this.normal.background.addChild(segMiddle);
	this.normal.background.addChild(segRight);
	this.normal.label = new RCTextView(0,28,w,30,label,font);
	this.highlighted.background = new JSView(0,0);
	this.highlighted.background.addChild(segLeftSelected);
	this.highlighted.background.addChild(segMiddleSelected);
	this.highlighted.background.addChild(segRightSelected);
	this.highlighted.label = new RCTextView(0,28,w,30,label,font);
	this.hit = new RCRectangle(0,0,w,h,0,0);
}
ios.SKSegment.__name__ = ["ios","SKSegment"];
ios.SKSegment.__super__ = RCSkin;
for(var k in RCSkin.prototype ) ios.SKSegment.prototype[k] = RCSkin.prototype[k];
ios.SKSegment.prototype.__class__ = ios.SKSegment;
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
	this.font = "Arial";
	this.html = true;
	this.embedFonts = true;
	this.autoSize = true;
	this.selectable = false;
	this.color = 14540253;
	this.size = 12;
	this.format = { };
	this.style = { };
}
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
RCFont.prototype.getFormat = function() {
	this.format.align = null;
	this.format.blockIndent = this.blockIndent;
	this.format.bold = this.bold;
	this.format.bullet = this.bullet;
	this.format.color = this.color;
	this.format.font = this.font;
	this.format.italic = this.italic;
	this.format.indent = this.indent;
	this.format.kerning = this.kerning;
	this.format.leading = this.leading;
	this.format.leftMargin = this.leftMargin;
	this.format.letterSpacing = this.letterSpacing;
	this.format.rightMargin = this.rightMargin;
	this.format.size = this.size;
	this.format.tabStops = this.tabStops;
	this.format.target = this.target;
	this.format.underline = this.underline;
	this.format.url = this.url;
	return this.format;
}
RCFont.prototype.getStyleSheet = function() {
	return this.style;
}
RCFont.prototype.__class__ = RCFont;
RCAssets = function(p) {
	if( p === $_ ) return;
	this.photoList = new Hash();
	this.swfList = new Hash();
	this.dataList = new Hash();
	this.nr = 0;
	this.max = 0;
}
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
RCAssets.instance = function() {
	RCAssets.init();
	return RCAssets.INSTANCE;
}
RCAssets.loadFileWithKey = function(key,URL) {
	return RCAssets.instance().set(key,URL);
}
RCAssets.loadFontWithKey = function(key,URL) {
	return RCAssets.instance().set(key,URL,false);
}
RCAssets.getFileWithKey = function(key,returnAsBitmap) {
	if(returnAsBitmap == null) returnAsBitmap = true;
	return RCAssets.instance().get(key,returnAsBitmap);
}
RCAssets.prototype.photoList = null;
RCAssets.prototype.swfList = null;
RCAssets.prototype.dataList = null;
RCAssets.prototype.nr = null;
RCAssets.prototype.max = null;
RCAssets.prototype.set = function(key,URL,newDomain) {
	if(newDomain == null) newDomain = true;
	haxe.Log.trace("set " + key + ", " + URL,{ fileName : "RCAssets.hx", lineNumber : 85, className : "RCAssets", methodName : "set"});
	this.max++;
	if(key == null) key = Std.string(Math.random());
	if(URL.toLowerCase().indexOf(".swf") != -1) this.loadSwf(key,URL,newDomain); else if(URL.toLowerCase().indexOf(".xml") != -1 || URL.toLowerCase().indexOf(".txt") != -1 || URL.toLowerCase().indexOf(".css") != -1) this.loadText(key,URL); else this.loadPhoto(key,URL);
	return true;
}
RCAssets.prototype.loadPhoto = function(key,URL) {
	var photo = new RCImage(0,0,URL);
	photo.onProgress = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"progressHandler"),key,photo);
	photo.onComplete = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"completeHandler"),key,photo);
	photo.onError = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"errorHandler"),key,photo);
}
RCAssets.prototype.loadSwf = function(key,URL,newDomain) {
	if(newDomain == null) newDomain = true;
	var swf = new RCSwf(0,0,URL,newDomain);
	swf.onProgress = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"progressHandler"),key,swf);
	swf.onComplete = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"completeHandler"),key,swf);
	swf.onError = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"errorHandler"),key,swf);
}
RCAssets.prototype.loadText = function(key,URL) {
	var data = new HTTPRequest();
	data.onProgress = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"progressHandler"),key,data);
	data.onComplete = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"completeHandler"),key,data);
	data.onError = (function(f,a1,a2) {
		return function() {
			return f(a1,a2);
		};
	})($closure(this,"errorHandler"),key,data);
	data.readFile(URL);
}
RCAssets.prototype.errorHandler = function(key,media) {
	haxe.Log.trace("Error loading URL for key: '" + key + "' with object: " + media,{ fileName : "RCAssets.hx", lineNumber : 132, className : "RCAssets", methodName : "errorHandler"});
	this.max--;
	RCAssets.onError();
	if(this.nr >= this.max) RCAssets.onComplete();
}
RCAssets.prototype.progressHandler = function(key,obj) {
	RCAssets.currentPercentLoaded.set(key,obj.percentLoaded);
	this.totalProgress();
}
RCAssets.prototype.completeHandler = function(key,obj) {
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
		haxe.Log.trace("this asset does not belong to any supported category. key=" + key,{ fileName : "RCAssets.hx", lineNumber : 149, className : "RCAssets", methodName : "completeHandler"});
	}
	this.onCompleteHandler();
}
RCAssets.prototype.onCompleteHandler = function() {
	this.nr++;
	if(this.nr >= this.max) RCAssets.onComplete();
}
RCAssets.prototype.totalProgress = function() {
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
RCAssets.prototype.get = function(key,returnAsBitmap) {
	if(returnAsBitmap == null) returnAsBitmap = true;
	RCAssets.init();
	if(this.photoList.exists(key)) return this.photoList.get(key).copy(); else if(this.dataList.exists(key)) return this.dataList.get(key); else if(this.swfList.exists(key)) return this.swfList.get(key);
	return null;
}
RCAssets.prototype.__class__ = RCAssets;
Zeta = function() { }
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
				haxe.Log.trace("Position in string not implemented",{ fileName : "Zeta.hx", lineNumber : 47, className : "Zeta", methodName : "isIn"});
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
Zeta.prototype.__class__ = Zeta;
Main = function() { }
Main.__name__ = ["Main"];
Main.lin = null;
Main.ph = null;
Main.circ = null;
Main.req = null;
Main.main = function() {
	haxe.Firebug.redirectTraces();
	haxe.Log.trace("JS",{ fileName : "Main.hx", lineNumber : 21, className : "Main", methodName : "main"});
	try {
		haxe.Log.trace("BEGIN",{ fileName : "Main.hx", lineNumber : 22, className : "Main", methodName : "main"});
		RCWindow.init();
		RCWindow.setBackgroundColor(14540253);
		RCFontManager.init();
		RCAssets.loadFileWithKey("photo","../CoreAnimation/3134265_large.jpg");
		RCAssets.loadFileWithKey("some_text","data.txt");
		RCAssets.onComplete = function() {
			haxe.Log.trace("RCAssets did finish loading assets",{ fileName : "Main.hx", lineNumber : 30, className : "Main", methodName : "main"});
			haxe.Log.trace(RCAssets.getFileWithKey("some_text"),{ fileName : "Main.hx", lineNumber : 30, className : "Main", methodName : "main"});
		};
		var rect = new RCRectangle(0,0,300,150,RCColor.greenColor());
		RCWindow.addChild(rect);
		rect.setClipsToBounds(true);
		rect.setCenter(new RCPoint(RCWindow.width / 2,RCWindow.height / 2));
		Main.circ = new RCEllipse(0,0,100,100,RCColor.darkGrayColor());
		RCWindow.addChild(Main.circ);
		var a1 = new CATween(Main.circ,{ x : RCWindow.width - 100, y : 0},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 42, className : "Main", methodName : "main"});
		var a2 = new CATween(Main.circ,{ x : RCWindow.width - 100, y : RCWindow.height - 100},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 43, className : "Main", methodName : "main"});
		var a3 = new CATween(Main.circ,{ x : 0, y : RCWindow.height - 100},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 44, className : "Main", methodName : "main"});
		var a4 = new CATween(Main.circ,{ x : 0, y : 0},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 45, className : "Main", methodName : "main"});
		var seq = new CASequence([a1,a2,a3,a4]);
		seq.start();
		Main.lin = new RCLine(30,300,400,600,16724736);
		RCWindow.addChild(Main.lin);
		Main.ph = new RCImage(1,1,"../CoreAnimation/3134265_large.jpg");
		Main.ph.onComplete = Main.resizePhoto;
		rect.addChild(Main.ph);
		var f = new RCFont();
		f.color = 16777215;
		f.font = "Arial";
		f.size = 30;
		f.embedFonts = false;
		var t = new RCTextView(50,30,null,null,"HTML5",f);
		RCWindow.addChild(t);
		var f2 = f.copy();
		f2.color = 3355443;
		f2.size = 16;
		var r = new RCTextRoll(50,60,200,null,"We are working on the HTML5 version of the gallery...",f2.copy());
		RCWindow.addChild(r);
		r.start();
		r.setBackgroundColor(16777215);
		var k = new RCKeys();
		k.onLeft = Main.moveLeft;
		k.onRight = Main.moveRight;
		var m = new EVMouse(EVMouse.OVER,rect.layer,{ fileName : "Main.hx", lineNumber : 77, className : "Main", methodName : "main"});
		m.add(function(_) {
			haxe.Log.trace("onOver",{ fileName : "Main.hx", lineNumber : 78, className : "Main", methodName : "main"});
		});
		Main.testSignals();
		var s = new haxe.SKButton("Play");
		var b = new RCButton(50,200,s);
		b.onClick = function() {
			haxe.Log.trace("click",{ fileName : "Main.hx", lineNumber : 93, className : "Main", methodName : "main"});
		};
		b.onOver = function() {
			haxe.Log.trace("over",{ fileName : "Main.hx", lineNumber : 94, className : "Main", methodName : "main"});
		};
		b.onOut = function() {
			haxe.Log.trace("out",{ fileName : "Main.hx", lineNumber : 95, className : "Main", methodName : "main"});
		};
		b.onPress = function() {
			haxe.Log.trace("press",{ fileName : "Main.hx", lineNumber : 96, className : "Main", methodName : "main"});
		};
		b.onRelease = function() {
			haxe.Log.trace("release",{ fileName : "Main.hx", lineNumber : 97, className : "Main", methodName : "main"});
		};
		RCWindow.addChild(b);
		var s1 = new haxe.SKButtonRadio();
		var b1 = new RCButtonRadio(200,200,s1);
		RCWindow.addChild(b1);
		var group = new RCGroup(200,230,10,null,Main.createRadioButton);
		RCWindow.addChild(group);
		group.add([1,2,3,4,5,5]);
		var seg = new RCSegmentedControl(200,300,160,50,ios.SKSegment);
		RCWindow.addChild(seg);
		seg.initWithLabels(["Masculin","Feminin"]);
		var s2 = new haxe.SKSlider();
		var sl = new RCSlider(50,250,160,10,s2);
		RCWindow.addChild(sl);
		sl.setValue(30);
		Main.req = new HTTPRequest();
		Main.req.onComplete = function() {
			haxe.Log.trace(Main.req.result,{ fileName : "Main.hx", lineNumber : 124, className : "Main", methodName : "main"});
		};
		Main.req.onError = function() {
			haxe.Log.trace(Main.req.result,{ fileName : "Main.hx", lineNumber : 125, className : "Main", methodName : "main"});
		};
		Main.req.onStatus = function() {
			haxe.Log.trace(Main.req.status,{ fileName : "Main.hx", lineNumber : 126, className : "Main", methodName : "main"});
		};
		Main.req.readFile("data.txt");
	} catch( e ) {
		Fugu.stack();
	}
}
Main.createRadioButton = function(indexPath) {
	var s = new haxe.SKButtonRadio();
	var b = new RCButtonRadio(0,0,s);
	return b;
}
Main.createSegmentButton = function(i) {
	var s = new haxe.SKButton("lklklk" + Std.random(10));
	var b = new RCButtonRadio(0,0,s);
	return b;
}
Main.resizePhoto = function() {
	haxe.Log.trace("onComplete image",{ fileName : "Main.hx", lineNumber : 152, className : "Main", methodName : "resizePhoto"});
	Main.ph.scaleToFill(298,148);
	var ph2 = Main.ph.copy();
	ph2.setX(800);
	RCWindow.addChild(ph2);
	var anim = new CATween(Main.ph,{ x : { fromValue : -Main.ph.getWidth(), toValue : Main.ph.getWidth()}},2,0,caequations.Cubic.IN_OUT,{ fileName : "Main.hx", lineNumber : 163, className : "Main", methodName : "resizePhoto"});
	anim.repeatCount = 5;
	anim.autoreverses = true;
	CoreAnimation.add(anim);
}
Main.printNr = function(nr) {
	haxe.Log.trace("printNr " + nr,{ fileName : "Main.hx", lineNumber : 170, className : "Main", methodName : "printNr"});
}
Main.printNr2 = function(nr) {
	haxe.Log.trace("printNr2 " + nr,{ fileName : "Main.hx", lineNumber : 173, className : "Main", methodName : "printNr2"});
}
Main.moveLeft = function() {
	var _g = Main.circ;
	_g.setX(_g.x - 10);
}
Main.moveRight = function() {
	var _g = Main.circ;
	_g.setX(_g.x + 10);
}
Main.signal = null;
Main.testSignals = function() {
	Main.signal = new RCSignal();
	Main.signal.add(Main.printNr);
	Main.signal.addOnce(Main.printNr2,{ fileName : "Main.hx", lineNumber : 187, className : "Main", methodName : "testSignals"});
	Main.signal.remove(Main.printNr);
	Main.signal.removeAll();
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		Main.signal.dispatch([Math.random()],{ fileName : "Main.hx", lineNumber : 191, className : "Main", methodName : "testSignals"});
	}
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
Fugu = function() { }
Fugu.__name__ = ["Fugu"];
Fugu.safeDestroy = function(obj,destroy,pos) {
	if(obj == null) return false;
	var objs = Std["is"](obj,Array)?obj:[obj];
	var _g = 0;
	while(_g < objs.length) {
		var o = objs[_g];
		++_g;
		if(o == null) continue;
		if(destroy == true || destroy == null) try {
			o.destroy();
		} catch( e ) {
			haxe.Log.trace("[Error when destroying object: " + o + ", called from " + Std.string(pos) + "]",{ fileName : "Fugu.hx", lineNumber : 33, className : "Fugu", methodName : "safeDestroy"});
			haxe.Log.trace(haxe.Stack.toString(haxe.Stack.exceptionStack()),{ fileName : "Fugu.hx", lineNumber : 34, className : "Fugu", methodName : "safeDestroy"});
		}
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
	return true;
}
Fugu.safeRemove = function(obj) {
	return Fugu.safeDestroy(obj,false,{ fileName : "Fugu.hx", lineNumber : 44, className : "Fugu", methodName : "safeRemove"});
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
	haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "Fugu.hx", lineNumber : 157, className : "Fugu", methodName : "stack"});
}
Fugu.prototype.__class__ = Fugu;
haxe.SKButton = function(label_str,colors) {
	if( label_str === $_ ) return;
	RCSkin.call(this,colors);
	var f = RCFont.boldSystemFontOfSize(11);
	f.color = 0;
	f.align = "center";
	this.normal.label = new RCTextView(0,4,70,20,label_str,f);
	this.normal.label.setY(Math.round((20 - this.normal.label.getHeight()) / 2));
	this.normal.background = new RCRectangle(0,0,70,20,10066329,1,8);
	this.normal.background.addChild(new RCRectangle(1,1,68,18,16711422,1,6));
	this.highlighted.background = new RCRectangle(0,0,70,20,3355443,1,8);
	this.highlighted.background.addChild(new RCRectangle(1,1,68,18,16770816,1,6));
	this.hit = new RCRectangle(0,0,70,20,16777215,0);
}
haxe.SKButton.__name__ = ["haxe","SKButton"];
haxe.SKButton.__super__ = RCSkin;
for(var k in RCSkin.prototype ) haxe.SKButton.prototype[k] = RCSkin.prototype[k];
haxe.SKButton.prototype.__class__ = haxe.SKButton;
RCFontManager = function(p) {
}
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
RCFontManager.prototype.fontsDomain = null;
RCFontManager.prototype.fontsSwfList = null;
RCFontManager.prototype.event = null;
RCFontManager.prototype._defaultStyleSheetData = null;
RCFontManager.prototype.hash_style = null;
RCFontManager.prototype.hash_rcfont = null;
RCFontManager.prototype.initDefaults = function() {
	this.hash_style = new Hash();
	this.hash_rcfont = new Hash();
	this.fontsSwfList = new Array();
	this._defaultStyleSheetData = { a_link : { color : "#999999", textDecoration : "underline"}, a_hover : { color : "#33CCFF"}, h1 : { size : 16}};
	RCFontManager.registerStyle("default",this._defaultStyleSheetData);
}
RCFontManager.prototype.push = function(e) {
	this.fontsSwfList.push(e);
}
RCFontManager.prototype.setCSSFile = function(css) {
}
RCFontManager.prototype.createStyle = function(properties,exceptions) {
	var style = null;
	return style;
}
RCFontManager.prototype.__class__ = RCFontManager;
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
haxe.SKButtonRadio = function(colors) {
	if( colors === $_ ) return;
	RCSkin.call(this,colors);
	var r = 14;
	this.normal.background = new RCEllipse(0,0,r,r,10066329);
	this.normal.background.addChild(new RCEllipse(1,1,r - 2,r - 2,16645629));
	this.normal.label = new JSView(0,0);
	this.highlighted.background = new RCEllipse(0,0,r,r,3355443);
	this.highlighted.background.addChild(new RCEllipse(1,1,r - 2,r - 2,10066329));
	this.highlighted.label = new RCEllipse(r / 2 - 4 / 2,r / 2 - 4 / 2,4,4,16777215);
	this.selected.background = new RCEllipse(0,0,r,r,3355443);
	this.selected.background.addChild(new RCEllipse(1,1,r - 2,r - 2,16770816));
	this.selected.label = new RCEllipse(r / 2 - 4 / 2,r / 2 - 4 / 2,4,4,3355443);
	this.hit = new RCRectangle(0,0,r,r,16777215);
}
haxe.SKButtonRadio.__name__ = ["haxe","SKButtonRadio"];
haxe.SKButtonRadio.__super__ = RCSkin;
for(var k in RCSkin.prototype ) haxe.SKButtonRadio.prototype[k] = RCSkin.prototype[k];
haxe.SKButtonRadio.prototype.__class__ = haxe.SKButtonRadio;
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
{
	/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;;
	js.SWFObject = deconcept.SWFObject;
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
EVMouse.UP = "mouseup";
EVMouse.DOWN = "mousedown";
EVMouse.OVER = "mouseover";
EVMouse.OUT = "mouseout";
EVMouse.MOVE = "mousemove";
EVMouse.CLICK = "mouseclick";
EVMouse.DOUBLE_CLICK = "mousedoubleclick";
haxe.remoting.ExternalConnection.connections = new Hash();
RCTextRoll.GAP = 20;
js.Lib.onerror = null;
RCWindow.target = js.Lib.document.body;
RCWindow.stage = js.Lib.document;
RCWindow.SCREEN_W = js.Lib.window.screen.width;
RCWindow.SCREEN_H = js.Lib.window.screen.height;
RCWindow.URL = "";
RCWindow.ID = "";
RCWindow.init_ = false;
Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;
Keyboard.ENTER = 13;
Keyboard.SPACE = 32;
Keyboard.ESCAPE = 27;
Zeta.FIT = "fit";
Zeta.END = "end";
Zeta.ANYWHERE = "anywhere";
Zeta.LOWERCASE = "lowercase";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
_RCDraw.LineScaleMode.NONE = null;
Main.main()