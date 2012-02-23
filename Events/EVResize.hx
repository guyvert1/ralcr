#if (flash || nme)
	import flash.events.Event;
#elseif js
	import js.Dom;// typedef js.Event
#end

class EVResize extends RCSignal<Int->Int->Void> {
	
	public function new () {
		super();
		#if (flash || nme)
			flash.Lib.current.stage.addEventListener (Event.RESIZE, resizeHandler);
		#elseif js
			js.Lib.window.onresize = resizeHandler;
		#end
	}
	
	function resizeHandler (e:Event) {
		#if (flash || nme)
			var w = flash.Lib.current.stage.stageWidth;
			var h = flash.Lib.current.stage.stageHeight;
		#elseif js
			//var w = js.Lib.document.body.scrollWidth;
			//var h = js.Lib.document.body.scrollHeight;
			var w = js.Lib.window.innerWidth;
			var h = js.Lib.window.innerHeight;
		#end
		dispatch ( [w, h] );
	}
}
