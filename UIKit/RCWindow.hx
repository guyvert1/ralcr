//
//  RCWindow
//
//  Created by Baluta Cristian on 2008-03-21.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.display.MovieClip;
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
	// NME goes blank if you're trying to init static variables right now,
	// Not all of them on all targets but is safer to not init them here.
	public static var target :MovieClip;
	public static var stage :Stage;
	public static var SCREEN_W :Float;
	public static var SCREEN_H :Float;
#elseif js
	public static var target :HtmlDom = js.Lib.document.body;
	public static var stage :HtmlDom = js.Lib.document;
	public static var SCREEN_W :Float = js.Lib.window.screen.width;
	public static var SCREEN_H :Float = js.Lib.window.screen.height;
#end

	public static var URL :String = "";
	public static var ID :String = "";
	public static var width :Int;
	public static var height :Int;
	public static var backgroundColor (null, setBackgroundColor) :Int;
	public static var scaleFactor :Float = 1;
	static var init_ :Bool = false;
	static var modalView :RCView;// Only one at a time
	
	
	public static function init () {
		//trace("init");
		if (init_) return;
			init_ = true;
		#if (flash || nme)
			target = flash.Lib.current;
			stage = flash.Lib.current.stage;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			width = stage.stageWidth;
			height = stage.stageHeight;
			SCREEN_W = flash.system.Capabilities.screenResolutionX;
			SCREEN_H = flash.system.Capabilities.screenResolutionY;
			#if (cpp || neko) scaleFactor = stage.dpiScale; #end
			trace("dpiScale "+scaleFactor);
		#elseif js
			target.style.position = "absolute";
			target.style.margin = "0px 0px 0px 0px";
			target.style.overflow = "hidden";
			width = target.scrollWidth;
			height = target.scrollHeight;
			//backgroundColor = 0xFFFFFF;
		#end
		#if flash
			URL = flash.Lib.current.loaderInfo.url;
			ID = flash.Lib.current.loaderInfo.parameters.id;
			var url = URL.split("/");
				url.pop();
			URL = url.join("/") + "/";// URL without swf name
		#end
		// RCNotificationCenter.addObserver ("fullscreen", fullScreenHandler);
		//RCNotificationCenter.addObserver ("resize", resizeHandler);
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
			target = js.Lib.document.getElementById( id );
		#end
	}
	
	
	/**
	 *	Add and remove views
	 */
	public static function addChild (child:RCView) :Void {
		trace("add child "+child);
		init();
		if (child != null) {
			child.viewWillAppearHandler();
			child.parent = target;
			#if (flash || nme)
				target.addChild ( child.layer );
			#elseif js
				target.appendChild ( child.layer );
			#end
			child.viewDidAppearHandler();
		}
	}
	public static function removeChild (child:RCView) :Void {
		if (child != null) {
			#if (flash || nme)
				if (Std.is (child, RCView))
					cast(child).viewWillDisappearHandler(null);
				if (target.contains ( child.layer ))
					target.removeChild ( child.layer );
			#elseif js
				child.viewWillDisappearHandler();
				child.parent = null;
				target.removeChild ( child.layer );
				child.viewDidDisappearHandler();
			#end
		}
	}
	
	
	/**
	 *  Add or remove a modal view controller
	 *  Only one can exist at a given time
	 **/
	public static function addModalViewController (view:RCView) :Void {
		modalView = view;
		modalView.x = 0;//RCWindow.getCenterX ( view.width );
		
		CoreAnimation.add ( new CATween (modalView, {y:{fromValue:height, toValue:0}}, 0.5, 0, caequations.Cubic.IN_OUT) );
		RCWindow.addChild ( modalView );
	}
	public static function dismissModalViewController () :Void {
		if (modalView == null) return;
		var anim = new CATween (modalView, {y:RCWindow.height}, 0.3, 0, caequations.Cubic.IN);
			anim.delegate.animationDidStop = destroyModalViewController;
		CoreAnimation.add ( anim );
	}
	public static function destroyModalViewController () :Void {
		Fugu.safeDestroy ( modalView );
		modalView = null;
	}
	
}
