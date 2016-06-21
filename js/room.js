/////TEST ENTITY
function TestEntity1() {
  this.sprite = new Sprite(0,0,20, "blue");
}
function TestEntity2() {
  this.sprite = new Sprite(0,0,20, "green");
}

/////////////////

tileDict = {
  "a": new Animation("img/test-image.jpg",0,0,32,32,1,10),
  "b": new Animation("img/test-image.jpg",0,32,32,32,1,10),
  "c": new Animation("img/test-image.jpg",0,64,32,32,1,10)
}
entityDict = {
  get: function(icon,x,y) {
    if(icon==="l") {
      return new LightPuzzle(0,0);
    } else if(icon==="q") {
      return new TestEntity1();
    } else if(icon==="w") {
      return new TestEntity2();
    } else {
      return "";
    }
  }
}


function Room(width, height) {
  this.width = width;
  this.height = height;
  this.background = [];
  this.sprites = [];
  this.entities = [];
  // -- Boolean to stop triggering the light puzzle repeatedly -- //
  this.lightPuzzlePlayerBoolean = false;
  // -- gloabal variable to make collisionCheckLightPuzzle work -- //
  this.triggeredLight;
  // -- set up the light puzzle -- //
  this.currentLightPuzzle = [];
}

Room.prototype.addMap = function(map, foreground) {
  if(foreground) {
    this.foreground = map;
    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        var icon = this.foreground[y][x];
        if(icon!=" ") {
          var newEntity = entityDict.get(icon);
          if(newEntity!="") {
            this.entities.push(newEntity);
            newEntity.sprite.yPos = y*64+32;
            newEntity.sprite.xPos = x*64+32;
            this.sprites.push(newEntity.sprite);
          }
        }
        if(icon==="l") {
          this.currentLightPuzzle.push(newEntity);
          newEntity.column = ((x/2)+1)*10;
          newEntity.row = (y/2)+1;
          newEntity.sprite.ballColor = "brown";
        }
      }
    }
  } else {
    this.background = map;
  }
}

Room.prototype.sortSprites = function() {
  this.sprites.sort(function(a, b) {
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

Room.prototype.draw = function(ctx) {
  for(var y=0; y<this.height; y++) {
    for(var x=0; x<this.width; x++) {
      tileDict[this.background[y][x]].play(ctx, 60*x, 60*y);
    }
  }
  for(var i=0; i<this.sprites.length; i++) {
    if(this.sprites[i].yVel != 0) {
      this.sortSprites(this.sprites[i]);
    }
    this.sprites[i].update();
    this.sprites[i].draw();
  }
}

Room.prototype.update = function() {
  this.collisionCheckLightPuzzle(player, this.currentLightPuzzle);
  // -- Checks if light puzzle is completed and 'opens' the East door if it is. -- //
  if (this.lightPuzzleCompleteCheck(this.currentLightPuzzle, true) === true) {
    doors[1].ballColor = "white";
  }
}

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
  for (var i = 0; i < this.currentLightPuzzle.length; i ++) {
    if (this.currentLightPuzzle[i].isLit != booleanToMatch) {
      puzzleCompleted = false;
    }
  };
  return puzzleCompleted;
};
