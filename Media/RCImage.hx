//
//  Photo
//
//  Created by Baluta Cristian on 2008-04-01.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.display.Sprite;
	import flash.display.Loader;
	import flash.system.LoaderContext;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.PixelSnapping;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.events.ProgressEvent;
	import flash.events.ErrorEvent;
	import flash.events.IOErrorEvent;
#elseif js
	import js.Dom;
	import RCView;
	typedef Loader = js.Dom.Image;
	typedef ProgressEvent = Event;
	typedef ErrorEvent = Event;
	typedef IOErrorEvent = Event;
#end

class RCImage extends RCView {
	
	var loader :Loader;
	
	public var isLoaded :Bool;
	public var percentLoaded :Int;
	public var errorMessage :String;
	
	dynamic public function onComplete () :Void {}
	dynamic public function onProgress () :Void {}
	dynamic public function onError () :Void {}
	
	// Some convenient methods to create an image
	//
	public static function imageNamed (name:String) :RCImage {
		return new RCImage (0,0,name);
	}
	public static function imageWithContentsOfFile (path:String) :RCImage {
		return new RCImage (0,0,path);
	}
	#if flash
	public static function imageWithData (data:BitmapData) :RCImage {
		return new RCImage (0,0,null);
	}
	#end
	
	public function new (x, y, URL:String) {
		super(x, y);
		initWithContentsOfFile( URL );
		addListeners();
	}

	public function initWithContentsOfFile (URL:String) {
		isLoaded = false;
		percentLoaded = 0;
		#if (flash || nme)
			loader = new Loader();
			loader.load ( new URLRequest ( URL ), new LoaderContext (true) );
		#elseif js
			loader = cast js.Lib.document.createElement("img");
			untyped loader.draggable = false;
			loader.src = URL;
		#end
	}
	
	
	/**
	 *	Handlers.
	 */
	function completeHandler (e:Event) :Void {
		#if (flash || nme)
			this.size.width = this.lastW = loader.content.width;
			this.size.height = this.lastH = loader.content.height;
			this.view.addChild ( loader );
			bitmapize();
		#elseif js
			this.size.width = this.lastW = this.width = loader.width;
			this.size.height = this.lastH = this.height = loader.height;
			this.view.appendChild ( loader );
		#end
		this.isLoaded = true;
		onComplete();
	}
#if (flash || nme)
	function progressHandler (e:ProgressEvent) :Void {
		percentLoaded = Math.round (e.target.bytesLoaded * 100 / e.target.bytesTotal);
		onProgress ();
	}
#end
	function errorHandler (e:ErrorEvent) :Void {
		errorMessage = Std.string(e);
		onError();
	}
	
	function ioErrorHandler (e:IOErrorEvent) :Void {
		errorMessage = Std.string(e);
		onError();
	}
	
#if (flash || nme)
	/**
	 * Bitmapize the loaded photo. This will prevent pixelizing when photo is scaled
	 */
	function bitmapize () :Void {
		var d = duplicate();
		if (d != null) {
			this.view.removeChild ( loader );
			this.view.addChild ( d );
		}
	}
	
	
	/**
	 *	Get a duplicate of the photo.
	 */
	public function duplicate () :Sprite {
		
		if (loader.content.width > 2880 || loader.content.height > 2880) return null;
		
		var bitmap = new BitmapData (	Math.round (loader.content.width),
										Math.round (loader.content.height), true, 0x000000ff );
		
		bitmap.draw ( loader.content );
		
		var d = new Sprite();
			d.addChild ( new Bitmap (bitmap, PixelSnapping.AUTO, true) );
		
		return d;
	}
	
#elseif js
	public function duplicate () :RCImage {
/*		var v :Image = untyped js.Lib.document.createElement("img");
			v.style.width = size.width+"px";
			v.style.height = size.height+"px";
			v.style.display = "inline";
			//v.style.position = "absolute";
			//v.src = loader.src;
			v.style.backgroundImage = "url('" + loader.src + "')";
		return v;*/
		return new RCImage(0,0,loader.src);
	}
#end
	
	function addListeners () :Void {
		#if (flash || nme)
			loader.contentLoaderInfo.addEventListener (Event.COMPLETE, completeHandler);
			loader.contentLoaderInfo.addEventListener (ProgressEvent.PROGRESS, progressHandler);
			loader.contentLoaderInfo.addEventListener (ErrorEvent.ERROR, errorHandler);
			loader.contentLoaderInfo.addEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
		#elseif js
			loader.onload = completeHandler;
			loader.onerror = errorHandler;
		#end
	}
	
	function removeListeners () :Void {
		#if (flash || nme)
			loader.contentLoaderInfo.removeEventListener (Event.COMPLETE, completeHandler);
			loader.contentLoaderInfo.removeEventListener (ProgressEvent.PROGRESS, progressHandler);
			loader.contentLoaderInfo.removeEventListener (ErrorEvent.ERROR, errorHandler);
			loader.contentLoaderInfo.removeEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
		#elseif js
			loader.onload = null;
			loader.onerror = null;
		#end
	}
	
	
	override public function destroy() :Void {
		removeListeners();
		#if (flash || nme)
			//loader.close();
			loader.unload();
		#end
		loader = null;
	}
	
#if js
	override public function scaleToFit (w:Int, h:Int) :Void {
		super.scaleToFit (w, h);
		loader.style.width = width+"px";
		loader.style.height = height+"px";
	}
	override public function scaleToFill (w:Int, h:Int) :Void {
		super.scaleToFill (w, h);
		loader.style.width = width+"px";
		loader.style.height = height+"px";
	}
#end
}