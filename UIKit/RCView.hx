//
//  RCView.hx
//	UIKit
//	Flash implementation of the RCDisplayObject
//
//  Created by Baluta Cristian on 2009-02-14.
//  Updated 2009-2012 http://ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

#if (flash || nme || cpp || neko || objc)

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
		graphics = layer.graphics;
		size = new RCSize (w, h);
		setX(x);
		setY(y);
		
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
			layer.graphics.drawRect (0, 0, size.width * RCWindow.dpiScale, size.height * RCWindow.dpiScale);
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
			layer.scrollRect = new flash.geom.Rectangle (0, 0, size.width * RCWindow.dpiScale, size.height * RCWindow.dpiScale);
		else
			layer.scrollRect = null;
		
		return clip;
	}
	
	// Position and size
	override public function setX (x:Float) :Float {
		layer.x = x * RCWindow.dpiScale;
		return super.setX ( x );
	}
	override public function setY (y:Float) :Float {
		layer.y = y * RCWindow.dpiScale;
		return super.setY ( y );
	}
	override public function getWidth () :Float {
		return layer.width;
	}
	override public function setWidth (w:Float) :Float {
		layer.width = w * RCWindow.dpiScale;
		return super.setWidth ( w );
	}
	override public function getHeight () :Float {
		return layer.height;
	}
	override public function setHeight (h:Float) :Float {
		layer.height = h * RCWindow.dpiScale;
		return super.setHeight ( h );
	}
	override public function setRotation (r:Float) :Float {
		layer.rotation = r;
		return super.setRotation ( r );
	}
	
	
	override public function setVisible (v:Bool) :Bool {
		layer.visible = v;
		return super.setVisible ( v );
	}
	override public function setAlpha (a:Float) :Float {
		layer.alpha = a;
		return super.setAlpha ( a );
	}
	
	override function getMouseX () :Float {
		return layer.mouseX / RCWindow.dpiScale;
	}
	override function getMouseY () :Float {
		return layer.mouseY / RCWindow.dpiScale;
	}
	
	
	/**
	 *  This method is usually overriten by the super class.
	 */
	override public function destroy () :Void {
		layer.removeEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler_);
		layer.removeEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler_);
		super.destroy();
	}
	
	
	override public function addChild (child:RCView) :Void {
		if (child == null) return;
		child.viewWillAppearHandler();
		child.parent = layer;
		layer.addChild ( child.layer );
		//child.viewDidAppearHandler();
	}
	override public function addChildAt (child:RCView, index:Int) :Void {
		layer.addChildAt (child.layer, index);
	}
	override public function removeChild (child:RCView) :Void {
		if (child == null) return;
		child.viewWillDisappearHandler();
		layer.removeChild ( child.layer );
		child.parent = null;
		//child.viewDidDisappearHandler();
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
