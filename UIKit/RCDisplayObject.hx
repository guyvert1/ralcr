// The properties a display object must have

class RCDisplayObject {
	
	public var viewWillAppear :RCSignal<Void->Void>;
	public var viewWillDisappear :RCSignal<Void->Void>;
	public var viewDidAppear :RCSignal<Void->Void>;
	public var viewDidDisappear :RCSignal<Void->Void>;
	public function viewWillAppearHandler () :Void { viewWillAppear.dispatch(); }
	public function viewWillDisappearHandler () :Void { viewWillDisappear.dispatch(); }
	public function viewDidAppearHandler () :Void { viewDidAppear.dispatch(); }
	public function viewDidDisappearHandler () :Void { viewDidDisappear.dispatch(); }
	
	
	// Properties of a View
	public var bounds (getBounds, setBounds) :RCRect; // Real size of the view
	public var size :RCSize; // Visible size of the layer. 
	public var center (default, setCenter) :RCPoint; // Position this view with the center
	public var clipsToBounds (default, setClipsToBounds) :Bool;
	public var backgroundColor (default, setBackgroundColor) :Null<Int>;
	public var x (default, setX) :Float; // Animatable property
	public var y (default, setY) :Float; // Animatable property
	public var width (getWidth, setWidth) :Float; // Real size of the layer, can be different than the bounds
	public var height (getHeight, setHeight) :Float; // Animatable property
	public var scaleX (default, setScaleX) :Float; // Animatable property
	public var scaleY (default, setScaleY) :Float; // Animatable property
	public var alpha (default, setAlpha) :Float; // Animatable property
	public var rotation (default, setRotation) :Float; // Animatable property
	public var visible (default, setVisible) :Bool;
	public var mouseX (getMouseX, null) :Float;
	public var mouseY (getMouseY, null) :Float;
	
	var lastW_ :Float;
	var lastH_ :Float;
	var scaleX_ :Float;
	var scaleY_ :Float;
	var alpha_ :Float;
	var caobj :CAObject;
	
	
	public function new () {
		
		viewWillAppear = new RCSignal<Void->Void>();
		viewWillDisappear = new RCSignal<Void->Void>();
		viewDidAppear = new RCSignal<Void->Void>();
		viewDidDisappear = new RCSignal<Void->Void>();
	}
	
	
	// Getter / Setters methods
	//
	public function setVisible (v:Bool) :Bool {
		return visible = v;// Override it
	}
	public function setAlpha (a:Float) :Float {
		return alpha = a;// Override it
	}
	public function setX (x:Float) :Float {
		return this.x = x*RCWindow.scaleFactor;// Override it
	}
	public function setY (y:Float) :Float {
		return this.y = y*RCWindow.scaleFactor;// Override it
	}
	public function getWidth () :Float {
		return width/RCWindow.scaleFactor;// Override it
	}
	public function setWidth (w:Float) :Float {
		return width = w*RCWindow.scaleFactor;// Override it
	}
	public function getHeight () :Float {
		return height/RCWindow.scaleFactor;// Override it
	}
	public function setHeight (h:Float) :Float {
		return height = h*RCWindow.scaleFactor;// Override it
	}
	public function setRotation (r:Float) :Float {
		return rotation = r;// Override it
	}
	public function getBounds () :RCRect {
		return new RCRect (x, y, size.width, size.height);
	}
	public function setBounds (b:RCRect) :RCRect {
		setX ( b.origin.x );
		setY ( b.origin.y );
		setWidth ( b.size.width );
		setHeight ( b.size.height );
		return b;
	}
	public function setScaleX (sx:Float) :Float {
		scaleX_ = scaleX = sx;
		scale (scaleX_, scaleY_);
		return scaleX_;
	}
	public function setScaleY (sy:Float) :Float {
		scaleY_ = scaleY = sy;
		scale (scaleX_, scaleY_);
		return scaleY_;
	}
	
	
	public function setClipsToBounds (clip:Bool) :Bool {
		return clip;// Override it
	}
	public function setBackgroundColor (color:Null<Int>) :Null<Int> {
		return color;// Override it
	}
	public function setCenter (pos:RCPoint) :RCPoint {
		this.center = pos;
		setX ( Std.int (pos.x - size.width/2) );
		setY ( Std.int (pos.y - size.height/2) );
		return this.center;
	}
	
	
	/**
	 *  Scale methods.
	 *  ScaleToFit - will fit the largest axis into the new bounds entirely.
	 *  ScaleToFill - will fill the new bounds entirely.
	 */
	public function scaleToFit (w:Int, h:Int) :Void {
		
		if (size.width/w > size.height/h && size.width > w) {
			setWidth ( w );
			setHeight ( this.width * size.height / size.width );
		}
		else if (size.height > h) {
			setHeight ( h );
			setWidth ( this.height * size.width / size.height );
		}
		else if (size.width > lastW_ && size.height > lastH_) {
			setWidth ( size.width );
			setHeight ( size.height );
		}
		else {
			resetScale();
		}
		
		lastW_ = this.width;
		lastH_ = this.height;
	}
	
	public function scaleToFill (w:Int, h:Int) :Void {
		
		if (w/size.width > h/size.height) {
			setWidth ( w );
			setHeight ( this.width * size.height / size.width );
		}
		else {
			setHeight ( h );
			setWidth ( this.height * size.width / size.height );
		}
	}

	public function scale (sx:Float, sy:Float) {}
	
	public function resetScale () :Void {
		setWidth ( lastW_ );
		setHeight ( lastH_ );
	}
	
	// Get mouse position
	function getMouseX () :Float {
		return 0;
	}
	function getMouseY () :Float {
		return 0;
	}
	
	
	
	// Add subviews
	public function addChild (child:RCView) :Void {}
	public function addChildAt (child:RCView, index:Int) :Void {}
	public function removeChild (child:RCView) :Void {}
	
	
	/**
	 *  Start an animation
	 **/
	public function addAnimation (obj:CAObject) :Void {
		CoreAnimation.add ( this.caobj = obj );
	}
	
	
	/**
	 *  Removes running animation, if any.
	 */
	public function destroy () :Void {
		CoreAnimation.remove ( caobj );
		size = null;
	}
	
	public function toString () :String {
		return "[RCView bounds:"+bounds+"]";
	}
}
