class Game {
    constructor() {
        this.gameStart = false;
        this.gameOver = false;
        this.turn = 0;
        this.turnBegan = false;
        this.turnEnded = false;
        this.tileSize = 6;
        this.columnWidth = 1;
        this.gap = 2;
        this.columns = [4, 6];
        this.floors = [4, 14];
        this.sky = "#86CCFD";
        this.gravity = 0;
        this.wind = 0;
        this.clouds = [];
        this.buildings = [];
        this.bunnies = [];
        this.roach = "";
    }
    start() {
        this.changeWind();
        this.gravity = 9.8;
        this.createClouds();
        this.buildTheBuildings();
        this.colorTheBuildings();
        this.createBunnies();
    }
    display() {
        this.displayClouds();
        this.displayBuildings();
        this.displayBunnies();
        this.displayRoaches();
        if (this.turnBegan && this.turnEnded) {
            this.newTurn();
        }
    }
    displayClouds() {
        for (let i = 0; i < this.clouds.length; i++) {
            this.clouds[i].move();
            this.clouds[i].display();
        }
    }
    displayBuildings() {
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].display();
        }
    }
    displayBunnies() {
        for (let i = 0; i < this.bunnies.length; i++) {
            this.bunnies[i].display();
        }
        
    }
    displayRoaches() {
        if (this.roach) {
            if (this.roach.isFlying && !this.roach.collided) {
                this.roach.move(this.gravity, this.wind);
                this.turnEnded = this.roach.checkCollisions(this.buildings, this.bunnies);
            }
            this.roach.display();
        }
    }
    createClouds() {
        for (let i = 0; i < 5; i++) {
            let cloud = new Cloud(width / 4 * i + width / 8, this.wind);
            this.clouds.push(cloud);
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
    createBunnies() {
        for (let i = 0; i < 2; i++) {
            this.bunnies.push(new Player(i, this.buildings));
        }
    }
    makeARoach() {
        const bunny = this.bunnies[this.getTurn()]
        const pos = bunny.pos;
        this.roach = new Cockroach(pos.x, pos.y, bunny.index, bunny.radius);
        bunny.changeAnimation("Throw", false);
        bunny.aniPaused = true;
    }
    waitingForShot() {
        if (!this.turnBegan && !this.turnEnded) {
            return true;
        }
        return false;
    }
    shoot() {
        const bunny = this.bunnies[this.getTurn()];
        bunny.aniPaused = false;
        this.roach.shoot();
        this.turnBegan = true;
    }
    changeWind() {
        this.wind = random([-1, 1])*random(14);
        for (let i = 0; i < this.clouds.length; i++) {
            this.clouds[i].speed = this.wind;
        }
    }
    newTurn() {
        this.turn++;
        this.roach = "";
        const dice = floor(random(100));
        if (dice === 7) {
            this.changeWind();
        }
        this.turnBegan = false;
        this.turnEnded = false;
    }
    getTurn() {
        return this.turn % 2;
    }
}