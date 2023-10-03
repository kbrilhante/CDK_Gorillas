const properties = {
    tileSize: 4,
    columnWidth: 2,
    gap: 2,
    columns: [3, 5],
    floors: [4, 10],
    sky: "#86CCFD"
}
let canvas;
let buildings = [];
let bunny1, bunny2;

function preload() { }

function setup() {
    canvas = createCanvas(800, 600);

    buildTheBuildings();
    colorTheBuildings();

    bunny1 = new Player(1, buildings);
    bunny2 = new Player(2, buildings);
}

function draw() {
    background(properties.sky);

    for (let i = 0; i < buildings.length; i++) {
        buildings[i].display();
    }

    bunny1.display();
    bunny2.display();
}

function mousePressed() {
    for (let i = 0; i < buildings.length; i++) {
        buildings[i].collision(mouseX, mouseY, 20);
    }
}

function buildTheBuildings() {
    let buildingX = 0;
    while (buildingX < width - properties.tileSize * properties.columnWidth * 3) {
        buildingX = buildABuilding(buildingX);
    }
    console.log(buildingX)
    if (buildingX < width) {
        buildABuilding(buildingX);
    }
}

function buildABuilding(buildingX) {
    const col = floor(random(properties.columns[0], properties.columns[1] + 1)) * properties.columnWidth * 3;
    const fl = floor(random(properties.floors[0], properties.floors[1] + 1)) * properties.columnWidth * 4;
    let building = new Building(buildingX, col, fl, properties.tileSize, properties.columnWidth);
    const buildingW = col * properties.tileSize;
    buildingX += buildingW + properties.gap;
    buildings.push(building);
    return buildingX;
}

function colorTheBuildings() {
    push();
    colorMode(HSL, 100);
    let hue = 0;
    for (let i = 0; i < buildings.length; i++) {
        const building = buildings[i];
        const newColor = color(hue, 100, 60);
        building.recolorBuilding(newColor);
        hue += 100 / buildings.length;
    }
    pop();
}

