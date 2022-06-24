const db = require("../models");
const CoursesInGe = db.courses_in_ge;

exports.getCourses = (req, res) => {
    CourseInGe.findAll({ 
        attributes: ['courseId'],
        where: {
            geId: req.body.id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving courseId."
        })
    })
}