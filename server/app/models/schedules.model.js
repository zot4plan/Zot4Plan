module.exports = (sequelize, DataType) => {
    const Schedules = sequelize.define("schedules", {
        id: {
            type: DataType.STRING(32),
            allowNull:false,
            primaryKey: true
        },
        schedule: {
            type: DataType.JSON,
            allowNull:false,
        },
        saved_date: {
            type: DataType.DATEONLY,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Schedules;
  };
