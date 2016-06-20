
tileDict = {
  "a": new Animation("img/test-image.jpg",0,0,30,30,1,10),
  "b": new Animation("img/test-image.jpg",0,30,30,30,1,10),
  "c": new Animation("img/test-image.jpg",0,60,30,30,1,10)
}


function Room(width, height) {
  this.width = width;
  this.height = height;
  this.background = [];
  this.foreground = [];
}

Room.prototype.addMap = function(map, foreground) {
  if(foreground) {
    this.foreground = map;
  } else {
    this.background = map;
  }
}

Room.prototype.draw = function(ctx) {
  for(var y=0; y<this.height; y++) {
    for(var x=0; x<this.width; x++) {
      tileDict[this.background[y][x]].play(ctx, 60*x, 60*y);
    }
  }
}
