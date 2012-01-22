//
//  SharedObjects
//	They are available anytime you open the application from the same computer
//
//  Created by Baluta Cristian on 2009-01-09.
//  Copyright (c) 2009-2012 http://ralcr.com. All rights reserved.
//

#if flash
	import flash.net.SharedObject;
#end


class RCUserDefaults {
	
	static var sharedObject :SharedObject;
	
	
	public static function init (?identifier:String="com.ralcr") :Void {
		if (sharedObject == null)
			sharedObject = SharedObject.getLocal ( identifier );
	}
	
	// Get objects from Shared object
	//
	public static function objectForKey (key:String) :Dynamic {
		init();
		return Reflect.field (sharedObject.data, key);
	}
	public static function arrayForKey (key:String) :Array<Dynamic> {
		return objectForKey ( key );
	}
	public static function boolForKey (key:String) :Bool {
		return objectForKey ( key ) == true;
	}
	public static function stringForKey (key:String) :String {
		return objectForKey ( key );
	}
	public static function intForKey (key:String) :Null<Int> {
		return objectForKey ( key );
	}
	public static function floatForKey (key:String) :Null<Float> {
		return objectForKey ( key );
	}
	
	
	
	public static function set (key:String, value:Dynamic) :Dynamic {
		init();
		try {
			Reflect.setField (sharedObject.data, key, value);
			sharedObject.flush();
		}
		catch (e:Dynamic) { trace("Error setting a SharedObject {"+e+"}"); }
		
		return value;
	}
	
	public static function removeObjectForKey (key:String) :Void {
		set (key, null);
	}
	public static function removeAllObjects () :Void {
		for (key in Reflect.fields(sharedObject.data)) {
			Reflect.deleteField (sharedObject.data, key);
		}
		sharedObject.flush();
	}
}


#if js

import js.Cookie;

class SharedObject {
	
	var identifier :String;
	public var data :Dynamic;
	
	public static function getLocal (identifier:String) :SharedObject {
		var so = new SharedObject(identifier);
		return so;
	}
	public function new (identifier:String) {
		this.identifier = identifier;
		this.data = {};
		
		// Gett all the data with this identifier and store it locally in 'data'
		for (key in Cookie.all().keys()) {
			if (key.indexOf(identifier) == 0)
				Reflect.setField (data, identifier + key, haxe.Unserializer.run ( Cookie.get (identifier + key)));
	}
	public function flush( ?minDiskSpace : Int ) : String {
		
		for (key in Cookie.all().keys()) {
			if (key.indexOf(identifier) == 0)
				Cookie.remove (identifier + key);
		}
		
		if (value != null)
			Cookie.set (identifier + key, haxe.Serializer.run(value));
		else
			Cookie.remove (identifier + key);
		
	}
}

#end