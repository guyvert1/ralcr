//
//  RCDevice.hx
//  UIKit
//
//  Copyright (c) 2012, ralcr.com. All rights reserved.
//

enum UIDeviceOrientation {
    UIDeviceOrientationUnknown,
    UIDeviceOrientationPortrait,            // Device oriented vertically, home button on the bottom
    UIDeviceOrientationPortraitUpsideDown,  // Device oriented vertically, home button on the top
    UIDeviceOrientationLandscapeLeft,       // Device oriented horizontally, home button on the right
    UIDeviceOrientationLandscapeRight,      // Device oriented horizontally, home button on the left
    UIDeviceOrientationFaceUp,              // Device oriented flat, face up
    UIDeviceOrientationFaceDown             // Device oriented flat, face down
}

enum UIUserInterfaceIdiom {
    IPhone,
    IPad,
	Android,
	WebOS,
	Mac,
	Flash
}


class RCDevide {
	
	public static function currentDevice () :RCDevide {
		
	}
}



/* The UI_USER_INTERFACE_IDIOM() macro is provided for use when deploying to a version of the iOS less than 3.2. If the earliest version of iPhone/iOS that you will be deploying for is 3.2 or greater, you may use -[UIDevice userInterfaceIdiom] directly.
 */
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

UIKIT_EXTERN NSString *const UIDeviceOrientationDidChangeNotification;