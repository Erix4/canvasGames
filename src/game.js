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
    //
    this.asteroids = new Array();
  }
  //
  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.ship = new Ship(this);
    //
    this.gameObjects = [this.ship, ...this.asteroids];
    this.firing = false;
    this.time = 0;
    //
    this.asteroids.push(new Aster(this));
    //
    new InputHandler(this.ship, this);
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
    //
    if(this.firing){
      var rot = this.ship.rotation;
      var size = this.ship.size;
      var fireP = { x: (this.ship.position.x + ((size - 3) * Math.cos(toRadians(rot)))), y: (this.ship.position.y + (size / 2 - 3) + ((size - 3) * Math.sin(toRadians(rot))))};
      this.gameObjects.push(new Bolt(this, fireP, rot));
    }
    //
    this.time += deltaTime;
    if (this.time > 5000){
      this.newAst();
      this.time = 0;
    }
  }
  //
  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
    //
    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();
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
    this.asteroids.push(new Aster(this));
    console.log("Hello!");
  }
  //
  /*togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }*/
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}