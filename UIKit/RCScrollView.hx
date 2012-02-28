//
//  RCScrollView
//
//  Created by Cristi Baluta on 2011-02-08.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//
/**
 *  
 **/

class RCScrollView extends RCView {
	
	var vertScrollBar :RCScrollBar;
	var horizScrollBar :RCScrollBar;
	var vertScrollBarSync :RCSliderSync;
	var horizScrollBarSync :RCSliderSync;
	
	public var contentView :RCView;
	public var contentSize :RCSize;
	public var dragging :Bool;
	public var autohideSliders :Bool;
	public var enableMarginsFade (null, setMarginsFade) :Bool;
	public var bounces (null, setBounce) :Bool;
	public var decelerationRate :Float;
	public var pagingEnabled :Bool;
	public var scrollEnabled (null, setScrollEnabled) :Bool;
	public var scrollIndicatorInsets :RCPoint;
	var scrollHappening :EVMouse;
	
	dynamic public function scrollViewDidScroll():Void{}
	dynamic public function scrollViewWillBeginDragging():Void{}
	dynamic public function scrollViewDidEndDragging():Void{}
	dynamic public function scrollViewDidScrollToTop():Void{}
	dynamic public function scrollViewDidEndScrollingAnimation():Void{}
	
	
	public function new (x, y, w, h) {
		super (x, y, w, h);
		clipsToBounds = true;
		#if js
			// http://help.dottoro.com/ljrmdnar.php
		layer.style.overflow = "auto";
		scrollHappening = new EVMouse (EVMouse.WHEEL, this);
		scrollHappening.add ( scrollViewDidScrollHandler_ );
		#end
		setContentView ( new RCView (0, 0) );
	}
	function scrollViewDidScrollHandler_ (e:EVMouse) {
		//trace("scroll");
		scrollViewDidScroll();
	}
	
	/**
	 *  Set a custom view as the contentView
	 */
	public function setContentView (content:RCView) :Void {
		Fugu.safeRemove ( contentView );
		contentView = content;
		addChild ( contentView );
		contentSize = contentView.size;
		setScrollEnabled ( true );
	}
	function setScrollEnabled (b:Bool) :Bool {
		//trace("setScrollEnabled "+b);
		var colors = [null, null, 0xDDDDDD, 0xFFFFFF];
		trace("contentSize "+contentSize);
		
		// Add or remove the horizontal scrollbar
		if (contentView.width > size.width && horizScrollBarSync == null && b) {
			trace("add horiz");
			var scroller_w = Zeta.lineEquationInt (size.width/2, size.width, contentSize.width, size.width*2, size.width);
			var skinH = new haxe.SKScrollBar ( colors );
			horizScrollBar = new RCScrollBar (0, size.height - 10, size.width, 8, scroller_w, skinH);
			horizScrollBarSync = new RCSliderSync (RCWindow.target, contentView, horizScrollBar, size.width, "horizontal");
			horizScrollBarSync.valueChanged.add ( scrollViewDidScrollHandler );
			addChild ( horizScrollBar );
		}
		else {
			Fugu.safeDestroy ([horizScrollBar, horizScrollBarSync]);
			horizScrollBar = null;
			horizScrollBarSync = null;
		}
		trace("contentView.height "+contentView.height);
		
		// Add or remove the vertical scrollbar
		if (contentView.height > size.height && vertScrollBarSync == null && b) {
			trace("add vert");
			var scroller_h = Zeta.lineEquationInt (size.height/2, size.height, contentSize.height, size.height*2, size.height);
			var skinV = new haxe.SKScrollBar ( colors );
			vertScrollBar = new RCScrollBar (size.width - 10, 0, 8, size.height, scroller_h, skinV);
			vertScrollBarSync = new RCSliderSync (RCWindow.target, contentView, vertScrollBar, size.height, "vertical");
			vertScrollBarSync.valueChanged.add ( scrollViewDidScrollHandler );
			addChild ( vertScrollBar );
		}
		else {
			Fugu.safeDestroy ([vertScrollBar, vertScrollBarSync]);
			vertScrollBar = null;
			vertScrollBarSync = null;
		}
		
		return b;
	}
	function scrollViewDidScrollHandler (s:RCSliderSync) :Void {
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
		if (vertScrollBarSync != null)
			vertScrollBarSync.resume();
		if (horizScrollBarSync != null)
			horizScrollBarSync.resume();
	}
	
	public function hold () :Void {
		if (vertScrollBarSync != null)
			vertScrollBarSync.hold();
		if (horizScrollBarSync != null)
			horizScrollBarSync.hold();
	}
	
	override public function destroy () :Void {
		Fugu.safeDestroy ([vertScrollBarSync, horizScrollBarSync, vertScrollBar, horizScrollBar]);
		vertScrollBarSync = null;
		horizScrollBarSync = null;
		super.destroy();
	}
}
