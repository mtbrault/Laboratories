const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('include'))
app.get('/', (_, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

let messages = [];

io.on('connection', (socket) => {
	socket.emit('readAllMessages', messages);
	socket.on('receiveMessage', (message) => {
		console.log(messages)
		messages.push(message);
		console.log(messages)
		socket.broadcast.emit('readOneMessage', message);
	})
})

http.listen(3000, () => {
	console.log("Listening on localhost:3000");
});