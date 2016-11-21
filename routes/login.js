var express = require('express'),
    router = express.Router(),
    log = require('../log').logger('index'),
    userService = require('../service/user/userService'),
    helper = require('../util/helper');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: '首页' });
});

router.get('/login', function(req, res) {
    res.render('login/login', { message: 'this is a login page' });
});

router.post('/oauth', function(req, res) {
    userService.get(req.body).then(function(user) {
        log.info('验证成功，进行回调: ' + user.get('username'));
        if (user) res.json({ error: false, data: user });
    }).otherwise(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    });
});

router.get('/index', function(req, res) {
    res.render('index', { title: '首页' });
});

router.get('/page', function(req, res) {
    res.json({ error: false, data: helper.getPage(req.query.id) });
});

module.exports = router;
