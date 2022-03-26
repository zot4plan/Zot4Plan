import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchMajor, fetchGECategories} from './FetchData'

interface YearType {
    id: string;
    name: string;
    quarters: string[];
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
        droppableIds: string[];
        geIds: string[];
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
    depts:  { byIds: {[propName:string]: {id:string, colors: string[]}}, 
              size: number}
}

const QUARTER_ID_LENGTH = 3;
const MAJOR_ID_LENGTH = 4;
const GE_ID_LENGTH = 5;
const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
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
    let yearAllIds:string[] = [];

    for(let i = 0; i < 4; i++){
        let quarterIds:string[] = [];
        let yearId = nanoid(QUARTER_ID_LENGTH);

        QUARTER_NAMES.forEach((name) => {
            let quarterId = nanoid(QUARTER_ID_LENGTH);
            quarterIds.push(quarterId);
            quarters[quarterId] = {id: quarterId, name: name, courses: [], yearId: yearId};
        })

        years[yearId] = {id: yearId, name: YEAR_NAMES[i], quarters: quarterIds};
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
            droppableIds: [],
            geIds: [],
            status:"idle",
            error:"",
        },
        other: {id: nanoid(6), courses: []},
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
        addCourse: (state, action: PayloadAction<AddCoursePayload>) => {
            if(action.payload.position === 'other')
                state.other.courses.push(action.payload.course.id);

            state.courses.byIds[action.payload.course.id] = {data: action.payload.course, repeatability: 1};
            state.courses.allIds.push(action.payload.course.id);

            if(state.depts.byIds[action.payload.course.department] === undefined) { 
                let index = state.depts.size % DEPT_COLORS.length;
                state.depts.byIds[action.payload.course.department] = 
                    {id: action.payload.course.department, colors: DEPT_COLORS[index] }
                state.depts.size += 1;
            }
        },

        addCourseToQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {   
            let quarterId = action.payload.quarterId;
            let units = state.courses.byIds[action.payload.courseId].data.units;

            state.years.totalUnits += units;
            
            state.quarters[quarterId].courses.splice(action.payload.index,0,action.payload.courseId);
            state.courses.byIds[action.payload.courseId].repeatability -= 1;
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceYear = state.quarters[action.payload.sourceId].yearId;
            let destinationYear = state.quarters[action.payload.destinationId].yearId;
            let [removedCourse] = state.quarters[action.payload.sourceId].courses.splice(action.payload.sourceIndex, 1);

            state.quarters[action.payload.destinationId].courses.splice(action.payload.destinationIndex,0,removedCourse);
        },

        removeCourseFromQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {
            state.quarters[action.payload.quarterId].courses.splice(action.payload.index,1);
            state.courses.byIds[action.payload.courseId].repeatability += 1;

            let yearId = state.quarters[action.payload.quarterId].yearId;
            let units = state.courses.byIds[action.payload.courseId].data.units;

            state.years.totalUnits -= units;
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
                id: yearId, 
                name: "Senior plus", 
                quarters: quarterIds
            };
        },

        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            let id = action.payload.id;
            state.years.byIds[id].quarters.forEach((id) => {
                state.quarters[id].courses.forEach((courseId) => {
                    state.courses.byIds[courseId].repeatability += 1;
                    state.years.totalUnits -= state.courses.byIds[courseId].data.units;

                })
                delete state.quarters.id;
            })
            
            delete state.years.byIds[id];
            state.years.allIds.splice(action.payload.index,1);
        },

        refreshState: (state) => {
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarters.forEach((quarterId)=>{
                    state.quarters[quarterId].courses.forEach(courseId => {
                        state.courses.byIds[courseId].repeatability += 1;
                    })
                    state.quarters[quarterId].courses = []
                })
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
                state.ge.droppableIds.push(droppableId);
                state.ge.geIds.push(ge.id);
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
            state.major.error = "";
        });
    },
});

export const {  addCourse, addCourseToQuarter, moveCourse, 
                removeCourseFromQuarter, addYear, removeYear, refreshState } =  storeSlice.actions;
export default  storeSlice.reducer;