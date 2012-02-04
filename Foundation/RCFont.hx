//
//  RCFont
//
//  Created by Cristi Baluta on 2010-10-15.
//  Copyright (c) 2010-2012 ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	#if (cpp || neko)
		private typedef TextFormatDisplay = Dynamic;
		private typedef StyleSheet = Dynamic;
		private typedef AntiAliasType = Dynamic;
	#else
		import flash.text.TextFormatDisplay;
		import flash.text.StyleSheet;
		import flash.text.AntiAliasType;
	#end
#elseif js
	typedef TextFieldType = Dynamic;
	typedef TextFormat = Dynamic;
	typedef TextFormatAlign = Dynamic;
	//typedef TextFieldAutoSize = Dynamic;
	typedef TextFormatDisplay = Dynamic;
	typedef StyleSheet = Dynamic;
	typedef AntiAliasType = Dynamic;
#end


class RCFont {
	
	public var html :Bool;
	public var format :TextFormat;
	public var style :StyleSheet;
	
	// TextField properties (only some of them that are more important)
	public var embedFonts :Bool;
	public var type :TextFieldType;
	public var antiAliasType :AntiAliasType;
	public var autoSize :Bool;//TextFieldAutoSize;
	public var displayAsPassword :Bool;
	public var selectable :Bool;
	public var sharpness :Int;// -400 ... 400
	public var thickness :Float;
	
	// TextFormat properties
	public var align : String;// TextFormatAlign; center, left, right
	public var blockIndent : Null<Float>;
	public var bold : Null<Bool>;
	public var bullet : Null<Bool>;
	public var color : Null<Int>;
	public var display : TextFormatDisplay;
	public var font : String;
	public var indent : Null<Float>;
	public var italic : Null<Bool>;
	public var kerning : Null<Bool>;
	public var leading : Null<Float>;
	public var leftMargin : Null<Float>;
	public var letterSpacing : Null<Float>;
	public var rightMargin : Null<Float>;
	public var size : Null<Float>;
	public var tabStops : Array<Int>;
	public var target : String;
	public var underline : Null<Bool>;
	public var url :String;
	
	// Stylesheet properties
/*	public var color :String;
	public var display :String;
	public var fontFamily :String;
	public var fontSize :String;
	public var fontStyle :String;
	public var fontWeight :String;
	public var kerning :String;
	public var leading :String;
	public var letterSpacing :String;
	public var marginLeft :String;
	public var marginRight :String;
	public var textAlign :String;
	public var textDecoration :String;
	public var textIndent :String;*/
	
	
	public function new () {
		
		html = true;
		embedFonts = true;
		autoSize = true;//TextFieldAutoSize.LEFT;
		selectable = false;
#if (flash || nme)
		type = TextFieldType.DYNAMIC;
#if flash
		antiAliasType = AntiAliasType.ADVANCED;// ADVANCED-normal fonts(<40px), NORMAL-pixel fonts
		style = new StyleSheet();
#end
		format = new TextFormat();
#end
	}
		
	public function copy (?exceptions:Dynamic) :RCFont {
		
		var rcfont = new RCFont();
		var fields = Type.getInstanceFields ( RCFont );
		
		// Copy all RCFont properties to the new object
		for (field in fields) {
			if (field == "copy") continue;
			//trace(field+", "+Reflect.field (this, field));
			Reflect.setField (rcfont, field, Reflect.field (this, field));
		}
		
		if (exceptions != null) {
			for (excp in Reflect.fields ( exceptions )) {
				if (Reflect.hasField (rcfont, excp)) {
					Reflect.setField (rcfont, excp, Reflect.field (exceptions, excp));
				}
			}
		}
		
		rcfont.format = #if (flash || nme) new TextFormat() #elseif js {} #end;
		rcfont.format.align = #if (flash || nme) switch(rcfont.align)
		{
			case "center": TextFormatAlign.CENTER;
			case "left": TextFormatAlign.LEFT;
			case "right": TextFormatAlign.RIGHT;
		};
		#elseif js
			rcfont.align;
		#end
			trace(rcfont.align+", "+rcfont.format.align);
		rcfont.format.blockIndent = rcfont.blockIndent;
		rcfont.format.bold = rcfont.bold;
		rcfont.format.bullet = rcfont.bullet;
		rcfont.format.color = rcfont.color;
		//rcfont.format.display = rcfont.display;
		rcfont.format.font = rcfont.font;
		rcfont.format.italic = rcfont.italic;
		rcfont.format.indent = rcfont.indent;
		rcfont.format.kerning = rcfont.kerning;
		rcfont.format.leading = rcfont.leading;
		rcfont.format.leftMargin = rcfont.leftMargin;
		rcfont.format.letterSpacing = rcfont.letterSpacing;
		rcfont.format.rightMargin = rcfont.rightMargin;
		rcfont.format.size = rcfont.size;
		rcfont.format.tabStops = rcfont.tabStops;
		rcfont.format.target = rcfont.target;
		rcfont.format.underline = rcfont.underline;
		rcfont.format.url = rcfont.url;
		
		return rcfont;
	}
}
