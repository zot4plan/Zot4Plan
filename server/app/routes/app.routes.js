module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const majors = require("../controllers/majors.controller.js");
    const general_educations = require("../controllers/general_educations.controller.js");
    const courses_in_ges = require("../controllers/courses_in_ges.controller.js")
    const combine_models = require("../controllers/combine_models.controller.js")

    var router = require("express").Router();

    // GET method
    router.get("/filterCourses", courses.findAll);

    router.get("/getMajors", majors.getMajors);

    router.get("/getGeneralEducation",general_educations.getGeneralEducationCategories);

    // POST method
    router.post("/getRequirementById", combine_models.getRequirementById);

    router.post("/getDataByFile", combine_models.getDataByFile);

    router.post("/getCourseById", courses.findOne);

    router.post("/getCoursesByGE", courses_in_ges.getCourses);
    
    // Health check
    router.get('/health', async (_req, res) => {
        res.send('OK');
    });

    app.use('/api',router);
};