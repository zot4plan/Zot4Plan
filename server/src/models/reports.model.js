module.exports = (sequelize, DataType) => {
    const Reports = sequelize.define("reports", {
        report_id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        playlist_id: {
            type: DataType.STRING(64),
            allowNull: false,
        },  
        reason: {
            type: DataType.STRING(256),
            allowNull:false,
        },
        created_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },{
        timestamps: false,
        underscored: true,
        tableName: 'reports'
    });
 
    return Reports;
  };
