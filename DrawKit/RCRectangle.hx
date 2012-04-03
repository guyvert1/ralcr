//
//  RCRectangle.hx
//	DrawKit
//
//  Created by Baluta Cristian on 2008-10-11.
//  Copyright (c) 2008-2012 ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

class RCRectangle extends RCDraw, implements RCDrawInterface {
	
	public var roundness :Null<Int>;// Rounded corners radius
	
	
	public function new (x, y, w, h, ?color:Dynamic, ?alpha:Float=1.0, ?r:Null<Int>) {
		super (x, y, w, h, color, alpha);
		
		this.roundness = r;
		this.redraw();
	}
	
	public function redraw() :Void {
		
#if (flash || nme)
		layer.graphics.clear();
		configure();
		
		(roundness != null)
		? layer.graphics.drawRoundRect (0, 0, size.width*RCDevice.currentDevice().dpiScale, size.height*RCDevice.currentDevice().dpiScale, roundness*RCDevice.currentDevice().dpiScale)
		: layer.graphics.drawRect (0, 0, size.width*RCDevice.currentDevice().dpiScale, size.height*RCDevice.currentDevice().dpiScale);
		
		layer.graphics.endFill();
#elseif js
		var fillColorStyle = cast (color, RCColor).fillColorStyle;
		var strokeColorStyle = cast (color, RCColor).strokeColorStyle;
		var html = "<div style=\"position:absolute; overflow:hidden;";
			html += "left:0px; top:0px;";
			html += "margin:0px 0px 0px 0px;";
			html += "width:" + size.width*RCDevice.currentDevice().dpiScale + "px;";
			html += "height:" + size.height*RCDevice.currentDevice().dpiScale + "px;";
			html += "background-color:" + fillColorStyle + ";";
			if (strokeColorStyle != null)
			html += "border-style:solid; border-width:" + borderThickness + "px; border-color:" + strokeColorStyle + ";";
			if (roundness != null)
			html += "-moz-border-radius:" + roundness*RCDevice.currentDevice().dpiScale/2 + "px; border-radius:" + roundness*RCDevice.currentDevice().dpiScale/2 + "px;";
			html += "\"></div>";
		layer.innerHTML = html;
#end
	}
	override public function setWidth (w:Float) :Float {
		size.width = w;
		redraw();
		return w;
	}
	override public function setHeight (h:Float) :Float {
		size.height = h;
		redraw();
		return h;
	}
}
