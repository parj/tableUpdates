var http    = require('http'), 
    io      = require('socket.io'),
    sys     = require('util'),
    express = require('express'),
    routes  = require('./routes');

var port = 8111;

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);

var socket = io.listen(app);
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

socket.sockets.on('connection', function(client){
  var connected = true;
  
  client.on('message', function(m){
    sys.log('Message received: '+m);
  });

  client.on('disconnect', function(){
    connected = false;
  });
  
  var currencies = {
	"GBP" : {"ISO" : "GBP", "currency" : "£", "image": "gb.png", "pillars": {
		"O/N" : "0.995", 
		"1M" : "1.0",
		"2M" : "1.2",
		"3M" : "1.4"
		}},
	"INR" : {"ISO" : "INR", "currency" : "र", "image": "in.png", "pillars" : {
		"O/N" : "0.993",
		"S/N" : "0.997",
		"T/N" : "0.999", 
		"1M" : "1.0",
		"2M" : "1.2",
		"3M" : "1.4"
		}},
	"CHF" : {"ISO" : "CHF", "currency" : "F", "image": "ch.png", "pillars" : {
		"O/N" : "0.999",
		"S/N" : "1.002",
		"T/N" : "1.010", 
		"1M" : "1.020",
		"2M" : "1.080",
		"3M" : "1.1",
		"1Y" : "1.111"
		}},
	"JPY" : {"ISO" : "JPY", "currency" : "¥", "image": "jp.png", "pillars" : {
		"O/N" : "120",
		"S/N" : "121",
		"T/N" : "120.099", 
		"1M" : "118",
		"2M" : "117",
		"3M" : "119",
		"1Y" : "130"
		}}	
	};
  
  client.emit('initialData', {rates : currencies}); 
});

