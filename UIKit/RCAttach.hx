// Attach something from the assets library

#if flash
	import flash.display.MovieClip;
#elseif js
	import js.Dom;
	private typedef MovieClip = HtmlDom;
#end


class RCAttach extends RCView {
	
	public var target :MovieClip;
	public var id :String;
	
	
	public function new (x, y, id:String) {
		super(x,y);
		this.id = id;
		
		#if flash
			try {
				target = flash.Lib.attach ( id );
				this.addChild ( target );
			}
			catch(e:Dynamic){trace(e);}
		#elseif js
			target = RCLib.getFileWithKey( id );
		#end
	}
	
	public function clone () :RCAttach {
		return new RCAttach (this.x, this.y, this.id);
	}
}
