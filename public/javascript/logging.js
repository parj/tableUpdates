logmagic = require('logmagic');

var logmessages = "";
logmagic.registerSink("stdout", function(module, level, message) { 
	console.log("[" + timeStamp + "]\t" + message); 
});

logmagic.registerSink("variable"

var getTimeStamp = function() {
	 var dateTime = new Date();
    var timeStamp = "[" + dateTime.getFullYear() + '' + 
    							(dateTime.getMonth()+1) + '' + 
    							dateTime.getDate() + " " + 
    							dateTime.getHours() + ":" + 
    							dateTime.getMinutes() + ":" + 
    							dateTime.getSeconds() + "]\t" + module + "\t";
}

/* Send Info an higher in the root logger to stdout */
logmagic.route("__root__", logmagic.DEBUG, "stdout");

