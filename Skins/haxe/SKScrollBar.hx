// This is part of the skin collection for haXe components

package haxe;
import RCView;

class SKScrollBar extends RCSkin {
	
	public function new (w, h, ?colors:Array<Null<Int>>) {
		super ( colors );
		
		normal.background = new RCRectangle (0, 0, w, h, 0x666666, 1, 8);
		normal.otherView = new RCRectangle(0,-h/2, h*2, h*2, 0x333333);
		
		// Creates a transparent background for mouse hit area
		hit = new RCView(0,0);
	}
}
