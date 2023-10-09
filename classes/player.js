class Player {
    constructor(index, buildings) {
        this.ani = sprites.Idle;
        this.index = index;
        let i;
        if (this.index == 0) {
            i = 1;
        } else {
            i = buildings.length - 2; 
        }
        this.radius = 20;
        this.pos = buildings[i].getTop();
        this.scale = this.radius * 2 / this.ani[0].width;
        this.collided = false;
        this.score = 0;
        this.frameCount = 0;
        this.frame = this.ani[this.frameCount];
        this.frameRate = 0.6;
        this.w = this.frame.width * this.scale;
        this.h = this.w * this.frame.height / this.frame.width;
        this.pos.y -= this.h / 2;
    }
    display() {
        if (!this.collided) {
            push();
            // ellipseMode(RADIUS);
            // fill("green");
            // noStroke();
            // circle(this.pos.x, this.pos.y, this.radius);
            imageMode(CENTER);
            image(this.frame, this.pos.x, this.pos.y, this.w, this.h)
            pop();
            this.animate();
        }
    }
    collision(buildings) {
        this.collided = true;
        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            b.collision(this.pos.x, this.pos.y, this.radius * 6);
        }
    }
    changeAnimation(newAnimation) {}
    animate() {
        this.frameCount += this.frameRate;
        const i = floor (this.frameCount % this.ani.length);
        this.frame = this.ani[i];
    }
}