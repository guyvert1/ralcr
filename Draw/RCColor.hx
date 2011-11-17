//
//  RCGradientColor
//
//  Created by Cristi Baluta on 2010-10-08.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//
#if js
typedef UInt = Int;
#end

class RCColor {
	
	inline public static var RED = 0xff0000;
	inline public static var GREEN = 0x00ff00;
	inline public static var BLUE = 0x0000ff;
	
	
	public var alpha :Float;
	public var borderColor :Null<UInt>;
	public var fillColor :Null<UInt>;
	
	
	public function new (fillColor:Null<UInt>, ?borderColor:Null<UInt>, ?a:Null<Float>) {
		
		this.borderColor = borderColor;
		this.fillColor = fillColor;
		this.alpha = a == null ? 1.0 : a;
	}
	
	
	public static function initWithColor (fillColor:Null<UInt>, ?borderColor:Null<UInt>) {
		return new RCColor (fillColor, borderColor);
	}
}
