
tileDict = {
  "a": new Animation("img/test-image.jpg",0,0,30,30,1,10),
  "b": new Animation("img/test-image.jpg",0,30,30,30,1,10),
  "c": new Animation("img/test-image.jpg",0,60,30,30,1,10)
}


function Room(width, height) {
  this.width = width;
  this.height = height;
  this.background = [];
  this.sprites = [];
}

Room.prototype.addMap = function(map) {
  if(foreground) {
    this.foreground = map;
  } else {
    this.background = map;
  }
}

Room.prototype.sortSprite = function(sprite) {
  var index = this.sprites.getIndexOf(sprite);
  var inc = 1;
  if(sprite.yPos<sprites[index+1]) {
    inc = -1;
  }
  for(var i=0; i!=-1 && i!=this.sprites.length; i+=inc) {
    if(inc===1) {
      if(sprite.yPos<this.sprites[i-1].yPos) {
        this.sprites[i-1] = this.sprites[i];
        this.sprites[i] = sprite;
      } else {
        this.sprites[i-1] = this.sprites[i];
      }
    } else {
      if(sprite.yPos>this.sprites[i+1].yPos) {
        this.sprites[i+1] = this.sprites[i];
        this.sprites[i] = sprite;
      } else {
        this.sprites[i+1] = this.sprites[i];
      }
    }
  }
}

Room.prototype.addSprite = function(sprite) {
  this.sprites.push(sprite);
  this.sortSprite(sprite);
}

Room.prototype.draw = function(ctx) {
  for(var y=0; y<this.height; y++) {
    for(var x=0; x<this.width; x++) {
      tileDict[this.background[y][x]].play(ctx, 60*x, 60*y);
    }
  }
  this.sprites.forEach(function(sprite) {
    sprite.draw();
  });
}
