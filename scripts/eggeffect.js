//-------------------------------------------------------------------
// Easter Egg effect class
//-------------------------------------------------------------------
// TODO: 
//-------------------------------------------------------------------

class EggEffect {
  constructor (config) {
    this._config = config;
    
    this._requestAnimationFrame = window.requestAnimationFrame || 
                                window.mozRequestAnimationFrame || 
                                window.webkitRequestAnimationFrame || 
                                window.msRequestAnimationFrame;
    this._cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;  

    this._mainCanvas = CreateElement._createElement('canvas', null, 'egg-effectcanvas');
    this._mainContext = this._mainCanvas.getContext('2d');
    this._initialize();
  }  
  
  _initialize() {
     window.addEventListener('resize', this._resizeCanvas(this), false);
     this._resizeCanvas(this);
     var handler = (me) => {return this._cleanup(this);}
     this._mainCanvas.addEventListener('click', handler); 
  }

  _resizeCanvas(me) {
    me._mainCanvas.width = window.innerWidth;
    me._mainCanvas.height = window.innerHeight;
  }
  
  _cleanup(me) {
    window.cancelAnimationFrame(me.animationRequest);
    me._mainCanvas.parentNode.removeChild(me._mainCanvas);
  }
	
  //-----------------------------------------------------------------------------
  // effect methods
  //-----------------------------------------------------------------------------  
  doEffect () {
    var router = {
      'shooting_stars': this._effectShootingStars
    };
    
    var effect = this._config.effect;
    if (router.hasOwnProperty(effect)) {
      router[effect](this); 
      
    } else {
      console.log('no router entry for effect: ' + effect);
      this._badEffect();
    }
  }  
  
  _effectShootingStars(me) {
    me._config.container.appendChild(me._mainCanvas);
    
		me.fw1 = new Firework(me._mainCanvas, me._mainContext);
		me.fw2 = new Firework(me._mainCanvas, me._mainContext);
    me.LIFE = 150;
    me.delay = 0.5;
    me.fw2.life = -me.LIFE * me.delay;
    me._updateShootingStars(me);    
    me.fw1.update();
    me.fw2.update();    
  }
  
  _updateShootingStars(me) {
    me._mainContext.clearRect(0, 0, me._mainCanvas.width, me._mainCanvas.height);
    
    me.fw1.update();
    me.fw2.update();
    
    if (me.fw1.life == me.LIFE * me.delay) {
      me.fw2 = new Firework(me._mainCanvas, me._mainContext);
    }
    if (me.fw2.life == me.LIFE * me.delay) {
      me.fw1 = new Firework(me._mainCanvas, me._mainContext);
    }
    
    var callback = (x) => {return this._updateShootingStars(me);}
    me.animationRequest = window.requestAnimationFrame(callback);
  }

  _badEffect() {
    console.log('_badEffect');
  }


  //---------------------------------------
  // drawing methods
  //----------------------------------------  

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
