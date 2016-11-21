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
    }
};

$('#login').on('click', function() {
    var username = $('[name="username"]').val(),
        password = $('[name="password"]').val();
    login.login({
        username: username,
        password: password
    });
})
