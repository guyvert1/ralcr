//
//  Ellipse
//
//  Created by Baluta Cristian on 2008-10-11.
//  Copyright (c) 2008 ralcr.com. All rights reserved.
//
class RCEllipse extends RCDraw, implements RCDrawInterface {
		
	public function new (x, y, w, h, color:Dynamic, ?alpha:Float=1.0) {
		super (x, y, w, h, color, alpha);
		
		this.redraw();
	}
	
	public function redraw() :Void {
		
		this.graphics.clear();
		this.configure();
		
		// Draw an elipse
		this.graphics.drawEllipse (0, 0, size.width, size.height);
		this.graphics.endFill();
	}
}
