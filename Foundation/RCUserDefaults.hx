//
//  SharedObjects
//	They are available anytime you open the application from the same computer
//
//  Created by Baluta Cristian on 2009-01-09.
//  Copyright (c) 2009-2012 http://ralcr.com. All rights reserved.
//

#if flash
	import flash.net.SharedObject;
#elseif js
	import js.Cookie;
#end


class RCUserDefaults {

	static var inited :Bool = false;
	static var sharedObject :SharedObject;
	static var identifier :String;
	
	
	public static function init (?identifier_:String="ralcr") :Void {
		if (inited) return;
		identifier = identifier_;
#if flash
		sharedObject = SharedObject.getLocal ( identifier );
#end
		inited = true;
	}
	
	// Get objects from Shared object
	//
	public static function objectForKey (key:String) :Dynamic {
		init();
#if flash
		return Reflect.field (sharedObject.data, key);
#elseif js
		return deserialize ( Cookie.get (identifier + key) );
#end
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
#if flash
			Reflect.setField (sharedObject.data, key, value);
			sharedObject.flush();
#elseif js
			Cookie.set (ide + key, serialize(value));
#end
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






class LocalStorage<T> extends LocalStorageBase<T>
{
	var internal:Hash<T>;
	
	public function new(nameSpace:String)
	{
		super(nameSpace);
		internal = new Hash();
	}
	
	override public function get(key:String):T
	{
		if (internal.exists(key))
			return internal.get(key);
			
		
		if (value != null) internal.set(key, value);
		
		return value;
	}
	
	override public function set(key:String, value:T)
	{
		internal.set(key, value);
		 
	}
	
	override public function remove(key:String)
	{
		if (internal.exists(key))
		{
			internal.remove(key);
			Cookie.remove(nameSpace + key);
			return true;
		}
		return false;
	}
	
	override public function exists(key:String):Bool
	{
		if (!internal.exists(key))
			return Cookie.exists(nameSpace + key);
		return true;
	}
	
	override public function save()
	{
		for (key in internal.keys())
			set(key, internal.get(key));
	}
	
	override public function clear()
	{
		for (key in keys())
			remove(key);
	}
	
	override public function keys():Iterator<String>
	{
		var keys = [];
		for (key in Cookie.all().keys())
		{
			if (key.indexOf(nameSpace) == 0)
				keys.push(key.substr(nameSpace.length));
		}
		return keys.iterator();
	}
	
	function serialize(value:T):String
	{
		if (value == null)
			return null;
		
		try
		{
			return haxe.Serializer.run(value);
		}
		catch(e:Dynamic)
		{
			return Std.string(value);
		}
	}
	
	function deserialize(value:String):T
	{
		if (value == null)
			return null;
		
		try
		{
			return haxe.Unserializer.run(value);
		}
		catch(e:Dynamic)
		{
			return cast value;
		}
	}
}
