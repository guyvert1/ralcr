//
//  RCControl
//
//  Created by Baluta Cristian on 2008-03-23.
//  Copyright (c) 2008-2012 www.ralcr.com. All rights reserved.
//

enum RCControlState {
	NORMAL;
	HIGHLIGHTED;// used when UIControl isHighlighted is set
	DISABLED;
	SELECTED;
}


class RCControl extends RCView {

#if nme
	// TODO
	public var touchDown :RCSignal<RCControl->Void>;// on all touch downs
	public var touchDownRepeat :RCSignal<RCControl->Void>;// on multiple touchdowns (tap count > 1)
	public var touchDragInside :RCSignal<RCControl->Void>;
	public var touchDragOutside :RCSignal<RCControl->Void>;
	public var touchDragEnter :RCSignal<RCControl->Void>;
	public var touchDragExit :RCSignal<RCControl->Void>;
	public var touchUpInside :RCSignal<RCControl->Void>;
	public var touchUpOutside :RCSignal<RCControl->Void>;
	public var touchCancel :RCSignal<RCControl->Void>;
#end
	public var click :EVMouse;// RCSignal that dispatches EVMouse
	public var press :EVMouse;
	public var release :EVMouse;
	public var over :EVMouse;
	public var out :EVMouse;

	public var editingDidBegin :RCSignal<RCControl->Void>;// RCTextInput
	public var editingChanged :RCSignal<RCControl->Void>;
	public var editingDidEnd :RCSignal<RCControl->Void>;
	public var editingDidEndOnExit :RCSignal<RCControl->Void>;// 'return key' ending editing
	
	
	public var enabled (getEnabled, setEnabled) :Bool;// default is YES. if NO, ignores mouse/touch events
	public var highlighted (getHighlighted, null) :Bool;// default is NO.
	public var selected (getSelected, null) :Bool;// default is NO
	
	var enabled_ :Bool;
	var state_ :RCControlState;
	
	
	/**
	 * The classical way of listening to events, override this methods from outside of the object
	 *  You can redirect to only one function this events
	 */
	dynamic public function onClick () :Void {}
	dynamic public function onPress () :Void {}
	dynamic public function onRelease () :Void {}
	dynamic public function onOver () :Void {}
	dynamic public function onOut () :Void {}
	
	
	public function new (x, y) {
		super(x, y);
		
		//this.mouseChildren = false;
		
		configureDispatchers();
		setEnabled ( true );// This will configure the right mouse listeners
		setState ( NORMAL );
	}
	function configureDispatchers () {
		click = new EVMouse (EVMouse.CLICK, this);
		press = new EVMouse (EVMouse.DOWN, this);
		release = new EVMouse (EVMouse.UP, this);
		over = new EVMouse (EVMouse.OVER, this);
		out = new EVMouse (EVMouse.OUT, this);
	}
	function configureListeners () :Void {
		//
		click.addFirst ( clickHandler );
		press.addFirst ( mouseDownHandler );
		release.addFirst ( mouseUpHandler );
		over.addFirst ( rollOverHandler );
		out.addFirst ( rollOutHandler );
		#if flash
			this.useHandCursor = true;
			this.buttonMode = true;
		#end
	}
	function removeListeners () :Void {
		//
		click.remove ( clickHandler );
		press.remove ( mouseDownHandler );
		release.remove ( mouseUpHandler );
		over.remove ( rollOverHandler );
		out.remove ( rollOutHandler );
		#if flash
			this.useHandCursor = false;
			this.buttonMode = false;
		#end
	}
	
	
	/**
	* Mouse Handlers
	*/
	function mouseDownHandler (e:EVMouse) :Void {
		setState ( SELECTED );
		onPress();
	}
	function mouseUpHandler (e:EVMouse) :Void {
		setState ( HIGHLIGHTED );
		onRelease();
	}
	function rollOverHandler (e:EVMouse) :Void {
		setState ( HIGHLIGHTED );
		onOver();
	}
	function rollOutHandler (e:EVMouse) :Void {
		setState ( NORMAL );
		onOut();
	}
	function clickHandler (e:EVMouse) :Void {
		setState ( SELECTED );
		onClick();
	}
	public function setState (state:RCControlState) {
		state_ = state;//trace("current state is "+state_);
	}
	
	
	/**
	 * Getter and setter
	 */
	function getSelected () :Bool {
		return state_ == SELECTED;
	}
	//
	function getEnabled () :Bool {
		return enabled_;
	}
	function setEnabled (c:Bool) :Bool {
		enabled_ = c;
		enabled_ ? configureListeners() : removeListeners();
		return enabled_;
	}
	//
	function getHighlighted () :Bool {
		return state_ == HIGHLIGHTED;
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
	
	
	// Clean mess
	override public function destroy () :Void {
		//
		click.destroy();
		press.destroy();
		release.destroy();
		over.destroy();
		out.destroy();
		//
		super.destroy();
	}
}
