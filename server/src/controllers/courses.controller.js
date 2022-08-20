const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;

// Search Courses that match search query
exports.findAll = (req, res) => {
    let pattern = "";
    let condition = "";

    // Use LIKE if id contains special character, else use FULLTEXT SEARCH
    if(req.query.id.indexOf("\&") > -1) 
    { 
        pattern = req.query.id + "%";
        condition = "id LIKE :pattern";
    }
    else 
    { 
        req.query.id.split(" ").forEach((text, index) => { 
            if (text.trim().length > 0) 
            {
                pattern += (index > 0 ? " +" : "+") + text;
            }
        });
        pattern += "*";
        condition = 'MATCH(id) AGAINST (:pattern IN BOOLEAN MODE)';
    }

    Courses.findAll({ 
        attributes: ['id'],
        where: Sequelize.literal(condition),
        replacements: 
        {
            pattern: pattern,
        }
    })
    .then(data => { res.send(data); })
    .catch(() => {
        res.status(500).send({
            message: "Error retrieving courses with pattern = " + req.query.id
        })
    })
  
};

// Find Course with course id
exports.findOne = (req, res) => {
    const id = req.query.id;
    Courses.findByPk(id)
    .then(data => {
        if(data)
            res.send(data);
        else
            res.status(404).send({message: "Not found course with id = " + id})
    })
    .catch(() => {
        res.status(500).send({
            message: "Error retrieving course with id = " + id
        });
    });
};