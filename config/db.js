

require("dotenv").config();

let config = {
    port: 5432,
    dialect: "postgres",
    showErrors: true,
    charset: "utf8mb4",
    logging: false,
    pool: {
        min: 0,
        max: 10,
        idle: 30 * 1000,
        evict: 2 * 1000,
        acquire: 60 * 1000,
        handleDisconnects: true
    },
    dialectOptions: {charset: "utf8mb4"}
};


    config.user = "postgres";
    config.pass = "iOSdeveloper";
    config.host = "localhost";
    config.name = "scheduler"


console.log("database host", config.host);
module.exports = config;