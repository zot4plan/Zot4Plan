const db = require("../models");
const Courses_in_ges = db.courses_in_ges;

exports.getCourses = (req, res) => {
    Courses_in_ges.findAll({ 
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