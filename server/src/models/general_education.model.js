module.exports = (sequelize, DataType) => {
    const GeneralEducation = sequelize.define("general_education", {
        ge_id: {
            type: DataType.STRING(5),
            primaryKey: true,
        },  
        name: {
            type: DataType.STRING(55),
            allowNull:false,
        },
        note: {
            type: DataType.STRING,
            allowNull:false,
        },
    },{
        timestamps: false,
        underscored: true,
        tableName: 'general_education'
    });
  
    return GeneralEducation;
  };
