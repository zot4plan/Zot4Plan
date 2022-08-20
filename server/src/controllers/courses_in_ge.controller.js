const db = require("../models");
const CoursesInGE = db.courses_in_ge;

function removeLastWord(str) {
    const lastIndexOfSpace = str.lastIndexOf(' ');  
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

exports.getCoursesInGE = (req, res) => {
    const id = req.body.id;
    CoursesInGE.findAll({attributes: [['course_id', 'id']], where: {ge_id: id}})
    .then(data => {
        let courses_in_depts = {};
        let depts = [];
        
        data.forEach( row => {
            let course = row.dataValues.id;
            let dept = removeLastWord(course);

            if(courses_in_depts[dept] === undefined) {
                courses_in_depts[dept] = [];
                depts.push(dept);
            }
            courses_in_depts[dept].push(course);
        })

        res.send({departments: depts, courses_in_depts: courses_in_depts});
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}
