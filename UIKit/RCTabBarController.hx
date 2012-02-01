//
//  RCTabBarController
//
//  Created by Baluta Cristian on 2011-06-09.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//

class RCTabBarController extends RCView {
	
	var labels :Array<String>;
	var symbols :Array<String>;
	
	public var tabBar :RCTabBar;
	public var viewControllers :Array<Dynamic>;
	public var selectedIndex (getIndex, setIndex) :Int;
	
	public var click :RCSignal<RCTabBarController->Void>;
	
	public function new(x, y){
		super(x,y);
		//this.size.height = 98;
		viewControllers = new Array<Dynamic>();
		click = new RCSignal<RCTabBarController->Void>();
		
		this.addChild ( new RCRectangle (0, 0, 640, 49, 0x222222) );
		this.addChild ( new RCRectangle (0, 49, 640, 49, 0x000000) );
		
		
	}
	public function init (labels:Array<String>, symbols:Array<String>) {
		this.labels = labels;
		this.symbols = symbols;
		
		tabBar = new RCTabBar (0, 3, 6, null, constructButton);
		tabBar.add ( labels );
		tabBar.click.add ( clickHandler );
		this.addChild ( tabBar );
	}
	function constructButton (nr:RCIndexPath) :RCTabBarItem {
		var s = new SkinButtonTabBar ( labels[nr.row], symbols[nr.row], null );
		var b = new RCTabBarItem (0, 0, s);
		return b;
	}
	function clickHandler (s:RCTabBar, e:RCIndexPath) :Void {
		setIndex ( e.row );
	}
	
	
	public function getIndex () :Int {
		return selectedIndex;
	}
	public function setIndex (i:Int) :Int {
		tabBar.select ( Std.string(i) );
		selectedIndex = i;
		return getIndex();
	}
	
	
	public function enable (i:Int) :Void {
		buttons.enable( Std.string(i) );
	}
	public function disable (i:Int) :Void {
		buttons.disable( Std.string(i) );
	}
	
	
	public function getViewController (i:Int) :Dynamic {
		return viewControllers[i];
	}
	public function setViewController (i:Int, view:Dynamic) :Void {
		if (viewControllers[i] == null)
			viewControllers[i] = view;
	}
}
