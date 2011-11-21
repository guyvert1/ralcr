//
//  Main
//
//  Created by Cristi Baluta on 2010-05-28.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//
import js.Dom;
import RCView;
import RCStage;

class Main {
	
	// change the HTML content of a DIV based on its ID
	static function main() {
		haxe.Firebug.redirectTraces();
		RCStage.init();
		
		var rect = new RCRectangle(200,30, 180, 150, 0xff3300);
	 	RCStage.addChild ( rect );
		
		var ell = new RCEllipse(100,100, 100, 100, 0xff3300);
	 	RCStage.addChild ( ell );
		
		var lin = new RCLine(30,300, 400, 600, 0xff3300);
/*		lin.lineWeight = 4;
		lin.redraw();*/
	 	RCStage.addChild ( lin );
		
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
