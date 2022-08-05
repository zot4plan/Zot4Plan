module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const programs = require("../controllers/programs.controller.js");
    const general_education = require("../controllers/general_education.controller.js");
    const courses_in_ge= require("../controllers/courses_in_ge.controller.js");
    const schedules = require("../controllers/schedules.controller.js");
    var router = require("express").Router();

    // GET method
    router.get("/filterCourses", courses.findAll);

    router.get("/getAllPrograms", programs.getAllPrograms);

    router.get("/getAllGE",general_education.getAllGE);

    router.get("/getCourse", courses.findOne);

    // POST method

    router.post("/getProgram", programs.getProgram)

    router.post("/getCoursesInGE", courses_in_ge.getCoursesInGE);

    router.post("/saveSchedule", schedules.insertSchedule);

    router.post("/getSchedule", schedules.getSchedule);
    
    // Health check
    router.get('/health', async (_req, res) => {
        res.send('OK');
    });

    app.use('/api',router);
};