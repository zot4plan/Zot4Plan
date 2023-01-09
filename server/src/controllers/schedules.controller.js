const db = require("../models");
const { Sequelize } = require("../models");
const Schedules = db.schedules;
const Courses = db.courses;
const CoursesInGE = db.courses_in_ge;

exports.upsertSchedule = (req, res) => {  
    Schedules
    .upsert({
        schedule_id: req.params.id, 
        schedule: req.body.schedule, 
        active_date: new Date(),
        created_date: new Date (),
    }, {
        fields: ['schedule', 'active_date'],
        returning: false,
    })
    .then(() => {
        res.status(200).send({message: "success"})
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.updateAndGetSchedule = (req, res) => {
    Schedules
    .update(
        { active_date: new Date() },
        { 
            where: {
                schedule_id : req.params.id 
            },
            returning: true,
        }
    )
    .then(data => {
        getAllCourses(data[1][0].dataValues.schedule, res);
    })
    .catch(() => {
        res.status(500).send({message: "Error retrieving schedule"});
    });
}

const getAllCourses = (schedule, res) => {
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

    Courses.findAll({
        include: [{
            model: CoursesInGE,
            as: 'courses_in_ge',
            attributes: [[Sequelize.fn('array_agg', Sequelize.col('courses_in_ge.ge_id')), 'ge_list']],
            required: false
        }],
        where: {
            course_id: Array.from(courses)
        },
        raw: true,
        group: ['courses.course_id']
    })
    .then(data => {
        res.send({
            years: years,
            selectedPrograms: schedule.selectedPrograms,
            addedCourses: addedCourses,
            courses: data, 
            apExam: schedule.apExam,
            apExamUnits: schedule.apExamUnits,
        });  
    })
    .catch(() => {
        res.status(500).send({
            message: "Error retrieving courses"
        });
    });
};