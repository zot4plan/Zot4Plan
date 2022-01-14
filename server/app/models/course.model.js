module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define("courses", {
        id: {
            type: Sequelize.STRING(25),
            allowNull:false,
            primaryKey: true
        },  
        title: {
            type: Sequelize.STRING(200),
            allowNull:false,
        },
        units: {
            type: Sequelize.STRING(10),
            allowNull:false,
        },
        description: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
        prereqString: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
        restriction: {
            type: Sequelize.STRING(1000),
            allowNull:false,
        },
    }, {
        timestamps: false
    });
  
    return Courses;
  };
/*  id VARCHAR(25) NOT NULL,
    title VARCHAR(200) NOT NULL,
    units VARCHAR(10) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    prereqString VARCHAR(1000) NOT NULL,
    restriction VARCHAR(1000) NOT NULL,
    PRIMARY KEY(id)); */