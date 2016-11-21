var jade = require('jade');

module.exports = {
    getPage: function(id) {
        var html = jade.renderFile('./views/' + id + '.jade');
        return html;
    }
};
