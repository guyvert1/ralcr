//
//  RCTextView
//
//  Created by Cristi Baluta on 2011-02-01.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//

#if (flash || nme)
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
	private typedef MouseEvent = Event;
	private typedef TextField = RCView;
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
		setWidth ( w );
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
	
#if (flash || nme)
	
	public function redraw () :Void {
		
		// Remove the previous textfield
		if (target != null)
		if (this.view.contains ( target ))
			this.view.removeChild ( target );
		
		// Create a new textfield
		target = new TextField();
		target.embedFonts = properties.embedFonts;
		target.type = properties.type;//trace(properties.align);
		target.autoSize = switch (properties.align) {
			case "center": flash.text.TextFieldAutoSize.CENTER;
			case "right": flash.text.TextFieldAutoSize.RIGHT;
			default : flash.text.TextFieldAutoSize.LEFT;
		};
		//target.autoSize = properties.autoSize ? flash.text.TextFieldAutoSize.LEFT : null;
		//trace(target.autoSize);
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
		
		var wrap = size.width != null;
		var multiline = size.height != 0;
		
		view.style.whiteSpace = (wrap ? "normal" : "nowrap");
		view.style.wordWrap = (wrap ? "break-word" : "normal");
		
		var style = (properties.selectable ? "text" : "none");
		untyped view.style.WebkitUserSelect = style;
		untyped view.style.MozUserSelect = style;
		
		view.style.lineHeight = (properties.leading + properties.size) + "px";
		view.style.fontFamily = properties.font;
		view.style.fontSize = properties.size + "px";
		view.style.fontWeight = (properties.bold ? "bold" : "normal");
		view.style.fontStyle = (properties.italic ? "italic" : "normal");
		view.style.letterSpacing = properties.letterSpacing + "px";
		view.style.textAlign = properties.align;
		
		if (properties.autoSize) {
			view.style.width = multiline ? size.width + "px" : "auto";
			view.style.height = "auto";
		}
		else {
			view.style.width = size.width + "px";
			view.style.height = size.height + "px";
		}
		
		view.innerHTML = "";
		view.style.color = RCColor.HEXtoString ( properties.color );
		view.style.fontFamily = properties.font;
		view.style.fontWeight = properties.bold;
    	view.style.fontSize = properties.size;
    	view.style.fontStyle = properties.style;
    	//view.style.fontVariant = properties.variant;

		if (size.width != null) setWidth ( size.width );
		//view.style.textAlign = properties.align;
	}
	
#end
	
	public function getText() :String {
		return #if (flash || nme) target.text #elseif js view.innerHTML #end;
	}
	
	public function setText (str:String) :String {
		#if (flash || nme)
			if (properties.html)
				target.htmlText = str;
			else
				target.text = str;
		#elseif js
			if (properties.html) {
				view.innerHTML = str;
			}
			else {
/*				var content:String = Std.string(str);
				content = content.split("\n").join("~~~NEWLINE~~~");
				content = content.split("\t").join("~~~TAB~~~");
				content = StringTools.htmlEscape(content);
				content = content.split("~~~NEWLINE~~~").join("<br/>");
				content = content.split("~~~TAB~~~").join("<span style='letter-spacing:1.3em'>&nbsp;</span>");*/
				view.innerHTML = str;
			}
		#end
		
		return str;
	}
	function wheelHandler (e:MouseEvent) :Void {
		#if (flash || nme)
			//trace(target.maxScrollV +", "+target.scrollV);
			if (target.maxScrollV == 2)
				target.scrollV = 0;
		#end
	}
	
	override public function destroy () :Void {
		#if (flash || nme)
			target.removeEventListener (MouseEvent.MOUSE_WHEEL, wheelHandler);
		#end
		target = null;
		super.destroy();
	}
}
