const { sequelize, courses } = require("../models");

// return 12 Result sets,0: all ge, 1: all courses in ge, 2-11:
exports.getAllGE = (_req, res) => {
    sequelize.query('CALL get_all_ge()', {type: sequelize.QueryTypes.SELECT})
    .then( data => {
        const ge = Object.values(data[0]).map((item, index) => {
            return {
                id: item.id,
                name: item.name,
                nameChild: item.note,
                courses: Object.values(data[2+index]).map(course => course.course_id)
            }
        });
    
        return res.send({ge: ge, courses: Object.values(data[1])}) 
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courseId."
        })
    })
}

// return 2 Result sets, 0: program info, 1: all courses in programs
exports.getProgram = (req, res) => {
    const id = req.body.id;
    sequelize.query('CALL get_program(:id)', {replacements: {id: id}, type: sequelize.QueryTypes.SELECT})
    .then( data => res.send({program: Object.values(data[0]), courses: Object.values(data[1])}))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving courseId."
        })
    })
}




