//
//  RCTabBar - is a group of rctabbaritems
//
//  Created by Baluta Cristian on 2012-02-02.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//

class RCTabBar extends RCGroup<RCTabBarItem> {
	
	public var selectedItem :RCTabBarItem;
	public var didSelectItem :RCSignal<RCTabBarItem->Void>;// called when a new view is selected by the user (but not programatically)
	var constructor2_ :Int->RCTabBarItem;
	
	
	public function new (x, y, constructor2_:Int->RCTabBarItem) {
		this.constructor2_ = constructor2_;
		super (x, y, 2, null, constructButton);
		
		didSelectItem = new RCSignal<RCTabBarItem->Void>();
	}
	function constructButton (indexPath:RCIndexPath) :RCTabBarItem {
		var but:RCTabBarItem = constructor2_ ( indexPath.row );
			but.click.add ( clickHandler );
		return but;
	}
	function clickHandler (s:RCControl) :Void {
		var i = 0;
		selectedItem = cast s;
		//setIndex ( i );
		didSelectItem.dispatch ( [selectedItem] );
	}
	
	
/*	public function getIndex () :Int {
		return selectedIndex;
	}
	public function setIndex (i:Int) :Int {
		selectedIndex = i;
		tabBar.select ( i );
		return selectedIndex;
	}
	*/
	
	public function enable (i:Int) :Void {
		//tabBar.enable( i );
	}
	public function disable (i:Int) :Void {
		//tabBar.disable( i );
	}
}
