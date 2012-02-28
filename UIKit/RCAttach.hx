// Attach something from the assets library

#if (flash || nme)
	import flash.display.MovieClip;
#elseif js
	import js.Dom;
	private typedef MovieClip = HtmlDom;
#end


class RCAttach extends RCView {
	
	public var target :MovieClip;
	public var id :String;
	
	
	public function new (x, y, id:String) {
		super (x, y);
		this.id = id;
		
		try {
		#if (flash && !nme)
			target = flash.Lib.attach ( id );
			layer.addChild ( target );
		#elseif (nme || js)
			target = RCAssets.getFileWithKey( id );
		#end
		}catch(e:Dynamic){trace(e);}
	}
	
	public function copy () :RCAttach {
		return new RCAttach (this.x, this.y, this.id);
	}
}
