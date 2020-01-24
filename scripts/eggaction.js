//-------------------------------------------------------------------
// eggaction: Easter Egg action class
//-------------------------------------------------------------------
// TODO: 
//-------------------------------------------------------------------

class EggAction {
  constructor (actionInfo) {
    this._actionInfo = actionInfo;        
  }  
	
  //-----------------------------------------------------------------------------
  // action methods
  //-----------------------------------------------------------------------------  
  doAction () {
    console.log('doAction: ');
    console.log(this._actionInfo.action);
    console.log(JSON.stringify(this._actionInfo.actionArg));
    this._setDisplay(this._actionInfo.container, true);
    this._actionInfo.container.innerHTML = this._actionInfo.action + '<br>' + JSON.stringify(this._actionInfo.actionArg);
  }  
  
  //---------------------------------------
  // utility functions
  //----------------------------------------  
  _setDisplay(elem, display) {
    if (elem.classList.contains('egghide')) {
      elem.classList.remove('egghide');
    }
    if (!display) {
      elem.classList.add('egghide');
    }
  }  
}
