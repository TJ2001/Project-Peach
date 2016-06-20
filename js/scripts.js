// -- Helps with animation -- //
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };

// -- Initialize Global Variables -- //
var canvas = document.createElement('canvas');
var width = 800;
var height = 600;
var playerSpeed = 2;

//test
var testMap = [
  ["a","b","c"],
  ["b","a","c"],
  ["c","c","c"]
];

r = new Room(3, 3);
r.addMap(testMap, false);

canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

// -- Initialize an empty array
var monsters = [];
var time = 0;
var player = new Sprite(100, 100, 20, "blue");
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
var monster1 = new Sprite(300, 300, 20);
var monster2 = new Sprite(500, 200, 30, "orange");
var monster3 = new Sprite(700, 500, 20);
var monster4 = new Sprite(500, 100, 30, "pink");
var monster5 = new Sprite(400, 400, 20);
var monster6 = new Sprite(700, 200, 30, "purple");
monsters.push(monster1, monster2, monster3, monster4, monster5, monster6);

// -- place each function in here that runs on each animation step -- //
var step = function() {
  update();
  draw();
  animate(step);
  time ++;
  if (time % 30 === 0) {
    for (i = 0; i < monsters.length; i++) {
      monsters[i].monsterMove();
    };
    // -- Spawn new monsters at set intervals -- //
  } else if (time % 400 === 0) {
    var newMonster = new Sprite(600, 500, 35, "brown");
    monsters.push(newMonster);
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
  monsterBump(monsters);
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#666";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#fff";
  context.strokeRect(width/2, 0, 1, height);
  r.draw(context);
  player.draw();
  for (i = 0; i < monsters.length; i++) {
    monsters[i].draw();
  };
};

// -- A function to calculate the total distance between the centers of two sprites -- //
var calculateDistance = function(spriteOne, spriteTwo) {
  return Math.sqrt(Math.pow((spriteOne.xPos - spriteTwo.xPos), 2) + Math.pow((spriteOne.yPos - spriteTwo.yPos), 2));
};

var monsterBump = function(monsterArray) {
  for (i = 0; i < monsterArray.length; i++) {
    for (index = 0; index < monsterArray.length; index++) {
      if (i != index && calculateDistance(monsterArray[index], monsterArray[i]) <= monsterArray[i].radius + monsterArray[index].radius) {
        //console.log("Pos=" + monsterArray[i].xPos + "," + monsterArray[i].yPos + " " + monsterArray[index].xPos + "," + monsterArray[index].yPos);
        //console.log("Vel=" + monsterArray[i].xVel + "," + monsterArray[i].yVel + " " + monsterArray[index].xVel + "," + monsterArray[index].yVel);
        monsterArray[i].xVel *= -1;
        monsterArray[i].yVel *= -1;
        monsterArray[index].xVel *= -1;
        monsterArray[index].yVel *= -1;
        // while (calculateDistance(monsterArray[i], monsterArray[index]) <= monsterArray[i].radius + monsterArray[index].radius) {
          monsterArray[i].xPos += monsterArray[i].xVel;
          monsterArray[i].yPos += monsterArray[i].yVel;
          monsterArray[index].xPos += monsterArray[index].xVel;
          monsterArray[index].yPos += monsterArray[index].yVel;
        // };
        //console.log("Pos=" + monsterArray[i].xPos + "," + monsterArray[i].yPos + " " + monsterArray[index].xPos + "," + monsterArray[index].yPos);
        //console.log("Vel=" + monsterArray[i].xVel + "," + monsterArray[i].yVel + " " + monsterArray[index].xVel + "," + monsterArray[index].yVel);
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
function Sprite(xPos, yPos, radius, color = "red", xVel = 0, yVel = 0) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.radius = radius;
  this.ballColor = color;
  this.xVel = xVel;
  this.yVel = yVel;
  this.super = undefined;
}

// -- draws the sprite on the canvas -- //
Sprite.prototype.draw = function () {
  if(typeof this.super === "undefined") {
    context.beginPath();
    context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
    context.fillStyle = this.ballColor;
    context.fill();
  } else {
    this.super.draw(context, this.xPos-25, this.yPos-25);
  }
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

// -- Creates the canvas element on page load and starts animating the canvas -- //
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

window.addEventListener("keydown", function(event) {
// -- Event listener for up and down key. -- //
  if (event.keyCode === 38) {
    player.yVel = -playerSpeed;
  } else if (event.keyCode === 40) {
    player.yVel = playerSpeed;
  }
  if (event.keyCode === 37) {
    // -- Event listener for left and rigth key. -- //
    player.xVel = -playerSpeed;
  } else if (event.keyCode === 39) {
    player.xVel = playerSpeed;
  }
  //console.log(event.keyCode);
  //console.log("time = " + time);
});
// -- keyup press is designed to stop movement if the key for the direction you are moving is released. We can adjust that behavior towards whatever we want. -- //
window.addEventListener("keyup", function (event) {
  if (event.keyCode === 39 && player.xVel === playerSpeed) {
    player.xVel = 0;
  } else if (event.keyCode === 37 && player.xVel === -playerSpeed) {
    player.xVel = 0;
  }
  if (event.keyCode === 38 && player.yVel === -playerSpeed) {
    player.yVel = 0;
  } else if (event.keyCode === 40 && player.yVel === playerSpeed) {
    player.yVel = 0;
  }
});


// -- this is an example of an object and prototypes that I used for pong. It is left in here as an example of how to construct a basic moving object that reflects off of objects. -- //

// function Ball(xPos, yPos) {
//   this.xPos = xPos;
//   this.yPos = yPos;
//   this.xVel = 3;
//   this.yVel = 6;
//   this.radius = ballRadius;
// };
//
//
// Ball.prototype.draw = function () {
//   context.beginPath();
//   context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
//   context.fillStyle = "#fff";
//   context.fill();
// };
//
// Ball.prototype.update =function() {
//   this.xPos += this.xVel;
//   this.yPos += this.yVel;
//   if (this.xPos + this.radius>= width - paddleWidth) {
//     if (this.yPos > paddleTwo.yPos && this.yPos < paddleTwo.yPos + paddleHeight) {
//       this.xVel *= -1;
//     } else {
//       ball.xPos = 250;
//       ball.yPos = 250;
//     }
//   } else if (this.xPos - this.radius<= paddleWidth) {
//       if (this.yPos > paddleOne.yPos && this.yPos < paddleOne.yPos + paddleHeight) {
//         this.xVel *= -1;
//       } else {
//         ball.xPos = 750;
//         ball.yPos = 250;
//       }
//     }
//   if (this.yPos + this.radius>= height) {
//     this.yVel *= -1;
//   } else if (this.yPos - this.radius<= 0) {
//     this.yVel *= -1;
//   }
// };
