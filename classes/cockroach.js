class Cockroach {
    constructor(x, y, offset) {
        this.ani = sprites.Carrot;
        this.radius = 10;
        this.scale = this.radius * 2 / this.ani[0].width;
        this.x = x;
        this.y = y - offset - this.radius;
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
            const c = "cyan";
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
            image(this.frame, this.x, this.y, this.frame.width * this.scale, this.frame.height * this.scale);
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
    checkCollisions(buildings, players) {
        this.checkCollisionPlayers(players, buildings);
        this.checkCollisionsBuildings(buildings);
        this.checkOffSceen();
        return this.collided
    }
    checkCollisionPlayers(players, buildings) {
        for (let i = 0; i < players.length; i++) {
            const p = players[i];
            const d = dist(this.x, this.y, p.pos.x, p.pos.y);
            if (d < this.radius + p.radius) {
                p.collision(buildings);
                this.collided = true;
            }
        }
    }
    checkCollisionsBuildings(buildings) {
        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            b.collision(this.x, this.y, this.radius, this);
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