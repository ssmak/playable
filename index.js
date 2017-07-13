'use strict';

const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
const fs = require('fs');
const ytdl = require('ytdl-core');

app.use(express.static(path.join(__dirname, '/')));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/remote', function (req, res) {
	res.sendFile(__dirname + '/remote.html');
});

io.on('connection', function (socket) {
	console.log('a user connected');
	
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	
	socket.on('play', function (cmd) {
		console.log('receive remote cmmand: ');
		console.log(cmd);
				
		socket.broadcast.emit('play', cmd);
	});
	
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
					console.log(filename);
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
	
	socket.on('error', function (err) {
		console.log('socket err: ');
		console.log(err);
		
		socket.disconnect();
	});
});

http.listen(3303, function () {
	console.log('listening on *:3303');
});