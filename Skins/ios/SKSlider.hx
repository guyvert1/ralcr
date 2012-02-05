//
//  HXScroll
//
//  Created by Baluta Cristian on 2011-03-07.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//
package ios;
import RCView;

class SKSlider extends RCSkin {
	
	public function new (w, h, ?colors:Array<Null<Int>>) {
		super ( colors );
		
		normal.background = new RCRectangle (0, 0, w, h, 0x666666, 1, 8);
		normal.background.addChild ( new RCRectangle (4, 2, w-8, 2, 0xffffff, 0.2) );
		
		normal.otherView = RCLib.getFileWithKey("slider_dot");
		
		// Creates a transparent background for mouse hit area
		hit = new RCView(0,0);
	}
}
