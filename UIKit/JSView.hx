//
//  JSView.hx
//	UIKit
//
//  Created by Baluta Cristian on 2011-11-12.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//

import js.Lib;
import js.Dom;
import JSCanvas;


class JSView extends RCDisplayObject {
	
	public var parent :HtmlDom;
	public var layer :HtmlDom;
	public var layerScrollable :HtmlDom;// Clips to bounds will move all the subviews in this layer
	public var graphics :CanvasContext;
	
	
	public function new (x, y, ?w, ?h) {
		super();
		size = new RCSize (w, h);
		scaleX_ = 1;
		scaleY_ = 1;
		alpha_ = 1;
		//visible = true;
		
		#if canvas
			layer = Lib.document.createElement("canvas");
			graphics = untyped layer.getContext('2d');
		#else
			layer = Lib.document.createElement("div");
		#end
		
		// In JS, the div must be positioned absolute
		layer.style.position = "absolute";
		layer.style.margin = "0px 0px 0px 0px";
		
		setX(x);
		setY(y);
	}
	
	
	
	override public function addChild (child:JSView) :Void {
		if (child == null) return;
		child.viewWillAppearHandler();
		child.parent = layer;
		layer.appendChild ( child.layer );
		child.viewDidAppearHandler();
	}
	override public function addChildAt (child:JSView, index:Int) :Void {
		if (layer.childNodes[index] != null) {
			layer.insertBefore (child.layer, layer.childNodes[index]);
		}
		else {
			layer.appendChild ( child.layer );
		}
	}
	override public function removeChild (child:JSView) :Void {
		if (child == null) return;
		child.viewWillDisappearHandler();
		child.parent = null;
		layer.removeChild ( child.layer );
		child.viewDidDisappearHandler();
	}
	
	/**
	 *  Change the color of the background
	 */
	override public function setBackgroundColor (color:Null<Int>) :Null<Int> {
		if (color == null) {
			layer.style.background = null;
			return color;
		}
		
		var red   = (color & 0xff0000) >> 16;
		var green = (color & 0xff00) >> 8;
		var blue  = color & 0xFF;
		var alpha = 1;
		var color_ = "rgba("+red+","+green+","+blue+","+alpha+")";
		layer.style.background = color_;
		
		return color;
	}
	
	
	override public function setClipsToBounds (clip:Bool) :Bool {
		// When we clip we move all subviews on a different div inside the current div
		if (clip) {
			layer.style.overflow = "hidden";
			layerScrollable = Lib.document.createElement("div");
			layerScrollable.style.position = "absolute";
			layerScrollable.style.width = size.width+"px";
			layerScrollable.style.height = size.height+"px";
			
			// Move the views from layer to layerScrollable
			while (layer.hasChildNodes()) {
				layerScrollable.appendChild ( layer.removeChild ( layer.firstChild));
			}

			layer.appendChild ( layerScrollable );
		}
		// When we unclip we move the subviews back to the original div
		else {

			while (layerScrollable.hasChildNodes()) {
				layer.appendChild ( layerScrollable.removeChild ( layerScrollable.firstChild));
			}

			layer.style.overflow = null;
			layer.removeChild ( layerScrollable );
			layerScrollable = null;
		}
		return clip;
	}
	
	
	// Getters and setters
	//
	override public function setVisible (v:Bool) :Bool {
		visible = v;
		layer.style.visibility = (v ? "visible" : "hidden");
		return v;
	}
	override public function setAlpha (a:Float) :Float {
		alpha_ = a;
/*		if (BrowserUtil.browserName == MSIE) {
			untyped layer.style.filter = "alpha(opacity="+Std.string(alpha*100)+")";
		}
		else {*/
			untyped layer.style.opacity = Std.string(a);
//		}
		return a;
	}
	override public function setX (x:Float) :Float {
		layer.style.left = Std.string(x) + "px";
		return super.setX ( x );
	}
	override public function setY (y:Float) :Float {
		layer.style.top = Std.string(y) + "px";
		return super.setY ( y );
	}
	override public function getWidth () :Float {
		//if (parent == null) trace("This view doesn't have a parent, the width will be 0");
		return layer.offsetWidth;
		return layer.scrollWidth;
		return layer.clientWidth;
	}
	override public function setWidth (w:Float) :Float {
		layer.style.width = w + "px";
		return super.setWidth ( w );
	}
	override public function getHeight () :Float {
		//if (parent == null) trace("This view doesn't have a parent, the height will be 0");
		return layer.offsetHeight;
		return layer.scrollHeight;
		return layer.clientHeight;
	}
	override public function setHeight (h:Float) :Float {
		layer.style.height = h + "px";
		return super.setHeight ( h );
	}
	override public function setScaleX (sx:Float) :Float {
		scaleX_ = scaleX = sx;
		scale (scaleX_, scaleY_);
		return scaleX_;
	}
	override public function setScaleY (sy:Float) :Float {
		scaleY_ = scaleY = sy;
		scale (scaleX_, scaleY_);
		return scaleY_;
	}
	override public function scale (sx:Float, sy:Float) :Void {
		untyped layer.style.WebkitTransformOrigin = "top left";
		untyped layer.style.WebkitTransform = "scale(" + sx + "," + sy + ")";
	}
	public function startDrag (?lockCenter:Bool, ?rect:RCRect) :Void {
		
	}
	public function stopDrag () :Void {
		
	}
	
	override function getMouseX () :Float {
		return untyped layer.clientX;
		if (parent == null) return mouseX;
		return untyped parent.mouseX - x;
	}

	override function getMouseY () :Float {
		if (parent == null) return mouseY;
		return untyped parent.mouseY - y;
	}
	
	
	public function removeFromSuperView () :Void {
		if (parent != null)
			parent.removeChild ( layer );
	}
}
