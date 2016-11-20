var $ = require('jquery'),
    viewport = require('./app/viewport/index');

module.exports = {
    template: function(template, el) {
        $.ajax({
            type: 'GET',
            method: 'get',
            url: 'page',
            data: { id: template }
        }).done(function(html) {
            $(el).html(html.data);
        });
    }
};
