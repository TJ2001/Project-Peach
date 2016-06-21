/*#########################################################################################
            OBJECTS
  -- This file contains the constructors and method definitions and related functions for
      game entity objects, e.g. anything that appears on screen and has some functionality
      beyond just being an image or animation.
###########################################################################################*/
//--Note to Joel: Most of this code is yours, so I'll leave it to you to document


// Important objects
var player = new Sprite(100, 100, 25, "blue");
var boat = new Sprite(0,0,15);


function Sprite(xPos, yPos, radius, color = "red", xVel = 0, yVel = 0) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.radius = radius;
  this.ballColor = color;
  this.xVel = xVel;
  this.yVel = yVel;
  this.super = undefined;
};

// -- draws the sprite on the canvas -- //
Sprite.prototype.draw = function () {
  if(typeof this.super === "undefined") {
    context.beginPath();
    context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
    context.fillStyle = this.ballColor;
    context.lineWidth = 4;
    context.stroke();
  } else {
    this.super.draw(context, this.xPos-25, this.yPos-32);
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
  for (i = 0; i < wallObjects.length; i ++) {
    wallObjects[i].collisionWithSprite(this);
  };

  // if (this.yPos + this.radius >= height) {
  //     this.yVel *= -1;
  //   } else if (this.yPos - this.radius <= 0) {
  //     this.yVel *= -1;
  //   }
  // if (this.xPos + this.radius >= width) {
  //     this.xVel *= -1;
  //   } else if (this.xPos - this.radius <= 0) {
  //     this.xVel *= -1;
  //   }
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
  this.xPos = dependantSprite.xPos + this.xVel;
  this.yPos = dependantSprite.yPos + this.yVel;
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
  }
};

// --
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

// -- constructor for static rectangular objects. xPos and yPos are the top left corner of the wall object.  Behavior is how the wall will act with collisions. -- //
function Wall(xPos, yPos, xSpan, ySpan, color = "green", behavior = "solidWall") {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xSpan = xSpan;
  this.ySpan = ySpan;
  this.wallColor = color;
  this.behavior = behavior;
};

Wall.prototype.draw = function() {
  context.fillStyle = this.wallColor;
  context.lineWidth = 1;
  context.fillRect(this.xPos, this.yPos, this.xSpan, this.ySpan);
};

Wall.prototype.collisionWithSprite = function(sprite) {
  var collision = false;
  var xCollide = false;
  var yCollide = false;
  if (calculateDistanceOneSprite(sprite, this.xPos, this.yPos) <= sprite.radius) {
    collision = true;
    xCollide = true;
    yCollide = true;
  } else if (calculateDistanceOneSprite(sprite, this.xPos + this.xSpan, this.yPos) <= sprite.radius) {
    collision = true;
    xCollide = true;
    yCollide = true;
  } else if (calculateDistanceOneSprite(sprite, this.xPos, this.yPos + this.ySpan) <= sprite.radius) {
    collision = true;
    xCollide = true;
    yCollide = true;
  } else if (calculateDistanceOneSprite(sprite, this.xPos + this.xSpan, this.yPos + this.ySpan) <= sprite.radius) {
    collision = true;
    xCollide = true;
    yCollide = true;
  } else if (Math.abs(this.xPos + this.xSpan / 2 - sprite.xPos) <= this.xSpan / 2 + sprite.radius && Math.abs(this.yPos + this.ySpan / 2 - sprite.yPos) <= this.ySpan / 2 ) {
    collision = true;
    xCollide = true;
  } else if (Math.abs(this.xPos + this.xSpan / 2 - sprite.xPos) <= this.xSpan / 2 && Math.abs(this.yPos + this.ySpan / 2 - sprite.yPos) <= this.ySpan / 2 + sprite.radius)  {
    collision = true;
    yCollide = true;
  } else {
    return collision;
  }
  return this.collisionBehavior(sprite, xCollide, yCollide);
};

Wall.prototype.collisionBehavior = function(sprite, xCollide, yCollide) {
  if (this.behavior === "solidWall") {
    if (xCollide) {
      sprite.xPos = sprite.xPos - sprite.xVel;
    }
    if (yCollide) {
      sprite.yPos = sprite.yPos - sprite.yVel;
    }
  }
};

// -- A function to calculate the total distance between the centers of two sprites -- //
var calculateDistance = function(spriteOne, spriteTwo) {
  return Math.sqrt(Math.pow((spriteOne.xPos - spriteTwo.xPos), 2) + Math.pow((spriteOne.yPos - spriteTwo.yPos), 2));
};

var calculateDistanceOneSprite = function(spriteOne, xPos, yPos) {
  return Math.sqrt(Math.pow((spriteOne.xPos - xPos), 2) + Math.pow((spriteOne.yPos - yPos), 2));
};

var attack = function(attackingSprite, attackRadiusModifier, attackPositionModifier) {
  attackTimer = time + 100;
  var attackSprite = new Sprite(attackingSprite.xPos , attackingSprite.yPos + attackingSprite.radius * 0.9, attackingSprite.radius * attackRadiusModifier);
  attackSprites.push(attackSprite);
  console.log(attackSprite);
};
