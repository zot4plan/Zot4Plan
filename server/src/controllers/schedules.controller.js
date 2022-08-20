const db = require("../models");
const { sequelize } = require("../models");
const Schedules = db.schedules;
const Courses = db.courses;

exports.insertSchedule = (req, res) => {  
    Schedules.upsert({id: req.body.id, schedule: req.body.schedule, last_access_date: new Date()})
    .then(() => {
        res.status(200).send({message: "success"})
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.getSchedule = (req, res) => {
    sequelize.query(
        'CALL get_schedule_by_id(:id)', 
        {replacements: {id: req.body.id}, type: sequelize.QueryTypes.SELECT}
    )
    .then(data => {
        const schedule = data[0]['0'].schedule;
        const years = schedule.years;
        const addedCourses = schedule.addedCourses;
        let courses = new Set();

        years.forEach(year => {
            year.forEach(quarter => {
                quarter.forEach(course => {
                    courses.add(course);
                })
            })
        })

        addedCourses.forEach(course => courses.add(course));

        Courses.findAll({ where: {id: Array.from(courses)} })
        .then(coursesData => {
            res.send({
                years: years,
                selectedPrograms: schedule.selectedPrograms,
                addedCourses: addedCourses,
                courses: coursesData, 
            });  
        })
    })
    .catch(() => {
        res.status(500).send({message: "Error retrieving schedule"});
    });
}