//
//  RCButton
//
//  Created by Baluta Cristian on 2008-03-23.
//  Copyright (c) 2008-2012 www.ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.display.DisplayObjectContainer;
#elseif js
	import js.Dom;
	import RCControl;
	private typedef DisplayObjectContainer = JSView;
#end

class RCButton extends RCControl {
	
	public var skin :RCSkin;
	
	var toggable_ :Bool;
	//public var toggable (getToggable, setToggable) :Bool;
	//public var lockable (getLockable, setLockable) :Bool;
	
	public function setTitle (title:String, state:RCControlState) {
		
	}
	public function setTitleColor (color:Int, state:RCControlState) {
		
	}
	//public function setBackgroundImage:(UIImage *)image forState:(UIControlState)state;

	public var currentTitle :String;// normal/highlighted/selected/disabled. can return nil
	public var currentTitleColor :Int;// normal/highlighted/selected/disabled. always returns non-nil. default is white(1,1)
	public var currentImage :DisplayObjectContainer;             // normal/highlighted/selected/disabled. can return nil
	public var currentBackground :DisplayObjectContainer;   // normal/highlighted/selected/disabled. can return nil
	
	
	public function new (x, y, skin:RCSkin) {
		
		this.skin = skin;
		this.skin.hit.alpha = 0;
		fixSkin();
		
		super (x, y);
	}
	
	override public function setState (state:RCControlState) {
		//trace("setState "+state);
		if (state_ == state) return;
		
		// Remove current state from display list
		if (currentBackground != null)
			currentBackground.removeFromSuperView();
		
		switch (state) {
			case NORMAL :
				currentBackground = skin.normal.background;
				currentImage = skin.normal.label;
				
			case HIGHLIGHTED :
				currentBackground = skin.highlighted.background;
				currentImage = skin.highlighted.label;
				
			case DISABLED :
				currentBackground = skin.disabled.background;
				currentImage = skin.disabled.label;
				
			case SELECTED :
				currentBackground = skin.selected.background;
				currentImage = skin.selected.label;
		}
		addChild ( currentBackground );
		addChild ( currentImage );
		addChild ( skin.hit );
		
		super.setState ( state );
	}
	
	// Make sure that all the properties of the skin are filled
	function fixSkin () {
		
		//if (skin.normal.background == null) trace("The skin of this button must contain a background");
		
		// The properties of the HIGHLIGHTED state inherits from the NORMAL state
		if (skin.highlighted.background == null)
			skin.highlighted.background = skin.normal.background;
		if (skin.highlighted.label == null)
			skin.highlighted.label = skin.normal.label;
		if (skin.highlighted.image == null)
			skin.highlighted.image = skin.normal.image;
		if (skin.highlighted.otherView == null)
			skin.highlighted.otherView = skin.normal.otherView;
		
		// The properties of the SELECTED state inherits from the HIGHLIGHTED state
		if (skin.selected.background == null)
			skin.selected.background = skin.highlighted.background;
		if (skin.selected.label == null)
			skin.selected.label = skin.highlighted.label;
		if (skin.selected.image == null)
			skin.selected.image = skin.highlighted.image;
		if (skin.selected.otherView == null)
			skin.selected.otherView = skin.highlighted.otherView;
		
		// The properties of the DISABLED state inherits from the NORMAL state
		if (skin.disabled.background == null)
			skin.disabled.background = skin.normal.background;
		if (skin.disabled.label == null)
			skin.disabled.label = skin.normal.label;
		if (skin.disabled.image == null)
			skin.disabled.image = skin.normal.image;
		if (skin.disabled.otherView == null)
			skin.disabled.otherView = skin.normal.otherView;
		
		// Change the color of the background
/*		skin.normal.background = (skin.normal.colors.background != null) ? true : false;
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
		*/
	}
	/**
	 * toggle = Change the state of the button permanently to SELECTED
	 * untoggle = Change the state of the button to NORMAL
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
	}*/
	
	
	
	/**
	 *	Function to safely set color for objects in the button
	 */
	public function setObjectColor (obj:DisplayObjectContainer, color:Null<Int>) {
		if (obj == null || color == null) return;
		//Fugu.color (obj, color);
	}
	public function setObjectBrightness (obj:DisplayObjectContainer, brightness:Int) {
/*		if (obj == null || !autoBrightness) return;
		Fugu.brightness (obj, brightness);*/
	}
}
