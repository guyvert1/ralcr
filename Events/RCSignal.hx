
class RCSignal<T> {
	
	var listeners :List<T>;
	var exposableListeners :List<T>;
	
	
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
		exposableListeners.add ( listener );
	}
	public function remove (listener:T) :Void {
		for (l in listeners) {
			if (Reflect.compareMethods(l, listener)) {
				listeners.remove ( listener );
				return;
			}
		}
		for (l in exposableListeners) {
			if (Reflect.compareMethods(l, listener)) {
				exposableListeners.remove ( listener );
				return;
			}
		}
	}
	public function removeAll():Void
	{
		listeners = new List<T>();
		exposableListeners = new List<T>();
	}
	
	
	public function dispatch (?args:Array<Dynamic>, ?pos:haxe.PosInfos) :Void
	{
		for (listener in listeners)
			if (Reflect.compareMethods(listener, T))
				try {
					Reflect.callMethod (null, listener, args);
				}
				catch (e:Dynamic) {
					trace ("[RCSignal error: " + Std.string ( pos ) + "]");
				}
	}
	
	public function exists (listener:T) :Bool {
		
		if (existing == null || !existing.has(listener)) return true;
		
		
				// If the listener was previously added, definitely don't add it again.
				// But throw an exception if their once value differs.
				throw new IllegalOperationException('You cannot addOnce() then add() the same listener without removing the relationship first.');
			}
			
			// Listener was already added.
			return false;
		}
		
		// This listener has not been added before.
		return true;
	}
}
