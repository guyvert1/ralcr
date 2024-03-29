//
//  RCPattern
//
//  Created by Cristi Baluta on 2011-03-15.
//  Copyright (c) 2011 ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//
import flash.display.DisplayObjectContainer;
import flash.display.BitmapData;
import flash.geom.Matrix;
import flash.geom.Rectangle;


class RCPatternFill extends RCDraw, implements RCDrawInterface {
	
	public var pattern :DisplayObjectContainer;// Rounded corners radius
	
	
	public function new (x, y, w, h, alpha, pattern:DisplayObjectContainer) {
		super (x, y, w, h, 0x000000, alpha);
		
		this.pattern = pattern;
		this.redraw();
	}
	
	public function redraw() :Void {
		
		var bitmapData = new BitmapData (Math.round (pattern.width), Math.round (pattern.height));
			bitmapData.draw ( pattern );
			
		layer.graphics.clear();
		layer.graphics.beginBitmapFill (bitmapData, new Matrix(), true, true);
		layer.graphics.drawRect (0, 0, size.width, size.height);
		layer.graphics.endFill();
	}
}
