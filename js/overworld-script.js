//globals
supplies = 30;
health = 10;
money = 10;
boatX = Math.floor(mapWidth/2);
boatY = Math.floor(mapHeight/2);
onIsland = true;

// map = [];
//
// //make the map
// for(var y=0; y<mapHeight; y++) {
//   map.push([]);
//   for(var x=0; x<mapWidth; x++) {
//     map[y].push("~");
//   }
// }

//make islands
// var placeIslands = function() {
//   for(var i=0; i<Math.min(mapHeight,mapWidth)/2; i+=1) {
//     for(var y=0+i; y<mapHeight-i; y++) {
//       for(var x=0+i; x<mapWidth-i; x++) {
//         var rand = Math.random();
//         if(rand<.0005*i) {
//           map[y][x] = "#";
//         }
//       }
//     }
//   }
// }
// map[boatY][boatX] = "@";
// placeIslands();

//return coords of nearest island
// var findIsland = function(startX, startY) {
//   left = startX; right = startX; up = startY; down = startY;
//   while(true) {
//     if(left-1>=0){left--;}
//     if(right+1<mapWidth){right++;}
//     if(up-1>=0){up--;}
//     if(down+1<mapHeight){down++;}
//     for(var x=left; x<=right; x++) {
//       if(map[up][x]==="#") {
//         return[x,up];
//       } else if(map[down][x]==="#") {
//         return[x,down];
//       }
//     }
//     for(var y=up; y<down; y++) {
//       console.log(y);
//       if(map[y][left]==="#") {
//         return[left,y];
//       } else if(map[y][right]==="#") {
//         return[right,y];
//       }
//     }
//   }
// }

//move player
//directions: numpad
// var move = function(direction) {
//   if(0 < direction&&direction < 10) {
//     var newX = boatX;
//     var newY = boatY;
//     if(direction>6) {
//       newY--;
//     } else if(direction<4) {
//       newY++;
//     }
//     if((direction-1)%3===0) {
//       newX--;
//     } else if(direction%3===0) {
//       newX++;
//     }
//     if(0 <= newX&&newX < mapWidth  &&  0 <= newY&&newY < mapHeight) {
//       supplies --;
//       if(supplies<1) {
//         health = Math.floor(health/2);
//         var nearestCoords = findIsland(boatX, boatY);
//         newX = nearestCoords[0];
//         newY = nearestCoords[1];
//       }
//       if(onIsland) {
//         map[boatY][boatX] = "#";
//       } else {
//         map[boatY][boatX] = "~";
//       }
//       if(map[newY][newX]==="~") {
//         onIsland = false;
//       } else {
//         onIsland = true;
//         goToIsland();
//       }
//       boatX = newX;
//       boatY = newY;
//       map[boatY][boatX] = "@";
//     }
//   }
// }

//for now, get random results --- in final game the player will go to the island and play there
// var goToIsland = function() {
//   supplies += Math.floor(Math.random()*8);
//   health += Math.floor(Math.random()*8)-4;
//   money += Math.floor(Math.random()*5);
//   if(health <= 0) {
//     alert("Game Over");
//   }
//   if(money < 0) {
//     money = 0;
//   }
// }


//print the map
// var printMap = function() {
//   $("#map").empty();
//   map.forEach(function(row) {
//     $("#map").append(row.join("  ")+"<br>");
//   });
// }
// $(document).ready(function() {
//   printMap();
//   $("#info").text("Health: "+health+"  Money: "+money+"  Supplies: "+supplies);
//   $(document).keydown(function(event) {
//     move(parseInt(event.which)-96);
//     $("#info").text("Health: "+health+"  Money: "+money+"  Supplies: "+supplies);
//     printMap();
//   });
// });
