
#if (flash || nme)
	import flash.display.DisplayObjectContainer;
#elseif js
	import js.Dom;
	private typedef DisplayObjectContainer = JSView;
#end

class RCImageStretchable extends RCView {
	
	var l :RCImage;
	var m :RCImage;
	var r :RCImage;
	
	public function new (x, y, imageLeft:String, imageMiddle:String, imageRight:String) {
		super (x, y);
		l = new RCImage (0,0,imageLeft);
		l.onComplete = onCompleteHandler;
		m = new RCImage (0,0,imageMiddle);
		m.onComplete = onCompleteHandler;
		r = new RCImage (0,0,imageRight);
		r.onComplete = onCompleteHandler;
		addChild ( l );
		addChild ( m );
		addChild ( r );
	}
	function onCompleteHandler () {trace("onComplete");
		if (l.isLoaded && m.isLoaded && r.isLoaded && this.size.width != null) {
			setWidth(this.size.width);
		}
	}
	override public function setWidth (w:Float) :Float {
		this.size.width = w;
		l.x = 0;
		r.x = w - r.width;
		m.x = l.width;trace(m.x);trace(l.width);trace(r.width);
		m.width = w - l.width - r.width;trace(m.width);
		//m.setWidth (Math.round(w-l.width-r.width));trace(m.width);
		return w;
	}
	override public function destroy () :Void {
		untyped l.destroy();
		untyped m.destroy();
		untyped r.destroy();
		super.destroy();
	}
}
