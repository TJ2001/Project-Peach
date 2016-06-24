/*#########################################################################################
            OBJECTS
  -- This file contains the constructors and method definitions and related functions for
      game entity objects, e.g. anything that appears on screen and has some functionality
      beyond just being an image or animation.
###########################################################################################*/
//--Note to Joel: Most of this code is yours, so I'll leave it to you to document


// Important objects
var player = new Sprite(120, 800, 20, "blue");
var boat = new Sprite(0,0,15);
allSuperSprites["MapMarker"].addObject(boat);
var batRadius = 16;
var crabRadius = 16;


// -- SPRITE CONSTRUCTOR -- //
// -- This is the primary game object. It has a position, size and speed.  Super is used for animations -- //

function Sprite(xPos, yPos, radius, color = "red", xVel = 0, yVel = 0) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.radius = radius;
  this.ballColor = color;
  this.xVel = xVel;
  this.yVel = yVel;
  this.super = undefined;
  this.front = true;
  this.health = 3;
  this.oniTell = 0;
};

// -- draws the sprite object on the canvas -- //
Sprite.prototype.draw = function () {
  if(typeof this.super === "undefined") {
    context.beginPath();
    context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
    context.fillStyle = this.ballColor;
    context.strokeStyle = this.ballColor;
    context.lineWidth = 1;
    context.stroke();
  } else {
    if(Object.keys(this.super.animations).indexOf("solid") != -1) {
      if(this.super.currentAnimation===this.super.animations["solid"] || this.super.currentAnimation===this.super.animations["solidShort"]) {
        this.super.draw(context, this.xPos-this.super.width, this.yPos-(this.radius*3));
      } else if(this.super.currentAnimation===this.super.animations["hole"] || this.super.currentAnimation===this.super.animations["boulderHole"]) {
        this.super.draw(context, this.xPos-this.super.width, this.yPos-this.super.height/2-12);
      } else {
        this.super.draw(context, this.xPos-this.super.width, this.yPos-this.super.height/2);
      }
    } else if(this===player) {
      this.super.draw(context, this.xPos-this.super.width, this.yPos-(this.super.height + 10));
    } else if(this.ballColor === "#666") {
      this.super.draw(context, this.xPos-this.super.width+50, this.yPos-this.super.height);
    } else {
      this.super.draw(context, this.xPos-this.super.width, this.yPos-this.super.height);
    }
    // -- CODE FOR TESTING- draw the hitbox circle so we can adjust numbers -- //
    context.beginPath();
    context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.stroke();
  }
};

// -- Updates the sprites position -- //
Sprite.prototype.update = function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  if (this.ballColor === "blue" || this.ballColor === "#000" || this.ballColor === "#111") {
    if (this.xPos - this.radius < 64) {
      this.xPos = this.radius + 65;
    } else if (this.xPos + this.radius > currentRoom.width * 64 - 64) {
      this.xPos = currentRoom.width * 64 - this.radius - 65;
    }
    if (this.yPos - this.radius < 64) {
      this.yPos = this.radius + 65;
    } else if (this.yPos + this.radius > currentRoom.height * 64 - 64) {
      this.yPos = currentRoom.height * 64 - this.radius - 65;
    }
  }
};

// -- Special update method for sprites which are a weapon attack of another sprite -- //
// -- dependantSprite is the sprite that uses the weapon -- //
// -- you will call this when either of the dependantSprite's velocities are != 0 -- //
Sprite.prototype.weaponUpdate = function(dependantSprite) {
  if (dependantSprite.xVel) {
    this.xVel = dependantSprite.xVel / Math.abs(dependantSprite.xVel) * Math.abs(this.xVel);
  }
  if (dependantSprite.yVel) {
    this.yVel = dependantSprite.yVel / Math.abs(dependantSprite.yVel) * Math.abs(this.yVel);
  }
  if (dependantSprite.xVel && dependantSprite.yVel) {
    this.xPos = dependantSprite.xPos + 0.9 * this.xVel;
    this.yPos = dependantSprite.yPos + 0.9 * this.yVel;
  } else if (dependantSprite.xVel) {
    this.xPos = dependantSprite.xPos + this.xVel;
    this.yPos = dependantSprite.yPos;
  } else if (dependantSprite.yVel) {
    this.xPos = dependantSprite.xPos;
    this.yPos = dependantSprite.yPos + this.yVel;
  }
};
Sprite.prototype.oniFireball = function() {
  if(this.ballColor==="#666") {
    this.super.show("fireBreath");
    var fire = new Sprite(this.xPos,this.yPos,10,"#222");
    fire.super = allSuperSprites["Fireball"];
    fire.health = 300;
    currentRoom.addSprite(fire);
    currentRoom.monsters.push(fire);
    this.oniTell = 50;
  }
}
Sprite.prototype.oniSwing = function() {
  if(this.ballColor==="#666") {
    this.super.show("swing");
    this.super.currentAnimation.currentFrame = 0;
    var hit = new Sprite(this.xPos,this.yPos+80,150,"#222");
    hit.health = 5;
    currentRoom.addSprite(hit);
    currentRoom.monsters.push(hit);
    this.oniTell = 50;
  }
}

Sprite.prototype.monsterMove = function() {
  var randomNumber = Math.floor(Math.random() * 10);

  if(this.ballColor==="#666") {
    if(this.oniTell > 0) {
      this.oniTell -= 1;
    } else if(this.oniTell < 0) {
      this.oniTell += 1;
    }
    if(this.oniTell===1) {
      this.oniFireball();
    } else if(this.oniTell===-1) {
      this.oniSwing();
    } else if(this.oniTell===21) {
      this.oniTell = 0;
    } else if(this.oniTell===0) {
      this.super.show("idle");
      if(Math.random()<.01) {
        this.oniTell += 20;
      }
      if(Math.random()<.01) {
        this.oniTell -= 20;
      }
    } else if(this.oniTell < 21) {
      if(this.oniTell > 0) {
        this.super.show("tell");
      } else {
        this.super.show("windup");
      }
    }
  }
  // if(this.ballColor==="333") {
  //   this.health -=1;
  //   if(this.health <=0) {
  //     currentRoom.sprites.splice(currentRoom.sprites.indexOf(this),1);
  //     currentRoom.monsters.splice(currentRoom.monsters.indexOf(this),1);
  //   }
  // }
// -- causes the sprite to constantly move towards the player. This is the behavior for the fireballs -- //
  if (this.ballColor === "#222") {
    this.health -= 1;
    if(this.health <=0) {
      currentRoom.sprites.splice(currentRoom.sprites.indexOf(this),1);
      currentRoom.monsters.splice(currentRoom.monsters.indexOf(this),1);
    }
    if (this.xPos < player.xPos) {
      this.xVel = 1;
    } else if (this.xPos >player.xPos) {
      this.xVel = -1;
    } else {
      this.xVel = 0;
    }
    if (this.yPos < player.yPos) {
      this.yVel = 1;
    } else if (this.yPos >player.yPos) {
      this.yVel = -1;
    } else {
      this.yVel = 0;
    }
// -- causes the monster to adjust his yPos to be close to the player, then toggles to adjust xPos then back to yPos -- //
// -- this is the ai for the crab-- //
  } else if (this.ballColor === "#000") {
    if (Math.abs(this.yPos - player.yPos) >= 16  && this.xVel === 0) {
      if (this.yPos - player.yPos < 0) {
        this.yVel = 1.5;
        this.super.show("walk");
      } else {
        this.yVel = -1.5;
        this.super.show("walk");
      }
    } else if (Math.abs(this.xPos - player.xPos) < 16) {
      this.xVel = 0;
    } else if (this.xPos - player.xPos < 0) {
      this.xVel = 2.5;
      this.yVel = 0;
      this.super.show("swipeRight");
    } else if (this.xPos -player.xPos > 0) {
      this.xVel = -2.5;
      this.yVel = 0;
      this.super.show("swipeLeft");
    } else {
      this.xVel = 0;
    }
// --  causes the monster to head towards the player if the player is close enough to the monster -- //
  } else if (this.ballColor === "#111") {
    if (time % 30 === 0 ) {
      // if (calculateDistance(this, player) <= this.radius + 200) {
      //   if (player.xPos - this.xPos > 0 && randomNumber < 5) {
      //     this.xVel = 3;
      //     this.yVel = 0;
      // this.super.show("flyRight");
      //   } else if (player.xPos - this.xPos > 0 && randomNumber < 5) {
      //     this.xVel = -3;
      //     this.yVel = 0;
      // this.super.show("flyLeft");
      //   }
      //   if (player.yPos - this.yPos > 0 && randomNumber >= 5) {
      //     this.xVel = 0;
      //     this.yVel = 3;
      //   } else if (player.yPos - this.yPos > 0 && randomNumber >= 5) {
      //     this.xVel = 0;
      //     this.yVel = -3;
      //   }
      // } else {
        if (randomNumber ===  0) {
          this.xVel = 2;
          this.yVel = 0;
          this.super.show("flyRight");
        } else if (randomNumber === 1) {
          this.xVel = -2;
          this.yVel = 0;
          this.super.show("flyLeft");
        } else if (randomNumber === 2) {
          this.xVel = 0;
          this.yVel = 2;
        } else if (randomNumber === 3) {
          this.xVel = 0;
          this.yVel = -2;
        } else if (randomNumber === 4) {
          this.xVel = 0;
          this.yVel = 0;
        }
      // }
    }
  }
};

// -- a construcor to make light puzzles. -- //
function LightPuzzle(positionInGridX, positionInGridY, isLit = false) {
  this.sprite = new Sprite(0, 0, 32);
  // -- adjustments to allow checking neighbors based on numbers -- //
  this.column = 10 * positionInGridX;
  this.row = positionInGridY;
  this.isLit = isLit;
  var newLightSuper = allSuperSprites["LightPanelSprite"].copy();
  newLightSuper.addObject(this.sprite);
};

// -- This function will toggle all directly adjacent lights. -- //
LightPuzzle.prototype.toggleLights = function(currentLightPuzzle) {
  this.isLit = !this.isLit;
  var workingColumn = this.column;
  var workingRow = this.row;
  for(var i = 0; i < currentLightPuzzle.length; i ++) {
    if (Math.abs((workingRow + workingColumn) - (currentLightPuzzle[i].row + currentLightPuzzle[i].column)) === 1 || Math.abs((workingRow + workingColumn) - (currentLightPuzzle[i].row + currentLightPuzzle[i].column)) === 10) {
      currentLightPuzzle[i].isLit = !currentLightPuzzle[i].isLit;
      if (currentLightPuzzle[i].isLit) {
        currentLightPuzzle[i].sprite.super.show("on");
      } else {
        currentLightPuzzle[i].sprite.super.show("off");
      }
      if (this.isLit) {
        this.sprite.super.show("on");
      } else {
        this.sprite.super.show("off");
      }
    }
  };
};

// -- constructor for static rectangular objects. xPos and yPos are the top left corner of the wall object. xSpan and ySpan are the width and height.  Behavior is how the wall will act with collisions. -- //
function Wall(xPos, yPos, xSpan, ySpan, color = "green", behavior = "solidWall") {
  this.xSpan = xSpan;
  this.ySpan = ySpan;
  this.wallColor = color;
  this.behavior = behavior;
  this.sprite = new Sprite(xPos+xSpan/2, yPos, xSpan/2);
  this.door = -1;
  this.doorOpen = false;
  allSuperSprites["WallSprite"].copy().addObject(this.sprite);
  this.xMovable = true;
  this.yMovable = false;
};

Wall.prototype.draw = function() {
  context.fillStyle = this.wallColor;
  context.lineWidth = 1;
  context.fillRect(this.sprite.xPos-this.sprite.radius, this.sprite.yPos-this.sprite.radius, this.xSpan, this.ySpan);
};

// -- this will check a sprite for collisions with the Wall object and call collisionBehavior with the appropriate arguements. -- //
Wall.prototype.collisionWithSprite = function(sprite) {
  var xCollide = false;
  var yCollide = false;
  if(calculateDistance(this.sprite, sprite) <= this.sprite.radius + sprite.radius) {
    var angle = Math.abs(Math.atan((this.sprite.xPos-sprite.xPos)/(this.sprite.yPos-sprite.yPos))*(180/Math.PI));
    if(angle>35) {
      xCollide = true;
    }
    if(angle<55) {
      yCollide = true;
    }
    if(xCollide||yCollide) {
      return this.collisionBehavior(sprite, xCollide, yCollide);
    } else {
      return false;
    }
  }
};

//Collision Behavior used by all solid wall types
Wall.prototype.collideSolid = function(sprite, xCollide, yCollide) {
  if (xCollide) {
    while(Math.abs(this.sprite.xPos-sprite.xPos) <= this.sprite.radius + sprite.radius) {
      if(this.sprite.xPos>sprite.xPos) {
        var bump = Math.min(sprite.xVel, -.5);
      } else {
        var bump = Math.max(sprite.xVel, .5);
      }
      sprite.xPos = sprite.xPos + bump;
    }
  }
  if (yCollide) {
    while(Math.abs(this.sprite.yPos-sprite.yPos) <= this.sprite.radius + sprite.radius) {
      if(this.sprite.yPos>sprite.yPos) {
        var bump = Math.min(sprite.xVel, -.5);
      } else {
        var bump = Math.max(sprite.xVel, .5);
      }
      sprite.yPos = sprite.yPos + bump;
    }
  }
}
// -- collisionBehavior will be run by collisionWithSprite -- //
Wall.prototype.collisionBehavior = function(sprite, xCollide, yCollide) {
  if (this.behavior === "solidWall") {
    if(sprite.ballColor!="#666" && sprite.ballColor!="#222") {
      this.collideSolid(sprite, xCollide, yCollide);
    }
  } else if(this.behavior==="door" || this.behavior==="completionDoor") {
    if(!this.doorOpen) {
      this.collideSolid(sprite, xCollide, yCollide);
    }
  } else if(this.behavior==="boulder") {
    if (sprite!=player) {
      for(var i=0; i<currentRoom.wallObjects.length; i++) {
        var wo = currentRoom.wallObjects[i];
        if(wo.sprite===sprite && wo.behavior==="pit") {
          this.behavior = "none";
          wo.behavior = "none";
          wo.sprite.super.show("boulderHole");
          wo.sprite.front = false;
          currentRoom.sprites.splice(currentRoom.sprites.indexOf(this.sprite),1);
          return;
        }
      };
      this.collideSolid(sprite, xCollide, yCollide);
      if(xCollide) {
        this.xMovable = false;
      }
      if(yCollide) {
        this.yMovable = false;
      }
   } else {
      if(xCollide && !yCollide) {
        if(this.xMovable) {
          this.sprite.xPos += sprite.xVel*2;
        }
      } else if(yCollide && !xCollide) {
        if(this.yMovable) {
          this.sprite.yPos += sprite.yVel*2;
        }
      }
      this.collideSolid(sprite, xCollide, yCollide);
    }
  } else if(this.behavior==="pit") {
    if(Object.keys(sprite.super.animations).indexOf("solid")===-1) { this.collideSolid(sprite, xCollide, yCollide); }
  } else if (this.behavior === "bounceWall") {
    if (xCollide) {
      this.xVel *= -1;
    }
    if (yCollide) {
      this.yVel *= -1;
    }
  } else if (this.behavior === "exitDoor") {
    if(xCollide || yCollide) {
      currentRoom = allRooms["overworld"];
      lightRoomMusic.pause();
      boulderRoomMusic.pause();
      oniBattleMusic.pause();
      overworldMusic.play();
      console.log("overworldMusic should play now");
      message = "";
      transitionTimer = time + 60;
    }
  } else if (this.behavior === "exitGame") {
    //End of Game stuff here
  }
};

function Switch(func = function() {
      for(var i=0; i<currentRoom.wallObjects.length; i++) {
        var wo = currentRoom.wallObjects[i];
        if(wo.door===this.idNumber+5) {
          wo.doorOpen = true;
          wo.sprite.super.show("inDoorHOpen");
          this.sprite.super.show("on");
          wo.sprite.front = false;
        }
      }
    }) {
  this.sprite = new Sprite(0,0,16,"purple");
  this.idNumber = 0;
  this.func = func;
};

Switch.prototype.collisionWithSprite = function(sprite) {
  if(calculateDistance(this.sprite, sprite) <= this.sprite.radius + sprite.radius) {
    this.func();
  }
};

// -- A function to calculate the total distance between the centers of two sprites -- //
var calculateDistance = function(spriteOne, spriteTwo) {
  return Math.sqrt(Math.pow((spriteOne.xPos - spriteTwo.xPos), 2) + Math.pow((spriteOne.yPos - spriteTwo.yPos), 2));
};
var calculateDistanceOneSprite = function(spriteOne, xPos, yPos) {
  return Math.sqrt(Math.pow((spriteOne.xPos - xPos), 2) + Math.pow((spriteOne.yPos - yPos), 2));
};

// -- A function to check for collisions between two sprites. -- //
var collisionCheck = function(spriteOne, spriteTwo) {
  if (calculateDistance(spriteOne, spriteTwo) < spriteOne.radius + spriteTwo.radius) {
    return true;
  } else {
    return false;
  }
};

var collisionCheckOneSprite = function(spriteOne, xPos2, yPos2, radius2) {
  if (calculateDistanceOneSprite(spriteOne, xPos2, yPos2) < spriteOne.radius + radius2) {
    return true;
  } else {
    return false;
  }
};

var attack = function(attackingSprite, attackRadiusModifier, attackPositionModifier) {
  attackTimer = time + 100;
};
