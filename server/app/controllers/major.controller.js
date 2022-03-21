const { Sequelize } = require("../models");
const db = require("../models");
const Majors = db.majors;

exports.getMajors = (req, res) => {
    Majors.findAll({ attributes: ['id','name']}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}

exports.getRequirement = (req, res) => {
    const id = req.query.id;
    Majors.findByPk(id, {attributes: ['major_requirement']}).then(data => {
        if(data) {
            res.send(data);
        }
        else {
            res.send({ 
                message: `Cannot find course with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving major with id=" + id
        });
    });
}