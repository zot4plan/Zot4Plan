module.exports = (sequelize, DataType) => {
    const CoursesInGe = sequelize.define("courses_in_ge", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        course_id: {
            type: DataType.STRING(25),
            allowNull: false,
        },  
        ge_id: {
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
