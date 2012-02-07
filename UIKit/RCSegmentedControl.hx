//
//  RCSegmentedControl
//	A component that holds a group of radio buttons. Only one button can be selected at a given time
//	The buttons cannot have the same label
//
//  Created by Baluta Cristian on 2011-08-18.
//  Copyright (c) 2011-2012 ralcr.com. All rights reserved.
//

class RCSegmentedControl extends RCView {
	
	var constructButton :Int->RCButtonRadio;
	var labels :Array<String>;
	var items :HashArray<RCButtonRadio>;
	var segmentWidth :Int;
	var gapX :Null<Int>;
	var gapY :Null<Int>;
	
	public var click :RCSignal<RCSegmentedControl->Void>;
	public var selectedIndex (getIndex, setIndex) :Int;
	
	
	public function new (x, y, w:Null<Int>, h:Null<Int>, ?constructor_:Int->RCButtonRadio) {
		super (x, y);
		this.size.width = w;
		this.size.height = h;
		
		this.constructButton = constructor_;
		this.items = new HashArray<RCButtonRadio>();
		click = new RCSignal<RCSegmentedControl->Void>();
	}
	public function initWithLabels (labels:Array<String>, ?constructor_:Int->RCButtonRadio) :Void {
		this.labels = labels;
		var constructorNow :Int->RCButtonRadio = this.constructButton;
		
		if (Reflect.isFunction (constructor_)) {
			constructorNow = constructor_;
		}
		if (!Reflect.isFunction (constructorNow)) return;
		
		// push the new values into main array
		var i = 0;
		for (label in labels) {
			if (items.exists( label )) continue;
			
			var b = constructorNow ( i );
				b.click.add ( clickHandler );
			
			// set the button into hash table
			items.set( label, b);
			
			// dispatch an event that the buttons structure has changed
			//this.dispatchEvent ( new GroupEvent (GroupEvent.PUSH, label, getPositionForLabel( label )) );
			i++;
		}
		
		// finaly arrange all buttons and add them to stage
		keepButtonsArranged();
		
/*		for (i in 0...values.length-1) {
			this.addChild ( new RCRectangle (segmentWidth+segmentWidth*i, 0, 1, h, 0x333333) );
		}
		*/
	}
	function defaultConstructor (i:Int) :RCButtonRadio {
		
		var segmentLeft :String;
		var segmentMiddle :String;
		var segmentRight :String;
		
		switch (i) {
			case 0: segmentLeft = "L"; segmentMiddle = "M"; segmentRight = "MR"; // First
			case items.arr.length-1: segmentLeft = "ML"; segmentMiddle = "M"; segmentRight = "R"; // Last
			default: segmentLeft = "ML"; segmentMiddle = "M"; segmentRight = "MR"; // Middle
		}
		
		var s = new ios.SKSegment (labels[i], segmentWidth, size.height, segmentLeft, segmentMiddle, segmentRight, null);
		var b = new RCButtonRadio (0, 0, s);
		return b;
	}
	
	public function getIndex () :Int {
		return selectedIndex;
	}
	public function setIndex (i:Int) :Int {
		//buttons.select ( values[i] );
		selectedIndex = i;
		return getIndex();
	}

	
	/**
	 * Add and remove buttons
	 */
	public function remove (label:String) :Void {
		//trace("REMOVE FROM HASH: "+label);
		if (items.exists( label )) {
			Fugu.safeDestroy ( items.get( label ) );
			items.remove( label );
		}
		
		// finaly arrange all buttons and add them to stage
		keepButtonsArranged();
		
		// dispatch an event that the buttons structure has changed
		//this.dispatchEvent ( new GroupEvent (GroupEvent.REMOVE, label, getPositionForLabel( label )) );
	}
	
	public function update (labels:Array<String>, ?constructor_:Int->RCButtonRadio) :Void {
		// Delete the old buttons
		destroy();
		// Recreate the array
		items = new HashArray<RCButtonRadio>();
		// Add the new buttons
		initWithLabels (labels, constructor_);
	}
	
	
	/**
	 *	Keep all the buttons arranged after an update operation
	 */
	public function keepButtonsArranged () :Void {
		
		// iterate over buttons
		for (i in 0...items.array().length) {
			var newX = 0.0, newY = 0.0;
			var new_b = items.get ( items.array()[i] );
			var old_b = items.get ( items.array()[i-1] );
			
			if (i != 0) {
				if (gapX != null) newX = old_b.x + old_b.width + gapX;
				if (gapY != null) newY = old_b.y + old_b.height + gapY;
			}
			
			new_b.x = newX;
			new_b.y = newY;
			
			this.addChild ( new_b );
		}
		
		//this.dispatchEvent ( new GroupEvent (GroupEvent.UPDATED, null, -1));
	}
	
	public function getIndexForLabel (label:String) :Int {
		for (i in 0...items.arr.length)
			if (items.arr[i] == label)
				return i;
				return -1;
	}
	
	
	/**
	 * Select the currently pressed button
	 * unselect = if set to true, keep selected only the pressed button
	 * otherwise
	 */
	public function select (label:String, ?can_unselect:Bool=true) :Void {
		
		if (items.exists( label )) {
			// Select the current label
			items.get( label ).toggle();

			if (can_unselect)
				items.get( label ).lock()
			else
				items.get( label ).unlock();
		}
		
		// Unselect other labels
		if (can_unselect)
			for (key in items.keys())
				if (key != label)
					if (items.get( key ).toggable)
						unselect ( key );
	}
	
	public function unselect (label:String) :Void {
		items.get( label ).unlock();
		items.get( label ).untoggle();
	}
	
	public function toggled (label:String) :Bool {
		return items.get( label ).selected;
	}
	
	/**
	 *	Returns a reference to a specified button
	 *	Usefull if you want to change it's properties
	 */
	public function get (label:String) :RCButtonRadio {
		return items.get( label );
	}
	
	/**
	 *	Checks if a specified key exists already
	 */
	public function exists (key:String) :Bool {
		return items.exists( key );
	}
	
	
	/**
	 *	Enable or disable a button to be clicked
	 */
	public function enable (label:String) :Void {
		items.get( label ).unlock();
		items.get( label ).alpha = 1;
	}
	public function disable (label:String) :Void {
		items.get( label ).lock();
		items.get( label ).alpha = 0.4;
	}
	
	
	/**
	 * Dispatch events
	 */
	function clickHandler (b:EVMouse) :Void {
		//click.dispatch ( [this, getIndexForLabel( label )] );
	}
	
	
	override public function destroy () :Void {
		if (items != null)
		for (key in items.keys()) Fugu.safeDestroy ( items.get( key ) );
			items = null;
	}
}
