//
//  RCTabBar - is a group of RCTabBarItem's aligned horiz
//
//  Created by Baluta Cristian on 2012-02-02.
//  Copyright (c) 2012 ralcr.com. All rights reserved.
//

class RCTabBar extends RCGroup<RCTabBarItem> {
	
	public var selectedItem :RCTabBarItem;
	public var selectedIndex (getIndex, setIndex) :Int;
	public var didSelectItem :RCSignal<RCTabBarItem->Void>;// called when a new view is selected by the user (but not programatically)
	var constructor2_ :Int->RCTabBarItem;
	
	
	public function new (x, y, constructor2_:Int->RCTabBarItem) {
		this.constructor2_ = constructor2_;
		this.selectedIndex = 0;
		didSelectItem = new RCSignal<RCTabBarItem->Void>();
		super (x, y, 160, null, constructButton);
	}
	function constructButton (indexPath:RCIndexPath) :RCTabBarItem {
		var but:RCTabBarItem = constructor2_ ( indexPath.row );
			but.click.add ( clickHandler );
		return but;
	}
	function clickHandler (s:EVMouse) :Void {
		selectedItem = cast s.target;
		didSelectItem.dispatch ( [selectedItem] );
	}
	
	
	public function getIndex () :Int {
		return selectedIndex;
	}
	public function setIndex (i:Int) :Int {
		if (items == null) return selectedIndex;
		items[selectedIndex].untoggle();
		selectedIndex = i;
		items[selectedIndex].toggle();
		return selectedIndex;
	}
	
	public function enable (i:Int) :Void {
		items[i].enabled = true;
	}
	public function disable (i:Int) :Void {
		items[i].enabled = false;
	}
}
