
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

Room.prototype.addMap = function(map, foreground) {
  if(foreground) {
    this.foreground = map;
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
