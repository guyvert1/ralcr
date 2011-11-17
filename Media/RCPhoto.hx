//
//  Photo
//
//  Created by Baluta Cristian on 2008-04-01.
//  Copyright (c) 2008 http://ralcr.com. All rights reserved.
//
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


class RCPhoto extends RCView {
	
	var loader :Loader;
	
	public var isLoaded :Bool;
	public var percentLoaded :Int;
	public var errorMessage :String;
	
	dynamic public function onComplete () :Void {}
	dynamic public function onProgress () :Void {}
	dynamic public function onError () :Void {}
	
	
	public function new (x, y, URL:String) {
		super(x, y);
		load( URL );
		addListeners();
	}
	
	public function load (URL:String) {
		isLoaded = false;
		percentLoaded = 0;
		
		loader = new Loader();
		loader.load ( new URLRequest ( URL ), new LoaderContext (true) );
	}
	
	
	/**
	 *	Handlers.
	 */
	function completeHandler (e:Event) :Void {
		
		this.size.width = this.lastW = loader.content.width;
		this.size.height = this.lastH = loader.content.height;
		this.isLoaded = true;
		this.view.addChild ( loader );
		
		bitmapize();
		onComplete();
	}
	
	function progressHandler (e:ProgressEvent) :Void {
		percentLoaded = Math.round (e.target.bytesLoaded * 100 / e.target.bytesTotal);
		onProgress ();
	}
	
	function errorHandler (e:ErrorEvent) :Void {
		errorMessage = e.toString();//trace(errorMessage);
		onError();
	}
	
	function ioErrorHandler (e:IOErrorEvent) :Void {
		errorMessage = e.toString();//trace(errorMessage);
		onError();
	}
	
	
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
	
	
	function addListeners () :Void {
		loader.contentLoaderInfo.addEventListener (Event.COMPLETE, completeHandler);
		loader.contentLoaderInfo.addEventListener (ProgressEvent.PROGRESS, progressHandler);
		loader.contentLoaderInfo.addEventListener (ErrorEvent.ERROR, errorHandler);
		loader.contentLoaderInfo.addEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
	}
	
	function removeListeners () :Void {
		loader.contentLoaderInfo.removeEventListener (Event.COMPLETE, completeHandler);
		loader.contentLoaderInfo.removeEventListener (ProgressEvent.PROGRESS, progressHandler);
		loader.contentLoaderInfo.removeEventListener (ErrorEvent.ERROR, errorHandler);
		loader.contentLoaderInfo.removeEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
	}
	
	
	override public function destroy() :Void {
		removeListeners();
		//loader.close();
		loader.unload();
		loader = null;
	}
}
