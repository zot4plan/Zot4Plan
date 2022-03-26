module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    const majors = require("../controllers/major.controller.js");
    const generalEducation = require("../controllers/generalEducation.controller.js");
    const courses_in_ges = require("../controllers/courses_in_ges.controller.js")

    var router = require("express").Router();

    router.get("/filterCourses", courses.findAll);
    router.get("/getCourseById", courses.findOne);
    router.get("/getCourses", courses.getCourses);

    router.get("/getMajors", majors.getMajors);
    router.get("/getRequirement", majors.getRequirement)

    router.get("/getGeneralEducation",generalEducation.getGeneralEducationCategories)

    router.get("/getGECourses", courses_in_ges.getCourses)

    app.use('/api',router);
};