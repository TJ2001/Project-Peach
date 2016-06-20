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
    context.fill();
  } else {
    this.super.draw(context, this.xPos-25, this.yPos-32);
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

// --
function LightPuzzle(positionInGridX, positionInGridY, isLit = false) {
  this.sprite = new Sprite(0, 0, 32);
  // -- adjustments to allow checking neighbors based on numbers -- //
  this.column = 10 * positionInGridX;
  this.row = positionInGridY;
  this.isLit = isLit;
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
        currentLightPuzzle[i].sprite.ballColor = "yellow";
      } else {
        currentLightPuzzle[i].sprite.ballColor = "brown";
      }
      if (this.isLit) {
        this.sprite.ballColor = "yellow";
      } else {
        this.sprite.ballColor = "brown";
      }
    }
  };
};


// -- A function to calculate the total distance between the centers of two sprites -- //
var calculateDistance = function(spriteOne, spriteTwo) {
  return Math.sqrt(Math.pow((spriteOne.xPos - spriteTwo.xPos), 2) + Math.pow((spriteOne.yPos - spriteTwo.yPos), 2));
};
