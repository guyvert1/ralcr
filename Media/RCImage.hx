//
//  RCImage
//
//  Created by Baluta Cristian on 2008-04-01.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.display.Loader;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.PixelSnapping;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.events.ProgressEvent;
	import flash.events.ErrorEvent;
	import flash.events.IOErrorEvent;
	#if flash
		import flash.system.LoaderContext;
	#end
#elseif js
	import js.Dom;
	import RCView;
	typedef Loader = js.Dom.Image;
	typedef BitmapData = Dynamic;
	typedef ErrorEvent = Event;
	typedef IOErrorEvent = Event;
#end


class RCImage extends RCView {
	
	public var loader :Loader;
	public var bitmapData :BitmapData;
	
	public var isLoaded :Bool;
	public var percentLoaded :Int;
	public var errorMessage :String;
	
	dynamic public function onComplete () :Void {}
	dynamic public function onProgress () :Void {}
	dynamic public function onError () :Void {}
	
	// Some convenient methods to create an image
	//
	/**
	 *  Create an instance of the rcimage with the path to the photo
	 *  Or id of the photo for NME
	 *  Asyncronous operation
	 **/
	public static function imageNamed (name:String) :RCImage {
		return new RCImage (0,0,name);
	}
	/**
	 *  NME method to load an image. Syncronous operation.
	 **/
	public static function imageWithContentsOfFile (path:String) :RCImage {
		return new RCImage (0,0,path);
	}
	/**
	 *  
	 **/
	public static function resizableImageWithCapInsets (path:String, capWidth:Int) :RCImage {
		return new RCImage (0,0,path);
	}
#if (flash || nme)
	/**
	 *  Create an image from the ByteArray. Async
	 **/
	public static function imageWithBytes (data:flash.utils.ByteArray) :RCImage {
		var im = new RCImage (0,0,null);
			im.loader.loadBytes ( data );
		return im;
	}
	/**
	 *  This will create a RCImage based on a BitmapData. onComplete event is dispatched after
	 *  10ms to keep the asyncronous operations compatible.
	 **/
	public static function imageWithBitmapData (bitmapBata:BitmapData) :RCImage {
		var im = new RCImage (0,0,null);// Create a blank image
			im.bitmapData = bitmapBata;// Set the BitmapData
			im.completeHandler(null);// Display the image in it's container
		return im;// Returns it
	}
#end
	
	
	
	
	
	public function new (x, y, URL:String) {
		super (x, y);
		
		#if (nme || flash)
			loader = new Loader();
		#elseif js
			loader = cast js.Lib.document.createElement("img");
		#end
		
		addListeners();
		initWithContentsOfFile ( URL );
	}
	
	/**
	 *  The image created through the constructor and this method is asyncronous for all platforms
	 **/
	public function initWithContentsOfFile (URL:String) {
		isLoaded = false;
		percentLoaded = 0;
		if (URL == null) return;
		#if nme
			bitmapData = nme.Assets.getBitmapData ( URL );
			haxe.Timer.delay (function() { (bitmapData != null) ? completeHandler(null) : errorHandler(null); }, 10);
		#elseif flash
			loader.load ( new URLRequest ( URL ), new LoaderContext ( true ) );
		#elseif js
			untyped loader.draggable = false;
			loader.src = URL;
		#end
	}
	
	
	/**
	 *	Bitmapize and add the image to the displaylist.
	 */
	public function completeHandler (e:Event) :Void {
		#if (flash || nme)
			if (bitmapData != null) {
				// We already have the bitmapData at this point
				var bitmap = new Bitmap (bitmapData, PixelSnapping.AUTO, true);
				this.size.width = this.lastW = bitmapData.width;
				this.size.height = this.lastH = bitmapData.height;
				this.layer.addChild ( bitmap );
			}
			else {
				var w = Math.round (loader.content.width);
				var h = Math.round (loader.content.height);
				// Add the image to the view
				this.size.width = this.lastW = w;
				this.size.height = this.lastH = h;
				this.layer.addChild ( loader );
				// Get the BitmapData of the image
				
				if (w <= 2880 && h <= 2880) {
				
				}
				
				bitmapData = new BitmapData (w, h, true, 0x000000ff);
				bitmapData.draw ( loader.content );
				
				var bitmap = new Bitmap (bitmapData, PixelSnapping.AUTO, true);
				this.layer.removeChild ( loader );
				this.layer.addChild ( bitmap );
			}
		#elseif js
			this.size.width = this.lastW = this.width = loader.width;
			this.size.height = this.lastH = this.height = loader.height;
			this.layer.appendChild ( loader );
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

	/**
	 *	Get a copy of the RCImage.
	 *  In flash and NME it creates in image based on the BitmapData.
	 *  In JS it loads again the image from cache.
	 */
#if (flash || nme)
	public function copy () :RCImage {
		return imageWithBitmapData ( bitmapData );
	}
#elseif js
	public function copy () :RCImage {
		return new RCImage (0, 0, loader.src);
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
			if (bitmapData != null)
				bitmapData.dispose();
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
