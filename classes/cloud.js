class Cloud {
    constructor(x, speed) {
        this.images = sprites.Cloud;
        this.image = random(this.images);
        this.w = random(50, 120);
        this.h = this.w / this.image.width * this.image.height;
        this.x = x;
        this.y = random(this.h, height /2);
        this.speed = speed;
    }
    display() {
        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
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
        this.image = random(this.images);
        this.w = random(50, 120);
        this.h = this.w / this.image.width * this.image.height;
        this.y = random(this.h, height /2);
    }
}