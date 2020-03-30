function IndexCanvasController(stage)
{

  const NUM_VIRUS_PARTS = 20,
        NUM_VIRUS_LEGS = 10,
        NUM_CELL_PARTS = 20,
        VIRUS_RADIUS_DIVISOR = 120,
        LEG_VEL_FRIC = 1.0009,
        LEG_VEL_DIV = 2500,
        LEG_MAX_VEL = 0.3,
        VIRUS_LIFE_MIN = 1000,
        VIRUS_LIFE_RANGE = 1000,
        CELLS = [],
        VIRUSES = [];

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
    virus.velR = (Math.random() - 0.5) / 1.5;

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
  }



let seriously = new Seriously();
let source = seriously.source('#bg-canvas');
let target = seriously.target('#bg-canvas-2');
let noise = seriously.effect('tvglitch');
// noise.distortion = 0.0;
// noise.amount = 10;
console.log("nOISE", noise);

// connect all our nodes in the right order
noise.source = source;
target.source = noise;
// seriously.go();


  setInterval(()=>{
    // createVirus(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    createVirus(window.innerWidth / 2, window.innerHeight / 2);
  }, 100);





  this.update = ()=>
  {

    if(Math.random() < 0.2)
    {
      noise.distortion = Math.random() * 0.01;
      noise.verticalSync =  Math.random();
      noise.lineSync = 0;
      noise.scanlines = Math.random();
      // noise.barsRate = Math.random() * 80;
    }
    if(Math.random() < 0.025)
    {
      noise.distortion = Math.random() * 0.3;
      noise.lineSync = Math.random() * 0.2;
    }


    noise.amount = Math.random();

      let r = Math.min(window.innerWidth, window.innerHeight) / VIRUS_RADIUS_DIVISOR;


      outer: for(let i = 0; i < VIRUSES.length; ++i)
      {
        let virus = VIRUSES[i];

        virus.alive = --virus.life > 0;

        let scale = virus.scaleX;

        virus.rotation += virus.velR;
        virus.x += virus.velX;
        virus.y += virus.velY;



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

        virus.scaleVel += (1 - scale) / 20000;
        virus.scaleVel /= 1.002;
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

      stage.update();
      source.update();
      seriously.render();

  }

}
