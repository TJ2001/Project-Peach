/*#########################################################################
          ANIMATION DEFINITIONS
  -- all SuperSprite and Animation objects are to be declared in this file
############################################################################*/


//  allSuperSprites Object
// -- This object contains all supersprites. To create a new supersprite, add a key to this object and
//      make a call to the constructor to set it's value
var allSuperSprites = {
  "MomoSprite": new SuperSprite("down", new Animation("img/Momo-Spritesheet.png",257,0,64,64,4,10),true,function() {
      var s = this.obj;
      if(weaponActive) {
        if(this.currentAnimation===this.animations["down"] || this.currentAnimation===this.animations["downStill"] || this.currentAnimation===this.animations["downSwing"]) {
          return "downSwing";
        } else if(this.currentAnimation===this.animations["up"] || this.currentAnimation===this.animations["upStill"] || this.currentAnimation===this.animations["upSwing"]) {
          return "upSwing";
        } else if(this.currentAnimation===this.animations["left"] || this.currentAnimation===this.animations["leftStill"] || this.currentAnimation===this.animations["leftSwing"]) {
          return "leftSwing";
        } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"] || this.currentAnimation===this.animations["rightSwing"]) {
          return "rightSwing";
        } else if(this.currentAnimation===this.animations["upRight"] || this.currentAnimation===this.animations["upRightStill"] || this.currentAnimation===this.animations["upRightSwing"]) {
          return "upRightSwing";
        } else if(this.currentAnimation===this.animations["upLeft"] || this.currentAnimation===this.animations["upLeftStill"] || this.currentAnimation===this.animations["upLeftSwing"]) {
          return "upLeftSwing";
        } else if(this.currentAnimation===this.animations["downRight"] || this.currentAnimation===this.animations["downRightStill"] || this.currentAnimation===this.animations["downRightSwing"]) {
          return "downRightSwing";
        } else if(this.currentAnimation===this.animations["downLeft"] || this.currentAnimation===this.animations["downLeftStill"] || this.currentAnimation===this.animations["downLeftSwing"]) {
          return "downLeftSwing";
        }
      }
      if(s.xVel===0 && s.yVel===0) {
        if(this.currentAnimation===this.animations["down"] || this.currentAnimation===this.animations["downStill"] || this.currentAnimation===this.animations["downSwing"]) {
          return "downStill";
        } else if(this.currentAnimation===this.animations["up"] || this.currentAnimation===this.animations["upStill"] || this.currentAnimation===this.animations["upSwing"]) {
          return "upStill";
        } else if(this.currentAnimation===this.animations["left"] || this.currentAnimation===this.animations["leftStill"] || this.currentAnimation===this.animations["leftSwing"]) {
          return "leftStill";
        } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"] || this.currentAnimation===this.animations["rightSwing"]) {
          return "rightStill";
        } else if(this.currentAnimation===this.animations["upRight"] || this.currentAnimation===this.animations["upRightStill"] || this.currentAnimation===this.animations["upRightSwing"]) {
          return "upRightStill";
        } else if(this.currentAnimation===this.animations["upLeft"] || this.currentAnimation===this.animations["upLeftStill"] || this.currentAnimation===this.animations["upLeftSwing"]) {
          return "upLeftStill";
        } else if(this.currentAnimation===this.animations["downRight"] || this.currentAnimation===this.animations["downRightStill"] || this.currentAnimation===this.animations["downRightSwing"]) {
          return "downRightStill";
        } else if(this.currentAnimation===this.animations["downLeft"] || this.currentAnimation===this.animations["downLeftStill"] || this.currentAnimation===this.animations["downLeftSwing"]) {
          return "downLeftStill";
        }
      }
      var angle = (Math.atan(Math.abs(s.xVel)/Math.abs(s.yVel)))*(180/Math.PI);
      if(angle < 23) {
        if(s.yVel>0) {
          return "down";
        } else {
          return "up"
        }
      } else if(angle > 68) {
        if(s.xVel>0) {
          return "right";
        } else {
          return "left"
        }
      } else {
        if(s.xVel>0) {
          if(s.yVel>0) {
            return "downRight";
          } else {
            return "upRight";
          }
        } else {
          if(s.yVel>0) {
            return "downLeft";
          } else {
            return "upLeft";
          }
        }
      }
    }),
    "LightPanelSprite": new SuperSprite("off", new Animation("img/light-panel1-sm.png",0,0,32,32,1,10)),
    "WallSprite": new SuperSprite("solid", new Animation("img/inroom-wall2.png",0,0,32,64,1,10)),
    "MapMarker": new SuperSprite("momohead", new Animation("img/overworld.png",64,0,16,16,1,10)),

    "Fireball": new SuperSprite("upright", new Animation("img/fireball.png",0,0,32,32,3,10)),

    "CrabMobSprite": new SuperSprite("idle", new Animation("img/Monster-Spritesheet.png",89,0,43,18,2,20)),
    "BatMobSprite": new SuperSprite("flyLeft", new Animation("img/monster-bat1.png",0,0,32,32,6,2))

}

// -- Here, new animations can be constructed and added to the supersprites declared above
allSuperSprites["MomoSprite"].addAnimation("up", new Animation("img/Momo-Spritesheet.png",256,64,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("left", new Animation("img/Momo-Spritesheet.png",256,128,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("right", new Animation("img/Momo-Spritesheet.png",256,192,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("downLeft", new Animation("img/Momo-Spritesheet.png",256,256,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("downRight", new Animation("img/Momo-Spritesheet.png",256,320,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("upRight", new Animation("img/Momo-Spritesheet.png",256,384,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("upLeft", new Animation("img/Momo-Spritesheet.png",256,448,64,64,4,10));
allSuperSprites["MomoSprite"].addAnimation("upStill", new Animation("img/Momo-Spritesheet.png",256,64,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("downStill", new Animation("img/Momo-Spritesheet.png",0,512,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("leftStill", new Animation("img/Momo-Spritesheet.png",64,512,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("rightStill", new Animation("img/Momo-Spritesheet.png",128,512,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("upLeftStill", new Animation("img/Momo-Spritesheet.png",0,576,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("upRightStill", new Animation("img/Momo-Spritesheet.png",64,576,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("downLeftStill", new Animation("img/Momo-Spritesheet.png",128,576,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("downRightStill", new Animation("img/Momo-Spritesheet.png",192,576,64,64,1,10));
allSuperSprites["MomoSprite"].addAnimation("leftSwing", new Animation("img/Momo-Spritesheet.png",0,256,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("rightSwing", new Animation("img/Momo-Spritesheet.png",0,192,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("upSwing", new Animation("img/Momo-Spritesheet.png",0,128,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("downSwing", new Animation("img/Momo-Spritesheet.png",0,448,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("upLeftSwing", new Animation("img/Momo-Spritesheet.png",0,64,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("upRightSwing", new Animation("img/Momo-Spritesheet.png",0,0,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("downLeftSwing", new Animation("img/Momo-Spritesheet.png",0,384,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("downRightSwing", new Animation("img/Momo-Spritesheet.png",0,320,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("leftHit", new Animation("img/Momo-Spritesheet.png",384,512,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("rightHit", new Animation("img/Momo-Spritesheet.png",448,512,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("upHit", new Animation("img/Momo-Spritesheet.png",320,512,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("downHit", new Animation("img/Momo-Spritesheet.png",256,512,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("upLeftHit", new Animation("img/Momo-Spritesheet.png",448,576,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("upRightHit", new Animation("img/Momo-Spritesheet.png",384,576,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("downLeftHit", new Animation("img/Momo-Spritesheet.png",256,576,64,64,4,5));
allSuperSprites["MomoSprite"].addAnimation("downRightHit", new Animation("img/Momo-Spritesheet.png",320,576,64,64,4,5));


allSuperSprites["LightPanelSprite"].addAnimation("on", new Animation("img/light-panel1-sm.png",32,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("boulder", new Animation("img/boulder1.png",0,0,32,32,1,10));

allSuperSprites["CrabMobSprite"].addAnimation("walk", new Animation("img/Monster-Spritesheet.png",1,0,43,18,2,20));
allSuperSprites["CrabMobSprite"].addAnimation("hit", new Animation("img/Monster-Spritesheet.png",1,18,43,18,4,5));
allSuperSprites["CrabMobSprite"].addAnimation("swipeLeft", new Animation("img/Monster-Spritesheet.png",177,0,43,18,4,5));
allSuperSprites["CrabMobSprite"].addAnimation("swipeRight", new Animation("img/Monster-Spritesheet.png",177,18,43,18,4,5));

allSuperSprites["BatMobSprite"].addAnimation("flyRight", new Animation("img/monster-bat1.png",0,32,32,32,6,2));

allSuperSprites["MapMarker"].addAnimation("boat", new Animation("img/overworld.png",80,0,16,16,1,10));
allSuperSprites["Fireball"].addAnimation("upleft", new Animation("img/fireball.png",101,0,32,32,3,10));
allSuperSprites["Fireball"].addAnimation("up", new Animation("img/fireball.png",6,36,32,32,3,10));
allSuperSprites["Fireball"].addAnimation("down", new Animation("img/fireball.png",104,33,32,32,3,10));
allSuperSprites["Fireball"].addAnimation("left", new Animation("img/fireball.png",1,69,32,32,3,10));
allSuperSprites["Fireball"].addAnimation("right", new Animation("img/fireball.png",102,69,32,32,3,10));
