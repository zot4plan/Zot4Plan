//jest.useFakeTimers();
//jest.mock('../models');

const supertest = require("supertest");
const app = require('../app.js');
const request = supertest(app);

describe('Get Endpoints', () => {
    describe('GET api/health', () => {
        test('should response status 200', done => {
            request.get('/api/health')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET api/filterCourses', () => {
        test('?id should response 500', done => {
            request.get('/api/filterCourses?id')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body.message).toBe("Error retrieving courses with pattern = ");
                done();
            });
        });

        test('?id=I%26C should return 39 courses contain I&C', done => {
            request.get('/api/filterCourses?id=I%26C')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.length).toBe(39);
                done();
            });
        }); 
    
        test('?id=COM should return 188 courses contain COM but limit to 100', done => {
            request
            .get('/api/filterCourses?id=COM')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.length).toBe(100);
                done();
            });
        }); 

        test('?id=COM+LIT should return 36 courses contain COM LIT', done => {
            request
            .get('/api/filterCourses?id=COM+LIT')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.length).toBe(36);
                done();
            });
        }); 
    });

    describe('GET api/getCourse', () => {
        test('/getCourse? should response status 500', done => {
            request.get('/api/getCourse?')
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            });
        });

        test('/getCourse?id=MATH+1A should return MATH 1A information', done => {
            const MATH_1A = {
                "concurrent_with": null, 
                "corequisite": null, 
                "department": "MATH", 
                "courses_in_ge.ge_list": [null,],
                "description": "Basic equations and inequalities, linear and quadratic functions, and systems of simultaneous equations.", 
                "ge": null, 
                "course_id": "MATH 1A", 
                "name": "Pre-Calculus I", 
                "overlaps_with": null, 
                "pre_or_core": null, 
                "prerequisite": null, 
                "prerequisite_for": ["MATH 1B", "POL SCI 130A"], 
                "prerequisite_tree": null, 
                "repeatability": 1, 
                "restriction": null, 
                "same_as": null, 
                "terms": "Fall: 2019, 2020, 2021, 2022.Summer1: 2019, 2020, 2021, 2022.Summer10wk: 2019, 2020, 2021, 2022.", 
                "units": [4, 4], 
                "units_text": "4 Workload Units"
            };
            request.get('/api/getCourse?id=MATH+1A')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toStrictEqual(MATH_1A);
                done();
            });
        });
    });

    describe('GET api/getAllPrograms', () => {
        test('/getAllPrograms should return 166 programs', done => {
            request.get('/api/getAllPrograms')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.length).toBe(166);
                done();
            })
        });
    });

    describe('GET api/getAllPrograms', () => {
        test('/getAllGE should return 10 General Education', done => {
            request.get('/api/getAllGE')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.length).toBe(10);
                done();
            });
        });
    });
}); 

describe('Post Endpoints', () => {
    describe('Post api/getPrograms', () => {
        test('/getPrograms response status 500', done => {
            request.post('/api/getProgram')
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            });
        });

        test('Post /getProgram with id = 2 should return Aerospace Engineering, B.S.', done => {
            request.post('/api/getProgram')
            .send({ id: "2" })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.name).toBe("Aerospace Engineering, B.S.");
                expect(response.body.departments.length).toBe(7);
                done();
            })
        });
    });

    describe('Post api/getCoursesInGE', () => {
        test('/getCoursesInGE with undefined id should response status 500', done => {
            request.post('/api/getCoursesInGE')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body.message).toBe("WHERE parameter \"ge_id\" has invalid \"undefined\" value");
                done();
            })
        });
    
        test('/getCoursesInGE with id = IA should repsonse status 200', done => {
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
    });
});

describe('Put Endpoints', () => { 
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
    const courses = ["I&C SCI 31", "I&C SCI 6B", "MATH 2A", 
                     "I&C SCI 32", "I&C SCI 6D", "MATH 2B",
                     "I&C SCI 33", "STATS 67", "MATH 3A",
                     "I&C SCI 45C", "I&C SCI 51", "IN4MATX 43", 
                     "I&C SCI 46", "I&C SCI 53"];
    
    describe('Put /saveSchedule', () => {  
        /*test('Put /saveSchedule/ should response status 500', done => {
            request.put('/api/saveSchedule/')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body.message).toBe("Error retrieving schedule");
            });
        });*/

        test('Put /saveSchedule/' + schedule_name + ' should response status 200', done => {
            request.put('/api/saveSchedule/' + schedule_name)
            .send({ schedule: schedule })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toBe("success");
                done();
            });
        });
    });

    describe('Put /loadSchedule', () => { 
        test('Put /loadSchedule/' + schedule_name + ' should response status 200', done => {
            request.put('/api/loadSchedule/' + schedule_name)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.courses.length).toBe(courses.length);
                expect(response.body.selectedPrograms).toStrictEqual(schedule.selectedPrograms);
                expect(response.body.years).toStrictEqual(schedule.years);
                done();
            });
        });
    });

     /*  request.put('/api/getSchedule')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(response => {
            expect(response.body.message).toBe("Error retrieving schedule");
        })

        request.put('/api/saveSchedule')
        .then(response => {
            expect(response.statusCode).toBe(500);
            done();
        }) */
})
