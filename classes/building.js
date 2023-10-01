class Building {
    constructor(x, tilesW, tilesH, tileSize, columnWidth) {
        this.x = x;
        this.tilesW = tilesW;
        this.tilesH = tilesH;
        this.tiles = [];
        // this.mainColor = random(["cyan", "red", "grey"]);
        this.mainColor = "#fff";
        this.window = this.pickNewWindowColor();
        this.build(tileSize, columnWidth);
    }
    build(tileSize, columnWidth) {
        for (let j = 0; j < this.tilesH; j++) {
            let floor = [];
            for (let i = 0; i < this.tilesW; i++) {
                let tile;
                const tileX = tileSize * i + this.x;
                const tileY = height - (tileSize * j);
                const tw = columnWidth * 3;
                const th = columnWidth * 4;
                if (
                    i % tw >= columnWidth &&
                    i % tw < tw - columnWidth &&
                    j % th >= columnWidth &&
                    j % th < th - columnWidth
                ) {
                    if (i % tw == columnWidth && j % th == columnWidth) {
                        this.window = this.pickNewWindowColor();
                    } else if (j % th > columnWidth) {
                        this.window = this.pickWindowColorBelow(j, i);
                    }
                    tile = new Tile(tileX, tileY, tileSize, this.window, j);
                } else {
                    tile = new Tile(tileX, tileY, tileSize, this.mainColor, j);
                }
                floor.push(tile);
            }
            this.tiles.push(floor);
        }
    }
    display() {
        for (let j = 0; j < this.tiles.length; j++) {
            const floor = this.tiles[j];
            for (let i = 0; i < floor.length; i++) {
                const tile = floor[i];
                tile.display();
            }
        }
    }
    pickNewWindowColor() {
        return color(random(["#454545", "#FFFFD6"]));
    }
    pickWindowColorBelow(j, i) {
        return this.tiles[j - 1][i].color
    }
    recolorBuilding(newColor) {
        this.mainColor = newColor;
        for (let j = 0; j < this.tiles.length; j++) {
            const floor = this.tiles[j];
            for (let i = 0; i < floor.length; i++) {
                const tile = floor[i];
                if (tile.getColor() === "#fff") {
                    tile.setColor(this.mainColor);
                }
            }
        }
    }
    collision(x, y, radius) {
        for (let j = 0; j < this.tiles.length; j++) {
            const floor = this.tiles[j];
            for (let i = 0; i < floor.length; i++) {
                const tile = floor[i];
                if (!tile.isDestroyed()) {
                    const center = tile.getCenter();
                    const d = dist(x, y, center.x, center.y);
                    if (d <= radius) {
                        tile.destroy();
                    }
                }
            }
        }
    }
}