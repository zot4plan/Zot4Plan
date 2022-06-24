const db = require("../models");
const Programs = db.programs;
const Visits = db.visits;

// Return all majorID, majorName, and isMajor
exports.getAllPrograms = (_req, res) => {
    Visits.increment({total: 1}, { where: { id: "12345" } })

    Programs.findAll({ attributes: ['id','name','isMajor']}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}
