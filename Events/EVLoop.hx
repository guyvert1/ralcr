#if flash
	typedef Ticker = flash.display.Sprite;
#else
	typedef Ticker = haxe.Timer;
#end

class EVLoop {
	var ticker :Ticker;
	dynamic public function run () {}
	public function new () {
		#if flash
			ticker = new Ticker();
			ticker.addEventListener (flash.events.Event.ENTER_FRAME, loop);
		#else
			ticker = new Ticker ( 10 );
			ticker.run = loop;
		#end
	}
	function loop (#if flash _ #end) {
		if (run != null) run();
	}
	public function destroy () {
		#if flash
			ticker.removeEventListener (flash.events.Event.ENTER_FRAME, loop);
		#else
			ticker.stop();
		#end
	}
}
