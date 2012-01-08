var http    = require('http'), 
    io      = require('socket.io'),
    sys     = require('util'),
    express = require('express'),
    routes  = require('./routes');

var port = 8080;

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
app.listen(process.env.PORT || port);
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
		"O/N" : "0", 
		"1M"  : "0",
		"2M"  : "0",
		"3M"  : "0"
		}},
	"INR" : {"ISO" : "INR", "currency" : "&#x20b9;", "image": "in.png", "pillars" : {
		"O/N" : "0",
		"S/N" : "0",
		"T/N" : "0", 
		"1M"  : "0",
		"2M"  : "0",
		"3M"  : "0"
		}},
	"CHF" : {"ISO" : "CHF", "currency" : "₣", "image": "ch.png", "pillars" : {
		"O/N" : "0",
		"S/N" : "0",
		"T/N" : "0", 
		"1M"  : "0",
		"2M"  : "0",
		"3M"  : "0",
		"1Y"  : "0"
		}},
	"JPY" : {"ISO" : "JPY", "currency" : "¥", "image": "jp.png", "pillars" : {
		"O/N" : "0",
		"S/N" : "0",
		"T/N" : "0", 
		"1M"  : "0",
		"2M"  : "0",
		"3M"  : "0",
		"1Y"  : "0"
		}}	
	};
	
	//Send some initialisation data to the clients
	client.emit('initialData', {rates : currencies});  
	
});

var randomChange = function() {
	var currencies = {
"GBP" : {"ISO" : "GBP", "currency" : "£", "image": "gb.png", "pillars": {
	"O/N" : Math.random(), 
	"1M"  : Math.floor(Math.random() * 2) + 1,
	"2M"  : Math.floor(Math.random() * 2) + 1,
	"3M"  : Math.floor(Math.random() * 2) + 1
	}},
"INR" : {"ISO" : "INR", "currency" : "&#x20b9;", "image": "in.png", "pillars" : {
	"O/N" : Math.floor(Math.random() * 4) + 1,
	"S/N" : Math.floor(Math.random() * 4) + 1,
	"T/N" : Math.floor(Math.random() * 4) + 1, 
	"1M"  : Math.floor(Math.random() * 4) + 1,
	"2M"  : Math.floor(Math.random() * 4) + 1,
	"3M"  : Math.floor(Math.random() * 4) + 1
	}},
"CHF" : {"ISO" : "CHF", "currency" : "₣", "image": "ch.png", "pillars" : {
	"O/N" : Math.random(),
	"S/N" : Math.random(),
	"T/N" : Math.random(), 
	"1M"  : Math.random(),
	"2M"  : Math.random(),
	"3M"  : Math.random(),
	"1Y"  : Math.random()
	}},
"JPY" : {"ISO" : "JPY", "currency" : "¥", "image": "jp.png", "pillars" : {
	"O/N" : Math.floor(Math.random() * 120) + 70,
	"S/N" : Math.floor(Math.random() * 120) + 70,
	"T/N" : Math.floor(Math.random() * 120) + 70, 
	"1M"  : Math.floor(Math.random() * 120) + 70,
	"2M"  : Math.floor(Math.random() * 120) + 70,
	"3M"  : Math.floor(Math.random() * 120) + 70,
	"1Y"  : Math.floor(Math.random() * 120) + 70
	}}	
};
	socket.of('/rates/update').json.send({rates : currencies});
	setTimeout(randomChange, 1000);
}
randomChange();
