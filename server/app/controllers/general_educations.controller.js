const db = require("../models");
const GeneralEducations = db.general_educations;

exports.getGeneralEducationCategories = (req, res) => {
    GeneralEducations.findAll().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}
