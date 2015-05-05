var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('signInForm')
});

router.post('/', function(req, res) {
  console.log(req.body.username);
  res.redirect('/');
});

module.exports = router;
