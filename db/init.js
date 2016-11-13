var knex = require('knex')({
    client: 'mysql',
    connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dust',
    charset: 'utf8'
    }
}),
    Bookshelf = require('bookshelf')(knex),
    User = Bookshelf.Model.extend({
        tableName: 'user'
    }),
    Users = Bookshelf.Collection.extend({
        model: User
    });

module.exports = {
    user: User,
    users: Users
};



