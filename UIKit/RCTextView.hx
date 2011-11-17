//
//  RCText2
//
//  Created by Cristi Baluta on 2011-02-01.
//  Copyright (c) 2011 ralcr.com. All rights reserved.
//
import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFieldType;
import flash.text.TextFormat;
import flash.text.TextFieldAutoSize;
import flash.text.AntiAliasType;
import flash.events.MouseEvent;


class RCTextView extends RCView {
	
	public var target :TextField;
	public var properties :RCFont;
	public var text (getText, setText) :String;
	
	
	public function new (x:Float, y:Float, w:Null<Float>, h:Null<Float>, str:String, properties:RCFont) {
		
		super (Math.round(x), Math.round(y));
		size.width = w;
		size.height = h;
		
		init ( properties );
		setText ( str );
	}
	
	public function init (properties:RCFont) :Void {
		// Duplicate the properties RCFont and apply exceptions
		this.properties = properties;
		redraw();
		//target.addEventListener (MouseEvent.MOUSE_WHEEL, wheelHandler);
	}
	
	public function redraw () :Void {
		
		// Remove the previous textfield
		if (target != null)
		if (this.view.contains ( target ))
			this.view.removeChild ( target );
		
		// Create a new textfield
		target = new TextField();
		target.embedFonts = properties.embedFonts;
		target.type = properties.type;
		target.autoSize = properties.autoSize;
		target.antiAliasType = properties.antiAliasType;
		target.wordWrap = (size.width == null) ? false : true;
		target.multiline = (size.height == 0) ? false : true;
		target.sharpness = properties.sharpness;
		target.selectable = properties.selectable;
		target.border = false;
		
		if (size.width != null)							target.width = size.width;
		if (size.height != null && size.height != 0)	target.height = size.height;
		
		if (properties.format != null) target.defaultTextFormat = properties.format;
		//if (properties.format != null) target.setTextFormat ( properties.format );
		if (properties.style  != null) target.styleSheet = properties.style;
		
		view.addChild ( target );
	}
	
	
	public function getText() :String {
		return target.text;
	}
	
	public function setText (str:String) :String {
		if (properties.html) {
			target.htmlText = str;
		}
		else {
			target.text = str;
		}
		return str;
	}
	function wheelHandler (e:MouseEvent) :Void {
		//trace(target.maxScrollV +", "+target.scrollV);
		if (target.maxScrollV == 2)
			target.scrollV = 0;
	}
	
	override public function destroy () :Void {
		target.removeEventListener (MouseEvent.MOUSE_WHEEL, wheelHandler);
		target = null;
		super.destroy();
	}
}
