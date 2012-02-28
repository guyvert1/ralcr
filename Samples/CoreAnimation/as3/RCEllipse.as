package  {
	import flash.Boot;
	public class RCEllipse extends RCDraw implements RCDrawInterface{
		public function RCEllipse(x : Number = NaN,y : Number = NaN,w : * = null,h : * = null,color : * = null,alpha : Number = 1.0) : void { if( !flash.Boot.skip_constructor ) {
			super(x,y,w,h,color,alpha);
			this.redraw();
		}}
		
		public function redraw() : void {
			layer.graphics.clear();
			this.configure();
			layer.graphics.drawEllipse(0,0,this.w,this.h);
			layer.graphics.endFill();
		}
		
	}
}
