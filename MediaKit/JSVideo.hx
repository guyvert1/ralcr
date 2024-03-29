//
//  Javascript VideoPlayer
//
//  Created by Baluta Cristian on 2012-01-21.
//  Copyright (c) 2012 http://ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

import js.Lib;
import haxe.Timer;

/*

 - W3C http://www.w3.org/TR/html5/video.html
 
	onabort	script 	Script to be run on abort
	oncanplay     script	Script to be run when a file is ready to start playing (when it has buffered enough to begin)
	oncanplaythrough     script	Script to be run when a file can be played all the way to the end without pausing for buffering
	ondurationchange     script 	Script to be run when the length of the media changes
	onemptied     script 	Script to be run when something bad happens and the file is suddenly unavailable (like unexpectedly disconnects)
	onended     script 	Script to be run when the media has reach the end (a useful event for messages like "thanks for listening")
	onerror     script 	Script to be run when an error occurs when the file is being loaded
	onloadeddata     script	Script to be run when media data is loaded
	onloadedmetadata     script	Script to be run when meta data (like dimensions and duration) are loaded
	onloadstart     script	Script to be run just as the file begins to load before anything is actually loaded
	onpause     script 	Script to be run when the media is paused either by the user or programmatically
	onplay     script 	Script to be run when the media is ready to start playing
	onplaying     script 	Script to be run when the media actually has started playing
	onprogress     script 	Script to be run when the browser is in the process of getting the media data
	onratechange     script 	Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)
	onreadystatechange     script 	Script to be run each time the ready state changes (the ready state tracks the state of the media data)
	onseeked     script 	Script to be run when the seeking attribute is set to false indicating that seeking has ended
	onseeking     script 	Script to be run when the seeking attribute is set to true indicating that seeking is active
	onstalled     script 	Script to be run when the browser is unable to fetch the media data for whatever reason
	onsuspend     script	Script to be run when fetching the media data is stopped before it is completely loaded for whatever reason
	ontimeupdate     script	Script to be run when the playing position has changed (like when the user fast forwards to a different point in the media)
	onvolumechange     script	Script to be run each time the volume is changed which (includes setting the volume to "mute")
	onwaiting     script	Script to be run when the media has paused but is expected to resume (like when the media pauses to buffer more data)
		*/

class JSVideo extends RCView, implements RCVideoInterface {
	
	public static var BUFFER_TIME :Int = 2;
	public static var DEFAULT_VOLUME :Float = 0.8;
	public static var DISPLAY_TIMER_UPDATE_DELAY :Int = 1000;
	
    var video :Dynamic;
	var videoURL :String;
	var inited_ :Bool;
	var loaded_ :Bool;
	var seeking_ :Bool;
	var volume_ :Float;
	var timer :Timer;
	
	public var background :RCRectangle;
	public var updateTime :Int;
	public var isPlaying :Bool;
	public var aspectRatio :Null<Float>;
	public var time :Float;
	public var duration :Float;
	public var percentLoaded :Int;
	public var percentPlayed :Int;
	public var statusMessage :String;
	public var secureToken :String;// This is sent by the server and is stored here for later access
	public var volume (getVolume, setVolume) :Float;
	
	/**
	 * Dispatch events
	 */
	dynamic public function onInit () :Void {}
	dynamic public function onError () :Void {}
	dynamic public function videoDidStart () :Void {}
	dynamic public function videoDidStop () :Void {}
	dynamic public function videoDidFinishPlaying () :Void {}
	dynamic public function onLoadingProgress () :Void {}
	dynamic public function onPlayingProgress () :Void {}
	dynamic public function onBufferEmpty () :Void {}
	dynamic public function onBufferFull () :Void {}
	dynamic public function streamWantsSecureToken () :Void {}// Not available in JS
	
	
	//
	public function new (x, y, URL:String, ?w:Null<Float>, ?h:Null<Float>) {
		
		super (x, y, w, h);
		
		this.videoURL = URL;
		this.inited_ = false;
		this.loaded_ = false;
		this.seeking_ = false;
		this.isPlaying = false;
		this.percentLoaded = 0;
		this.percentPlayed = 0;
		this.time = 0.0;
		this.duration = 0.0;
		this.statusMessage = "Not inited";
		this.updateTime = DISPLAY_TIMER_UPDATE_DELAY;
		volume_ = DEFAULT_VOLUME;
		
		this.addChild ( background = new RCRectangle (0, 0, w, h, 0x000000, 0) );
		
		init();
    }
	
	
	override public function init () :Void {
		
		super.init();
		
		// Create timer to update all visual parts of the player
		timer = new Timer ( updateTime );
		
		// Create video tag element
		video = Lib.document.createElement("video");
        video.setAttribute("preload", "auto");
		video.autoplay = "autoplay";
		video.controls = null;//"controls";
		video.src = this.videoURL;
        layer.appendChild ( video );

        //video.width = size.width;
        //video.height = size.height;
		
        video.addEventListener("error", errorHandler, false);
        video.addEventListener("loadedmetadata", onMetaData, false);
        video.addEventListener("playing", videoDidStartHandler, false);
        video.addEventListener("ended", videoDidFinishPlayingHandler, false);
        video.addEventListener("stalled", onBufferEmptyHandler, false);
        video.addEventListener("canplay", onBufferFullHandler, false);
        video.addEventListener("canplaythrough", onBufferFullHandler, false);
        video.addEventListener("waiting", onBufferEmptyHandler, false);
	}
	public function addAlternativeURL (url:String) :Void {
		
		if (video.canPlayType("video/"+url.split(".").pop()))
			video.src = url;
	}
	
	
	public function secureTokenResponse (token:String) :Void {}
	
	function initHandler () :Void {
		
		setVolume ( volume_ );
		
		onInit();
	}
	
    function errorHandler (e:Dynamic) :Void {
		
		trace(videoURL);
        statusMessage = e.target.error.code;
		
		switch (statusMessage) {
			case e.target.error.MEDIA_ERR_ABORTED:
				trace('You aborted the video playback.');
			case e.target.error.MEDIA_ERR_NETWORK:
				trace('A network error caused the video download to fail part-way.');
            case e.target.error.MEDIA_ERR_DECODE:
                trace('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
            case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                trace('The video could not be loaded, either because the server or network failed or because the format is not supported.');
            default:
                trace('An unknown error occurred.');
        }

        onError();
    }
	

	
	
	/**
	 * Main loop which dispatch some events: loading progress, playing progress
	 */
	function loop () :Void { try {
		
		if (!seeking_) {
			time = video.currentTime;
			percentPlayed = Math.round (time / duration * 100);
			onPlayingProgress();
		}
		
		// Update the loading progress
		if (!loaded_) {
	        if (video.buffered != null) {
	            if (video.buffered.length > 0) {
	                percentLoaded = Math.ceil ( video.buffered.end(0) / duration);
					if (percentLoaded >= 100) loaded_ = true;
					onLoadingProgress();
	            }
	        }
	        else {
	            percentLoaded = 0;
	        }
		}
		
		} catch (e:Dynamic) {
			trace(e);
			var stack = haxe.Stack.exceptionStack();
			trace (haxe.Stack.toString ( stack ));
		}
	}
	
	
	/**
	 *	Listeners for metaData and cuePoints
	 */
	function onMetaData () :Void {
		trace("JSVideo medatada received. Now ready to play.");
		if (seeking_) return;
		if (duration != 0) return;
		
        var videoWidth = Std.parseInt ( Std.string ( video.videoWidth));
        var videoHeight = Std.parseInt ( Std.string ( video.videoHeight));
		
        duration = Std.parseInt ( Std.string ( video.duration));
        aspectRatio = (videoWidth != null && videoHeight != null) ? (videoWidth / videoHeight) : null;
		
		trace("aspectRatio "+aspectRatio);
		trace("duration"+duration);
		
		// Check the size specified by the user
		if (size.width != 0 && size.height != 0) {
			setSize (size.width, size.height);
		}
		// Otherwise set it to the size from metadata
		else setSize (videoWidth, videoHeight);
		
		// Now that we have the metadata, we can start the timer
		timer.run = loop;
	}
	
	function videoDidFinishPlayingHandler () :Void {
		trace("videoDidFinishPlaying");
		videoDidFinishPlaying();
		timer.stop();
	}
	function videoDidStartHandler () :Void {
		trace("videoDidStart");
		videoDidStart();
		timer.run = loop;
	}
	
	
	/**
	 * Control the player
	 */
	public function startVideo (?file:String) :Void {
		
		
        #if ios
        	// bug: http://clubajax.org/ipad-bug-fix-for-dynamically-created-html5-video/
        	video.load();
        #end
		
		// check's, if the flv has already begun
		// to download. if so, resume playback, else
		// load the file
/*		if (!inited_) {
			ns.play (file != null ? file : videoURL);
			inited_ = true;
		}
		else {
			ns.resume();
			timer.start();
		}
		isPlaying = true;*/
	}
	public function replayVideo () : Void {
		video.currentTime = 0;
		video.play();
	}
	
	public function stopVideo () : Void {
		video.src = "";
	}
	
	public function pauseVideo () :Void {
		video.pause();
	}
	
	public function resumeVideo () :Void {
		video.play();
	}
	
	public function togglePause () :Void {
		if (isPlaying)
			pauseVideo();
		else
			resumeVideo();
	}
	
	
	
	/**
	 *  Seek video to time (sec)
	 */
	public function seekTo (time:Float) :Bool {
		seeking_ = true;
		if (time > duration * percentLoaded / 100) return false;//Do not seek beyound current loaded 
		video.currentTime = time;
		
		return true;
	}
	
	public function stopSeeking () :Void {
		seeking_ = false;
	}
	
	
	
	/**
	 *	Control the volume
	 */
	public function getVolume () :Float {
		return volume_;
	}
	
	public function setVolume (volume:Float) :Float {
		volume_ = volume > 1 ? 1 : volume;
		video.volume = Std.string ( Math.round (volume * 10) / 10);
		return volume_;
	}
	
	
	/**
	 *	Sets the size of the video object and maintains its aspect ratio
	 */
	public function setSize (w, h) :Void {
		
		size.width = w;
		size.height = h;
		background.width = w;
		background.height = h;
		
		var holderAspectRatio = w / h;
		if (aspectRatio != null) {
			if (aspectRatio < holderAspectRatio) {
				video.height = h;
				video.width = h * aspectRatio;
			}
			else {
				video.width = w;
				video.height = w / aspectRatio;
			}
		}
		else {
			video.width = w;
			video.height = h;
		}
		
		// Center the video object in the provided width and height
		video.style.x = Math.round ((w - video.width) / 2);
		video.style.y = Math.round ((h - video.height) / 2);
	}
	
	
	/**
	 * Cleanup the mess, stop the player
	 */
	override public function destroy () :Void {
		
		if (timer != null) {
			timer.stop();
		}
		
		video.src = "";
		video.removeEventListener("error", errorHandler, false);
		video.removeEventListener("loadedmetadata", onMetaData, false);
        video.removeEventListener("playing", videoDidStartHandler, false);
		video.removeEventListener("ended", videoDidFinishPlayingHandler, false);
		video.removeEventListener("stalled", onBufferEmptyHandler, false);
		video.removeEventListener("canplay", onBufferFullHandler, false);
		video.removeEventListener("canplaythrough", onBufferFullHandler, false);
		video.removeEventListener("waiting", onBufferEmptyHandler, false);
		video = null;
		
		super.destroy();
	}
	

	function onBufferEmptyHandler() {
        onBufferEmpty();
	}
	
	function onBufferFullHandler() {
		onBufferFull();
	}
}
