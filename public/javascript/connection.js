var socket = io.connect();

function connectSocket() {
	socket.socket.reconnect();
}

function disconnectSocket() {
	 socket.disconnect();
}

socket.on('connect', function(){
	$('#status').text('Connected');
	document.getElementById('imgStatus').src = LINK_STATUS + 'ok.png';
	document.getElementById('imgStatus').onclick = disconnectSocket;
});

socket.on('message', function(m){
	$('#message').text(m);
});

socket.on('disconnect', function(){
	$('#status').text('Disconnected');
	document.getElementById('imgStatus').src = LINK_STATUS + 'disconnected.png';
	document.getElementById('imgStatus').onclick = connectSocket;
});

socket.on('initialData', function(data) {
	setData(data.rates);
	buildAll();
});
	
socket.on('update', function(data) {
	setData(data.rates);
	buildTable();
});
