module.exports = (sequelize, DataType) => {
    const Visits = sequelize.define("visits", {
        id: {
            type: DataType.STRING(5),
            primaryKey: true,
        },  
        total: {
            type: DataType.INTEGER,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Visits;
};
