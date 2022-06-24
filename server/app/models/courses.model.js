module.exports = (sequelize, DataType) => {
    const Courses = sequelize.define("courses", {
        id: {
            type: DataType.STRING(25),
            allowNull:false,
            primaryKey: true
        },  
        name: {
            type: DataType.STRING(200),
            allowNull:false,
        },
        department: {
            type: DataType.STRING(20),
            allowNull: false,
        },
        units: {
            type: DataType.INTEGER,
            allowNull:false,
        },
        corequisite: {
            type: DataType.STRING(1000),
            allowNull:false,
        },
        description: {
            type: DataType.STRING(1000),
            allowNull:false,
        },
        prerequisite: {
            type: DataType.STRING(1000),
            allowNull:false,
        },
        prerequisite_tree: {
            type: DataType.STRING(300),
            allowNull:false,
        },
        prerequisite_for: {
            type: DataType.STRING(750),
            allowNull:false,
        },
        restriction: {
            type: DataType.STRING(1000),
            allowNull:false,
        },
        repeatability: {
            type: DataType.INTEGER,
            allowNull:false,
        },
        ge: {
            type: DataType.STRING(25),
            allowNull:false,
        },
        terms: {
            type: DataType.STRING(350),
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Courses;
  };
