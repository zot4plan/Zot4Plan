const db = require("../models");
const Majors = db.majors;

// Return all majorID and majorName
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
