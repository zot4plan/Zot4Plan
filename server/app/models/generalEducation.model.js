module.exports = (sequelize, Sequelize) => {
    const GeneralEducation = sequelize.define("generalEducations", {
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
  
    return GeneralEducation;
  };
