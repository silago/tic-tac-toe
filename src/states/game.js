import HumanPlayer  from '../lib/HumanPlayer';
import BotPlayer  from '../lib/BotPlayer';
import TicTacToe  from '../lib/TicTacToe';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    //text.anchor.set(0.5);
//
    var ttc = new TicTacToe(this.game,3);
    this.game.add.existing(ttc);
    ttc.init();
    var players = [
      (new HumanPlayer(this.game,ttc,'✗')),
      (new BotPlayer(this.game,ttc,'o'))
    //  (new HumanPlayer(),ttc),
    ];
    ttc.setPlayers(players);

    //this.input.onDown.add(this.endGame, this);
  }

  update() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
