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

// -- Initialize Global Variables -- //
var currentRoom = allRooms["overworld"];
var width = 906;
var height = 906;
var playerSpeed = 2;

var supplies = 30;

var weaponSwingTime = 10;

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

//these are now declared in objects.js
// var player = new Sprite(100, 100, 25, "blue");
// var boat = new Sprite(boatX*tileDict["~"].frameArray[0].width,boatY*tileDict["~"].frameArray[0].height,15);
var weaponTimer = 0;
var player = new Sprite(100, 100, 25, "blue");
var playerWeapon = new Sprite(100, 122.5, player.radius * 1.3, "black", player.radius * 1.3 * 0.9, player.radius * 1.3 * 0.9)
var attackSprites = [];
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
  // -- timed events can go here -- //
  time ++;
  if (time % 30 === 0) {
    // -- check for monster movement every half second -- //
    for (i = 0; i < monsters.length; i++) {
      monsters[i].monsterMove();
    };
  } else if (time % 81 === 0) {
    // -- Spawn random monsters -- //
    var randomColor = "#";
    while (randomColor.length <= 6) {
      randomColor += (Math.floor(Math.random() * 9) + 1);
    };
    var randomXPos = 0;
    var randomYPos = 0;
    while (randomXPos < 1 || Math.abs(randomXPos - player.xPos) < 100) {
      randomXPos = (Math.floor(Math.random() * width / 2 + width / 4));
    };
    while (randomYPos < 1 || Math.abs(randomYPos - player.yPos) < 100) {
      randomYPos = (Math.floor(Math.random() * height / 2 + height / 4));
    };
    var newMonster = new Sprite(randomXPos, randomYPos, 35, randomColor);
    monsters.push(newMonster);
  }
  if (time < weaponTimer) {
    // -- check for collisions with monsters and your weapon while weapon is active -- //
    console.log("hi")
    for (var i = monsters.length - 1; i >= 0; i --) {
      if (collisionCheck(playerWeapon, monsters[i])) {
        monsters.splice(i, 1);
      };
    };
  }
};


// -- place update functions in here -- //
// -- Updates are used to incrementally adjust an objects position and possibly other things.  Called every frame through the step function -- //
var update = function() {

  if (weaponTimer <= time) {
    player.update();
  }
  for (var i=0; i < monsters.length; i++) {
    monsters[i].update();
  }
  if(player.yPos>700) {
    currentRoom = allRooms["b"];
  }
  if(player.xVel || player.yVel) {
    playerWeapon.weaponUpdate(player);
  }
  currentRoom.update();
};

// -- place items that need to be drawn in here. static lines, text, images and objects -- //
var draw = function() {
  context.fillStyle = "#666";
  context.fillRect(0, 0, width, height);
  currentRoom.draw(context);
  // currentRoom.draw(context);
  for (i = 0; i < monsters.length; i++) {
    monsters[i].draw();
  };
  for (var i = 0; i < attackSprites.length; i ++) {
    attackSprites[i].draw();
  };
  playerWeapon.draw();
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

  if(currentRoom===allRooms["overworld"]) {
    var newRoom = currentRoom.moveOverworld(parseInt(event.keyCode)-96);
    currentRoom = allRooms[newRoom];
    if(newRoom!="overworld") {
      currentRoom.addSprite(player);
      player.xPos = currentRoom.entrance.xPos;
      player.yPos = currentRoom.entrance.yPos;
    }
  }
  if (event.keyCode === 32) {
    weaponTimer = time + weaponSwingTime;
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
