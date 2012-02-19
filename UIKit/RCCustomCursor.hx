//
//  CustomCursor
//
//  Created by Baluta Cristian on 2008-12-29.
//  Copyright (c) 2008-2012 http://ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.ui.Mouse;
#elseif js
	import js.Dom;
#end


class RCCustomCursor extends RCView {
	
	var target :Dynamic;
	var cursor :Dynamic;
	var mouseMove :EVMouse;
	
	
	public function new (target:Dynamic) {
		super (0, 0);
		this.target = target;
		
		//Stage.MC.addEventListener (Event.MOUSE_LEAVE, hideCustomCursor);
		mouseMove = new EVMouse (EVMouse.MOVE, target);
		mouseMove.add ( moveHandler );
	}
	
	public function draw (obj:Dynamic) :Void {
		// Remove the current cursor
		Fugu.safeRemove ( cursor );
		
		// Add the new cursor
		cursor = obj;
		cursor.mouseEnabled = false;
		Fugu.safeAdd (this, cursor);
		this.mouseEnabled = false;
		#if flash
			Mouse.hide();
		#elseif js
			//Lib.document.body.style.cursor = "none";
			Lib.document.body.style.cursor = "url(" + cursorURL + ") " + x +" " + y +", auto");
		#end
	}
	
	
	function moveHandler (e:EVMouse) :Void {
		//if (!cursor.visible) cursor.visible = true;
		this.x = e.e.stageX;
		this.y = e.e.stageY;
		e.updateAfterEvent();
	}
/*	function hideCustomCursor (event:Event) :Void {
		cursor.visible = false;
	}*/
	
	override public function destroy () :Void {
		#if flash
			Mouse.hide();
		#elseif js
			Lib.document.body.style.cursor = "auto";
		#end
		
		//Stage.MC.removeEventListener (Event.MOUSE_LEAVE, hideCustomCursor);
		mouseMove.destroy();
	}
}