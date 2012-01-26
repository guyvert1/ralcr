//
//  Slider
//
//  Created by Baluta Cristian on 2008-06-25.
//  Copyright (c) 2008-2012 milc.ro. All rights reserved.
//

#if flash
	import flash.display.DisplayObjectContainer;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
#elseif js
	import js.Dom;
	import RCControl;
	private typedef DisplayObjectContainer = JSView;
	private typedef MouseEvent = Event;
	private typedef Rectangle = RCRect;
#end

private enum Direction {
	horizontal;
	vertical;
}

class RCSlider extends RCControl {
	
	var value_ :Float;
	var minValue_ :Float;
	var maxValue_ :Float;
	var moving_ :Bool;
	var direction_ :Direction;
	
	public var skin :RCSkin;
	public var minValue (default, setMinValue) :Float;
	public var maxValue (default, setMaxValue) :Float;
	public var value (getValue, setValue) :Float;// default 0.0. this value will be pinned to min/max
	public var minimumValueImage (default, setMinimumValueImage) :RCView;// default is nil
	public var maximumValueImage (default, setMaximumValueImage) :RCView;
	public var background :DisplayObjectContainer;
	public var scrubber :DisplayObjectContainer;

	public var valueChanged :RCSignal<RCSlider->Void>;// sliders, etc.
	
	
	public function new (x, y, skin:RCSkin) {
		super(x,y);
		
		this.moving_ = false;
		this.minValue_ = 0.0;
		this.maxValue_ = 100.0;
		this.value_ = 0.0;
		this.skin = skin;
		
		this.size.width = skin.normal.background.width;
		this.size.height = skin.normal.background.height;
		this.scrubber = skin.normal.otherView;
		
		addChild ( skin.normal.background );
		addChild ( scrubber );
		
		// Decide the direction of movement
		direction_ = (size.width > size.height) ? horizontal : vertical;
		
		// When the symbol is pressed start to move the slider
		#if flash
			scrubber.addEventListener (MouseEvent.MOUSE_DOWN, mouseDownHandler);
			scrubber.addEventListener (MouseEvent.MOUSE_OVER, rollOverHandler);
			scrubber.addEventListener (MouseEvent.MOUSE_OUT, rollOutHandler);
		#elseif js
			cast(scrubber).onmousedown = mouseDownHandler;
			cast(scrubber).onmouseover = rollOverHandler;
			cast(scrubber).onmouseout = rollOutHandler;
		#end
	}
	override function configureDispatchers () {
		super.configureDispatchers();
		valueChanged = new RCSignal<RCSlider->Void>();
	}
	override function setEnabled (c:Bool) :Bool {
		return enabled_ = false;// The slider does not listen for the events on the entire object, but for the scrubber
	}
	
	
	/**
	 * Step 1
	 * Drag the scrubber and listen for mousemove events
	 */
	override function mouseDownHandler (e:MouseEvent) {
		trace("mouseDownHandler");
		var bounds_x:Int=0, bounds_y:Int=0, bounds_w:Int=0, bounds_h:Int=0;
		
		switch (direction_) {
			case horizontal:	bounds_w = Math.round (size.width - scrubber.width);
								bounds_y = Math.round (scrubber.y);
			case vertical:		bounds_h = Math.round (size.height - scrubber.height);
								bounds_x = Math.round (scrubber.x);
		}
		
		cast(scrubber).startDrag (false, new Rectangle (bounds_x, bounds_y, bounds_w, bounds_h));
		
		#if flash
			RCWindow.stage.addEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
			RCWindow.stage.addEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
		#elseif js
			RCWindow.target.onmouseup = mouseUpHandler;
			RCWindow.target.onmousemove = mouseMoveHandler;
		#end
	}
	override function mouseUpHandler (e:MouseEvent) {
		// When the mouse is released stop dragging the symbol
		trace("mouseUpHandler");
		
		cast(scrubber).stopDrag();
		
		#if flash
			RCWindow.stage.removeEventListener (MouseEvent.MOUSE_UP, mouseUpHandler);
			RCWindow.stage.removeEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
		#elseif js
			RCWindow.target.onmouseup = null;
			RCWindow.target.onmousemove = null;
		#end
	}
	
	
	/**
	 * Set new value when the slider is moving, and dispatch an event
	 */
	function mouseMoveHandler (e:MouseEvent) {
		var y0=0.0, y1=0.0, y2=0.0;
		
		switch (direction_) {
			case horizontal:
				y0 = scrubber.x;
				y2 = size.width - scrubber.width;
			case vertical:
				y0 = scrubber.y;
				y2 = size.height - scrubber.height;
		}
		
		// set the new percent
		value_ = Zeta.lineEquation (minValue_, maxValue_,  y0, y1, y2);
		
		valueChanged.dispatch ( [this] );
		
		#if flash
			e.updateAfterEvent();
		#end
	}
	
	
	/**
	 * Set the symbol correct position when the content changed his position
	 */
	function getValue () :Float {
		return value_;
	}
	public function setValue (v:Float) :Float {
		var x1=0.0, x2=0.0;
		
		if (!moving_) {
			switch (direction_) {
				case horizontal:
					x2 = size.width - scrubber.width;
					scrubber.x = Zeta.lineEquationInt (x1, x2,  v, minValue_, maxValue_);
				case vertical:
					x2 = size.height - scrubber.height;
					scrubber.y = Zeta.lineEquationInt (x1, x2,  v, minValue_, maxValue_);
			}
		}
		
		return value_ = v;
	}
	public function setMinValue (v:Float) :Float {trace("set min "+v);
		minValue_ = v;
		setValue ( value_ );
		return v;
	}
	public function setMaxValue (v:Float) :Float {trace("set max "+v);
		maxValue_ = v;
		setValue ( value_ );
		return v;
	}
	public function setMinimumValueImage (v:RCView) :RCView {
		return v;
	}
	public function setMaximumValueImage (v:RCView) :RCView {
		return v;
	}
	
	
	/**
	 *	Scale the background and the symbol
	 *	
	 */
/*	function setW (w:Int) :Int {
		if (size.width == null) return w;
		size.width = w;
		//TO DO
		
		return w;
	}
	function setH (h:Int) :Int {
		if (size.height == null) return h;
		size.height = h;
		//TO DO
		
		return h;
	}*/
	
	
	/**
	 *  Mouse Over and out effects
	 */
	function overHandler (e:MouseEvent) {
		//Fugu.color ( symbol, symbolColorOver );
	}
	function outHandler (e:MouseEvent) {
		//Fugu.color ( symbol, symbolColorNormal );
	}
	
	
	
	// clean mess
	override public function destroy () :Void {
		mouseUpHandler ( null );
		#if flash
			scrubber.removeEventListener (MouseEvent.MOUSE_DOWN, mouseDownHandler);
		#elseif js
			cast(scrubber).onmousedown = null;
		#end
		super.destroy();
	}
}
