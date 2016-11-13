var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', maxlength: 254, nullable: false},
    password: {type: 'string', maxlength: 150, nullable: false}
  }
};

module.exports = Schema;