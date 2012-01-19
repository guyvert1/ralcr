
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
	public function addOnce (listener:T) {
		exposableListener = listener;
	}
	public function remove (listener:T) :Void {
		for (l in listeners) {
			if (Reflect.compareMethods(l, listener)) {
				listeners.remove ( listener );
				return;
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
	
	
	public function dispatch (?args:Array<Dynamic>, ?pos:haxe.PosInfos) :Void {
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
			trace ("[RCSignal error: " + Std.string ( pos ) + "]");
		}
	}
	
	public function exists (listener:T) :Bool {
		
		//if (existing == null || !existing.has(listener)) return true;
		
		//if (Reflect.compareMethods(listener, T))
				// If the listener was previously added, definitely don't add it again.
				// But throw an exception if their once value differs.
				//throw new IllegalOperationException('You cannot addOnce() then add() the same listener without removing the relationship first.');
			
			// Listener was already added.
			return false;
		
		// This listener has not been added before.
		//return true;
	}
	
	public function destroy () :Void {
		listeners = null;
		exposableListener = null;
	}
}
