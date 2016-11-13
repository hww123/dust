var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DUST' });
});

router.get('/login', function(req, res, next) {
  res.render('login/login', { message: 'this is a login page' });
});

module.exports = router;
