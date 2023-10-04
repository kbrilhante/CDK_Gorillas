let game;

function preload() { }

function setup() {
    createCanvas(800, 600);

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
    
    if(game.turnEnded()) {
        game.makeARoach();
    }
}

function mouseReleased() {
    if(game.turnEnded()) {
        game.shoot();
    }
}