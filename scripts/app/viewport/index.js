var T = require('./app/tornado/tornado'),
    $ = require('jquery');

module.exports = {
    render: function(template, el) {
        T.template(template, el);
    }
}



