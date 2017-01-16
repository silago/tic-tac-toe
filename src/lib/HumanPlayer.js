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
    if (this.active) {
     this.point = {y,x}
    }
  }

  update() {
  }
  init() {

  }
}

export default HumanPlayer;
