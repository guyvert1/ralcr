//
//  Lib to load external swfList, photoList, fonts...
//	
//
//  Created by Baluta Cristian on 2009-01-09.
//  Copyright (c) 2009-2012 http://ralcr.com. All rights reserved.
//

#if (flash && nme)
	import flash.system.ApplicationDomain;
	import flash.system.LoaderContext;
#end
#if (flash || nme)
	import flash.display.Sprite;
	import flash.events.ProgressEvent;
	import flash.events.ErrorEvent;
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.events.Event;
	import flash.display.Loader;
	import flash.net.URLRequest;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.PixelSnapping;
#elseif js
	import js.Dom;
#end


class RCLib {
	
	static var INSTANCE :RCLib;
	
	var photoList :Hash<RCImage>;
	var swfList :Hash<RCSwf>;// Keep a reference to the loaded swf Event in order to acces its assets later
	var dataList :Hash<String>;
	var nr :Int;
	var max :Int;
	
	public static var errorMessage :String; // Error message that should be accessed after onError is fired
	public static var currentPercentLoaded :Hash<Int>;
	public static var percentLoaded :Int;
	public static var useCache :Bool;
	
	
	dynamic public static function onComplete () :Void {}
	dynamic public static function onProgress () :Void {}
	dynamic public static function onError () :Void {}
	
	
	static function init () :Void {
		if (INSTANCE != null) return;
			INSTANCE = new RCLib();
		currentPercentLoaded = new Hash<Int>();
		useCache = false;
	}
	public static function instance () : RCLib {
		init();
		return INSTANCE;
	}
	public static function loadFileWithKey (key:String, URL:String) :Bool {
		return instance().set (key, URL);
	}
	public static function loadFontWithKey (key:String, URL:String) :Bool {
		return instance().set (key, URL, false);
	}
	public static function getFileWithKey (key:String, returnAsBitmap:Bool=true) :Dynamic {
		return instance().get (key, returnAsBitmap);
	}
	
	
	
	/**
	 *  RCLib can be initialized only once
	 */
	function new () {
		photoList = new Hash<RCImage>();
		swfList = new Hash<RCSwf>();
		dataList = new Hash<String>();
		nr = 0;
		max = 0;
	}
	
	public function set (key:String, URL:String, ?newDomain:Bool=true) :Bool {
		trace("set "+key+", "+URL);
		max ++;
		
		if (key == null)
			key = Std.string ( Math.random() );
			
		if (URL.toLowerCase().indexOf(".swf") != -1)
			loadSwf (key, URL, newDomain);
			
		else if(URL.toLowerCase().indexOf(".xml") != -1 ||
				URL.toLowerCase().indexOf(".txt") != -1 ||
				URL.toLowerCase().indexOf(".css") != -1)
			loadText (key, URL);
			
		else
			loadPhoto (key, URL);
		
		return true;
	}
	function loadPhoto (key:String, URL:String) :Void {
		//trace("load photo "+key+", "+URL);
		var photo = new RCImage (0, 0, URL);
			photo.onProgress = callback (progressHandler, key, photo);
			photo.onComplete = callback (completeHandler, key, photo);
			photo.onError = callback (errorHandler, key, photo);
	}
	function loadSwf (key:String, URL:String, ?newDomain:Bool=true) :Void {
		//trace("load swf "+key+", "+URL);
		var swf = new RCSwf (0, 0, URL, newDomain);
			swf.onProgress = callback (progressHandler, key, swf);
			swf.onComplete = callback (completeHandler, key, swf);
			swf.onError = callback (errorHandler, key, swf);
	}
	function loadText (key:String, URL:String) :Void {
		//trace("load text "+key+", "+URL);
		var data = new HTTPRequest();
			data.onProgress = callback (progressHandler, key, data);
			data.onComplete = callback (completeHandler, key, data);
			data.onError = callback (errorHandler, key, data);
			data.readFile ( URL );
	}
	
	
	/**
	*  Dispatch onComplete and onError events
	*/
	function errorHandler (key:String, media:Dynamic) :Void {
		trace("Error loading URL for key: '"+key+"' with object: "+media);
		max --;
		onError();
		if (nr >= max)
			onComplete();
	}
	function progressHandler (key:String, obj:Dynamic) :Void {
		currentPercentLoaded.set ( key, obj.percentLoaded );// All supported objects have this property
		totalProgress();
	}
	function completeHandler (key:String, obj:Dynamic) :Void {
		trace("completeHandler for key: '"+key+"' with object: "+obj);
		// RCImage has some static fields and is causing problems checking non-strings
		switch (Type.getClassName(Type.getClass(obj))) {
			case "RCImage" : photoList.set ( key, obj );
			case "HTTPRequest" : dataList.set ( key, obj.result );
			case "RCSwf" : swfList.set ( key, obj );
			default : trace("this asset does not belong to any supported category. key="+key);
		}
		onCompleteHandler();
	}
	function onCompleteHandler () :Void {
		nr ++;
		if (nr >= max)
			onComplete();
	}
	
	
	function totalProgress () :Void {
		var totalPercent = 0;
		var i = 0;
		for (key in currentPercentLoaded.keys()) {
			i++;
			totalPercent += currentPercentLoaded.get( key );
		}
		percentLoaded = Math.round (totalPercent / i);
		onProgress();
	}
	
	
	
	/**
	 *	Attach a Movieclip from the external loaded swf, or duplicate the loaded content from RCImage
	 * 	Can return a Sprite or the class instance
	 */
	public function get (key:String, returnAsBitmap:Bool=true) :Dynamic {
		init();
		//trace("get key "+key);//trace(swfList.exists ( key ));
		// Search for assets in the Hash of photoList first
		if (photoList.exists ( key )) {
			return photoList.get( key ).copy();// Returns RCImage
		}
		
		else if (dataList.exists ( key )) {
			return dataList.get( key );// Returns String
		}
		
		else if (swfList.exists ( key )) {
			return swfList.get( key );// Returns RCSwf
		}
#if (flash || nme)
		// Search for assets in each of the loaded swfList, might be there
		else {
			var classInstance :Dynamic = createInstance ( key );
			if (classInstance == null) return null;
			
			if (returnAsBitmap)
				return bitmapize ( classInstance );// Returns a Sprite
			else
				return classInstance;
		}
#end
		// No class was found with this definition name
		return null;
	}
	
#if (flash || nme)
	/**
	 *  Create an instance of a class from an external swf
	 */
	public function createInstance (className:String, ?args:Array<Dynamic>) :Dynamic {
		
		if (args == null)
			args = [];
			
		for (swf in swfList) if (swf.event.target.applicationDomain.hasDefinition ( className )) {
			var def = swf.event.target.applicationDomain.getDefinition ( className );
			var classInstance = Type.createInstance ( cast (def, Class<Dynamic>), args );
			return classInstance;
		}
		return null;
	}
	
	
	/**
	 *  Create a bitmap from the input and return it as a Sprite
	 */
	public function bitmapize (mc:Dynamic) :Sprite {
		
		if (mc.width > 2880 || mc.height > 2880) return null;
		
		var bitmap = new BitmapData (Math.round (mc.width), Math.round (mc.height), true, 0x000000ff );
			bitmap.draw ( mc );
		
		var d = new Sprite();
			d.addChild ( new Bitmap (bitmap, PixelSnapping.AUTO, true) );
		
		return d;
	}
#end
}
