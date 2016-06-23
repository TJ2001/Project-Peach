/*#############################################################################################################
          SCRIPTS
  -- This file should contain: declarations of global variables, user input functionality, the main game loop,
      and functions closely related thereto. Other functionality may be added to this file at a later stage,
      but ideally this file should be kept as clean as possible.
##############################################################################################################*/
//--Note to Joel: This file could be cleaned up even more. Since most of it is your code, I'll leave control of it to you.
//  Also, your code pertaining to doors was left in this file for the time being, but it should be moved to room.js eventually.


// -- Helps with animation -- //
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };

var collisionCount = 0;

// -- Initialize Global Variables -- //
var currentRoom = allRooms["overworld"];
var width = 906;
var height = 906;
var playerSpeed = 2;
var wallWidth = 10;
var supplies = 30;
var enemyKnockBack = -70;
var boatX = Math.floor(allRooms["overworld"].width/2);
var boatY = Math.floor(allRooms["overworld"].height/2);
var weaponSwingTime = 20;
var canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;

// -- depressedKeys initialized as an empty set to allow for a different set up for movement keys. -- //
var depressedKeys = [];
var monsters = [];
var time = 0;
// -- weaponTimer and monsterHitTimer will halt your ability to move while they are larger than time. -- //
var weaponTimer = 0;
var weaponActive = false;
var monsterHitTimer = 0;
var playerWeapon = new Sprite(100, 122.5, player.radius * 1.7, "black", player.radius * 1.3 * 0.9, player.radius * 1.3 * 0.9)
var attackTimer = 0;

allSuperSprites["MomoSprite"].addObject(player);

// -- place each function in here that runs on each animation step -- //
var step = function() {
  update();
  draw();
  animate(step);
  timerEvents();
};
var monsterOne = new Sprite(350,350,70, "black");
monsters.push(monsterOne);
var timerEvents = function() {
  if (time === -1) {
    $(".story-intro").hide();
    $("canvas").show();
  }
  // -- timed events can go here -- //
  time ++;
  if (time % 30 === 0) {
    // -- check for monster movement every half second -- //
    for (i = 0; i < monsters.length; i++) {
      monsters[i].monsterMove();
    };
  } else if (time % 81 === 0) {
    // -- Spawn random monsters -- //
      // var randomColor = "#";
      // while (randomColor.length <= 6) {
      //   randomColor += (Math.floor(Math.random() * 9) + 1);
      // };
      // var randomXPos = 0;
      // var randomYPos = 0;
      // while (randomXPos < 1 || Math.abs(randomXPos - player.xPos) < 100) {
      //   randomXPos = (Math.floor(Math.random() * width / 2 + width / 4));
      // };
      // while (randomYPos < 1 || Math.abs(randomYPos - player.yPos) < 100) {
      //   randomYPos = (Math.floor(Math.random() * height / 2 + height / 4));
      // };
      // var newMonster = new Sprite(randomXPos, randomYPos, 35, randomColor);
      // monsters.push(newMonster);
  }
  if (time < weaponTimer) {
    // -- check for collisions with monsters and your weapon while weapon is active -- //
    for (var i = monsters.length - 1; i >= 0; i --) {
      if (collisionCheck(playerWeapon, monsters[i])) {
        monsters.splice(i, 1);
      }
    };
  } else {
    weaponActive = false;
  }
};


// -- place update functions in here -- //
// -- Updates are used to incrementally adjust an objects position and possibly other things.  Called every frame through the step function -- //
var update = function() {

  // for (var i=0; i < monsters.length; i++) {
  //   monsters[i].update();
  // }
  // -- this updates the position of the hitbox for Momo's sword -- //
  if(player.xVel || player.yVel) {
    playerWeapon.weaponUpdate(player);
  }
  for (i = 0; i < monsters.length; i ++) {
    if (collisionCheck(monsters[i], player)) {
      collisionCount ++;
      var reboundVector = vector(monsters[i].xPos, monsters[i].yPos, player.xPos, player.yPos);
      console.log(collisionCount)
      player.xPos += enemyKnockBack * reboundVector[0];
      player.yPos += enemyKnockBack * reboundVector[1];
      monsterHitTimer = time + 15;
      console.log("you lost a life");
    }
    // monsters[i].update;
  };
  currentRoom.update();
};

// -- a helper function to find the vector ratios between two pointsit takes two points as an input and returns a vector pair [x,y]
var vector = function (xPos1, yPos1, xPos2, yPos2) {
  var angle = Math.atan2(xPos1 - xPos2, yPos1 -yPos2);
  var resultVector = [Math.sin(angle), Math.cos(angle)];
  console.log(resultVector)
  return resultVector;
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#666";
  context.fillRect(0, 0, width, height);
  currentRoom.draw(context);
  for (i = 0; i < monsters.length; i++) {
    monsters[i].draw();
  };
  playerWeapon.draw();
  // player.draw();
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
  if(event.keyCode === 82) {
    currentRoom.reset();
  }
  if(currentRoom===allRooms["overworld"]) {
    var newRoom = currentRoom.moveOverworld(parseInt(event.keyCode)-48);
    currentRoom = allRooms[newRoom];
    if(newRoom!="overworld") {
      if(currentRoom.sprites.indexOf(player)===-1) {
        currentRoom.addSprite(player);
      }
      player.xPos = currentRoom.entrance.xPos;
      player.yPos = currentRoom.entrance.yPos;
    }
  }
  if (event.keyCode === 32) {
    weaponActive = true;
    weaponTimer = time + weaponSwingTime;
    // -- Calls the attack function attack(sprite, attack size, position offset modifier -- //
    attack(player, 1.3, 0.9);
    // if(player.super.currentAnimation===player.super.animations["up"] || player.super.currentAnimation===player.super.animations["upStill"]) {
    //   player.super.show("upSwing");
    // } else if(player.super.currentAnimation===player.super.animations["down"] || player.super.currentAnimation===player.super.animations["downStill"]) {
    //   player.super.show("downSwing");
    // }
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
    depressedKeys.splice(depressedKeys.indexOf(event.keyCode), 1);
  };
});
