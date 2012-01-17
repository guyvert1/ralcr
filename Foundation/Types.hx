//
//  Shortcuts to objects that are heavily used
//
//  Created by Baluta Cristian on 2009-01-13.
//  Copyright (c) 2009 http://ralcr.com. All rights reserved.
//
#if flash
	typedef Sprite = flash.display.Sprite;
	typedef MovieClip = flash.display.MovieClip;
	typedef DisplayObject = flash.display.DisplayObject;
	typedef DisplayObjectContainer = flash.display.DisplayObjectContainer;
#elseif js
	typedef Sprite = JSView;
	typedef MovieClip = JSView;
	typedef DisplayObject = JSView;
	typedef DisplayObjectContainer = JSView;
#end