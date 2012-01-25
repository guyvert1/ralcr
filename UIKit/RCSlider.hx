//
//  Slider
//
//  Created by Baluta Cristian on 2008-06-25.
//  Copyright (c) 2008-2012 milc.ro. All rights reserved.
//

#if flash
	import flash.display.Sprite;
	import flash.display.DisplayObjectContainer;
	import flash.events.Event;
	import flash.events.MouseEvent;
#elseif js
	import js.Dom;
#end

class RCSlider extends RCControl {
	
	var value_ :Float;
	var moving_ :Bool;
	
	public var minValue :Float;
	public var maxValue :Float;
	public var value (getValue, setValue) :Float;// default 0.0. this value will be pinned to min/max
	public var minimumValueImage :RCView;// default is nil
	public var maximumValueImage :RCView;
	
	
	public function new (x, y, skin:RCSkin) {
		super(x,y);
		
		this.moving_ = false;
		this.minValue = 0.0;
		this.maxValue = 100.0;
		this.value_ = 0.0;
		this.skin = skin;
		
		// When the symbol is pressed start to move the slider
		#if flash
			symbol.addEventListener (MouseEvent.MOUSE_DOWN, mouseDownHandler);
			symbol.addEventListener (MouseEvent.MOUSE_OVER, overHandler);
			symbol.addEventListener (MouseEvent.MOUSE_OUT, outHandler);
		#elseif js
			
		#end
	}
	override function configureDispatchers () {
		super.configureDispatchers();
		valueChanged = new RCSignal<RCControl->Void>();
	}
	
	
	/**
	 * Step 1
	 * Make the scroller object dragable
	 */
	function mouseDownHandler (e:MouseEvent) {
		
		var bound_w:Int=0, bound_h:Int=0;
		
		switch (direction) {
			case horizontal:	bound_w = Math.round (_w - symbol.width);
			case vertical:		bound_h = Math.round (_h - symbol.height);
		}
		
		symbol.startDrag (false, new Rectangle (0, 0, bound_w, bound_h));
		
		RCWindow.target.addEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
		RCWindow.target.addEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
	}
	function mouseUpHandler (e:MouseEvent) {
		// When the mouse is released stop dragging the symbol
		symbol.stopDrag ();
		
		RCWindow.target.removeEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
		RCWindow.target.removeEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
	}
	
	
	/**
	 * Set new value when the slider is moving, and dispatch an event
	 */
	function mouseMoveHandler (e:MouseEvent) {
		var y0=0.0, y1=0.0, y2=0.0;
		
		switch (direction) {
			case horizontal:
				y0 = symbol.x;
				y2 = _w - symbol.width;
			case vertical:
				y0 = symbol.y;
				y2 = _h - symbol.height;
		}
		
		// set the new percent
		_value = Zeta.lineEquation (minValue, maxValue,  y0, y1, y2);
		
		this.dispatchEvent ( new SliderEvent (SliderEvent.ON_MOVE, _value));
		
		e.updateAfterEvent();
	}
	
	
	/**
	 * Set the symbol correct position when the content changed his position
	 */
	function getValue () :Float {
		return _value;
	}
	function setValue (percent:Float) :Float {
		var x1=0.0, x2=0.0;
		
		if (!moving) {
			switch (direction) {
				case horizontal:
					x2 = _w - symbol.width;
					symbol.x = Zeta.lineEquationInt (x1, x2,  percent, minValue, maxValue);
				case vertical:
					x2 = _h - symbol.height;
					symbol.y = Zeta.lineEquationInt (x1, x2,  percent, minValue, maxValue);
			}
		}
		
		return value;
	}
	
	
	/**
	 *	Scale the background and the symbol
	 *	
	 */
	function setW (w:Int) :Int {
		if (_w == null) return w;
		_w = w;
		//TO DO
		
		return w;
	}
	function setH (h:Int) :Int {
		if (_h == null) return h;
		_h = h;
		//TO DO
		
		return h;
	}
	
	
	/**
	 *  Mouse Over and out effects
	 */
	function overHandler (e:MouseEvent) {
		Fugu.color ( symbol, symbolColorOver );
	}
	function outHandler (e:MouseEvent) {
		Fugu.color ( symbol, symbolColorNormal );
	}
	
	
	
	// clean mess
	public function destroy () :Void {
		mouseUpHandler ( null );
		symbol.removeEventListener (MouseEvent.MOUSE_DOWN, mouseDownHandler);
	}
}
