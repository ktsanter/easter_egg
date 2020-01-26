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
    var actionRouter = {
      'google_search': this._actionGoogleSearch,
      'url': this._actionURL
    };
    
    this._clearElement(this._actionInfo.container);
    this._showCongratulations();

    var action = this._actionInfo.action;
    if (actionRouter.hasOwnProperty(action)) {
      actionRouter[action](this); 
      
    } else {
      console.log('no router entry for action: ' + action);
      this._badAction();
    }
    
    this._setDisplay(this._actionInfo.container, true);
  }  
  
  _showCongratulations() {
    var congratsContainer = CreateElement.createDiv(null, 'egg-congrats');
    this._actionInfo.container.appendChild(congratsContainer);
    
    congratsContainer.appendChild(CreateElement.createDiv(null, null, 'Congratulations!  You\'ve found answer #' + this._actionInfo.responseNum));
    
    var msg = 'Let ' + this._actionInfo.instructor + ' know by sending a message or text with this phrase: <em>' + this._actionInfo.confirmPhrase + '</em>';
    congratsContainer.appendChild(CreateElement.createDiv(null, null, msg)); 
  }
  
  _actionGoogleSearch(me) {
    var rewardContainer = CreateElement.createDiv(null, 'eg-reward');
    me._actionInfo.container.appendChild(rewardContainer);
    
    var searchPhrase = me._actionInfo.actionArg[0];
    var msg = 'Here\'s a little something fun to try: do a Google search for <em>' + searchPhrase + '</em>';
    rewardContainer.appendChild(CreateElement.createDiv(null, 'egg-reward', msg));
  }
  
  _actionURL(me) {
    var rewardContainer = CreateElement.createDiv(null, 'egg-reward');
    me._actionInfo.container.appendChild(rewardContainer);
    
    var msg = 'Here\'s a little something fun to try: click on this link to ';
    rewardContainer.appendChild(CreateElement.createSpan(null, null, msg));
    
    var url = me._actionInfo.actionArg[0];
    var elemLink = CreateElement.createLink(null, null, 'something fun', null, url);
    elemLink.target = '_blank';
    rewardContainer.appendChild(elemLink);
  }
  
  _badAction() {
    var container = this._actionInfo.container;
    
    var msg = 'Oops!  Something went wrong and I can\'t figure out the right reward for this answer. ';
    msg += 'Please let ' + this._actionInfo.instructor + ' know about this when you get the chance.';
    container.appendChild(CreateElement.createDiv(null, null, msg));
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
  
  _clearElement(elem) {
    while (elem.firstChild) elem.removeChild(elem.firstChild);
  }
}
