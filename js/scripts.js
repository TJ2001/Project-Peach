/*#############################################################################################################
          SCRIPTS
  -- This file should contain: declarations of global variables, user input functionality, the main game loop,
      and functions closely related thereto. Other functionality may be added to this file at a later stage,
      but ideally this file should be kept as clean as possible.
##############################################################################################################*/

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
var supplies = 30;
var knockBack = -45;
var money = 0;

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
//var monsters = [];
var time = 0;
// -- weaponTimer and monsterHitTimer will halt your ability to move while they are larger than time. -- //
var weaponTimer = 0;
var weaponActive = false;
var monsterHitTimer = 0;
var hitActive = false;
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
var timerEvents = function() {
  if (time === -1) {
    $(".story-intro").hide();
    $("canvas").show();
  }
  // -- timed events can go here -- //
  time ++;
  currentRoom.runTimedEvents();
};


// -- place update functions in here -- //
// -- Updates are used to incrementally adjust an objects position and possibly other things.  Called every frame through the step function -- //
var update = function() {

  // -- this updates the position of the hitbox for Momo's sword -- //
  if(player.xVel || player.yVel) {
    playerWeapon.weaponUpdate(player);
  }
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
  playerWeapon.draw();
  context.font = "15px Arial";
  allSuperSprites["PickupSprite"].animations["heart"].play(context,5,5);
  context.fillText("x "+player.health.toString(),35,22);
  allSuperSprites["PickupSprite"].animations["peach"].play(context,75,5);
  context.fillText("x "+supplies.toString(),105,22);
  allSuperSprites["PickupSprite"].animations["coin"].play(context,145,5);
  context.fillText("x "+money.toString(),175,22);
};

// -- Creates the canvas element on page load and starts animating the canvas -- //
window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

// -- Optional movement key code to work better while pushing opposite directions -- //
window.addEventListener("keydown", function(event) {
  // -- Event listener for up and down key. -- //
  if(currentRoom===allRooms["overworld"]) {
    if (event.keyCode === 38) {
      var tempMove = 8;
    }
    if (event.keyCode === 40) {
      var tempMove = 2;
    }
    // -- Event listener for left and rigth key. -- //
    if (event.keyCode === 37) {
      var tempMove = 4;
    }
    if (event.keyCode === 39) {
      var tempMove = 6;
    }
    var newRoom = currentRoom.moveOverworld(tempMove);
    // var newRoom = currentRoom.moveOverworld(parseInt(event.keyCode)-48);
    currentRoom = allRooms[newRoom];
    if(newRoom!="overworld") {
      if(currentRoom.sprites.indexOf(player)===-1) {
        currentRoom.addSprite(player);
      }
      player.xPos = currentRoom.entrance.xPos;
      player.yPos = currentRoom.entrance.yPos;
    }
  } else {
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
  }
  // if(currentRoom===allRooms["overworld"]) {
  //   var newRoom = currentRoom.moveOverworld(parseInt(event.keyCode)-48);
  //   currentRoom = allRooms[newRoom];
  //   if(newRoom!="overworld") {
  //     if(currentRoom.sprites.indexOf(player)===-1) {
  //       currentRoom.addSprite(player);
  //     }
  //     player.xPos = currentRoom.entrance.xPos;
  //     player.yPos = currentRoom.entrance.yPos;
  //   }
  // }
  if (event.keyCode === 32) {
    weaponActive = true;
    weaponTimer = time + weaponSwingTime;
    // -- Calls the attack function attack(sprite, attack size, position offset modifier -- //
    attack(player, 1.3, 0.9);
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
