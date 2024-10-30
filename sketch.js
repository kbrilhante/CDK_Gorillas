let buildings = []



function preload() {
    
}

function setup() {
    createCanvas(800, 600)
    const tileSize = 6;
    const gap = 2;
    let buildingX = 0;
    while (buildingX < width) {
        let tw = floor(random(2, 6)) * 3
        let th = floor(random(2, 11)) * 4
        let building = new Building(buildingX, tw, th, tileSize);
        buildingX += tw * tileSize + gap;
        buildings.push(building)
    }
}

function draw() {
    background("blue");
    for (const building of buildings) {
        building.show();
    }
}

function mouseClicked() {
    for (let b = 0; b < buildings.length; b++) {
        const building = buildings[b];
        const tiles = building.tiles;
        for (let f = 0; f < tiles.length; f++) {
            const floor = tiles[f];
            for (let t = 0; t < floor.length; t++) {
                const tile = floor[t];
                if (
                    mouseX > tile.x &&
                    mouseX < tile.x + tile.w &&
                    mouseY > tile.y &&
                    mouseY < tile.y + tile.h
                ) {
                    building.destroy(tile);
                    // building.explode(tile, 10, 10);
                }
            }
        }
    }
}