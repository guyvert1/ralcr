//
//  RCTextInput
//
//  Created by Baluta Cristian on 2008-03-22.
//  Copyright (c) 2008 www.ralcr.com. All rights reserved.
//

#if (flash || (flash && nme))
	import flash.text.AntiAliasType;
#end
#if (flash || nme)
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	import flash.text.TextFieldAutoSize;
	import flash.events.TextEvent;
	import flash.events.MouseEvent;
	import flash.events.KeyboardEvent;
	import flash.events.FocusEvent;
#elseif js
	import js.Dom;
	import RCView;
	private typedef MouseEvent = Event;
	private typedef TextField = RCView;
#end


class RCTextInput extends RCTextView {
	
	//public var textType (null, setType) :TextFieldType;
	public var password (null, setPassword) :Bool;
	public var selectable (null, setSelectable) :Bool;
	
	dynamic public function onChange () :Void {}
	dynamic public function onEnter () :Void {}
	dynamic public function onFocusIn () :Void {}
	dynamic public function onFocusOut () :Void {}
	
	
	override function init () :Void {
		target = new TextField();
		target.embedFonts = rcfont.embedFonts;
		#if flash
			target.type = TextFieldType.INPUT;
			target.autoSize = TextFieldAutoSize.NONE;
			target.antiAliasType = rcfont.antiAliasType;
			target.sharpness = rcfont.sharpness;
		#end
		target.wordWrap = (size.width == null) ? false : true;
		target.multiline = (size.height == 0) ? false : true;
		target.selectable = true;
		
		//target.addEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		//target.addEventListener (MouseEvent.CLICK, clickHandler);
		//target.addEventListener (FocusEvent.FOCUS_IN, focusInHandler);
		//target.addEventListener (FocusEvent.FOCUS_OUT, focusOutHandler);
		
		if (size.width != null)							target.width = size.width;
		if (size.height != null && size.height != 0)	target.height = size.height;
		
		target.defaultTextFormat = rcfont.format;
		
		layer.addChild ( target );
	}
/*	public function init2 (properties:RCFont) :Void {
		// Duplicate the properties RCFont and apply exceptions
		this.properties = properties;
		redraw();
		
		// overrwrite this properties
		target.type = TextFieldType.INPUT;
		target.autoSize = TextFieldAutoSize.NONE;
		target.selectable = true;
		target.border = true;
		// add events
		//target.addEventListener (TextEvent.TEXT_INPUT, textInputHandler);
		target.addEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		target.addEventListener (MouseEvent.CLICK, clickHandler);
		target.addEventListener (FocusEvent.FOCUS_IN, focusInHandler);
		target.addEventListener (FocusEvent.FOCUS_OUT, focusOutHandler);
	}*/
/*	public function redraw () :Void {
		
		// Remove the previous textfield
		if (target != null)
		if (this.layer.contains ( target ))
			this.layer.removeChild ( target );
		
		// Create a new textfield
		target = new TextField();
		target.embedFonts = properties.embedFonts;
		target.type = properties.type;
		target.autoSize = properties.autoSize;
		target.antiAliasType = properties.antiAliasType;
		target.wordWrap = (w == null) ? false : true;
		target.multiline = (h == 0) ? false : true;
		target.sharpness = properties.sharpness;
		target.selectable = properties.selectable;
		target.border = false;
		
		if (w != null)				target.width = w;
		if (h != null && h != 0)	target.height = h;
		
		if (properties.format != null) target.defaultTextFormat = properties.format;
		//if (properties.format != null) target.setTextFormat ( properties.format );
		if (properties.style  != null) target.styleSheet = properties.style;
		
		this.layer.addChild ( target );
	}*/
	
		#if flash
	function clickHandler (e:MouseEvent) :Void {
		//target.setSelection (0, target.length);
	}
	
	function keyUpHandler (event:KeyboardEvent) :Void {
		trace(event);
		switch (event.charCode) {
			case 13: onEnter();
			default: onChange();
		}
	}
	
	function focusInHandler (e:FocusEvent) :Void {trace("in");
		onFocusIn();
	}
	function focusOutHandler (e:FocusEvent) :Void {trace("out");
		onFocusOut();
	}
	
	
	function setType (t:TextFieldType) :TextFieldType {
		return target.type = t;
		
	}
	#end
	function setPassword (t:Bool) :Bool {
		return target.displayAsPassword = t;
	}
	
	public function setSelectable (t:Bool) :Bool {
/*		if (t)
			target.addEventListener (MouseEvent.CLICK, clickHandler);
		else
			target.removeEventListener (MouseEvent.CLICK, clickHandler);*/
		return t;
	}
	
	
	// clean mess
	override public function destroy () :Void {
		//target.removeEventListener (TextEvent.TEXT_INPUT, textInputHandler);
/*		target.removeEventListener (KeyboardEvent.KEY_UP, keyUpHandler);
		target.removeEventListener (MouseEvent.CLICK, clickHandler);
		target.removeEventListener (FocusEvent.FOCUS_IN, focusInHandler);
		target.removeEventListener (FocusEvent.FOCUS_OUT, focusOutHandler);*/
		super.destroy();
	}
}
