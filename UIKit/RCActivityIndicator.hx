//
//  RCIndeterminateProgressIndicator
//
//  Created by Baluta Cristian on 2008-12-01.
//  Copyright (c) 2009 http://ralcr.com. All rights reserved.
//

class RCActivityIndicator extends RCProgressIndicator {
	
	public var stepX :Int;// The distance after the symbol position is reseted to 0
	public var speedX :Int;
	
	
	public function new (x, y, stepX:Int, skin:RCSkin) {
		super (x, y, skin);
		
		this.stepX = stepX;
		this.speedX = 1;
		this.addEventListener (flash.events.Event.ENTER_FRAME, loop);
	}
	
	function loop (_) :Void {
		skin.normal.otherView.x -= speedX;
		if (Math.abs(skin.normal.otherView.x) >= Math.abs(stepX))
			skin.normal.otherView.x = 0;
	}
	
	// CLEAN MESS
	override public function destroy() :Void {
		this.removeEventListener (flash.events.Event.ENTER_FRAME, loop);
		super.destroy();
	}
}
