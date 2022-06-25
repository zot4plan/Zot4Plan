const { Sequelize } = require("../models");
const db = require("../models");
const Courses = db.courses;
const Programs = db.programs;

/**
 * Return major requirement template, majorName, majorURL from majors table
 *        and information of courses in major_requirement from courses table
 * @param id: number  // majorId
 */
exports.getRequirementById = (req, res) => {
    const id = req.body.id;
    Programs.findByPk(id, {attributes: ['id','name','isMajor','requirement','url']}).then(data => {
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
                            setOfCourses.add(course[0]);
                            setOfCourses.add(course[1]);
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

/**
 * @param majorName: string               // name of the major
 * @param geCourses: string[][]           // list of list of courses taken by each ge category
 * @param coursesAddByStudent: string[] // list of courses added by student
 * @param years: string[][][]             // list of quarters, each quarter contains a list of courses taken in the quarter
 */
 exports.getDataByFile = (req, res) => {
    console.log(req.body);
    const fileContent = JSON.parse(req.body.data);
    const majorName = fileContent.data.majorName;
    const geCourses = fileContent.data.geCourses;
    const coursesAdded = fileContent.data.coursesAddByStudent;
    const years = fileContent.data.years;

    Majors.findAll({ 
        attributes: ['requirement','name','url'],  
        where: {name: {[Sequelize.Op.eq]:  majorName}}
    }).then(data => {
        // Check whether major name is valid
        if(data) {
            const majorData = data[0].requirement; 
            let setOfCourses = new Set();     
            // Put all courses in major_requirement template into an array
            majorData.forEach((section)=> {
                section.child.forEach((c) => {
                    c.child.forEach((course) => {
                        if(typeof(course) === 'string')
                            setOfCourses.add(course);

                        // Case: student can take course A or B
                        else { 
                            setOfCourses.add(course[0]);
                            setOfCourses.add(course[1]);
                        }
                    })
                })
            })
        
            // Check whether courses added by students are valid
            // Course is valid if it is NOT in major_requirement
            coursesAdded.forEach(course => {
                if(setOfCourses.has(course)) 
                    return res.send({message: 'Invalid courses added by student!'});
                
                setOfCourses.add(course);
            })

            // Add courses in GE into set of courses
            geCourses.forEach(ge => {
                ge.forEach(course => {
                    setOfCourses.add(course);
                })
            })

            // Check courses in years are in set of courses
            years.forEach( year => {
                year.forEach(quarter => {
                    quarter.forEach(course => {
                        if(!setOfCourses.has(course))
                            return res.send({message: 'Invalid courses!'})
                    })
                })
            })

            const arrayOfCourses = Array.from(setOfCourses);
            // Retrieve all data of courses in array
            Courses.findAll({ where: {id: arrayOfCourses} })
            .then(courseData => {
                // Check whether all courses are retrieved
                if(courseData.length === arrayOfCourses.length) {
                    res.send({
                        courseData: courseData, 
                        major: data, 
                        allCourseIds: arrayOfCourses
                    });
                }
                else
                    res.send({message: 'Invalid courses!'});
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