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
let delayMixer = audioCtx.createChannelMerger();

let fTypes = ['highpass', 'bandpass', 'lowpass', 'peaking', 'notch', 'allpass', 'highshelf', 'lowshelf'];

oscillator.connect(filter);
filter.connect(distortion);
distortion.connect(delayMixer);

gainNode.connect(mixer);

mixer.connect(audioCtx.destination);

let delay1 = audioCtx.createDelay(10);
delay1.connect(mixer);

let delay2 = audioCtx.createDelay(10);
delay2.connect(mixer);

// gainNode.connect(delayMixer);

delayMixer.connect(delay1);
delayMixer.connect(delay2);
// delayMixer.connect(gainNode);

gainNode.connect(mixer);

function playNote(step)
{
  let osc1 = audioCtx.createOscillator();
  let gate1 = audioCtx.createGain();
  osc1.frequency.value = 90;
  osc1.type = 'triangle';
  osc1.connect(gate1);
  gate1.gain.value = 0.5;
  gate1.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 3);
  gate1.connect(delayMixer);

  let osc2 = audioCtx.createOscillator();
  let gate2 = audioCtx.createGain();
  osc2.frequency.value = 45;
  osc2.type = 'square';
  osc2.connect(gate2);
  gate2.gain.value = 0.0;
  gate2.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 1.5);
  gate2.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2);
  gate2.connect(delayMixer);
  osc1.start();
  osc1.stop(audioCtx.currentTime + 3);
  osc2.start();
  osc2.stop(audioCtx.currentTime + 3);

  // let split =

}



  window.addEventListener("click", ()=>
  {
    // playNote();
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
        VIRUS_LIFE_MIN = 500,
        VIRUS_LIFE_RANGE = 500,
        CELLS = [],
        VIRUSES = [];

  let seriously = new Seriously();
  let source = seriously.source('#bg-canvas');
  let target = seriously.target('#bg-canvas-2');
  let noise = seriously.effect('tvglitch');
  let edge = seriously.effect('edge');
  let blur = seriously.effect('blur');
  let sketch = seriously.effect('sketch');

  blur.source = source;
  edge.source = blur;
  noise.source = edge;
  target.source = noise;

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


    gainNode.value = 0.0;

    if(Math.random() < 0.05)
    {
      noise.distortion = Math.random() * 0.01;
      noise.verticalSync =  Math.random();
      noise.lineSync = 0;
      text.scaleX = text.scaleY = 1;
      noise.source = blur;
      distortion.curve = makeDistortionCurve(100);
      filter.frequency.linearRampToValueAtTime(10, audioCtx.currentTime + 0.25);
      filter.Q.value = 0.1;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(7, audioCtx.currentTime); // value in hertz
      // gainNode.value = 0.2;
    }


    if(Math.random() < 0.005)
    {
      noise.distortion = Math.random() * 0.01;
      noise.verticalSync =  Math.random();
      blur.amount = Math.random() * 0.03;
      noise.scanlines =  Math.random() * 200;
      oscillator.type = 'square';
      // gainNode.gain.value = 0.2;
    }
    if(Math.random() < 0.001)
    {
      noise.lineSync = 0;
      blur.amount = Math.random() * 0.01;
      oscillator.type = 'square';
      // gainNode.gain.value = 0.3;
      delay1.delayTime = 0.6;
      delay2.delayTime = 0.8;
    }
    if(Math.random() < 0.001)
    {
      blur.amount = Math.random() * 0.02;
      noise.lineSync = Math.random() * 0.2;
      filter.frequency.value = Math.random() * 4000;
      filter.Q.value = Math.random() * 10;
      oscillator.type = 'sawtooth';
      // gainNode.gain.value = 0.5;
    }




    if(Math.random() < 0.02)
    {

      noise.distortion = Math.random() * 0.3;
      text.scaleX = text.scaleY = Math.random() * 2;
      noise.lineSync = Math.random() * 0.2;
      noise.source = edge;
      oscillator.frequency.value = Math.random() * 80;
      noise.verticalSync = Math.random() * 200;
      gainNode.gain.value = 0.5;
      distortion.curve = makeDistortionCurve(Math.random() * 600);
      delay1.delayTime.value = Math.random() * 0.1;
      delay2.delayTime.value = Math.random() * 0.1;
    }
    if(Math.random() < 0.002)
    {
      noise.distortion = Math.random() * 0.3;
      filter.Q.value = Math.random() * 10;
      distortion.curve = makeDistortionCurve(Math.random() * 600);
      filter.type = fTypes[Math.floor(Math.random())];
      oscillator.frequency.value = Math.random() * 80;
      filter.frequency.linearRampToValueAtTime(Math.random() * 4000, audioCtx.currentTime + 1);
      gainNode.gain.value = 0.5;
    }


    noise.amount = Math.random();

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
