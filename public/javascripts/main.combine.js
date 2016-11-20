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

(function() {
    var login = {
        login: function(payload) {
            $.ajax({
                type: 'POST',
                method: 'post',
                url: 'oauth',
                data: payload
            })
            .done(function(msg) {
                alert('save success!' + msg.data.id);
                window.location.href = '/index';
            });
        },
        delegateEvent: function() {
            $('#login').on('click', function() {
                var username = $('[name="username"]').val(),
                    password = $('[name="password"]').val();
                login.login({
                    username: username,
                    password: password
                });
            });
        }
    };

    login.delegateEvent();
})();


(function(){
    var navbar = {
        init: function() {
            gobal.getPage('/viewport/navbar', $('#navbar'));
        }
    };

    navbar.init();

})();
