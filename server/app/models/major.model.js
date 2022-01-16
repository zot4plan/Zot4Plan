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
/*   CREATE TABLE majors(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    majorRequirements json DEFAULT NULL,
    PRIMARY KEY(id)); */