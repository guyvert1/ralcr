//
//  iObserver
//
//  Created by Baluta Cristian on 2008-10-12.
//  Copyright (c) 2008 ralcr.com. 
//	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
//
package core.observer;

interface IObserver {
	
	public function update (o:Observable, infoObj:Dynamic) :Void {}
}
