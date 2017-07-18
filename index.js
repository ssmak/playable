'use strict';

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
const fs = require('fs');
const ytdl = require('ytdl-core');
const argv = require('yargs').argv;


app.use(express.static(path.join(__dirname, '/')));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/remote', function (req, res) {
	res.sendFile(__dirname + '/remote.html');
});

io.of('/').on('connection', function (socket) {
	console.log('user connected');
	
	let room = socket.handshake.query.room;
	socket.join(room);
	//ack to client (channel joined)
	socket.emit('system', {
		type: 'channel_joined'
	});
	
	socket.on('disconnect', function () {
		console.log('user disconnected');
		
		socket.leave(room);
	});
	

	/*
	play video request handling
	*/
	socket.on('play', function (cmd) {
		console.log('receive remote cmmand: ');
		console.log(cmd);
				
		socket.to(room).emit('play', cmd);
	});
	
	/*
	download request handling
	*/
	/*
	socket.on('download', function (cmd) {
		console.log('download the resource: ');
		console.log(cmd);
		
		let download_folder = __dirname + '/download/' + moment().format('YYYYMMDD');
		if(!fs.existsSync(__dirname + '/download')) {
			fs.mkdirSync(__dirname + '/download');
		}
		if(!fs.existsSync(download_folder)) {
			fs.mkdirSync(download_folder);
		}
		let filename = cmd.resource_title.replace("'", '').replace('"', '').replace('.', '').replace('\\', '').replace('/', '');
		let output_stream = fs.createWriteStream(download_folder + '/' + filename + '.mp4');
		output_stream.on('error', function (err) {
			console.log("output file stream error: ");
			console.log(err);
		});		
		(
			function (filename) {
				output_stream.on('finish', function () {
					console.log("complete download");
					console.log(filename, 'room: ', room);
					socket.emit('system', {
						type: 'download_completed',
						filename: filename
					});
				});
			}
		)(filename);
		let video = ytdl('http://www.youtube.com/watch?v=' + cmd.resource_id);
		video.pipe(output_stream);
	});
	*/
	
	socket.on('error', function (err) {
		console.log('socket err: ');
		console.log(err);
		
		socket.disconnect();
	});
});


/*
entry point
*/
if(!argv.debug) {
	//hidden console output
	console.log = function (){};
}
//default binding port is 8080 if no specified port no
var port = argv.port ? argv.port : 8080
http.listen(port, function () {
	console.log('listening on *:', port);
});
