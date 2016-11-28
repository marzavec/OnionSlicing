/*
	Developer: Marzavec ( https://github.com/marzavec )
	Description: Just an experiment in how fast iterative onion crawling is
*/

const torRequest = require('tor-request');

var worker = {
  myId: -1,

  init: function(){
    process.on('message', this.onMsg);
    this.sendReady();
  },

  sendReady: function(){
    process.send({ workerId: this.myId, reply: 'ready' });
  },

  foundOnion: function(uri){
    process.send({ workerId: this.myId, reply: 'up', uri: uri });
  },

  onMsg: function(data){
    if(typeof data.runJob !== 'undefined' && data.runJob){
      //process.send({ workerId: this.myId, reply: 'debug', text: 'checking: ' + data.uri });
      torRequest.request('http://' + data.uri + '.onion', function(err, res, body){
        if(!err){
          worker.foundOnion(data.uri + '.onion');
        }else{
          worker.sendReady();
        }
      });
    }
  }
}

worker.myId = process.argv[2];

worker.init();
