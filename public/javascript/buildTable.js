var varSelectedCurrency = "GBP";
var LINK_COUNTRIES = "images/flags/";
var LINK_STATUS = "images/status/";
var templateLinks = '<img src="' + LINK_COUNTRIES + '#{image}" onclick="setCurrency(\'#{ISO}\')"> | </img> ';
var templateImageCurrency = '<img src="' + LINK_COUNTRIES + '#{image}")"></img> ';
var currencies;

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
	//$('#divCurrency').html("Loading... Please Wait..");

	var table = '<table id="tblCurrency">';
	//table += '<tr><th>' + 
	//			$.tmpl(templateImageCurrency, currencies[varSelectedCurrency]) + ' - ' + currencies[varSelectedCurrency].currency + 
	//			'</th><th>Rate</th></tr>';

	$.each(currencies[varSelectedCurrency].pillars, function(key, value) {
		table += '<tr><td>' + key + '</td>' + '<td>' + value + '</td>' + '</tr>';
	});

	table += '</table>';

	$('#divCurrency').html(table);
}

function setCurrency(strCurrency) {
	varSelectedCurrency = strCurrency;
	buildTable();
}