var viewport = require('./app/viewport/index'),
    $ = require('jquery');

alert('come here showViewPort');
var gobal = {
    showViewPort: function() {
       viewport.render('viewport/navbar', $('#navbar'));
    }
}

gobal.showViewPort();
