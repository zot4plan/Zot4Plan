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
        majorRequirements: {
            type: Sequelize.JSON,
        },
    }, {
        timestamps: false
    });
  
    return Majors;
  };
