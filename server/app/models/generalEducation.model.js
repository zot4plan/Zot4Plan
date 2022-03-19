module.exports = (sequelize, Sequelize) => {
    const GeneralEducation = sequelize.define("generalEducations", {
        id: {
            type: Sequelize.STRING(10),
            primaryKey: true,
        },  
        name: {
            type: Sequelize.STRING(55),
            allowNull:false,
        },
    },{
        timestamps: false
    });
  
    return GeneralEducation;
  };
