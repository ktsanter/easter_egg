//-------------------------------------------------------------------
// Easter egg landing page
//-------------------------------------------------------------------
// TODO:
//-------------------------------------------------------------------

const app = function () {
  const apiInfo = {
    apibase: 'https://script.google.com/macros/s/AKfycbxhcvKSo_zgS0et0WYFDoauINTH8n0FDGhhChnoId2dSOSQtrqy/exec',
    apikey: 'MVeastereggAPI'
  };

	const page = {};
	const settings = {
    sourcefileid: '1loq7XcF_7Y0yXIej4tgNZkFo70TODivjiBtKHEvOMdY',
    config: null
  };
  
	//---------------------------------------
	// get things going
	//----------------------------------------
	async function init (navmode) {
		page.body = document.getElementsByTagName('body')[0];
    
    page.notice = new StandardNotice(page.body, page.body);

/*
    var expectedQueryParams = [
      {key: 'sourcefilelink', required: true},
      {key: 'instance', required: true}
    ];
    if (_initializeSettings(expectedQueryParams)) {
*/      
    if (true) {
			page.notice.setNotice('loading configuration data...', true);
            
      var configRequestParams = {
        sourcefileid: settings.sourcefileid,
        configname: 'js_gamedesign'
      };
      var requestResult = await googleSheetWebAPI.webAppGet(apiInfo, 'config', configRequestParams, page.notice);
      if (requestResult.success) {
        settings.config = requestResult.data;
        page.notice.setNotice('');
        page.body.appendChild(_renderPage());
      } 
		}
	}
	
	//-------------------------------------------------------------------------------------
	// process query params
	//-------------------------------------------------------------------------------------
	function _initializeSettings(expectedParams) {
    var result = false;
    result = true;
    
    /*
    var urlParams = new URLSearchParams(window.location.search);
    for (var i = 0; i < expectedParams.length; i++) {
      var key = expectedParams[i].key;
      settings[key] = urlParams.has(key) ? urlParams.get(key) : null;
    }

    var receivedRequiredParams = true;
    for (var i = 0; i < expectedParams.length && receivedRequiredParams; i++) {
      var key = expectedParams[i].key;
      if (expectedParams[i].required) receivedRequiredParams = (settings[key] != null);
    }
    
    if (receivedRequiredParams) {
			result = true;

    } else {   
      page.notice.setNotice('failed to initialize: invalid parameters');
    }
    */
    return result;
  }  
  	
	//-----------------------------------------------------------------------------
	// page rendering
	//-----------------------------------------------------------------------------  
  function _renderPage() {
    var container = CreateElement.createDiv(null, 'eggcontainer'); 
    var config = settings.config;
    
    container.appendChild(CreateElement.createImage(null, 'eggimage', config.imageURL));
    container.appendChild(CreateElement.createDiv(null, 'egginstructions', MarkdownToHTML.convert(config.instructions)));
        
    container.appendChild(_renderAnswerEntry());
    
    page.success = _renderSuccessContainer();
    page.failure = _renderFailContainer();
    container.appendChild(page.success);
    container.appendChild(page.failure);

    return container;
  }
  
  function _renderAnswerEntry() {
    var container = CreateElement.createDiv(null, 'egganswer');
    
    var elemInput = CreateElement.createTextInput(null, 'egganswer-input');
    container.appendChild(elemInput);
    elemInput.addEventListener('input', function() {
      _setDisplay(page.success, false);
      _setDisplay(page.failure, false);
    });
    setTimeout(function() {elemInput.focus();}, 1);
    
    container.appendChild(CreateElement.createButton(null, 'egganswer-check', 'check', 'check your answer', _handleCheckAnswer));
    
    return container;
  }
  
  function _renderSuccessContainer() {
    var container = CreateElement.createDiv(null, 'eggsuccessanswer egghide', 'success');
    
    return container;
  }

  function _renderFailContainer() {
    var container = CreateElement.createDiv(null, 'eggfailedanswer egghide', 'Sorry, that\'s not a valid answer.  Feel free to try again');
    
    return container;
  }
  
  function _checkAnswer(answer) {
    var responseList = settings.config.response;
    var matchedResponse = null;
    
    for (var i = 0; i < responseList.length && matchedResponse == null; i++) {
      var response = responseList[i];
      if (response.text == answer) {
        matchedResponse = response;
      }
    }
    
    if (matchedResponse == null) {
      _doFailedAction();
    } else {
      _doAction(matchedResponse);
    }
  }
  
  function _doAction(response) {
    _setDisplay(page.success, true);
    page.success.innerHTML = response.action + '<br>' + JSON.stringify(response.actionArg);
  }
  
  function _doFailedAction  () {
    _setDisplay(page.failure, true);
  }

  //---------------------------------------
	// handlers
	//----------------------------------------
  function _handleCheckAnswer() {
    var answer = page.body.getElementsByClassName('egganswer-input')[0].value;
    _checkAnswer(answer);
  }
  
  //---------------------------------------
	// support methods
	//----------------------------------------
  function _setDisplay(elem, display) {
    if (elem.classList.contains('egghide')) {
      elem.classList.remove('egghide');
    }
    if (!display) {
      elem.classList.add('egghide');
    }
  }
  
  //---------------------------------------
	// return from wrapper function
	//----------------------------------------
	return {
		init: init
 	};
}();
