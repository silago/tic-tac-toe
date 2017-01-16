class TicTacToe extends Phaser.Sprite {
  constructor(game,size,players) {
    super(game,0,0);
    this.game  =  game;
    this.field_representation =  [
                    [null,null,null],
                    [null,null,null],
                    [null,null,null]
                  ];
    this.field =  [
                    [null,null,null],
                    [null,null,null],
                    [null,null,null]
                  ];
    this.size  =  size;
    this.middle=  (this.size-1)/2;
    this.gameObjectSize = 74;
    this.players = {
      index:0,
      players:[],//players
      current: (function(){return this.players[this.index]}),
      next: (function(){
        this.players[this.index].active  = false;
        if (this.index==this.players.length-1) {
          this.index=0;
        } else {
          this.index++;
        }
        this.players[this.index].active  = true;

      })
    }
    this.active = true;
    this.signals = {};
    this.signals.win = new Phaser.Signal();
  }

  setPlayers (players) {
    this.players.players = players;
  }

  update () {
    if (!this.active) return;
    var player =this.players.current();
    if (!player) return;
    if (player.point) {
      if (this.isValid(player.point)) {
          this.makePoint(player.point,player.value);
          this.players.players[this.players.index].active = false;
          this.players.players[this.players.index].point = null;
          this.players.next();
          console.log('point');
      } else {
          this.players.players[this.players.index].point = null;
      }
    }
  }

  isValid (point) {
    if (point !=null && this.field[point.y][point.x]==null) return true;
    return false;
  }
  switchPlayer() {
        this.players.next();
  }

  init() {
      for (let y in this.field_representation) {
        for (let x in this.field_representation[y]) {
          this.field_representation[y][x] = this.game.add.text(x*this.gameObjectSize,y*this.gameObjectSize,"[]",{
            font:this.gameObjectSize+'px Arial', fill:"#fff"
          });
          this.field_representation[y][x].inputEnabled = true;
        }
      }
  }

  checkVictory(point) {
    if (this.isFinalPoint(point)) {
        this.signals.win.dispatch({player:this.players.index});
      } else {
        for (var y of this.field) for (var x of y) if (x==null) {return;}
        this.signals.win.dispatch({player:-1});
      }
  }

  makePoint(point,val) {
      var x = point.x;
      var y = point.y;
      this.field[y][x] = val;
      this.field_representation[y][x].text = val;
      this.checkVictory(point);
  }

  getSettings() {
    return {
      middle:this.middle,
      size  :this.size
    }
  }

  getField() {
    return this.field;
  }

  isFinalPoint(point) {
            var x = point.x,
                y = point.y,
                val = this.field[y][x];

            if (this.field[y].every((p)=>{
                return p==val;
            })==true) return true;


            if (this.field.every((p)=>{
                return p[x]==val;
            })==true) return true;

            if ( ((y == 0 || y == this.size-1) && (x == 0 || x==this.size-1)) || x == y == this.middle ) {
               var result = true;
                    for (var _x= _y =0; (_x<this.size && _y<this.size); _x++,_y++) {
                        result = result && (this.field[_y][_x] == val);
                    }
                    if(result) return result;
                     for (var _x=0, _y =this.size-1; (_x<this.size && _y>0); _x++,_y--)  result = result && ( this.field[_y][_x] == val ); if(result) return result;
            }
            return false;
  }

}

export default TicTacToe;
