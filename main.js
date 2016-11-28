/*
	Developer: Marzavec ( https://github.com/marzavec )
	Description: Just an experiment in how fast iterative onion crawling is
*/

// globals //
const fs = require('fs');
const process = require('child_process');

const startChar = 48;
const endChar = 122;

const childProcessCnt = 10; // ~30ms start time & ~8-10mb memory / process //

charArray = [];
for(var i = 0, j = 16; i < j; i++)
	charArray.push(startChar);

checkedCnt = 0;
rateCnt = 0;
foundCnt = 0;
lastResult = '';

// master class //
var master = {
	workers: [],

	init: function(){
		// build worker processes & add to ctrl array //
		for(var i = 0; i < childProcessCnt; i++) this.workers.push(this.buildWorker());
	},

	buildWorker: function(){
		var newWorker = process.fork(__dirname + '/worker.js', [this.workers.length]);
		newWorker.on('message', master.workerReply);

		return newWorker;
	},

	workerReply: function(data){
		if(data.reply == "ready"){
			master.assignJob(parseInt(data.workerId));
		}else if(data.reply == "up"){
			foundCnt++;
			//fs.appendFile(outputFile, data.uri, function (err){});
			console.log("Found: " + data.uri);
		}else if(data.reply == 'debug'){
			console.log(data.text);
		}
	},

	assignJob: function(targetWorker){
		checkedCnt++;
		rateCnt++;

		this.workers[targetWorker].send({ runJob: true, uri: this.getNextURI() });
	},

	getNextURI: function(){
		this.incCharArray();

		var nextSalt = "";
		for(var i = 0, j = charArray.length; i < j; i++) nextSalt += String.fromCharCode(charArray[i]);

		return nextSalt;
	},

	incCharArray: function(){
		for(var i = charArray.length - 1; i >= 0; i--){
			charArray[i]++;

			if(charArray[i] == 58) charArray[i] = 97;

			if(charArray[i] == endChar + 1){
				charArray[i] = startChar;

				if(i == 0){
					console.log("Omg, done! Scanned every possible .onion");
					process.exit();
					return;
				}
			}else{
				return;
			}
		}
	}
}

process.title = "Onion Sniffer - Testing rates";

console.log("Onion Sniffer! To test how many onions per second can be pinged.");
console.log("Started with: " + childProcessCnt + " threads");
console.log("----------------------------------");

setInterval(function(){
	console.log("Checked " + checkedCnt + " onions, online: " + foundCnt);
	console.log((rateCnt / 30) + " O/s (onions per second)");
	rateCnt = 0;
}, 30000);

master.init();
