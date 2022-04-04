import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchMajor, fetchGECategories} from './FetchData'

interface YearType {
    id: string;
    name: string;
    quarterIds: string[];
}

interface SectionType {
    [id:string]: (string|string[])[];
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

interface FetchGEPayload { 
    id:string; 
    name:string; 
    note:string;
}

interface AddCoursePayload { 
    id: string;
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
            [id: string]: YearType
        }; 
        allIds: string[]; 
        totalUnits: number;
    };
    major:{
        byIds:{
            [id:string]:{
                id: string,
                title: string,
                sectionIds: { sectionId: string, note: string} []
            }}; 
        allIds: string[];
        name: string;
        url: string;
        status: string;
    }
    customAdd: {sectionId: string, title: string};
    ge: {
        byIds: {
            [sectionId:string]: {
                sectionId: string, 
                geId: string, 
                title: string, 
                note: string, 
            }};
        allSectionIds: string[];
        allGeIds: string[];
        status: string;
    };
    sectionCourses: SectionType;
    courses: {
        byIds: {
            [id:string]: {
                data: CourseType, 
                repeatability: number,
                removable: boolean,
                sectionIds : string[],
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
const YEAR_NAMES = ["Freshman","Sophomore","Junior","Senior"];
const QUARTER_ID_LENGTH = 3;
const ID_LENGTH = 4;
const DEPT_COLORS = [
    ['#AFD3E9', '#70ADD7', '#3688BF'],
    ['#C2E9EA', '#76CFD0', '#38A3A5'],
    ['#E4F1ED', '#C9E3DB', '#78BAA6'],
    ['#B7D2E1', '#8CB7CF', '#6FA6C3'],
    ['#C8DFE4', '#ADCFD7' ,'#5094A5']
]

const generateInitialState = () => {
    let years:{[id:string]:YearType} = {};
    let sections:SectionType = {};
    let customAdd =  {
        sectionId: nanoid(ID_LENGTH), 
        title: "Additional: ",
    };
    let yearAllIds = [nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH), 
                     nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH)];

    yearAllIds.forEach( (yearId, index) => {
        let quarterIds = [nanoid(QUARTER_ID_LENGTH),nanoid(QUARTER_ID_LENGTH),
                          nanoid(QUARTER_ID_LENGTH),nanoid(QUARTER_ID_LENGTH)];

        quarterIds.forEach(quarterId => {
            sections[quarterId] = [] as string[];
        }) 

        years[yearId] = {id: yearId, name: YEAR_NAMES[index], quarterIds: quarterIds};
    })
    sections[customAdd.sectionId] = [] as string [];
    
    return {
        years: {
            byIds: years, 
            allIds: yearAllIds, 
            totalUnits: 0
        }, 
        major: {
            byIds: {}, 
            allIds: [],
            name: "",
            url: "",
            status: "idle",
        },
        ge: {
            byIds: {},
            allSectionIds: [],
            allGeIds: [],
            status:"idle",
        },
        customAdd: customAdd,
        sectionCourses: sections,
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
         * Add course to sections
         * Add course to courses 
         * Add color for new course department
         */
        addCourse: (state, action: PayloadAction<AddCoursePayload>) => {
            let course = action.payload.course,
                id = action.payload.id;
            state.sectionCourses[id].push(course.id);

            if(state.courses.byIds[course.id] === undefined) {
                state.courses.byIds[course.id] = {
                    data: course, 
                    repeatability: course.repeatability,
                    removable: true,
                    sectionIds: [],
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
         * Delete courseId from sections and courseData in courses
         */
        deleteCourse: (state, action: PayloadAction<DeleteCoursePayload>) => {
            let courseId = action.payload.courseId,
                sectionId = action.payload.droppableId,
                numOfQuartersTaken = state.courses.byIds[courseId].sectionIds.length;

            state.sectionCourses[sectionId].splice(action.payload.index,1);
            state.courses.byIds[courseId].sectionIds.forEach(id => {
                state.sectionCourses[id] = state.sectionCourses[id].filter(id => id !== courseId);
            })

            if(numOfQuartersTaken > 0)
                state.years.totalUnits -= (state.courses.byIds[courseId].data.units * numOfQuartersTaken);
            
            if(state.courses.byIds[courseId].removable) {
                state.courses.allIds = state.courses.allIds.filter(id => id !== courseId);
                delete state.courses.byIds[courseId];
            }
            else {
                state.courses.byIds[courseId].repeatability = state.courses.byIds[courseId].data.repeatability;
                state.courses.byIds[courseId].sectionIds = [];
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

            if(!state.sectionCourses[quarterId].includes(courseId)) {
                state.courses.byIds[courseId].repeatability -= 1;
                state.courses.byIds[courseId].sectionIds.push(quarterId);
                state.sectionCourses[quarterId].splice(action.payload.index, 0, courseId);
                state.years.totalUnits += state.courses.byIds[courseId].data.units;
            }
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceId = action.payload.sourceId,
                destinationId = action.payload.destinationId,
                courseId = action.payload.courseId;

            if(!state.sectionCourses[destinationId].includes(courseId)) {

                if(sourceId !== destinationId) {
                    let quarterIds = state.courses.byIds[courseId].sectionIds.filter(id => id !== sourceId);
                    quarterIds.push(destinationId);
                    state.courses.byIds[courseId].sectionIds = quarterIds;
                }
                state.sectionCourses[sourceId].splice(action.payload.sourceIndex, 1);
                state.sectionCourses[destinationId].splice(action.payload.destinationIndex, 0, courseId);
            }
        },

        /**
         * 
         * @param state 
         * @param action 
         */
        removeCourseFromQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {
            state.sectionCourses[action.payload.quarterId].splice(action.payload.index,1);
            state.courses.byIds[action.payload.courseId].repeatability += 1;
            state.years.totalUnits -= state.courses.byIds[action.payload.courseId].data.units;
        },

        addYear: (state) => {
            let newYearId = nanoid(4);
            let newQuarterIds = [ nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH),
                               nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH) ];
            
            for(let i = 0; i < 4; i++) 
                state.sectionCourses[newQuarterIds[i]] = [] as string[]
            
            state.years.allIds.push(newYearId);
            state.years.byIds[newYearId] = {
                id: newYearId, 
                name: "Senior plus", 
                quarterIds: newQuarterIds
            };
        },

        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            state.years.byIds[action.payload.id].quarterIds.forEach((id) => {
                state.sectionCourses[id].forEach((courseId) => {
                    if(typeof(courseId) === 'string') {
                        state.courses.byIds[courseId].repeatability += 1;
                        state.years.totalUnits -= state.courses.byIds[courseId].data.units;
                    }
                })
                delete state.sectionCourses[id];
            })
           
            delete state.years.byIds[action.payload.id];
            state.years.allIds.splice(action.payload.index,1);
        },

        refreshState: (state) => {
            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarterIds.forEach((quarterId)=>{
                    state.sectionCourses[quarterId].forEach(courseId => {
                        if(typeof(courseId) === 'string') {
                            state.courses.byIds[courseId].repeatability += 1;
                            state.courses.byIds[courseId].sectionIds = [];
                        }
                    })
                    state.sectionCourses[quarterId] = [];
                })
            })
            state.years.totalUnits = 0;
        }

    },

    extraReducers: (builder) => {
        /** */
        builder.addCase(fetchGECategories.pending, (state) => {
            state.ge.status = "loading";
        });

        builder.addCase( fetchGECategories.fulfilled,(state,action:PayloadAction<FetchGEPayload[]>) => {    
            action.payload.forEach( (ge) => {
                const id = nanoid(ID_LENGTH);
                state.ge.allSectionIds.push(id);
                state.ge.allGeIds.push(ge.id);
                state.ge.byIds[id] = {
                    sectionId: id, 
                    geId: ge.id, 
                    title:ge.name, 
                    note: ge.note, 
                }
                state.sectionCourses[id] = [] as string[];
            });
            state.ge.status = "succeeded";
        });

        builder.addCase( fetchGECategories.rejected,(state) => {
            state.ge.status = "error";
        });

        /** */
        builder.addCase(fetchMajor.pending, (state) => {
            state.major.status = "loading";
            state.major.allIds = [];
            state.major.byIds = {};
            state.major.name = '';
            state.major.url = '';
            state.sectionCourses[state.customAdd.sectionId] = [];

            state.ge.allSectionIds.forEach((id)=>{
                state.sectionCourses[id] = [];
            });

            state.courses.allIds = [];
            state.courses.byIds = {};

            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarterIds.forEach((quarterId)=>{
                    state.sectionCourses[quarterId] = [] as string []
                })
            })

            state.depts.byIds = {};
            state.depts.size = 0; 
        });

        builder.addCase(fetchMajor.fulfilled,(state, action) => {   
            action.payload.major_requirement.forEach ((section)=>{
                const sId = nanoid(ID_LENGTH);
                state.major.allIds.push(sId);
                state.major.byIds[sId] = {id: sId, title: section.name, sectionIds: []};
            
                section.child.forEach((c) => {
                    const cId = nanoid(ID_LENGTH);
                    state.major.byIds[sId].sectionIds.push({sectionId: cId, note: c.name})
                    state.sectionCourses[cId] = c.child;
                })
            })

            state.courses.allIds = action.payload.courseIds;

            action.payload.courseData.forEach((course) => {
                state.courses.byIds[course.id] = {
                    data: course,
                    repeatability: course.repeatability,
                    removable: false,
                    sectionIds: []
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

export const {  addCourse, deleteCourse, addCourseToQuarter, moveCourse, 
                removeCourseFromQuarter, addYear, removeYear, refreshState } =  storeSlice.actions;
export default  storeSlice.reducer;