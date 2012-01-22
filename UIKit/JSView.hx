//
//  JSView
//
//  Created by Baluta Cristian on 2011-11-12.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//
import js.Lib;
import js.Dom;

class JSView {
	
	public var parent :HtmlDom;
	public var view :HtmlDom;
	public var size :RCSize; // Real size of the view
	public var center (default, setCenter) :RCPoint;
	public var clipsToBounds (default, setClipsToBounds) :Bool;
	public var backgroundColor (default, setBackgroundColor) :Null<Int>;
	public var x (default, setX) :Float;
	public var y (default, setY) :Float;
	public var scaleX (default, setScaleX) :Float;
	public var scaleY (default, setScaleY) :Float;
	public var width (default, setWidth) :Float;
	public var height (default, setHeight) :Float;
	public var alpha (default, setAlpha) :Float;
	public var visible (default, setVisible) :Bool;
	
	var viewMask :HtmlDom;
	var lastW :Float;
	var lastH :Float;
	var scaleX_ :Float;
	var scaleY_ :Float;
	var alpha_ :Float;
	var caobj :CAObject;
	var graphics :CanvasContext;
	
	
	public function new (x, y) {
		
		size = new RCSize (0, 0);
		scaleX_ = 1;
		scaleY_ = 1;
		alpha_ = 1;
		//visible = true;
		
#if canvas
		view = Lib.document.createElement("canvas");
		graphics = untyped view.getContext('2d');
#else
		view = Lib.document.createElement("div");
#end
		view.style.position = "absolute";
		
		setX(x);
		setY(y);
	}
	//function viewWillAppear (_) :Void {}
	//function viewWillDisappear (_) :Void {}
	function viewDidAppear (_) :Void {}
	function viewDidDisappear (_) :Void {}
	
	public function addChild (child:JSView) :Void {
		child.parent = view;
		view.appendChild ( child.view );
	}
	public function removeChild (child:JSView) :Void {
		child.parent = null;
		view.removeChild ( child.view );
	}
	
	/**
	 *  Change the color of the background
	 */
	public function setBackgroundColor (color:Null<Int>) :Null<Int> {
		
		if (color == null) {
			view.style.background = null;
			return color;
		}
		
		var red   = (color & 0xff0000) >> 16;
		var green = (color & 0xff00) >> 8;
		var blue  = color & 0xFF;
		var alpha = 1;
		var color_ = "rgba("+red+","+green+","+blue+","+alpha+")";
		view.style.background = color_;
		
		return color;
	}
	
	public function setCenter (pos:RCPoint) :RCPoint {
		this.center = pos;
/*		this.view.x = Std.int (point.x - size.width/2);
		this.view.y = Std.int (point.y - size.height/2);*/
		return this.center;
	}
	
	public function setClipsToBounds (clip:Bool) :Bool {
		if (clip) {
			view.style.overflow = "hidden";
			viewMask = Lib.document.createElement("div");
			viewMask.style.width = size.width+"px";
			viewMask.style.height = size.height+"px";
			
			while (view.hasChildNodes()) {
				viewMask.appendChild ( view.removeChild (view.firstChild));
			}

			view.appendChild ( viewMask );
		}
		else {
			view.style.overflow = null;
			view.removeChild ( viewMask );

			while (viewMask.hasChildNodes()) {
				view.appendChild ( viewMask.removeChild (viewMask.firstChild));
			}

			viewMask = view;
		}
		return clip;
	}
	
	
	/**
	 *  Scale methods
	 */
	public function scaleToFit (w:Int, h:Int) :Void {
		
		if (size.width/w > size.height/h && size.width > w) {
			setWidth ( w );
			setHeight ( this.width * size.height / size.width );
		}
		else if (size.height > h) {
			setHeight ( h );
			setWidth ( this.height * size.width / size.height );
		}
		else if (size.width > lastW && size.height > lastH) {
			setWidth ( size.width );
			setHeight ( size.height );
		}
		else
			resetScale();
		
		lastW = this.width;
		lastH = this.height;
	}
	
	public function scaleToFill (w:Int, h:Int) :Void {
		
		if (w/size.width > h/size.height) {
			setWidth ( w );
			setHeight ( this.width * size.height / size.width );
		}
		else {
			setHeight ( h );
			setWidth ( this.height * size.width / size.height );
		}
	}
	
	public function resetScale () :Void {
		setWidth ( lastW );
		setHeight ( lastH );
	}
	
	public function animate (obj:CAObject) :Void {
		CoreAnimation.add ( this.caobj = obj );
	}
	
	/**
	 *  This methos is usually overriten by the extension class.
	 */
	public function destroy () :Void {
		CoreAnimation.remove ( caobj );
	}
	
	
	public function removeFromSuperView () :Void {
		var parent = null;
/*		try{parent = view.parent; } catch (e:Dynamic) { null; }
		if (parent != null)
		if (parent.contains ( view ))
			parent.removeChild ( view );*/
	}
	
	
	// Simulate flash API
	//
	function setVisible (v:Bool) :Bool {
		visible = v;
		view.style.visibility = (v ? "visible" : "hidden");
		return v;
	}
	public function setAlpha (a:Float) :Float {
		alpha_ = a;
/*		if (BrowserUtil.browserName == MSIE) {
			untyped view.style.filter = "alpha(opacity="+Std.string(alpha*100)+")";
		}
		else {*/
			untyped view.style.opacity = Std.string(a);
//		}
		return a;
	}
	public function setX (x:Float) :Float {
		this.x = x;
		view.style.left = Std.string(x) + "px";
		return x;
	}
	public function setY (y:Float) :Float {
		this.y = y;
		view.style.top = Std.string(y) + "px";
		return y;
	}
	public function setWidth (w:Float) :Float {
		width = w;
		view.style.width = w + "px";
		return w;
	}
	public function setHeight (h:Float) :Float {
		height = h;
		view.style.height = h + "px";
		return h;
	}
	public function setScaleX (sx:Float) :Float {trace("setScaleX "+x);
		scaleX_ = scaleX = sx;
		scale (scaleX_, scaleY_);
		return scaleX_;
	}
	public function setScaleY (sy:Float) :Float {
		scaleY_ = scaleY = sy;
		scale (scaleX_, scaleY_);
		return scaleY_;
	}
	public function scale (sx:Float, sy:Float) {
		untyped view.style.WebkitTransformOrigin = "top left";
		untyped view.style.WebkitTransform = "scale(" + sx + "," + sy + ")";
	}
	
/*	function get_mouseX():Float
	{
		if (parent == null) return mouseX;
		return parent.mouseX - x;
	}

	function get_mouseY():Float
	{
		if (parent == null) return mouseY;
		return parent.mouseY - y;
	}*/
	
	
	// Drawing

	static inline function COL( color : Int ) {
		return "rgb("+(color>>16)+","+((color>>8)&0xFF)+","+(color&0xFF)+")";
	}

	public inline function clear() {
		graphics.clearRect (0, 0, graphics.canvas.width, graphics.canvas.height);
	}

	public function lineStyle( ?width : Float, ?color : Int ) {
		if( width == null ) return;
		graphics.lineWidth = width;
		graphics.strokeStyle = COL(color);
	}

	public inline function beginFill( color : Int, alpha : Float ) {
		graphics.fillStyle = COL(color);
		graphics.beginPath();
	}

	public inline function endFill() {
		graphics.fill();
		graphics.stroke();
	}

	public inline function drawCircle( x : Float, y : Float, radius : Float ) {
		graphics.arc(x,y,radius,0,6.29,true);
	}

	public inline function drawRect( x : Float, y : Float, w : Float, h : Float ) {
		graphics.rect(x,y,w,h);
	}

	public inline function moveTo( x : Float, y : Float ) {
		graphics.moveTo(x,y);
	}

	public inline function lineTo( x : Float, y : Float ) {
		graphics.lineTo(x,y);
	}
}



typedef CanvasContext = {

	var canvas(default,null) : {> HtmlDom, width : Int, height : Int };

	function save() : Void;
	function restore() : Void;
	function clear () :Void;

	// transformations (default transform is the identity matrix)
	function scale( x : Float, y : Float ) : Void;
	function rotate( r : Float ) : Void;
	function translate( x : Float, y : Float ) : Void;
	function transform( m11 : Float, m12 : Float, m21 : Float, m22 : Float, dx : Float, dy : Float ) : Void;
	function setTransform( m11 : Float, m12 : Float, m21 : Float, m22 : Float, dx : Float, dy : Float ) : Void;

	var globalAlpha : Float;
	var globalCompositeOperation : String;
	var strokeStyle : String;
	var fillStyle : String;

	// colors and styles
	/*CanvasGradient createLinearGradient(in float x0, in float y0, in float x1, in float y1);
	CanvasGradient createRadialGradient(in float x0, in float y0, in float r0, in float x1, in float y1, in float r1);
	CanvasPattern createPattern(in HTMLImageElement image, in DOMString repetition);
	CanvasPattern createPattern(in HTMLCanvasElement image, in DOMString repetition);*/

	// line caps/joins
	var lineWidth : Float;
	var lineCap : String;
	var lineJoin : String;
	var miterLimit : Float;

	// shadows
	var shadowOffsetX : Float;
	var shadowOffsetY : Float;
	var shadowBlur : Float;
	var shadowColor : String;

	// rects
	function clearRect( x : Float, y : Float, w : Float, h : Float ) : Void;
	function fillRect( x : Float, y : Float, w : Float, h : Float ) : Void;
	function strokeRect( x : Float, y : Float, w : Float, h : Float ) : Void;

	// path API
	function beginPath() : Void;
	function closePath() : Void;
	function moveTo( x : Float, y : Float ) : Void;
	function lineTo( x : Float, y : Float ) : Void;
	function quadraticCurveTo( cpx : Float, cpy : Float, x : Float, y : Float ) : Void;
	function bezierCurveTo( cp1x : Float, cp1y : Float, cp2x : Float, cp2y : Float, x : Float, y : Float ) : Void;
	function arcTo( x1 : Float, y1 : Float, x2 : Float, y2 : Float, radius : Float ) : Void;
	function rect( x : Float, y : Float, w : Float, h : Float ) : Void;
	function arc( x : Float, y : Float, radius : Float, startAngle : Float, endAngle : Float, anticlockwise : Bool ) : Void;
	function fill() : Void;
	function stroke() : Void;
	function clip() : Void;
	function isPointInPath( x : Float, y : Float ) : Bool;
	
	function beginFill(color:Int, alpha:Float) : Void;
	function beginGradientFill(color:Int, alpha:Float) : Void;
	function endFill() : Void;
	function lineStyle( ?borderThickness:Float, ?borderColor:Int, ?alpha:Float, ?pixelHinting:Dynamic, ?scaleMode:Dynamic, ?caps:Dynamic, ?joints:Dynamic, ?miterLimit:Dynamic ) :Void;
	function drawRect( x : Float, y : Float, w : Float, h : Float ) :Void;
	function drawRoundRect( x : Float, y : Float, w : Float, h : Float, r : Float ) :Void;
	
	// drawing images
/*	void drawImage(in HTMLImageElement image, in float dx, in float dy);
	void drawImage(in HTMLImageElement image, in float dx, in float dy, in float dw, in float dh);
	void drawImage(in HTMLImageElement image, in float sx, in float sy, in float sw, in float sh, in float dx, in float dy, in float dw, in float dh);
	void drawImage(in HTMLCanvasElement image, in float dx, in float dy);
	void drawImage(in HTMLCanvasElement image, in float dx, in float dy, in float dw, in float dh);
	void drawImage(in HTMLCanvasElement image, in float sx, in float sy, in float sw, in float sh, in float dx, in float dy, in float dw, in float dh);*/

	// pixel manipulation
/*	ImageData createImageData(in float sw, in float sh);
	ImageData getImageData(in float sx, in float sy, in float sw, in float sh);
	void putImageData(in ImageData imagedata, in float dx, in float dy);
	void putImageData(in ImageData imagedata, in float dx, in float dy, in float dirtyX, in float dirtyY, in float dirtyWidth, in float dirtyHeight);*/

};
