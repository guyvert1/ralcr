//
//  RollingText
//
//  Created by Baluta Cristian on 2007-10-02.
//  Copyright (c) 2007-2011 http://imagin.ro. All rights reserved.
//
import RCView;

class RCTextRoll extends RCView {
	
	inline static var GAP :Int = 20; // space between the two text fields
	
	var maskSprite :RCRectangle;
	var txt1 :RCTextView;
	var txt2 :RCTextView;
	var w :Float; // maximum visible surface
	var timer :haxe.Timer;
	var timerLoop :haxe.Timer;
	
	public var continuous :Bool;
	
	
	public function new (x, y, w:Float, h:Null<Float>, str:String, properties:RCFont) {
		super(x, y);
		this.size.width = w;
		this.continuous = true;
		
		// add first textfield
		txt1 = new RCTextView (0, 0, null, h, str, properties);
		this.addChild ( txt1 );
		
		// add the second textfield
		if (txt1.width > w) {
			txt2 = new RCTextView (Math.round (txt1.width + GAP), 0, null, h, str, properties);
			this.addChild ( txt2 );
			//this.clipsToBounds = true;
		}
	}
	
	
	/**
	 *  Start and stop the rolling text
	 **/
	public function start () :Void {
		if (txt2 == null) return;
		if (continuous)
			startRolling();
		else
			timer = haxe.Timer.delay (startRolling, 3000);
	}
	public function stop () :Void {
		if (txt2 == null) return;
		stopRolling();
		reset();
	}
	
	function stopRolling(){
		if (timerLoop != null)
			timerLoop.stop();
			timerLoop = null;
	}
	function startRolling(){
		stopRolling();
		timerLoop = new haxe.Timer(20);
		timerLoop.run = loop;
	}
	
	
	
	
	function loop () :Void {
		
		txt1.x --;
		txt2.x --;
		
		if (!continuous && txt2.x <= 0) {
			stop();
			timer = haxe.Timer.delay (startRolling, 3000);
		}
		if (txt1.x < -txt1.width) txt1.x = Math.round (txt2.x + txt2.width + GAP);
		if (txt2.x < -txt2.width) txt2.x = Math.round (txt1.x + txt1.width + GAP);
	}
	
	function reset () :Void {
		if (timer != null) {
			timer.stop();
			timer = null;
		}
		txt1.x = 0;
		txt2.x = Math.round (txt1.width + GAP);
	}
	
	override public function destroy () :Void {
		stop();
		super.destroy();
	}
}
