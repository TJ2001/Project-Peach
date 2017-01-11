var canvasScale = 1.0;
// -- Create an event listener to resize the canvas to fit the screen -- //
var initialize = function() {
  console.log("Yo!!");

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
};

var resizeCanvas = function() {
  context.scale(1/canvasScale, 1/canvasScale);
  console.log("Yo");
  if ( 5 * window.innerWidth / 6 < window.innerHeight) {
    canvasScale = window.innerWidth / 1152;
  } else {
    canvasScale = window.innerHeight / 960;
  }
  console.log(canvasScale);
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.scale(canvasScale, canvasScale);

};

initialize();
