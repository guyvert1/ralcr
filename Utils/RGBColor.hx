//
//  RGBColor
//
//  Created by Cristi Baluta on 2011-03-04.
//  Copyright (c) 2011 ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//
class RGBColor {
	
	public var r:Float;
	public var g:Float;
	public var b:Float;
	public var a:Float;
	
	
	public function new (r:Float, g:Float, b:Float, ?a:Float=1.0) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
}
