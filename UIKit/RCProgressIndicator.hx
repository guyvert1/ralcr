//
//  RCProgressIndicator
//
//  Created by Baluta Cristian on 2009-01-18.
//  Copyright (c) 2009-2012 http://ralcr.com. All rights reserved.
//

#if flash
	import flash.display.DisplayObjectContainer;
#elseif js
	typedef DisplayObjectContainer = JSView;
#end

class RCProgressIndicator extends RCView {
	
	public var skin :RCSkin;
/*	var background :DisplayObjectContainer;
	var symbol :DisplayObjectContainer;
	var symbolMask :DisplayObjectContainer;*/
	
	public function new (x, y, skin:RCSkin) {
		super (x, y);
		
		// display skin (background, symbol, hit)
		background = skin.background;
		this.addChild ( background );
		symbol = skin.up;
		this.addChild ( symbol );
		symbolMask = skin.hit;
		this.addChild ( symbolMask );
		symbol.mask = symbolMask;
		// end skin
	}
	
	public function updateProgressBarWithPercent (percent:Int) {
		symbol.width = Zeta.lineEquationInt (0, symbolMask.width, percent, 0, 100);
	}
	
	// CLEAN MESS
	public function destroy() :Void {}
}
