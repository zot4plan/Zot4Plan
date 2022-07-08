const db = require("../models");
const Schedules = db.schedules;

// Return all majorID, majorName, and isMajor
exports.insertSchedule = (req, res) => {
    const schedule = req.body.schedule;
    const id = req.body.id;
    const date = new Date();

    Schedules.upsert({id: id, schedule: schedule, saved_date: date}).then(() => {
        res.status(200).send({message: "success"})
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}

