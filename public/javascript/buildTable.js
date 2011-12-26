//Default selected currency
var varSelectedCurrency = "GBP";

//Static variables
var LINK_COUNTRIES = "images/flags/";
var LINK_STATUS = "images/status/";

//Templates
var templateLinks = '<img src="' + LINK_COUNTRIES + '#{image}" onclick="setCurrency(\'#{ISO}\')"> | </img> ';
var templateImageCurrency = '<img src="' + LINK_COUNTRIES + '#{image}")"></img> ';
var templateTableTR = '<tr onMouseOver="this.bgColor=\'yellow\';" onMouseOut="this.bgColor=\'white\';">';

var templateTableHeader = '<tr><th>#{header1}</th><th>#{header2}</th></tr>';
var templateTableRow = '<tr onMouseOver="this.bgColor=\'yellow\';" onMouseOut="this.bgColor=\'white\';"><td>#{key}</td><td>#{value}</td></tr>';

//Global variable to be used
var currencies;

function setData(data) {
	currencies = data;
}

function buildAll() {
	buildCurrencySelection();
	buildTable();
}

function buildCurrencySelection() {
	var links = "";
	$.each(currencies, function() {
		links += $.tmpl(templateLinks, this);
	});
	
	$('#pnlLinks').html(links);
}

function buildTable() {
	// --Set the selected currency	
	var imgSelectedCurrency = 'Selected - ' + 
										$.tmpl(templateImageCurrency, currencies[varSelectedCurrency]) + ' - ' + 
										currencies[varSelectedCurrency].currency;
										
	$('#pnlRateSelectedCurrency').html(imgSelectedCurrency);
	
	var table = '<table id="tblRate">';
	
	//Render the headers
	table += $.tmpl(templateTableHeader, {header1 : 'Pillar', header2 : 'Rate'});

	//Render the body of the table
	$.each(currencies[varSelectedCurrency].pillars, function(key, value) {
		table += $.tmpl(templateTableRow, {'key' : key, 'value' : value});
	});

	//Close the tage
	table += '</table>';

	$('#pnlRateTable').html(table);
}

function setCurrency(strCurrency) {
	varSelectedCurrency = strCurrency;
	buildTable();
}