module.exports = (sequelize, DataType) => {
    const Programs = sequelize.define("programs", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING(50),
            allowNull:false,
        },
        isMajor: {
            type: DataType.BOOLEAN,
            allowNull:false,
        },
        requirement: {
            type: DataType.JSON,
            allowNull:false,
        },
        url: {
            type: DataType.STRING(200),
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Programs;
  };
