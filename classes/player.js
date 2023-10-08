class Player {
    constructor(index, buildings) {
        this.index = index;
        let i;
        if (this.index == 0) {
            i = 1;
        } else {
            i = buildings.length - 2; 
        }
        this.radius = 15;
        this.pos = buildings[i].getTop();
        this.pos.y -= this.radius;
        this.collided = false;
        this.score = 0;
    }
    display() {
        if (!this.collided) {
            push();
            ellipseMode(RADIUS);
            fill("green");
            noStroke();
            circle(this.pos.x, this.pos.y, this.radius);
            pop();
        }
    }
    collision(buildings) {
        this.collided = true;
        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            b.collision(this.pos.x, this.pos.y, this.radius * 6);
        }
    }
}