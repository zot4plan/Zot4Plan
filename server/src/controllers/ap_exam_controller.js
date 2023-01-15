const { Sequelize } = require("../models");
const db = require("../models");
const AP_EXAM = db.ap_exam;

exports.getAllApExams = (_req, res) => {
    AP_EXAM
    .findAll({ attributes: [
        ['ap_exam_id','value'],
        ['name','label'],
        'score',
        ['unit', 'units'],
        ['course','courses'],
        ['ge', 'GE']
    ]})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}