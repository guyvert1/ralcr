
#if flash
	import flash.display.DisplayObjectContainer;
#elseif js
	import js.Dom;
	private typedef DisplayObjectContainer = JSView;
#end

class RCImageStretchable {
	var l :DisplayObjectContainer;
	var m :DisplayObjectContainer;
	var r :DisplayObjectContainer;
	
	public function new () {
		
	}
	public function setWidth (w:Float) :Float {
		l.x = 0;
		r.x = w - r.width;
		m.x = l.width;
		m.width = w - l.width - r.width;
	}
}
