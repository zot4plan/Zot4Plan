module.exports = (sequelize, DataType) => {
    const Programs = sequelize.define("programs", {
        program_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull:false,
        },
        is_major: {
            type: DataType.BOOLEAN,
            allowNull:false,
        },
        requirement: {
            type: DataType.JSON,
            allowNull:false,
        },
        departments: {
            type: DataType.ARRAY(DataType.STRING),
            allowNull:false,
        },
        url: {
            type: DataType.STRING,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Programs;
  };
