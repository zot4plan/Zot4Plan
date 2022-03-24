module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define("courses", {
        id: {
            type: Sequelize.STRING(25),
            allowNull:false,
            primaryKey: true
        },  
        name: {
            type: Sequelize.STRING(200),
            allowNull:false,
        },
        department: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        units: {
            type: Sequelize.INTEGER,
            allowNull:false,
        },
        description: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
        prerequisite: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
        restriction: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
        repeatability: {
            type: Sequelize.INTEGER,
            allowNull:false,
        },
        corequisite: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
        ge: {
            type: Sequelize.STRING(25),
            allowNull:false,
        }, 
    }, {
        timestamps: false
    });
  
    return Courses;
  };
