module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    const majors = require("../controllers/major.controller.js");
    var router = require("express").Router();

    router.get("/filterCourses", courses.findAll);
    router.get("/addCourse", courses.findOne);
    router.get("/courses", courses.getAllCourses);
    
    router.get("/getMajors", majors.getMajors);

    app.use('/api',router);
};