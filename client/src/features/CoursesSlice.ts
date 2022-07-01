import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchProgramById, fetchProgramByFile, fetchAllGE, fetchGE} from '../api/FetchData'

export const SECTION_ID_QUARTER_LEN = 3; // for function AddCourseToQuarter

const DEPT_COLORS = [
    ['#AFD3E9', '#70ADD7', '#3688BF'], // Columbia Blue
    ['#C2E9EA', '#76CFD0', '#38A3A5'], // Powder Blue
    ['#E4F1ED', '#C9E3DB', '#78BAA6'], // Mint Cream
    ['#B7D2E1', '#8CB7CF', '#6FA6C3'], // Columnbia Blue
    ['#C8DFE4', '#ADCFD7' ,'#5094A5'], // Columnbia Blue
]

const initialState: CoursesSliceType = {
    years: {
        byIds: {}, 
        allIds: [],
    },
    sections: {},
    totalUnits: 0,
    courses: {
        byIds: {},
        allIds: [],
    },
    depts: {
        byIds:{},
        size: 0
    }
}

export const coursesSlice = createSlice ({
    name: "store",
    initialState,

/*********************** Reducers ************************/

    reducers: {
        /**
         * Add course to AddedCourses
         * @param course 
         */
        addCourse: (state, action: PayloadAction<CourseType>) => {
            let course = action.payload

            if(state.courses.byIds[course.id] === undefined) {
                state.courses.byIds[course.id] = {
                    data: course, 
                    remains: course.repeatability
                };
                state.courses.allIds.push(course.id);

                if(state.depts.byIds[course.department] === undefined) { 
                    state.depts.byIds[course.department] = {
                        id: course.department, 
                        colors: DEPT_COLORS[state.depts.size % DEPT_COLORS.length] 
                    }
                    state.depts.size += 1;
                }
            }
        },

        /**
         * Can remove only additional years
         * @param state 
         * @param action: yearId and the position of year in the list 
         */
        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            state.years.byIds[action.payload.id].quarterIds.forEach((id) => {
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

        refreshState: (state) => {
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarterIds.forEach((quarterId)=>{
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
        builder.addCase(fetchGE.fulfilled,(state, action) => {    
            // assign new courses information
            action.payload.forEach((course) => {
                if(state.courses.byIds[course.id] === undefined) {
                    state.courses.byIds[course.id] = {
                        data: course,
                        remains: course.repeatability,
                    }
                    state.courses.allIds.push(course.id);
                }

                // Assign color for department
                if(state.depts.byIds[course.department] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = {id: course.department, colors: DEPT_COLORS[index] }
                    state.depts.size += 1;
                }
            })   
        });

        /*************** FetchProgramById ****************/
        builder.addCase(fetchProgramById.fulfilled, (state, action) => {  
            // assign new courses information
            action.payload.courseData.forEach((course) => {
                if(state.courses.byIds[course.id] === undefined) {
                    state.courses.byIds[course.id] = {
                        data: course,
                        remains: course.repeatability,
                    }
                    state.courses.allIds.push(course.id);
                }
                
                if(state.depts.byIds[course.department] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = {id: course.department, colors: DEPT_COLORS[index] }
                    state.depts.size += 1;
                }
            })
            
        });


    },
});

export const {addCourse} =  coursesSlice.actions;
export default coursesSlice.reducer;