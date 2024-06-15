let {config, sequelize, connection} = require("./connection");

let models = {
   users: (require("./../schemas/users"))(connection, sequelize),
   admins: (require("./../schemas/admins"))(connection, sequelize),
   jobs: (require("./../schemas/jobs"))(connection, sequelize),
   sent_emails: (require("./../schemas/sent_emails"))(connection, sequelize),
};


let instance = require("./instance");
module.exports = {
    config,
    sequelize,
    connection,
    models,
    db: instance
};