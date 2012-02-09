// This is part of the skin collection for haXe components

package haxe;
import RCView;

class SKScrollBar extends RCSkin {
	
	public function new (w, h, ?colors:Array<Null<Int>>) {
		super ( colors );
		var horiz = w > h ? true : false;
		
		normal.background = new RCRectangle (0, 0, w, h, 0x999999, 1, 8);
		normal.otherView = new RCRectangle (0,0, horiz?(w/3):w, horiz?h:(h/3), 0x333333, 1, 8);
		
		// Creates a transparent background for mouse hit area
		hit = new RCRectangle (0, 0, w, h, 0x666666, 0);
	}
}
