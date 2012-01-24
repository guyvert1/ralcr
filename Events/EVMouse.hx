#if (flash || nme)
import flash.events.FullScreenEvent;
import flash.display.StageDisplayState;
#end


class EVFullScreen extends RCSignal<Bool->Void> {

#if (flash || nme)
	public function new () {
		super();
		flash.Lib.current.stage.addEventListener (FullScreenEvent.FULL_SCREEN, fullScreenHandler);
	}
	function fullScreenHandler (e:FullScreenEvent) {
		dispatch ( [flash.Lib.current.stage.displayState == StageDisplayState.FULL_SCREEN] );
	}
#end
}
