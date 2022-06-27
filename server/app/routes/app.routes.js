module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const programs = require("../controllers/programs.controller.js")
    const combine_models = require("../controllers/combine_models.controller.js")
    const stored_procedures = require("../controllers/stored_procedures.controller.js")

    var router = require("express").Router();

    // GET method
    router.get("/filterCourses", courses.findAll);

    router.get("/getAllPrograms", programs.getAllPrograms);

    router.get("/getAllGE",stored_procedures.getAllGE);

    // POST method
    router.post("/getRequirementById", combine_models.getRequirementById);

    router.post("/getDataByFile", combine_models.getDataByFile);

    router.post("/getCourseById", courses.findOne);
    
    // Health check
    router.get('/health', async (_req, res) => {
        res.send('OK');
    });

    app.use('/api',router);
};