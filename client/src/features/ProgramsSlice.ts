import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchProgram, fetchSchedule } from '../api/FetchData'

export const SECTION_ID_LEN = 4; // to differentiate course in major (which cannot be remove)

const getInitialState = () => {
    let sections:{[id:string]: (string|string[])[]}= {}; 
    let addedCourses =  nanoid(6);
    sections[addedCourses] = [] as string [];
    
    return {
        byIds: {},
        selectedPrograms:[[],[]],
        index: [-1,-1],
        addedCourses: addedCourses,
        sections: sections,
    }
}

const initialState:ProgramsSliceType = getInitialState();

export const storeSlice = createSlice ({
    name: "store",
    initialState,
/************************** Reducers ***************************/
    reducers: {
        addCourse: (state, action: PayloadAction<string>) => {
            state.sections[state.addedCourses].push(action.payload);
        },

        removeCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.sections[state.addedCourses].splice(action.payload.index,1);
        },

        handleChangeProgram: (state, action: PayloadAction<ProgramOptionPayload>) => { 
            let i = action.payload.isMajor? 1 : 0,
                currentIndex = state.index[i],
                len = action.payload.value.length;
            
            if(currentIndex >= len || currentIndex === -1)
                state.index[i] = len - 1;
                
            action.payload.value.forEach(program => {
                if(state.byIds[program.value] === undefined) {
                    state.byIds[program.value] = {
                        id: program.value,
                        byIds: {}, 
                        allIds: [],
                        name: program.label,
                        url: "",
                        isMajor: program.is_major,
                        status: "idle"
                    }
                }
            })
            state.selectedPrograms[i] = action.payload.value;
            
        },

        handleSwitchProgram: (state, action: PayloadAction<SwitchProgramPayload>) => { 
            let i = action.payload.isMajor? 1 : 0,
                nextIndex = state.index[i] + action.payload.move,
                currentLength = state.selectedPrograms[i].length;

            if(nextIndex < 0)
                state.index[i] = currentLength - 1;
            else if(nextIndex >= currentLength)
                state.index[i] = 0;
            else
                state.index[i] = nextIndex;
        },
    },
/********************************** ExtraReducers ********************************/ 
    extraReducers: (builder) => {
    /************************* fetchProgramById ****************************/
        builder.addCase(fetchProgram.pending, (state,action) => {
            state.byIds[action.meta.arg].status = "loading";
        });
        /**
         * @param requirement: []
         * @param url: string
         * @param courseIds: string[]
         * @param courseData: CourseType[]
         */
        builder.addCase(fetchProgram.fulfilled, (state, action) => {  
            let id = action.payload.id;
            
            state.byIds[id].status = action.payload.status;
            state.byIds[id].url = action.payload.url;
            
            action.payload.requirement.forEach ((accordion)=>{
                const accordionId = nanoid(SECTION_ID_LEN);
                state.byIds[id].allIds.push(accordionId);
                state.byIds[id].byIds[accordionId] = {id: accordionId, name: accordion.name, sectionIds: []};
            
                accordion.child.forEach((section) => {
                    const sectionId = nanoid(SECTION_ID_LEN);
                    state.byIds[id].byIds[accordionId].sectionIds.push({sectionId: sectionId, nameChild: section.name})
                    state.sections[sectionId] = section.child;
                })
            })  
        });

        builder.addCase(fetchProgram.rejected, (state, action) => {
            state.byIds[action.meta.arg].status = "failed";
        });

    /***************************** fetchSchedule *******************************/
        builder.addCase(fetchSchedule.fulfilled, (state, action) => {  
            if(action.payload.status === "succeeded") {
                state.selectedPrograms = action.payload.selectedPrograms;
                state.selectedPrograms.forEach((programs, i) => {
                    if(programs.length > 0)
                        state.index[i] = 0;
                    else
                        state.index[i] = -1;
                        
                    programs.forEach(program => {
                        if(state.byIds[program.value] === undefined) {
                            state.byIds[program.value] = {
                                id: program.value,
                                byIds: {}, 
                                allIds: [],
                                name: program.label,
                                url: "",
                                isMajor: program.is_major,
                                status: "idle"
                            }
                        }
                    })
                })
                state.sections[state.addedCourses] = action.payload.addedCourses;
            }   
        });
        
    },
});

export const { 
    addCourse,  
    removeCourse,
    handleChangeProgram,
    handleSwitchProgram } =  storeSlice.actions;
export default  storeSlice.reducer;