//
//  RCStage
//
//  Created by Baluta Cristian on 2008-03-21.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if flash
	import flash.display.Stage;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.display.StageDisplayState;
	import flash.display.DisplayObjectContainer;
	import flash.external.ExternalInterface;
#elseif js
	import js.Dom;
	private typedef DisplayObjectContainer = JSView;
	typedef ExternalInterface = haxe.remoting.ExternalConnection;
#end


class RCStage {

#if flash
	inline public static var target = flash.Lib.current;
	inline public static var stage :Stage = flash.Lib.current.stage;
	public static var SCREEN_W :Float = flash.system.Capabilities.screenResolutionX;
	public static var SCREEN_H :Float = flash.system.Capabilities.screenResolutionY;
	public static var URL :String = flash.Lib.current.loaderInfo.url;
	public static var ID :String = flash.Lib.current.loaderInfo.parameters.id;
#elseif js
	inline public static var target = js.Lib.document.body;//js.Lib.document.getElementById("main");
	inline public static var stage = target;
	public static var SCREEN_W :Float = js.Lib.window.screen.width;
	public static var SCREEN_H :Float = js.Lib.window.screen.height;
	public static var URL :String = "";
	public static var ID :String = "";
#end

	public static var width :Int;
	public static var height :Int;
	public static var backgroundColor (null, set_backgroundColor) :Int;
	
	
	public static function init () {
#if flash
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;
		width = stage.stageWidth;
		height = stage.stageHeight;
#elseif js
		target.style.position = "absolute";
		width = target.scrollWidth;
		height = target.scrollHeight;
		backgroundColor = 0x333333;
#end
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
#if flash stage.displayState = StageDisplayState.FULL_SCREEN; #end
	}
	public static function normal () {
#if flash stage.displayState = StageDisplayState.NORMAL; #end
	}
	public static function isFullScreen () :Bool {
#if flash
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
	public static function set_backgroundColor (color:Int) :Int {
#if js
		target.style.backgroundColor = toHexStyle(color);
		return color;
#end
	}
	public static function toHexStyle(color:Int):String
	{
		return "#" + StringTools.lpad(StringTools.hex(color), "0", 6);
	}
	
	
	
	/**
	 *	Add and remove views into stage
	 */
	public static function addChild (child:DisplayObjectContainer) :Void {
		if (child != null)
#if flash
			target.addChild ( child );
#elseif js
			target.appendChild ( child.view );
#end
	}
	public static function removeChild (child:DisplayObjectContainer) :Void {
		if (child != null)
#if flash	if (target.contains ( child )) #end
			target.removeChild ( #if flash child #elseif js child.view #end );
	}
}
