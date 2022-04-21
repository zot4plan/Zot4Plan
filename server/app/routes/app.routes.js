module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const majors = require("../controllers/majors.controller.js");
    const generalEducations = require("../controllers/generalEducations.controller.js");
    const courses_in_ges = require("../controllers/courses_in_ges.controller.js")
    const combine_models = require("../controllers/combine_models.controller.js")

    var router = require("express").Router();

    router.get("/filterCourses", courses.findAll);
    router.get("/getCourseById", courses.findOne);

    router.get("/getMajors", majors.getMajors);

    router.get("/getGeneralEducation",generalEducations.getGeneralEducationCategories);

    router.get("/getCoursesByGE", courses_in_ges.getCourses);

    router.get("/getRequirementById", combine_models.getRequirementById);
    router.get("/getDataByFile", combine_models.getDataByFile);

    app.use('/api',router);
};