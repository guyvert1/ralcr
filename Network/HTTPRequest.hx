//
//  HTTPRequest
//
//  Created by Baluta Cristian on 2008-09-06.
//  Copyright (c) 2008-2012 ralcr.com. All rights reserved.
//

#if (flash || (flash && nme))
	import flash.net.URLVariables;
#elseif js
	private class URLVariables implements Dynamic { public function new(){} }
#end


class HTTPRequest extends RCRequest {
	
	var scripts_path :String; // Path to the folder that contains all php scripts
	
	/**
	 *  Some of the features work hand in hand with the php scripts, so we need to pass the parth to them.
	 **/
	public function new (?scripts_path:String) {
		this.scripts_path = scripts_path;
		super();
	}
	
	
	/**
	 * Reads a file and returns it's raw data in public "result" variable.
	 */
	public function readFile (file:String) :Void {
		load ( file );
	}
	
	
	/**
	 * Read the content of a folder.
	 */
	public function readDirectory (directoryName:String) :Void {
		var variables = new URLVariables();
			variables.path = directoryName;
		
		load ( scripts_path + "filesystem/readDirectory.php", variables );
	}
	
	
	/**
	 * Call a custom script and pass some variables
	 */
	public function call (script:String, variables_list:Dynamic, ?method:String="POST") :Void {
		#if (flash || nme)
			var variables = new URLVariables();
			if (variables_list != null)
				for (f in Reflect.fields (variables_list)) {
					Reflect.setField (variables, f, Reflect.field (variables_list, f));
				}
			load (scripts_path + script, variables, method);
		#elseif js
			
		#end
	}
}
