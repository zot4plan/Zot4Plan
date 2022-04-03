import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchMajor, fetchGECategories} from './FetchData'

interface YearType {
    id: string;
    name: string;
    quarters: string[];
}

interface QuarterType {
    id: string;
    courses: string[];
    yearId : string;
}

interface CourseType { 
    id: string;
    name: string;
    department: string;
    units: number;
    repeatability: number;
    corequisite:string;
    description: string;
    prerequisite: string;
    restriction: string;
    ge:string;
}

interface ChildType {
    id: string;
    name: string;
    courses: (string|string[])[];
}

interface FetchGEPayload { 
    id:string; 
    name:string; 
    note:string;
}

interface AddCourseGEPayload { 
    index: number; 
    course: CourseType; 
}

interface DeleteCoursePayload{
    droppableId: string;
    index: number;
    courseId: string;
}

interface CourseQuarterPayload {
    quarterId: string;
    courseId: string;
    index: number;
}

interface MoveCoursePayload {
    sourceId: string;
    destinationId: string;
    sourceIndex: number;
    destinationIndex: number;  
    courseId: string;
}

interface RemoveYearPayload {
    id: string;
    index: number;
}

interface StoreType{
    years: {
        byIds: {
            [yearId: string]: YearType;
        }; 
        allIds: string[]; 
        totalUnits: number;
    };
    quarters: {
        [quarterId: string]: QuarterType;
    };
    major:{
        byIds:{
            [propName:string]:{
                id: string,
                name: string,
                subList: ChildType[]
            }}; 
        allIds: string[];
        add: {id: string, courses: string[], status: string};
        name: string;
        url: string;
        status: string;
    }
    ge: {
        byIds: {
            [droppableId:string]: {
                droppableId: string, 
                geId: string, 
                name: string, 
                note: string, 
                courses: string[]
            }};
        droppableIds: string[];
        geIds: string[];
        status: string;
    };
    courses: {
        byIds: {
            [propName:string]: {
                data: CourseType, 
                repeatability: number,
                removable: boolean,
                quarterIds : string[],
            }},
        allIds: string[];
    };
    depts: {
        byIds: {
            [propName:string]: {
                id: string;
                colors: string[];
            }}, 
        size: number;
    }
}

const QUARTER_ID_LENGTH = 3;
const MAJOR_ID_LENGTH = 4;
const GE_ID_LENGTH = 5;
const ADD_ID_LENGTH = 6;
const YEAR_NAMES = ["Freshman","Sophomore","Junior","Senior"];
const DEPT_COLORS = [
    ['#AFD3E9', '#70ADD7', '#3688BF'],
    ['#C2E9EA', '#76CFD0', '#38A3A5'],
    ['#E4F1ED', '#C9E3DB', '#78BAA6'],
    ['#B7D2E1', '#8CB7CF', '#6FA6C3'],
    ['#C8DFE4', '#ADCFD7' ,'#5094A5']
]

const generateInitialState = () => {
    let quarters:{[propName:string]:QuarterType} = {};
    let years:{[propName:string]:YearType} = {}
    let yearAllIds = [nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH), 
                     nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH)];

    for(let i = 0; i < 4; i++){
        let quarterIds = [nanoid(QUARTER_ID_LENGTH),nanoid(QUARTER_ID_LENGTH),
                          nanoid(QUARTER_ID_LENGTH),nanoid(QUARTER_ID_LENGTH)];
        let yearId = yearAllIds[i];

        for(let j = 0; j< 4; j++) {
            let quarterId = quarterIds[j];
            quarters[quarterId] = {id: quarterId, courses: [], yearId: yearId};
        }

        years[yearId] = {id: yearId, name: YEAR_NAMES[i], quarters: quarterIds};
    }
    
    return {
        years: {
            byIds: years, 
            allIds: yearAllIds, 
            totalUnits: 0
        }, 
        quarters: quarters,
        major: {
            add: {id: nanoid(ADD_ID_LENGTH), courses: [], status: ""},
            byIds: {}, 
            allIds: [],
            name: "",
            url: "",
            status: "idle",
        },
        ge: {
            byIds: {},
            droppableIds: [],
            geIds: [],
            status:"idle",
        },
        courses: {
            byIds: {},
            allIds: [],
        },
        depts: {
            byIds:{},
            size: 0
        }
    }
}

const initialState:StoreType = generateInitialState();

export const storeSlice = createSlice ({
    name: "store",
    initialState,
    reducers: {
        /**
         * Add course to state.major.add 
         * Create an object for new course (course is guanrantee to be new)
         * Add color for new course department
         */
        addCourseMajor: (state, action: PayloadAction<CourseType>) => {
            let course = action.payload
            state.major.add.courses.push(course.id);

            state.courses.byIds[course.id] = {
                data: course, 
                repeatability: course.repeatability,
                removable: true,
                quarterIds: [],
            };
            state.courses.allIds.push(course.id);

            if(state.depts.byIds[course.department] === undefined) { 
                state.depts.byIds[course.department] = {
                    id: course.department, 
                    colors: DEPT_COLORS[state.depts.size % DEPT_COLORS.length] 
                }
                state.depts.size += 1;
            }
        },

        /**
         * Add course to GE category
         * Create new course Object (course can be already exist)
         * Add color to new course department 
         */
        addCourseGE: (state, action: PayloadAction<AddCourseGEPayload>) => {
            let droppableId = state.ge.droppableIds[action.payload.index],
                courseId = action.payload.course.id;
            
            if(!state.ge.byIds[droppableId].courses.includes(courseId)) {
                state.ge.byIds[droppableId].courses.push(courseId);

                if(state.courses.byIds[courseId] === undefined) 
                    state.courses.byIds[courseId] = {
                        data: action.payload.course, 
                        repeatability: action.payload.course.repeatability,
                        removable: true,
                        quarterIds: [], 
                    }

                if(state.depts.byIds[action.payload.course.department] === undefined) { 
                    state.depts.byIds[action.payload.course.department] = {
                            id: action.payload.course.department, 
                            colors: DEPT_COLORS[state.depts.size % DEPT_COLORS.length] 
                        }
                    state.depts.size += 1;
                }
            }
        },
        
        /**
         * Delete course from sourceId
         * Delete course in quarters and course data (if removable) or reset course state
         */
        deleteCourse: (state, action: PayloadAction<DeleteCoursePayload>) => {
            let courseId = action.payload.courseId,
                droppableId = action.payload.droppableId,
                numOfQuartersTaken = state.courses.byIds[courseId].quarterIds.length;

            // remove course from source
            if(droppableId.length === GE_ID_LENGTH)
                state.ge.byIds[droppableId].courses.splice(action.payload.index,1);
            else if(droppableId.length === ADD_ID_LENGTH)
                state.major.add.courses.splice(action.payload.index, 1); 

            // remove course from quarters
            state.courses.byIds[courseId].quarterIds.forEach(id => {
                state.quarters[id].courses = state.quarters[id].courses.filter(id => id !== courseId);
            })

            if(numOfQuartersTaken > 0)
                state.years.totalUnits -= (state.courses.byIds[courseId].data.units * numOfQuartersTaken);
            
            if(state.courses.byIds[courseId].removable) {
                state.courses.allIds = state.courses.allIds.filter(id => id !== courseId);
                delete state.courses.byIds[courseId];
            }
            else {
                state.courses.byIds[courseId].repeatability = state.courses.byIds[courseId].data.repeatability;
                state.courses.byIds[courseId].quarterIds = [];
            }
        },

        /**
         * Add course to quarter.courses by index
         * reduce the course repeatability
         * add quarterID to course.quarterIds
         */
        addCourseToQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {   
            let quarterId = action.payload.quarterId,
                courseId = action.payload.courseId;

            if(!state.quarters[quarterId].courses.includes(courseId)) {
                state.courses.byIds[courseId].repeatability -= 1;
                state.courses.byIds[courseId].quarterIds.push(quarterId);
                state.quarters[quarterId].courses.splice(action.payload.index, 0, courseId);
                state.years.totalUnits += state.courses.byIds[courseId].data.units;
            }
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceId = action.payload.sourceId,
                destinationId = action.payload.destinationId,
                courseId = action.payload.courseId;

            // check if desination quarter does not include course
            if(!state.quarters[destinationId].courses.includes(courseId)) {

                // remove sourceId and add destinationId to course.quarterIds
                if(sourceId !== destinationId) {
                    let quarterIds = state.courses.byIds[courseId].quarterIds.filter(id => id !== sourceId);
                    quarterIds.push(destinationId);
                    state.courses.byIds[courseId].quarterIds = quarterIds;
                }

                // remove course from sourceId and add course to destinationId
                state.quarters[sourceId].courses.splice(action.payload.sourceIndex, 1);
                state.quarters[destinationId].courses.splice(action.payload.destinationIndex, 0, courseId);
            }
        },

        /**
         * 
         * @param state 
         * @param action 
         */
        removeCourseFromQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {
            state.quarters[action.payload.quarterId].courses.splice(action.payload.index,1);
            state.courses.byIds[action.payload.courseId].repeatability += 1;
            state.years.totalUnits -= state.courses.byIds[action.payload.courseId].data.units;
        },

        addYear: (state) => {
            let newYearId = nanoid(4);
            let newQuarterIds = [ nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH),
                               nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH) ];
            
            for(let i = 0; i < 4; i++) {
                state.quarters[newQuarterIds[i]] = {
                    id: newQuarterIds[i],  
                    courses: [], 
                    yearId: newYearId
                };
            }

            state.years.allIds.push(newYearId);
            state.years.byIds[newYearId] = {
                id: newYearId, 
                name: "Senior plus", 
                quarters: newQuarterIds
            };
        },

        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            state.years.byIds[action.payload.id].quarters.forEach((id) => {
                state.quarters[id].courses.forEach((courseId) => {
                    state.courses.byIds[courseId].repeatability += 1;
                    state.years.totalUnits -= state.courses.byIds[courseId].data.units;
                })
                delete state.quarters[id];
            })
           
            delete state.years.byIds[action.payload.id];
            state.years.allIds.splice(action.payload.index,1);
        },

        refreshState: (state) => {
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarters.forEach((quarterId)=>{
                    state.quarters[quarterId].courses.forEach(courseId => {
                        state.courses.byIds[courseId].repeatability += 1;
                        state.courses.byIds[courseId].quarterIds = [];
                    })
                    state.quarters[quarterId].courses = [];
                })
            })
            state.years.totalUnits = 0;
        }

    },
    extraReducers: (builder) => {

        /**
         * 
         */
        builder.addCase(fetchGECategories.pending, (state) => {
            state.ge.status = "loading";
        });

        builder.addCase( fetchGECategories.fulfilled,(state,action:PayloadAction<FetchGEPayload[]>) => {    
            action.payload.forEach( (ge) => {
                const droppableId = nanoid(GE_ID_LENGTH);
                state.ge.droppableIds.push(droppableId);
                state.ge.geIds.push(ge.id);
                state.ge.byIds[droppableId] = {
                    droppableId: droppableId, 
                    geId: ge.id, 
                    name:ge.name, 
                    note: ge.note, 
                    courses:[]
                }
            });
            state.ge.status = "succeeded";
        });

        builder.addCase( fetchGECategories.rejected,(state) => {
            state.ge.status = "error";
        });

        /**
         * 
         */
        builder.addCase(fetchMajor.pending, (state) => {
            state.major.status = "loading";
            state.major.allIds = [];
            state.major.byIds = {};
            state.major.name = '';
            state.major.url = '';

            state.major.add.courses = [];
            state.major.add.status = 'idle';

            state.ge.droppableIds.forEach((id)=>{
                state.ge.byIds[id].courses = [];
            });
;
            state.courses.allIds = [];
            state.courses.byIds = {};

            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarters.forEach((quarterId)=>{
                    state.quarters[quarterId].courses = []
                })
            })

            state.depts.byIds = {};
            state.depts.size = 0; 
        });

        /**
         * 
         */
        builder.addCase(fetchMajor.fulfilled,(state, action) => {   
            action.payload.major_requirement.forEach ((section)=>{
                const sId = nanoid(MAJOR_ID_LENGTH);
                state.major.allIds.push(sId);
                state.major.byIds[sId] = {id: sId, name: section.name, subList: []};
            
                section.child.forEach((c) => {
                    const cId = nanoid(MAJOR_ID_LENGTH);
                    state.major.byIds[sId].subList.push({id: cId, name: c.name, courses: c.child})
                    
                })
            })

            state.courses.allIds = action.payload.courseIds;

            action.payload.courseData.forEach((course) => {
                state.courses.byIds[course.id] = {
                    data: course,
                    repeatability: course.repeatability,
                    removable: false,
                    quarterIds: []
                }

                if(state.depts.byIds[course.department] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = {id: course.department, colors: DEPT_COLORS[index] }
                    state.depts.size += 1;
                }
            })
            state.major.name = action.payload.name;
            state.major.url = action.payload.url;

            state.major.status = "succeeded";
        });

        builder.addCase(fetchMajor.rejected,(state) => {
            state.major.status = "error";
        });
    },
});

export const {  addCourseMajor, addCourseGE, deleteCourse, addCourseToQuarter, moveCourse, 
                removeCourseFromQuarter, addYear, removeYear, refreshState } =  storeSlice.actions;
export default  storeSlice.reducer;