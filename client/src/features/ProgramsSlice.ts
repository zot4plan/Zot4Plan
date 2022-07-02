import {createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { fetchProgramById } from '../api/FetchData'

export const SECTION_ID_LEN = 4; // to differentiate course in major (which cannot be remove)

const getInitialState = () => {
    let sections:{[id:string]: (string|string[])[]}= {}; 
    let addedCourses =  nanoid(5);
    sections[addedCourses] = [] as string [];
    
    return {
        byIds: {},
        selectedPrograms:[[],[]],
        index: [-1,-1],
        allIds: [],
        status:"idle",
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
        addCourse: (state, action: PayloadAction<{courses: CourseType[]}>) => {
            state.sections[state.addedCourses].push(action.payload.courses[0].id);
        },

        removeCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.sections[state.addedCourses].splice(action.payload.index,1);
        },

        handleChangeProgram: (state, action: PayloadAction<ProgramOptionPayload>) => { 
            let i = action.payload.isMajor? 1 : 0,
                currentIndex = state.index[i],
                len = action.payload.value.length;
            
            if(currentIndex >= len)
                state.index[i] = len - 1;

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
        /**
         * @param requirement: MajorType[]
         * @param url: string
         * @param name: string
         * @param isMajor: boolean
         * @param courseIds: string[]
         * @param courseData: CourseType[]
         */
        builder.addCase(fetchProgramById.fulfilled, (state, action) => {  
            state.status = "succeeded";
   
            let program: ProgramType = {
                id: action.payload.id,
                byIds: {}, 
                allIds: [],
                name: action.payload.name,
                url: action.payload.url,
                isMajor: action.payload.isMajor,
            };

            action.payload.requirement.forEach ((accordion)=>{
                const accordionId = nanoid(SECTION_ID_LEN);
                program.allIds.push(accordionId);
                program.byIds[accordionId] = {id: accordionId, name: accordion.name, sectionIds: []};
            
                accordion.child.forEach((section) => {
                    const sectionId = nanoid(SECTION_ID_LEN);
                    program.byIds[accordionId].sectionIds.push({sectionId: sectionId, nameChild: section.name})
                    state.sections[sectionId] = section.child;
                })
            })

            state.byIds[program.id] = program;         
            state.allIds.push(program.id);
            
            // assign new selected programs
            let i = action.payload.isMajor? 1 : 0,
            currentIndex = state.index[i],
            len = action.payload.programs.length;
            
            if(currentIndex === -1)
                state.index[i] = 0;
            else if(currentIndex >= len)
                state.index[i] = len - 1;

            state.selectedPrograms[i] = action.payload.programs;
        });

        builder.addCase(fetchProgramById.rejected, (state) => {
            state.status = "failed";
        });
    },
});

export const { 
    addCourse,  
    removeCourse,
    handleChangeProgram,
    handleSwitchProgram } =  storeSlice.actions;
export default  storeSlice.reducer;