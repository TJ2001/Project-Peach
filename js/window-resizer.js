var tileSize = 64;
var playerSpeed = tileSize / 21;
var knockBack = -tileSize * 0.6;
// -- Create an event listener to resize the canvas to fit the screen -- //
var initialize = function() {
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
};

var resizeCanvas = function() {
  if ( 5 * window.innerWidth / 6 < window.innerHeight) {
    tileSize = window.innerWidth / 18;
  } else {
    tileSize = window.innerHeight / 15;
  }
  resetVariables();
};

var resetVariables = function() {
  width = tileSize * 18;
  height = tileSize * 15;
  canvas.width = width;
  canvas.height = height;
  playerSpeed = tileSize / 21;
  knockBack = -tileSize * 0.6;
  
};
