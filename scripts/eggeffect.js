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
     
    var handler = (e, me) => {return this._cleanup(e, this);}
    this._mainCanvas.addEventListener('click', handler);
    document.onkeypress = handler;
  }

  
  _resizeCanvas(me) {
    me._mainCanvas.width = window.innerWidth;
    me._mainCanvas.height = window.innerHeight;
  }
  
  _cleanup(e, me) {
    window.cancelAnimationFrame(me.animationRequest);
    me._mainCanvas.parentNode.removeChild(me._mainCanvas);
    document.onkeypress = null;
  }


  //-----------------------------------------------------------------------------
  // effect methods
  //-----------------------------------------------------------------------------  
  doEffect () {
    var router = {
      'shooting_stars': this._effectShootingStars,
      'bouncing_text': this._effectScatterText
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
   
  _effectScatterText(me) {
    me._config.container.appendChild(me._mainCanvas);
    me._updateScatterText(me);
  }

  _updateScatterText(me) {
    var ctx = me._mainContext;    
    var msg = me._config.arg1;

    var fontList = ['Arial', 'Roboto', '"Times New Roman"', 'Courier New"', 'Verdana', 'Georgia', 'Palatino', 'Bookman', '"Comic Sans MS"'];
    var fontFamily = fontList[~~(Math.random() * fontList.length)];
    var fontSize = ~~((Math.random() * 60) + 10);
    ctx.font = fontSize + 'px ' + fontFamily;
    
    ctx.strokeStyle = 'rgb(' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ')';
    ctx.fillStyle = 'rgb(' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ',' + ~~(Math.random() * 255) + ')';

    var twidth = Math.ceil(ctx.measureText(msg).width);
    var theight = Math.ceil(1.1 * ctx.measureText('M').width);
    
    var x = ~~((Math.random() * (me._mainCanvas.width - twidth)) + 1);
    var y = ~~((Math.random() * (me._mainCanvas.height - theight)) + 10);

    ctx.fillText(msg, x, y);
    ctx.strokeText(msg, x, y);

    var callback = (x) => {return this._updateScatterText(me);}
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
