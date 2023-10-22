let game, spriteSheet, spriteJSON;
let startScreen;
let sprites = {};

function preload() {
    spriteSheet = loadImage("./assets/bunny.png");
    spriteJSON = loadJSON("./assets/bunny.json");
}

function setup() {
    createCanvas(800, 600);
    sortSprites();
    playAgain();
}

function draw() {
    if (startScreen.isActive) {
        startScreen.handleSlider();
    }
    if (game.gameStart) {
        game.display();
        game.checkMatchOver();
    }
}

function mousePressed() {
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

function playAgain() {
    removeElements();
    background(0);
    startScreen = new StartScreen();
    game = new Game();
}