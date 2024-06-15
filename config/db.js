
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize('postgres', 'postgres', 'iOSdeveloper', {
//     dialect: "postgres"
// })


// const testDbConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   };

// module.exports = {
//     testDbConnection
// };



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


// switch (process.env.ENV) {
//   case "development":
    config.user = "postgres";
    config.pass = "iOSdeveloper";
    config.host = "localhost";
    config.name = "scheduler"
//     break;
//     case "staging":
//       config.user = process.env.DATABASE_USERNAME_STAGING;
//       config.pass = "NeTwErK#1";
//       config.host = process.env.DATABASE_HOST_STAGING;
//       config.name = process.env.DATABASE_NAME_STAGING;
//       break;
//     case "production":
//       config.user = process.env.DATABASE_USERNAME_PRODUCTION;
//       config.pass = "NeTwErK#1";
//       config.host = process.env.DATABASE_HOST_PRODUCTION;
//       config.name = process.env.DATABASE_NAME_PRODUCTION;
//       break;
    
//   }

console.log("database host", config.host);
module.exports = config;