module.exports = (sequelize, DataType) => {
    const CoursesInGe = sequelize.define("courses_in_ge", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        courseId: {
            type: DataType.STRING(25),
            allowNull: false,
        },  
        geId: {
            type: DataType.STRING(5),
            allowNull:false,
        },
    },{
        timestamps: false,
        underscored: true,
        tableName: 'courses_in_ge'
    });
 
    return CoursesInGe;
  };
