module.exports = (sequelize, DataType) => {
    const Courses = sequelize.define("courses", {
        course_id: {
            type: DataType.STRING(25),
            allowNull:false,
            primaryKey: true
        },  
        name: {
            type: DataType.TEXT,
            allowNull: true,
        },
        department: {
            type: DataType.TEXT,
            allowNull: true,
        },
        units: {
            type: DataType.ARRAY(DataType.DECIMAL),
            allowNull: true,
        },
        units_text: {
            type: DataType.TEXT,
            allowNull: true,
        },
        description: {
            type: DataType.TEXT,
            allowNull: true,
        },
        prerequisite: {
            type: DataType.TEXT,
            allowNull: true,
        },
        prerequisite_tree: {
            type: DataType.JSON,
            allowNull: true,
        },
        prerequisite_for: {
            type: DataType.ARRAY(DataType.TEXT),
            allowNull: true,
        },
        corequisite: {
            type: DataType.TEXT,
            allowNull: true,
        },
        corequisite_tree: {
            type: DataType.JSON,
            allowNull: true,
        },
        prerequisite_or_corequisite: {
            type: DataType.TEXT,
            allowNull: true,
        },
        prerequisite_or_corequisite_tree: {
            type: DataType.JSON,
            allowNull: true,
        },
        restriction: {
            type: DataType.TEXT,
            allowNull: true,
        },
        same_as: {
            type: DataType.TEXT,
            allowNull: true,
        },
        overlaps_with: {
            type: DataType.TEXT,
            allowNull: true,
        },
        concurrent_with: {
            type: DataType.TEXT,
            allowNull: true,
        },
        repeatability: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        ge: {
            type: DataType.TEXT,
            allowNull: true,
        },
        terms: {
            type: DataType.TEXT,
            allowNull: true,
        },
        alt_course_id: {
            type: DataType.STRING(25),
            allowNull:false,
            unique: true
        }
    }, {
        timestamps: false
    });
  
    return Courses;
};
