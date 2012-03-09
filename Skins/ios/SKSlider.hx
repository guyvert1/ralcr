//
//  SKSlider.hx
//	Skins iOS
//
//  Created by Baluta Cristian on 2011-03-07.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//

// This class assumes that you already have the assets loaded with RCAssets

package ios;


class SKSlider extends RCSkin {
	
	public function new () {
		super ( null );
		
		// Create elements without size and position because it's managed by the RCSlider component
		var sl = "Resources/ios/RCSlider/L.png";
		var sm = "Resources/ios/RCSlider/M.png";
		var sr = "Resources/ios/RCSlider/R.png";
		var ss = "Resources/ios/RCSlider/Scrubber.png";
		normal.background = new RCImageStretchable (0, 0, sl, sm, sr);
		normal.otherView = new RCImage (0, 0, ss);
		
		var sls = "Resources/ios/RCSlider/LSelected.png";
		var sms = "Resources/ios/RCSlider/MSelected.png";
		var srs = "Resources/ios/RCSlider/RSelected.png";
		var sss = "Resources/ios/RCSlider/ScrubberSelected.png";
		highlighted.background = new RCImageStretchable (0, 0, sls, sms, srs);
		normal.otherView = new RCImage (0, 0, sss);
		
		// Creates a transparent background for mouse hit area
		hit = new RCView (0, 0);
	}
}
