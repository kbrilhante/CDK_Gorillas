class Cockroach{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.angle = 0;
        this.speed = 0;
    }
    display() {
        push();
        fill("orange");
        noStroke();
        ellipseMode(RADIUS);
        circle(this.x, this.y, this.radius);
        pop();
    }
    shoot() {

    }
    move(gravity) {
        
    }
}