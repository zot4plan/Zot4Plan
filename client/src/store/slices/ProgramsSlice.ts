import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { getProgramById, getSchedule } from '../../controllers/HomeController'
import { ID_LENGTH } from "../../constants/Constants";

const getInitialState = () => {
    let sections:{[id:string]: (string|string[])[]}= {}; 
    let addedCourses = nanoid(ID_LENGTH.ADD_COURSES);
    sections[addedCourses] = [] as string [];
    
    return {
        byIds: {},
        selectedPrograms: [[],[]],
        index: [-1,-1],
        addedCourses: addedCourses,
        sections: sections,
    }
}

const getDefaultProgram = (program: ProgramOption) => {
    return {
        program_id: program.value,
        byIds: {}, 
        allIds: [],
        name: program.label,
        url: "",
        isMajor: program.is_major,
        status: "idle"
    } as ProgramType
}

const initialState:ProgramsSliceType = getInitialState();

export const programSlice = createSlice ({
    name: "store",
    initialState,
    reducers: {
        addCourse: (state, action: PayloadAction<string>) => {
            state.sections[state.addedCourses].push(action.payload);
        },

        removeCourse: (state, action: PayloadAction<CoursePayload>) => {
            state.sections[state.addedCourses].splice(action.payload.index,1);
        },

        changeProgram: (state, action: PayloadAction<ProgramOptionPayload>) => { 
            let i = action.payload.isMajor? 1 : 0,
                currentIndex = state.index[i],
                len = action.payload.value.length;
            
            if(currentIndex >= len || currentIndex === -1)
                state.index[i] = len - 1;
                
            action.payload.value.forEach(program => {
                if(state.byIds[program.value] === undefined) {
                    state.byIds[program.value] = getDefaultProgram(program);
                }
            })
            state.selectedPrograms[i] = action.payload.value;
        },

        switchProgram: (state, action: PayloadAction<SwitchProgramPayload>) => { 
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
    extraReducers: (builder) => {
        /**
         * HTTP GET
         * getProgram
         */
        builder.addCase(getProgramById.pending, (state,action) => {
            state.byIds[action.meta.arg].status = "loading";
        });

        builder.addCase(getProgramById.fulfilled, (state, action) => {  
            let id = action.payload.id;
            
            state.byIds[id].status = "succeeded";
            state.byIds[id].url = action.payload.url;
            
            action.payload.requirement.forEach ((accordion)=>{
                const accordionId = nanoid(ID_LENGTH.PROGRAM_SECTION);
                state.byIds[id].allIds.push(accordionId);
                state.byIds[id].byIds[accordionId] = {id: accordionId, name: accordion.name, sectionIds: []};
            
                accordion.child.forEach((section) => {
                    const sectionId = nanoid(ID_LENGTH.PROGRAM_SECTION);
                    state.byIds[id].byIds[accordionId].sectionIds.push({sectionId: sectionId, nameChild: section.name})
                    state.sections[sectionId] = section.child;
                })
            })  
        });

        builder.addCase(getProgramById.rejected, (state, action) => {
            state.byIds[action.meta.arg].status = "failed";
        });

        /**
         * HTTP PUT (update active_date & return)
         * getSchedule
         */
        builder.addCase(getSchedule.fulfilled, (state, action) => {  
            state.selectedPrograms = action.payload.selectedPrograms;
            state.selectedPrograms.forEach((programs, i) => {
                if(programs.length > 0)
                    state.index[i] = 0;
                else
                    state.index[i] = -1;
                    
                programs.forEach(program => {
                    if(state.byIds[program.value] === undefined) {
                        state.byIds[program.value] = getDefaultProgram(program);
                    }
                })
            })
            state.sections[state.addedCourses] = action.payload.addedCourses;
        });   
    },

});

export const { 
    addCourse,  
    removeCourse,
    changeProgram,
    switchProgram 
} =  programSlice.actions;

export default programSlice.reducer;