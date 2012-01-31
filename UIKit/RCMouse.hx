//
//  Mouse
//
//  Created by Baluta Cristian on 2008-09-14.
//  Copyright (c) 2008-2012 http://imagin.ro. All rights reserved.
//

#if (flash || nme)
	import flash.display.DisplayObjectContainer;
	import flash.events.MouseEvent;
#elseif js
	import js.Dom;
	private typedef DisplayObjectContainer = HtmlDom;
	private typedef MouseEvent = Event;
#end

class RCMouse {
	
	dynamic public function onOver () :Void {}
	dynamic public function onOut () :Void {}
	dynamic public function onClick () :Void {}
	dynamic public function onDoubleClick () :Void {}
	dynamic public function onMove () :Void {}
	
	var target :DisplayObjectContainer;
	
	public function new (target:DisplayObjectContainer) {
		
		this.target = target;
		
		//_target.buttonMode = true;
		//_over.buttonMode = true;
		//_parent
		
		#if (flash || nme)
			target.doubleClickEnabled = true;
		
		#elseif js
			
		#end
		
		resume();
	}
	
	
	/**
	 * Start listening for mouse actions
	 */
	public function resume () :Void {
		#if (flash || nme)
			target.addEventListener (MouseEvent.ROLL_OVER, mouseOverHandler);
			target.addEventListener (MouseEvent.ROLL_OUT, mouseOutHandler);
			target.addEventListener (MouseEvent.CLICK, clickHandler);
			target.addEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			target.addEventListener (MouseEvent.DOUBLE_CLICK, doubleClickHandler);
			
		#elseif js
			target.onmouseover = mouseOverHandler;
			target.onmouseout = mouseOutHandler;
			target.onclick = clickHandler;
			target.onmousemove = mouseMoveHandler;
			target.ondblclick = doubleClickHandler;
			
		#end
	}
	
	
	/**
	 * Hold all mouse actions
	 */
	public function hold () :Void {
		#if (flash || nme)
			target.removeEventListener (MouseEvent.ROLL_OVER, mouseOverHandler);
			target.removeEventListener (MouseEvent.ROLL_OUT, mouseOutHandler);
			target.removeEventListener (MouseEvent.CLICK, clickHandler);
			target.removeEventListener (MouseEvent.MOUSE_MOVE, mouseMoveHandler);
			target.removeEventListener (MouseEvent.DOUBLE_CLICK, doubleClickHandler);
			
		#elseif js
			target.onmouseover = null;
			target.onmouseout = null;
			target.onclick = null;
			target.onmousemove = null;
			target.ondblclick = null;
			
		#end
	}
	
	
	/**
	 * Handlers
	 */
	function mouseOverHandler (e:MouseEvent) :Void {
		onOver();
	}
	function mouseOutHandler (e:MouseEvent) :Void {
		onOut();
	}
	function mouseMoveHandler (e:MouseEvent) :Void {
		onMove();
	}
	function clickHandler (e:MouseEvent) :Void {
		onClick();
	}
	function doubleClickHandler (e:MouseEvent) :Void {
		onDoubleClick();
	}
	
	/**
	 * Returns the position of the mouse to the target
	 */
/*	function getPosition (e:MouseEvent) :Position {
		#if (flash || nme)
			if (_parent.mouseX > _target.x && _parent.mouseX < _target.x + _target.width &&
				_parent.mouseY > _target.y && _parent.mouseY < _target.y + _target.height)
			{
				var realX = _parent.mouseX - _target.x;
				
				if (realX < (_target.width - _w) / 2)				return left;
				else if (realX > (_target.width - _w) / 2 + _w)		return right;
				else												return middle;
			}
		#elseif js
			if (e.clientX > _target.offsetLeft && e.clientX < _target.offsetLeft + _target.offsetWidth &&
				e.clientY > _target.offsetTop && e.clientY < _target.offsetTop + _target.offsetHeight)
			{
				var realX = e.clientX - _target.offsetLeft;
				
				if (realX < (_target.offsetWidth - _w) / 2)				return left;
				else if (realX > (_target.offsetWidth - _w) / 2 + _w)	return right;
				else													return middle;
			}
		#end
		return outside;
	}*/
	
	public function destroy() :Void {
		hold();
		mouseOutHandler ( null );
	}
}
