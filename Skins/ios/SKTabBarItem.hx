//
//  SkinButtonControls
//
//  Created by Cristi Baluta on 2009-10-07.
//  Copyright (c) 2009 ralcr.com. All rights reserved.
//
package ios;


class SKTabBarItem extends RCSkin {
	
	public function new (label:String, linkage:String, ?colors:Array<Null<Int>>) {
		super (colors);
		
		// Attach an object from library
		normal.background = new RCView(0,0);
		var sn :RCImage = RCAssets.getFileWithKey(linkage);
		sn.x = 50;
		sn.y = 4;
		normal.background.addChild ( sn );
		normal.background.addChild ( new RCTextView (0, 72, 155, null, label, RCFontManager.getFont("regular", {color:0xCCCCCC, align:"center"})) );

		normal.label = new RCView(0,0);
		
		highlighted.background = new RCView(0,0);
		highlighted.background.addChild ( new RCRectangle (0, 0, 155, 90, 0xFFFFFF, 0.2, 6) );
		var sh :RCImage = RCAssets.getFileWithKey(linkage+"Selected");
		sh.x = 50;
		sh.y = 4;
		highlighted.background.addChild ( sh );
		highlighted.background.addChild ( new RCTextView (0, 72, 155, null, label, RCFontManager.getFont("regular", {color:0xFFFFFF, align:"center"})) );
		
		
		// Draws a background as a hit area
		//background = new RCRectangle (0, 0, 155, 90, 0x333333, 0);
		hit = new RCRectangle (0, 0, 155, 90, 0x333333, 0);
	}
}
