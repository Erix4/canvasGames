import ship from "./ship";

export default class InputHandler {
  constructor(ship, game) {
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case "ArrowLeft":
          ship.turnLeft();
          break;
        //
        case "ArrowRight":
          ship.turnRight();
          break;
        //
        case "ArrowUp":
          ship.moveForward();
          break;
        //
        case "ArrowDown":
          ship.moveBackward();
          break;
        //
        case " ":
          game.fire();
          break;
        case "Enter":
          game.startGame();
          break;
        case "s":
          game.changeSpeed();
          break;
        case "e":
          if(game.explosion != 10){
            game.explosion++;
          }else{
            game.explosion = 0;
          }
      }
    });
    //
    document.addEventListener("keyup", event => {
      switch (event.key) {
        case "ArrowLeft":
          if (ship.tspeed.r < 0) ship.stopRot();
          break;
        //
        case "ArrowRight":
          if (ship.tspeed.r > 0) ship.stopRot();
          break;
        //
        case "ArrowUp":
          if (ship.tspeed.m > 0) ship.stopMove();
          break;
        //
        case "ArrowDown":
          if (ship.tspeed.m < 0) ship.stopMove();
          break;
        case " ":
          game.stopFire();
          break;
      }
    });
  }
}
