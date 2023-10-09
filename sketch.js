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
    let lastAniKey = "";
    let aniArray = [];
    for (const key of keys) {
        const aniKey = key.split("/")[0];
        const fr = frames[key].frame
        const img = spriteSheet.get(fr.x, fr.y, fr.w, fr.h);
        if (lastAniKey != aniKey && lastAniKey) {
            // add array to sprites
            addToSprites(lastAniKey, aniArray);
            aniArray = [];
        }
        aniArray.push(img);
        lastAniKey = aniKey;    
    }
    addToSprites(lastAniKey, aniArray);
}

function addToSprites(key, array) {
    sprites[key] = array;
}