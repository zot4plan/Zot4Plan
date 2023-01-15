const db = require("../models");
const Programs = db.programs;

exports.getAllPrograms = (_req, res) => {
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
exports.getProgramById = (req, res) => {
    Programs
    .findByPk(req.body.id)
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
