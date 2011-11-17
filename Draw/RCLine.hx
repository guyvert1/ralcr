//
//  Draws a line from x1,y1, to x2,y2
//
//  Created by Baluta Cristian on 2008-10-11.
//  Copyright (c) 2008 ralcr.com. All rights reserved.
//
class RCLine extends RCDraw, implements RCDrawInterface {
	
	public var lineWeight :Int;
	
	/**
	 *	Draws a line of lineWeight px from x1, y1 to x2, y2
	 */
	public function new (x1:Float, y1:Float, x2:Float, y2:Float, color:Int, ?alpha:Float=1.0, ?lineWeight:Int=1) {
		super (x1, y1, x2-x1, y2-y1, color, alpha);
		
		this.lineWeight = lineWeight;
		this.redraw();
	}
	
	public function redraw () :Void {
		
		this.graphics.clear();
		this.graphics.lineStyle (lineWeight, color.fillColor);
		this.graphics.moveTo (0, 0);
		this.graphics.lineTo (size.width, size.height);
	}
}
