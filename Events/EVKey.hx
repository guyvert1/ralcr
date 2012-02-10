
#if (flash || nme)
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
#elseif js
	import js.Dom;
	typedef KeyboardEvent = Event;
#end


class EVKey extends RCSignal<EVKey->Void> {
	
	public var char :String;
	public var keyCode :Int;
	
	public var down :RCSignal<String->Void>;
	public var up :RCSignal<String->Void>;
	
	
	public function new () {
		#if (flash || nme)
			flash.Lib.current.stage.addEventListener (KeyboardEvent.KEY_DOWN, keyDownHandler);
			flash.Lib.current.stage.addEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		#elseif js
			js.Lib.document.onkeydown = keyDownHandler;
			js.Lib.document.onkeyup = keyUpHandler;
		#end
}
	
	function keyDownHandler (e:KeyboardEvent) {
		keyCode = e.keyCode;
		char = "";
	}
	
	function keyUpHandler (e:KeyboardEvent) {
		//charCode = e.charCode;
		char = "";
		dispatch();
	}
	
	override public function destroy () :Void {
		#if (flash || nme)
			flash.Lib.current.stage.removeEventListener (KeyboardEvent.KEY_DOWN, keyDownHandler);
			flash.Lib.current.stage.removeEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		#elseif js
			js.Lib.document.onkeydown = null;
			js.Lib.document.onkeyup = null;
		#end
	}
}



#if (flash || nme)
	import flash.events.MouseEvent;
	import flash.display.DisplayObjectContainer;
#elseif js
	import js.Dom;
	private typedef MouseEvent = Event;
	private typedef DisplayObjectContainer = HtmlDom;
	typedef EVMouseRelationship = {target:DisplayObjectContainer, type:String, instance:EVMouse};
#end


class EVMouse extends RCSignal<EVMouse->Void> {
	
	public static var UP = "mouseup";
	public static var DOWN = "mousedown";
	public static var OVER = "mouseover";
	public static var OUT = "mouseout";
	public static var MOVE = "mousemove";
	public static var CLICK = "mouseclick";
	public static var DOUBLE_CLICK = "mousedoubleclick";
	public static var WHEEL = "mousewheel";
	
	public var target :DisplayObjectContainer;
	public var type :String;
	public var e :MouseEvent;
	
	#if js
		// JS events do not permit to attach more than one listeners to a target
		// What we do is keep a list of events and their targets
		// And when we add a listener to an already used target we return the old EVMouse
		var targets :List<EVMouseRelationship>;
	#end
	
	/**
	 *  type: the type of MouseEvent you want to listen to.
	 *  target: displayobject you want to listen for events
	 **/
	public function new (type:String, target:Dynamic, ?pos:haxe.PosInfos) {
		if (target == null) throw "Can't use a null target. " + pos;
		
		super();
		
		this.type = type;
		#if js
			targets = new List<EVMouseRelationship>();
			if (Std.is(target, JSView))
				this.target = cast(target,JSView).layer;
			else
				this.target = target;
		#else
			this.target = target;
		#end
		return addEventListener(pos);
	}
	function addEventListener (?pos:haxe.PosInfos) :EVMouse {
		#if (flash || nme)
			switch (type) {
				case UP: target.addEventListener (MouseEvent.MOUSE_UP, mouseHandler);
				case DOWN: target.addEventListener (MouseEvent.MOUSE_DOWN, mouseHandler);
				case OVER: target.addEventListener (MouseEvent.MOUSE_OVER, mouseHandler);
				case OUT: target.addEventListener (MouseEvent.MOUSE_OUT, mouseHandler);
				case MOVE: target.addEventListener (MouseEvent.MOUSE_MOVE, mouseHandler);
				case CLICK: target.addEventListener (MouseEvent.CLICK, mouseHandler);
				case DOUBLE_CLICK: target.addEventListener (MouseEvent.DOUBLE_CLICK, mouseHandler);
				case WHEEL: target.addEventListener (MouseEvent.MOUSE_WHEEL, mouseHandler);
				default: trace("The mouse event you're trying to add does not exist. "+pos);
			}
		#elseif js
			for (t in targets) {
				if (t.target == target && t.type == type) {
					// Target is already used for this mouse event
					trace("Target already in use by this event type. Called from "+pos);
					return t.instance;
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
				case DOUBLE_CLICK: target.ondblclick = mouseHandler;
				default: trace("The mouse event you're trying to add does not exist. "+pos);
			}
		#end
		return this;
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
				case DOUBLE_CLICK: target.removeEventListener (MouseEvent.DOUBLE_CLICK, mouseHandler);
				case WHEEL: target.removeEventListener (MouseEvent.MOUSE_WHEEL, mouseHandler);
			}
		#elseif js
			switch (type) {
				case UP: target.onmouseup = null;
				case DOWN: target.onmousedown = null;
				case OVER: target.onmouseover = null;
				case OUT: target.onmouseout = null;
				case MOVE: target.onmousemove = null;
				case CLICK: target.onclick = null;
				case DOUBLE_CLICK: target.ondblclick = null;
			}
		#end
	}
	function mouseHandler (e:MouseEvent) {
		this.e = e;
		dispatch ( [this] );
	}
	public function updateAfterEvent () :Void {
		#if flash
			e.updateAfterEvent();
		#end
	}
	override public function destroy () :Void {
		removeEventListener();
		super.destroy();
	}
}
