const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;
const CoursesInGE = db.courses_in_ge;

exports.searchCourses = (req, res) => {
    let id = req.query.id;

    // Use LIKE if id contains special character, else use FULLTEXT SEARCH
    if( id !== undefined && id.length >= 3){
        let pattern = "";
        let condition = "";

        if(id.indexOf("\&") > -1) { 
            pattern = id + "%";
            condition = "course_id LIKE :pattern";
        }
        else { 
            id.split(" ").forEach((token, index) => { 
                if (token.trim().length > 0) {
                    pattern += (index > 0 ? " & " : "+") + token;
                }
            });
            pattern += ":*"
            condition = "textsearchable_index_col @@ to_tsquery(:pattern)";
        }

        Courses.findAll({ 
            attributes: ['course_id'],
            where: Sequelize.literal(condition),
            replacements: 
            {
                pattern: pattern,
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
    else
        res.status(500).send({
            message: "Error retrieving courses with pattern = " + req.query.id
        })  
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