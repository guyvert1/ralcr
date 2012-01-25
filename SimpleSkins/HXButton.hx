class HXButton extends RCSkin {
	
	public function new (label_str:String, ?colors:Array<Null<Int>>) {
		super ( colors );
		
		// Creates a TextField
		var f = new RCFont();
			f.color = 0x000000;
			f.font = "Arial";
			f.bold = true;
			f.size = 12;
		normal.label = new RCTextView (0, 0, 70, 20, label_str, f);
		
		//normal.label = new RCTextView (0, 0, null, null, label_str, FontManager.getRCFont("system",{embedFonts:false}));
		
		normal.background = new RCRectangle (0, 0, 70, 20, 0xFFCC00);
		highlighted.background = new RCRectangle (0, 0, 70, 20, 0xFFE700);
		
		// Creates a transparent background for mouse hit area
		hit = new RCRectangle (0, 0, 70, 20, 0xFFFFFF, 0);
	}
}
