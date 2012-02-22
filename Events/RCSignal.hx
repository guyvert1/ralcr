// Simple implementation of the Signal events system

class RCSignal<T> {
	
	var listeners :List<T>;
	var exposableListener :T;
	
	
	public function new () {
		removeAll();
	}
	
	/**
	*  Add a listener to this signal
	*/
	public function add (listener:T) {
		listeners.add ( listener );
	}
	public function addOnce (listener:T, ?pos:haxe.PosInfos) {
		if (exists(listener)) trace("This listener is already added, it will not be called only once as you expect. "+pos);
		exposableListener = listener;
	}
	// Useful for native components, this listener will be called first
	public function addFirst (listener:T, ?pos:haxe.PosInfos) {
		listeners.push ( listener );
	}
	public function remove (listener:T) :Void {
		for (l in listeners) {
			if (Reflect.compareMethods(l, listener)) {
				listeners.remove ( listener );
				break;
			}
		}
		if (Reflect.compareMethods (exposableListener, listener)) {
			exposableListener = null;
		}
	}
	public function removeAll():Void {
		listeners = new List<T>();
		exposableListener = null;
	}
	
	
	public function dispatch (?p1:Dynamic, ?p2:Dynamic, ?p3:Dynamic, ?p4:Dynamic, ?pos:haxe.PosInfos) :Void {
		var args = new Array<Dynamic>();
		for (p in [p1, p2, p3, p4])
			if (p != null)
				args.push ( p );
			else
				break;

		for (listener in listeners)
			callMethod (listener, args, pos);
		if (exposableListener != null) {
			callMethod (exposableListener, args, pos);
			exposableListener = null;
		}
	}
	function callMethod (listener:T, ?args:Array<Dynamic>, ?pos:haxe.PosInfos) {
		try {
			Reflect.callMethod (null, listener, args);
		}
		catch (e:Dynamic) {
			trace ("[RCSignal error when calling: " + listener + " from: " + Std.string ( pos ) + "]");
		}
	}
	
	public function exists (listener:T) :Bool {
		for (l in listeners) {
			if (l == listener)
				return true;
		}
		return false;
	}
	
	public function destroy () :Void {
		listeners = null;
		exposableListener = null;
	}
}
