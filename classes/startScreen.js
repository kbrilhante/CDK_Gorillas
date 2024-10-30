class StartScreen {
    constructor() {
        this.isActive = true;
        this.parentDiv = createDiv();
        this.divBunny1 = createDiv();
        this.divBunny2 = createDiv();
        this.divMatches = createDiv();
        this.divButton = createDiv();
        this.lblBunny1 = createP("Player 1: ");
        this.inpBunny1 = createInput();
        this.lblBunny2 = createP("Player 2: ");
        this.inpBunny2 = createInput();
        this.lblMatches1 = createP("How many matches? ");
        this.sldMatches = createSlider(1, 9, 3, 2);
        this.lblMatches2 = createP("");
        this.btnStart = createButton("Start Game");
        this.btnStart.mouseClicked(() => {
            this.handleStartGame();
        });
        
        this.handleElementsStyle();
    }
    handleElementsStyle () {
        this.parentDiv.addClass('startScreenDiv');
        this.divBunny1.parent(this.parentDiv);
        this.divBunny2.parent(this.parentDiv);
        this.divMatches.parent(this.parentDiv);
        this.divButton.parent(this.parentDiv);
        this.lblBunny1.addClass('label');
        this.lblBunny1.parent(this.divBunny1);
        this.inpBunny1.addClass('bunnyNameInput');
        this.inpBunny1.addClass('bunny1');
        this.inpBunny1.attribute('placeholder', 'Hubert');
        this.inpBunny1.parent(this.divBunny1);
        this.lblBunny2.addClass('label');
        this.lblBunny2.parent(this.divBunny2);
        this.inpBunny2.addClass('bunnyNameInput');
        this.inpBunny2.addClass('bunny2');
        this.inpBunny2.attribute('placeholder', 'Rubert');
        this.inpBunny2.parent(this.divBunny2);
        this.lblMatches1.addClass('label');
        this.lblMatches1.parent(this.divMatches);
        this.sldMatches.parent(this.divMatches);
        this.lblMatches2.addClass('label');
        this.lblMatches2.parent(this.divMatches);
        this.btnStart.addClass('btn');
        this.btnStart.parent(this.divButton);
        this.parentDiv.size(width);
        this.parentDiv.position(0, 140);
    }
    handleSlider() {
        const val = this.sldMatches.value();
        let txt = "";
        if (val === 1) {
            txt = "Single Match"
        } else {
            txt = "Best out of " + val;
        }
        this.lblMatches2.html(txt)
    }
    handleStartGame() {
        let b1 = this.inpBunny1.value().trim();
        if (!b1) {
            b1 = "Hubert";
        }
        let b2 = this.inpBunny2.value().trim();
        if (!b2) {
            b2 = "Rubert";
        }

        const obj = {
            bunny1: b1,
            bunny2: b2,
            matches: this.sldMatches.value()
        }
        game.start();
        game.setOptions(obj);
        this.parentDiv.hide();
    }
}