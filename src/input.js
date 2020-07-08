import ship from "./ship";

export default class InputHandler {
  constructor(ship, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          ship.turnLeft();
          break;
        //
        case 39:
          ship.turnRight();
          break;
        //
        case 38:
          ship.moveForward();
          break;
        //
        case 40:
          ship.moveBackward();
          break;
        //
        case 32:
          game.fire();
          break;
      }
    });
    //
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (ship.tspeed.r < 0) ship.stopRot();
          break;
        //
        case 39:
          if (ship.tspeed.r > 0) ship.stopRot();
          break;
        //
        case 38:
          if (ship.tspeed.m > 0) ship.stopMove();
          break;
        //
        case 40:
          if (ship.tspeed.m < 0) ship.stopMove();
          break;
        case 32:
          game.stopFire();
          break;
      }
    });
  }
}
