function IndexCanvasController(stage)
{

  let audioStarted = false;
  // create web audio api context
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(7, audioCtx.currentTime); // value in hertz

  var distortion = audioCtx.createWaveShaper();

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

distortion.curve = makeDistortionCurve(10);
distortion.oversample = '4x';

let filter = audioCtx.createBiquadFilter();
filter.frequency.value = 0;
filter.type = 'lowshelf';

let gainNode = audioCtx.createGain();
let mixer = audioCtx.createChannelMerger();

let fTypes = ['highpass', 'bandpass', 'lowpass', 'peaking', 'notch', 'allpass', 'highshelf', 'lowshelf'];

oscillator.connect(filter);
filter.connect(distortion);
distortion.connect(gainNode);

mixer.connect(audioCtx.destination);

gainNode.connect(mixer);



  window.addEventListener("click", ()=>
  {
    if(audioStarted)
      return;
    audioStarted = true;
    filter.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + 10);
    oscillator.start();

  });



  const NUM_VIRUS_PARTS = 20,
        NUM_VIRUS_LEGS = 6,
        NUM_CELL_PARTS = 20,
        VIRUS_RADIUS_DIVISOR = 120,
        LEG_VEL_FRIC = 1.0003,
        LEG_VEL_DIV = 17500,
        LEG_MAX_VEL = 0.2,
        VIRUS_LIFE_MIN = 1000,
        VIRUS_LIFE_RANGE = 1500,
        CELLS = [],
        VIRUSES = [];

  let seriously = new Seriously();
  let source = seriously.source('#bg-canvas');
  let target = seriously.target('#bg-canvas-2');
  let noise = seriously.effect('tvglitch');
  let edge = seriously.effect('edge');
  let blur = seriously.effect('blur');
  let sketch = seriously.effect('sketch');
  let ascii = seriously.effect('ascii');

  blur.source = source;
  blur.amount = 0.01;
  sketch.source = blur;
  edge.source = sketch;
  noise.source = edge;
  noise.scanlines = 0.8;
  noise.distortion = 0;
  ascii.source = blur;
  target.source = noise;;

  // noise.scanlines =  50;

  // console.log("fg", filmgrain);

  function createVirus(x , y)
  {

    let virus = new createjs.Container();
    let shape = new createjs.Shape();

    virus.scaleX = virus.scaleY = 0;
    virus.scaleVel = 0;
    virus.startLife = virus.life = VIRUS_LIFE_MIN + VIRUS_LIFE_RANGE * Math.random();
    virus.alive = true;

    virus.legs = [];
    virus.shape = shape;

    let minDim = Math.min(window.innerWidth, window.innerHeight);

    let r = minDim / VIRUS_RADIUS_DIVISOR;

    virus.velX = (Math.random() - 0.5) * minDim / 2000;
    virus.velY = (Math.random() - 0.5) * minDim / 2000;
    virus.velR = (Math.random() - 0.5) / 3.5;

    shape.graphics.beginFill("red").drawCircle(0, 0, r);
    // virus.set({x : window.innerWidth / 2, y : window.innerHeight / 2});
    virus.set({x : x, y : y});
    virus.addChild(shape);
    stage.addChild(virus);

    for(let i = 0; i < NUM_VIRUS_LEGS; ++i)
    {
      let rad = (i / NUM_VIRUS_LEGS) * Math.PI * 2;

      let idealX = Math.sin(rad) * r * 2;
      let idealY = Math.cos(rad) * r * 2;
      let targX  = idealX + (Math.random() - 0.5) * r;
      let targY  = idealY + (Math.random() - 0.5) * r;
      let legEnd = new createjs.Shape();
      legEnd.idealX = idealX;
      legEnd.idealY = idealY;
      legEnd.targX  = targX;
      legEnd.targY  = targY;
      legEnd.friction = LEG_VEL_FRIC + Math.random() * 0.01;
      legEnd.divisor = LEG_VEL_DIV + Math.random() * LEG_VEL_DIV;
      legEnd.velX = (Math.random() * r - r / 2) / 5;
      legEnd.velY = (Math.random() * r - r / 2) / 5;
      legEnd.graphics.beginFill("red").drawCircle(0, 0, r / 4).endFill();
      virus.legs.push(legEnd);
      virus.addChild(legEnd);
      VIRUSES.push(virus);
    }
    return virus;
  }

  setInterval(()=>{
    createVirus(window.innerWidth / 2, window.innerHeight / 2);
  }, 100);


  var text = new createjs.Text("PROJECT COVID", "50px Work Sans, Helvetica, Arial", "#fff");
  text.textBaseline = "alphabetic";
  let bounds = text.getBounds();
  text.x = window.innerWidth / 2 - bounds.width / 2;
  text.y = window.innerHeight / 2;


  var text2 = new createjs.Text("Hobbies of the Apocalypse", "30px Work Sans, Helvetica, Arial", "#fff");
  text2.textBaseline = "alphabetic";
  bounds = text2.getBounds();
  text2.x = window.innerWidth / 2 - bounds.width / 2;
  // text2.y = window.innerHeight / 2;
  text2.y = text.y + bounds.height * 1.5;

  this.update = ()=>
  {

    if(Math.random() < 0.25)
    {


      if(Math.random() < 0.01)
        noise.distortion = Math.random() * 0.2;
      else
        noise.distortion = 0;


      if(Math.random() < 0.01)
        noise.distortion = Math.random() * 2;

      if(Math.random() < 0.05)
        noise.verticalSync = Math.random() * 100;
      else
        noise.verticalSync = 0;

      if(Math.random() < 0.05){
        noise.distortion = Math.random() * 2;
        blur.amount = Math.random() * 0.05;
      }

      if(Math.random() < 0.2)
        blur.amount = 0;

      if(Math.random() < 0.01)
        noise.lineSync = Math.random() * 0.1;
      else if(Math.random() < 0.002)
        noise.lineSync = Math.random() * 0.3;
      else
        noise.lineSync = 0;

      if(Math.random() < 0.1){
        text.scaleX = text.scaleY = 1;
        noise.source = blur;
      }

      if(Math.random() < 0.02){
        blur.amount = Math.random() * 0.05;
        noise.source = ascii;
      }

      if(Math.random() < 0.01){
        noise.distortion = Math.random() * 5;
        blur.amount = Math.random() * 0.1;
        text.scaleX = text.scaleY = Math.random() * 1.3;
        noise.source = edge;
      }

  }






    let r = Math.min(window.innerWidth, window.innerHeight) / VIRUS_RADIUS_DIVISOR;

    outer: for(let i = 0; i < VIRUSES.length; ++i)
    {
      let virus = VIRUSES[i];

      virus.alive = --virus.life > 0;

      virus.alpha = virus.life / virus.startLife;

      let scale = virus.scaleX;

      physicsLoop : for (let j = 0; j < VIRUSES.length; ++j) {
        if(i == j)
          continue physicsLoop;
        let otherVirus = VIRUSES[j];
      }

      virus.rotation += virus.velR;
      virus.x += virus.velX;
      virus.y += virus.velY;

      if(virus.x < -window.innerWidth / 2)
      {
        virus.x = -window.innerWidth / 2;
        virus.velX = -virus.velX;
      }

      if(virus.y < -window.innerHeight / 2)
      {
        virus.y = -window.innerHeight / 2;
        virus.velY = -virus.velY;
      }

      if(virus.x > window.innerWidth * 1.5)
      {
        virus.x = window.innerWidth * 1.5;
        virus.velX = -virus.velX;
      }

      if(virus.y > window.innerHeight * 1.5)
      {
        virus.y = window.innerHeight * 1.5;
        virus.velY = -virus.velY;
      }


      if(!virus.alive)
      {

        VIRUSES.splice(i, 1);
        continue outer;
      }


      let shape = virus.shape;
      let gfx = shape.graphics;

      virus.scaleVel += (1 - scale) / 5000;
      virus.scaleVel /= 1.005;
      scale += virus.scaleVel;
      virus.scaleX = virus.scaleY = scale;

      shape.graphics.clear();
      let legs = virus.legs;

      for(let j = 0; j < NUM_VIRUS_LEGS; ++j)
      {
        let legEnd = legs[j];
        legEnd.velX += (legEnd.targX - legEnd.x) / LEG_VEL_DIV;
        legEnd.velX = Math.max(Math.min(legEnd.velX, LEG_MAX_VEL), -LEG_MAX_VEL);
        legEnd.velX /= legEnd.friction;
        legEnd.velY += (legEnd.targY - legEnd.y) / LEG_VEL_DIV;
        legEnd.velY = Math.max(Math.min(legEnd.velY, LEG_MAX_VEL), -LEG_MAX_VEL);
        legEnd.velY /= legEnd.friction;
        legEnd.x += legEnd.velX;
        legEnd.y += legEnd.velY;
        legEnd.scaleX = legEnd.scaleY = 0.5 + Math.hypot(legEnd.x, legEnd.y) / 20;
        legEnd.targX = legEnd.idealX + (Math.random() - 0.5) * r * 4;
        legEnd.targY = legEnd.idealY + (Math.random() - 0.5) * r * 4;
        legEnd.friction = LEG_VEL_FRIC + Math.random() * 0.01;
        legEnd.divisor = LEG_VEL_DIV + Math.random() * LEG_VEL_DIV;

        gfx.setStrokeStyle(2).beginStroke("#900");
        gfx.moveTo(legEnd.x, legEnd.y);
        gfx.lineTo(0, 0);
        gfx.endStroke();

      }

      shape.graphics.beginFill("red").drawCircle(0, 0, r);
      // shape.graphics.beginFill("black").drawCircle(0, 0, r * 0.8);
    }

    stage.addChild(text);
    stage.addChild(text2);

    stage.update();
    source.update();
    seriously.render();

  }

}
