class Cloud {
    constructor(x, speed) {
        this.w = random(50, 120);
        this.h = this.w / 3 * 2;
        this.x = x;
        this.y = random(this.h, height /2);
        this.speed = speed;
    }
    display() {
        push();
        rectMode(CENTER);
        fill("#fff");
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
    move() {
        this.x += this.speed;
        if (this.x > width + this.w && this.speed > 0) { //moving right
            this.x = 0 - random(this.w, this.w * 2);
            this.changeSettings();
        }
        if (this.x < -this.w && this.speed < 0) { //moving left
            this.x = width + random(this.w, this.w * 2);
            this.changeSettings();
        }
    }
    changeSettings() {
        this.w = random(50, 120);
        this.h = this.w / 3 * 2;
        this.y = random(this.h, height /2);
    }
}