module.exports = (sequelize, DataType) => {
    const Visits = sequelize.define("visits", {
        date_visit: {
            type: DataType.DATEONLY,
            primaryKey: true,
        },  
        number_of_visits: {
            type: DataType.INTEGER,
            defaultValue: 1,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Visits;
};