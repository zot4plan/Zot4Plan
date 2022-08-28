const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataType) => {
    const Courses = sequelize.define("courses", {
        course_id: {
            type: DataType.STRING(25),
            allowNull:false,
            primaryKey: true
        },  
        name: {
            type: DataType.STRING,
            allowNull:false,
        },
        department: {
            type: DataType.STRING,
            allowNull: false,
        },
        units: {
            type: DataType.INTEGER,
            allowNull:true,
        },
        units_text: {
            type: DataType.STRING,
            allowNull:true,
        },
        corequisite: {
            type: DataType.STRING,
            allowNull:true,
        },
        description: {
            type: DataType.STRING,
            allowNull:false,
        },
        prerequisite: {
            type: DataType.STRING,
            allowNull:true,
        },
        prerequisite_tree: {
            type: DataType.JSON,
            allowNull:true,
        },
        prerequisite_for: {
            type: DataType.STRING,
            allowNull:true,
        },
        restriction: {
            type: DataType.STRING,
            allowNull:true,
        },
        repeatability: {
            type: DataType.INTEGER,
            allowNull:false,
        },
        pre_or_core: {
            type: DataType.STRING,
            allowNull:true,
        },
        same_as: {
            type: DataType.STRING,
            allowNull:true,
        },
        overlaps_with: {
            type: DataType.STRING,
            allowNull:true,
        },
        concurrent_with: {
            type: DataType.STRING,
            allowNull:true,
        },
        ge: {
            type: DataType.STRING,
            allowNull:true,
        },
        terms: {
            type: DataType.STRING,
            allowNull:false,
        }
    }, {
        timestamps: false
    });
  
    return Courses;
  };
