//
//  HXScroll
//
//  Created by Baluta Cristian on 2011-03-07.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//
package haxe;
import RCView;

class SKSlider extends RCSkin {
	
	public function new (w, h, ?colors:Array<Null<Int>>) {
		super ( colors );
		
		normal.background = new RCRectangle (0, 0, w, h, 0x333333, 1, 8);
		normal.otherView = new RCEllipse(0,-h/2, h*2, h*2, 0xFFCC00);
		
		// Creates a transparent background for mouse hit area
		hit = new RCView(0,0);
	}
}
