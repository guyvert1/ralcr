//
//  RCTabBarController
//
//  Created by Baluta Cristian on 2011-06-09.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//

class RCTabBarController extends RCView {
	
	var labels :Array<String>;
	var symbols :Array<String>;
	var constructor_ :Int->RCTabBarItem;
	
	public var tabBar :RCTabBar;
	public var viewControllers :Array<Dynamic>;
	public var selectedIndex (getIndex, setIndex) :Int;
	
	public var didSelectViewController :RCSignal<RCTabBarController->Dynamic->Void>;
	
	
	public function new (x, y, ?constructor_:Int->RCTabBarItem) {
		super(x,y);
		//this.size.height = 98;
		this.constructor_ = constructor_;
		viewControllers = new Array<Dynamic>();
		didSelectViewController = new RCSignal<RCTabBarController->Dynamic->Void>();
		
		// Draw background
		this.addChild ( new RCRectangle (0, 0, 640, 49, 0x222222) );
		this.addChild ( new RCRectangle (0, 49, 640, 49, 0x000000) );
	}
	public function init (labels:Array<String>, symbols:Array<String>) {
		this.labels = labels;
		this.symbols = symbols;
		
		tabBar = new RCTabBar (0, 3, /*6, null, */constructor_ == null ? constructButton : constructor_);
		this.addChild ( tabBar );
		tabBar.add ( labels );
		tabBar.didSelectItem.add ( clickHandler );
	}
	function constructButton (i:Int) :RCTabBarItem {
		var s = new haxe.SKTabBarItem ( labels[i], symbols[i], null );
		var b = new RCTabBarItem (0, 0, s);
		return b;
	}
	function clickHandler (item:RCTabBarItem) :Void {
		var i = 0;
		for (it in tabBar.items) {
			if (it == item) {
				break;
			}
			i++;
		}
		setIndex ( i );
	}
	
	
	public function getIndex () :Int {
		return selectedIndex;
	}
	public function setIndex (i:Int) :Int {
		trace("setIndex "+i);
		selectedIndex = i;
		//tabBar.select ( i );
		didSelectViewController.dispatch ( [this, viewControllers[selectedIndex]] );
		return selectedIndex;
	}
	
	
	public function enable (i:Int) :Void {
		tabBar.enable( i );
	}
	public function disable (i:Int) :Void {
		tabBar.disable( i );
	}
	
	
	public function getViewController (i:Int) :Dynamic {
		return viewControllers[i];
	}
	public function setViewController (i:Int, view:Dynamic) :Void {
		if (viewControllers[i] == null)
			viewControllers[i] = view;
	}
}
