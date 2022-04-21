module.exports = (sequelize, Sequelize) => {
    const Majors = sequelize.define("majors", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        name: {
            type: Sequelize.STRING(50),
            allowNull:false,
        },
        major_requirement: {
            type: Sequelize.JSON,
            allowNull:false,
        },
        url: {
            type: Sequelize.STRING(200),
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Majors;
  };
