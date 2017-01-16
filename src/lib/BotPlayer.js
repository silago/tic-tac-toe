class BotPlayer extends Phaser.Sprite {
  constructor(game,ttc,value) {
      super(game,0,0,'');
      this.value = value;
      this.game = game;
      this.active = false;
      this.point  = false;
      this.ttc = ttc;
      this.game.add.existing(this);
      this.timeout = null;
  }

  check(y,x) {
    this.point = {y,x}
  }
  
  wait() {
  
  }
  
  update() {
    
    if (this.active && !this.point && !this.timeout) {
        this.point = null;
        this.timeout = setTimeout(() => {
            this.point = this.getPointToCheck();
            this.timeout=null;
        },1000);
    }
  }

  init() {

  }

  getPointToCheck() {
    var arr = this.ttc.field;
    var vals = [this.value];

        var _reversed_array = [];
        for (var y in arr) {
            _reversed_array[y] = [];
            for (var x in arr[y])    {
                        _reversed_array[y][x]=arr[x][y];
            if (vals.indexOf(arr[x][y])==-1) {
              vals.push(arr[x][y]);
            }
            }
        }
    for(var i=0; i<vals.length;i++) {
      var val = vals[i];
      if (val==null) continue;
            for (y in arr) {
                if (arr[y].filter(p=>p==val).length==2 && arr[y].indexOf(null)!=-1) {
                    return {
                            y,x:arr[y].indexOf(null)
                    }
                }
            }
            for (x in _reversed_array) {
                if (_reversed_array[x].filter(p=>p==val).length==2 && _reversed_array[x].indexOf(null)!=-1) {
                    return {
                            y:_reversed_array[x].indexOf(null),x
                    }
                }
            }

               var result = {'null':[],'val': [] };
               var isLeftOneForMatch = (result)=> { return  result['val'].length==this.ttc.size-1 && result['null'].length==1;}

               for (let x =0, y=0; (x<this.ttc.size && y<this.ttc.size); x++,y++) {
                    if ( arr[y][x] == val)  {
              result.val.push({y,x});
            }
                    if (arr[y][x] == null) result['null'].push({y,x});
               };
               if (isLeftOneForMatch(result)) { return result['null'][0]; }
               var result = {'null':[],'val': [] };
               for (let x = 0, y=this.ttc.size-1; (x<this.ttc.size && y>=0); x++,y--) {
                    if (arr[y][x] == val)  result.val.push({y,x});
                    if (arr[y][x] == null) result['null'].push({y,x});
               };
               if (isLeftOneForMatch(result)) { return result['null'][0]; }
            //}
            }
            for (y in arr) for (x in arr[y]) if (arr[y][x]==null) return {y,x};
            return null;
        }
}
export default BotPlayer;
