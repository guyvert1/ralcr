//
//  RCSize
//
//  Created by Cristi Baluta on 2011-03-10.
//  Copyright (c) 2011 ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

class RCSize {
	
	public var width :Null<Float>;
	public var height :Null<Float>;
	
	
	public function new (?w:Null<Float>, ?h:Null<Float>) {
		this.width = w;
		this.height = h;
	}
	public function copy () :RCSize {
		return new RCSize (width, height);
	}
	public function toString () :String {
		return "[RCSize width:"+width+", height:"+height+"]";
	}
}
