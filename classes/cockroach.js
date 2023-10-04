class Cockroach {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.radius = 10;
        this.angle = 0;
        this.speed = 0;
        this.isFlying = false;
    }
    display() {
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
        console.log(this.dx)

        this.isFlying = true;
    }
    move(gravity, wind) {
        if (this.isFlying) {
            this.dy += gravity / 10;
            this.y += this.dy;
            this.x += this.dx + wind;
        }
    }
    destroy(roaches) {
        const i = roaches.indexOf(this);
        roaches.splice(i, 1);
    }
}