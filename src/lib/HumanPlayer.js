class HumanPlayer extends Phaser.Sprite {
  constructor(game,ttc,value) {
      super(game,0,0,'');
      this.value = value;
      this.game = game;
      this.active = false;
      this.point  = false;

      for (let y in ttc.field_representation) {
        for (let x in ttc.field_representation[y]) {
          ttc.field_representation[y][x].events.onInputDown.add((function(){
            this.check(y,x);
          }),this);
        }
      }
  }

  check(y,x) {
    this.point = {y,x}
  }

  update() {
    if (this.active && this.game.input.mousePointer.isDown) {
      this.point = {x:game.input.x,y:game.input.y};

    }
  }
  init() {

  }
}

export default HumanPlayer;
