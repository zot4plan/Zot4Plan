import { createSlice, PayloadAction, nanoid, isAnyOf, current } from "@reduxjs/toolkit";
import { getProgram, getGE, getSchedule, getCourse, updateHomeVisit } from '../../controllers/HomeController'
import { addCourse } from "./ProgramsSlice";
import { DEPT_COLORS, ID_LENGTH } from "../../constants/Constants";
import { getDeptFromCourse } from "../../helpers/helpers";

const generateInitialState = () => {
    let years: { [id: string]: string[] } = {};
    let sections: { [id: string]: string[] } = {};
    let yearIds = [];

    for (let i = 0; i < 4; i++) {
        yearIds.push(nanoid(ID_LENGTH.YEAR));
        let quarterIds = []

        for (let j = 0; j < 4; j++) {
            quarterIds.push(nanoid(ID_LENGTH.QUARTER));
            sections[quarterIds[j]] = [] as string[];
        }

        years[yearIds[i]] = quarterIds;
    }

    return {
        years: {
            byIds: years,
            allIds: yearIds as string[],
        },
        totalUnits: 0,
        apExamUnits: 0,
        sections: sections,
        courses: {},
        depts: {
            byIds: {},
            size: 0
        },
        takenGeCourses: {},
        status: 'idle',
        isPrerequisiteCheck: true,
        apExam: [],
        pageLoading: 'idle'
    }
}
const initialState = generateInitialState() as CourseSliceType;

export const courseSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        removeCourseQuarter: (state, action: PayloadAction<CoursePayload>) => {
            let id = action.payload.courseId;
            state.sections[action.payload.sectionId].splice(action.payload.index, 1);

            if (state.courses[id] !== undefined) {
                state.courses[id].remains += 1;
                state.totalUnits -= state.courses[id].data.units[1];
                state.courses[id].data["courses_in_ge.ge_list"].forEach(geId => {
                    let geCourses = current(state.takenGeCourses[geId]);
                    state.takenGeCourses[geId] = geCourses.filter(course_id => course_id !== id);
                });

                if (state.courses[id].remains === state.courses[id].data.repeatability)
                    delete state.courses[id];
            }
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload>) => {
            let sourceId = action.payload.sourceId,
                destinationId = action.payload.destinationId,
                courseId = action.payload.courseId;

            //prevent same course from being added to a quarter
            if (!state.sections[destinationId].includes(courseId) || sourceId === destinationId) {
                if (sourceId.length === ID_LENGTH.QUARTER) {
                    state.sections[sourceId].splice(action.payload.sourceIndex, 1);
                }

                state.sections[destinationId].splice(action.payload.destinationIndex, 0, courseId);
            }
        },

        addApExam: (state, action: PayloadAction<ApExamType>) => {
            let dept = getDeptFromCourse(action.payload.courses[0]);
            if (state.depts.byIds[dept] === undefined) {
                let index = state.depts.size % DEPT_COLORS.length;
                state.depts.byIds[dept] = DEPT_COLORS[index]
                state.depts.size += 1;
            }
            state.apExam.push(action.payload);
        },

        removeApExam: (state, action: PayloadAction<number>) => {
            state.apExam.splice(action.payload, 1)
        },

        editApExamUnits: (state, action: PayloadAction<number>) => {
            state.totalUnits += (action.payload - state.apExamUnits)
            state.apExamUnits = action.payload
        },

        addYear: (state) => {
            if (state.years.allIds.length < 9) {
                let newYearId = nanoid(ID_LENGTH.YEAR);
                let newQuarterIds = [nanoid(ID_LENGTH.QUARTER), nanoid(ID_LENGTH.QUARTER),
                nanoid(ID_LENGTH.QUARTER), nanoid(ID_LENGTH.QUARTER)];

                for (let i = 0; i < 4; i++)
                    state.sections[newQuarterIds[i]] = [] as string[]

                state.years.allIds.push(newYearId);
                state.years.byIds[newYearId] = newQuarterIds
            };
        },

        removeYear: (state, action: PayloadAction<RemoveYearPayload>) => {
            state.years.byIds[action.payload.id].forEach((id) => {
                state.sections[id].forEach((courseId) => {
                    state.courses[courseId].remains += 1;
                    state.totalUnits -= state.courses[courseId].data.units[1];

                    if (state.courses[courseId].remains === state.courses[courseId].data.repeatability)
                        delete state.courses[courseId];
                })
                delete state.sections[id];
            })

            delete state.years.byIds[action.payload.id];
            state.years.allIds.splice(action.payload.index, 1);
        },

        clearSchedule: (state) => {
            state.years.allIds.forEach((yearId) => {
                state.years.byIds[yearId].forEach((quarterId) => {
                    state.sections[quarterId] = [];
                })
            })
            state.courses = {};
            state.totalUnits = 0;
            state.takenGeCourses = {};
        },

        resetStatus: (state) => {
            state.status = "idle";
        },

        setIsPrerequisiteCheck: (state) => {
            state.isPrerequisiteCheck = !state.isPrerequisiteCheck
        }
    },
    extraReducers: (builder) => {
        /**
         * HTTP GET
         * get Schedule
         */
        builder.addCase(getSchedule.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.courses = {};
            state.takenGeCourses = {};
            state.totalUnits = action.payload.apExamUnits;
            state.apExamUnits = action.payload.apExamUnits;
            state.apExam = action.payload.apExam;
            action.payload.apExam.forEach((apExam) => {
                let dept = getDeptFromCourse(apExam.courses[0]);
                if (state.depts.byIds[dept] === undefined) {
                let index = state.depts.size % DEPT_COLORS.length;
                state.depts.byIds[dept] = DEPT_COLORS[index]
                state.depts.size += 1;
            }
            })

            // Add courses info 
            action.payload.courses.forEach((course) => {
                state.courses[course.course_id] = {
                    data: course,
                    remains: course.repeatability,
                }

                if (state.depts.byIds[course.department] === undefined) {
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = DEPT_COLORS[index]
                    state.depts.size += 1;
                }

                course["courses_in_ge.ge_list"].forEach((ge: string) => {
                    if (!state.takenGeCourses.hasOwnProperty(ge)) {
                        state.takenGeCourses[ge] = [] as string[];
                    }
                    state.takenGeCourses[ge].push(course.course_id)
                });
            })

            let new_len = action.payload.years.length;
            let current_len = state.years.allIds.length;

            // Add Year
            if (current_len < new_len) {
                for (let i = state.years.allIds.length; i < new_len; i++) {
                    let yearId = nanoid(ID_LENGTH.YEAR);
                    let quarterIds = []

                    for (let j = 0; j < 4; j++) {
                        quarterIds.push(nanoid(ID_LENGTH.QUARTER));
                        state.sections[quarterIds[j]] = [] as string[];
                    }
                    state.years.allIds.push(yearId);
                    state.years.byIds[yearId] = quarterIds;
                }
            }

            // Remove Year
            else {
                for (let i = current_len - 1; i >= new_len; i--) {
                    let yearId = state.years.allIds[i];
                    state.years.byIds[yearId].forEach((id) => {
                        delete state.sections[id];
                    })
                    delete state.years.byIds[yearId];
                    state.years.allIds.pop();
                }
            }

            // Add Courses to Years
            action.payload.years.forEach((year, i) => {
                let yearId = state.years.allIds[i];
                year.forEach((quarter, j) => {
                    quarter.forEach(course => {
                        state.courses[course].remains -= 1;
                        state.totalUnits += state.courses[course].data.units[1];
                    })

                    let quarterId = state.years.byIds[yearId][j];
                    state.sections[quarterId] = quarter;
                })
            })
        });

        /**
         * HTTP GET
         * getCourse
         */
        builder.addCase(getCourse.fulfilled, (state, action) => {
            let course = action.payload.course;

            if (state.courses[course.course_id] === undefined) {
                state.courses[course.course_id] = {
                    data: course,
                    remains: course.repeatability,
                }
            }

            course["courses_in_ge.ge_list"].forEach((ge: string) => {
                if (!state.takenGeCourses.hasOwnProperty(ge)) {
                    state.takenGeCourses[ge] = [] as string[];
                }
                state.takenGeCourses[ge].push(course.course_id)
            });

            state.courses[course.course_id].remains -= 1;
            state.totalUnits += course.units[1];
        });

        /**
         * HTTP GET
         * addCourse
         */
        builder.addCase(addCourse, (state, action) => {
            let dept = getDeptFromCourse(action.payload);
            if (state.depts.byIds[dept] === undefined) {
                let index = state.depts.size % DEPT_COLORS.length;
                state.depts.byIds[dept] = DEPT_COLORS[index]
                state.depts.size += 1;
            }
        });

        /**
         * HTPP PUT
         * updateHomeVisit
         */
        builder.addCase(updateHomeVisit.fulfilled, (state, _) => {
            state.pageLoading = 'succeeded';
        })

        builder.addCase(updateHomeVisit.rejected, (state, _) => {
            state.pageLoading = 'failed';
        })

        /**
         * HTTP GET
         * getProgram & getGE
         */
        builder.addMatcher(isAnyOf(getProgram.fulfilled, getGE.fulfilled), (state, action) => {
            action.payload.departments.forEach((dept) => {
                if (state.depts.byIds[dept] === undefined) {
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[dept] = DEPT_COLORS[index]
                    state.depts.size += 1;
                }
            })
        })

        /**
         * Rejected
         */
        builder.addMatcher(isAnyOf(getProgram.rejected, getGE.rejected, getCourse.rejected, getSchedule.rejected), (state, _) => {
            state.status = "failed";
        })
    },
});

export const {
    removeCourseQuarter,
    moveCourse,
    addYear,
    removeYear,
    clearSchedule,
    addApExam,
    removeApExam,
    editApExamUnits,
    resetStatus,
    setIsPrerequisiteCheck
} = courseSlice.actions;

export default courseSlice.reducer;