//
//  RCStage
//
//  Created by Baluta Cristian on 2008-03-21.
//  Copyright (c) 2008-2011 http://ralcr.com. All rights reserved.
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
private typedef DisplayObjectContainer = RCViewCanvas;
import haxe.remoting.ExternalConnection;
#end


class RCStage {

#if flash
	inline public static var target = flash.Lib.current;
	inline public static var stage :Stage = flash.Lib.current.stage;
#elseif js
	inline public static var target = js.Lib.document.getElementById("main");
	inline public static var stage = target;
#end	
	public static var SCREEN_W :Float = flash.system.Capabilities.screenResolutionX;
	public static var SCREEN_H :Float = flash.system.Capabilities.screenResolutionY;
	public static var URL :String = flash.Lib.current.loaderInfo.url;
	public static var ID :String = flash.Lib.current.loaderInfo.parameters.id;
	public static var width :Int;
	public static var height :Int;
	
		
	public static function init () {
		
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;
		width = stage.stageWidth;
		height = stage.stageHeight;
		
		target.style.position = "absolute";
		
		// Create the url without swf name
		var url = URL.split("/");
			url.pop();
		URL = url.join("/") + "/";
		
		//RCNotificationCenter.addObserver ("fullscreen", fullScreenHandler);
		RCNotificationCenter.addObserver ("resize", resizeHandler);
	}
	
	static function resizeHandler (w, h) {
		width = stage.stageWidth;
		height = stage.stageHeight;
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
#if flash
		stage.displayState = StageDisplayState.FULL_SCREEN;
#end
	}
	public static function normal () {
#if flash
		stage.displayState = StageDisplayState.NORMAL;
#end
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
	public static function setWidth (w:Int) {
		if (ExternalInterface.available)
			ExternalInterface.call ("swffit.configure", {target:ID, maxWid:w});
	}
	public static function setHeight (h:Int) {
		//trace("SetH "+h);
		if (ExternalInterface.available)
			//ExternalInterface.call ("k0.resizeDivTo", "controller", h);
			ExternalInterface.call ("swffit.configure", {target:ID, maxHei:h, maxWid:width, hCenter:false});
	}
	
	
	
	/**
	 *	Add and remove childs into stage
	 */
	public static function addChild (child:DisplayObjectContainer) :Void {
		if (child != null)
#if flash
			target.addChild ( child );
#elseif js
			target.appendChild ( child );
#end
	}
	public static function removeChild (child:DisplayObjectContainer) :Void {
		if (child != null)
		if (target.contains ( child ))
			target.removeChild ( child );
	}
}
