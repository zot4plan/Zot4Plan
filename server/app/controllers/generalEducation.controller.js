const { Sequelize } = require("../models");
const db = require("../models");
const GeneralEducation = db.generalEducation;

exports.getGeneralEducationCategories = (req, res) => {
    GeneralEducation.findAll({ attributes: ['id','name']}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}
