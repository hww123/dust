var T = require('./app/tornado/tornado');

module.exports = {
    render: function(template, el) {
        T.template(template, el);
    }
};
