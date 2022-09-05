module.exports = (sequelize, DataType) => {
    const Programs = sequelize.define("programs", {
        program_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.TEXT,
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
            type: DataType.ARRAY(DataType.TEXT),
            allowNull:false,
        },
        url: {
            type: DataType.TEXT,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Programs;
  };
