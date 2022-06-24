module.exports = (sequelize, Sequelize) => {
    const Programs = sequelize.define("programs", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull:false,
        },
        isMajor: {
            type: Sequelize.BOOLEAN,
            allowNull:false,
        },
        requirement: {
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
  
    return Programs;
  };
