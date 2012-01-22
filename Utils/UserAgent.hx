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
	OTHER;
}
