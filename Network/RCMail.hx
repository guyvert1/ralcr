//
//  RCMail
//
//  Created by Baluta Cristian on 2008-07-23.
//  Copyright (c) 2008 milc.ro. All rights reserved.
//
/**
 *  Sent mails through the mail php script
 **/

#if (flash || (flash && nme))
	import flash.net.URLRequest;
	import flash.net.URLVariables;
	import flash.net.URLRequestMethod;
#else
	private class URLVariables implements Dynamic { public function new(){} }
	private typedef URLRequestMethod = Dynamic;
	#if nme
		import flash.net.URLRequest;
	#end
	#if js
		private typedef URLRequest = Dynamic;
	#end
#end


class RCMail extends RCRequest {
	
	var scripts_path :String;
	
	
	public function new (scripts_path:String) {
		this.scripts_path = scripts_path;
		super();
	}
	
	public function send (to:String, subject:String, message:String, from:String) :Void {
		
		var variables = new URLVariables();
			variables.to = to;
			variables.subject = subject;
			variables.message = message;
			variables.from = from;
		
		var request = new URLRequest (scripts_path + "others/sendMail.php");
			request.data = variables;
			request.method = URLRequestMethod.POST;
		
		loader.load ( request );
	}
}
