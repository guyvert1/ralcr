//
//  RCView
//
//  Created by Baluta Cristian on 2009-02-14.
//  Copyright (c) 2009-2011 http://ralcr.com. All rights reserved.
//

#if (flash || nme)

import flash.display.Sprite;
import flash.display.DisplayObjectContainer;
import flash.events.Event;

class RCView extends Sprite {

	public var view :DisplayObjectContainer;
	public var size :RCSize; // Real size of the view
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
	public function viewDidAppearHandler (e:Event) :Void { viewDidAppear(); }
	public function viewDidDisappearHandler (e:Event) :Void { viewDidDisappear(); }
	
	
	public function new (x, y) {
		super();
		size = new RCSize (0, 0);
		
		view = this;
		view.addEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler);
		view.addEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler);
		view.x = x;
		view.y = y;
	}
	
	
	/**
	 *  Change the color of the Sprite
	 */
	public function setBackgroundColor (color:Null<Int>) :Null<Int> {
		
		var red   = (color & 0xff0000) >> 16;
		var green = (color & 0xff00) >> 8;
		var blue  = color & 0xFF;
		var mpl = 0;
		
		if (color != null)
		
		view.transform.colorTransform = new flash.geom.ColorTransform ( mpl,mpl,mpl,mpl,
																		red,green,blue,view.alpha*255);
		else
		
		view.transform.colorTransform = new flash.geom.ColorTransform  (1,	1,	1,	1,
																		0,	0,	0,	0);
		return color;
	}
	
	public function setCenter (point:RCPoint) :RCPoint {
		this.center = point;
		this.view.x = Std.int (point.x - size.width/2);
		this.view.y = Std.int (point.y - size.height/2);
		return this.center;
	}
	
	public function setClipsToBounds (clip:Bool) :Bool {
		view.cacheAsBitmap = clip;
		
		if (clip)
			view.scrollRect = new flash.geom.Rectangle (0, 0, size.width, size.height);
		else
			view.scrollRect = null;
		
		return clip;
	}
	
	
	/**
	 *  Scale methods
	 */
	public function scaleToFit (w:Int, h:Int) :Void {
		
		if (size.width/w > size.height/h && size.width > w) {
			view.width = w;
			view.height = view.width * size.height / size.width;
		}
		else if (size.height > h) {
			view.height = h;
			view.width = view.height * size.width / size.height;
		}
		else if (size.width > lastW && size.height > lastH) {
			view.width = size.width;
			view.height = size.height;
		}
		else
			resetScale();
		
		lastW = view.width;
		lastH = view.height;
	}
	
	public function scaleToFill (w:Int, h:Int) :Void {
		
		if (w/size.width > h/size.height) {
			view.width = w;
			view.height = view.width * size.height / size.width;
		}
		else {
			view.height = h;
			view.width = view.height * size.width / size.height;
		}
	}
	
	public function resetScale () :Void {
		view.width = lastW;
		view.height = lastH;
	}
	
	public function animate (obj:CAObject) :Void {
		CoreAnimation.add ( this.caobj = obj );
	}
	
	/**
	 *  This methos is usually overriten by the extension class.
	 */
	public function destroy () :Void {
		CoreAnimation.remove ( caobj );
		view.removeEventListener (Event.ADDED_TO_STAGE, viewDidAppearHandler);
		view.removeEventListener (Event.REMOVED_FROM_STAGE, viewDidDisappearHandler);
	}
	
	
	public function removeFromSuperView () :Void {
		var parent = null;
		try{parent = view.parent; } catch (e:Dynamic) { null; }
		if (parent != null)
		if (parent.contains ( view ))
			parent.removeChild ( view );
	}
}

#elseif js

typedef RCView = JSView;

#end
