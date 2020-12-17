export default class Ship{
  //
  constructor(game){
    this.image = document.getElementById("image_ship");
    //
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    //
    this.game = game;
    //
    this.position = { x: 20, y: 400 };
    this.cspeed = { r: 0, m: 0};
    this.tspeed = { r: 0, m: 0};
    this.size = 20;
    this.rotation = 0;
    //
    this.rc = 150; //rotation change: degrees per second (150)
    this.mc = 300; //move change: pixels per second
    this.ds = 500; //decay speed: units per second (also accel speed)
  }
  //
  turnLeft(){
    this.tspeed.r = -this.rc;
  }
  //
  turnRight(){
    this.tspeed.r = this.rc;
  }
  //
  stopRot(){
    this.tspeed.r = 0;
  }
  //
  moveForward(){
    this.tspeed.m = this.mc;
  }
  //
  moveBackward(){
    this.tspeed.m = -this.mc;
  }
  //
  stopMove(){
    this.tspeed.m = 0;
  }
  //
  draw(ctx) {
    var ux = this.position.x + (this.size / 2);
    var uy = this.position.y + (this.size / 2);
    ctx.translate(ux, uy);
    ctx.rotate(toRadians(this.rotation));
    ctx.translate(-ux, -uy);
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
    ctx.translate(ux, uy);
    ctx.rotate(-toRadians(this.rotation));
    ctx.translate(-ux, -uy);
  }
  //
  update(deltaTime) {
    this.rotation += (this.cspeed.r / 1000 * deltaTime);
    if(this.rotation > 180){
      this.rotation -= 360;
    }else if(this.rotation < -180){
      this.rotation += 360;
    }
    this.position.x += (this.cspeed.m / 1000 * deltaTime) * Math.cos(toRadians(this.rotation));
    this.position.y += (this.cspeed.m / 1000 * deltaTime) * Math.sin(toRadians(this.rotation));
    //
    var use = 0;
    //
    if (this.cspeed.r != this.tspeed.r){//does ROTATION speed require acceleration?
      //
      use = (this.ds / 1000) * deltaTime;//change amount allowed
      if(this.tspeed.r > this.cspeed.r){//acceleration is positive
        if (this.cspeed.r + use > this.tspeed.r){//acceleration exceeds speed cap
          this.cspeed.r = this.tspeed.r;
        }else{//it doesn't
          this.cspeed.r = this.cspeed.r + use;
        }
      }else{//acceleration is negative
        if (this.cspeed.r - use < this.tspeed.r){//acceleration exceeds speed cap
          this.cspeed.r = this.tspeed.r;
        }else{//it doesn't
          this.cspeed.r = this.cspeed.r - use;
        }
      }
    }
    //
    if (this.cspeed.m != this.tspeed.m){//does MOVE speed require acceleration?
      //
      use = (this.ds / 1000) * deltaTime;//change amount allowed
      if(this.tspeed.m > this.cspeed.m){//accel. is positive
        if (this.cspeed.m + use > this.tspeed.m){//accel. exceeds speed cap
          this.cspeed.m = this.tspeed.m;
        }else{//it doesn't
          this.cspeed.m = this.cspeed.m + use;
        }
      }else{//accel. is negative
        if (this.cspeed.m - use < this.tspeed.m){//accel. exceeds speed cap
          this.cspeed.m = this.tspeed.m;
        }else{//it doesn't
          this.cspeed.m = this.cspeed.m - use;
        }
      }
    }
    //
    //wall on left or right
    if (this.position.x + this.size > this.gameWidth) {
      this.position.x = 0;
      this.position.y = this.gameHeight - this.size - this.position.y;
    }else if(this.position.x < 0){
      this.position.x = this.gameWidth - this.size;
      this.position.y = this.gameHeight - this.size - this.position.y;
    }
    //
    //wall on top or bottom
    if (this.position.y + this.size > this.gameHeight) {
      this.position.y = 0;
      this.position.x = this.gameWidth - this.size - this.position.x;
    }else if(this.position.y < 0){
      this.position.y = this.gameHeight - this.size;
      this.position.x = this.gameWidth - this.size - this.position.x;
    }
    //
    /*if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }*/
  }
  //
  changeSpeed(newSpeed){
    //do nothing
  }
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}