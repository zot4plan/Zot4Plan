import {createSlice, PayloadAction, nanoid, isAnyOf, current } from "@reduxjs/toolkit";
import { fetchProgram, fetchGE, fetchSchedule, fetchCourse} from '../../api/FetchData'
import { addCourse } from "./ProgramsSlice";

const ID_LENGTH = 3; // for function AddCourseToQuarter
const DEPT_COLORS = [
    ['#AFD3E9', '#70ADD7', '#3688BF'], // Columbia Blue
    ['#B1B1D3', '#8989BD', '#7C7CB6'], // Dark Blue Gray
    ['#91A9B6', '#6C8C9D', '#628293'], // State Gray
    ['#E4F1ED', '#C9E3DB', '#78BAA6'], // Mint Cream
    ['#AEC3D5', '#86A5C1', '#6B91B3'], // Cerelean Frost
    ['#C8DFE4', '#ADCFD7' ,'#5094A5'], // Columnbia Blue 
    ['#B6CDC8', '#79A49B', '#639288'], // Wintergreen Dream
]

function removeLastWord(str:string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return lastIndexOfSpace === -1? str : str.substring(0, lastIndexOfSpace);
}

const generateInitialState = () => {
    let years:{[id:string]: string[]} = {};
    let sections:{[id:string]: string[]} = {};
    let yearIds = [];
    
    for(let i = 0; i < 4; i++) {
        yearIds.push(nanoid(ID_LENGTH));
        let quarterIds = []

        for(let j = 0; j < 4; j++) {
           quarterIds.push(nanoid(ID_LENGTH));
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
        sections: sections,
        courses: {},
        depts: {
            byIds:{},
            size: 0
        },
        takenGeCourses: {},
        status: "idle",
    }
}

const initialState: StoreSliceType = generateInitialState();

export const storeSlice = createSlice ({
    name: "store",
    initialState,

/*********************** Reducers ************************/
    reducers: {
        removeCourseQuarter: (state, action: PayloadAction<CoursePayload>) => {
            let id = action.payload.courseId;
            state.sections[action.payload.sectionId].splice(action.payload.index,1);

            if(state.courses[id] !== undefined) {
                state.courses[id].remains += 1; 
                state.totalUnits -= state.courses[id].data.units[1];
                state.courses[id].data["courses_in_ge.ge_list"].forEach(geId =>
                    {
                        let geCourses = current(state.takenGeCourses[geId]);
                        state.takenGeCourses[geId] = geCourses.filter(course_id => course_id !== id);  
                    });
                
                if(state.courses[id].remains === state.courses[id].data.repeatability)
                    delete state.courses[id];
            }
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceId = action.payload.sourceId,
                destinationId = action.payload.destinationId,
                courseId = action.payload.courseId;

            //prevent same course from being added to a quarter
            if(!state.sections[destinationId].includes(courseId) || sourceId === destinationId) {
                if(sourceId.length === 3) {
                    state.sections[sourceId].splice(action.payload.sourceIndex, 1); 
                }
                
                state.sections[destinationId].splice(action.payload.destinationIndex, 0, courseId); 
            }
        },

        addYear: (state) => {
            if(state.years.allIds.length < 9) {
                let newYearId = nanoid(ID_LENGTH);
                let newQuarterIds = [nanoid(ID_LENGTH), nanoid(ID_LENGTH),
                                     nanoid(ID_LENGTH), nanoid(ID_LENGTH)];
                
                for(let i = 0; i < 4; i++)
                    state.sections[newQuarterIds[i]] = [] as string[]
                
                state.years.allIds.push(newYearId);
                state.years.byIds[newYearId] = newQuarterIds
            };
        },

        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            state.years.byIds[action.payload.id].forEach((id) => {
                state.sections[id].forEach((courseId) => {
                    state.courses[courseId].remains += 1;
                    state.totalUnits -= state.courses[courseId].data.units[1];

                    if(state.courses[courseId].remains === state.courses[courseId].data.repeatability)
                        delete state.courses[courseId];  
                })
                delete state.sections[id];
            })
           
            delete state.years.byIds[action.payload.id];
            state.years.allIds.splice(action.payload.index,1);
        },

        clearSchedule: (state) => {
            state.years.allIds.forEach((yearId)=> {
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
    },

/********************* ExtraReducers *********************/
    extraReducers: (builder) => {
        builder.addCase(fetchSchedule.fulfilled, (state, action) => { 
            state.status = action.payload.status;
            state.courses = {}; 
            state.totalUnits = 0;

            if(action.payload.status === "succeeded") {

                // Add courses info 
                action.payload.courses.forEach((course) => {                 
                    state.courses[course.course_id] = {
                        data: course,
                        remains: course.repeatability,
                    }
                    
                    if(state.depts.byIds[course.department] === undefined) { 
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
                if(current_len < new_len) {
                    for(let i = state.years.allIds.length; i < new_len; i++) {
                        let yearId = nanoid(ID_LENGTH);
                        let quarterIds = []
                
                        for(let j = 0; j < 4; j++) {
                            quarterIds.push(nanoid(ID_LENGTH));
                            state.sections[quarterIds[j]] = [] as string[];
                        }
                        state.years.allIds.push(yearId);
                        state.years.byIds[yearId] = quarterIds;
                    }
                }
                // Remove Year
                else {
                    for(let i = current_len - 1; i >= new_len; i--) {
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
            }
        });

        builder.addCase(fetchCourse.fulfilled, (state, action) => {
            let course = action.payload.course;

            if(action.payload.status === "succeeded"){
                if(state.courses[course.course_id] === undefined) {
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
            }
        });

        builder.addCase(addCourse, (state, action) => {
            let dept = removeLastWord(action.payload);
            if(state.depts.byIds[dept] === undefined) { 
                let index = state.depts.size % DEPT_COLORS.length;
                state.depts.byIds[dept] = DEPT_COLORS[index]
                state.depts.size += 1;
            }
        });

        builder.addMatcher(isAnyOf(fetchProgram.fulfilled, fetchGE.fulfilled ), (state, action) => {
            action.payload.departments.forEach((dept) => {
                if(state.depts.byIds[dept] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[dept] = DEPT_COLORS[index]
                    state.depts.size += 1;
                }
            })
        })
    },
});

export const { 
    removeCourseQuarter, 
    moveCourse, 
    addYear, 
    removeYear, 
    clearSchedule,
    resetStatus } =  storeSlice.actions;
export default storeSlice.reducer;