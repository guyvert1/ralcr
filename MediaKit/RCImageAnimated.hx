//
//  3D Image simulation
//
//  Created by Baluta Cristian on 2008-04-01.
//  Copyright (c) 2008 http://ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

import haxe.Timer;


class RCImageAnimated extends RCView {
	
	var photoLeft :RCImage;
	var photoRight :RCImage;
	var nrOfLoadedPhotos :Int;
	var photoToDisplay :Int;
	
	public var isLoaded :Bool;
	public var percentLoaded :Int;
	public var errorMessage :String;
	public var updateTime :Int;
	
	dynamic public function onComplete () :Void {}
	dynamic public function onProgress () :Void {}
	dynamic public function onError () :Void {}
	
	
	public function new (x, y, URLLeft:String, URLRight:String) {
		super(x, y);
		
		isLoaded = false;
		percentLoaded = 0;
		nrOfLoadedPhotos = 0;
		updateTime = 10;
		photoToDisplay = 0;
		
		photoLeft = new RCImage (0, 0, URLLeft);
		photoLeft.onProgress = progressHandler;
		photoLeft.onError = errorHandler;
		photoLeft.onComplete = completeHandler;
		
		photoRight = new RCImage (0, 0, URLRight);
		photoRight.onProgress = progressHandler;
		photoRight.onError = errorHandler;
		photoRight.onComplete = completeHandler;
	}
	
	
	/**
	 *	Handlers.
	 */
	function completeHandler (e:Event) :Void {
		
		nrOfLoadedPhotos ++;
		
		if (nrOfLoadedPhotos == 2) {
			size.width = lastW = photoLeft.width;
			size.height = lastH = photoLeft.height;
			isLoaded = true;
			onComplete();
			
			timer = new Timer ( updateTime );
			timer.run = loop;
		}
	}
	function loop(_) {
		if (photoToDisplay == 0) {
			photoToDisplay = 1;
			
			this.addChild ( photoLeft );
			if (this.contains( photoRight )) this.removeChild ( photoRight );
		}
		else {
			photoToDisplay = 0;
			
			this.addChild ( photoRight );
			if (this.contains( photoLeft )) this.removeChild ( photoLeft );
		}
	}
	
	function progressHandler (e:ProgressEvent) :Void {
		percentLoaded = Math.round (e.target.bytesLoaded * 100 / e.target.bytesTotal);
		onProgress ();
	}
	
	function errorHandler (e:ErrorEvent) :Void {
		errorMessage = e.toString();
		onError();
	}
	
	function ioErrorHandler (e:IOErrorEvent) :Void {
		errorMessage = e.toString();
		onError();
	}
	
	
	override public function destroy() :Void {
		super.destroy();
		photoLeft.destroy();
		photoLeft = null;
		photoRight.destroy();
		photoRight = null;
		
		if (timer != null) {
			timer.stop();
			timer = null;
		}
	}
}
