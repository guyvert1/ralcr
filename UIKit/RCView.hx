//
//  RCView.hx
//	UIKit
//	Flash implementation of the RCDisplayObject
//
//  Created by Baluta Cristian on 2009-02-14.
//  Copyright (c) 2009-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)

import flash.display.Sprite;
import flash.display.Graphics;
import flash.events.Event;


class RCView extends RCDisplayObject {

	public var layer :Sprite; // In flash the layer is a Sprite
	public var parent :Sprite;
	public var graphics :Graphics;
	
	
	public function new (x, y, ?w, ?h) {
		super();
		
		layer = new Sprite();
		layer.x = x;
		layer.y = y;
		graphics = layer.graphics;
		size = new RCSize (w, h);
		
		layer.addEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler_);
		layer.addEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler_);
	}
	public function viewDidAppearHandler_ (e:Event) :Void { viewDidAppear.dispatch(); }
	public function viewDidDisappearHandler_ (e:Event) :Void { viewDidDisappear.dispatch(); }
	
	
	/**
	 *  Change the color of the Sprite
	 */
	override public function setBackgroundColor (color:Null<Int>) :Null<Int> {
		
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
	
	
	override public function setClipsToBounds (clip:Bool) :Bool {
		layer.cacheAsBitmap = clip;
		
		if (clip)
			layer.scrollRect = new flash.geom.Rectangle (0, 0, size.width, size.height);
		else
			layer.scrollRect = null;
		
		return clip;
	}
	
	// Position and size
	override public function setX (x:Float) :Float {
		layer.x = x;
		return super.setX ( x );
	}
	override public function setY (y:Float) :Float {
		layer.y = y;
		return super.setY ( y );
	}
	override public function getWidth () :Float {
		return layer.width;
	}
	override public function setWidth (w:Float) :Float {
		layer.width = w;
		return super.setWidth ( w );
	}
	override public function getHeight () :Float {
		return layer.height;
	}
	override public function setHeight (h:Float) :Float {
		layer.height = h;
		return super.setHeight ( h );
	}
	
	/**
	 *  This method is usually overriten by the super class.
	 */
	override public function destroy () :Void {
		layer.removeEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler_);
		layer.removeEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler_);
		super.destroy();
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
