'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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
		console.log('message:' + cmd);
		
		socket.broadcast.emit('play', cmd);
	});
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});