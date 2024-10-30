class Cockroach {
    constructor(x, y, bunnyIndex, bunnyRadius) {
        this.ani = sprites.Carrot;
        this.radius = 10;
        const offsetX = bunnyRadius + this.radius;
        if (bunnyIndex === 0) {
            this.x = x + offsetX;
        } else {
            this.x = x - offsetX;
        }
        this.y = y - 4;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.speed = 0;
        this.isFlying = false;
        this.collided = false;
        this.frameCount = 0;
        this.frame = this.ani[this.frameCount];
        this.frameRate = 1;
    }
    display() {
        if (!this.collided) {
            const c = "#FC31BD";
            if (!this.isFlying) {
                push();
                fill(c);
                noStroke();
                ellipseMode(RADIUS);
                circle(mouseX, mouseY, this.radius / 2);
                noFill();
                stroke(c);
                strokeWeight(this.radius / 2);
                line(mouseX, mouseY, this.x, this.y)
                pop();
            }
            push();
            // fill(c);
            // noStroke();
            // ellipseMode(RADIUS);
            // circle(this.x, this.y, this.radius);
            imageMode(CENTER);
            image(this.frame, this.x, this.y, this.radius * 2, this.radius * 2);
            pop();
            this.animate();
        }
    }
    shoot() {
        const d = dist(this.x, this.y, mouseX, mouseY);
        this.speed = d / 10;
        this.angle = atan2(abs(this.y - mouseY), abs(this.x - mouseX));
        this.vector = p5.Vector.fromAngle(this.angle);
        this.vector.mult(this.speed);
        this.dx = this.vector.x;
        if (mouseX < this.x) {
            this.dx *= -1;
        }
        this.dy = this.vector.y;
        if (mouseY < this.y) {
            this.dy *= -1;
        }
        this.isFlying = true;
    }
    move(gravity, wind) {
        this.dy += gravity / 10;
        this.y += this.dy;
        this.x += this.dx + wind;
    }
    checkCollisions(buildings, bunnies) {
        this.checkCollisionBunnies(bunnies);
        this.checkCollisionsBuildings(buildings);
        this.checkOffSceen();
        return this.collided
    }
    checkCollisionBunnies(bunnies) {
        for (let i = 0; i < bunnies.length; i++) {
            const bunny = bunnies[i];
            const d = dist(this.x, this.y, bunny.pos.x, bunny.pos.y);
            if (d < this.radius + bunny.radius) {
                bunny.collision();
                this.collided = true;
            }
        }
    }
    checkCollisionsBuildings(buildings) {
        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            b.collision(this.x, this.y, this.radius * 1.2, this);
        }
    }
    checkOffSceen() {
        if (this.y - this.radius > height) {
            this.collided = true;
        }
    }
    animate() {
        this.frameCount += this.frameRate;
        const i = floor (this.frameCount % this.ani.length);
        this.frame = this.ani[i];
    }
}