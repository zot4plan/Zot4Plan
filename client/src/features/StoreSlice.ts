import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchMajor, fetchGECategories} from './FetchData'

interface YearType {
    data: {
        id: string;
        name: string;
        quarters: string[];
    }
    units: number;
}

interface QuarterType {
    id: string;
    name: string;
    courses: string[];
    yearId : string;
}

interface CourseType { 
    id: string;
    name: string;
    department: string;
    units: number;
    repeatability: number;
    corequisites:string;
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
}

interface AddCoursePayload { 
    position: string; 
    course: CourseType; 
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
}

interface RemoveYearPayload {
    id: string;
    index: number;
}

interface StoreType{
    years: {byIds: {[propName: string]: YearType}, allIds: string[], totalUnits: number};
    quarters: {[propName: string]: QuarterType};
    major:{
        byIds:{[propName:string]:{id:string,name:string,subList:ChildType[]}}; 
        allIds: string[];
        name: string;
        url: string;
        status:string;
        error:string;
    }
    ge: {
        byIds: {[propName:string]: {id:string, geId:string, name:string, courses:string[]}};
        allIds: string[];
        status: string;
        error:string;
    };
    other: {id: string, courses: string[];}
    courses: {
        byIds: {
            [propName:string]: {
                data: CourseType, 
                repeatability: number
            }
        },
        allIds: string[];
    };
}

const QUARTER_ID_LENGTH = 3;
const MAJOR_ID_LENGTH = 4;
const GE_ID_LENGTH = 5;
const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
const YEAR_NAMES = ["Freshman","Sophomore","Junior","Senior"];

const generateInitialState = () => {
    let quarters:{[propName:string]:QuarterType} = {};
    let years:{[propName:string]:YearType} = {}
    let yearAllIds:string[] = [];

    for(let i = 0; i < 4; i++){
        let quarterIds:string[] = [];
        let yearId = nanoid(QUARTER_ID_LENGTH);

        QUARTER_NAMES.forEach((name) => {
            let quarterId = nanoid(QUARTER_ID_LENGTH);
            quarterIds.push(quarterId);
            quarters[quarterId] = {id: quarterId, name: name, courses: [], yearId: yearId};
        })

        years[yearId] = {data: {id: yearId, name: YEAR_NAMES[i], quarters: quarterIds}, units: 0};
        yearAllIds.push(yearId);
    }
    
    return {
        years: {
            byIds: years, 
            allIds: yearAllIds, 
            totalUnits: 0
        }, 
        quarters: quarters,
        major: {
            byIds: {}, 
            allIds: [],
            name: '',
            url: '',
            status: "idle",
            error:"",
        },
        ge: {
            byIds: {},
            allIds: [],
            status:"idle",
            error:"",
        },
        other: {id: nanoid(6), courses: []},
        courses: {
            byIds: {},
            allIds: [],
        }
    }
}

const initialState:StoreType = generateInitialState();

export const storeSlice = createSlice ({
    name: "store",
    initialState,
    reducers: {
        addCourse: (state, action: PayloadAction<AddCoursePayload>) => {
            if(action.payload.position === 'other')
                state.other.courses.push(action.payload.course.id);

            state.courses.byIds[action.payload.course.id] = {data: action.payload.course, repeatability: 1};
            state.courses.allIds.push(action.payload.course.id);
        },

        addCourseToQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {   
            let quarterId = action.payload.quarterId;
            let units = state.courses.byIds[action.payload.courseId].data.units;

            state.years.totalUnits += units;
            state.years.byIds[state.quarters[quarterId].yearId].units += units;

            state.quarters[quarterId].courses.splice(action.payload.index,0,action.payload.courseId);

            state.courses.byIds[action.payload.courseId].repeatability -= 1;
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceYear = state.quarters[action.payload.sourceId].yearId;
            let destinationYear = state.quarters[action.payload.destinationId].yearId;
            let [removedCourse] = state.quarters[action.payload.sourceId].courses.splice(action.payload.sourceIndex, 1);

            state.quarters[action.payload.destinationId].courses.splice(action.payload.destinationIndex,0,removedCourse);

            if(sourceYear !== destinationYear) {
                let units = state.courses.byIds[removedCourse].data.units;
                state.years.byIds[sourceYear].units -= units;
                state.years.byIds[destinationYear].units += units;
            }
        },

        removeCourseFromQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {
            state.quarters[action.payload.quarterId].courses.splice(action.payload.index,1);
            state.courses.byIds[action.payload.courseId].repeatability += 1;

            let yearId = state.quarters[action.payload.quarterId].yearId;
            let units = state.courses.byIds[action.payload.courseId].data.units;

            state.years.totalUnits -= units;
            state.years.byIds[yearId].units -= units;
        },

        addYear: (state) => {
            let quarterIds:string[] = [];
            let yearId = nanoid(4);
            state.years.allIds.push(yearId);

            QUARTER_NAMES.forEach((name) => {
                let quarterId = nanoid(QUARTER_ID_LENGTH);
                quarterIds.push(quarterId);

                state.quarters[quarterId] = {
                    id: quarterId, 
                    name: name, 
                    courses: [], 
                    yearId: yearId
                };
            });

            state.years.byIds[yearId] = {
                data:{  id: yearId, 
                        name: "Senior plus", 
                        quarters: quarterIds}, 
                units: 0
            };
        },

        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            let id = action.payload.id;
            state.years.byIds[id].data.quarters.forEach((id) => {
                state.quarters[id].courses.forEach((courseId) => {
                    state.courses.byIds[courseId].repeatability += 1;
                })
                delete state.quarters.id;
            })
            
            state.years.totalUnits -= state.years.byIds[id].units;
            delete state.years.byIds[id];
            state.years.allIds.splice(action.payload.index,1);
        },

        refreshState: (state) => {
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].data.quarters.forEach((quarterId)=>{
                    state.quarters[quarterId].courses.forEach(courseId => {
                        state.courses.byIds[courseId].repeatability += 1;
                    })
                    state.quarters[quarterId].courses = []
                })
                state.years.byIds[yearId].units = 0;
            })

            state.years.totalUnits = 0;
        }

    },
    extraReducers: (builder) => {

///////////////////////////////////////////////////////////////////////////////
/******************* fetch General Education Categories **********************/
///////////////////////////////////////////////////////////////////////////////

        builder.addCase(fetchGECategories.pending, (state) => {
            state.ge.status = "loading";
        });

        builder.addCase( fetchGECategories.fulfilled,(state,action:PayloadAction<FetchGEPayload[]>) => {    
            action.payload.forEach( (ge) => {
                const droppableId = nanoid(GE_ID_LENGTH);
                state.ge.allIds.push(droppableId);
                state.ge.byIds[droppableId] = {id: droppableId, geId: ge.id, name:ge.name, courses:[]}
            });
            state.ge.status = "succeeded";
        });

        builder.addCase( fetchGECategories.rejected,(state) => {
            state.ge.status = "error";
            state.ge.error = "";
        });

///////////////////////////////////////////////////////////////////////////////
/********************** fetch Major Requirement courses **********************/
///////////////////////////////////////////////////////////////////////////////

        builder.addCase(fetchMajor.pending, (state) => {
            state.major.status = "loading";
            state.major.allIds = [];
            state.major.byIds = {};
            state.major.name = '';
            state.major.url = '';

            state.other.courses = [];

            state.ge.allIds.forEach((id)=>{
                state.ge.byIds[id].courses = [];
            });
;
            state.courses.allIds = [];
            state.courses.byIds = {};

            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].data.quarters.forEach((quarterId)=>{
                    state.quarters[quarterId].courses = []
                })
                state.years.byIds[yearId].units = 0;
            })
        });

        builder.addCase(fetchMajor.fulfilled,(state, action) => {   
            console.log(action.payload);
            
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
                    repeatability: course.repeatability
                }
            })
            state.major.name = action.payload.name;
            state.major.url = action.payload.url;

            state.major.status = "succeeded";
        });

        builder.addCase(fetchMajor.rejected,(state) => {
            state.major.status = "error";
            state.major.error = "";
        });
    },
});

export const {  addCourse, addCourseToQuarter, moveCourse, 
                removeCourseFromQuarter, addYear, removeYear, refreshState } =  storeSlice.actions;
export default  storeSlice.reducer;