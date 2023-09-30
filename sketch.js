const properties = {
    tileSize: 2,
    columnWidth: 4,
    gap: 2,
    columns: [3, 7],
    floors: [2, 10]
}
let canvas;
let buildings = [];

function preload() { }

function setup() {
    canvas = createCanvas(800, 600);

    let buildingX = 0;
    let buildingW = 0;
    do {
        const col = floor(random(properties.columns[0], properties.columns[1] + 1)) * properties.columnWidth * 3;
        const fl = floor(random(properties.floors[0], properties.floors[1] + 1)) * properties.columnWidth * 4;
        let building = new Building(buildingX, col, fl, properties.tileSize, properties.columnWidth);
        buildingW = col * properties.tileSize;
        buildingX += buildingW + properties.gap;
        buildings.push(building);
    } while (buildingX < width - properties.tileSize * properties.columnWidth * 3)

}

function draw() {
    background("blue");

    for (let i = 0; i < buildings.length; i++) {
        buildings[i].display();
    }
}