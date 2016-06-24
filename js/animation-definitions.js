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
      if(player.health<=0) {return "downHit";}
      if(weaponActive) {
        if(this.currentAnimation===this.animations["down"] || this.currentAnimation===this.animations["downStill"] || this.currentAnimation===this.animations["downSwing"] || this.currentAnimation===this.animations["downHit"]) {
          return "downSwing";
        } else if(this.currentAnimation===this.animations["up"] || this.currentAnimation===this.animations["upStill"] || this.currentAnimation===this.animations["upSwing"] || this.currentAnimation===this.animations["upHit"]) {
          return "upSwing";
        } else if(this.currentAnimation===this.animations["left"] || this.currentAnimation===this.animations["leftStill"] || this.currentAnimation===this.animations["leftSwing"] || this.currentAnimation===this.animations["leftHit"]) {
          return "leftSwing";
        } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"] || this.currentAnimation===this.animations["rightSwing"] || this.currentAnimation===this.animations["rightHit"]) {
          return "rightSwing";
        } else if(this.currentAnimation===this.animations["upRight"] || this.currentAnimation===this.animations["upRightStill"] || this.currentAnimation===this.animations["upRightSwing"] || this.currentAnimation===this.animations["upRightHit"]) {
          return "upRightSwing";
        } else if(this.currentAnimation===this.animations["upLeft"] || this.currentAnimation===this.animations["upLeftStill"] || this.currentAnimation===this.animations["upLeftSwing"] || this.currentAnimation===this.animations["upLeftHit"]) {
          return "upLeftSwing";
        } else if(this.currentAnimation===this.animations["downRight"] || this.currentAnimation===this.animations["downRightStill"] || this.currentAnimation===this.animations["downRightSwing"] || this.currentAnimation===this.animations["downRightHit"]) {
          return "downRightSwing";
        } else if(this.currentAnimation===this.animations["downLeft"] || this.currentAnimation===this.animations["downLeftStill"] || this.currentAnimation===this.animations["downLeftSwing"] || this.currentAnimation===this.animations["downLeftHit"]) {
          return "downLeftSwing";
        }
      }
      if(monsterHitTimer > time) {
        if(this.currentAnimation===this.animations["down"] || this.currentAnimation===this.animations["downStill"] || this.currentAnimation===this.animations["downSwing"] || this.currentAnimation===this.animations["downHit"]) {
          return "downHit";
        } else if(this.currentAnimation===this.animations["up"] || this.currentAnimation===this.animations["upStill"] || this.currentAnimation===this.animations["upSwing"] || this.currentAnimation===this.animations["upHit"]) {
          return "upHit";
        } else if(this.currentAnimation===this.animations["left"] || this.currentAnimation===this.animations["leftStill"] || this.currentAnimation===this.animations["leftSwing"] || this.currentAnimation===this.animations["leftHit"]) {
          return "leftHit";
        } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"] || this.currentAnimation===this.animations["rightSwing"] || this.currentAnimation===this.animations["rightHit"]) {
          return "rightHit";
        } else if(this.currentAnimation===this.animations["upRight"] || this.currentAnimation===this.animations["upRightStill"] || this.currentAnimation===this.animations["upRightSwing"] || this.currentAnimation===this.animations["upRightHit"]) {
          return "upRightHit";
        } else if(this.currentAnimation===this.animations["upLeft"] || this.currentAnimation===this.animations["upLeftStill"] || this.currentAnimation===this.animations["upLeftSwing"] || this.currentAnimation===this.animations["upLeftHit"]) {
          return "upLeftHit";
        } else if(this.currentAnimation===this.animations["downRight"] || this.currentAnimation===this.animations["downRightStill"] || this.currentAnimation===this.animations["downRightSwing"] || this.currentAnimation===this.animations["downRightHit"]) {
          return "downRightHit";
        } else if(this.currentAnimation===this.animations["downLeft"] || this.currentAnimation===this.animations["downLeftStill"] || this.currentAnimation===this.animations["downLeftSwing"] || this.currentAnimation===this.animations["downLeftHit"]) {
          return "downLeftHit";
        }
      }
      if(s.xVel===0 && s.yVel===0) {
        if(this.currentAnimation===this.animations["down"] || this.currentAnimation===this.animations["downStill"] || this.currentAnimation===this.animations["downSwing"] || this.currentAnimation===this.animations["downHit"]) {
          return "downStill";
        } else if(this.currentAnimation===this.animations["up"] || this.currentAnimation===this.animations["upStill"] || this.currentAnimation===this.animations["upSwing"] || this.currentAnimation===this.animations["upHit"]) {
          return "upStill";
        } else if(this.currentAnimation===this.animations["left"] || this.currentAnimation===this.animations["leftStill"] || this.currentAnimation===this.animations["leftSwing"] || this.currentAnimation===this.animations["leftHit"]) {
          return "leftStill";
        } else if(this.currentAnimation===this.animations["right"] || this.currentAnimation===this.animations["rightStill"] || this.currentAnimation===this.animations["rightSwing"] || this.currentAnimation===this.animations["rightHit"]) {
          return "rightStill";
        } else if(this.currentAnimation===this.animations["upRight"] || this.currentAnimation===this.animations["upRightStill"] || this.currentAnimation===this.animations["upRightSwing"] || this.currentAnimation===this.animations["upRightHit"]) {
          return "upRightStill";
        } else if(this.currentAnimation===this.animations["upLeft"] || this.currentAnimation===this.animations["upLeftStill"] || this.currentAnimation===this.animations["upLeftSwing"] || this.currentAnimation===this.animations["upLeftHit"]) {
          return "upLeftStill";
        } else if(this.currentAnimation===this.animations["downRight"] || this.currentAnimation===this.animations["downRightStill"] || this.currentAnimation===this.animations["downRightSwing"] || this.currentAnimation===this.animations["downRightHit"]) {
          return "downRightStill";
        } else if(this.currentAnimation===this.animations["downLeft"] || this.currentAnimation===this.animations["downLeftStill"] || this.currentAnimation===this.animations["downLeftSwing"] || this.currentAnimation===this.animations["downLeftHit"]) {
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
    "WallSprite": new SuperSprite("solid", new Animation("img/inroom-wall1.png",0,0,32,64,1,10)),
    "MapMarker": new SuperSprite("momohead", new Animation("img/overworld.png",64,0,16,16,1,10)),

    "Fireball": new SuperSprite("right", new Animation("img/fireball2.png",0,0,16,16,2,10)),

    "CrabMobSprite": new SuperSprite("idle", new Animation("img/Monster-Spritesheet.png",89,0,43,18,2,20)),
    "BatMobSprite": new SuperSprite("flyLeft", new Animation("img/monster-bat1.png",0,0,32,32,6,5)),
    "Button": new SuperSprite("on", new Animation("img/button.png",0,0,32,32,1,10)),
    "PickupSprite": new SuperSprite("heart", new Animation("img/Momo-Spritesheet.png",210,527,13,11,1,10)),
    "OniSprite": new SuperSprite("idle", new Animation("img/Monster-Spritesheet.png",184,247,184,199,2,30))
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
allSuperSprites["MomoSprite"].addAnimation("leftHit", new Animation("img/Momo-Spritesheet.png",384,512,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("rightHit", new Animation("img/Momo-Spritesheet.png",448,512,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("upHit", new Animation("img/Momo-Spritesheet.png",320,512,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("downHit", new Animation("img/Momo-Spritesheet.png",256,512,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("upLeftHit", new Animation("img/Momo-Spritesheet.png",448,576,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("upRightHit", new Animation("img/Momo-Spritesheet.png",384,576,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("downLeftHit", new Animation("img/Momo-Spritesheet.png",256,576,64,64,1,15));
allSuperSprites["MomoSprite"].addAnimation("downRightHit", new Animation("img/Momo-Spritesheet.png",320,576,64,64,1,15));


allSuperSprites["LightPanelSprite"].addAnimation("on", new Animation("img/light-panel1-sm.png",32,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("boulder", new Animation("img/boulder1.png",0,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("solidShort", new Animation("img/inroom-wall2.png",0,0,32,64,1,10));
allSuperSprites["WallSprite"].addAnimation("inDoorHClosed", new Animation("img/inroom-door1.png",0,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("inDoorHOpen", new Animation("img/inroom-door1.png",384,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("inDoorHOpening", new Animation("img/inroom-door1.png",0,0,32,32,13,10));
allSuperSprites["WallSprite"].addAnimation("inDoorVClosed", new Animation("img/inroom-door1-vert.png",0,0,32,64,1,10));
allSuperSprites["WallSprite"].addAnimation("inDoorVOpen", new Animation("img/inroom-door1-vert.png",224,0,32,64,1,10));
allSuperSprites["WallSprite"].addAnimation("inDoorVOpening", new Animation("img/inroom-door1-vert.png",0,0,32,64,8,10));
allSuperSprites["WallSprite"].addAnimation("hole", new Animation("img/hole1.png",0,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("boulderHole", new Animation("img/boulder-hole1.png",0,0,32,32,1,10));
allSuperSprites["WallSprite"].addAnimation("none", new Animation("img/boulder-hole1.png",32,32,32,32,1,10));

allSuperSprites["CrabMobSprite"].addAnimation("walk", new Animation("img/Monster-Spritesheet.png",1,0,43,18,2,20));
allSuperSprites["CrabMobSprite"].addAnimation("hit", new Animation("img/Monster-Spritesheet.png",1,18,43,18,1,15));
allSuperSprites["CrabMobSprite"].addAnimation("swipeLeft", new Animation("img/Monster-Spritesheet.png",178,1,43,18,3,5));
allSuperSprites["CrabMobSprite"].addAnimation("swipeRight", new Animation("img/Monster-Spritesheet.png",179,19,43,18,3,5));

allSuperSprites["BatMobSprite"].addAnimation("flyRight", new Animation("img/monster-bat1.png",0,32,32,32,6,5));

allSuperSprites["MapMarker"].addAnimation("boat", new Animation("img/overworld.png",80,0,16,16,1,10));

allSuperSprites["Fireball"].addAnimation("off", new Animation("img/fireball2.png",16,0,16,16,2,10));

allSuperSprites["Button"].addAnimation("off", new Animation("img/button.png",33,0,32,32,1,10));

allSuperSprites["PickupSprite"].addAnimation("peach", new Animation("img/Momo-Spritesheet.png",226,527,13,11,1,10));
allSuperSprites["PickupSprite"].addAnimation("coin", new Animation("img/Momo-Spritesheet.png",210,540,13,11,1,10));

allSuperSprites["OniSprite"].addAnimation("tell", new Animation("img/Monster-Spritesheet.png",0,247,184,199,1,30));

allSuperSprites["OniSprite"].addAnimation("swing", new Animation("img/Monster-Spritesheet.png",0,46,184,199,3,10));
allSuperSprites["OniSprite"].addAnimation("fireBreath", new Animation("img/Monster-Spritesheet.png",184,247,184,199,1,30));
allSuperSprites["OniSprite"].addAnimation("windup", new Animation("img/Monster-Spritesheet.png",0,46,184,199,1,5));
allSuperSprites["OniSprite"].animations["swing"].frameArray[1].time = 30;
