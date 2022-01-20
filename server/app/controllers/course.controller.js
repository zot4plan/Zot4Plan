const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;
const Op = db.Sequelize.Op;

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    let id = "";
    let condition ="";

    //use LIKE if id contains special character
    if(req.query.id.indexOf("\&") > -1) {
        id = req.query.id + "%";
        condition = "id LIKE :id";
    }
    else {
        req.query.id.split(" ").forEach((text) => { 
            if (text.trim().length > 0)
                id += "+" + text +" ";
        });
        id+="*";
        condition = 'MATCH(id) AGAINST (:id IN BOOLEAN MODE)';
    }

    Courses.findAll({ 
        attributes: ['id'],
        where: Sequelize.literal(condition),
        replacements: {
            id: id
        }
        }).then(data => {
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
            res.send( {message: "success", data});
        }
        else {
            res.send({ 
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
