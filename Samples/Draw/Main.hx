//
//  Main
//
//  Created by Cristi Baluta on 2010-05-20.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//

class Main {
	
		
	public static function main () {
		haxe.Firebug.redirectTraces();
		RCWindow.init();
		new Main();
	}
	
	
	public function new () {
		RCWindow.addChild ( new RCRectangle (10, 10, 100, 100) );
		RCWindow.addChild ( new RCRectangle (114, 10, 100, 100, new RCColor(null, 0x222222), 0.41, 27) );
		RCWindow.addChild ( new RCRectangle (224, 10, 100, 100, new RCGradient([0xf33333, 0x000000], [1., 1.])) );
		RCWindow.addChild ( new RCEllipse (334, 10, 100, 100, new RCGradient([0xf33333, 0x000000], [1., 1.], false)) );
		RCWindow.addChild ( new RCEllipse (450, 10, 100, 100, 0xff3300) );
		RCWindow.addChild ( new RCBurst (200, 200, 100, 100, new RCGradient([0xf33333, 0xff0000], [0.3, .3]), 1,   10, 50, 100, 100) );
		//RCWindow.addChild ( new RCArc (300, 80, 100, 100, 0x333333, 1,   100, 0) );
		RCWindow.addChild ( new RCDashedLine (10, 200, 300, 1, 0x333333, 1,  10, 2) );
		RCWindow.addChild ( new RCDashedLine (10, 200, 3, 300, 0x333333, 1,  10, null) );
		RCWindow.addChild ( new RCLine(10, 200, 300, 500, 0x333333, .6, 1) );
	}
}
