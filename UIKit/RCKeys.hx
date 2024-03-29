//
//  Keys
//
//  Created by Baluta Cristian on 2007-08-17.
//  Copyright (c) 2007-2012 http://ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

#if (flash || nme)
	import flash.events.KeyboardEvent;
	import flash.ui.Keyboard;
#elseif js
	import js.Dom;
	private typedef KeyboardEvent = Event;
#end


class RCKeys {
	
	/**
	 * Dispatch events by replacing this delegate functions
	 */
	dynamic public function onLeft () :Void {}
	dynamic public function onRight () :Void {}
	dynamic public function onUp () :Void {}
	dynamic public function onDown () :Void {}
	dynamic public function onEnter () :Void {}
	dynamic public function onSpace () :Void {}
	dynamic public function onEsc () :Void {}
	dynamic public function onKeyUp () :Void {}
	dynamic public function onKeyDown () :Void {}
	
	public var char :String;
	public var keyCode :Int;
	
	
	public function new () {
		resume();
	}
	
	function keyDownHandler (e:KeyboardEvent) {
		
		keyCode = e.keyCode;trace(keyCode);
		char = "";
		onKeyDown();
		
		switch (e.keyCode) {
			case Keyboard.LEFT :	onLeft();
			case Keyboard.RIGHT :	onRight();
			case Keyboard.UP :		onUp();
			case Keyboard.DOWN :	onDown();
			case Keyboard.ENTER :	onEnter();
			case Keyboard.SPACE :	onSpace();
			case Keyboard.ESCAPE :	onEsc();
		}
#if (flash || nme)
		e.updateAfterEvent();
#end

	}
	
	function keyUpHandler (e:KeyboardEvent) {
		//charCode = e.charCode;
		char = "";
		onKeyUp();
	}
	
	
	/**
	 * Add or remove the keyboard listener
	 */
	public function resume () :Void {
		#if (flash || nme)
			flash.Lib.current.stage.addEventListener (KeyboardEvent.KEY_DOWN, keyDownHandler);
			flash.Lib.current.stage.addEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		#elseif js
			js.Lib.document.onkeydown = keyDownHandler;
			js.Lib.document.onkeyup = keyUpHandler;
		#end
	}
	
	public function hold () :Void {
		#if (flash || nme)
			flash.Lib.current.stage.removeEventListener (KeyboardEvent.KEY_DOWN, keyDownHandler);
			flash.Lib.current.stage.removeEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		#elseif js
			js.Lib.document.onkeydown = null;
			js.Lib.document.onkeyup = null;
		#end
	}
	
	
	/**
	 * Clean mess
	 */
	public function destroy () :Void {
		hold();
	}
}



#if js

class Keyboard {
	inline static public var LEFT = 37;
	inline static public var RIGHT = 39;
	inline static public var UP = 38;
	inline static public var DOWN = 40;
	inline static public var ENTER = 13;
	inline static public var SPACE = 32;
	inline static public var ESCAPE = 27;
}

#end
