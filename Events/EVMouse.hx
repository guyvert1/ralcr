
#if (flash || nme)
	import flash.events.MouseEvent;
#elseif js
	import js.Dom;
	typedef MouseEvent = Event;
	typedef EVMouseRelationship = {target:Dynamic, type:String, instance:EVMouse};
#end


class EVMouse extends RCSignal<EVMouse->Void> {
	
	public static var UP = "mouseup";
	public static var DOWN = "mousedown";
	public static var OVER = "mouseover";
	public static var OUT = "mouseout";
	public static var MOVE = "mousemove";
	public static var CLICK = "mouseclick";
	
	public var target :Dynamic;
	public var type :String;
	
	#if js
		// JS events do not permit to attach more than one listeners to a target
		// What we do is keep a list of events and their targets
		// And when we add a listener to an already used target we return the old EVMouse
		var targets :List<EVMouseRelationship>;
	#end
	
	/**
	 *  type: the tipe of mouse event you want to listen to.
	 *  target: displayobject you want to listen for events
	 **/
	public function new (type:String, target:Dynamic, ?pos:haxe.PosInfos) {
		if (target == null) throw "Can't use a null target. " + pos;
		
		super();
		
		this.type = type;
		this.target = target;
		#if js
			targets = new List<EVMouseRelationship>();
		#end
		addEventListener(pos);
	}
	function addEventListener (?pos:haxe.PosInfos) {
		#if (flash || nme)
			switch (type) {
				case UP: target.addEventListener (MouseEvent.MOUSE_UP, mouseHandler);
				case DOWN: target.addEventListener (MouseEvent.MOUSE_DOWN, mouseHandler);
				case OVER: target.addEventListener (MouseEvent.MOUSE_OVER, mouseHandler);
				case OUT: target.addEventListener (MouseEvent.MOUSE_OUT, mouseHandler);
				case MOVE: target.addEventListener (MouseEvent.MOUSE_MOVE, mouseHandler);
				case CLICK: target.addEventListener (MouseEvent.CLICK, mouseHandler);
				default: trace("The mouse event you're trying to add does not exist. "+pos);
			}
		#elseif js
			for (t in targets) {
				if (t.target == target && t.type == type) {
					// Target is already used for this mouse event
					trace("Target already in use by this event type. Called from "+pos);
					//this = t.instance;
					return;
				}
			}
			targets.add ({target:target, type:type, instance:this});
			switch (type) {
				case UP: target.onmouseup = mouseHandler;
				case DOWN: target.onmousedown = mouseHandler;
				case OVER: target.onmouseover = mouseHandler;
				case OUT: target.onmouseout = mouseHandler;
				case MOVE: target.onmousemove = mouseHandler;
				case CLICK: target.onclick = mouseHandler;
				default: trace("The mouse event you're trying to add does not exist. "+pos);
			}
		#end
	}
	function removeEventListener () {
		#if (flash || nme)
			switch (type) {
				case UP: target.removeEventListener (MouseEvent.MOUSE_UP, mouseHandler);
				case DOWN: target.removeEventListener (MouseEvent.MOUSE_DOWN, mouseHandler);
				case OVER: target.removeEventListener (MouseEvent.MOUSE_OVER, mouseHandler);
				case OUT: target.removeEventListener (MouseEvent.MOUSE_OUT, mouseHandler);
				case MOVE: target.removeEventListener (MouseEvent.MOUSE_MOVE, mouseHandler);
				case CLICK: target.removeEventListener (MouseEvent.CLICK, mouseHandler);
			}
		#elseif js
			switch (type) {
				case UP: target.onmouseup = null;
				case DOWN: target.onmousedown = null;
				case OVER: target.onmouseover = null;
				case OUT: target.onmouseout = null;
				case MOVE: target.onmousemove = null;
				case CLICK: target.onclick = null;
			}
		#end
	}
	function mouseHandler (e:MouseEvent) {
		dispatch ( [this] );
	}
	override public function destroy () :Void {
		removeEventListener();
		super.destroy();
	}
}
