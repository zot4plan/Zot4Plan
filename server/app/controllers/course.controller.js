const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}` }} : null;
    Courses.findAll({ where: condition }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        })
    })
  
};

// Find a single Course with an id
exports.findOne = (req, res) => {
    const id = req.query.id;
    Courses.findByPk(id).then(data => {
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send({ 
                message: `Cannot find course with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
        });
    });
};

// Find all courses from requirements 
exports.getAllCourses = (req, res) => {
    const coursesArray = req.query.courseArray;
    var condition = coursesArray ? {id: {[Op.in]: `%${courseArray}` }} : null;
    Courses.findAll({ where: condition }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        })
    })
}
