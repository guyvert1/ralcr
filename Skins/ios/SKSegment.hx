//
//  SkinButtonBuy
//
//  Created by Cristi Baluta on 2010-09-07.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//
package ios;

class SKSegment extends RCSkin {
	
	public function new (label:String, w:Int, h:Float, posLeft:String, posMiddle:String, posRight:String, colors:Array<Null<Int>>) {
		super ( colors );
		
		var segLeft = new RCAttach (0, 0, "Segment"+posLeft);
		var segMiddle = new RCAttach (0, 0, "Segment"+posMiddle);
		var segRight = new RCAttach (0, 0, "Segment"+posRight);
		var segLeftSelected = new RCAttach (0, 0, "Segment"+posLeft+"Selected");
		var segMiddleSelected = new RCAttach (0, 0, "Segment"+posMiddle+"Selected");
		var segRightSelected = new RCAttach (0, 0, "Segment"+posRight+"Selected");
		
		segLeft.x = 0;
		segMiddle.x = segLeft.width;
		segMiddle.width = w - segLeft.width - segRight.width;
		segRight.x = w - segRight.width;
		
		segLeftSelected.x = 0;
		segMiddleSelected.x = segLeftSelected.width;
		segMiddleSelected.width = w - segLeftSelected.width - segRightSelected.width;
		segRightSelected.x = w - segRightSelected.width;
		
		
		normal.background = new RCView(0,0);
		normal.background.addChild ( segLeft );
		normal.background.addChild ( segMiddle );
		normal.background.addChild ( segRight );
		normal.background.addChild ( new RCTextView (0, 28, w, 30, label, RCFontManager.getFont ("bold", {size:25, color:0x777777, align:"center"})) );
		
		highlighted.background = new RCView(0,0);
		highlighted.background.addChild ( segLeftSelected );
		highlighted.background.addChild ( segMiddleSelected );
		highlighted.background.addChild ( segRightSelected );
		highlighted.background.addChild ( new RCTextView (0, 28, w, 30, label, RCFontManager.getFont ("bold", {size:25, color:0xFFFFFF, align:"center"})) );
		
		//background = new RCRectangle (0, 0, w, h, 0x000000, 0);
		hit = new RCRectangle (0, 0, w, h, 0x000000, 0);
	}
}
