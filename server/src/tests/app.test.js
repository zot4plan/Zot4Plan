//jest.useFakeTimers();
//jest.mock('../models');

const supertest = require("supertest");
const app = require('../app.js');
const request = supertest(app);

describe('Get Endpoints', () => {
    
    test('should response status 500', done => {
        request.get('/api/filterCourses?id=')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(response => {
            expect(response.body.message).toBe("Error retrieving courses with pattern = ");
            done();
        })
    });

    test('should response status 404', done => {
        request.get('/api/getCourse?')
        .then(response => {
            expect(response.statusCode).toBe(404);
            done();
        })
    });

    test('should response status 200', done => {
        request.get('/api/health')
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    });

    test('should response 39 courses startWith I&C', done => {
        request.get('/api/filterCourses?id=I%26C')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.length).toBe(39);
            done();
        })
    });

    test('should response 152 courses startWith COMP', done => {
        request
        .get('/api/filterCourses?id=COMP')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.length).toBe(152);
            done();
        })
    });

    test('should response 166 programs', done => {
        request.get('/api/getAllPrograms')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.length).toBe(166);
            done();
        })
    });

    test('should response 10 General Education', done => {
        request.get('/api/getAllGE')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.length).toBe(10);
            done();
        })
    });

    test('should response MATH 1A information', done => {
        request.get('/api/getCourse?id=MATH+1A')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body)
            .toStrictEqual({
                "concurrent_with": "", 
                "corequisite": "", 
                "department": "MATH", 
                "description": "Basic equations and inequalities, linear and quadratic functions, and systems of simultaneous equations.", 
                "ge": "", 
                "id": "MATH 1A", 
                "name": "Pre-Calculus I", 
                "overlaps_with": "", 
                "pre_or_core": "", 
                "prerequisite": "", 
                "prerequisite_for": "MATH 1B, POL SCI 130A", 
                "prerequisite_tree": "", 
                "repeatability": 1, "restriction": "", 
                "same_as": "", 
                "terms": "Fall: 2019, 2020, 2021, 2022.Summer1: 2019, 2020, 2021, 2022.Summer10wk: 2019, 2020, 2021, 2022.", 
                "units": 4, 
                "units_text": "4 Workload Units"
            });
            done();
        })
    });
}); 

describe('Post Endpoints', () => {
    test('should response status 500', done => {
        request.post('/api/getProgram')
        .then(response => {
            expect(response.statusCode).toBe(500);
        })

        request.post('/api/getCoursesInGE')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(response => {
            expect(response.body.message).toBe("WHERE parameter \"ge_id\" has invalid \"undefined\" value");
        })

        request.post('/api/getSchedule')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(response => {
            expect(response.body.message).toBe("Error retrieving schedule");
        })

        request.post('/api/saveSchedule')
        .then(response => {
            expect(response.statusCode).toBe(500);
            done();
        })
    });

    test('Post /program should response status 200', done => {
        request.post('/api/getProgram')
        .send({ id: "2" })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.program[0].name).toBe("Aerospace Engineering, B.S.");
            expect(response.body.departments).toStrictEqual(["PHYSICS","ENGRMAE","MATH","EECS","ENGR","CHEM","ECON"]);
            done();
        })
    });

    test('Post /getCoursesInGE should response status 200', done => {
        request.post('/api/getCoursesInGE')
        .send({ id: "IA" })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body)
            .toStrictEqual({
                "courses_in_depts": 
                    {
                        "HUMAN": ["HUMAN 1AS", "HUMAN 1BES", "HUMAN 1BS", "HUMAN 1CS", "HUMAN H1AS", "HUMAN H1BS", "HUMAN H1CS"], 
                        "WRITING": ["WRITING 30", "WRITING 31", "WRITING 45", "WRITING 50", "WRITING 60"]
                    }, 
                "departments": ["HUMAN", "WRITING"]
            });
            done();
        })
    });

    const courses = ["I&C SCI 31", "I&C SCI 6B", "MATH 2A", 
                    "I&C SCI 32", "I&C SCI 6D", "MATH 2B",
                    "I&C SCI 33", "STATS 67", "MATH 3A",
                    "I&C SCI 45C", "I&C SCI 51", "IN4MATX 43", 
                    "I&C SCI 46", "I&C SCI 53"];

    const schedule_name = "test_schedule";
    const schedule = {
        addedCourses: [],
        selectedPrograms: [[], [{"is_major": true, "label": "Computer Science, B.S.", "value": 44}]],
        years: [
            [
                ["I&C SCI 31", "I&C SCI 6B", "MATH 2A"], 
                ["I&C SCI 32", "I&C SCI 6D", "MATH 2B"], 
                ["I&C SCI 33", "STATS 67", "MATH 3A"], 
                []
            ], 
            [
                ["I&C SCI 45C", "I&C SCI 51", "IN4MATX 43"], 
                ["I&C SCI 46"], 
                ["I&C SCI 53"], 
                []
            ], 
            [[], [], [], []], 
            [[], [], [], []]
        ]
    };

    test('Post /saveSchedule should response status 200', done => {
        request.post('/api/saveSchedule')
        .send({ 
            id: schedule_name,
            schedule: schedule
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.message).toBe("success");
            done();
        })
    });

    test('Post /getSchedule should response status 200', done => {
        request.post('/api/getSchedule')
        .send({ id: "test_schedule" })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.courses.length).toBe(courses.length);
            expect(response.body.selectedPrograms).toStrictEqual(schedule.selectedPrograms);
            expect(response.body.years).toStrictEqual(schedule.years);
            done();
        })
    });
});
