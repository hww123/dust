var $ = require('jquery'),
    getRource;


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
    },
    loadTemplate: function(name, options) {
        var template = getRource('./app/' + name + '/templates');
        return template(options);
    },
    start: function(path) {
        window.location.hash = '#' + path;
    }
};

getRource = function(path) {
    return require(path); // eslint-disable-line global-require
};
