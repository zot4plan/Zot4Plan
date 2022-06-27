const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
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
db.programs = require("./programs.model.js")(sequelize,Sequelize);
db.general_education = require("./general_education.model.js")(sequelize,Sequelize);
db.courses_in_ge = require("./courses_in_ge.model.js")(sequelize, Sequelize);
db.visits = require("./visits.model.js")(sequelize, Sequelize);

db.courses.belongsToMany(db.general_education, {
    through: "courses_in_ge",
    as: "courses",
    foreignKey: "courseId",
  });

db.general_education.belongsToMany(db.courses, {
    through: "courses_in_ge",
    as: "general_education",
    foreignKey: "geId",
});

module.exports = db;