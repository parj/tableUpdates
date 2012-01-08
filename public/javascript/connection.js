var hostname = 'http://' + document.location.hostname;
var socketInitialData = io.connect(hostname);	//To get initial data
var socketRateUpdate = io.connect(hostname + '/rates/update');	//To get updates on rates

socketInitialData.on('initialData', function(data) {
	setData(data.rates);
	buildAll();
});

function connectSocket() {
	$('#txtConnectionStatus').text('ATTEMPTING');
	document.getElementById('txtConnectionStatus').setAttribute("class", "label warning");
	socketRateUpdate.socket.reconnect();
}

function disconnectSocket() {
	socketRateUpdate.disconnect();
}

socketRateUpdate.on('connect', function(){
	$('#txtConnectionStatus').text('CONNECTED');
	document.getElementById('txtConnectionStatus').setAttribute("class", "label success");
	document.getElementById('txtConnectionStatus').onclick = disconnectSocket;
});

socketRateUpdate.on('message', function(data){
	setData(data.rates);
	buildTable();
});

socketRateUpdate.on('disconnect', function(){
	$('#txtConnectionStatus').text('DISCONNECTED.. Click to retry');
	document.getElementById('txtConnectionStatus').setAttribute("class", "label important");
	document.getElementById('txtConnectionStatus').onclick = connectSocket;
});

socketRateUpdate.on('message', function(data){
	setData(data.rates);
	buildTable();
});
