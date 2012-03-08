//
//  RCAppDelegate.hx
//	Your application main should extend this class
//
//  Created by Cristi Baluta on 2010-05-14.
//  Copyright (c) 2010-2012 ralcr.com. All rights reserved.
//

class RCAppDelegate extends RCView {
	
	public function new () {
		super (0, 0);
		
		// The RCWindow should be initialized before anything
		RCWindow.init();
		RCNotificationCenter.addObserver ("resize", resize);
		RCNotificationCenter.addObserver ("fullscreen", fullscreen);
		
		applicationDidFinishLaunching();
		#if (nme && (cpp || neko))
			RCWindow.stage.onQuit = applicationWillTerminate;
		#end
	}
	
	// Override this methods
	public function applicationDidFinishLaunching () :Void {}
	public function applicationDidBecomeActive () :Void {}
	public function applicationWillEnterForeground () :Void {}
	public function applicationWillTerminate () :Void {
		trace("applicationWillTerminate");
		#if (nme && (cpp || neko))
			nme.Lib.close();
		#end
	}
	public function resize (w:Int, h:Int) :Void {}
	public function fullscreen (b:Bool) :Void {}
}
