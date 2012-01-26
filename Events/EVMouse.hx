
#if (flash || nme)
	import flash.events.MouseEvent;
	import flash.display.StageDisplayState;
#elseif js
	import js.Dom;
	typedef MouseEvent = Event;
#end


class EVMouse extends RCSignal<Bool->Void> {
	
	static var instance :EVMouse;
	
	public function new () {
		
		if (instance != null) throw "You can't instantiate EVMouse";
			instance = this;
			
		super();
		
		#if (flash || nme)
			RCWindow.stage.addEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
			RCWindow.stage.addEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
		#elseif js
			js.Lib.document.onmouseup = mouseUpHandler;
			js.Lib.document.onmousemove = mouseMoveHandler;
		#end
	}
	function mouseUpHandler (e:MouseEvent) {
		trace("mouseUp");
	}
	function mouseMoveHandler (e:MouseEvent) {
		#if (flash || nme)
			var w = flash.Lib.current.stage.stageWidth;
			var h = flash.Lib.current.stage.stageHeight;
		#elseif js
			var w = js.Lib.document.body.scrollWidth;
			var h = js.Lib.document.body.scrollHeight;
		#end
		dispatch ( [w, h] );
	}
}
