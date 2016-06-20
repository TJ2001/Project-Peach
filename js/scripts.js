// -- Helps with animation -- //
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };

// -- Initialize Global Variables -- //
var currentRoom = allRooms["b"];
var width = 750;
var height = 750;
var playerSpeed = 2;
var wallWidth = 10;
var doorLength = 40;

var canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

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
var player = new Sprite(100, 100, 25, "blue");

var MomoSprite = new SuperSprite("down", new Animation("img/Momo-Spritesheet.png",0,1,25,33,4,10),true,function() {
    var s = this.obj;
    if(s.xVel===0 && s.yVel===0) {
      if(this.currentAnimation===this.animations["down"] || this.currentAnimation===this.animations["downStill"]) {
        return "downStill";
      } else if(this.currentAnimation===this.animations["up"] || this.currentAnimation===this.animations["upStill"]) {
        return "upStill";
      } else if(this.currentAnimation===this.animations["left"] || this.currentAnimation===this.animations["leftStill"]) {
        return "leftStill";
      } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"]) {
        return "rightStill";
      } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"]) {
        return "rightStill";
      } else if(this.currentAnimation===this.animations["upRight"] || this.currentAnimation===this.animations["upRightStill"]) {
        return "upRightStill";
      } else if(this.currentAnimation===this.animations["upLeft"] || this.currentAnimation===this.animations["upLeftStill"]) {
        return "upLeftStill";
      } else if(this.currentAnimation===this.animations["downRight"] || this.currentAnimation===this.animations["downRightStill"]) {
        return "downRightStill";
      } else if(this.currentAnimation===this.animations["downLeft"] || this.currentAnimation===this.animations["downLeftStill"]) {
        return "downLeftStill";
      }
    }
    var angle = (Math.atan(Math.abs(s.xVel)/Math.abs(s.yVel)))*(180/Math.PI);
    if(angle < 23) {
      if(s.yVel>0) {
        return "down";
      } else {
        return "up"
      }
    } else if(angle > 68) {
      if(s.xVel>0) {
        return "right";
      } else {
        return "left"
      }
    } else {
      if(s.xVel>0) {
        if(s.yVel>0) {
          return "downRight";
        } else {
          return "upRight";
        }
      } else {
        if(s.yVel>0) {
          return "downLeft";
        } else {
          return "upLeft";
        }
      }
    }
  }, player);
MomoSprite.addAnimation("up", new Animation("img/Momo-Spritesheet.png",0,36,25,33,4,10));
MomoSprite.addAnimation("left", new Animation("img/Momo-Spritesheet.png",100,1,25,33,4,10));
MomoSprite.addAnimation("right", new Animation("img/Momo-Spritesheet.png",100,36,25,33,4,10));
MomoSprite.addAnimation("downLeft", new Animation("img/Momo-Spritesheet.png",100,71,25,33,4,10));
MomoSprite.addAnimation("downRight", new Animation("img/Momo-Spritesheet.png",100,106,25,33,4,10));
MomoSprite.addAnimation("upRight", new Animation("img/Momo-Spritesheet.png",100,141,25,33,4,10));
MomoSprite.addAnimation("upLeft", new Animation("img/Momo-Spritesheet.png",100,176,25,33,4,10));
MomoSprite.addAnimation("upStill", new Animation("img/Momo-Spritesheet.png",0,36,25,33,1,10));
MomoSprite.addAnimation("downStill", new Animation("img/Momo-Spritesheet.png",0,71,25,33,1,10));
MomoSprite.addAnimation("leftStill", new Animation("img/Momo-Spritesheet.png",25,71,25,33,1,10));
MomoSprite.addAnimation("rightStill", new Animation("img/Momo-Spritesheet.png",50,71,25,33,1,10));
MomoSprite.addAnimation("upLeftStill", new Animation("img/Momo-Spritesheet.png",0,106,25,33,1,10));
MomoSprite.addAnimation("upRightStill", new Animation("img/Momo-Spritesheet.png",25,106,25,33,1,10));
MomoSprite.addAnimation("downLeftStill", new Animation("img/Momo-Spritesheet.png",50,106,25,33,1,10));
MomoSprite.addAnimation("downRightStill", new Animation("img/Momo-Spritesheet.png",75,106,25,33,1,10));
player.super = MomoSprite;
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
  if(player.yPos>700) {
    currentRoom = allRooms["b"];
  }
  for (i = 0; i < monsters.length; i++) {
    monsters[i].update();
  };
  collisionCheck(player, monsters);
  currentRoom.update();
  monsterBump(monsters);
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  currentRoom.draw(context);
  // --
  context.strokeStyle = "#f26";
  context.lineWidth = 20;
  context.strokeRect(0, 0, width, height);
  // context.strokeRect(wallWidth, wallWidth, width - 2 *wallWidth, height - 2 * wallWidth);
  // for (i = 0; i < currentLightPuzzle.length; i++) {
  //   currentLightPuzzle[i].draw();
  // };
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

var collisionCheck = function(sprite, monsterArray) {
  for (i = 0; i < monsterArray.length; i++) {
    if (calculateDistance(monsterArray[i], sprite) <= (monsterArray[i].radius + sprite.radius)) {
      monsterArray[i].ballColor = "#FF3D0D";
    }
  };
};

// -- Creates a sprite object, the last three parameters are optional -- //


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
