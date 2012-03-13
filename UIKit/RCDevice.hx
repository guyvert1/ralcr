//
//  RCDevice.hx
//  UIKit
//
//  Updated 2012, ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//

enum RCDeviceOrientation {
    UIDeviceOrientationUnknown;
    UIDeviceOrientationPortrait;            // Device oriented vertically, home button on the bottom
    UIDeviceOrientationPortraitUpsideDown;  // Device oriented vertically, home button on the top
    UIDeviceOrientationLandscapeLeft;       // Device oriented horizontally, home button on the right
    UIDeviceOrientationLandscapeRight;      // Device oriented horizontally, home button on the left
    UIDeviceOrientationFaceUp;              // Device oriented flat, face up
    UIDeviceOrientationFaceDown;            // Device oriented flat, face down
}

enum RCDeviceType {
    IPhone;
    IPad;
	Android;
	WebOS;
	Mac;
	Flash;
}


class RCDevice {
	
	static var _currentDevice :RCDevice;
	public static function currentDevice () :RCDevice {
		if (_currentDevice == null)
			_currentDevice = new RCDevice();
		return _currentDevice;
	}
	
	
	public var name :String;// e.g. "My iPhone"
	public var model :String;// e.g. @"iPhone", @"iPod touch"
	public var systemName :String;// e.g. @"iOS"
	public var systemVersion :String;// e.g. @"5.0"
	public var orientation :RCDeviceOrientation;
	public var userInterfaceIdiom :RCDeviceType;
	public var uniqueIdentifier :String;// a string unique to each device based on various hardware info.
	
	public function new () {
		
	}
}
