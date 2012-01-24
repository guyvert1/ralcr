//
//  Main
//
//  Created by Cristi Baluta on 2010-05-28.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//
import js.Dom;
import RCView;
import RCWindow;

class Main {
	
	static var lin :RCLine;
	static var ph :RCPhoto;
	static var circ :RCEllipse;
	static var signal :RCSignal<Int->Void>;
	
	// change the HTML content of a DIV based on its ID
	static function main() {
		haxe.Firebug.redirectTraces();
		RCWindow.init();
		RCWindow.backgroundColor = 0xDDDDDD;
		
		var rect = new RCRectangle(200,30, 300, 150, 0xff3300);
	 	RCWindow.addChild ( rect );
		rect.clipsToBounds = true;
		rect.center = new RCPoint(RCWindow.width/2,RCWindow.height/2);
		
		circ = new RCEllipse(0,0, 100, 100, RCColor.darkGrayColor());
	 	RCWindow.addChild ( circ );
		//circ.center = new RCPoint(120,120);
		
/*		var anim = new CATween (rect, {x:50, y:120}, 1, 0, caequations.Cubic.IN_OUT);
		CoreAnimation.add ( anim );*/
		
/*		lin = new RCLine(30,300, 400, 600, 0xff3300);
		RCWindow.addChild ( lin );*/
		//js.Lib.document.onmousemove = moveLine;
		
		ph = new RCPhoto(1, 1, "../CoreAnimation/3134265_large.jpg");
		ph.onComplete = resizePhoto;
		rect.addChild ( ph );
		
		var f = new RCFont();
			f.color = 0xffffff;
			f.font = "Arial";
			f.size = 30;
		var t = new RCTextView (50, 30, null, null, "IMAGIN", f);
		//RCWindow.addChild ( t );
		
		var f2 = f.copy();
		f2.size = 16;
		var r = new RCTextRoll (50, 60, 200, null, "We are working on the HTML5 version of the gallery...", f2);
		RCWindow.addChild ( r );
		r.backgroundColor = 0xFFFFFF;
		
		var k = new RCKeys();
			k.onLeft = moveLeft;
			k.onRight = moveRight;
		
		signal = new RCSignal<Int->Void>();
		signal.add ( printNr );
		signal.addOnce ( printNr2 );
		signal.remove ( printNr );
		signal.removeAll();
		
		for (i in 0...5)
		signal.dispatch ([Math.random()]);
		
		
		// Shared objects
		RCUserDefaults.init("com.ralcr.html5.");
		trace(RCUserDefaults.stringForKey("key1"));
		RCUserDefaults.set ("key1", "blah blah");
		trace(RCUserDefaults.stringForKey("key1"));
		
		
		// Add some buttons
		var b = new RCControl(0,0);
		b.onClick = function(){trace("click");}
		b.onOver = function(){trace("over");}
		b.onOut = function(){trace("out");}
		b.onPress = function(){trace("press");}
		b.onRelease = function(){trace("release");}
		RCWindow.addChild ( b );b.addChild ( t );
    }
	
	
	
	
	
	
	static function moveLine(e:Event){
		lin.size.width = e.clientX - lin.x;
		lin.size.height = e.clientY - lin.y;
		lin.redraw();
	}
	static function resizePhoto(){
		trace("onComplete");
		trace(ph.width);
		trace(ph.size.width);
		ph.scaleToFill (300-2, 150-2);
		//ph.scaleToFit (300-2, 150-2);
		
		var anim = new CATween (ph, {x:{fromValue:-ph.width, toValue:ph.width}}, 2, 0, caequations.Cubic.IN_OUT);
			anim.repeatCount = 5;
			anim.autoreverses = true;
		CoreAnimation.add ( anim );
		
	}
	
	static function printNr(nr:Int){
		trace("printNr "+nr);
	}
	static function printNr2(nr:Int){
		trace("printNr2 "+nr);
	}
	static function moveLeft(){
		circ.x -= 10;
	}
	static function moveRight(){
		circ.x += 10;
	}
	
	
/*	static function Hi(){
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
	}*/
}
