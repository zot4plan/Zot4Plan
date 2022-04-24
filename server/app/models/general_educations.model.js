module.exports = (sequelize, Sequelize) => {
    const GeneralEducations = sequelize.define("general_educations", {
        id: {
            type: Sequelize.STRING(5),
            primaryKey: true,
        },  
        name: {
            type: Sequelize.STRING(55),
            allowNull:false,
        },
        note: {
            type: Sequelize.STRING(100),
            allowNull:false,
        },
    },{
        timestamps: false
    });
  
    return GeneralEducations;
  };
