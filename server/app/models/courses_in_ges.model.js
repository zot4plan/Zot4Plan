module.exports = (sequelize, Sequelize) => {
    const Courses_in_ges = sequelize.define("courses_in_ges", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        courseId: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },  
        geId: {
            type: Sequelize.STRING(5),
            allowNull:false,
        },
    },{
        timestamps: false
    });
  
    return Courses_in_ges;
  };
