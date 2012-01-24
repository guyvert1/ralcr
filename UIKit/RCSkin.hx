//
//  RCSkin
//
//  Created by Baluta Cristian on 2008-07-03.
//  Copyright (c) 2008-2012 ralcr.com. All rights reserved.
//

#if flash
	import flash.display.DisplayObjectContainer;
#elseif js
	import js.Dom;
	private typedef DisplayObjectContainer = HtmlDom;
#end

class RCSkin implements RCSkinInterface {
	
	// NORMAL / HIGHLIGHTED / DISABLED / SELECTED / HIT_AREA
	public var 
	public var backgroundNormal :DisplayObjectContainer;
	public var up :DisplayObjectContainer;
	public var over :DisplayObjectContainer;
	public var down :DisplayObjectContainer;
	public var hit :DisplayObjectContainer;
	
	public var colors :Array<Null<Int>>;
	public var backgroundColorUp :Null<Int>;
	public var backgroundColorOver :Null<Int>;
	public var symbolColorUp :Null<Int>;
	public var symbolColorOver :Null<Int>;
	
	
	public function new (	?colors : Array<Null<Int>>,
							?background : DisplayObjectContainer,
							?up : DisplayObjectContainer,
							?over : DisplayObjectContainer,
							?down : DisplayObjectContainer,
							?hit : DisplayObjectContainer)
	{
		this.background = background;
		this.up = up;
		this.over = over;
		this.down = down;
		this.hit = hit;
		
		if (colors == null)
			colors = [null, null, null, null];
			
		this.colors = colors;
		this.backgroundColorUp = colors[0];
		this.backgroundColorOver = colors[1];
		this.symbolColorUp = colors[2];
		this.symbolColorOver = colors[3];
	}
}
