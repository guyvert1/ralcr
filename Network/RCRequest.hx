//
//  Make a http request
//
//  Created by Baluta Cristian on 2008-06-25.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if flash
	import flash.events.Event;
	import flash.events.IEventDispatcher;
	import flash.events.ProgressEvent;
	import flash.events.SecurityErrorEvent;
	import flash.events.HTTPStatusEvent;
	import flash.events.IOErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLVariables;
	import flash.net.URLRequestMethod;
	private typedef Result = Event;
#elseif js
	import js.Dom;
	import haxe.Http;
	private typedef URLLoader = Http;
	private typedef URLRequest = Http;
	private typedef URLVariables = Dynamic;
	private typedef IEventDispatcher = Http;
	private typedef ProgressEvent = Dynamic;
	private typedef SecurityErrorEvent = String;
	private typedef IOErrorEvent = String;
	private typedef Result = String;
	private typedef HTTPStatusEvent = Int;
#end

class RCRequest {
	
	var loader :URLLoader;
	public var result :String; // Returned data or error message
	public var status :Int; //
	public var percentLoaded :Int;
	
	/**
	 * Dispatch events by overriding this functions
	 */
	dynamic public function onOpen () :Void {}
	dynamic public function onComplete () :Void {}
	dynamic public function onError () :Void {}
	dynamic public function onProgress () :Void {}
	dynamic public function onStatus () :Void {}
	
	
	public function new () {}
	
	/**
	 * Execute a request
	 */
	public function load (URL:String, ?variables:URLVariables, ?method:String="POST") :Void {
		#if flash
			loader = new URLLoader();
			configureListeners ( loader );
			var request = new URLRequest ( URL );
				request.data = variables;
				request.method = method == "POST" ? URLRequestMethod.POST : URLRequestMethod.GET;
			loader.load ( request );
		#elseif js
			loader = new Http ( URL );
			configureListeners ( loader );
			loader.request ( method == "POST" ? true : false );
		#end
	}
	
	
	/**
	 * Configure and remove listeners
	 */
	function configureListeners (dispatcher:IEventDispatcher) :Void {
		#if flash
			dispatcher.addEventListener (Event.OPEN, openHandler);
			dispatcher.addEventListener (Event.COMPLETE, completeHandler);
			dispatcher.addEventListener (ProgressEvent.PROGRESS, progressHandler);
			dispatcher.addEventListener (SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			dispatcher.addEventListener (HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
			dispatcher.addEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
		#elseif js
			dispatcher.onData = completeHandler;
			dispatcher.onError = securityErrorHandler;
			dispatcher.onStatus = httpStatusHandler;
		#end
    }

	function removeListeners (dispatcher:IEventDispatcher) :Void {
		#if flash
			dispatcher.removeEventListener (Event.OPEN, openHandler);
			dispatcher.removeEventListener (Event.COMPLETE, completeHandler);
			dispatcher.removeEventListener (ProgressEvent.PROGRESS, progressHandler);
			dispatcher.removeEventListener (SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			dispatcher.removeEventListener (HTTPStatusEvent.HTTP_STATUS, httpStatusHandler);
			dispatcher.removeEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
		#elseif js
			dispatcher.onData = null;
			dispatcher.onError = null;
			dispatcher.onStatus = null;
		#end
    }
	
	
	/**
	 *	Handle events
	 */
	function openHandler (e:Event) :Void {
		onOpen();
	}
	
	function completeHandler (e:Result) :Void {
		#if flash
			result = e.target.data;
		#elseif js
			result = e;
		#end
		
		(result.indexOf("error::") != -1)
		? {
			result = result.split("error::").pop();
			onError();
		}
		: onComplete();
	}
	
	function progressHandler (e:ProgressEvent) :Void {
		#if flash
			percentLoaded = Math.round ( e.bytesLoaded / e.bytesTotal * 100 );
			onProgress ();
		#end
    }
	function securityErrorHandler (e:SecurityErrorEvent) :Void {
		#if flash
			result = e.text;
		#elseif js
			result = e;
		#end
		onError();
    }
	function httpStatusHandler (e:HTTPStatusEvent) :Void {
		#if flash
			status = e.status;
		#elseif js
			status = e;
		#end
		onStatus();
    }
	function ioErrorHandler (e:IOErrorEvent) :Void {
		#if flash
			result = e.text;
		#elseif js
			result = e;
		#end
		onError();
    }
	
	
	/** Stop executing any request and remove listeners
	 */
	public function destroy () :Void {
		removeListeners ( loader );
		loader = null;
	}
}
