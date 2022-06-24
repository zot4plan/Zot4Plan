module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const programs = require("../controllers/programs.controller.js");
    const general_education = require("../controllers/general_education.controller.js");
    const courses_in_ge = require("../controllers/courses_in_ge.controller.js")
    const combine_models = require("../controllers/combine_models.controller.js")

    var router = require("express").Router();

    // GET method
    router.get("/filterCourses", courses.findAll);

    router.get("/getAllPrograms", programs.getAllPrograms);

    router.get("/getAllGes",general_education.getAllGes);

    // POST method
    router.post("/getRequirementById", combine_models.getRequirementById);

    router.post("/getDataByFile", combine_models.getDataByFile);

    router.post("/getCourseById", courses.findOne);

    router.post("/getCoursesByGE", courses_in_ge.getCourses);
    
    // Health check
    router.get('/health', async (_req, res) => {
        res.send('OK');
    });

    app.use('/api',router);
};