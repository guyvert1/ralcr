//
//  RCAppDelegate
//	Your application should extend this class
//
//  Created by Cristi Baluta on 2010-05-14.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//

#if (flash || nme)
	import flash.display.MovieClip;
#elseif js
	private typedef MovieClip = JSView;
#end

class RCAppDelegate extends MovieClip {
	
	public function new () {
		super(#if js 0, 0 #end);
		
		// The RCWindow should be initialized before anything
		RCWindow.init();
		RCNotificationCenter.addObserver ("resize", resize);
		RCNotificationCenter.addObserver ("fullscreen", fullscreen);
		
		applicationDidFinishLaunching();
	}
	
	// Override this methods
	public function applicationDidFinishLaunching () :Void {}
	public function applicationDidBecomeActive () :Void {}
	public function applicationWillEnterForeground () :Void {}
	public function applicationWillTerminate () :Void {}
	public function resize (w:Int, h:Int) :Void {}
	public function fullscreen (b:Bool) :Void {}
}
