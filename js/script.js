// Variables
var blockGame = document.getElementById('block-game');

function Alien(type, line, col){
    this.line           = line;
    this.column         = col;
    this.speedEnemy     = 0;
    this.status         = true;
    this.type           = type;

    this.height         = 32;
    this.width          = 32;
    this.positionX      = 221 + (this.width + 1) * this.column;
    this.positionY      = 5 + (this.height + 1) * this.line;
    this.direction      = 1;

    this.draw = function(){
        if(this.status === true){
            var divEnemy = document.createElement('div');
            divEnemy.classList.add("enemy", "bg-" + this.type);

            divEnemy.style.left = (this.positionX) + 'px';
            divEnemy.style.top = (this.positionY) + 'px';

            blockGame.appendChild(divEnemy);    
        }
    }
}

Ship = {
    position: 376,
    toleft: false,
    toright: false,

    init: function () { //initialize the gun and his move
        this.draw();
        this.toLeft();
        this.toRight();
        setInterval("Ship.toLeft()", 30);
        setInterval("Ship.toRight()", 30);
    },
    draw: function () { //draws the gun
        var divShip = document.createElement('div');
        divShip.classList.add('ship');
        divShip.setAttribute('id', 'ship');

        divShip.style.left = this.position + 'px';

        blockGame.appendChild(divShip);
    },
    toLeft: function(){
        if (this.toleft) {
            if (this.position - 10 > 0) {
                var existShip = document.getElementById('ship');
                if(existShip){
                    existShip.remove();
                }
                this.position -= 5;
                this.draw();
            }
        }
    },
    toRight: function(){
        if (this.toright) {
            if (this.position + 42 < Game.width) {
                var existShip = document.getElementById('ship');
                if(existShip){
                    existShip.remove();
                }

                this.position += 5;
                this.draw();
            }
        }
    }
    
}

Game = {
    types: [1, 2, 2, 3, 3], // On définit les types d'aliens
    aliens: [
        [11],
        [11],
        [11],
        [11],
        [11]
    ],
    alives: 1,
    width: 794,
    init: function () {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 11; j++) {
                this.aliens[i][j] = new Alien(this.types[i], i, j);
                this.alives++;
                this.aliens[i][j].draw();
            }
        }
        Ship.init();
    },
    onkeydown: function (ev) { // Event keyDown
        if (ev.keyCode == 37) Ship.toleft = true;
        else if (ev.keyCode == 39) Ship.toright = true;
        else return;
    },
    onkeyup: function (ev) { //key up event
        if (ev.keyCode == 37) Ship.toleft = false;
        else if (ev.keyCode == 39) Ship.toright = false;
        else return;
    }
}

Game.init();

document.body.onkeydown = function (ev) {
    Game.onkeydown(ev);
};
document.body.onkeyup = function (ev) {
    Game.onkeyup(ev);
};