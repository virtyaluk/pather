const fs = require('fs'),
	pather = require('./pather'),
    inputFile = process.argv[2] || null,
	outputFile = process.argv[3] || 'output.txt',
	writeFile = function(err, data) {
		if (err) { return console.error(err); }
		
		console.info('All OK. Check the `' + outputFile + '` file.');
	},
	readFile = function(err, data) {
		if (err) { return console.error(err); }
		
		fs.writeFile(outputFile, pather(data), writeFile);
	},
	fileExists = function(err, data) {
		if (err) { return console.error(err); }
		
		fs.readFile(inputFile, 'utf8', readFile);
	};

if (inputFile) {
	fs.access(inputFile, fs.R_OK, fileExists);
} else {
	console.log('PROBLEM: no input file is not given');
}