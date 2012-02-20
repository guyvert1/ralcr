
/**
 * Handle loading the audio file. Event handlers seem to fail
 * on lot of browsers.
 * @private
 */
/*lime.audio.Audio.prototype.loadHandler_ = function() {
    if (this.baseElement.readyState > 2) {
        this.loaded_ = true;
        clearTimeout(this.loadInterval);
    }
    if (this.baseElement.error)clearTimeout(this.loadInterval);

    if (lime.userAgent.IOS && this.baseElement.readyState == 0) {
        //ios hack do not work any more after 4.2.1 updates
        // no good solutions that i know
        this.loaded_ = true;
        clearTimeout(this.loadInterval);
        // this means that ios audio anly works if called from user action
    }
};*/

/**
 * Returns true if audio file has been loaded
 * @return {boolean} Audio has been loaded.
 */
/*lime.audio.Audio.prototype.isLoaded = function() {
    return this.loaded_;
};*/

/**
 * Returns true if audio file is playing
 * @return {boolean} Audio is playing.
 */
/*lime.audio.Audio.prototype.isPlaying = function() {
    return this.playing_;
};*/


//
//  JSAudio
//
//  Created by Baluta Cristian on 2012-01-23.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//

import js.Lib;
import js.Dom;


class JSAudio implements RCAudioInterface {
	
	public static var DISPLAY_TIMER_UPDATE_DELAY :Int = 1000;
	
	var URL :String;
	var sound :HtmlDom;
	var channel :HtmlDom;
	var timer :Timer;
	var volume_ :Float;
	
	public var errorMessage :String;
	public var percentLoaded :Int;
	public var percentPlayed :Int;
	public var updateTime :Int;
	public var time :Int;
	public var duration :Float;
	public var id3 :Dynamic;
	public var volume (getVolume, setVolume) :Float;
	public var repeat :Bool;
	
	
	/**
	 * Dispatch events by replacing this methods
	 */
	dynamic public function onPlayingProgress () :Void {}
	dynamic public function onLoadingProgress () :Void {}
	dynamic public function onLoadComplete () :Void {}
	dynamic public function onError () :Void {}
	dynamic public function onID3 () :Void {}
	dynamic public function soundDidFinishPlaying () :Void {}
	dynamic public function soundDidStartPlaying () :Void {}
	dynamic public function soundDidStopPlaying () :Void {}
	
	//
	public function new (URL:String) {
		this.URL = URL;
		this.updateTime = DISPLAY_TIMER_UPDATE_DELAY;
		this.repeat = false;
		this.volume_ = 1;
	}
	public function init () :Void {
		if(filePath && goog.isFunction(filePath.data)){
			filePath = filePath.data();
		}

		this.loaded_ = false;
		this.playing_ = false;

		sound = document.createElement('audio');
		sound.preload = true;
		sound.loop = false;

/*		if (goog.userAgent.GECKO && (/\.mp3$/).test(filePath)) {
			filePath = filePath.replace(/\.mp3$/, '.ogg');
		}*/

		sound.src = URL;
		sound.load();

		timer = new haxe.Timer ( updateTime );
		timer.run = loop;
	}
	
	/**
	 * Controls for audio
	 */
	public function start (?time:Null<Int>) :Void {
		
		if (sound == null) init();
			
		if (this.isLoaded() && !this.isPlaying()) {
			sound.play();
			this.playing_ = true;
		}
		
		timer.start();
		setVolume ( _volume );
		
		soundDidStartPlaying();
	}
	
	public function stop () :Void {
		if (this.isPlaying()) {
			this.baseElement.pause();
			this.playing_ = false;
		}
		
/*		channel.stop();
		channel.removeEventListener (Event.SOUND_COMPLETE, soundCompleteHandler);
		channel = null;*/
		time = 0;
		
		if (timer != null)
			timer.stop();
		
		soundDidStopPlaying();
	}
	
	
	
	function completeHandler (e:Event) :Void {
		onLoadComplete();
	}
	function id3Handler (e:Event) :Void {
		id3 = e.currentTarget.id3;
		onID3();
	}
	function ioErrorHandler (e:Event) :Void {
		errorMessage = e.toString();
		onError();
	}
	function errorHandler (e:ErrorEvent) :Void {
		errorMessage = e.toString();
		onError();
	}
	function progressHandler (e:ProgressEvent) :Void {
		percentLoaded = Math.round (e.target.bytesLoaded * 100 / e.target.bytesTotal);
		onLoadingProgress();
	}
	function soundCompleteHandler (e:Event) :Void {trace(e);
		if (repeat)
			start ( 0 );
		else if (sound.length > 0) {
			if (timer != null)
				timer.stop();
			soundDidFinishPlaying();
		}
	}
	
	// Loop
	function loop (e:TimerEvent) :Void {
		time = Math.round ( channel.position / 1000 );
		duration = Math.round ( sound.length / 1000 );
		percentPlayed = Math.round ( time * 100 / duration );
		
		onPlayingProgress();
	}
	
	
	/**
	 *	Control the volume
	 */
	public function getVolume () :Float {
		return _volume;
	}
	
	public function setVolume (volume:Float) :Float {
		_volume = volume > 1 ? 1 : volume;

		return _volume;
	}
	
	
	public function destroy () :Void {
		stop();
		if (timer != null)
			timer.stop();
			timer = null;
	}
}
