var express = require('express');
var router = express.Router();
const request = require('request');
const csv=require('csvtojson')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Download google sheets CSV
router.get('/NH48', function(req, res) {
  var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlXvAsvkd74diiKmar2TxWejVbkF1rbPZx06qquEjaFko8M-zeds6Wf7bc1lVPuAyOgh_CFq4Vm48a/pub?gid=0&single=true&output=csv';
  request(url, function (error, response, body) {
  	var mountains =
    csv()
	  .fromString(body)
	  .then((csvJson)=>{ 
	  	console.log(csvJson);
        res.render('NH48', {mountains : csvJson});
      })
  });
});

// Individual mountains
router.get('/mountains/:mountainName', function(req, res) {
  var url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlXvAsvkd74diiKmar2TxWejVbkF1rbPZx06qquEjaFko8M-zeds6Wf7bc1lVPuAyOgh_CFq4Vm48a/pub?gid=0&single=true&output=csv';
  request(url, function (error, response, body) {
  	var mountains =
    csv()
	  .fromString(body)
	  .then((csvJson)=>{ 
	  	for (var i=0; i<csvJson.length; i++) {
	  		if (csvJson[i].Name == req.params.mountainName) {
	  			console.log(csvJson[i]);
	  			res.render('mountain', { mountain : csvJson[i] });
	  		}
	  	}
      })
  });
});

module.exports = router;
