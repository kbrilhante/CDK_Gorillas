class Tile {
    constructor (x, y, size, floor, column, c) {
        this.x = x;
        this.y = y;
        this.color = c;
        this.w = size;
        this.h = size;
        this.floor = floor;
        this.column = column;
        this.hasCollision = true;
        this.destroyed = false;
    }
    show() {
        if (!this.destroyed) {
            push();
            noStroke();
            fill(this.color);
            rect(this.x, this.y, this.w, this.h);
            pop();
        }
    }
    destroy () {
        this.hasCollision = false;
        this.destroyed = true;
    }
}