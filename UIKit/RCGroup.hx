//
//  RCGroup
//
//  Created by Cristi Baluta on 2011-02-08.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//
//

class RCGroup<T:RCView> extends RCView {
	
	var items :Array<T>;
	var constructor_ :RCIndexPath->T;
	var gapX :Null<Int>;
	var gapY :Null<Int>;
	
	//public var click :RCSignal<RCGroup->RCIndexPath->Void>;
	public var itemPush :RCSignal<RCGroup->RCIndexPath->Void>;
	public var itemRemove :RCSignal<RCGroup->RCIndexPath->Void>;
	
	
	public function new (x, y, gapX:Null<Int>, gapY:Null<Int>, constructor_:RCIndexPath->T) {
		
		super(x,y);
		
		this.gapX = gapX;
		this.gapY = gapY;
		this.constructor_ = constructor_;
		this.items = new Array<T>();
		//click = new RCSignal<RCGroup->RCIndexPath->Void>();
		itemPush = new RCSignal<RCGroup->RCIndexPath->Void>();
		itemRemove = new RCSignal<RCGroup->RCIndexPath->Void>();
	}
	
	
	/**
	 *	Add and remove buttons
	 *	params = a list of parameters to pass to the function that returns our sprite
	 */
	public function add (params:Array<Dynamic>, ?alternativeConstructor:RCIndexPath->T) :Void {
		
		if (!Reflect.isFunction (constructor_) && !Reflect.isFunction (alternativeConstructor)) return;
		if (alternativeConstructor != null) this.constructor_ = alternativeConstructor;
		
		// push the new values into main array
		var i = 0;
		for (param in params) {
			// Create a new sprite with the passed function
			var s = this.constructor_ ( new RCIndexPath(0,i) );
			this.addChild ( s );
			items.push ( s );
			
			// dispatch an event that the buttons structure has changed
			//this.dispatchEvent ( new GroupEvent (GroupEvent.PUSH, null, -1) );
			i++;
		}
		
		// Keep all items arranged
		keepButtonsArranged();
	}
	
	public function remove (i:Int) :Void {
		
		Fugu.safeDestroy ( items[i] );
		
		keepButtonsArranged();
		
		// dispatch an event that the buttons structure has changed
		itemRemove.dispatch ( [this, new RCIndexPath(0,i)] );
	}
	
	
	/**
	 *	Keep all the buttons arranged after an update operation
	 */
	public function keepButtonsArranged () :Void {
		
		// iterate over items
		for (i in 0...items.length) {
			var newX = 0.0, newY = 0.0;
			var new_s = items[i];
			var old_s = items[i-1];
			
			if (i != 0) {
				if (gapX != null) newX = old_s.x + old_s.width + gapX;
				if (gapY != null) newY = old_s.y + old_s.height + gapY;
			}
			
			new_s.x = newX;
			new_s.y = newY;
		}
		
		//this.dispatchEvent ( new GroupEvent (GroupEvent.UPDATED, null, -1) );
	}
	
	
	/**
	 *	Returns a reference to a specified sprite
	 *	Usefull if you want to change it's properties
	 */
	public function get (i:Int) :T {
		return items[i];
	}
	
	
	/**
	 *	Returns an array with items but marked as Dynamic
	 *	because RCView will not contain the neccesary methods needed by the code
	 */
	public function iterator<T>() :Array<T> {
		var typedItems = new Array<T>();
		for (s in items)
			typedItems.push ( cast(s, T) );
			
		return typedItems;
	}
	
	
	override public function destroy() :Void {
		Fugu.safeDestroy ( items );
		items = null;
	}
}
