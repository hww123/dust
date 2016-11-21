var $ = require('jquery'),
    T = require('./app/tornado/tornado'),
    getHash = function() {
        return window.location.hash.slice(1);
    };

$(window).on('hashchange', function() {
    $('#content').html(T.loadTemplate(getHash()));
});

T.start('viewport');
