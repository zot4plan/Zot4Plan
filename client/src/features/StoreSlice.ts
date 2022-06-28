import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchProgramById, fetchProgramByFile, fetchAllGE, fetchGE} from '../api/FetchData'

export const QUARTER_ID_LENGTH = 3; // for function AddCourseToQuarter
export const REQ_ID_LENGTH = 4; // to differentiate course in major (which cannot be remove)

const DEPT_COLORS = [
    ['#AFD3E9', '#70ADD7', '#3688BF'], // Columbia Blue
    ['#C2E9EA', '#76CFD0', '#38A3A5'], // Powder Blue
    ['#E4F1ED', '#C9E3DB', '#78BAA6'], // Mint Cream
    ['#B7D2E1', '#8CB7CF', '#6FA6C3'], // Columnbia Blue
    ['#C8DFE4', '#ADCFD7' ,'#5094A5'], // Columnbia Blue
]

const generateInitialState = () => {
    let years:{[id:string]:YearType} = {};
    let sections:{[id:string]: (string|string[])[]}= {}; // sections courses (include quarters, GE, major and courses added by students)
    let addedCourses =  nanoid(5);

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
            quarterIds: quarterIds
        };
    })
    sections[addedCourses] = [] as string [];
    
    return {
        years: {
            byIds: years, 
            allIds: yearIds, 
            totalUnits: 0
        }, 
        programs: {
            byIds: {},
            selectedMinors:[],
            selectedMajors:[],
            allIds: [],
            status:"idle",
            error: "",
        },
        ge: {
            byIds: {},
            allIds: [],
            status:"idle",
            error: "",
        },
        addedCourses: {sectionId: addedCourses},
        sections: sections,
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
         * Add course to AddedCourses
         * @param course 
         */
        addCourse: (state, action: PayloadAction<CourseType>) => {
            let course = action.payload,
                sectionId = state.addedCourses.sectionId;

            state.sections[sectionId].push(course.id);

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
        
       
        deleteCourse: (state, action: PayloadAction<DeleteCoursePayload>) => {
            let sectionId = state.addedCourses.sectionId;
            state.sections[sectionId].splice(action.payload.index,1);
        },

        /**
         * Add course to quarter according to the dropping position
         * reduce the course repeatability
         * add quarterID to course.quarterIds
         */
        addCourseToQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {   
            let quarterId = action.payload.quarterId,
                courseId = action.payload.courseId;

            if(!state.sections[quarterId].includes(courseId)) {
                state.courses.byIds[courseId].remains -= 1;
                state.sections[quarterId].splice(action.payload.index, 0, courseId);
                state.years.totalUnits += state.courses.byIds[courseId].data.units;
            }
        },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let sourceId = action.payload.sourceId,
                destinationId = action.payload.destinationId,
                courseId = action.payload.courseId;
            
            //prevent same course from being added to the same quarter
            if(!state.sections[destinationId].includes(courseId) || sourceId === destinationId) {
                state.sections[sourceId].splice(action.payload.sourceIndex, 1);
                state.sections[destinationId].splice(action.payload.destinationIndex, 0, courseId);
            }
        },

        /**
         *  Remove the course from Quarter
         */
        removeCourseFromQuarter: (state, action: PayloadAction<CourseQuarterPayload>) => {
            // remove course from quarter section
            state.sections[action.payload.quarterId].splice(action.payload.index,1);

            // increase repeatability of course
            state.courses.byIds[action.payload.courseId].remains += 1;

            // reduce the total units taken
            state.years.totalUnits -= state.courses.byIds[action.payload.courseId].data.units;
        },

        addYear: (state) => {
            if(state.years.allIds.length < 9) {
                let newYearId = nanoid(4);
                let newQuarterIds = [ nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH),
                                nanoid(QUARTER_ID_LENGTH), nanoid(QUARTER_ID_LENGTH) ];
                
                for(let i = 0; i < 4; i++) 
                    state.sections[newQuarterIds[i]] = [] as string[]
                
                state.years.allIds.push(newYearId);
                state.years.byIds[newYearId] = {
                    id: newYearId,  
                    quarterIds: newQuarterIds
                };
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
                        state.years.totalUnits -= state.courses.byIds[courseId].data.units;
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
            state.years.totalUnits = 0;
        },

        handleChangeProgram: (state, action: PayloadAction<ProgramOptionPayload>) => { 
            if(action.payload.isMajor)
                state.programs.selectedMajors = action.payload.value;
            else
                state.programs.selectedMinors = action.payload.value;
        },
    },

/********************************************************
********************* ExtraReducers ********************* 
*********************************************************/
    extraReducers: (builder) => {

        /*********** Fetch General Education ********/
        builder.addCase(fetchAllGE.pending, (state) => {
            state.ge.status = "loading";
        });

        builder.addCase(fetchAllGE.fulfilled,(state, action) => {    
            state.ge.status = "succeeded";

            action.payload.forEach((category) => {
                const sectionId = nanoid(REQ_ID_LENGTH);
                state.ge.byIds[category.id] = {
                    id: category.id,
                    sectionId: sectionId,
                    name: category.name,
                    nameChild: category.note,
                    status: 'idle'
                }

                state.sections[sectionId] =[];
                state.ge.allIds.push(category.id);
            })
        });

        builder.addCase(fetchAllGE.rejected,(state) => {
            state.ge.status = "failed";
        }); 

         /*********** Fetch GE Courses ********/
        builder.addCase(fetchGE.pending,(state, action) => {
            console.log(action.meta);
            state.ge.byIds[action.meta.arg].status = "loading";
        });

        builder.addCase(fetchGE.fulfilled,(state, action) => {    
            const geId = action.meta.arg;
            state.ge.byIds[geId].status = "succeeded";

            const sectionId = state.ge.byIds[geId].sectionId;
            // assign new courses information
            action.payload.forEach((course) => {
            // check if course has already existed in courses.
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

            state.sections[sectionId].push(course.id);
        })
            
            
        });

        builder.addCase(fetchGE.rejected,(state, action) => {
            state.ge.byIds[action.meta.arg].status = "failed";
        }); 

       
        /*************** FetchProgramById ****************/
        builder.addCase(fetchProgramById.pending, (state) => {
            state.programs.status = "loading";
        }); 

        /**
         * Reset current state and assign new major to state
         * 
         * @param requirement: MajorType[]
         * @param url: string
         * @param name: string
         * @param isMajor: boolean
         * @param courseIds: string[]
         * @param courseData: CourseType[]
         */
        builder.addCase(fetchProgramById.fulfilled, (state, action) => {  
            state.programs.status = "succeeded";
            
            // create new program 
            let program: ProgramType = {
                id: action.payload.id,
                byIds: {}, 
                allIds: [],
                name: action.payload.name,
                url: action.payload.url,
                courses: action.payload.courseIds,
                isMajor: action.payload.isMajor,
            };

            action.payload.requirement.forEach ((accordion)=>{
                const accordionId = nanoid(REQ_ID_LENGTH);
                program.allIds.push(accordionId);
                program.byIds[accordionId] = {id: accordionId, name: accordion.name, sectionIds: []};
            
                accordion.child.forEach((section) => {
                    const sectionId = nanoid(REQ_ID_LENGTH);
                    program.byIds[accordionId].sectionIds.push({sectionId: sectionId, nameChild: section.name})
                    state.sections[sectionId] = section.child;
                })
            })

            state.programs.byIds[program.id] = program;         
            state.programs.allIds.push(program.id);

           if(action.payload.isMajor)
                state.programs.selectedMajors = action.payload.programs;
            else
                state.programs.selectedMinors = action.payload.programs;

            // assign new courses information
            action.payload.courseData.forEach((course) => {
                // check if course has already existed in courses.
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

        builder.addCase(fetchProgramById.rejected, (state) => {
            state.programs.status = "failed";
            state.programs.error = "An error occurred while retrieving the data";
        });

        //////////////////////////////////////////////////////
        /************  fetchMajorByFile ************/
        //////////////////////////////////////////////////////
/*        builder.addCase(fetchProgramByFile.pending, (state) => {
            state.programs.status = "loading";
        }); */

        /**
         * Reset current state and import information from input file to state
         * Still need to check for Validity of ge_course and quarter_course
         * 
         * @param requirement: MajorType[]
         * @param url: string
         * @param name: string
         * @param courseIds: string[]
         * @param courseData: CourseType[]
         * @param years: string[][][]
         * @param geCourses: string[][]
         * @param coursesAddByStudent: string[]
         */
/*
        builder.addCase(fetchProgramByFile.fulfilled, (state, action) => {  
            if(action.payload.status === "succeeded") {
                state.programs.status = "succeeded";

                console.log(action.payload);
                // Reset CouresInSections 
                state.sections = {};

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
                state.programs.name = action.payload.name;
                state.programs.url = action.payload.url;

                state.programs.allIds = [];
                state.programs.byIds = {};
                
                // Get major_requirement structure 
                action.payload.requirement.forEach((section)=>{
                    const sId = nanoid(MAJOR_ID_LENGTH);
                    state.programs.allIds.push(sId);
                    state.programs.byIds[sId] = {id: sId, title: section.name, sectionIds: []};
                
                    section.child.forEach((c) => {
                        const cId = nanoid(MAJOR_ID_LENGTH);
                        state.programs.byIds[sId].sectionIds.push({sectionId: cId, nameChild: c.name})
                        state.sections[cId] = c.child;

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
                state.sections[state.coursesAddByStudent.sectionId] = action.payload.coursesAddByStudent;

                state.ge.allGeIds.forEach((id,index)=>{
                    state.sections[state.ge.byIds[id].sectionId] = action.payload.geCourses[index];
                });

                state.years.allIds.forEach((yearId, yearIndex)=> {
                    state.years.byIds[yearId].quarterIds.forEach((quarterId, quarterIndex)=>{
                        state.sections[quarterId] = action.payload.years[yearIndex][quarterIndex];

                        // remove repeatability of course and calculate total units
                        state.sections[quarterId].forEach((course) => {
                            if(typeof(course) === 'string') {
                                state.courses.byIds[course].repeatability -= 1;
                                state.years.totalUnits += state.courses.byIds[course].data.units;
                            }
                        })
                    })
                })
            } 
            else {
                state.programs.status = "failed";
                state.programs.error = "Your upload file is invalid!";
            }
        });

        builder.addCase(fetchProgramByFile.rejected, (state) => {
            state.programs.status = "failed";
            state.programs.error = "An error occurred while retrieving the data";
        });  */
    },
});

export const {  addCourse, deleteCourse, addCourseToQuarter, moveCourse, handleChangeProgram,
                removeCourseFromQuarter, addYear, removeYear, refreshState } =  storeSlice.actions;
export default  storeSlice.reducer;