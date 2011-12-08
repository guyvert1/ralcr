//
//  RCRect
//
//  Created by Baluta Cristian on 2011-11-12.
//  Copyright (c) 2011 ralcr.com. All rights reserved.
//
class RCRect {
	
	public var origin :RCPoint;
	public var size :RCSize;
	
	public function new (x, y, w, h) {
		this.origin = new RCPoint (x, y);
		this.size = new RCSize (w, h);
	}
}
