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

// courses_in_ge associations
db.courses.hasMany(db.courses_in_ge, {foreignKey: 'course_id', as: 'coursesInGE'});
db.courses_in_ge.belongsTo(db.courses, {foreignKey: 'id'} );
db.general_education.hasMany(db.courses_in_ge, {foreignKey: 'ge_id', as: 'coursesInGE'});
db.courses_in_ge.belongsTo(db.general_education, {foreignKey: 'id'} );

module.exports = db;