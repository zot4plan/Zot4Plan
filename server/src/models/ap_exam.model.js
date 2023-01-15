module.exports = (sequelize, DataType) => {
    const ApExams = sequelize.define("ap_exam", {
        ap_exam_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        name: {
            type: DataType.TEXT,
            allowNull: false,
        },  
        score: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        unit: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        course: {
            type: DataType.ARRAY(DataType.TEXT),
            allowNull: true,
        },
        ge: {
            type: DataType.ARRAY(DataType.TEXT),
            allowNull: true,
        }
    },{
        timestamps: false,
        underscored: true,
        tableName: 'ap_exam'
    });
 
    return ApExams;
  };
