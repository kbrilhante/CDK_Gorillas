class Tile {
    constructor (x, y, tileSize, col, floor) {
        this.x = x;
        this.y = y;
        this.size = tileSize;
        this.color = col;
        this.floor = floor;
        this.destroyed = false;

    }
    display() {
        if (!this.destroyed) {
            push();
            noStroke();
            fill(this.color);
            rect(this.x, this.y, this.size);
            pop();
        }
    }
    getColor() {
        return this.color;
    }
    setColor(newColor) {
        this.color = newColor;
    }
    destroy(building) {
        this.destroyed = true;
        const floor = building.tiles[this.floor];
        const i = floor.indexOf(this);
        floor.splice(i, 1);
    }
    isDestroyed() {
        return this.destroyed;
    }
    getCenter() {
        const center = {
            x: this.size / 2 + this.x,
            y: this.size / 2 + this.y
        };
        return center;
    }
}