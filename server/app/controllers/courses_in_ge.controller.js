const db = require("../models");
const CoursesInGE = db.courses_in_ge;
const Courses = db.courses;

exports.getGE = (req, res) => {
    //const id = req.body.id;
    let id = 'false';
    if(req.body.id !== undefined)
        id = req.body.id;

    Courses.findAll({
        include: [{
            model: CoursesInGE, as: 'coursesInGE',
            where: { ge_id: id},
            attributes: {exclude: ['id','course_id','ge_id']},
            required: true
        }] 
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}
