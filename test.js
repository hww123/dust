require = (function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND",
                f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports,
            function(e) {
                var n = t[o][1][e];
                return s(n ? n: e)
            },
            l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    "./app/login/index": [function(require, module, exports) {
        var login;

        login = function(payload) {
            $.ajax({
                type: 'POST',
                method: 'post',
                url: 'oauth',
                data: payload
            }).done(function(msg) {
                alert('save success!' + msg.data.id);
                window.location.href = '/index';
            });
        };

        module.exports = {
            delegateEvent: function() {
                $('#login').on('click',
                function() {
                    var username = $('[name="username"]').val(),
                    password = $('[name="password"]').val();
                    login.login({
                        username: username,
                        password: password
                    });
                });
            }
        }
    },
    {}],
    "./app/viewport/index": [function(require, module, exports) {
        module.exports = {
            init: function() {
                gobal.getPage('/viewport/navbar', $('#navbar'));
            }
        }
    },
    {}],
    1 : [function(require, module, exports) {
        var gobal = {
            getPage: function(template, el) {
                $.ajax({
                    type: 'GET',
                    method: 'get',
                    url: 'page',
                    data: {
                        id: template
                    }
                }).done(function(html) {
                    $(el).html(html);
                });
            }
        };

        alert('come here first!');
    },
    {}]
},
{},
[1]);

//# sourceMappingURL=main.js.map
