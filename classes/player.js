class Player {
    constructor(num, buildings) {
        this.number = num;
        let i;
        if (this.number == 1) {
            i = 1;
        } else {
            i = buildings.length - 2; 
        }
        this.w = 30;
        this.h = 30;
        this.pos = buildings[i].getTop();
        this.pos.y -= this.h / 2;
    }
    display() {
        push();
        ellipseMode(CENTER);
        rectMode(CENTER);
        fill("green");
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.w, this.h);
        pop();
    }
}