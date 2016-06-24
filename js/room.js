/*#########################################################################################
          ROOM
  -- This file is where any functionality that occurs on the room level should be defined
###########################################################################################*/


/////TEST ENTITY -- added to test the rooms ability to handle different sprites -- should be removed eventually
function TestEntity1() {
  this.sprite = new Sprite(0,0,20, "blue");
}
function TestEntity2() {
  this.sprite = new Sprite(0,0,20, "green");
}


//  Room constructor
//  -- To be called in room-definitions.js. To create a room call the function and pass it
//      the width and height in tiles of the room to be created.
function Room(width, height) {
  this.width = width;
  this.height = height;
  this.background = [];
  this.backgroundAnimations = [];
  this.sprites = [];
  this.entities = [];
  this.monsters = [];
  this.entrance = undefined;
  this.completed = false;
  // -- for the overworld room
  this.boatX = Math.floor(this.width/2);
  this.boatY = Math.floor(this.height/2);
  // -- Boolean to stop triggering the light puzzle repeatedly -- //
  this.lightPuzzlePlayerBoolean = false;
  // -- variable to make collisionCheckLightPuzzle work -- //
  this.triggeredLight;
  // -- set up the light puzzle -- //
  this.currentLightPuzzle = [];
  this.wallObjects = [];
  this.switches = [];
}

// addMap method
//  -- To set up a room using maps, call this function in room-definitions.js.
//      Maps are 2D arrays containing single character strings representing eith the background tiles
//      or the game entites that comprise a room. To find out what strings represent what objects,
//      see tileDict and entityDict in room-definitions.js. Maps of tiles are for the background.
//      When adding a background map, the foreground parameter should be passed false. Maps of
//      tiles are for the foreground. When adding a foreground map, the foreground parameter should be passed true.
Room.prototype.addMap = function(map, foreground) {
  if(foreground) {

    this.foreground = map;
    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        var icon = this.foreground[y][x];
        if(icon!=" ") {
          var newEntity = entityDict.get(icon);
          if(newEntity!="") {
            if(newEntity instanceof Sprite) {
              this.sprites.push(newEntity);
              newEntity.yPos = y*64+32;
              newEntity.xPos = x*64+32;
            } else {
              this.entities.push(newEntity);
              newEntity.sprite.yPos = y*64+32;
              newEntity.sprite.xPos = x*64+32;
              //debugger;
              this.sprites.push(newEntity.sprite);
            }
          }
        }
        if(icon==="l") {
          this.currentLightPuzzle.push(newEntity);
          newEntity.column = ((x/2)+1)*10;
          newEntity.row = (y/2)+1;
          newEntity.sprite.ballColor = "brown";
          newEntity.sprite.front = false;
        } else if(icon==="@") {
          this.entrance = newEntity;
        } else if(icon==="w"||icon==="d"||icon==="u"||icon==="x"||icon==="X"||icon==="b"||icon==="p"||icon==="5"||icon==="6"||icon==="7"||icon==="8"||icon==="9") {
          if (parseInt(icon)<10 && parseInt(icon)>4) {
            newEntity.sprite.super.show("inDoorHClosed");
          } else if (icon === "b") {
            newEntity.sprite.super.show("boulder");
          } else if (icon === "p") {
            newEntity.sprite.super.show("hole");
          } else if (icon === "u") {
            newEntity.sprite.super.show("solidShort");
          } else if (icon === "x" || icon==="X") {
            newEntity.sprite.super.show("none");
          } else if (icon === "d") {
            newEntity.sprite.super.show("inDoorHClosed");
          }

          this.wallObjects.push(newEntity);
          if(parseInt(icon)) {
            newEntity.door = parseInt(icon);
          }
        } else if(icon==="$"||icon==="%"||icon ==="&"||icon==="0"||icon==="1"||icon==="2"||icon==="3"||icon==="4") {
          if(icon==="$") {
            newEntity.sprite.super = allSuperSprites["PickupSprite"].copy();
            newEntity.sprite.super.show("coin");
          } else if(icon==="%") {
            newEntity.sprite.super = allSuperSprites["PickupSprite"].copy();
            newEntity.sprite.super.show("heart");
          } else if(icon==="&") {
            newEntity.sprite.super = allSuperSprites["PickupSprite"].copy();
            newEntity.sprite.super.show("peach");
          } else {
            newEntity.sprite.super = allSuperSprites["Button"].copy();
            newEntity.sprite.super.show("off");
          }
          this.switches.push(newEntity);
          newEntity.idNumber = parseInt(icon);
          newEntity.sprite.front = false;
        } else if(icon==="f") {
          this.monsters.push(newEntity);
          newEntity.super = allSuperSprites["BatMobSprite"].copy();
          newEntity.super.show("flyLeft");
        } else if(icon==="c") {
          this.monsters.push(newEntity);
          newEntity.super = allSuperSprites["CrabMobSprite"].copy();
          newEntity.super.show("walk");
        }
      }
    }
  } else {
    this.background = map;
    //debugger;
    for(var y=0; y<this.height; y++) {
      this.backgroundAnimations.push([]);
      for(var x=0; x<this.width; x++) {
        this.backgroundAnimations[y].push(tileDict[this.background[y][x]].copy());
      }
    }
  }
}

// sortSprites and addSprite methods
//  -- These methods do not need to be called manually if using a map to set up a room.
//      If you want to add sprites to a room manually, call addSprite and pass it the sprite to be added
Room.prototype.sortSprites = function() {
  this.sprites.sort(function(a, b) {
    // if(typeof a.super != "undefined") {
    //   if(a.super.currentAnimation.spriteSheet.src===allSuperSprites["LightPanelSprite"].currentAnimation.spriteSheet.src) {
    //     return -1;
    //   }
    // }
    if(a.yPos < b.yPos) {
      return -1;
    } else if(a.yPos > b.yPos) {
      return 1;
    } else {
      return 0;
    }
  });
}
Room.prototype.addSprite = function(sprite) {
  this.sprites.push(sprite);
  this.sortSprites();
}

// draw and update methods
// -- these methods are to be called in the main game loop and contain code that is to be run every step of the game
Room.prototype.draw = function(ctx) {
  for(var y=0; y<this.height; y++) {
    for(var x=0; x<this.width; x++) {
      ani = this.backgroundAnimations[y][x];
      ani.play(ctx, 2*ani.frameArray[0].width*x, 2*ani.frameArray[0].height*y);
    }
  }
  for(var i=0; i<this.sprites.length; i++) {
    if(!this.sprites[i].front) {
      this.sprites[i].draw();
    }
  }
  this.sortSprites();
  for(var i=0; i<this.sprites.length; i++) {
    if(this.sprites[i].front) {
      this.sprites[i].draw();
    }
  }
}
Room.prototype.update = function() {
  boat.xPos = currentRoom.boatX*tileDict["~"].frameArray[0].width*2 + (tileDict["~"].frameArray[0].width);
  boat.yPos = currentRoom.boatY*tileDict["~"].frameArray[0].height*2  + (tileDict["~"].frameArray[0].height);
  this.collisionCheckLightPuzzle(player, this.currentLightPuzzle);
  // -- Checks if light puzzle is completed -- //
  if(this.monsters.length===0) {
    var prepareChimes = false;
    if(!this.completed && this.currentLightPuzzle.length > 0) {
      prepareChimes = true;
    }
    if (this.lightPuzzleCompleteCheck(true)) {
      if (this === currentRoom) {
        if(prepareChimes) {
          chimes.play();
        }
        this.completed = true;
        if(allRooms["q"].completed && allRooms["A"].completed && allRooms["l"].completed && allRooms["r"].completed && allRooms["s"].completed && allRooms["t"].completed){
          allRooms["overworld"].background[15][18] = "u";
          allRooms["overworld"].backgroundAnimations[15][18] = tileDict["u"].copy();
        }
      }
    }
  }
  for(var i=0; i<this.sprites.length; i++) {
    if (this.sprites[i] === player) {
      if (weaponTimer <= time && monsterHitTimer <= time) {
        this.sprites[i].update();
      }
    } else {
      this.sprites[i].update();
    }
  }
  for (i = 0; i < this.monsters.length; i ++) {
    if (collisionCheck(this.monsters[i], player)) {
      collisionCount ++;
      var reboundVector = vector(this.monsters[i].xPos, this.monsters[i].yPos, player.xPos, player.yPos);
      momoBeingHit.currentTime = 0;
      momoBeingHit.play();
      player.xPos += knockBack * reboundVector[0];
      player.yPos += knockBack * reboundVector[1];
      monsterHitTimer = time + 15;
      player.health-=0.5;
      if(player.health <= 0) {
        message = "You were killed by monsters.";
        lightRoomMusic.pause();
        boulderRoomMusic.pause();
        oniBattleMusic.pause();
        deathMusic.play();
      }
      console.log("Health: "+player.health.toString());
    }
  };
  for (var i=0; i < this.wallObjects.length; i++) {
    if(this.wallObjects[i].behavior==="completionDoor" && this.completed) {
      this.wallObjects[i].doorOpen = true;
      this.wallObjects[i].sprite.super.show("inDoorHOpen");
      this.wallObjects[i].sprite.front = false;
    }
    this.wallObjects[i].xMovable = true;
    this.wallObjects[i].yMovable = true;
    for(var s=0; s<this.sprites.length; s++) {
      if(this.sprites[s]!=player && this.wallObjects[i].behavior!="exitDoor" && this.sprites[s].front) {
        this.wallObjects[i].collisionWithSprite(this.sprites[s]);
      }
    }
    this.wallObjects[i].collisionWithSprite(player);
  }
  for (var i=0; i < this.switches.length; i++) {
    this.switches[i].collisionWithSprite(player);
  }
}




Room.prototype.runTimedEvents = function() {
  for (i = 0; i < this.monsters.length; i++) {
    this.monsters[i].monsterMove();
  }
  if (time < weaponTimer) {
    // -- check for collisions with monsters and your weapon while weapon is active -- //
    for (var i = this.monsters.length - 1; i >= 0; i --) {
      if (collisionCheck(playerWeapon, this.monsters[i])) {
        if(this.monsters[i].ballColor != "#666") {
          var reboundVector = vector(player.xPos, player.yPos, this.monsters[i].xPos, this.monsters[i].yPos);
          this.monsters[i].xPos += knockBack * reboundVector[0];
          this.monsters[i].yPos += knockBack * reboundVector[1];
        }
        if(this.monsters[i].ballColor === "#000") {
          this.monsters[i].super.show("hit");
        }
        if(!hitActive) {
          this.monsters[i].health-=1;
          hitActive = true;
        }
        if (this.monsters[i].ballColor === "#000" || this.monsters[i].ballColor === "#111") {
          monsterBeingHit.play();
        } else if (this.monsters[i].ballColor === "#666"){
          if (this.monsters[i].health === 9) {
            oniLaugh.play();
          } else {
            oniGettingHit.currentTime = 0
            oniGettingHit.play();
          }
        }
        console.log("Monster Health: "+this.monsters[i].health.toString());
        if(this.monsters[i].health<=0) {
          this.sprites.splice(this.sprites.indexOf(this.monsters[i]),1);
          this.monsters.splice(i, 1);
        }
      }
    };
  } else {
    weaponActive = false;
    hitActive = false;
  }
}

Room.prototype.reset = function() {
  if(currentRoom!=allRooms["overworld"]) {
    currentRoom = allRooms["overworld"];
    message = "The island shifts beneath your feet.";
    transitionTimer = time + 60;
    var allRoomKeys = Object.keys(allRooms);
    var copy = new Room(this.width, this.height);
    for(var i=0; i<allRoomKeys.length; i++) {
      if(allRooms[allRoomKeys[i]]===this) {
        copy.addMap(this.foreground, true);
        copy.addMap(this.background, false);
        allRooms[allRoomKeys[i]] = copy;
        delete this;
      }
    }
  }
}

// findIsland and moveOverworld methods
// -- These methods deal with movement in the overworld
Room.prototype.findIsland = function(startX, startY) {
  var left = startX; var right = startX; var up = startY; var down = startY;
  while(true) {
    if(left-1>=0){left--;}
    if(right+1<this.width){right++;}
    if(up-1>=0){up--;}
    if(down+1<this.height){down++;}
    for(var x=left; x<=right; x++) {
      if(this.background[up][x]!="~") {
        return[x,up];
      } else if(this.background[down][x]!="~") {
        return[x,down];
      }
    }
    for(var y=up; y<down; y++) {
      if(this.background[y][left]!="~") {
        return[left,y];
      } else if(this.background[y][right]!="~") {
        return[right,y];
      }
    }
  }
}
Room.prototype.moveOverworld = function(direction) {
  if(0 < direction&&direction < 10) {
    var newX = this.boatX;
    var newY = this.boatY;
    if(direction>6) {
      newY--;
    } else if(direction<4) {
      newY++;
    }
    if((direction-1)%3===0) {
      newX--;
    } else if(direction%3===0) {
      newX++;
    }
    if(0 <= newX&&newX < this.width  &&  0 <= newY&&newY < this.height) {
      supplies --;
      if(supplies<0) {
        message = "You ran out of food. You lost two hearts.";
        transitionTimer = time + 150;
        player.health -= 2;
        if(player.health <= 0) {
          message = "You starved to death.";
          overworldMusic.pause();
          deathMusic.play();
        }
        supplies = 5;
        var nearestCoords = this.findIsland(boatX, boatY);
        newX = nearestCoords[0];
        newY = nearestCoords[1];
      }
      this.boatX = newX;
      this.boatY = newY;
      if(this.background[newY][newX]!="~") {
        boat.super.show("momohead");
        return this.background[newY][newX];
      } else {
        boat.super.show("boat");
      }
    }
  }
  return "overworld";
}

// Light puzzle methods
// -- these methods are used to make light puzzles work
Room.prototype.collisionCheckLightPuzzle = function(triggeringSprite, lightPuzzleArray) {
  for (var i = 0; i < lightPuzzleArray.length; i++) {

    if (calculateDistance(lightPuzzleArray[i].sprite, triggeringSprite) <= (lightPuzzleArray[i].sprite.radius + triggeringSprite.radius) && !this.lightPuzzlePlayerBoolean) {
      lightPuzzleArray[i].toggleLights(this.currentLightPuzzle);
      this.triggeredLight = lightPuzzleArray[i].sprite;
      this.lightPuzzlePlayerBoolean = true;
    }
  }
  if (this.lightPuzzlePlayerBoolean === true && calculateDistance(this.triggeredLight, player) > this.triggeredLight.radius + triggeringSprite.radius + 10) {
    this.lightPuzzlePlayerBoolean = false;
  }
}

// -- Checks that all isLit booleans in an array, lightArray, match the boolean you input in booleanToMatch -- //
Room.prototype.lightPuzzleCompleteCheck = function(booleanToMatch) {
  var puzzleCompleted = true;
  //if(this.currentLightPuzzle.length===0) {return false;}
  for (var i = 0; i < this.currentLightPuzzle.length; i ++) {
    if (this.currentLightPuzzle[i].isLit != booleanToMatch) {
      puzzleCompleted = false;
    }
  };
  // if (puzzleCompleted = true) {
  //   chimes.play();
  // }
  return puzzleCompleted;
};


Room.prototype.spawnMonster = function() {
  // -- Spawn random monsters -- //
  var randomXPos = 0;
  var randomYPos = 0;
  var legalPosition = false;
  var randomColor = Math.floor(Math.random() * 2);
  if (randomColor === 0) {
    randomColor = "#000";
    var monsterRadius = crabRadius;
  } else {
    randomColor = "#111";
    var monsterRadius = batRadius;
  }
  while (legalPosition === false) {
    var collisionAlert = false;
    while (randomXPos < 1 || Math.abs(randomXPos - player.xPos) < 75) {
      randomXPos = (Math.floor(Math.random() * this.width * 64 * 0.9 + monsterRadius));
    };
    while (randomYPos < 1 || Math.abs(randomYPos - player.yPos) < 75) {
      randomYPos = (Math.floor(Math.random() * this.height * 64 * 0.9 + monsterRadius));
    };
    for (var i = 0; i < this.sprites.length; i ++) {
      if (collisionCheckOneSprite(this.sprites[i], randomXPos, randomYPos, monsterRadius)) {
        collisionAlert = true;
        console.log("x=" + randomXPos + " y=" + randomYPos);
      }
      if (collisionAlert === false) {
        legalPosition = true;
      }
    };
  };
  var newMonster = new Sprite(randomXPos, randomYPos, monsterRadius, randomColor);
  if(newMonster.ballColor==="#000") {
    newMonster.super = allSuperSprites["CrabMobSprite"].copy();
  } else if(newMonster.ballColor==="#111") {
    newMonster.super = allSuperSprites["BatMobSprite"].copy();
  }
  this.monsters.push(newMonster);
  this.sprites.push(newMonster);
};
