const { Sequelize } = require("../models");
const db = require("../models");
const Majors = db.majors;
const Op = db.Sequelize.Op;

exports.getMajors = (req, res) => {
    Majors.findAll({ attributes: ['id','name']}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        })
    })
}