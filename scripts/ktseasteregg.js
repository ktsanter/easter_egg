//-------------------------------------------------------------------
// Easter egg class
//-------------------------------------------------------------------
// TODO:
//-------------------------------------------------------------------

class ktsEasterEgg {
  constructor(key) {
    this._version = '0.01';
    this._key = key;

    var eggInfo = this._getEggInfo(this._key);
    if (eggInfo.valid) {
      alert(eggInfo.courseName + '\n' + eggInfo.eggNumber);
      this._doAction(eggInfo.action);
    }    
  }
  
  _getEggInfo(key) {
    var eggInfo = {
      valid: false,
      courseName: null,
      eggNumber: null,
      action: {}  
    }
    
    if (key == 1) {
      eggInfo.valid = true;
      eggInfo.courseName = 'Foundations of Programming B';
      eggInfo.eggNumber = 3;
      eggInfo.action = {
        actionType: 'url',
        url: 'https://www.google.com/search?q=play+snake'
      }
    }
    
    return eggInfo;
  }
  
  _doAction(action) {
    if (action.actionType == 'url') {
      window.open(action.url, '_blank');
    } else {
      console.log('unrecognized actionType: ' + action.actionType);
    }
  }
}