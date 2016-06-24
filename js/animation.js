/*###############################################################################
          ANIMATION
  -- This file contains the framework for creating animations from spritesheets
################################################################################*/


//  SUPERSPRITE OBJECT
//    Acts as a container for multiple animations associated with a single in game object

//Constructor --
/*  Instructions for use:
      Call when an object is needed to store multiple animations for a single object
      Arguments are:
      key: a string that gives a name to the default animation
      animation: the default animation
      autoChoose: Optional - boolean value which, if true, tells the object to use a function to
        automatically choose which animation to play. False by default.
      choose: Optional - function that will test some conditions and return the key for the
        desired animation at any given point. Will return the first animation by default */
function SuperSprite(key, animation,
            autoChoose=false, choose=function(){return Object.keys(this.animations)[0];}) {
  this.animations = {};
  this.animations[key] = animation;
  this.currentAnimation = animation;
  this.auto = autoChoose;
  this.chooseAnimation =  choose;
  this.height = this.currentAnimation.frameArray[0].height;
  this.width = this.currentAnimation.frameArray[0].width;
}

//addAnimation method --
//  Instructions: call to add animations to a SuperSprite, uses the same format as the constructor
SuperSprite.prototype.addAnimation = function(key, animation) {
  this.animations[key] = animation;
}

//addObject method --
//  Instruction: pass this method an object to associate it with this supersprite
SuperSprite.prototype.addObject = function(obj) {
  this.obj = obj;
  obj.super = this;
}

//show method --
//  Instructions: call to change the animation currently playing for a sprite. Must be used
//    to change animation when auto-choosing is disabled
//    Argument: key: the key associated with the desired animation
SuperSprite.prototype.show = function(key) {
  this.currentAnimation = this.animations[key];
  if(!this.auto) {
    this.currentAnimation.currentFrame = -1;
  }
}

//draw method --
/*  Instructions for use:
      Place method call in the animation update section of the game loop
      Arguments are:
        ctx: CanvasRenderingContext2D with which the animation is to be drawn
        x,y: coordiates on the canvas where the animation is to be drawn */
SuperSprite.prototype.draw = function(ctx,x,y) {
  if(this.auto) {
    this.show(this.chooseAnimation());
  }
  this.currentAnimation.play(ctx,x,y);
}

SuperSprite.prototype.copy = function() {
  var aniKeys = Object.keys(this.animations);
  var newSuper = new SuperSprite(aniKeys[0], this.animations[aniKeys[0]].copy());
  for(var i=1; i<aniKeys.length; i++) {
    newSuper.addAnimation(aniKeys[i], this.animations[aniKeys[i]].copy());
  }
  return newSuper;
}
////////////////////////////////////



//  ANIMATION OBJECT

//Constructor --
/*  Instructions for use:
      Use with a spritesheet image. Frames should be laid out in a row in sequential
      order left-to-right at the same height and with consistent height, width, and margins.
      When creating Animation object, the arguments are:
        imageSrc: a string containing the path to the spritesheet image
        x, y: coordinates of the top left pixel of the first frame of the animation on the spritesheet
        width, height: the width and height of a single animation frame
        numberOfFrames: obvious
        timing: default number of animation ticks for which a frame will display */
function Animation(imageSrc,x,y,width,height,numberOfFrames,timing) {
  var image = new Image();
  image.src = imageSrc;
  this.spriteSheet = image;
  this.currentFrame = -1; // -1: Ready to play for first time  -2: Do not play   Else: Current Frame
  this.tick = 0;
  this.frameArray = [];
  for(var i=0; i<numberOfFrames; i++) {
    this.frameArray.push(new Frame(image,x+(width*i),y,width,height,timing));
  }
}

//play method --
/*  Instructions for use:
      Place method call in the animation update section of the game loop
      Arguments are:
        ctx: CanvasRenderingContext2D with which the animation is to be drawn
        x,y: coordiates on the canvas where the animation is to be drawn */
Animation.prototype.play = function(ctx,x,y) {
  if(this.currentFrame===-2) {return;}
  if(this.currentFrame===-1) {
    var delay = 0;
    this.currentFrame = 0;
  } else if(this.currentFrame===0) {
    var delay = this.frameArray[this.frameArray.length-1].time;
  } else {
    var delay = this.frameArray[this.currentFrame-1].time;
  }
  this.frameArray[this.currentFrame].display(ctx,x,y);
  this.tick ++;
  if(this.tick >= delay) {
    this.tick = 0;
    this.currentFrame ++;
    if(this.currentFrame >= this.frameArray.length) {
      this.currentFrame = 0;
    }
  }
}

Animation.prototype.copy = function() {
  var frame1 = this.frameArray[0];
  var newAni = new Animation(this.spriteSheet.src,frame1.x,frame1.y,frame1.width,frame1.height,this.frameArray.length,frame1.time);
  delete newAni.frameArray;
  newAni.frameArray = this.frameArray;
  return newAni;
}
/////////////////////////////////////////////


//  FRAME OBJECT -- used by Animation object, no need to create or modify manually
function Frame(image,x,y,width,height,timing) {
  this.spriteSheet = image;
  this.spriteSheetX = x;
  this.spriteSheetY = y;
  this.width = width;
  this.height = height;
  this.time = timing;
}
Frame.prototype.display = function(ctx, x, y) {
  ctx.drawImage(this.spriteSheet, this.spriteSheetX, this.spriteSheetY, this.width, this.height, x, y, this.width*2, this.height*2);
}
///////////////////////////////////////////
