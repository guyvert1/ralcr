//
//  RCButton
//
//  Created by Baluta Cristian on 2008-03-23.
//  Copyright (c) 2008-2012 www.ralcr.com. All rights reserved.
//

#if flash
	import flash.display.Sprite;
	import flash.display.DisplayObjectContainer;
	import flash.events.MouseEvent;
#elseif js
	import js.Dom;
	import RCControl;
#end

class RCButton extends RCControl {
	
	public var background :DisplayObjectContainer;
	public var up :DisplayObjectContainer;
	public var over :DisplayObjectContainer;
	public var down :DisplayObjectContainer;
	public var hit :DisplayObjectContainer;
	
	public var autoBrightness :Bool;
	
	var backgroundColorUp :Null<Int>;
	var backgroundColorOver :Null<Int>;
	var symbolColorUp :Null<Int>;
	var symbolColorOver :Null<Int>;
	
	public var toggable (getToggable, setToggable) :Bool;
	public var lockable (getLockable, setLockable) :Bool;
	
	public function setTitle (title:String, state:RCControlState) {
		
	}
	public function setTitleColor:(UIColor *)color forState:(UIControlState)state;        // default if nil. use opaque white
	public function setTitleShadowColor:(UIColor *)color forState:(UIControlState)state;  // default is nil. use 50% black
	public function setImage:(UIImage *)image forState:(UIControlState)state;             // default is nil. should be same size if different for different states
	public function setBackgroundImage:(UIImage *)image forState:(UIControlState)state;   // default is nil

	public function titleForState:(UIControlState)state;          // these getters only take a single state value
	public function titleColorForState:(UIControlState)state;
	public function titleShadowColorForState:(UIControlState)state;
	public function imageForState:(UIControlState)state;
	public function backgroundImageForState:(UIControlState)state;

	// these are the values that will be used for the current state. you can also use these for overrides. a heuristic will be used to determine what image to choose based on the explict states set. For example, the 'normal' state value will be used for all states that don't have their own image defined.

	public var currentTitle :String;// normal/highlighted/selected/disabled. can return nil
	public var currentTitleColor :Int;// normal/highlighted/selected/disabled. always returns non-nil. default is white(1,1)
	public var currentTitleShadowColor;  // normal/highlighted/selected/disabled. default is white(0,0.5).
	public var currentImage;             // normal/highlighted/selected/disabled. can return nil
	public var currentBackgroundImage;   // normal/highlighted/selected/disabled. can return nil

	// return title and image views. will always create them if necessary. always returns nil for system buttons
	public var titleLabel __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_3_0);
	public var imageView  __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_3_0);
	
	
	
	public function new (x, y, skin:RCSkin) {
		super (x, y);
		
		backgroundColorUp = skin.backgroundColorUp;
		backgroundColorOver = skin.backgroundColorOver;
		symbolColorUp = skin.symbolColorUp;
		symbolColorOver = skin.symbolColorOver;
		
		autoBrightness = true;
		
		// display skin (background, symbol, hit)
		background = skin.background;
		up = skin.up;
		over = skin.over == null ? skin.up : skin.over;
		down = skin.down == null ? skin.up : skin.down;
		hit = skin.hit;
		hit.alpha = 0;
		
		this.addChild ( background );
		this.addChild ( up );
		this.addChild ( hit );
		// end skin
		
		// go to out state
		rollOutHandler ( null );
	}
	
	
	
	/**
	 * Handlers
	 */
	override function rollOverHandler (e:MouseEvent) :Void {
		toggledState();
		onOver();
	}
	override function rollOutHandler (e:MouseEvent) :Void {
		untoggledState();
		onOut();
	}
	
	override function toggledState () {
		if (_toggled) return;
		
		// Change the color of the background
		//background.visible = _background_color_over != null ? true : false;
		if (backgroundColorOver == null)
			setObjectBrightness (background, 30);
		else
			setObjectColor (background, backgroundColorOver);
		
		// Change the color of the active symbol
		if (symbolColorOver == null) {
			if (up == over) setObjectBrightness (over, 30);
		}
		else
			setObjectColor (over, symbolColorOver);
		
		// Remove and add the coresponding objects for this state of the button
		Fugu.safeRemove ([up, down]);
		Fugu.safeAdd (this, [over, hit]);
	}
	
	override function untoggledState () {
		if (_toggled) return;
		
		// Change the color of the background
		//background.visible = _background_color_over != null ? true : false;
		if (backgroundColorUp == null)
			setObjectBrightness (background, 0);
		else
			setObjectColor (background, backgroundColorUp);
		
		// Change the color of the active symbol
		if (symbolColorOver == null)
			setObjectBrightness (up, 0);
		else
			setObjectColor (up, symbolColorUp);
		
		// Remove and add the coresponding objects for this state of the button
		over.removeFromSuperView();
		down.removeFromSuperView();
		Fugu.safeAdd (this, [up, hit]);
	}
	
	
	/**
	 *	Function to safely set color for objects in the button
	 */
	public function setObjectColor (obj:DisplayObjectContainer, color:Null<Int>) {
		if (obj == null || color == null) return;
		Fugu.color (obj, color);
	}
	public function setObjectBrightness (obj:DisplayObjectContainer, brightness:Int) {
		if (obj == null || !autoBrightness) return;
		Fugu.brightness (obj, brightness);
	}
}
