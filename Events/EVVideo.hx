class EVVideo extends RCSignal<Float->Float->Void> {
	
	public var time :Float;
	public var duration :Float;
	
	inline public static var START	 :String = "video_start";
	inline public static var STOP	 :String = "video_stop";
	inline public static var LOADING_PROGRESS :String = "video_loadingProgress";
	inline public static var PLAYING_PROGRESS :String = "video_playingProgress";
	inline public static var COMPLETE:String = "video_complete";
	inline public static var ERROR	 :String = "video_error";
	inline public static var INIT	 :String = "video_init";
	
	
	public function new (time:Float, duration:Float) {
		this.time = time;
		this.duration = duration;
		
		dispatch ( [time, duration] );
	}
}
