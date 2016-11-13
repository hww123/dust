var models = require('../../db/init'),
    log = require("../../log").logger("index"),
    save, get;

save = function(obj) {
    return models.user.forge({
        username: obj.name,
        password: obj.password
    }).save();
};

get = function(obj) {
    return models.user.forge(obj).fetch();
}

module.exports = {
    save: save,
    get: get
};

