const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;
const CoursesInGE = db.courses_in_ge;

exports.getAllCoursesById = (req, res) => {
    let id = req.query.id.toUpperCase();

    if( id !== undefined && id.length >= 2){
        Courses.findAll({ 
            attributes: ['course_id'],
            where: {
                [Sequelize.Op.or]: {
                    course_id: {
                        [Sequelize.Op.like]: id.toUpperCase() + "%"
                    },
                    alt_course_id: {
                        [Sequelize.Op.like]: id.toUpperCase() + "%"
                    }
                }
            },
            order: [["course_id", "ASC"]],
            limit: 100,
        })
        .then(data => { res.send(data); })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving courses with pattern = " + req.query.id
            })
        })
    }
    else {
        res.status(500).send({
            message: req.query.id + ' is too short'
        })  
    }
};

// Find Course with course id
exports.getCourseById = (req, res) => {
    const id = req.query.id !== undefined? req.query.id.toUpperCase() : null;
    Courses.findOne({
        include: [{
            model: CoursesInGE,
            as: 'courses_in_ge',
            attributes: [[Sequelize.fn('array_agg', Sequelize.col('courses_in_ge.ge_id')), 'ge_list']],
            required: false
        }],
        where: {
            course_id: id
        },
        raw: true,
        group: ['courses.course_id']
    })
    .then(data => {
        if(data)
            res.send(data);
        else
            res.status(404).send({message: "Not found course with id = " + id});
    })
    .catch(() => {
        res.status(500).send({
            message: "Error retrieving course with id = " + id
        });
    });
};