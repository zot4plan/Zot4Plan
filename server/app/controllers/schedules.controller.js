const db = require("../models");
const { sequelize } = require("../models");
const Schedules = db.schedules;
const Courses = db.courses;

// Return all majorID, majorName, and isMajor
exports.insertSchedule = (req, res) => {
    const schedule = req.body.schedule;
    const id = req.body.id;
    const date = new Date();

    Schedules.upsert({id: id, schedule: schedule, last_access_date: date}).then(() => {
        res.status(200).send({message: "success"})
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving majors."
        })
    })
}

exports.getSchedule = (req, res) => {
    const id = req.body.id;
    sequelize.query('CALL get_schedule_by_id(:id)', {replacements: {id: id}, type: sequelize.QueryTypes.SELECT})
    .then(data => {
        if(data) {
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
            .catch(() => {
                res.status(500).send({message: 'Error retrieving data!'})
            })
        } 
        else
            res.send({message: 'Invalid major!'}); 
    })
    .catch(() => {
        res.status(500).send({message: "Error retrieving data!"});
    });
}