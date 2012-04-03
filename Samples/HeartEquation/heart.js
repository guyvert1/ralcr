$estr = function() { return js.Boot.__string_rec(this,''); }
RCDisplayObject = function(p) {
	if( p === $_ ) return;
	this.viewWillAppear = new RCSignal();
	this.viewWillDisappear = new RCSignal();
	this.viewDidAppear = new RCSignal();
	this.viewDidDisappear = new RCSignal();
}
RCDisplayObject.__name__ = ["RCDisplayObject"];
RCDisplayObject.prototype.viewWillAppear = null;
RCDisplayObject.prototype.viewWillDisappear = null;
RCDisplayObject.prototype.viewDidAppear = null;
RCDisplayObject.prototype.viewDidDisappear = null;
RCDisplayObject.prototype.bounds = null;
RCDisplayObject.prototype.size = null;
RCDisplayObject.prototype.contentSize = null;
RCDisplayObject.prototype.center = null;
RCDisplayObject.prototype.clipsToBounds = null;
RCDisplayObject.prototype.backgroundColor = null;
RCDisplayObject.prototype.x = null;
RCDisplayObject.prototype.y = null;
RCDisplayObject.prototype.width = null;
RCDisplayObject.prototype.height = null;
RCDisplayObject.prototype.scaleX = null;
RCDisplayObject.prototype.scaleY = null;
RCDisplayObject.prototype.alpha = null;
RCDisplayObject.prototype.rotation = null;
RCDisplayObject.prototype.visible = null;
RCDisplayObject.prototype.mouseX = null;
RCDisplayObject.prototype.mouseY = null;
RCDisplayObject.prototype.parent = null;
RCDisplayObject.prototype.x_ = null;
RCDisplayObject.prototype.y_ = null;
RCDisplayObject.prototype.scaleX_ = null;
RCDisplayObject.prototype.scaleY_ = null;
RCDisplayObject.prototype.contentSize_ = null;
RCDisplayObject.prototype.originalSize = null;
RCDisplayObject.prototype.caobj = null;
RCDisplayObject.prototype.setVisible = function(v) {
	return this.visible = v;
}
RCDisplayObject.prototype.getAlpha = function() {
	return this.alpha;
}
RCDisplayObject.prototype.setAlpha = function(a) {
	return this.alpha = a;
}
RCDisplayObject.prototype.getX = function() {
	return this.x_;
}
RCDisplayObject.prototype.setX = function(x) {
	return this.x_ = x;
}
RCDisplayObject.prototype.getY = function() {
	return this.y_;
}
RCDisplayObject.prototype.setY = function(y) {
	return this.y_ = y;
}
RCDisplayObject.prototype.getWidth = function() {
	return this.size.width;
}
RCDisplayObject.prototype.setWidth = function(w) {
	return this.size.width = w;
}
RCDisplayObject.prototype.getHeight = function() {
	return this.size.height;
}
RCDisplayObject.prototype.setHeight = function(h) {
	return this.size.height = h;
}
RCDisplayObject.prototype.getContentSize = function() {
	return this.size;
}
RCDisplayObject.prototype.setContentSize = function(s) {
	return this.contentSize = s;
}
RCDisplayObject.prototype.setRotation = function(r) {
	return this.rotation = r;
}
RCDisplayObject.prototype.getRotation = function() {
	return this.rotation;
}
RCDisplayObject.prototype.getBounds = function() {
	return new RCRect(this.x_,this.y_,this.size.width,this.size.height);
}
RCDisplayObject.prototype.setBounds = function(b) {
	this.setX(b.origin.x);
	this.setY(b.origin.y);
	this.setWidth(b.size.width);
	this.setHeight(b.size.height);
	return b;
}
RCDisplayObject.prototype.getScaleX = function() {
	return this.scaleX_;
}
RCDisplayObject.prototype.setScaleX = function(sx) {
	this.scaleX_ = sx;
	this.scale(this.scaleX_,this.scaleY_);
	return this.scaleX_;
}
RCDisplayObject.prototype.getScaleY = function() {
	return this.scaleY_;
}
RCDisplayObject.prototype.setScaleY = function(sy) {
	this.scaleY_ = sy;
	this.scale(this.scaleX_,this.scaleY_);
	return this.scaleY_;
}
RCDisplayObject.prototype.setClipsToBounds = function(clip) {
	return clip;
}
RCDisplayObject.prototype.setBackgroundColor = function(color) {
	return color;
}
RCDisplayObject.prototype.setCenter = function(pos) {
	this.center = pos;
	this.setX(Std["int"](pos.x - this.size.width / 2));
	this.setY(Std["int"](pos.y - this.size.height / 2));
	return this.center;
}
RCDisplayObject.prototype.scaleToFit = function(w,h) {
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
RCDisplayObject.prototype.scaleToFill = function(w,h) {
	if(w / this.originalSize.width > h / this.originalSize.height) {
		this.setWidth(w);
		this.setHeight(w * this.originalSize.height / this.originalSize.width);
	} else {
		this.setHeight(h);
		this.setWidth(h * this.originalSize.width / this.originalSize.height);
	}
}
RCDisplayObject.prototype.scale = function(sx,sy) {
}
RCDisplayObject.prototype.resetScale = function() {
	this.setWidth(this.originalSize.width);
	this.setHeight(this.originalSize.height);
}
RCDisplayObject.prototype.getMouseX = function() {
	return 0;
}
RCDisplayObject.prototype.getMouseY = function() {
	return 0;
}
RCDisplayObject.prototype.addChild = function(child) {
}
RCDisplayObject.prototype.addChildAt = function(child,index) {
}
RCDisplayObject.prototype.removeChild = function(child) {
}
RCDisplayObject.prototype.addAnimation = function(obj) {
	CoreAnimation.add(this.caobj = obj);
}
RCDisplayObject.prototype.destroy = function() {
	CoreAnimation.remove(this.caobj);
	this.size = null;
}
RCDisplayObject.prototype.toString = function() {
	return "[RCView bounds:" + this.getBounds().origin.x + "x" + this.getBounds().origin.x + "," + this.getBounds().size.width + "x" + this.getBounds().size.height + "]";
}
RCDisplayObject.prototype.__class__ = RCDisplayObject;
JSView = function(x,y,w,h) {
	if( x === $_ ) return;
	RCDisplayObject.call(this);
	this.size = new RCSize(w,h);
	this.contentSize_ = this.size.copy();
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
JSView.__super__ = RCDisplayObject;
for(var k in RCDisplayObject.prototype ) JSView.prototype[k] = RCDisplayObject.prototype[k];
JSView.prototype.layer = null;
JSView.prototype.layerScrollable = null;
JSView.prototype.graphics = null;
JSView.prototype.alpha_ = null;
JSView.prototype.addChild = function(child) {
	if(child == null) return;
	child.viewWillAppear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 54, className : "JSView", methodName : "addChild"});
	child.parent = this;
	this.layer.appendChild(child.layer);
	child.viewDidAppear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 57, className : "JSView", methodName : "addChild"});
}
JSView.prototype.addChildAt = function(child,index) {
	if(this.layer.childNodes[index] != null) this.layer.insertBefore(child.layer,this.layer.childNodes[index]); else this.layer.appendChild(child.layer);
}
JSView.prototype.removeChild = function(child) {
	if(child == null) return;
	child.viewWillDisappear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 71, className : "JSView", methodName : "removeChild"});
	child.parent = null;
	this.layer.removeChild(child.layer);
	child.viewDidDisappear.dispatch(null,null,null,null,{ fileName : "JSView.hx", lineNumber : 74, className : "JSView", methodName : "removeChild"});
}
JSView.prototype.removeFromSuperView = function() {
	if(this.parent != null) this.parent.removeChild(this);
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
	this.layer.style.background = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
	return color;
}
JSView.prototype.setClipsToBounds = function(clip) {
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
JSView.prototype.setVisible = function(v) {
	this.layer.style.visibility = v?"visible":"hidden";
	return RCDisplayObject.prototype.setVisible.call(this,v);
}
JSView.prototype.setAlpha = function(a) {
	if(js.Lib.isIE) this.layer.style.background = "url(pixel.png) repeat"; else this.layer.style.opacity = Std.string(a);
	return RCDisplayObject.prototype.setAlpha.call(this,a);
}
JSView.prototype.setX = function(x) {
	this.layer.style.left = Std.string(x * RCDevice.currentDevice().dpiScale) + "px";
	return RCDisplayObject.prototype.setX.call(this,x);
}
JSView.prototype.setY = function(y) {
	this.layer.style.top = Std.string(y * RCDevice.currentDevice().dpiScale) + "px";
	return RCDisplayObject.prototype.setY.call(this,y);
}
JSView.prototype.setWidth = function(w) {
	this.layer.style.width = w + "px";
	return RCDisplayObject.prototype.setWidth.call(this,w);
}
JSView.prototype.setHeight = function(h) {
	this.layer.style.height = h + "px";
	return RCDisplayObject.prototype.setHeight.call(this,h);
}
JSView.prototype.getContentSize = function() {
	this.contentSize_.width = this.layer.scrollWidth;
	this.contentSize_.height = this.layer.scrollHeight;
	return this.contentSize_;
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
	return this.parent.getMouseX() - this.getX();
}
JSView.prototype.getMouseY = function() {
	if(this.parent == null) return this.mouseY;
	return this.parent.getMouseY() - this.getY();
}
JSView.prototype.__class__ = JSView;
RCWindow = function(id) {
	if( id === $_ ) return;
	JSView.call(this,0.0,0.0,0.0,0.0);
	this.stage = js.Lib.document;
	this.setTarget(id);
	this.SCREEN_W = js.Lib.window.screen.width;
	this.SCREEN_H = js.Lib.window.screen.height;
	RCNotificationCenter.addObserver("resize",$closure(this,"resizeHandler"));
}
RCWindow.__name__ = ["RCWindow"];
RCWindow.__super__ = JSView;
for(var k in JSView.prototype ) RCWindow.prototype[k] = JSView.prototype[k];
RCWindow.sharedWindow_ = null;
RCWindow.sharedWindow = function(id) {
	if(RCWindow.sharedWindow_ == null) RCWindow.sharedWindow_ = new RCWindow(id);
	return RCWindow.sharedWindow_;
}
RCWindow.prototype.target = null;
RCWindow.prototype.stage = null;
RCWindow.prototype.SCREEN_W = null;
RCWindow.prototype.SCREEN_H = null;
RCWindow.prototype.modalView = null;
RCWindow.prototype.resizeHandler = function(w,h) {
	this.size.width = w;
	this.size.height = h;
}
RCWindow.prototype.setTarget = function(id) {
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
RCWindow.prototype.setBackgroundColor = function(color) {
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
RCWindow.prototype.fsprefix = null;
RCWindow.prototype.fullscreen = function() {
	if(this.supportsFullScreen()) {
		if(this.fsprefix == null) "requestFullScreen".apply(this.target,[]); else Reflect.field(this.target,this.fsprefix + "RequestFullScreen").apply(this.target,[]);
	}
}
RCWindow.prototype.normal = function() {
	if(this.supportsFullScreen()) {
		if(this.fsprefix == "") "cancelFullScreen".apply(this.target,[]); else Reflect.field(this.target,this.fsprefix + "CancelFullScreen").apply(this.target,[]);
	}
}
RCWindow.prototype.isFullScreen = function() {
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
RCWindow.prototype.supportsFullScreen = function() {
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
RCWindow.prototype.addModalViewController = function(view) {
	this.modalView = view;
	this.modalView.setX(0);
	CoreAnimation.add(new CATween(this.modalView,{ y : { fromValue : this.getHeight(), toValue : 0}},0.5,0,caequations.Cubic.IN_OUT,{ fileName : "RCWindow.hx", lineNumber : 228, className : "RCWindow", methodName : "addModalViewController"}));
	this.addChild(this.modalView);
}
RCWindow.prototype.dismissModalViewController = function() {
	if(this.modalView == null) return;
	var anim = new CATween(this.modalView,{ y : this.getHeight()},0.3,0,caequations.Cubic.IN,{ fileName : "RCWindow.hx", lineNumber : 233, className : "RCWindow", methodName : "dismissModalViewController"});
	anim.delegate.animationDidStop = $closure(this,"destroyModalViewController");
	CoreAnimation.add(anim);
}
RCWindow.prototype.destroyModalViewController = function() {
	this.modalView.destroy();
	this.modalView = null;
}
RCWindow.prototype.getCenterX = function(w) {
	return Math.round(this.getWidth() / 2 - w / RCDevice.currentDevice().dpiScale / 2);
}
RCWindow.prototype.getCenterY = function(h) {
	return Math.round(this.getHeight() / 2 - h / RCDevice.currentDevice().dpiScale / 2);
}
RCWindow.prototype.toString = function() {
	return "[RCWindow target=" + this.target + "]";
}
RCWindow.prototype.__class__ = RCWindow;
if(typeof _RCDraw=='undefined') _RCDraw = {}
_RCDraw.LineScaleMode = function() { }
_RCDraw.LineScaleMode.__name__ = ["_RCDraw","LineScaleMode"];
_RCDraw.LineScaleMode.prototype.__class__ = _RCDraw.LineScaleMode;
RCDraw = function(x,y,w,h,color,alpha) {
	if( x === $_ ) return;
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
	return new RCRect(this.getX(),this.getY(),this.size.width,this.size.height);
}
RCDraw.prototype.__class__ = RCDraw;
if(typeof haxe=='undefined') haxe = {}
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
RCNotificationCenter.prototype.__class__ = RCNotificationCenter;
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
JSCanvas = function() { }
JSCanvas.__name__ = ["JSCanvas"];
JSCanvas.prototype.__class__ = JSCanvas;
EVLoop = function(p) {
}
EVLoop.__name__ = ["EVLoop"];
EVLoop.prototype.ticker = null;
EVLoop.prototype.run = null;
EVLoop.prototype.setFuncToCall = function(func) {
	this.stop();
	this.run = func;
	this.ticker = new haxe.Timer(Math.round(1 / EVLoop.FPS * 1000));
	this.ticker.run = $closure(this,"loop");
	return func;
}
EVLoop.prototype.loop = function() {
	if(this.run != null) this.run();
}
EVLoop.prototype.stop = function() {
	if(this.ticker == null) return;
	this.ticker.stop();
	this.ticker = null;
}
EVLoop.prototype.destroy = function() {
	this.stop();
}
EVLoop.prototype.__class__ = EVLoop;
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
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
RCSize = function(w,h) {
	if( w === $_ ) return;
	this.width = w == null?0:w;
	this.height = h == null?0:h;
}
RCSize.__name__ = ["RCSize"];
RCSize.prototype.width = null;
RCSize.prototype.height = null;
RCSize.prototype.copy = function() {
	return new RCSize(this.width,this.height);
}
RCSize.prototype.toString = function() {
	return "[RCSize width:" + this.width + ", height:" + this.height + "]";
}
RCSize.prototype.__class__ = RCSize;
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
Fugu = function() { }
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
		if(Std["is"](o,JSView)) o.removeFromSuperView(); else {
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
	haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "Fugu.hx", lineNumber : 159, className : "Fugu", methodName : "stack"});
}
Fugu.prototype.__class__ = Fugu;
RCIterator = function(interval,min,max,step) {
	if( interval === $_ ) return;
	this.interval = interval;
	this.min = min;
	this.max = max;
	this.step = step;
	this.timer = new haxe.Timer(interval);
}
RCIterator.__name__ = ["RCIterator"];
RCIterator.prototype.min = null;
RCIterator.prototype.max = null;
RCIterator.prototype.step = null;
RCIterator.prototype.percentCompleted = null;
RCIterator.prototype.timer = null;
RCIterator.prototype.interval = null;
RCIterator.prototype.run = function(i) {
}
RCIterator.prototype.onComplete = function() {
}
RCIterator.prototype.start = function() {
	this.run(this.min);
	this.timer.run = $closure(this,"loop");
}
RCIterator.prototype.loop = function() {
	this.min += this.step;
	this.run(this.min);
	if(this.min >= this.max) {
		this.destroy();
		this.onComplete();
	}
}
RCIterator.prototype.destroy = function() {
	if(this.timer != null) {
		this.timer.stop();
		this.timer = null;
	}
}
RCIterator.prototype.__class__ = RCIterator;
RCFont = function(p) {
	if( p === $_ ) return;
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
RCFont.prototype.getStyleSheet = function() {
	return this.style;
}
RCFont.prototype.__class__ = RCFont;
RCSignal = function(p) {
	if( p === $_ ) return;
	this.enabled = true;
	this.removeAll();
}
RCSignal.__name__ = ["RCSignal"];
RCSignal.prototype.listeners = null;
RCSignal.prototype.exposableListener = null;
RCSignal.prototype.enabled = null;
RCSignal.prototype.add = function(listener) {
	this.listeners.add(listener);
}
RCSignal.prototype.addOnce = function(listener,pos) {
	if(this.exists(listener)) haxe.Log.trace("This listener is already added, it will not be called only once as you expect. " + pos,{ fileName : "RCSignal.hx", lineNumber : 22, className : "RCSignal", methodName : "addOnce"});
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
RCSignal.prototype.dispatch = function(p1,p2,p3,p4,pos) {
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
RCSignal.prototype.callMethod = function(listener,args,pos) {
	try {
		listener.apply(null,args);
	} catch( e ) {
		haxe.Log.trace("[RCSignal error: " + e + ", called from: " + Std.string(pos) + "]",{ fileName : "RCSignal.hx", lineNumber : 67, className : "RCSignal", methodName : "callMethod"});
		Fugu.stack();
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
EVResize = function(p) {
	if( p === $_ ) return;
	RCSignal.call(this);
	js.Lib.window.onresize = $closure(this,"resizeHandler");
}
EVResize.__name__ = ["EVResize"];
EVResize.__super__ = RCSignal;
for(var k in RCSignal.prototype ) EVResize.prototype[k] = RCSignal.prototype[k];
EVResize.prototype.resizeHandler = function(e) {
	var w = js.Lib.window.innerWidth;
	var h = js.Lib.window.innerHeight;
	this.dispatch(w,h,null,null,{ fileName : "EVResize.hx", lineNumber : 30, className : "EVResize", methodName : "resizeHandler"});
}
EVResize.prototype.__class__ = EVResize;
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
CoreAnimation.prototype.__class__ = CoreAnimation;
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
RCDrawInterface = function() { }
RCDrawInterface.__name__ = ["RCDrawInterface"];
RCDrawInterface.prototype.configure = null;
RCDrawInterface.prototype.redraw = null;
RCDrawInterface.prototype.__class__ = RCDrawInterface;
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
	html += "width:" + this.size.width * RCDevice.currentDevice().dpiScale + "px;";
	html += "height:" + this.size.height * RCDevice.currentDevice().dpiScale + "px;";
	html += "background-color:" + fillColorStyle + ";";
	if(strokeColorStyle != null) html += "border-style:solid; border-width:" + this.borderThickness + "px; border-color:" + strokeColorStyle + ";";
	if(this.roundness != null) html += "-moz-border-radius:" + this.roundness * RCDevice.currentDevice().dpiScale / 2 + "px; border-radius:" + this.roundness * RCDevice.currentDevice().dpiScale / 2 + "px;";
	html += "\"></div>";
	this.layer.innerHTML = html;
}
RCRectangle.prototype.setWidth = function(w) {
	this.size.width = w;
	this.redraw();
	return w;
}
RCRectangle.prototype.setHeight = function(h) {
	this.size.height = h;
	this.redraw();
	return h;
}
RCRectangle.prototype.__class__ = RCRectangle;
RCRectangle.__interfaces__ = [RCDrawInterface];
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
RCStats = function(x,y) {
	if( x === $_ ) return;
	if(y == null) y = 0;
	if(x == null) x = 0;
	RCRectangle.call(this,x,y,152,18,16777215,0.9,16);
	this.addChild(new RCRectangle(1,1,150,16,3355443,0.3,16));
	var f = RCFont.systemFontOfSize(12);
	f.color = 16777215;
	this.txt = new RCTextView(6,3,null,20,"Calculating...",f);
	this.addChild(this.txt);
	this.last = Date.now().getTime();
	this.e = new EVLoop();
	this.e.setFuncToCall($closure(this,"loop"));
}
RCStats.__name__ = ["RCStats"];
RCStats.__super__ = RCRectangle;
for(var k in RCRectangle.prototype ) RCStats.prototype[k] = RCRectangle.prototype[k];
RCStats.prototype.last = null;
RCStats.prototype.ticks = null;
RCStats.prototype.fps = null;
RCStats.prototype.currMemory = null;
RCStats.prototype.txt = null;
RCStats.prototype.e = null;
RCStats.prototype.loop = function() {
	this.ticks++;
	var now = Date.now().getTime();
	var delta = now - this.last;
	if(delta >= 1000) {
		this.fps = Math.round(this.ticks / delta * 1000);
		this.ticks = 0;
		this.last = now;
		this.txt.setText(this.fps + " FPS,  " + this.currMemory + " Mbytes");
	}
}
RCStats.prototype.destroy = function() {
	this.e.destroy();
	this.txt.destroy();
	RCRectangle.prototype.destroy.call(this);
}
RCStats.prototype.__class__ = RCStats;
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
CAObject = function(target,properties,duration,delay,Eq,pos) {
	if( target === $_ ) return;
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
CATransitionInterface = function() { }
CATransitionInterface.__name__ = ["CATransitionInterface"];
CATransitionInterface.prototype.init = null;
CATransitionInterface.prototype.animate = null;
CATransitionInterface.prototype.__class__ = CATransitionInterface;
CATween = function(target,properties,duration,delay,Eq,pos) {
	if( target === $_ ) return;
	CAObject.call(this,target,properties,duration,delay,Eq,pos);
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
CATween.prototype.animate = function(time_diff) {
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
CATween.prototype.__class__ = CATween;
CATween.__interfaces__ = [CATransitionInterface];
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
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 37, className : "CADelegate", methodName : "start"});
	}
}
CADelegate.prototype.stop = function() {
	if(Reflect.isFunction(this.animationDidStop)) try {
		this.animationDidStop.apply(null,this.arguments);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 43, className : "CADelegate", methodName : "stop"});
		haxe.Log.trace(this.pos.className + " -> " + this.pos.methodName + " -> " + this.pos.lineNumber,{ fileName : "CADelegate.hx", lineNumber : 44, className : "CADelegate", methodName : "stop"});
		var stack = haxe.Stack.exceptionStack();
		haxe.Log.trace(haxe.Stack.toString(stack),{ fileName : "CADelegate.hx", lineNumber : 46, className : "CADelegate", methodName : "stop"});
	}
}
CADelegate.prototype.repeat = function() {
	if(Reflect.isFunction(this.animationDidReversed)) try {
		this.animationDidReversed.apply(null,this.arguments);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 53, className : "CADelegate", methodName : "repeat"});
	}
}
CADelegate.prototype.kbIn = function() {
	this.kenBurnsPointInPassed = true;
	if(Reflect.isFunction(this.kenBurnsDidFadedIn)) try {
		this.kenBurnsDidFadedIn.apply(null,this.kenBurnsArgs);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 59, className : "CADelegate", methodName : "kbIn"});
	}
}
CADelegate.prototype.kbOut = function() {
	this.kenBurnsPointOutPassed = true;
	if(Reflect.isFunction(this.kenBurnsBeginsFadingOut)) try {
		this.kenBurnsBeginsFadingOut.apply(null,this.kenBurnsArgs);
	} catch( e ) {
		haxe.Log.trace(e,{ fileName : "CADelegate.hx", lineNumber : 65, className : "CADelegate", methodName : "kbOut"});
	}
}
CADelegate.prototype.__class__ = CADelegate;
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
RCDeviceOrientation = { __ename__ : ["RCDeviceOrientation"], __constructs__ : ["UIDeviceOrientationUnknown","UIDeviceOrientationPortrait","UIDeviceOrientationPortraitUpsideDown","UIDeviceOrientationLandscapeLeft","UIDeviceOrientationLandscapeRight","UIDeviceOrientationFaceUp","UIDeviceOrientationFaceDown"] }
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
RCDeviceType = { __ename__ : ["RCDeviceType"], __constructs__ : ["IPhone","IPad","Android","WebOS","Mac","Flash"] }
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
RCUserAgent = { __ename__ : ["RCUserAgent"], __constructs__ : ["MSIE","GECKO","WEBKIT","OTHER"] }
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
RCDevice = function(p) {
	if( p === $_ ) return;
	this.dpiScale = 1;
	this.userAgent = this.detectUserAgent();
}
RCDevice.__name__ = ["RCDevice"];
RCDevice._currentDevice = null;
RCDevice.currentDevice = function() {
	if(RCDevice._currentDevice == null) RCDevice._currentDevice = new RCDevice();
	return RCDevice._currentDevice;
}
RCDevice.prototype.name = null;
RCDevice.prototype.model = null;
RCDevice.prototype.systemName = null;
RCDevice.prototype.systemVersion = null;
RCDevice.prototype.orientation = null;
RCDevice.prototype.userInterfaceIdiom = null;
RCDevice.prototype.uniqueIdentifier = null;
RCDevice.prototype.dpiScale = null;
RCDevice.prototype.userAgent = null;
RCDevice.prototype.detectUserAgent = function() {
	var agent = js.Lib.window.navigator.userAgent.toLowerCase();
	if(agent.indexOf("msie") > -1) return RCUserAgent.MSIE;
	if(agent.indexOf("webkit") > -1) return RCUserAgent.WEBKIT;
	if(agent.indexOf("gecko") > -1) return RCUserAgent.GECKO;
	return RCUserAgent.OTHER;
}
RCDevice.prototype.__class__ = RCDevice;
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
if(typeof js=='undefined') js = {}
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
RCTextView = function(x,y,w,h,str,rcfont) {
	if( x === $_ ) return;
	JSView.call(this,Math.round(x),Math.round(y),w,h);
	this.rcfont = rcfont.copy();
	this.setWidth(this.size.width);
	this.setHeight(this.size.height);
	this.viewDidAppear.add($closure(this,"viewDidAppear_"));
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
	if(this.rcfont.autoSize) {
		this.layer.style.width = multiline?this.size.width + "px":"auto";
		this.layer.style.height = "auto";
	} else {
		this.layer.style.width = this.size.width + "px";
		this.layer.style.height = this.size.height + "px";
	}
	if(this.size.width != 0) this.setWidth(this.size.width);
}
RCTextView.prototype.viewDidAppear_ = function() {
	this.size.width = this.getContentSize().width;
}
RCTextView.prototype.getText = function() {
	return this.layer.innerHTML;
}
RCTextView.prototype.setText = function(str) {
	if(this.rcfont.html) this.layer.innerHTML = str; else this.layer.innerHTML = str;
	this.size.width = this.getContentSize().width;
	return str;
}
RCTextView.prototype.destroy = function() {
	this.target = null;
	JSView.prototype.destroy.call(this);
}
RCTextView.prototype.__class__ = RCTextView;
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
RCPoint = function(x,y) {
	if( x === $_ ) return;
	this.x = x == null?0:x;
	this.y = y == null?0:y;
}
RCPoint.__name__ = ["RCPoint"];
RCPoint.prototype.x = null;
RCPoint.prototype.y = null;
RCPoint.prototype.copy = function() {
	return new RCPoint(this.x,this.y);
}
RCPoint.prototype.toString = function() {
	return "[RCPoint x:" + this.x + ", y:" + this.y + "]";
}
RCPoint.prototype.__class__ = RCPoint;
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
RCRect = function(x,y,w,h) {
	if( x === $_ ) return;
	this.origin = new RCPoint(x,y);
	this.size = new RCSize(w,h);
}
RCRect.__name__ = ["RCRect"];
RCRect.prototype.origin = null;
RCRect.prototype.size = null;
RCRect.prototype.copy = function() {
	return new RCRect(this.origin.x,this.origin.y,this.size.width,this.size.height);
}
RCRect.prototype.toString = function() {
	return "[RCRect x:" + this.origin.x + ", y:" + this.origin.y + ", width:" + this.size.width + ", height:" + this.size.height + "]";
}
RCRect.prototype.__class__ = RCRect;
EVFullScreen = function(p) {
	if( p === $_ ) return;
	RCSignal.call(this);
}
EVFullScreen.__name__ = ["EVFullScreen"];
EVFullScreen.__super__ = RCSignal;
for(var k in RCSignal.prototype ) EVFullScreen.prototype[k] = RCSignal.prototype[k];
EVFullScreen.prototype.__class__ = EVFullScreen;
RCAppDelegate = function(p) {
	if( p === $_ ) return;
	RCWindow.sharedWindow();
	JSView.call(this,0,0);
	RCNotificationCenter.addObserver("resize",$closure(this,"resize"));
	RCNotificationCenter.addObserver("fullscreen",$closure(this,"fullscreen"));
	this.applicationDidFinishLaunching();
}
RCAppDelegate.__name__ = ["RCAppDelegate"];
RCAppDelegate.__super__ = JSView;
for(var k in JSView.prototype ) RCAppDelegate.prototype[k] = JSView.prototype[k];
RCAppDelegate.prototype.applicationDidFinishLaunching = function() {
}
RCAppDelegate.prototype.applicationDidBecomeActive = function() {
}
RCAppDelegate.prototype.applicationWillEnterForeground = function() {
}
RCAppDelegate.prototype.applicationWillTerminate = function() {
	haxe.Log.trace("applicationWillTerminate",{ fileName : "RCAppDelegate.hx", lineNumber : 34, className : "RCAppDelegate", methodName : "applicationWillTerminate"});
}
RCAppDelegate.prototype.resize = function(w,h) {
}
RCAppDelegate.prototype.fullscreen = function(b) {
}
RCAppDelegate.prototype.__class__ = RCAppDelegate;
Main = function(p) {
	if( p === $_ ) return;
	RCAppDelegate.call(this);
	this.heart1();
	RCWindow.sharedWindow().addChild(new RCStats());
}
Main.__name__ = ["Main"];
Main.__super__ = RCAppDelegate;
for(var k in RCAppDelegate.prototype ) Main.prototype[k] = RCAppDelegate.prototype[k];
Main.main = function() {
	haxe.Firebug.redirectTraces();
	RCWindow.sharedWindow();
}
Main.prototype.heart1 = function() {
	var _g = 0;
	while(_g < 200) {
		var i = _g++;
		this.drawParticle(i);
	}
}
Main.prototype.drawParticle = function(i) {
	var t = i / 200;
	var p1 = new Particle(400,400,t,-1);
	var p2 = new Particle(400,400,t,1);
	RCWindow.sharedWindow().addChild(p1);
	RCWindow.sharedWindow().addChild(p2);
}
Main.prototype.heart2 = function() {
	var iterator = new RCIterator(4,0,200,1);
	iterator.run = $closure(this,"drawParticle2");
	iterator.start();
}
Main.prototype.drawParticle2 = function(i) {
	var scale = 20;
	var t = i / (200 / 60);
	var a = 0.01 * (-t * t + 40 * t + 1200);
	var x = a * Math.sin(Math.PI * t / 180);
	var y = a * Math.cos(Math.PI * t / 180);
	var p1 = new Particle(800 - x * scale,400 - y * scale,t,-1);
	var p2 = new Particle(800 - x * scale,400 - y * scale,t,1);
	RCWindow.sharedWindow().addChild(p1);
	RCWindow.sharedWindow().addChild(p2);
}
Main.prototype.logx = function(val,base) {
	if(base == null) base = 10;
	return Math.log(val) / Math.log(base);
}
Main.prototype.log10 = function(val) {
	return Math.log(val) * 0.434294481904;
}
Main.prototype.__class__ = Main;
Particle = function(x,y,t,s) {
	if( x === $_ ) return;
	JSView.call(this,x,y);
	this.o_x = x;
	this.o_y = y;
	this.theta = t;
	this.f_x = x;
	this.f_y = y;
	this.current_theta = 0.001;
	this.sign = s;
	this.addChild(new RCRectangle(0,0,1,1,0));
	this.loopEvent = new EVLoop();
	this.loopEvent.setFuncToCall($closure(this,"loopTheta"));
	this.timer = new haxe.Timer(40);
	this.timer.run = $closure(this,"advanceTheta");
}
Particle.__name__ = ["Particle"];
Particle.__super__ = JSView;
for(var k in JSView.prototype ) Particle.prototype[k] = JSView.prototype[k];
Particle.prototype.timer = null;
Particle.prototype.loopEvent = null;
Particle.prototype.o_x = null;
Particle.prototype.o_y = null;
Particle.prototype.f_x = null;
Particle.prototype.f_y = null;
Particle.prototype.theta = null;
Particle.prototype.current_theta = null;
Particle.prototype.sign = null;
Particle.prototype.advanceTheta = function() {
	this.current_theta += (this.theta - this.current_theta) / 5;
	this.fxy();
	if(Math.abs(this.current_theta - this.theta) <= 0.001) {
		this.current_theta = this.theta;
		this.timer.stop();
		this.loopEvent.stop();
		this.fxy();
		this.o_x = this.o_x - this.f_x * 500 * this.sign;
		this.o_y = this.o_y - this.f_y * 500;
		this.changeDirection();
		this.loopEvent.setFuncToCall($closure(this,"loop"));
	}
}
Particle.prototype.fxy = function() {
	this.f_x = Math.sin(this.current_theta) * Math.cos(this.current_theta) * Math.log(Math.abs(this.current_theta));
	this.f_y = Math.sqrt(Math.abs(this.current_theta)) * Math.cos(this.current_theta);
}
Particle.prototype.changeDirection = function() {
	this.f_x = this.o_x + 6 - Math.random() * 12;
	this.f_y = this.o_y + 6 - Math.random() * 12;
}
Particle.prototype.loopTheta = function() {
	this.setX(this.o_x - this.f_x * 500 * this.sign);
	this.setY(this.o_y - this.f_y * 500);
}
Particle.prototype.loop = function() {
	var _g = this;
	_g.setX(_g.getX() + (this.f_x - this.getX()) / 3);
	var _g = this;
	_g.setY(_g.getY() + (this.f_y - this.getY()) / 3);
	if(Math.abs(this.getX() - this.f_x) < 1) this.changeDirection();
}
Particle.prototype.__class__ = Particle;
$_ = {}
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
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
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
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
_RCDraw.LineScaleMode.NONE = null;
EVLoop.FPS = 60;
CoreAnimation.defaultTimingFunction = caequations.Linear.NONE;
CoreAnimation.defaultDuration = 0.8;
RCColor.BLACK = 0;
RCColor.WHITE = 16777215;
RCColor.RED = 16711680;
RCColor.GREEN = 65280;
RCColor.BLUE = 255;
RCColor.CYAN = 65535;
RCColor.YELLOW = 16776960;
js.Lib.onerror = null;
Main.PARTICLES = 200;
Main.main()