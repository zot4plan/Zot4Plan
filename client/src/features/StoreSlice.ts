import {createSlice, PayloadAction, nanoid, isAnyOf } from "@reduxjs/toolkit";
import { fetchProgramById, fetchGE, fetchSchedule} from '../api/FetchData'
import Quarter from "../components/accordion/Quarter";
import { addCourse } from "./ProgramsSlice";

export const ID_LENGTH = 3; // for function AddCourseToQuarter
const DEPT_COLORS = [
    ['#B1B1D3', '#8989BD', '#7C7CB6'], // Dark Blue Gray
    ['#91A9B6', '#6C8C9D', '#628293'], // State Gray
    ['#B6CDC8', '#79A49B', '#639288'], // WIntergreen Dream
    ['#E4F1ED', '#C9E3DB', '#78BAA6'], // Mint Cream
    ['#B1B1D3', '#8989BD', '#7C7CB6'], // Dark Blue Gray
    ['#AEC3D5', '#86A5C1', '#6B91B3'], // Cerelean Frost
    ['#C8DFE4', '#ADCFD7' ,'#5094A5'], // Columnbia Blue
    ['#C0CABA', '#8B9D80', '#778A6A'], // Russian Green
]

const generateInitialState = () => {
    let years:{[id:string]: string[]} = {};
    let sections:{[id:string]: (string|string[])[]} = {};
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
        courses: {
            byIds: {},
            allIds: [] as string[],
        },
        depts: {
            byIds:{},
            size: 0
        }
    }
}

const initialState: StoreSliceType = generateInitialState();

export const storeSlice = createSlice ({
    name: "store",
    initialState,

/*********************** Reducers ************************/
    reducers: {
        removeCourseQuarter: (state, action: PayloadAction<CoursePayload>) => {
            state.sections[action.payload.sectionId].splice(action.payload.index,1);
            state.courses.byIds[action.payload.courseId].remains += 1; 
            state.totalUnits -= state.courses.byIds[action.payload.courseId].data.units; 
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceId = action.payload.sourceId,
                destinationId = action.payload.destinationId,
                courseId = action.payload.courseId;

            //prevent same course from being added to a quarter
            if(!state.sections[destinationId].includes(courseId) || sourceId === destinationId) {
                if(sourceId.length === 3) // remove course
                    state.sections[sourceId].splice(action.payload.sourceIndex, 1); 
                
                else { // source is from programs
                    state.courses.byIds[courseId].remains -= 1;
                    state.totalUnits += state.courses.byIds[courseId].data.units;
                } 

                state.sections[destinationId].splice(action.payload.destinationIndex, 0, courseId); // add course
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

        /**
         * @param state 
         * @param action: yearId and its position
         */
        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            state.years.byIds[action.payload.id].forEach((id) => {
                state.sections[id].forEach((courseId) => {
                    if(typeof(courseId) === 'string') {
                        state.courses.byIds[courseId].remains += 1;
                        state.totalUnits -= state.courses.byIds[courseId].data.units;
                    }
                })
                delete state.sections[id];
            })
           
            delete state.years.byIds[action.payload.id];
            state.years.allIds.splice(action.payload.index,1);
        },

        clearYears: (state) => {
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].forEach((quarterId) => {
                    state.sections[quarterId].forEach(courseId => {
                        if(typeof(courseId) === 'string') 
                            state.courses.byIds[courseId].remains += 1;
                    })
                    state.sections[quarterId] = [];
                })
            })
            state.totalUnits = 0;
        }, 
    },

/********************* ExtraReducers *********************/
    extraReducers: (builder) => {
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {  
            action.payload.courses.forEach((course) => {
                if(state.courses.byIds[course.id] === undefined) {
                    state.courses.byIds[course.id] = {
                        data: course,
                        remains: course.repeatability,
                    }
                    state.courses.allIds.push(course.id);
                }
                
                if(state.depts.byIds[course.department] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = DEPT_COLORS[index]
                    state.depts.size += 1;
                }
            })

            let numOfYears = action.payload.years.length;
            
            // Clear Year
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].forEach((quarterId) => {
                    state.sections[quarterId].forEach(courseId => {
                        if(typeof(courseId) === 'string') 
                            state.courses.byIds[courseId].remains += 1;
                    })
                    state.sections[quarterId] = [];
                })
            })
            state.totalUnits = 0;

            // Add Year
            for(let i = 4; i < numOfYears; i++) {
                let yearId = nanoid(ID_LENGTH);
                let quarterIds = []
        
                for(let j = 0; j < 4; j++) {
                   quarterIds.push(nanoid(ID_LENGTH));
                   state.sections[quarterIds[j]] = [] as string[];
                }
                state.years.allIds.push(yearId);
                state.years.byIds[yearId] = quarterIds;
            }

            // RemoveYear
            for(let i = state.years.allIds.length - 1; i >= numOfYears; i--) {
                let yearId = state.years.allIds[i];
                state.years.byIds[yearId].forEach((id) => {
                    delete state.sections[id];
                })
                delete state.years.byIds[yearId];
                state.years.allIds.pop();
            }

            // Add Courses
            action.payload.years.forEach((year, i) => {
                let yearId = state.years.allIds[i];
                year.forEach((quarter, j) => {
                    let quarterId = state.years.byIds[yearId][j];
                    quarter.forEach(course => {
                        state.sections[quarterId].push(course);
                        state.courses.byIds[course].remains -= 1;
                        state.totalUnits += state.courses.byIds[course].data.units;
                    })
                })
            })
        });

        builder.addMatcher(isAnyOf(fetchProgramById.fulfilled, fetchGE.fulfilled, addCourse), (state, action)=> {
            action.payload.courses.forEach((course) => {
                if(state.courses.byIds[course.id] === undefined) {
                    state.courses.byIds[course.id] = {
                        data: course,
                        remains: course.repeatability,
                    }
                    state.courses.allIds.push(course.id);
                }
                
                if(state.depts.byIds[course.department] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = DEPT_COLORS[index]
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
    clearYears } =  storeSlice.actions;
export default storeSlice.reducer;