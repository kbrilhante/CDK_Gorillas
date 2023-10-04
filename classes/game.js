class Game {
    constructor() {
        this.gameStart = false;
        this.gameOver = false;
        this.turn = 0;
        this.tileSize = 6;
        this.columnWidth = 1;
        this.gap = 2;
        this.columns = [4, 6];
        this.floors = [4, 14];
        this.sky = "#86CCFD";
        this.gravity = 9.8;
        this.wind = 0;
        this.buildings = [];
        this.roaches = [];
    }
    start() {
        this.buildTheBuildings();
        this.colorTheBuildings();
        this.bunny1 = new Player(1, this.buildings);
        this.bunny2 = new Player(2, this.buildings);
    }
    display() {
        this.displayBuildings();
        this.displayBunnies();
        this.displayRoaches();
    }
    displayBuildings() {
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].display();
        }
    }
    displayBunnies() {
        this.bunny1.display();
        this.bunny2.display();
    }
    displayRoaches() {
        for(let i = 0; i < this.roaches.length; i++) {
            const roach = this.roaches[i];
            roach.move();
            roach.display();
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