import HumanPlayer  from '../lib/HumanPlayer';
import BotPlayer  from '../lib/BotPlayer';
import TicTacToe  from '../lib/TicTacToe';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.ttc = new TicTacToe(this.game,3);
    this.game.add.existing(this.ttc);
    this.ttc.init();
    this.players = [
      (new HumanPlayer(this.game,this.ttc,'✗')),
      (new BotPlayer(this.game,this.ttc,'o'))
    ]
    this.ttc.signals.win.add(this.win,this)
    this.ttc.setPlayers(this.players);
  }

  win(data) {
    var result;
    if (data.player == -1) {
        result= 'Draw!';
    } else {
        result = 'Player '+ (data.player+1)+' wins!';
    }

    alert(result);
    this.game.state.start('game');
  }
}

export default Game;
