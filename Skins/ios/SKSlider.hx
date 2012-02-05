//
//  HXScroll
//
//  Created by Baluta Cristian on 2011-03-07.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//
package ios;

import RCView;

class SKSlider extends RCSkin {
	
	public function new () {
		super ( null );
		
		normal.background = new RCImageStretchable (0, 0, "Resources/ios.skin/slider_l.png", "Resources/ios.skin/slider_m.png", "Resources/ios.skin/slider_r.png");
		normal.otherView = RCLib.getFileWithKey("slider_dot");
		
		// Creates a transparent background for mouse hit area
		hit = new RCView(0,0);
	}
}
