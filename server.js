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
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var socket = io.listen(app);

socket.sockets.on('connection', function(client){
  var connected = true;
  client.on('message', function(m){
    sys.log('Message received: '+m);
  });
  client.on('disconnect', function(){
    connected = false;
  });

  var tick = function(){
    if (!connected) {
      return;
    }

    var dateTime = new Date();
    var msg = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();

    console.log("Sending " + dateTime);
    client.send(msg);
    setTimeout(tick, 1000);
  };
  
  tick();
});

