var socketInitialData = io.connect();	//To get initial data
var socketRateUpdate = io.connect('http://localhost/rates/update');	//To get updates on rates

socketInitialData.on('initialData', function(data) {
	setData(data.rates);
	buildAll();
});

function connectSocket() {
	socketRateUpdate.socket.reconnect();
}

function disconnectSocket() {
	socketRateUpdate.disconnect();
}

socketRateUpdate.on('connect', function(){
	$('#status').text('Connected');
	document.getElementById('imgStatus').src = LINK_STATUS + 'ok.png';
	document.getElementById('imgStatus').onclick = disconnectSocket;
});

socketRateUpdate.on('message', function(data){
	setData(data.rates);
	buildTable();
});

socketRateUpdate.on('disconnect', function(){
	$('#status').text('Disconnected');
	document.getElementById('imgStatus').src = LINK_STATUS + 'disconnected.png';
	document.getElementById('imgStatus').onclick = connectSocket;
});

socketRateUpdate.on('message', function(data){
	setData(data.rates);
	buildTable();
});
