var gobal = {
    getPage: function(template, el) {
        $.ajax({
            type: 'GET',
            method: 'get',
            url: 'page',
            data: { id: template }
        }).done(function(html) {
            $(el).html(html);
        });
    }
};

// @include /login/login.js
// @include /viewport/navbar.js