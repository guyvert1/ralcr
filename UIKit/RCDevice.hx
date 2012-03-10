//
//  RCDevice.hx
//  UIKit
//
//  Copyright (c) 2012, ralcr.com. All rights reserved.
//

enum UIInterfaceOrientation {
    UIDeviceOrientationUnknown;
    UIDeviceOrientationPortrait;            // Device oriented vertically, home button on the bottom
    UIDeviceOrientationPortraitUpsideDown;  // Device oriented vertically, home button on the top
    UIDeviceOrientationLandscapeLeft;       // Device oriented horizontally, home button on the right
    UIDeviceOrientationLandscapeRight;      // Device oriented horizontally, home button on the left
    UIDeviceOrientationFaceUp;              // Device oriented flat, face up
    UIDeviceOrientationFaceDown;             // Device oriented flat, face down
}

enum UIUserInterfaceIdiom {
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
	
	public function new () {
		
	}
}


/*
#define UI_USER_INTERFACE_IDIOM() ([[UIDevice currentDevice] respondsToSelector:@selector(userInterfaceIdiom)] ? [[UIDevice currentDevice] userInterfaceIdiom] : UIUserInterfaceIdiomPhone)

#define UIDeviceOrientationIsPortrait(orientation)  ((orientation) == UIDeviceOrientationPortrait || (orientation) == UIDeviceOrientationPortraitUpsideDown)
#define UIDeviceOrientationIsLandscape(orientation) ((orientation) == UIDeviceOrientationLandscapeLeft || (orientation) == UIDeviceOrientationLandscapeRight)


@property(nonatomic,readonly,retain) NSString    *name;              // e.g. "My iPhone"
@property(nonatomic,readonly,retain) NSString    *model;             // e.g. @"iPhone", @"iPod touch"
@property(nonatomic,readonly,retain) NSString    *localizedModel;    // localized version of model
@property(nonatomic,readonly,retain) NSString    *systemName;        // e.g. @"iOS"
@property(nonatomic,readonly,retain) NSString    *systemVersion;     // e.g. @"4.0"
@property(nonatomic,readonly) UIDeviceOrientation orientation;       // return current device orientation.  this will return UIDeviceOrientationUnknown unless device orientation notifications are being generated.
@property(nonatomic,readonly,retain) NSString    *uniqueIdentifier  __OSX_AVAILABLE_BUT_DEPRECATED(__MAC_NA,__MAC_NA,__IPHONE_2_0,__IPHONE_5_0);  // a string unique to each device based on various hardware info.

@property(nonatomic,readonly,getter=isGeneratingDeviceOrientationNotifications) BOOL generatesDeviceOrientationNotifications;
- (void)beginGeneratingDeviceOrientationNotifications;      // nestable
- (void)endGeneratingDeviceOrientationNotifications;

@property(nonatomic,readonly) UIUserInterfaceIdiom userInterfaceIdiom __OSX_AVAILABLE_STARTING(__MAC_NA,__IPHONE_3_2);

UIKIT_EXTERN NSString *const UIDeviceOrientationDidChangeNotification;*/