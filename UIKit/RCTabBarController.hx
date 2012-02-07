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
	
	public var background :RCRectangle;
	public var tabBar :RCTabBar;
	public var viewControllers :Array<Dynamic>;
	public var selectedIndex (getIndex, setIndex) :Int;
	
	public var didSelectViewController :RCSignal<RCTabBarController->Dynamic->Void>;
	
	
	public function new (x, y, ?constructor_:Int->RCTabBarItem) {
		super (x, y);
		this.size.width = 640;
		this.size.height = 98;
		this.constructor_ = constructor_;
		viewControllers = new Array<Dynamic>();
		didSelectViewController = new RCSignal<RCTabBarController->Dynamic->Void>();
		
		// Draw background
		this.addChild ( background = new RCRectangle (0, 0, this.size.width, this.size.height, 0x222222) );
		background.addChild ( new RCRectangle (0, this.size.height/2, this.size.width, this.size.height/2, 0x000000) );
	}
	public function initWithLabels (labels:Array<String>, symbols:Array<String>) {
		this.labels = labels;
		this.symbols = symbols;
		
		tabBar = new RCTabBar (0, 3, /*6, null, */constructor_ == null ? constructButton : constructor_);
		this.addChild ( tabBar );
		tabBar.add ( labels );
		tabBar.didSelectItem.add ( didSelectItemHandler );
	}
	/**
	 *  Default constructor for the RCTabBarItem
	 *  Pass a different constructor if you want to use a custom RCTabBarItem
	 **/
	function constructButton (i:Int) :RCTabBarItem {
		var s = new ios.SKTabBarItem ( labels[i], symbols[i] );
		var b = new RCTabBarItem (0, 0, s);
		return b;
	}
	function didSelectItemHandler (item:RCTabBarItem) :Void {
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
		return tabBar.selectedIndex;
	}
	public function setIndex (i:Int) :Int {
		tabBar.setIndex ( i );
		didSelectViewController.dispatch ( [this, getViewController(i)] );
		return i;
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
