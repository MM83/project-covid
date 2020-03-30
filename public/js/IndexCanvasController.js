function IndexCanvasController(stage)
{


  const NUM_VIRUS_PARTS = 20,
        NUM_VIRUS_LEGS = 10,
        NUM_CELL_PARTS = 20,
        VIRUS_RADIUS_DIVISOR = 120,
        LEG_VEL_FRIC = 1.002,
        LEG_VEL_DIV = 17500,
        LEG_MAX_VEL = 0.2,
        VIRUS_LIFE_MIN = 1000,
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

  function createVirus(x , y)
  {

    let virus = new createjs.Container();
    let shape = new createjs.Shape();

    virus.scaleX = virus.scaleY = 0;
    virus.scaleVel = 0;
    virus.life = VIRUS_LIFE_MIN + VIRUS_LIFE_RANGE * Math.random();
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




// seriously.go();


  setInterval(()=>{
    createVirus(window.innerWidth / 2, window.innerHeight / 2);
  }, 100);


  var text = new createjs.Text("PROJECT COVID", "50px Helvetica, Arial", "#fff");
  text.textBaseline = "alphabetic";
  let bounds = text.getBounds()
  text.x = window.innerWidth / 2 - bounds.width / 2;
  text.y = window.innerHeight / 2 - bounds.height / 2;

  this.update = ()=>
  {


    if(Math.random() < 0.05)
    {
      noise.distortion = Math.random() * 0.01;
      noise.verticalSync =  Math.random();
      noise.lineSync = 0;
      text.scaleX = text.scaleY = 1;
      noise.source = blur;
    }

    if(Math.random() < 0.005)
    {
      noise.distortion = Math.random() * 0.01;
      noise.verticalSync =  Math.random();
      blur.amount = Math.random() * 0.03;
      text.alpha = Math.random();
      noise.scanlines =  Math.random() * 200;

    }
    if(Math.random() < 0.02)
    {
      noise.lineSync = 0;
      blur.amount = Math.random() * 0.01;
    }
    if(Math.random() < 0.02)
    {
      blur.amount = Math.random() * 0.05;
    }
    if(Math.random() < 0.005)
    {
      noise.distortion = Math.random() * 0.3;
      text.scaleX = text.scaleY = Math.random() * 2;
      noise.lineSync = Math.random() * 0.2;
      noise.source = edge;
      noise.verticalSync = Math.random() * 200;
    }
    if(Math.random() < 0.005)
    {
      noise.distortion = Math.random() * 0.3;
    }


    noise.amount = Math.random();

    let r = Math.min(window.innerWidth, window.innerHeight) / VIRUS_RADIUS_DIVISOR;

    outer: for(let i = 0; i < VIRUSES.length; ++i)
    {
      let virus = VIRUSES[i];

      virus.alive = --virus.life > 0;

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
        if(scale > 0)
        {
          scale -= 0.002;
          virus.scaleX = virus.scaleY = virus.alpha = scale;
        } else {
          VIRUSES.splice(i, 1);
        }
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

    stage.update();
    source.update();
    seriously.render();

  }

}
