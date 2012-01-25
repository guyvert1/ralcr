// This is part of the skin collection for haXe components

package haxe;

class SKButton extends RCSkin {
	
	public function new (label_str:String, ?colors:Array<Null<Int>>) {
		super ( colors );
		
		// Creates a TextField
		var f = new RCFont();
			f.color = 0x000000;
			f.font = "Arial";
			f.bold = true;
			f.size = 11;
			f.align = "center";
			f.embedFonts = false;
		normal.label = new RCTextView (0, 4, 70, 20, label_str, f);
		
		//var fm = FontManager.getRCFont("system",{embedFonts:false});
		//normal.label = new RCTextView (0, 0, null, null, label_str, fm);
		
		normal.background = new RCRectangle (0, 0, 70, 20, 0x999999, 1, 8);
		normal.background.addChild ( new RCRectangle (1, 1, 70-2, 20-2, 0xfefefe, 1, 6) );
		
		highlighted.background = new RCRectangle (0, 0, 70, 20, 0x333333, 1, 8);
		highlighted.background.addChild ( new RCRectangle (1, 1, 70-2, 20-2, 0xFFE700, 1, 6) );
		
		// Creates a transparent background for mouse hit area
		hit = new RCRectangle (0, 0, 70, 20, 0xFFFFFF, 0);
	}
}
