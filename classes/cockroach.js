class Cockroach {
    constructor(x, y, offset) {
        this.radius = 10;
        this.x = x;
        this.y = y - offset - this.radius;
        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.speed = 0;
        this.isFlying = false;
        this.collided = false;
    }
    display() {
        if (!this.collided) {
            const c = "orange";
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
            fill(c);
            noStroke();
            ellipseMode(RADIUS);
            circle(this.x, this.y, this.radius);
            pop();
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
}