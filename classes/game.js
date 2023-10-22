class Game {
    constructor() {
        this.gameStart = false;
        this.matchOver = false;
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
        this.options = {};
        this.scores = [0, 0];
        this.matches = 0;
    }
    setOptions(obj) {
        this.options = obj;
        this.gravity = 9.8;
        this.bunnies[0].name = obj.bunny1;
        this.bunnies[1].name = obj.bunny2;
        this.matches = obj.matches;
    }
    start() {
        this.changeWind();
        this.createClouds();
        this.buildTheBuildings();
        this.colorTheBuildings();
        this.createBunnies();
        this.gameStart = true;
    }
    display() {
        background(this.sky);
        this.displayClouds();
        this.displayBuildings();
        this.displayBunnies();
        this.displayRoaches();
        this.displayInfo();
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
    displayInfo() {
        for (let i = 0; i < this.bunnies.length; i++) {
            this.bunnies[i].score = this.scores[i];
            this.displayBunnyInfo(this.bunnies[i], i);
        }
    }
    displayBunnyInfo(bunny, index) {
        let x = 10;
        const y = 10;
        const size = 26;
        const name = bunny.name;
        const score = bunny.score;
        push();
        textSize(size);
        textLeading(size * 1.4);
        textFont("Verdana");
        textStyle(BOLD);
        fill(0);
        if (this.getTurn() === index) {
            strokeWeight(6);
            stroke(255);
        } else {
            noStroke();
        }
        if (index === 0) {
            textAlign(LEFT, TOP);
        } else {
            textAlign(RIGHT, TOP);
            x = width - x;
        }
        text(name + "\n" + score, x, y)
        pop();
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
        if (!this.turnBegan && !this.turnEnded && this.gameStart && !this.gameOver && !this.matchOver) {
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
        this.wind = random([-1, 1]) * random(14);
        for (let i = 0; i < this.clouds.length; i++) {
            this.clouds[i].speed = this.wind;
        }
    }
    newTurn() {
        this.turn++;
        this.roach = "";
        const dice = floor(random(20));
        if (dice === 7) {
            this.changeWind();
        }
        this.turnBegan = false;
        this.turnEnded = false;
    }
    getTurn() {
        return this.turn % 2;
    }
    checkMatchOver() {
        for (let i = 0; i < this.bunnies.length; i++) {
            const b = this.bunnies[i];
            if (b.isDead && !this.matchOver) {
                this.matchOver = true;
                if (i === 0) {
                    this.scores[1]++;
                } else {
                    this.scores[0]++;
                }
            }
        }
        if (this.matchOver) {
            if (this.checkGameOver()) {
                this.handleGameOver();
            } else {
                this.newMatch();
            }
        }
    }
    checkGameOver() {
        const goal = ceil(this.matches / 2);
        for (let i = 0; i < this.scores.length; i++) {
            if (this.scores[i] === goal) {
                this.gameOver = true;
            }
        }
        return this.gameOver;
    }
    newMatch() {
        let ready = false;
        for (let i = 0; i < this.bunnies.length; i++) {
            const b = this.bunnies[i];
            if (b.isDead && b.frameRate === 0) {
                ready = true;
            }
        }
        this.reset();
    }
    reset() {
        this.matchOver = false;
        this.clouds = [];
        this.buildings = [];
        this.bunnies = [];
        this.roach = "";
        this.start();
        this.setOptions(this.options);
    }
    handleGameOver() {

    }
}