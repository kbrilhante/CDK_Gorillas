class Tile {
    constructor (x, y, tileSize, col, floor) {
        this.x = x;
        this.y = y;
        this.size = tileSize;
        this.color = col;
        this.floor = floor;
    }
    display() {
        push();
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.size);
        pop();
    }
    getColor() {
        return this.color;
    }
    setColor(newColor) {
        this.color = newColor;
    }
}