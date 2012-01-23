import js.Lib;

class UserAgentUtil
{
	private function new() {}
	
	public static var userAgent = detectUserAgent();
	
	static function detectUserAgent()
	{
		var agent = Lib.window.navigator.userAgent.toLowerCase();
		if (agent.indexOf("msie") > -1) return MSIE;
		if (agent.indexOf("webkit") > -1) return WEBKIT;
		if (agent.indexOf("gecko") > -1) return GECKO;
		return OTHER;
	}
	
	public static function isUserAgent(id:String):Bool
	{
		return (Lib.window.navigator.userAgent.toLowerCase().indexOf(id) >= 0);
	}
}

enum UserAgent
{
	MSIE;
	GECKO;
	WEBKIT;
	IOS;
	OTHER;
}

goog.provide('lime.userAgent');

goog.require('goog.userAgent');


(function() {


var ua = goog.userAgent.getUserAgentString();

/**
 * Whether the user agent is running on iOS device
 * @type boolean
 */
lime.userAgent.IOS = goog.userAgent.WEBKIT && goog.userAgent.MOBILE &&
    (/(ipod|iphone|ipad)/i).test(ua);

/**
 * Whether the user agent is running iOS5
 * @type boolean
 */
lime.userAgent.IOS5 = lime.userAgent.IOS && goog.isFunction(Object['freeze']); // User-agent still shows 4.3 on beta


/**
 * Whether the user agent is running on Android device
 * @type boolean
 */
lime.userAgent.ANDROID = goog.userAgent.WEBKIT && goog.userAgent.MOBILE &&
    (/(android)/i).test(ua);


/**
 * Whether the user agent is running on iPad
 * @type boolean
 */
lime.userAgent.IPAD = lime.userAgent.IOS && (/(ipad)/i).test(ua);


/**
 * Whether the user agent is running on iPhone 4
 * @type boolean
 */
lime.userAgent.IPHONE4 = lime.userAgent.IOS &&
    goog.global['devicePixelRatio'] >= 2;


/**
 * Whether the user agent is running on Blackberry Playbook
 * @type boolean
 */
lime.userAgent.PLAYBOOK = goog.userAgent.WEBKIT && (/playbook/i).test(ua);


/**
 * Whether the user agent is running on touch based device
 * @type boolean
 */
lime.userAgent.SUPPORTS_TOUCH = goog.isDef(document['ontouchmove']);


})();
