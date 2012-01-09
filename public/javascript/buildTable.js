//Default selected currency
var varSelectedCurrency = "GBP";

//Static variables
var LINK_COUNTRIES = "images/flags/";
var LINK_STATUS = "images/status/";

//Templates
var templateLinks = '<img id="imgLinks" src="' + LINK_COUNTRIES + '#{image}" onclick="setCurrency(\'#{ISO}\')"></img> ';
var templateImageCurrency = '<img src="' + LINK_COUNTRIES + '#{image}")"></img> ';
var templateTableTR = '<tr>';

//Rates Table
var templateRateTable = '<table id="tblRate" class="zebra-striped">';
var templateRateTableHeader = '<tr><th>#{header1}</th><th>#{header2}</th></tr>';
var templateRateTableRow = '<tr><td>#{key}</td><td>#{value}</td></tr>';

//Global variable to be used
var currencies;

function setData(data) {
	currencies = data;
}

function buildAll() {
	buildCurrencySelection();
	buildSelectedCurrency();
	buildTable();
}

function buildCurrencySelection() {
	var links = "";
	$.each(currencies, function() {
		links += $.tmpl(templateLinks, this);
	});
	
	$('#pnlLinks').html(links);
}

function buildSelectedCurrency() {
	// --Set the selected currency	
	var imgSelectedCurrency = 'Selected - ' + 
										$.tmpl(templateImageCurrency, currencies[varSelectedCurrency]) + ' - ' + 
										currencies[varSelectedCurrency].currency;
										
	$('#pnlRateSelectedCurrency').html(imgSelectedCurrency);
	$('#pnlRateSelectedCurrencySymbol').html(currencies[varSelectedCurrency].currency);
										
}

function buildTable() {
	//Create a temporary table
	var rateTable = templateRateTable;
	
	//Render the headers
	rateTable += $.tmpl(templateRateTableHeader, {header1 : 'Pillar', header2 : 'Rate'});

	//Render the body of the table
	$.each(currencies[varSelectedCurrency].pillars, function(key, value) {
		rateTable += $.tmpl(templateRateTableRow, {'key' : key, 'value' : value});
	});

	//Close the tag
	rateTable += '</table>';

	//Set the table
	$('#pnlRateTable').html(rateTable);
}

function setCurrency(strCurrency) {
	varSelectedCurrency = strCurrency;
	buildSelectedCurrency();
	buildTable();
}