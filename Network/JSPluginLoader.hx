class JSPluginLoader {
	public var percentLoaded :Int;
	
	dynamic public function onProgress() :Void {}
	dynamic public function onComplete() :Void {}
	dynamic public function onError() :Void {}
	
	
	public function new (path:String) {
/*		loader = new URLLoader();
		loader.dataFormat = URLLoaderDataFormat.BINARY;
		loader.addEventListener (Event.COMPLETE, binaryLoaded);
		loader.addEventListener (ProgressEvent.PROGRESS, progressHandler);
		loader.addEventListener (ErrorEvent.ERROR, errorHandler);
		loader.addEventListener (IOErrorEvent.IO_ERROR, ioErrorHandler);
		loader.load ( new URLRequest ( path ) );*/
	}
	
	public function destroy () :Void {
		
	}
	
	
	/**
	 *  Check if a class name exists in the current application domain, meaning the current swf or the loaded swf's.
	 **/
	public static function exists (key:String) {
		return false;
	}
}