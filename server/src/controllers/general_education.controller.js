const db = require("../models");
const GeneralEducation = db.general_education;

exports.getAllGE = (_req, res) => {
    GeneralEducation.findAll().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}
