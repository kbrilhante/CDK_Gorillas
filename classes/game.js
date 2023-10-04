class Game {
    constructor() {
        this.tileSize = 6;
        this.columnWidth = 1;
        this.gap = 2;
        this.columns = [4, 6];
        this.floors = [4, 14];
        this.sky = "#86CCFD";
        this.buildings = [];

    }
    start() {
        this.buildTheBuildings();
        this.colorTheBuildings();
    }
    displayBuildings() {
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].display();
        }
    }
    buildTheBuildings() {
        let buildingX = 0;
        while (buildingX < width - this.tileSize * this.columnWidth * 3) {
            buildingX = this.buildABuilding(buildingX);
        }
        if (buildingX < width) {
            this.buildABuilding(buildingX);
        }
    }
    buildABuilding(buildingX) {
        const col = floor(random(this.columns[0], this.columns[1] + 1)) * this.columnWidth * 3;
        const fl = floor(random(this.floors[0], this.floors[1] + 1)) * this.columnWidth * 4;
        let building = new Building(buildingX, col, fl, this.tileSize, this.columnWidth);
        const buildingW = col * this.tileSize;
        buildingX += buildingW + this.gap;
        this.buildings.push(building);
        return buildingX;
    }
    
    colorTheBuildings() {
        push();
        colorMode(HSL, 100);
        let hue = 0;
        for (let i = 0; i < this.buildings.length; i++) {
            const building = this.buildings[i];
            const newColor = color(hue, 100, 60);
            building.recolorBuilding(newColor);
            hue += 100 / this.buildings.length;
        }
        pop();
    }
}