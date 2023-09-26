class Building {
    constructor(x, tilesW, tilesH, tileSize) {
        this.x = x;
        this.tilesW = tilesW;
        this.tilesH = tilesH;
        this.tiles = [];
        const buildingColor = random(["cyan", "red", "gray"])
        for (let j = 0; j < tilesH; j++) {
            let floor = [];
            for (let i = 0; i < tilesW; i++) {
                const tileX = this.x + (i * tileSize);
                const tileY = height - tileSize - (j * tileSize);
                let tileColor;
                if (i % 3 === 1 && j % 4 === 1) {
                    tileColor = random(["black", "yellow"])
                } else if (i % 3 === 1 && j % 4 === 2) {
                    tileColor = this.tiles[j - 1][i].color;
                } else {
                    tileColor = buildingColor;
                }
                const tile = new Tile(tileX, tileY, tileSize, j, i, tileColor);
                floor.push(tile);
            }
            this.tiles.push(floor);
        }
    }
    show() {
        for (const floor of this.tiles) {
            for (const tile of floor) {
                tile.show();
            }
        }
    }
    getTile(floor, column) {
        if (
            floor >= 0 &&
            floor < this.tilesH &&
            column >= 0 &&
            column < this.tilesW
        ) {
            return this.tiles[floor][column];
        }
    }
    destroy (tile) {
        const tiles = [tile];
        const f = tile.floor;
        const c = tile.column;
        tiles.push(this.getTile(f - 1, c));
        tiles.push(this.getTile(f + 1, c));
        tiles.push(this.getTile(f, c - 1));
        tiles.push(this.getTile(f, c + 1));
        for (let i = 0; i < tiles.length; i++) {
            const t = tiles[i];
            if (t) {
                t.destroy();
            }
        }
    }
    explode(tile, w, h) {
        
    }
}