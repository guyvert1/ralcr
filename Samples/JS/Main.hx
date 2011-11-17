//
//  Main
//
//  Created by Cristi Baluta on 2010-05-28.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//
import js.Dom;
import RCView;

class Main {
	
	// change the HTML content of a DIV based on its ID
	static function main() {
		haxe.Firebug.redirectTraces();
		
		var root = js.Lib.document.getElementById("main");
		root.style.position = "absolute";
		var sprite = new RCView(200,100);
		root.appendChild ( sprite.view );
		
		var rect = new RCRectangle(20,30, 100, 50, 0xffff33);
		root.appendChild ( rect.view );
		
/*		var buttonnode= js.Lib.document.createElement('input');
			buttonnode.setAttribute('type','button');
			buttonnode.setAttribute('name','sal');
			buttonnode.setAttribute('value','sal');*/
		//js.Lib.document.appendChild ( buttonnode );
		
		//New Part here
		//buttonnode.onClick = Hi;
		//setContent ("test", buttonnode);
		
		//js.Lib.document.createElement('draw');
		
    }
	static function Hi(){
		trace("psst");
	}
	
	//
	static function setContent(id, content) {
        var d = js.Lib.document.getElementById(id);
        if( d == null )
            js.Lib.alert("Unknown element : "+id);
        d.innerHTML = content;
    }
	
    // create a javascript HTML link
    static function makeLink(title, code) {
        return '<a href="javascript:'+code+'">'+title+'</a>';
    }
	
    // function called when the user click on the link
    static function click() {
        //setContent("main","Congratulations !");
		setContent ("main", haxe.Http.requestUrl("data.xml"));
    }
	static function clickAsync(xml:String) {
		trace("click async");
	    var r = new haxe.Http(xml);
			//r.setParameter("param","value");
	    	r.onError = js.Lib.alert;
	    	r.onData = function(r) { setContent("main", r); }
	    	r.request(false);
	}
}
