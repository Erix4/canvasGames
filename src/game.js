import Ship from "/src/ship";
import Bolt from "/src/bolt";
import Aster from "/src/aster";
import InputHandler from "/src/input";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  //
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  //
  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.ship = new Ship(this);
    //
    this.bolts = new Array();
    this.gameObjects = [this.ship];
    this.firing = false;
    this.time = 0;
    this.fps = 0;
    var fto = 5; //bolts per second (5)
    this.boltSpeed = 1000;//speed of bolts (500)
    this.fTimeOut = 1000 / fto;
    this.nextFire = 0;
    this.escOrigin = 4000;
    this.escalationCap = 100;//miliseconds between spawn
    this.escalation = this.escOrigin;
    this.score = 0;
    this.highScore = 0;
    this.timeSlow = 1;
    this.timeFactor = 100;
    this.explosion = 0;
    //
    new InputHandler(this.ship, this);
    //
    this.astDeath = document.getElementById("astDeath");
    this.badStop = document.getElementById("badStop");
    this.goodStop = document.getElementById("goodStop");
    this.serene = document.getElementById("serene");
    this.pew1 = document.getElementById("pew");
    this.pew2 = this.pew1.cloneNode();
    this.pew3 = this.pew1.cloneNode();
    this.pewV = 1;
    //
    this.serene.loop = true;
  }
  //
  update(deltaTime) {
    if (this.gamestate === GAMESTATE.PAUSED) return;
    //
    this.gameObjects.forEach(object => object.update(deltaTime));
    //
    this.gameObjects = this.gameObjects.filter(
      object => !object.markedForDeletion
    );
    this.bolts = this.bolts.filter(
      object => !object.markedForDeletion
    );
    //
    if(this.firing && this.time > this.nextFire){
      var rot = this.ship.rotation;
      var size = this.ship.size;
      var fireP = { x: (this.ship.position.x + ((size - 3) * Math.cos(toRadians(rot)))), y: (this.ship.position.y + (size / 2 - 3) + ((size - 3) * Math.sin(toRadians(rot))))};
      let nBolt = new Bolt(this, fireP, rot)
      this.gameObjects.push(nBolt);
      this.bolts.push(nBolt);
      this.nextFire = this.time + this.fTimeOut;
    }
    //
    this.time += (deltaTime);
    if (this.time > (5000 - this.escalation) && this.timeSlow == 1){
      this.newAst();
      this.time = 0;
      this.nextFire = 0;
      if(this.escalation < (5000 - this.escalationCap)){
        this.escalation += 100;
      }
    }
    //
    this.fps = Math.round(1000 / deltaTime);
  }
  //
  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
    //
    //var font = new FontFaceObserver('Pixeled');
    //
    ctx.font = '20px "Pixeled"';
    ctx.fillText(("Fps: " + this.fps), 10, 20);
    ctx.fillText(("Objects: " + this.gameObjects.length), 10, 40);
    ctx.fillText(("Score: " + this.score), 10, 60);
    ctx.fillText(("Spawn Time: " + (5000 - this.escalation) / 1000), 10, 80);
    ctx.fillText(("Explosions: " + (this.explosion * 3) + "/30"), 10, 100);
    //
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(256,256,256,0.8)";
      ctx.fill();
      var txt = "Score: " + this.score;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText(txt, (this.gameWidth / 2) - (ctx.measureText(txt).width / 2), this.gameHeight / 2 - 30);
      txt = "High score: " + this.highScore;
      ctx.fillText(txt, (this.gameWidth / 2) - (ctx.measureText(txt).width / 2), this.gameHeight / 2);
      txt = "[Enter] to play again";
      ctx.fillText(txt, (this.gameWidth / 2) - (ctx.measureText(txt).width / 2), this.gameHeight / 2 + 30);
    }
  }
  //
  fire(){
    this.firing = true;
  }
  //
  stopFire(){
    this.firing = false;
  }
  //
  newAst(){
    this.gameObjects.push(new Aster(this));
    //console.log("Hello!");
  }
  //
  astHit(){
    this.score += 10;
    if (this.score > this.highScore){
      this.highScore = this.score;
    }
    this.astDeath.play();
  }
  //
  endGame() {
    this.gamestate = GAMESTATE.PAUSED;
    if(this.score == this.highScore){
      this.goodStop.play();
    }else{
      this.badStop.play();
    }
  }
  //
  startGame(){
    if(this.gamestate == GAMESTATE.PAUSED){
      this.gamestate = GAMESTATE.RUNNING;
      this.score = 0;
      this.gameObjects = [this.ship];
      this.escalation = this.escOrigin;
      this.bolts = [];
      this.firing = false;
      this.time = 0;
      this.nextFire = 0;
      this.timeSlow = 1;
    }
  }
  //
  pewSound(){
    switch(this.pewV){
      case 1:
        //this.pew1.play();//uncomment to enable pew
        //this.pewV = 2;
        break;
      case 2:
        //
        break;
      case 3:
        //
        break;
    }
    /*if(this.pewV == 3){
      this.pew2.pause();
      this.pew3.play();
      this.pewV = 1;
      this.pew2.currentTime = 0;
    }else{
      if(this.pewV == 1){
        this.pew3.pause();
        this.pew1.play();
        this.pew3.currentTime = 0;
      }else{
        this.pew1.pause();
        this.pew2.play();
        this.pew1.currentTime = 0;
      }
      this.pewV++;
    }*/
  }
  //
  changeSpeed(){
    if(this.timeSlow == 1){
      this.timeSlow = this.timeFactor;
      this.serene.play();
      //console.log("Start loop");
    }else{
      this.timeSlow = 1;
      this.serene.pause();
    }
    //console.log(`Time Slow: ${this.timeSlow}`);
    this.gameObjects.forEach(element => {
      element.changeSpeed(this.timeSlow);
    });
  }
  //
  newExtBolt(x, y, rot, size){
    var fireP = { x: (x + ((size - 3) * Math.cos(toRadians(rot)))), y: (y + (size / 2 - 3) + ((size - 3) * Math.sin(toRadians(rot))))};
    let nBolt = new Bolt(this, fireP, rot)
    this.gameObjects.push(nBolt);
    this.bolts.push(nBolt);
  }
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}