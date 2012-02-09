//
//  RCScrollView
//
//  Created by Cristi Baluta on 2011-02-08.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//

class RCScrollView extends RCView {
	
	public var contentView :RCView;
	public var contentSize :RCSize;// You can access directly the contentView, but be carefull
	
	var verticalSliderIndicator :RCScrollBar;
	var horizontalSliderIndicator :RCScrollBar;
	var verticalSliderSync :RCSliderSync;
	var horizontalSliderSync :RCSliderSync;
	
	public var dragging :Bool;
	public var autohideSliders :Bool;
	public var enableMarginsFade (null, setMarginsFade) :Bool;
	public var bounces (null, setBounce) :Bool;
	public var decelerationRate :Float;
	public var pagingEnabled :Bool;
	public var scrollEnabled (null, setScrollEnabled) :Bool;
	public var scrollIndicatorInsets :RCPoint;
	
	dynamic public function scrollViewDidScroll():Void{}
	dynamic public function scrollViewWillBeginDragging():Void{}
	dynamic public function scrollViewDidEndDragging():Void{}
	dynamic public function scrollViewDidScrollToTop():Void{}
	dynamic public function scrollViewDidEndScrollingAnimation():Void{}
	
	
	public function new (x, y, w, h) {
		super (x, y, w, h);
		clipsToBounds = true;
		setContentView ( new RCView (0, 0) );
	}
	
	
	/**
	 *  Set a custom view as the contentView
	 */
	public function setContentView (content:RCView) :Void {
		contentView = content;
		contentSize = contentView.size;
		addChild ( contentView );
		try{setScrollEnabled ( true );}catch(e:Dynamic){Fugu.stack();}
	}
	function setScrollEnabled (b:Bool) :Bool {
		//trace("setScrollEnabled "+b);
		var colors = [null, null, 0xDDDDDD, 0xFFFFFF];
		trace("contentView.width "+contentView.width);
		
		// Add or remove the horizontal scrollbar
		if (contentView.width > size.width && horizontalSliderSync == null && b) {
			trace("add horz");trace(size);
			var scroller_w = Zeta.lineEquationInt (50, size.width-50, contentSize.width, size.width*10, size.width);trace("add horz");
			var skinH = new haxe.SKScrollBar (scroller_w, 5, colors);trace("add horz");
			horizontalSliderIndicator = new RCScrollBar (0, size.height + 2, Math.round(size.width), null, skinH);trace("add horz");
			horizontalSliderSync = new RCSliderSync (RCWindow.target, contentView, horizontalSliderIndicator, Math.round(size.width), "horizontal");trace("add horz");
			horizontalSliderSync.onUpdate = scrollViewDidScrollHandler;trace("add horz");
			addChild ( horizontalSliderIndicator );trace("add horz");
		}
		else {
			Fugu.safeDestroy ([horizontalSliderIndicator, horizontalSliderSync]);
			horizontalSliderIndicator = null;
			horizontalSliderSync = null;
		}
		trace("contentView.height "+contentView.height);
		
		// Add or remove the vertical scrollbar
		if (contentView.height > size.height && verticalSliderSync == null && b) {
			//trace("add vert");
			var scroller_h = Zeta.lineEquationInt (50, size.height-50, contentSize.height, size.height*10, size.height);
			var skinV = new haxe.SKScrollBar (5, scroller_h,/* 5, size.height,  0, */colors);
			verticalSliderIndicator = new RCScrollBar (size.width + 2, 0, null, Math.round(size.height), skinV);
			verticalSliderSync = new RCSliderSync (RCWindow.target, contentView, verticalSliderIndicator, Math.round(size.height), "vertical");
			verticalSliderSync.onUpdate = scrollViewDidScrollHandler;
			addChild ( verticalSliderIndicator );
		}
		else {
			Fugu.safeDestroy ([verticalSliderIndicator, verticalSliderSync]);
			verticalSliderIndicator = null;
			verticalSliderSync = null;
		}
		
		return b;
	}
	function scrollViewDidScrollHandler () :Void {
		scrollViewDidScroll();
	}
	
	/**
	 *  Take the rect from the contentView and fill the contentRect with it
	 */
	public function scrollRectToVisible (rect:RCRect, animated:Bool) :Void {
		
	}
	
	public function zoomToRect (rect:RCRect, animated:Bool) :Void {
		
	}
	
	public function setBounce (b:Bool) :Bool {
		bounces = b;
		return b;
	}
	public function setMarginsFade (b:Bool) :Bool {
		return b;
	}
	
	
	public function resume () :Void {
		if (verticalSliderSync != null)
			verticalSliderSync.resume();
		if (horizontalSliderSync != null)
			horizontalSliderSync.resume();
	}
	
	public function hold () :Void {
		if (verticalSliderSync != null)
			verticalSliderSync.hold();
		if (horizontalSliderSync != null)
			horizontalSliderSync.hold();
	}
	
	override public function destroy () :Void {
		Fugu.safeDestroy ([verticalSliderSync, horizontalSliderSync]);
		verticalSliderSync = null;
		horizontalSliderSync = null;
		super.destroy();
	}
}
