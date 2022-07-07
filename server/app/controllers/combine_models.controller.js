const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;
const Programs = db.programs;
const Schedules = db.schedules;

/**
 * Return major requirement template, majorName, majorURL from majors table
 *        and information of courses in major_requirement from courses table
 * @param id: number  // majorId
 */
exports.getRequirementById = (req, res) => {
    const id = req.body.id;
    Programs.findByPk(id, {attributes: ['id','name','is_major','requirement','url']}).then(data => {
        if(data) {
            // Put all courses in major_requirement template into an array
            const majorData = data.dataValues.requirement;
            let setOfCourses = new Set();
    
            majorData.forEach((section)=> {
                section.child.forEach((c) => {
                    c.child.forEach((course) => {
                        if(typeof(course) === 'string')
                            setOfCourses.add(course);
                        else {
                            course.forEach(id =>{
                                setOfCourses.add(id);
                            })
                        }
                    })
                })
            })

            let courseIds = Array.from(setOfCourses);
        
            Courses.findAll({ where: {id: courseIds} })
            .then(coursesData => {
                res.send({coursesData: coursesData,
                    major: data, 
                    allCourseIds: courseIds
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurred while retrieving Courses."
                })
            })
        }
        else {
            res.send({ message: `Cannot find major with id=${id}.`});
        }
    })
    .catch(() => {
        res.status(500).send({message: "Error retrieving major with id=" + id});
    });
}

 exports.getSchedule = (req, res) => {
    const id = req.body.id;

    Schedules.findByPk(id, {attributes: ['schedule']})
    .then(data => {
        // Check whether major name is valid
        if(data) {
            const years = data.dataValues.schedule.years;
            const addedCourses = data.dataValues.schedule.addedCourses;
            
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
                    selectedPrograms: data.dataValues.schedule.selectedPrograms,
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