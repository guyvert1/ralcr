//
//  HTTPRequest
//
//  Created by Baluta Cristian on 2008-09-06.
//  Copyright (c) 2008-2012 ralcr.com. All rights reserved.
//

#if flash
	import flash.net.URLVariables;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
#elseif js
	private class URLVariables implements Dynamic { public function new(){} }
	private typedef URLRequest = Dynamic;
	private typedef URLRequestMethod = Dynamic;
#end

class HTTPRequest extends RCRequest {
	
	var scripts_path :String; // Path to the folder that contains all php scripts
	
	
	public function new (?scripts_path:String) {
		this.scripts_path = scripts_path;
		super ();
	}
	
	
	/**
	 * Reads a file and returns it's raw data in public "result" variable.
	 */
	public function readFile (file:String) :Void {
		#if flash
			loader.load ( new URLRequest (file) );
		#elseif js
			load (file);
		#end
	}
	
	
	/**
	 * Read the content of a folder.
	 */
	public function readDirectory (directory:String) :Void {
		var variables = new URLVariables();
			variables.path = directory;
		
		load ( scripts_path + "filesystem/readDirectory.php", variables );
	}
	
	
	/**
	 * Call a custom script and pass some variables
	 */
	public function call (script:String, variables_list:Dynamic, ?method:String="POST") :Void {
		#if flash
		var variables = new URLVariables();
		if (variables_list != null)
			for (f in Reflect.fields (variables_list)) {
				Reflect.setField (variables, f, Reflect.field (variables_list, f));
			}
		
		var request = new URLRequest ( scripts_path + script );
			request.data = variables;
			request.method = method=="POST" ? URLRequestMethod.POST : URLRequestMethod.GET;
		
		loader.load ( request );
		#elseif js
			
		#end
	}
}
