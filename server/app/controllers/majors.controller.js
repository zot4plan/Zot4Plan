const db = require("../models");
const Majors = db.majors;
const Visits = db.visits;

// Return all majorID and majorName
exports.getMajors = (_req, res) => {
    Visits.increment({total: 1}, { where: { id: "12345" } })

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
