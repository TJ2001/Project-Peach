// -- Helps with animation -- //
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };

// -- Initialize Global Variables -- //
var width = 750;
var height = 750;
var playerSpeed = 4;
var wallWidth = 10;
var doorLength = 40;

var canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

// -- Initialize an empty array
var monsters = [];

// -- Make an empty array of length 4 for the doors index 0 will be the door at the top of the screen.  The next doors go clockwise -- //
var doors = [];
doors.length = 4;
// -- using the sprite object for the doors, radius is going to be the size of the door. We will need a new draw method for doors. -- //
var doorNorth = new Sprite(width / 2 - doorLength / 2, 0, doorLength, "blue");
var doorEast = new Sprite(width - wallWidth, height / 2 - doorLength / 2, doorLength, "green");
var doorSouth = new Sprite(width / 2 - doorLength / 2, height - wallWidth, doorLength, "yellow");
var doorWest = new Sprite(0, height / 2 - doorLength / 2, doorLength, "red");
doors[0] = doorNorth;
doors[1] = doorEast;
doors[2] = doorSouth;
doors[3] = doorWest;
// -- depressedKeys initialized as an empty set to allow for a different set up for movement keys. -- //
var depressedKeys = [];
var time = 0;
var player = new Sprite(100, 100, 20, "blue");
// -- Boolean to stop triggering the light puzzle repeatedly -- //
var lightPuzzlePlayerBoolean = false;
// -- gloabal variable to make collisionCheckLightPuzzle work -- //
var triggeredLight;
// -- set up the light puzzle -- //
var currentLightPuzzle = [];
var lightPanel1 = new Sprite(200, 200, 40);
var lightPanelObject1 = new LightPuzzle(lightPanel1, 1, 1);
var lightPanel2 = new Sprite(400, 200, 40);
var lightPanelObject2 = new LightPuzzle(lightPanel2, 1, 2);
var lightPanel3 = new Sprite(600, 200, 40);
var lightPanelObject3 = new LightPuzzle(lightPanel3, 1, 3);
var lightPanel4 = new Sprite(200, 400, 40);
var lightPanelObject4 = new LightPuzzle(lightPanel4, 2, 1);
var lightPanel5 = new Sprite(400, 400, 40);
var lightPanelObject5 = new LightPuzzle(lightPanel5, 2, 2);
var lightPanel6 = new Sprite(600, 400, 40);
var lightPanelObject6 = new LightPuzzle(lightPanel6, 2, 3);
var lightPanel7 = new Sprite(200, 600, 40);
var lightPanelObject7 = new LightPuzzle(lightPanel7, 3, 1);
var lightPanel8 = new Sprite(400, 600, 40);
var lightPanelObject8 = new LightPuzzle(lightPanel8, 3, 2);
var lightPanel9 = new Sprite(600, 600, 40);
var lightPanelObject9 = new LightPuzzle(lightPanel9, 3, 3);
currentLightPuzzle.push(lightPanelObject9, lightPanelObject8, lightPanelObject7, lightPanelObject6, lightPanelObject5, lightPanelObject4, lightPanelObject3, lightPanelObject2, lightPanelObject1);

// -- initialize some monsters to start -- //
// var monster1 = new Sprite(300, 300, 20);
// var monster2 = new Sprite(500, 200, 30, "orange");
// var monster3 = new Sprite(700, 600, 20);
// var monster4 = new Sprite(500, 500, 30, "pink");
// var monster5 = new Sprite(400, 700, 20);
// var monster6 = new Sprite(700, 200, 30, "purple");
// monsters.push(monster1, monster2, monster3, monster4, monster5, monster6);

// -- place each function in here that runs on each animation step -- //
var step = function() {
  update();
  draw();
  animate(step);
  time ++;
  timerEvents();
};

var timerEvents = function() {
  // -- random monster movement timer tick -- //
  if (time % 30 === 0) {
    for (i = 0; i < monsters.length; i++) {
      monsters[i].monsterMove();
    };
    // -- Spawn new monsters at set intervals -- //
  } else if (time % 400 === 0) {
    // var randomColor = "#";
    // while (randomColor.length <= 6) {
    //   randomColor += (Math.floor(Math.random() * 9) + 1);
    // };
    // var randomXPos = 0;
    // var randomYPos = 0;
    // while (randomXPos < 1 || Math.abs(randomXPos - player.xPos) < 100) {
    //   randomXPos = (Math.floor(Math.random() * width / 2 + width / 4));
    //   console.log("random x");
    // };
    // while (randomYPos < 1 || Math.abs(randomYPos - player.yPos) < 100) {
    //   randomYPos = (Math.floor(Math.random() * height / 2 + height / 4));
    //   console.log("random y");
    // };
    // var newMonster = new Sprite(randomXPos, randomYPos, 35, randomColor);
    // monsters.push(newMonster);
  }
};


// -- place update functions in here -- //
// -- Updates are used to incrementally adjust an objects position and possibly other things.  Called every frame through the step function -- //
var update = function() {
  player.update();
  for (i = 0; i < monsters.length; i++) {
    monsters[i].update();
  };
  collisionCheck(player, monsters);
  collisionCheckLightPuzzle(player, currentLightPuzzle);
  monsterBump(monsters);
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  // --
  context.strokeStyle = "#f26";
  context.lineWidth = 20;
  context.strokeRect(0, 0, width, height);
  // context.strokeRect(wallWidth, wallWidth, width - 2 *wallWidth, height - 2 * wallWidth);
  for (i = 0; i < monsters.length; i++) {
    monsters[i].draw();
  };
  for (i = 0; i < currentLightPuzzle.length; i++) {
    currentLightPuzzle[i].draw();
  };
  player.draw();
};

var drawDoors = function(doorArray) {
  context.lineWidth = 1;
  for (i = 0; i < doors.length; i ++) {
    if (i % 2 === 0) {
      // -- draw rectangles for doors. -- //
    }
  }
}

// -- A function to calculate the total distance between the centers of two sprites -- //
var calculateDistance = function(spriteOne, spriteTwo) {
  return Math.sqrt(Math.pow((spriteOne.xPos - spriteTwo.xPos), 2) + Math.pow((spriteOne.yPos - spriteTwo.yPos), 2));
};

var monsterBump = function(monsterArray) {
  for (i = 0; i < monsterArray.length; i++) {
    for (index = 0; index < monsterArray.length; index++) {
      if (i != index && calculateDistance(monsterArray[index], monsterArray[i]) <= monsterArray[i].radius + monsterArray[index].radius) {
        monsterArray[i].xVel *= -1;
        monsterArray[i].yVel *= -1;
        monsterArray[index].xVel *= -1;
        monsterArray[index].yVel *= -1;
        monsterArray[i].xPos += monsterArray[i].xVel;
        monsterArray[i].yPos += monsterArray[i].yVel;
        monsterArray[index].xPos += monsterArray[index].xVel;
        monsterArray[index].yPos += monsterArray[index].yVel;
      }
    };
  };
};

var collisionCheckLightPuzzle = function(triggeringSprite, lightPuzzleArray) {
    for (var i = 0; i < lightPuzzleArray.length; i++) {
      if (calculateDistance(lightPuzzleArray[i].sprite, triggeringSprite) <= (lightPuzzleArray[i].sprite.radius + triggeringSprite.radius) && !lightPuzzlePlayerBoolean) {
        lightPuzzleArray[i].toggleLights();
        triggeredLight = lightPuzzleArray[i].sprite;
        lightPuzzlePlayerBoolean = true;
      }
    };
  if (lightPuzzlePlayerBoolean === true && calculateDistance(triggeredLight, player) > triggeredLight.radius + triggeringSprite.radius + 10) {
    lightPuzzlePlayerBoolean = false;
  }
};


var collisionCheck = function(sprite, monsterArray) {
  for (i = 0; i < monsterArray.length; i++) {
    if (calculateDistance(monsterArray[i], sprite) <= (monsterArray[i].radius + sprite.radius)) {
      monsterArray[i].ballColor = "#FF3D0D";
    }
  };
};

// -- Creates a sprite object, the last three parameters are optional -- //
function Sprite(xPos, yPos, radius, color = "red", xVel = 0, yVel = 0) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.radius = radius;
  this.ballColor = color;
  this.xVel = xVel;
  this.yVel = yVel;
};

// -- draws the sprite on the canvas -- //
Sprite.prototype.draw = function () {
  context.beginPath();
  context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
  context.fillStyle = this.ballColor;
  context.fill();
};

// -- Updates the sprites position -- //
Sprite.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  if (this.yPos + this.radius >= height) {
      this.yVel *= -1;
    } else if (this.yPos - this.radius <= 0) {
      this.yVel *= -1;
    }
  if (this.xPos + this.radius >= width) {
      this.xVel *= -1;
    } else if (this.xPos - this.radius <= 0) {
      this.xVel *= -1;
    }
};

// -- First prototype for monster movement -- //
Sprite.prototype.monsterMove = function() {
  var randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber ===  0) {
    this.xVel = 2;
    this.yVel = 0;
  } else if (randomNumber === 1) {
    this.xVel = -2;
    this.yVel = 0;
  } else if (randomNumber === 2) {
    this.xVel = 0;
    this.yVel = 2;
  } else if (randomNumber === 3) {
    this.xVel = 0;
    this.yVel = -2;
  } else if (randomNumber === 4) {
    this.xVel = 0;
    this.yVel = 0;
  } else {

  }
};

// --
function LightPuzzle(sprite, positionInGridX, positionInGridY, isLit = false) {
  this.sprite = sprite;
  // -- adjustments to allow checking neighbors based on numbers -- //
  this.column = 10 * positionInGridX;
  this.row = positionInGridY;
  this.isLit = isLit;
};

LightPuzzle.prototype.draw = function() {
  if (this.isLit) {
    this.sprite.ballColor = "yellow";
  } else {
    this.sprite.ballColor = "brown";
  }
  this.sprite.draw();
};

// -- This function will toggle all directly adjacent lights. -- //
LightPuzzle.prototype.toggleLights = function() {
  this.isLit = !this.isLit;
  var workingColumn = this.column;
  var workingRow = this.row;
  for(var i = 0; i < currentLightPuzzle.length; i ++) {
      if (Math.abs((workingRow + workingColumn) - (currentLightPuzzle[i].row + currentLightPuzzle[i].column)) === 1 || Math.abs((workingRow + workingColumn) - (currentLightPuzzle[i].row + currentLightPuzzle[i].column)) === 10) {
        currentLightPuzzle[i].isLit = !currentLightPuzzle[i].isLit;
      }
  };
};

// -- Creates the canvas element on page load and starts animating the canvas -- //
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

// -- Optional movement key code to work better while pushing opposite directions -- //
window.addEventListener("keydown", function(event) {
// -- Event listener for up and down key. -- //
  if (event.keyCode === 38) {
    player.yVel = -playerSpeed;
    if (!depressedKeys.includes(38)) {
      depressedKeys.push(38);
    }
  }
  if (event.keyCode === 40) {
    player.yVel = playerSpeed;
    if (!depressedKeys.includes(40)) {
      depressedKeys.push(40);
    }
  }
  // -- Event listener for left and rigth key. -- //
  if (event.keyCode === 37) {
    player.xVel = -playerSpeed;
    if (!depressedKeys.includes(37)) {
      depressedKeys.push(37);
    }
  }
  if (event.keyCode === 39) {
    player.xVel = playerSpeed;
    if (!depressedKeys.includes(39)) {
      depressedKeys.push(39);
    }
  }
});
// -- keyup press is designed to stop movement if the key for the direction you are moving is released. We can adjust that behavior towards whatever we want. -- //
window.addEventListener("keyup", function (event) {
  if (event.keyCode === 39 && player.xVel === playerSpeed) {
    if (depressedKeys.includes(37)) {
      player.xVel = -playerSpeed;
    } else {
    player.xVel = 0;
  }
  }
  if (event.keyCode === 37 && player.xVel === -playerSpeed) {
    if (depressedKeys.includes(39)) {
      player.xVel = playerSpeed;
    } else {
      player.xVel = 0;
    }
  }
  if (event.keyCode === 38 && player.yVel === -playerSpeed) {
    if (depressedKeys.includes(40)) {
      player.yVel = playerSpeed;
    } else {
      player.yVel = 0;
    }
  }
  if (event.keyCode === 40 && player.yVel === playerSpeed) {
    if (depressedKeys.includes(38)) {
      player.yVel = -playerSpeed;
    } else {
      player.yVel = 0;
    }
  }
  while (depressedKeys.includes(event.keyCode)) {
    depressedKeys.splice(depressedKeys.indexOf(event.keyCode, 1));
  };
  console.log("At end of keyup:" + depressedKeys);
});
