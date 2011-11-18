//
//  Draws a line from x1,y1, to x2,y2
//
//  Created by Baluta Cristian on 2008-10-11.
//  Copyright (c) 2008 ralcr.com. All rights reserved.
//
class RCLine extends RCDraw, implements RCDrawInterface {
	
	public var lineWeight :Int;
	
	/**
	 *	Draws a line of lineWeight px from x1, y1 to x2, y2
	 */
	public function new (x1:Float, y1:Float, x2:Float, y2:Float, color:Int, ?alpha:Float=1.0, ?lineWeight:Int=1) {
		super (x1, y1, x2-x1, y2-y1, color, alpha);
		
		this.lineWeight = lineWeight;
		this.redraw();
	}
	
	public function redraw () :Void {
		
		this.graphics.clear();
		this.graphics.lineStyle (lineWeight, color.fillColor);
		this.graphics.moveTo (0, 0);
		this.graphics.lineTo (size.width, size.height);
	}
}
//Draw Line between the 2 specified points based on Mid point Algorithm.
/*function drawLine(pen,point0,point1)
{
	//Check arguments for null values
	if(!pen || !point0 || !point1)
		return false;
		
    var lineDiv=canvasDiv.appendChild(document.createElement("div"));
    
    //Some library functions use drawLine method and need to pass physical points only. So the following check.
    if(arguments[3]!="physical") 
    {
    	phPoint0=logicalToPhysicalPoint(point0);
   	    phPoint1=logicalToPhysicalPoint(point1);
    }
    else
    {
    	phPoint0=new jsPoint(point0.x,point0.y);
    	phPoint1=new jsPoint(point1.x,point1.y);
    }

 	var x0, x1, y0, y1;
 	x0=phPoint0.x;
 	x1=phPoint1.x;
 	y0=phPoint0.y;
 	y1=phPoint1.y;
 	
 	var hexColor=pen.color.getHex();
 	//For Horizontal line
 	if(y0==y1)
 	{
 		if(x0<=x1)
	 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + (x1-x0+1) + "px;height:" + pen.width + ";background-color:" + hexColor + "\"></DIV>";
 		else if(x0>x1)
	 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x1 + "px;top:" + y0 + "px;width:" + (x0-x1+1) + "px;height:" + pen.width + ";background-color:" + hexColor + "\"></DIV>";
	 		
 		return lineDiv;
 	}
 	
 	//For Vertical line
 	if(x0==x1)
 	{
 		if(y0<=y1)
	 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y0 + "px;width:" + pen.width + ";height:" + (y1-y0+1) + "px;background-color:" + hexColor + "\"></DIV>";
 		else if(y0>y1)
	 		lineDiv.innerHTML="<DIV style=\"position:absolute;overflow:hidden;left:" + x0 + "px;top:" + y1 + "px;width:" + pen.width + ";height:" + (y0-y1+1) + "px;background-color:" + hexColor + "\"></DIV>";
	 		
 		return lineDiv;
 	}
	
    var iHtml=new Array();
 	var yArray=new Array();
 	
 	///Pixel Height Width Start
	var dx=Math.abs(x1-x0);
 	var dy=Math.abs(y1-y0);
 	var pixHeight,pixWidth;
 	var penWidth=parseInt(pen.width);
 	
 	pixHeight=Math.round(Math.sqrt((penWidth*penWidth)/((dy*dy)/(dx*dx)+1)));
 	pixWidth=Math.round(Math.sqrt(penWidth*penWidth-pixHeight*pixHeight));

 	if(pixWidth==0)
 	{
 		pixWidth=1;
 	}
 	if(pixHeight==0)
 	{
 		pixHeight=1;
 	}
 	///Pixel Height Width End

 	var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0); 
	if (steep)
	{   
		// swap   
		var tmp=x0;
		x0=y0;
		y0=tmp;
		tmp=x1;
		x1=y1;
		y1=tmp;
	}

	if (x0 > x1)
	{   
		// swap   
		var tmp=x0;
		x0=x1;
		x1=tmp;
		tmp=y0;
		y0=y1;
		y1=tmp;
	}
	
	var deltax = x1 - x0;
	var deltay = Math.abs(y1 - y0);
	var error  = deltax/2;
	var ystep;
	var y = y0;
	
	if (y0<y1) 
		ystep = 1; 
	else 
		ystep = -1;
		
	var xp,yp;
	var divWidth=0;
	var divHeight=0;
	if(steep)
	{
		divWidth=pixWidth;
	}
	else
	{
		divHeight=pixHeight;
	}
	for (x=x0;x<=x1;x++)
	{
		if (steep)
		{ 
			if(x==x0)
			{
				xp=y;
				yp=x;
			}
			else
			{
				if(y==xp)
				{
					divHeight=divHeight+ 1;
				}
				else
				{
					divHeight=divHeight+pixHeight;
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
					divHeight=0;		
					xp=y;
   					yp=x;		
				}
			}
			
			if(x==x1)
			{
				if(divHeight!=0)
				{
					divHeight=divHeight+pixHeight;
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				}
				else
				{
					divHeight=pixHeight;
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + y + "px;top:" + x + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				}
			}
		}
		else
		{ 
			if(x==x0)
			{
				xp=x;
				yp=y;
			}
			else
			{
				if(y==yp)
				{
					divWidth=divWidth + 1;
				}
				else
				{
					divWidth=divWidth+pixWidth;
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
 					divWidth=0;
					xp=x;
					yp=y;			
				}
			}	
			if(x==x1)
			{
				if(divWidth!=0)
				{
					divWidth=divWidth+pixWidth;
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + xp + "px;top:" + yp + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				}
				else
				{
					divWidth=pixWidth;
					iHtml[iHtml.length]="<DIV style=\"position:absolute;overflow:hidden;left:" + x + "px;top:" + y + "px;width:" + divWidth+ "px;height:" + divHeight + "px;background-color:" + hexColor + "\"></DIV>";
				}
			}
		}

		error = error - deltay;
		if (error < 0)
		{     
			y = y + ystep;
 			error = error + deltax;
		}
	}
	
	lineDiv.innerHTML=iHtml.join("");
	return lineDiv;
}

//Private function returns array of x coordinates for y values
//for a line (algorithm same as drawLine method). 
//Used by drawArc, fillArc and fillPolygon methods.
function getLinePixels(point0,point1)
{
	function xData()
	{
		this.xMax=0;
		this.xMin=0;
		this.isVertex=false;
	}
	
 	var x0, x1, y0, y1;
 	x0=point0.x;
 	x1=point1.x;
 	y0=point0.y;
 	y1=point1.y;
 	var xDataArray=new Array();
 	var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0); 
	if (steep)
	{   
		// swap   
		var tmp=x0;
		x0=y0;
		y0=tmp;
		tmp=x1;
		x1=y1;
		y1=tmp;
	}

	if (x0 > x1)
	{   
		// swap   
		var tmp=x0;
		x0=x1;
		x1=tmp;
		tmp=y0;
		y0=y1;
		y1=tmp;
	}

	var deltax = x1 - x0;
	var deltay = Math.abs(y1 - y0);
	var error  = deltax/2;
	var ystep;
	var y = y0;
	
	if (y0<y1) 
		ystep = 1; 
	else 
		ystep = -1;
		
	for (x=x0;x<=x1;x++)
	{
		if (steep)
		{ 
	   		xDataArray[x]=new xData();
	   		xDataArray[x].xMin=y;
	   		xDataArray[x].xMax=y;
	   		
	   		if(x==x0 && y==y0)
	   			xDataArray[x].isVertex=true;	
		}
		else
		{ 
			if(!xDataArray[y])
			{
				xDataArray[y]=new xData();
				xDataArray[y].xMin=x;
		   		xDataArray[y].xMax=x;
		   		
		   		if(x==x0 && y==y0)
		   			xDataArray[y].isVertex=true;	
			}
			else
			{
				xDataArray[y].xMax=x;
			}
		}

		error = error - deltay;
		if (error < 0)
		{     
			y = y + ystep;
 			error = error + deltax;
		}
	}
	return xDataArray;
}*/