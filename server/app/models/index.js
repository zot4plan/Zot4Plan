const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    } 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require("./courses.model.js")(sequelize, Sequelize);
db.majors = require("./majors.model.js")(sequelize,Sequelize);
db.general_educations = require("./general_educations.model.js")(sequelize,Sequelize);
db.courses_in_ges = require("./courses_in_ges.model.js")(sequelize, Sequelize);
module.exports = db;