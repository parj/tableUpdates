var socket = io.connect();
socket.on('connect', function(){
  $('#status').text('Connected');
});
socket.on('message', function(m){
  $('#message').text(m);
});
socket.on('disconnect', function(){
  $('#status').text('Disconnected');
});
socket.on('initialData', function(data) {
		setData(data.rates);
		buildAll();
	});
