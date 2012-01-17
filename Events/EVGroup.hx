
class EVGroup extends RCSignal<RCIndexPath->Void> {
	
	inline public static var UPDATED :String = "group_updated";
	inline public static var CLICK :String = "group_click";
	inline public static var PUSH :String = "group_push";
	inline public static var REMOVE :String = "group_remove";
	
	public var label :String;
	public var index :Int;
	
	
	public function new (type:String, label:String, index:Int) {
		
		dispatch ( new RCIndexPath (0, index) );
	}
}
