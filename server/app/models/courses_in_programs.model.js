module.exports = (sequelize, DataType) => {
    const CoursesInPrograms = sequelize.define("courses_in_programs", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        courseId: {
            type: DataType.STRING(25),
            allowNull: false,
        },  
        programId: {
            type: DataType.INTEGER,
            allowNull:false,
        },
    },{
        timestamps: false,
        underscored: true,
        tableName: 'course_in_programs'
    });
 
    return CoursesInPrograms;
  };
