module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    var router = require("express").Router();

    router.get("/filterCourses", courses.findAll);
    router.get("/addCourse", courses.findOne);
    router.get("/courses", courses.getAllCourses);

    app.use('/api',router);
};