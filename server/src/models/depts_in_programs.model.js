module.exports = (sequelize, DataType) => {
    const DeptsInPrograms = sequelize.define("depts_in_programs", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        dept_id: {
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
        tableName: 'depts_in_programs'
    });
 
    return DeptsInPrograms;
  };
