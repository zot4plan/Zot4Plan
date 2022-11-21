module.exports = (sequelize, DataType) => {
    const Visits = sequelize.define("visits", {
        date_visit: {
            type: DataType.DATEONLY,
            primaryKey: true,
        },  
        home: {
            type: DataType.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        virtual_cafe: {
            type: DataType.INTEGER,
            defaultValue: 0,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
  
    return Visits;
};