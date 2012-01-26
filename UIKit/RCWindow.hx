//
//  RCWindow
//
//  Created by Baluta Cristian on 2008-03-21.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.display.Stage;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.display.StageDisplayState;
	import flash.display.DisplayObjectContainer;
	import flash.external.ExternalInterface;
#elseif js
	import js.Dom;
	private typedef DisplayObjectContainer = JSView;
	private typedef ExternalInterface = haxe.remoting.ExternalConnection;
#end


class RCWindow {

#if (flash || nme)
	inline public static var target = flash.Lib.current;
	inline public static var stage :Stage = flash.Lib.current.stage;
	public static var SCREEN_W :Float = flash.system.Capabilities.screenResolutionX;
	public static var SCREEN_H :Float = flash.system.Capabilities.screenResolutionY;
	public static var URL :String = flash.Lib.current.loaderInfo.url;
	public static var ID :String = flash.Lib.current.loaderInfo.parameters.id;
#elseif js
	public static var target :HtmlDom = js.Lib.document.body;
	public static var stage :HtmlDom = target;
	public static var SCREEN_W :Float = js.Lib.window.screen.width;
	public static var SCREEN_H :Float = js.Lib.window.screen.height;
	public static var URL :String = "";
	public static var ID :String = "";
#end

	public static var width :Int;
	public static var height :Int;
	public static var backgroundColor (null, setBackgroundColor) :Int;
	public static var stageMouse :EVMouse;
	
	
	public static function init () {
		#if (flash || nme)
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			width = stage.stageWidth;
			height = stage.stageHeight;
		#elseif js
			target.style.position = "absolute";
			target.style.margin = "0px 0px 0px 0px";
			width = target.scrollWidth;
			height = target.scrollHeight;
			backgroundColor = 0x333333;
		#end
		
		stageMouse = new EVMouse();
		
		// Create the url without swf name
		var url = URL.split("/");
			url.pop();
		URL = url.join("/") + "/";
		
		//RCNotificationCenter.addObserver ("fullscreen", fullScreenHandler);
		RCNotificationCenter.addObserver ("resize", resizeHandler);
	}
	
	static function resizeHandler (w, h) {
		width = w;
		height = h;
	}
	
	
	/**
	 * Utilities
	 */
	public static function getCenterX (w:Float) :Int {
		return Math.round (width/2 - w/2);
	}
	public static function getCenterY (h:Float) :Int {
		return Math.round (height/2 - h/2);
	}
	
	
	public static function fullscreen () {
		#if (flash || nme) stage.displayState = StageDisplayState.FULL_SCREEN; #end
	}
	public static function normal () {
		#if (flash || nme) stage.displayState = StageDisplayState.NORMAL; #end
	}
	public static function isFullScreen () :Bool {
		#if (flash || nme)
			return stage.displayState == StageDisplayState.FULL_SCREEN;
		#end
		return false;
	}
	
	
	
	/**
	 *	Set the new size for the swf
	 */
/*	public static function setWidth (w:Int) {
		if (ExternalInterface.available)
			ExternalInterface.call ("swffit.configure", {target:ID, maxWid:w});
	}
	public static function setHeight (h:Int) {
		//trace("SetH "+h);
		if (ExternalInterface.available)
			//ExternalInterface.call ("k0.resizeDivTo", "controller", h);
			ExternalInterface.call ("swffit.configure", {target:ID, maxHei:h, maxWid:width, hCenter:false});
	}
*/
	public static function setBackgroundColor (color:Int) :Int {
		#if js
			target.style.backgroundColor = RCColor.HEXtoString(color);
		#end
		return color;
	}
	// JS can permit to change the container of the RCWindow
	public static function setTarget (id:String) :Void {
		#if js
			target = js.Lib.document.getElementById( id );trace(target);
		#end
	}
	
	
	/**
	 *	Add and remove views
	 */
	public static function addChild (child:DisplayObjectContainer) :Void {
		if (child != null) {
			#if (flash || nme)
				target.addChild ( child );
			#elseif js
				child.viewWillAppear();
				child.parent = target;
				target.appendChild ( child.view );
				child.viewDidAppear();
			#end
		}
	}
	public static function removeChild (child:DisplayObjectContainer) :Void {
		if (child != null) {
			#if (flash || nme)
				if (target.contains ( child ))
					target.removeChild ( child );
			#elseif js
				child.viewWillDisappear();
				child.parent = null;
				target.removeChild ( child.view );
				child.viewDidDisappear();
			#end
		}
	}
}
