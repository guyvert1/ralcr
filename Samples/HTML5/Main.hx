//
//  Main
//
//  Created by Cristi Baluta on 2010-05-28.
//  Copyright (c) 2010 ralcr.com. All rights reserved.
//
//import js.Dom;
import RCView;
import RCWindow;

class Main {
	
	static var lin :RCLine;
	static var ph :RCImage;
	static var circ :RCEllipse;
	static var req :HTTPRequest;
	static var signal :RCSignal<Int->Void>;
	
	// change the HTML content of a DIV based on its ID
	static function main() {
		haxe.Firebug.redirectTraces();
		trace(#if flash "FLASH" #else "JS" #end);
		try{trace("BEGIN");
		RCWindow.init();
		//RCWindow.setTarget ("js");
		RCWindow.backgroundColor = 0xDDDDDD;
		
		FontManager.init();
		RCLib.loadFileWithKey("photo", "../CoreAnimation/3134265_large.jpg");
		RCLib.loadFileWithKey("some_text", "data.txt");
		RCLib.onComplete = function(){trace("RCLib did finish loading assets"); trace(RCLib.getFileWithKey("some_text"));}
		
		var rect = new RCRectangle(0,0, 300, 150, RCColor.greenColor());
	 	RCWindow.addChild ( rect );
		rect.clipsToBounds = true;
		rect.center = new RCPoint(RCWindow.width/2 /* - #if flash 0 #else RCWindow.width/4 #end*/, RCWindow.height/2);
		
		circ = new RCEllipse(0,0, 100, 100, RCColor.darkGrayColor());
	 	RCWindow.addChild ( circ );
		//circ.center = new RCPoint(120,120);
		
		
		var a1=new CATween (circ, {x:RCWindow.width-100, y:0}, 2, 0, caequations.Cubic.IN_OUT);
		var a2=new CATween (circ, {x:RCWindow.width-100, y:RCWindow.height-100}, 2, 0, caequations.Cubic.IN_OUT);
		var a3=new CATween (circ, {x:0, y:RCWindow.height-100}, 2, 0, caequations.Cubic.IN_OUT);
		var a4=new CATween (circ, {x:0, y:0}, 2, 0, caequations.Cubic.IN_OUT);
		
		var seq = new CASequence ([cast a1, cast a2, cast a3, cast a4]);
		seq.start();
		
/*		lin = new RCLine(30,300, 400, 600, 0xff3300);
		RCWindow.addChild ( lin );*/
		
		ph = new RCImage(1, 1, "../CoreAnimation/3134265_large.jpg");
		ph.onComplete = resizePhoto;
		rect.addChild ( ph );
		
		var f = new RCFont();
			f.color = 0xFFFFFF;
			f.font = "Arial";
			f.size = 30;
			f.embedFonts = false;
		var t = new RCTextView (50, 30, null, null, "HTML5", f);
		RCWindow.addChild ( t );
		
		var f2 = f.copy();
			f2.color = 0x333333;
			f2.size = 16;
		var r = new RCTextRoll (50, 60, 200, null, "We are working on the HTML5 version of the gallery...", f2.copy());
		RCWindow.addChild ( r );
		r.start();
		r.backgroundColor = 0xFFFFFF;
		
		var k = new RCKeys();
			k.onLeft = moveLeft;
			k.onRight = moveRight;
		
		var m = new RCMouse( rect.view );
			m.onOver = function(){ trace("onOver"); }
		
		signal = new RCSignal<Int->Void>();
		signal.add ( printNr );
		signal.addOnce ( printNr2 );
		signal.remove ( printNr );
		signal.removeAll();
		
		for (i in 0...5)
		signal.dispatch ([Math.random()]);
		
		
		// Shared objects
/*		RCUserDefaults.init("com.ralcr.html5.");
		trace(RCUserDefaults.stringForKey("key1"));
		RCUserDefaults.set ("key1", "blah blah");
		trace(RCUserDefaults.stringForKey("key1"));*/
		
		
		// Add some buttons
		var s = new haxe.SKButton("Play");
		var b = new RCButton(50, 200, s);
		b.onClick = function(){trace("click");}
		b.onOver = function(){trace("over");}
		b.onOut = function(){trace("out");}
		b.onPress = function(){trace("press");}
		b.onRelease = function(){trace("release");}
		RCWindow.addChild ( b );
		
		var s = new haxe.SKButtonRadio();
		var b = new RCButtonRadio(200, 200, s);
		RCWindow.addChild ( b );
		trace("1");
		var group = new RCGroup<RCButtonRadio> (200,230,10,null,createRadioButton);
		RCWindow.addChild ( group );
		group.add([1,2,3,4,5,5]);
		trace("1");
		var group = new RCSegmentedControl (200,300,10,null,createRadioButton2);
		RCWindow.addChild ( group );
		group.add(["1","2","3","4","5"]);
		trace("1");
		// Add slider
		var s = new haxe.SKSlider(160, 8);trace(1);
		var sl = new RCSlider(50, 250, s);trace(1);
		//sl.valueChanged.add ( function(e:RCSlider){trace(e.value);} );
		RCWindow.addChild ( sl );
		//sl.maxValue = 500;
		sl.value = 30;
		
/*		var swf = new RCSwf(200,0,"../HeartEquation/heart.swf");
		RCWindow.addChild(swf);*/
		
		req = new HTTPRequest();
		req.onComplete = function (){ trace(req.result); }
		req.onError = function (){ trace(req.result); }
		req.onStatus = function (){ trace(req.status); }
		req.readFile("data.txt");
		
		}catch(e:Dynamic){Fugu.stack();}
    }
	static function createRadioButton (indexPath:RCIndexPath) :RCButtonRadio {
		trace(indexPath);
		var s = new haxe.SKButtonRadio();
		var b = new RCButtonRadio(0,0,s);
		return b;
	}
	static function createRadioButton2 (i:Int) :RCButtonRadio {
		var s = new haxe.SKButton("lklklk"+Std.random(10));
		var b = new RCButtonRadio(0,0,s);
		return b;
	}
	
	
	
	
	
/*	static function moveLine(e:Event){
		lin.size.width = e.clientX - lin.x;
		lin.size.height = e.clientY - lin.y;
		lin.redraw();
	}*/
	static function resizePhoto(){
		trace("onComplete");
		trace(ph.width);
		trace(ph.size.width);
		ph.scaleToFill (300-2, 150-2);
		//ph.scaleToFit (300-2, 150-2);
		
		var ph2 = ph.copy();trace(ph2);
		ph2.x = 800;
		RCWindow.addChild(ph2);
		
		return;
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
}
