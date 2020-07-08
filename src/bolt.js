export default class Bolt{
    //
    constructor(game, position, rotation){
        //
        this.image = document.getElementById("image_bolt");
        //
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        //
        this.game = game;
        //
        this.speed = 500; //_ per second
        this.width = 16;
        this.height = 6;
        this.rotation = rotation;
        var hyp = pythagorus(this.width, this.height);
        //this.position = { x: (position.x + (hyp * Math.cos(toRadians(this.rotation))) / 2), y: (position.y + (hyp * Math.sin(toRadians(this.rotation))) / 2)};
        this.position = position;
        //
        this.markedForDeletion = false;
    }
    //
    draw(ctx) {
        var ux = this.position.x + (this.width / 2);
        var uy = this.position.y + (this.height / 2);
        ctx.translate(ux, uy);//adjust to rotate
        ctx.rotate(toRadians(this.rotation));//rotate
        ctx.translate(-ux, -uy);
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
        ctx.translate(ux, uy);
        ctx.rotate(-toRadians(this.rotation));
        ctx.translate(-ux, -uy);
    }
    //
    update(deltaTime){
        this.position.x += (this.speed / 1000 * deltaTime) * Math.cos(toRadians(this.rotation));
        this.position.y += (this.speed / 1000 * deltaTime) * Math.sin(toRadians(this.rotation));
        //
        if (this.position.x > (this.gameWidth - this.width) //is the bolt touching the edge?
        || this.position.x < 0 
        || this.position.y > (this.gameHeight - this.height) 
        || this.position.y < 0){
            this.markedForDeletion = true;
        }
    }
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function pythagorus (a, b){
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}