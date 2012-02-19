//
//  RCView
//
//  Created by Baluta Cristian on 2009-02-14.
//  Copyright (c) 2009-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)

import flash.display.Sprite;
import flash.display.DisplayObjectContainer;
import flash.events.Event;

class RCView extends Sprite {

	public var layer :Sprite;
	public var bounds :RCRect; // Real size of the view
	public var size :RCSize; // Visible size of the layer. You can get the real size with width and height
	public var center (default, setCenter) :RCPoint;
	public var clipsToBounds (default, setClipsToBounds) :Bool;
	public var backgroundColor (default, setBackgroundColor) :Null<Int>;
	
	var lastW :Float;
	var lastH :Float;
	var caobj :CAObject;
	
	dynamic public function viewWillAppear () :Void {}
	dynamic public function viewWillDisappear () :Void {}
	dynamic public function viewDidAppear () :Void {}
	dynamic public function viewDidDisappear () :Void {}
	public function viewWillAppearHandler (e:Event) :Void { viewWillAppear(); }
	public function viewWillDisappearHandler (e:Event) :Void { viewWillDisappear(); }
	function viewDidAppearHandler (e:Event) :Void { trace("viewDidAppearHandler");viewDidAppear();trace("fin"); }
	public function viewDidDisappearHandler (e:Event) :Void { viewDidDisappear(); }
	
	
	public function new (x, y, ?w, ?h) {
		super();
		size = new RCSize (w, h);
		bounds = new RCRect (x, y, w, h);
		layer = this;
		//layer.addEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler);
		//layer.addEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler);
		layer.x = x;
		layer.y = y;
		#if flash
			viewDidAppear();
		#end
	}
	
	
	/**
	 *  Change the color of the Sprite
	 */
	public function setBackgroundColor (color:Null<Int>) :Null<Int> {
		
		var red   = (color & 0xff0000) >> 16;
		var green = (color & 0xff00) >> 8;
		var blue  = color & 0xFF;
		var mpl = 0;
		
		if (color != null) {
			layer.graphics.clear();
			layer.graphics.beginFill (color, 1);
			layer.graphics.drawRect (0, 0, size.width, size.height);
/*		layer.transform.colorTransform = new flash.geom.ColorTransform ( mpl,mpl,mpl,mpl,
																		red,green,blue,layer.alpha*255);*/
		} else {
			layer.graphics.clear();
/*		layer.transform.colorTransform = new flash.geom.ColorTransform  (1,	1,	1,	1,
																		0,	0,	0,	0);*/
		}
		return backgroundColor = color;
	}
	
	public function setCenter (point:RCPoint) :RCPoint {
		this.center = point;
		this.layer.x = Std.int (point.x - size.width/2);
		this.layer.y = Std.int (point.y - size.height/2);
		return this.center;
	}
	
	public function setClipsToBounds (clip:Bool) :Bool {
		layer.cacheAsBitmap = clip;
		
		if (clip)
			layer.scrollRect = new flash.geom.Rectangle (0, 0, size.width, size.height);
		else
			layer.scrollRect = null;
		
		return clip;
	}
	
	public function setX (x:Float) :Float {
		layer.x = x;
		return x;
	}
	public function setY (y:Float) :Float {
		layer.y = y;
		return y;
	}
	public function setWidth (w:Float) :Float {
		size.width = w;
		layer.width = w;
		return w;
	}
	public function setHeight (h:Float) :Float {
		size.height = h;
		layer.height = h;
		return h;
	}
	
	
	/**
	 *  Scale methods
	 */
	public function scaleToFit (w:Int, h:Int) :Void {
		
		if (size.width/w > size.height/h && size.width > w) {
			layer.width = w;
			layer.height = layer.width * size.height / size.width;
		}
		else if (size.height > h) {
			layer.height = h;
			layer.width = layer.height * size.width / size.height;
		}
		else if (size.width > lastW && size.height > lastH) {
			layer.width = size.width;
			layer.height = size.height;
		}
		else
			resetScale();
		
		lastW = layer.width;
		lastH = layer.height;
	}
	
	public function scaleToFill (w:Int, h:Int) :Void {
		
		if (w/size.width > h/size.height) {
			layer.width = w;
			layer.height = layer.width * size.height / size.width;
		}
		else {
			layer.height = h;
			layer.width = layer.height * size.width / size.height;
		}
	}
	
	public function resetScale () :Void {
		layer.width = lastW;
		layer.height = lastH;
	}
	
	public function animate (obj:CAObject) :Void {
		CoreAnimation.add ( this.caobj = obj );
	}
	
	/**
	 *  This methos is usually overriten by the extension class.
	 */
	public function destroy () :Void {
		CoreAnimation.remove ( caobj );
		layer.removeEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler);
		layer.removeEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler);
	}
	
	
	public function removeFromSuperView () :Void {
		var parent = null;
		try{parent = layer.parent; } catch (e:Dynamic) { null; }
		if (parent != null)
		if (parent.contains ( layer ))
			parent.removeChild ( layer );
	}
}

#elseif js

typedef RCView = JSView;

#end
