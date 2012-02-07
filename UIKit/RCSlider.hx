//
//  RCSlider
//
//  Created by Baluta Cristian on 2008-06-25.
//  Copyright (c) 2008-2012 milc.ro. All rights reserved.
//

#if (flash || nme)
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
	HORIZONTAL;
	VERTICAL;
}

class RCSlider extends RCControl {
	
	var value_ :Float;
	var minValue_ :Float;
	var maxValue_ :Float;
	var moving_ :Bool;
	var direction_ :Direction;
	var mouseUpOverStage_ :EVMouse;
	var mouseMoveOverStage_ :EVMouse;
	
	public var skin :RCSkin;
	public var minValue (default, setMinValue) :Float;
	public var maxValue (default, setMaxValue) :Float;
	public var value (getValue, setValue) :Float;// default 0.0. this value will be pinned to min/max
	public var minimumValueImage (default, setMinimumValueImage) :RCImage;// default is nil
	public var maximumValueImage (default, setMaximumValueImage) :RCImage;
	public var background :DisplayObjectContainer;
	public var scrubber :DisplayObjectContainer;

	public var valueChanged :RCSignal<RCSlider->Void>;// sliders, etc.
	
	
	public function new (x, y, w, h, skin:RCSkin) {
		super(x,y);
		this.size.width = w;
		this.size.height = h;
		this.moving_ = false;
		this.minValue_ = 0.0;
		this.maxValue_ = 100.0;
		this.value_ = 0.0;
		this.skin = skin;
		
		// Resize skin elements based on the width and height
		try { untyped skin.normal.background.setWidth(w); }catch(e:Dynamic){}
		skin.normal.otherView.y = Math.round ((h - skin.normal.otherView.height)/2);
		
		
		//this.size.width = skin.normal.background.width;
		//this.size.height = skin.normal.background.height;
		this.scrubber = skin.normal.otherView;
		
		addChild ( skin.normal.background );
		//addChild ( skin.highlighted.background );
		addChild ( scrubber );
		
		// Decide the direction of movement
		direction_ = (size.width > size.height) ? HORIZONTAL : VERTICAL;
		
		// When the symbol is pressed start to move the slider
		press.add ( mouseDownHandler );
		over.add ( rollOverHandler );
		out.add ( rollOutHandler );
	}
	override function configureDispatchers () {
		super.configureDispatchers();
		valueChanged = new RCSignal<RCSlider->Void>();
		mouseUpOverStage_ = new EVMouse (EVMouse.UP, RCWindow.stage);
		mouseMoveOverStage_ = new EVMouse (EVMouse.MOVE, RCWindow.stage);
		//RCWindow.target/js
/*		var m2 = new EVMouse (EVMouse.MOVE, RCWindow.stage);
		trace(mouseMoveOverStage_ == m2);
		trace(Reflect.compareMethods(m2, mouseMoveOverStage_));*/
	}
	override function setEnabled (c:Bool) :Bool {
		return enabled_ = false;// The slider does not listen for the events on the entire object, but for the scrubber
	}
	
	
	/**
	 *	Functions to move the slider
	 */
	override function mouseDownHandler (e:EVMouse) :Void {
		trace("mouseDownHandler");
		moving_ = true;
		mouseUpOverStage_.add ( mouseUpHandler );
		mouseMoveOverStage_.add ( mouseMoveHandler );
		mouseMoveHandler ( e );
	}
	override function mouseUpHandler (e:EVMouse) :Void {
		moving_ = false;
		mouseUpOverStage_.remove ( mouseUpHandler );
		mouseMoveOverStage_.remove ( mouseMoveHandler );
	}
	
	
	/**
	 * Set new value when the slider is moving, and dispatch an event
	 */
	function mouseMoveHandler (e:EVMouse) {
		trace("mouseMoveHandler");
		var y0=0.0, y1=0.0, y2=0.0;
		//#if js trace(e.clientX); #end
		switch (direction_) {
			case HORIZONTAL:
				//y0 = scrubber.x;
				y2 = size.width - scrubber.width;
				y0 = Zeta.limitsInt (this.mouseX -scrubber.width/2, 0, y2);
			case VERTICAL:
				//y0 = scrubber.y;
				y2 = size.height - scrubber.height;
				y0 = Zeta.limitsInt (this.mouseY-scrubber.height/2, 0, y2);
		}
		
		// set the new value
		setValue ( Zeta.lineEquation (minValue_, maxValue_,  y0, y1, y2) );
		
		#if (flash || nme)
			//e.updateAfterEvent();
		#end
	}
	
	
	
	function getValue () :Float {
		return value_;
	}
	/**
	 * Set the scrubber position based on the new value
	 */
	public function setValue (v:Float) :Float {
		var x1=0.0, x2=0.0;
		value_ = v;
		switch (direction_) {
			case HORIZONTAL:
				x2 = size.width - scrubber.width;
				scrubber.x = Zeta.lineEquationInt (x1, x2,  v, minValue_, maxValue_);
				if (skin.highlighted.background != null)
					skin.highlighted.background.width = scrubber.x;
			case VERTICAL:
				x2 = size.height - scrubber.height;
				scrubber.y = Zeta.lineEquationInt (x1, x2,  v, minValue_, maxValue_);
		}
		
		valueChanged.dispatch ( [this] );
		return value_;
	}
	public function setMinValue (v:Float) :Float {
		minValue_ = v;
		setValue ( value_ );// Refresh the slider elements position
		return v;
	}
	public function setMaxValue (v:Float) :Float {
		maxValue_ = v;
		setValue ( value_ );
		return v;
	}
	public function setMinimumValueImage (v:RCImage) :RCImage {
		return v;
	}
	public function setMaximumValueImage (v:RCImage) :RCImage {
		return v;
	}
	
	
	/**
	 *	Scale the background and the symbol
	 *	
	 */
/*	function setWidth (w:Int) :Int {
		if (size.width == null) return w;
		size.width = w;
		//TO DO
		
		return w;
	}
	function setHeight (h:Int) :Int {
		if (size.height == null) return h;
		size.height = h;
		//TO DO
		
		return h;
	}*/
	
	
	
	// Clean mess
	override public function destroy () :Void {
		mouseUpOverStage_.destroy();
		mouseMoveOverStage_.destroy();
		valueChanged.destroy();
		skin.destroy();
		super.destroy();
	}
}
