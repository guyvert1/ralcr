//
//  CAObject.hx
//	CoreAnimation
//
//  Created by Baluta Cristian on 2009-03-22.
//  Copyright (c) 2009-2012 http://ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

/**
 *  The base object that holds the properties which will be animated.
 *  However, this class should not be instantiated directly.
 *  Instantiate one transition from Transitions folder.
 **/

class CAObject {
	
	public var target :Dynamic;// The object that is being animated (DisplayObjectContainer, TextField, Sound, or Function)
	public var prev :CAObject;// Previous caobject in the list
	public var next :CAObject;// Next caobject in the list
	
	// Properties to be animated:
	public var properties :Dynamic;
	public var fromValues :Dynamic;// initial values of the properties that are animated
	public var toValues :Dynamic;// final values of the properties that are animated
	
	// Parameters of the animation:
	public var fromTime :Float;// the starting time (ms)
	public var delay :Float;// s
	public var duration :Float;// s
	public var repeatCount :Int;
	public var autoreverses :Bool;
	public var timingFunction :Dynamic;//Float -> Float -> Float -> Float -> Dynamic -> Float;
	public var constraintBounds :RCRect;// Used by kenburns and slide
	public var delegate :CADelegate;
	
	
	/**
	 *	object = DisplayObject
	 *	properties: x, y, width, height, scaleX, scaleY, ....
	 *	parameters: duration, transition, equation, onComplete, onCompleteParams
	 */
	public function new (	target :Dynamic,
							properties :Dynamic,
							?duration :Null<Float>,
							?delay :Null<Float>,
							?Eq :Dynamic,/*Float -> Float -> Float -> Float -> Dynamic -> Float,*/
							?pos :haxe.PosInfos)
	{
		
		this.target = target;
		this.properties = properties;
		this.repeatCount = 0;
		this.autoreverses = false;
		this.fromTime = CoreAnimation.timestamp();
		this.duration = (duration == null) ? CoreAnimation.defaultDuration : ((duration <= 0) ? 0.001 : duration);
		this.delay = (delay == null || delay < 0) ? 0 : delay;
		// cpp does not work if you don't use "if else"
		if (Eq == null)
			this.timingFunction = CoreAnimation.defaultTimingFunction;
		else
			this.timingFunction = Eq;
		this.delegate = new CADelegate();
		this.delegate.pos = pos;
		
		// initial and final values of the properties that should be animated
		this.fromValues = {};
		this.toValues = {};
	}
	
	
	public function init () :Void { throw "CAObject should be extended ("+delegate.pos+")"; }
	public function animate (time_diff:Float) :Void { throw "CAObject should be extended ("+delegate.pos+")"; }
	
	
	/**
	 *	Creates starting and ending points for each parameter of the object to animate.
	 *  This is not called till is not added to CoreAnimation
	 */
	public function initTime () :Void {
		this.fromTime = CoreAnimation.timestamp();
		this.duration = this.duration*1000;// Convert duration from seconds to milliseconds
		this.delay = this.delay*1000;// Convert delay from seconds to milliseconds
	}
	
	
	
	/**
	 *	Restarts the animation. Values are reversed if autoreverses is set to true
	 */
	public function repeat () :Void {
		
		fromTime = CoreAnimation.timestamp();
		delay = 0;
		
		if (autoreverses) {
			var v = fromValues;
			fromValues = toValues;
			toValues = v;
		}
		
		repeatCount --;
	}
	
	
	
	
	/**
	 *  @param time_diff - the remaining time
	 *  @param prop - the property that will be animated ( CAObject.fromValues )
	 */
	inline public function calculate (time_diff:Float, prop:String) :Float {
		/*
		* @param		t					Float		Current time (in frames or seconds)
	 	* @param		b					Float		Starting value
	 	* @param		c					Float		Change needed in value
	 	* @param		d					Float		Expected easing duration (in frames or seconds)
	 	* @return							Float		The correct value
		*/
		return  timingFunction (time_diff,
								Reflect.field (fromValues, prop),
								Reflect.field (toValues, prop) -
								Reflect.field (fromValues, prop),
								duration, null);
	}
	
	
	
	public function toString () :String {
		return "[CAObject: target="+target+
						", duration="+duration+
						", delay="+delay+
						", fromTime="+fromTime+
						", properties="+properties+
						", repeatCount="+repeatCount+"]";
	}
}
