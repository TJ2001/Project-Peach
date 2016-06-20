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
  get: function(icon) {
    if(icon==="q") {
      return new TestEntity1();
    } else if(icon==="w") {
      return new TestEntity2();
    }
  }
}


function Room(width, height) {
  this.width = width;
  this.height = height;
  this.background = [];
  this.sprites = [];
  this.entities = [];
}

Room.prototype.addMap = function(map, foreground) {
  if(foreground) {
    this.foreground = map;
    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        var icon = this.foreground[y][x];
        if(icon!=" ") {
          var newEntity = entityDict.get(icon)
          this.entities.push(newEntity);
          newEntity.sprite.yPos = y*64+32;
          newEntity.sprite.xPos = x*64+32;
          this.sprites.push(newEntity.sprite);
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
