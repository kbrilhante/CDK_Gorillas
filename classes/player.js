class Player {
    constructor(index, buildings) {
        this.ani = sprites.Idle;
        this.aniLoop = true;
        this.aniPaused = false;
        this.index = index;
        let i;
        if (this.index == 0) {
            i = 1;
        } else {
            i = buildings.length - 2; 
        }
        this.radius = 20;
        this.score = 0;
        this.frameCount = 0;
        this.frame = this.ani[this.frameCount];
        this.frameRate = 0.6;
        this.scale = 2.4;
        this.offset = {
            x: 0,
            y: 6
        }
        this.pos = buildings[i].getTop();
        this.w = this.radius * 2 * this.scale;
        this.h = this.radius * 2 * this.scale;
        this.pos.y -= this.radius;
        this.isDead = false;
    }
    display() {
        // if (!this.isDead) {
            push();
            // ellipseMode(RADIUS);
            // fill("green");
            // noStroke();
            // circle(this.pos.x, this.pos.y, this.radius);
            imageMode(CENTER);
            if (this.index === 0) {
                scale(-1, 1);
                image(this.frame, -this.pos.x + this.offset.x, this.pos.y + this.offset.y, this.w, this.h)
            } else {
                image(this.frame, this.pos.x + this.offset.x, this.pos.y + this.offset.y, this.w, this.h)
            }
            pop();
            this.animate();
        // }
    }
    collision() {
        this.isDead = true;
        this.changeAnimation("Dead", false);
    }
    changeAnimation(newAnimation, loop) {
        this.ani = sprites[newAnimation];
        this.frameCount = 0;
        this.loop = loop;
        if (newAnimation === "Dead") {
            this.frameRate = 0.4;
        }
    }
    animate() {
        if (!this.aniPaused) {
            this.frameCount += this.frameRate;
        }
        const i = floor (this.frameCount % this.ani.length);
        this.frame = this.ani[i];
        if (!this.loop && i === this.ani.length - 1) {
            if (this.isDead) {
                this.frameRate = 0;
            } else {
                this.changeAnimation("Idle", true);
            }
        }
    }

}