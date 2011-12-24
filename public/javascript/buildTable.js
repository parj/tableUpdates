var varSelectedCurrency = "GBP";
var LINK_COUNTRIES = "images/flags/";
var templateLinks = '<img src="' + LINK_COUNTRIES + '#{image}" onclick="setCurrency(\'#{ISO}\')"> | </img> ';
var templateImageCurrency = '<img src="' + LINK_COUNTRIES + '#{image}")"></img> ';
var currencies;

/*var currencies = {
	"GBP" : {"ISO" : "GBP", "image": "gb.png", "pillars": {
		"O/N" : "0.995", 
		"1M" : "1.0",
		"2M" : "1.2",
		"3M" : "1.4"
		}},
	"INR" : {"ISO" : "INR", "image": "in.png", "pillars" : {
	"O/N" : "0.993",
	"S/N" : "0.997",
	"T/N" : "0.999", 
	"1M" : "1.0",
	"2M" : "1.2",
	"3M" : "1.4"
	}}
};*/

function setData(data) {
	currencies = data;
}

function buildAll() {
	buildLinks();
	buildTable();
}

function buildLinks() {
	var links = "";
	$.each(currencies, function() {
		links += $.tmpl(templateLinks, this);
	});
	
	$('#listOfLinks').html(links);
}

function buildTable() {
	$('#divCurrency').html("Loading... Please Wait..");

	var table = '<table border="1" id="tblCurrency">';
	table += '<tr><th>' + $.tmpl(templateImageCurrency, currencies[varSelectedCurrency]) + ' - ' + currencies[varSelectedCurrency].currency + '</th><th>Rate</th></tr>';

	$.each(currencies[varSelectedCurrency].pillars, function(key, value) {
		table += '<tr><td>' + key + '</td>' + '<td>' + value + '</td>' + '</tr>';
	});

	table += '</table>';

	$('#divCurrency').html(table);	
	buildLinks(currencies);
}

function setCurrency(strCurrency) {
	varSelectedCurrency = strCurrency;
	buildTable();
}