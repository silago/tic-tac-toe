import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'tic-tac-toe-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.start('boot');
