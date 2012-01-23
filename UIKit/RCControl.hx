//
//  RCControl
//
//  Created by Baluta Cristian on 2008-03-23.
//  Copyright (c) 2008-2012 www.ralcr.com. All rights reserved.
//

#if flash
	import flash.events.MouseEvent;
	import flash.events.IEventDispatcher;
#elseif js
	import js.Dom;
	private typedef MouseEvent = Event;
	private typedef IEventDispatcher = Dynamic;
#end


enum RCControlState {
	NORMAL;
	HIGHLIGHTED;// used when UIControl isHighlighted is set
	DISABLED;
	SELECTED;
}


class RCControl extends RCView {
	
/*	public var touchDown :RCSignal<Void>;// on all touch downs
	public var touchDownRepeat :RCSignal<Void>;// on multiple touchdowns (tap count > 1)
	public var touchDragInside :RCSignal<Void>;
	public var touchDragOutside :RCSignal<Void>;
	public var touchDragEnter :RCSignal<Void>;
	public var touchDragExit :RCSignal<Void>;
	public var touchUpInside :RCSignal<Void>;
	public var touchUpOutside :RCSignal<Void>;
	public var touchCancel :RCSignal<Void>;*/
	public var click :RCSignal<RCControl->Void>;// RCButton events
	public var press :RCSignal<RCControl->Void>;
	public var release :RCSignal<RCControl->Void>;
	public var over :RCSignal<RCControl->Void>;
	public var out :RCSignal<RCControl->Void>;

	public var valueChanged :RCSignal<RCControl->Void>;// sliders, etc.

	public var editingDidBegin :RCSignal<RCControl->Void>;// RCTextInput
	public var editingChanged :RCSignal<RCControl->Void>;
	public var editingDidEnd :RCSignal<RCControl->Void>;
	public var editingDidEndOnExit :RCSignal<RCControl->Void>;// 'return key' ending editing
	
	
	public var enabled (getEnabled, setEnabled) :Bool;// default is YES. if NO, ignores mouse/touch events
	public var highlighted (getHighlighted, setHighlighted) :Bool;// default is NO.
	public var selected (getSelected, null) :Bool;// default is NO
	
	var enabled_ :Bool;
	var highlighted_ :Bool;
	var selected_ :Bool;
	var state_ :RCControlState;
	
	/**
	 * The classical way of listening to events, override this methods from outside of the object
	 */
	dynamic public function onClick () :Void {}
	dynamic public function onPress () :Void {}
	dynamic public function onRelease () :Void {}
	dynamic public function onOver () :Void {}
	dynamic public function onOut () :Void {}
	
	
	public function new (x, y) {
		super(x, y);
		
		enabled_ = true;
		highlighted_ = false;
		selected_ = false;
		
		#if flash
			this.useHandCursor = true;
			this.buttonMode = true;
			//this.mouseChildren = false;
		#end
		
		configureListeners ( this );
	}
	function configureListeners (dispatcher:IEventDispatcher) :Void {
		#if flash
			this.useHandCursor = true;
			this.buttonMode = true;
			dispatcher.addEventListener (MouseEvent.MOUSE_DOWN, mouseDownHandler);
			dispatcher.addEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
			dispatcher.addEventListener (MouseEvent.ROLL_OVER, rollOverHandler);
			dispatcher.addEventListener (MouseEvent.ROLL_OUT, rollOutHandler);
			dispatcher.addEventListener (MouseEvent.CLICK, clickHandler);
		#elseif js
			view.onmousedown = mouseDownHandler;
			view.onmouseup = mouseUpHandler;
			view.onmouseover = rollOverHandler;
			view.onmouseout = rollOutHandler;
			view.onclick = clickHandler;
		#end
	}
	function removeListeners (dispatcher:IEventDispatcher) :Void {
		#if flash
			this.useHandCursor = false;
			this.buttonMode = false;
			dispatcher.removeEventListener (MouseEvent.MOUSE_DOWN, mouseDownHandler);
			dispatcher.removeEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
			dispatcher.removeEventListener (MouseEvent.ROLL_OVER, rollOverHandler);
			dispatcher.removeEventListener (MouseEvent.ROLL_OUT, rollOutHandler);
			dispatcher.removeEventListener (MouseEvent.CLICK, clickHandler);
		#elseif js
			view.onmousedown = null;
			view.onmouseup = null;
			view.onmouseover = null;
			view.onmouseout = null;
			view.onclick = null;
		#end
	}
	
	
	/**
	 * Mouse Handlers
	 */
	function mouseDownHandler (e:MouseEvent) :Void {
		onPress();
	}
	function mouseUpHandler (e:MouseEvent) :Void {
		onRelease();
	}
	function rollOverHandler (e:MouseEvent) :Void {
		highlighted_ = true;
		onOver();
	}
	function rollOutHandler (e:MouseEvent) :Void {
		highlighted_ = false;
		onOut();
	}
	function clickHandler (e:MouseEvent) :Void {
		onClick();
	}
	
	
	
	/**
	 * Getter and setter
	 */
	function getSelected () :Bool {
		return selected_;
	}
	//
	function getEnabled () :Bool {
		return enabled_;
	}
	function setEnabled (c:Bool) :Bool {
		c ? configureListeners ( this ) : removeListeners ( this );
		return enabled_ = c;
	}
	//
	function getHighlighted () :Bool {
		return highlighted_;
	}
	function setHighlighted (h:Bool) :Bool {
		return highlighted_ = h;
	}
	
	
	/**
	 * lock = If the button is locked, you are no longer able to click it,
	 * onClick, onPress, onRelease will not by dispactched
	 * hand cursor is also disabled
	 * You can lock/unlock a button only if is lockable
	 * unlock = Events are dispatched again
	 */
	public function lock () :Void {
		setEnabled ( false );
	}
	public function unlock () :Void {
		setEnabled ( true );
	}
	
	
	/**
	 * toggle = Change the state of the button to Over
	 * untoggle = Change the state of the button to Normal
	 */
/*	public function toggle () :Void {
		if (toggable_ && _lockable) {
			// Set the state to Over than make the button toggled so you can't go to normal state when you rollout
			toggledState ();
			toggled_ = true;
		}
	}
	public function untoggle () :Void {
		if (toggable_ && _lockable) {
			// Change first the variable to untoggled, then change the state of the button to normal
			toggled_ = false;
			untoggledState ();
		}
	}
	function toggledState () :Void {}
	function untoggledState () :Void {}*/
	
	
	// Clean mess
	override public function destroy () :Void {
		removeListeners ( this );
		super.destroy();
	}
}
