module.exports = (sequelize, DataType) => {
    const CoursesInPrograms = sequelize.define("courses_in_programs", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        course_id: {
            type: DataType.STRING(25),
            allowNull: false,
        },  
        program_id: {
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
