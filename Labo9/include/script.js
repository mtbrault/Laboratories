let socket = io();

window.onload = function() {
	let messagesList = document.getElementById('messagesList');
	let nickname = '';

	socket.on('readAllMessages', (messages) => {
		console.log(messages);
		document.getElementById('messagesList').innerHTML = '';
		for (var i = 0; i < messages.length; i++)
			messagesList.innerHTML += "<li>" + messages[i].nickname + ": " + messages[i].message + "</li>";
	});

	socket.on('readOneMessage', (message) => {
		messagesList.innerHTML += "<li>" + message.nickname + ": " + message.message + "</li>";
	});

	document.getElementById('submitNickname').onclick = () => {
		nickname = document.getElementById('nickname').value;
		if (nickname === '')
			nickname = 'User';
		document.getElementById('auth').style.display = 'none';
		document.getElementById('chat').style.display = 'block';
	};

	document.getElementById('sendMessage').onclick = () => {
		const message = document.getElementById('mess').value;
		socket.emit('receiveMessage', {nickname, message});
		messagesList.innerHTML += "<li>" + nickname + ": " + message + '</li>';
		document.getElementById('mess').value = '';
	};
};