let game, spriteSheet, spriteJSON;
let sprites = {};

function preload() {
    spriteSheet = loadImage("./assets/bunny.png");
    spriteJSON = loadJSON("./assets/bunny.json");
}

function setup() {
    createCanvas(800, 600);
    sortSprites();

    game = new Game();
    game.start();
}

function draw() {
    background(game.sky);
    game.display();
    
    // game.roaches.push(new Cockroach(random(width), random(100)));
}

function mousePressed() {
    // for (let i = 0; i < game.buildings.length; i++) {
    //     game.buildings[i].collision(mouseX, mouseY, 20);
    // }
    
    if(game.waitingForShot()) {
        game.makeARoach();
    }
}

function mouseReleased() {
    if(game.waitingForShot()) {
        game.shoot();
    }
}

function sortSprites() {
    const frames = spriteJSON.frames;
    const keys = Object.keys(frames);
    // const folders = new Set();
    // for (const key of keys) {
    //     const splitKey = key.split("/");
    //     folders.add(splitKey[0]);
    // }
    // folders.forEach(aniKey => {
    //     const aniFrames = [];
        
    //     console.log(aniFrames);
    // });
    for (const key of keys) {
        const aniKey = key.split("/")[0];
        console.log(frames[key])
    }
}