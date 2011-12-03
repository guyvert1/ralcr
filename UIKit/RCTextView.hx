//
//  RCText2
//
//  Created by Cristi Baluta on 2011-02-01.
//  Copyright (c) 2011 ralcr.com. All rights reserved.
//
#if flash
import flash.display.Sprite;
import flash.text.TextField;
import flash.text.TextFieldType;
import flash.text.TextFormat;
import flash.text.TextFieldAutoSize;
import flash.text.AntiAliasType;
import flash.events.MouseEvent;
#elseif js
import js.Dom;
import RCView;
typedef MouseEvent = Event;
typedef TextField = RCView;
#end


class RCTextView extends RCView {
	
	public var target :TextField;
	public var properties :RCFont;
	public var text (getText, setText) :String;
	
	
	public function new (x:Float, y:Float, w:Null<Float>, h:Null<Float>, str:String, properties:RCFont) {
		
		super (Math.round(x), Math.round(y));
		size.width = w;
		size.height = h;
#if js
		setWidth ( w ); if (w==null) view.style.width="100%";
		setHeight ( h );
#end
		init ( properties );
		setText ( str );
	}
	
	public function init (properties:RCFont) :Void {
		// Duplicate the properties RCFont and apply exceptions
		this.properties = properties;
		redraw();
		//target.addEventListener (MouseEvent.MOUSE_WHEEL, wheelHandler);
	}
#if flash
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
#elseif js
	public function redraw () :Void {
		
		view.innerHTML = "";
		view.style.color = "#ffffff";//color.getHex();
		view.style.fontFamily = properties.font;
		view.style.fontWeight = properties.bold;
    	view.style.fontSize = properties.size;
    	view.style.fontStyle = properties.style;
    	//view.style.fontVariant = properties.variant;

		if (size.width != null) setWidth ( size.width );
		view.style.textAlign = properties.align;
	}
#end
	
	public function getText() :String {
		return #if flash target.text #elseif js view.innerHTML #end;
	}
	
	public function setText (str:String) :String {
#if flash
		if (properties.html)
			target.htmlText = str;
		else
			target.text = str;
#elseif js
		view.innerHTML = str;
#end
		return str;
	}
	function wheelHandler (e:MouseEvent) :Void {
#if flash
		//trace(target.maxScrollV +", "+target.scrollV);
		if (target.maxScrollV == 2)
			target.scrollV = 0;
#end
	}
	
	override public function destroy () :Void {
#if flash
		target.removeEventListener (MouseEvent.MOUSE_WHEEL, wheelHandler);
#end
		target = null;
		super.destroy();
	}
}
