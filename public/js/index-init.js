(()=>{

  // let qs = document.querySelector;
  function qs(q)
  {
    return document.querySelector(q);
  }

  let bgCanvas = qs("#bg-canvas");
  let w, h, running = true;

  function resize()
  {
    w = bgCanvas.width  = window.innerWidth;
    h = bgCanvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();//Call once to initialise w/h vars

  let stage = new createjs.Stage("bg-canvas");
  let cc = new IndexCanvasController(stage);

  function update()
  {
    cc.update();
    if(running)
      requestAnimationFrame(update);
  }

  update();

})();
