export default class Aster {
    //
    constructor(game){
        this.image = document.getElementById("image_aster");
        //
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        //
        this.game = game;
        //
        this.speed = 100 + Math.random() * 200; //move speed: _ per second
        this.rotspeed = 20 * Math.random() * 50; //rotation speed: _ per second
        this.size = Math.random() * 50 + 30;
        this.rotation = 0;
        this.vrot = 0;
        var bin = Math.floor(Math.random() * 1.99);
        if(Math.random() < .5){
            this.side = "horz";
            this.position = {x: (bin * (this.gameWidth + (2 * this.size)) - this.size), y: (Math.random() * (this.gameHeight - this.size))};
            this.rotation = (Math.random() * 180) - 90 - (bin * 180);
        }else{
            this.side = "vert";
            this.position = {x: (Math.random() * (this.gameWidth - this.size)), y: (bin * (this.gameHeight + (2 * this.size)) - this.size)};
            this.rotation = (Math.random() * -180) + (bin * 180);
        }
        this.revealed = false;
        //
        this.markedForDeletion = false;
    }
    //
    draw(ctx){
        var ux = this.position.x + (this.size / 2);
        var uy = this.position.y + (this.size / 2);
        ctx.translate(ux, uy);//adjust to rotate
        ctx.rotate(toRadians(this.vrot));//rotate
        ctx.translate(-ux, -uy);
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.size,
          this.size
        );
        ctx.translate(ux, uy);
        ctx.rotate(-toRadians(this.vrot));
        ctx.translate(-ux, -uy);
    }
    //
    update(deltaTime){
        this.vrot += (this.rotspeed / 1000 * deltaTime)
        if(this.vrot > 180){
            this.vrot -= 360;
        }else if(this.vrot < -180){
            this.vrot += 360;
        }
        //
        this.position.x += (this.speed / 1000 * deltaTime) * Math.cos(toRadians(this.rotation));
        this.position.y -= (this.speed / 1000 * deltaTime) * Math.sin(toRadians(this.rotation));
        //
        if(this.revealed){//the asteroid has come out of the walls
            if(this.position.y > this.gameHeight - this.size){
                this.position.y = 0;
            }else if(this.position.y < 0){
                this.position.y = this.gameHeight - this.size;
            }
            if(this.position.x > this.gameWidth - this.size){
                this.position.x = 0;
            }else if(this.position.x < 0){
                this.position.x = this.gameWidth - this.size;
            }
        }else if (this.side == "horz"){//the asteroid is still in the left or right walls
            if(this.position.y > this.gameHeight - this.size){
                this.position.y = 0;
            }else if(this.position.y < 0){
                this.position.y = this.gameHeight - this.size;
            }
            if(this.position.x < this.gameWidth - this.size && this.position.x > 0){
                this.revealed = true;
            }
        }else{//top or bottom walls
            if(this.position.x > this.gameWidth - this.size){
                this.position.x = 0;
            }else if(this.position.x < 0){
                this.position.x = this.gameWidth - this.size;
            }
            if(this.position.y < this.gameHeight - this.size && this.position.y > 0){
                this.revealed = true;
            }
        }
    }
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}