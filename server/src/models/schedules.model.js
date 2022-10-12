module.exports = (sequelize, DataType) => {
    const Schedules = sequelize.define("schedules", {
        schedule_id: {
            type: DataType.STRING(64),
            allowNull:false,
            primaryKey: true
        },
        schedule: {
            type: DataType.JSON,
            allowNull:false,
        },
        active_date: {
            type: DataType.DATEONLY,
            allowNull:false,
        },
        created_date: {
            type: DataType.DATEONLY,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Schedules;
};
