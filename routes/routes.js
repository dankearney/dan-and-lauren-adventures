var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/NH48', function(req, res) {
  res.render('NH48');
});

module.exports = router;
