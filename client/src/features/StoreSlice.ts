import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchMajorById, fetchMajorByFile, fetchGE} from './FetchData'

interface YearType {
    id: string;
    name: string;
    quarterIds: string[];
}

interface SectionType {
    [id:string]: (string|string[])[];
}

export interface CourseType { 
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

// same as GE mysql data structure
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
        byIds: { [id: string]: YearType }; 
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
    coursesAddByStudent: {sectionId: string, title: string};
    ge: {
        byIds: {
            [geId:string]: {
                sectionId: string, 
                geId: string, 
                title: string, 
                note: string, 
            }};
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
const QUARTER_ID_LENGTH = 3; // for function AddCourseToQuarter
const MAJOR_ID_LENGTH = 4; // to differentiate course in major (which cannot be remove)
const ID_LENGTH = 5; 
const DEPT_COLORS = [
    ['#AFD3E9', '#70ADD7', '#3688BF'], // Columbia Blue
    ['#C2E9EA', '#76CFD0', '#38A3A5'], // Powder Blue
    ['#E4F1ED', '#C9E3DB', '#78BAA6'], // Mint Cream
    ['#B7D2E1', '#8CB7CF', '#6FA6C3'], // Columnbia Blue
    ['#C8DFE4', '#ADCFD7' ,'#5094A5'], // Columnbia Blue
]

const generateInitialState = () => {
    let years:{[id:string]:YearType} = {};
    let sections:SectionType = {}; // sections courses (include quarters, GE, major and courses added by students)
    let coursesAddByStudent =  {
        sectionId: nanoid(ID_LENGTH), 
        title: "+ Courses: ",
    };

    // Generate IDs for years
    let yearIds = [nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH), 
                     nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH)];
    
    //  Generate IDs for quarters of each year
    yearIds.forEach( (yearId, index) => {
        let quarterIds = [nanoid(QUARTER_ID_LENGTH),nanoid(QUARTER_ID_LENGTH),
                          nanoid(QUARTER_ID_LENGTH),nanoid(QUARTER_ID_LENGTH)];
        
        // initalize each quarter with empty courses array
        quarterIds.forEach(quarterId => {
            sections[quarterId] = [] as string[];
        }) 

        years[yearId] = {
            id: yearId, 
            name: YEAR_NAMES[index], 
            quarterIds: quarterIds
        };
    })
    sections[coursesAddByStudent.sectionId] = [] as string [];
    
    return {
        years: {
            byIds: years, 
            allIds: yearIds, 
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
            allGeIds: [],
            status:"idle",
        },
        coursesAddByStudent: coursesAddByStudent,
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

/********************************************************
*********************** Reducers ************************ 
*********************************************************/
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
                repeatability = state.courses.byIds[courseId].data.repeatability,
                repeatabilityLeft = state.courses.byIds[courseId].repeatability,
                courseUnits = state.courses.byIds[courseId].data.units;

            state.sectionCourses[sectionId].splice(action.payload.index,1);
            state.courses.byIds[courseId].sectionIds.forEach(id => {
                state.sectionCourses[id] = state.sectionCourses[id].filter(id => id !== courseId);
            })
            
            state.years.totalUnits -= (repeatability - repeatabilityLeft)*courseUnits;
            
            if(state.courses.byIds[courseId].removable) {
                state.courses.allIds = state.courses.allIds.filter(id => id !== courseId);
                delete state.courses.byIds[courseId];
            }
            else {
                state.courses.byIds[courseId].repeatability = repeatability;
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
         *  Remove the course from Quarter
         */
        removeCourseFromQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {
            // remove course from quarter section
            state.sectionCourses[action.payload.quarterId].splice(action.payload.index,1);

            // increase repeatability of course
            state.courses.byIds[action.payload.courseId].repeatability += 1;

            // reduce the total units taken
            state.years.totalUnits -= state.courses.byIds[action.payload.courseId].data.units;
        },

        /**
         *  Add a year and 4 quarters
         */
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

        /**
         * Can remove only additional years
         * @param state 
         * @param action: yearId and the position of year in the list 
         */
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

        /**
         * Remove all chosen courses from quarters 
         * @param state 
         */
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

/********************************************************
********************* ExtraReducers ********************* 
*********************************************************/
    extraReducers: (builder) => {

        //////////////////////////////////////////////
        /*********** Fetch General Education ********/
        //////////////////////////////////////////////

        builder.addCase(fetchGE.pending, (state) => {
            state.ge.status = "loading";
        });

        builder.addCase( fetchGE.fulfilled,(state,action:PayloadAction<FetchGEPayload[]>) => {    
            action.payload.forEach( (ge) => {
                const id = nanoid(ID_LENGTH);
                state.ge.allGeIds.push(ge.id);
                state.ge.byIds[ge.id] = {
                    sectionId: id, 
                    geId: ge.id, 
                    title:ge.name, 
                    note: ge.note, 
                }
                state.sectionCourses[id] = [] as string[];
            });
            state.ge.status = "succeeded";
        });

        builder.addCase(fetchGE.rejected,(state) => {
            state.ge.status = "failed";
        });

        ///////////////////////////////////////////////////
        /*************** FetchMajorById ***************/
        ///////////////////////////////////////////////////

        builder.addCase(fetchMajorById.pending, (state) => {
            state.major.status = "loading";
        });

        /**
         * Reset current state and assign new major to state
         * 
         * @param major_requirement: MajorType[]
         * @param url: string
         * @param name: string
         * @param courseIds: string[]
         * @param courseData: CourseType[]
         */
        builder.addCase(fetchMajorById.fulfilled, (state, action) => {  
            state.major.status = "succeeded";
            
            // Reset CouresInSections 
            state.sectionCourses = {};

            // Initalize courseAddByStudent, geCourses, quarterCourses to empty
            state.sectionCourses[state.coursesAddByStudent.sectionId] = [];

            state.ge.allGeIds.forEach((id)=>{
                state.sectionCourses[state.ge.byIds[id].sectionId] = [] as string[];
            });

            state.years.allIds.forEach((yearId)=> {
                state.years.byIds[yearId].quarterIds.forEach((quarterId)=>{
                    state.sectionCourses[quarterId] = [] as string []
                })
            })
            
            // Replace with new major
            state.major.name = action.payload.name;
            state.major.url = action.payload.url;

            state.major.allIds = [];
            state.major.byIds = {};

            action.payload.major_requirement.forEach ((section)=>{
                const sId = nanoid(MAJOR_ID_LENGTH);
                state.major.allIds.push(sId);
                state.major.byIds[sId] = {id: sId, title: section.name, sectionIds: []};
            
                section.child.forEach((c) => {
                    const cId = nanoid(MAJOR_ID_LENGTH);
                    state.major.byIds[sId].sectionIds.push({sectionId: cId, note: c.name})
                    state.sectionCourses[cId] = c.child;
                })
            })
            
            // Reset departments and courses
            state.depts.byIds = {};
            state.depts.size = 0; 

            state.courses.byIds = {};
            state.courses.allIds = action.payload.courseIds;
            
            action.payload.courseData.forEach((course) => {
                state.courses.byIds[course.id] = {
                    data: course,
                    repeatability: course.repeatability,
                    removable: false, // Cannot remove courses in major requirement
                    sectionIds: []    
                }
                
                // Assign color for department
                if(state.depts.byIds[course.department] === undefined) { 
                    let index = state.depts.size % DEPT_COLORS.length;
                    state.depts.byIds[course.department] = {id: course.department, colors: DEPT_COLORS[index] }
                    state.depts.size += 1;
                }
            })
            
            // Reset total units taken
            state.years.totalUnits = 0;
        });

        builder.addCase(fetchMajorById.rejected, (state) => {
            state.major.status = "failed";
        });

        //////////////////////////////////////////////////////
        /************  fetchMajorByFile ************/
        //////////////////////////////////////////////////////
        builder.addCase(fetchMajorByFile.pending, (state) => {
            state.major.status = "loading";
        });

        /**
         * Reset current state and import information from input file to state
         * Still need to check for Validity of ge_course and quarter_course
         * 
         * @param major_requirement: MajorType[]
         * @param url: string
         * @param name: string
         * @param courseIds: string[]
         * @param courseData: CourseType[]
         * @param years: string[][][]
         * @param geCourses: string[][]
         * @param coursesAddByStudent: string[]
         */

        builder.addCase(fetchMajorByFile.fulfilled, (state, action) => {  
            if(action.payload.status === "succeeded") {
                state.major.status = "succeeded";

                console.log(action.payload);
                // Reset CouresInSections 
                state.sectionCourses = {};

                // Reset departments and courses 
                state.depts.byIds = {};
                state.depts.size = 0; 

                state.courses.byIds = {};
                state.courses.allIds = action.payload.courseIds;
                
                // Add courses's information to the store
                action.payload.courseData.forEach((course) => {
                    state.courses.byIds[course.id] = {
                        data: course,
                        repeatability: course.repeatability,
                        removable: true, 
                        sectionIds: []    
                    }
                    
                    // Assign color for department
                    if(state.depts.byIds[course.department] === undefined) { 
                        let index = state.depts.size % DEPT_COLORS.length;
                        state.depts.byIds[course.department] = {id: course.department, colors: DEPT_COLORS[index] }
                        state.depts.size += 1;
                    }
                })
                
                // Assign major name and website url
                state.major.name = action.payload.name;
                state.major.url = action.payload.url;

                state.major.allIds = [];
                state.major.byIds = {};
                
                // Get major_requirement structure 
                action.payload.major_requirement.forEach((section)=>{
                    const sId = nanoid(MAJOR_ID_LENGTH);
                    state.major.allIds.push(sId);
                    state.major.byIds[sId] = {id: sId, title: section.name, sectionIds: []};
                
                    section.child.forEach((c) => {
                        const cId = nanoid(MAJOR_ID_LENGTH);
                        state.major.byIds[sId].sectionIds.push({sectionId: cId, note: c.name})
                        state.sectionCourses[cId] = c.child;

                        // Mark courses in major requirement as unremovable
                        c.child.forEach((course) => {
                            if(typeof(course) === 'string')
                                state.courses.byIds[course].removable = false;
                            else {
                                state.courses.byIds[course[0]].removable = false;
                                state.courses.byIds[course[1]].removable = false;
                            }
                        })
                    })
                })  
                
                // Reset total units taken
                state.years.totalUnits = 0; 

                // Assign data get from input file to courseAddByStudent, geCourses, quarterCourses 
                state.sectionCourses[state.coursesAddByStudent.sectionId] = action.payload.coursesAddByStudent;

                state.ge.allGeIds.forEach((id,index)=>{
                    state.sectionCourses[state.ge.byIds[id].sectionId] = action.payload.geCourses[index];
                });

                state.years.allIds.forEach((yearId, yearIndex)=> {
                    state.years.byIds[yearId].quarterIds.forEach((quarterId, quarterIndex)=>{
                        state.sectionCourses[quarterId] = action.payload.years[yearIndex][quarterIndex];

                        // remove repeatability of course and calculate total units
                        state.sectionCourses[quarterId].forEach((course) => {
                            if(typeof(course) === 'string') {
                                state.courses.byIds[course].repeatability -= 1;
                                state.years.totalUnits += state.courses.byIds[course].data.units;
                            }
                        })
                    })
                })
            } 
            else
                state.major.status = "failed";
        });

        builder.addCase(fetchMajorByFile.rejected, (state) => {
            state.major.status = "failed";
        });
    },
});

export const {  addCourse, deleteCourse, addCourseToQuarter, moveCourse, 
                removeCourseFromQuarter, addYear, removeYear, refreshState } =  storeSlice.actions;
export default  storeSlice.reducer;