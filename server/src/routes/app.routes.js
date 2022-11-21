module.exports = app => {
    const courses = require("../controllers/courses.controller.js");
    const programs = require("../controllers/programs.controller.js");
    const general_education = require("../controllers/general_education.controller.js");
    const courses_in_ge= require("../controllers/courses_in_ge.controller.js");
    const schedules = require("../controllers/schedules.controller.js");
    const playlists = require("../controllers/playlists.controller.js");
    const visits = require("../controllers/visits.controller");
    const reports = require("../controllers/reports.controller");
    var router = require("express").Router();

    // GET method
    router.get("/filterCourses", courses.searchCourses);
    router.get("/getCourse", courses.getCourseById);
    router.get("/getAllPrograms", programs.getAllPrograms);
    router.get("/getAllGE",general_education.getAllGE);
    router.get("/getAllPlaylists",playlists.getPlaylists);

    // POST method
    router.post("/getProgram", programs.getProgram);
    router.post("/getCoursesInGE", courses_in_ge.getCoursesInGE);
    router.post("/addPlaylist", playlists.addPlaylist);
    router.post("/addReport", reports.addReport);

    // PUT method
    router.put("/saveSchedule/:id", schedules.upsertSchedule);
    router.put("/loadSchedule/:id", schedules.updateAndGetSchedule);
    router.put("/updateHomeVisit", visits.updateHomeVisit);
    router.put("/updateVirtualCafeVisit", visits.updateVirtualCafeVisit);
    router.put("/updateView/:id", playlists.updateView);
    
    // Health check
    router.get('/health', async (_req, res) => res.status(200).send('OK'));

    app.use('/api', router);
};