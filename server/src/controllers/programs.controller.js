const db = require("../models");
const Programs = db.programs;
const Visits = db.visits;

exports.getAllPrograms = (_req, res) => {
    Visits.increment({total: 1}, { where: { id: "12345" } })
    Programs
    .findAll({ attributes: [['program_id','value'],['name','label'],'is_major']})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

// return 2 Result Sets - 0: program info, 1: all courses in programs
exports.getProgram = (req, res) => {
    const id = req.body.id;
    Programs.findByPk(id)
    .then(data => {
        if(data)
            res.send(data);
        else
            res.status(500).send({message: "Not found program"});
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}
