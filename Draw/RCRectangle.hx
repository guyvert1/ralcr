//
//  DashedLine
//
//  Created by Baluta Cristian on 2008-10-11.
//  Copyright (c) 2008 ralcr.com. All rights reserved.
//


class RCRectangle extends RCDraw, implements RCDrawInterface {
	
	public var roundness :Null<Int>;// Rounded corners radius
	
	
	public function new (x, y, w, h, ?color:Dynamic, ?alpha:Float=1.0, ?r:Null<Int>) {
		super (x, y, w, h, color, alpha);
		
		this.roundness = r;
		this.redraw();
	}
	
	public function redraw() :Void {
		
		this.graphics.clear();
		this.configure();
		
		(roundness != null)
		? this.graphics.drawRoundRect (0, 0, size.width, size.height, roundness)
		: this.graphics.drawRect (0, 0, size.width, size.height);
		
		this.graphics.endFill();
	}
}

//Draw color filled rectangle at specified point with specified color, width and height
/*function fillRectangle(color,point,width,height)
{
    //Check arguments for null values
    if(!color || !point || !width || !height)
	    return false;

    width=Math.round(width*scale);
    height=Math.round(height*scale);
	
    var rectDiv=canvasDiv.appendChild(document.createElement("div"));
    phPoint=logicalToPhysicalPoint(point);

    var hexColor=color.getHex();
    
    //Draw a single div element
    rectDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + phPoint.x + "px;top:" + phPoint.y + "px;width:" + width +  "px;height:" + height + "px;background-color:" + hexColor + "\"></DIV>";
    return rectDiv;
}*/