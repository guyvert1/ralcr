//
//  SKSegment
//
//  Created by Cristi Baluta on 2010-09-07.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//

package ios;

class SKSegment extends RCSkin {
	
	public function new (label:String, w:Int, h:Float, pos:String, colors:Array<Null<Int>>) {
		super ( colors );
		
		var segmentLeft :String;
		var segmentMiddle :String;
		var segmentRight :String;
		
		switch (pos) {
			case "left":	segmentLeft = "L";  segmentMiddle = "M"; segmentRight = "MR"; // First
			case "right":	segmentLeft = "ML"; segmentMiddle = "M"; segmentRight = "R"; // Last
			default:		segmentLeft = "ML"; segmentMiddle = "M"; segmentRight = "MR"; // Middle
		}
		
		var segLeft = new RCAttach (0, 0, "Segment"+segmentLeft);
		var segMiddle = new RCAttach (0, 0, "Segment"+segmentMiddle);
		var segRight = new RCAttach (0, 0, "Segment"+segmentRight);
		var segLeftSelected = new RCAttach (0, 0, "Segment"+segmentLeft+"Selected");
		var segMiddleSelected = new RCAttach (0, 0, "Segment"+segmentMiddle+"Selected");
		var segRightSelected = new RCAttach (0, 0, "Segment"+segmentRight+"Selected");
		
		segLeft.x = 0;
		segMiddle.x = segLeft.width;
		segMiddle.width = w - segLeft.width - segRight.width;
		segRight.x = w - segRight.width;
		
		segLeftSelected.x = 0;
		segMiddleSelected.x = segLeftSelected.width;
		segMiddleSelected.width = w - segLeftSelected.width - segRightSelected.width;
		segRightSelected.x = w - segRightSelected.width;
		
		
		//RCFontManager.getFont ("bold", {size:25, color:0x777777, align:"center"}))
		var font = RCFont.boldSystemFontOfSize(25);
			font.align = "center";
		
		normal.background = new RCView (0, 0, w, h);
		normal.background = new RCRectangle (0, 0, w, h, 0x000000);
		normal.background.addChild ( segLeft );
		normal.background.addChild ( segMiddle );
		normal.background.addChild ( segRight );
		normal.label = new RCTextView (0, 0, w, null, label, font);
		normal.label.y = Math.round ((h - 25)/2);
		
		highlighted.background = new RCView (0, 0, w, h);
		normal.background = new RCRectangle (0, 0, w, h, 0x666666, 1, 15);
		highlighted.background.addChild ( segLeftSelected );
		highlighted.background.addChild ( segMiddleSelected );
		highlighted.background.addChild ( segRightSelected );
		highlighted.label = new RCTextView (0, 0, w, null, label, font);
		highlighted.label.y = Math.round ((h - 25)/2);
		
		hit = new RCRectangle (0, 0, w, h, 0x000000, 0);
	}
}
