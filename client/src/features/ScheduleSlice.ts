import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';

interface QuarterType {
    id: string;
    name: string;
    courses: string[];
}

interface MoveCoursePayload {
    sourceId: string;
    destinationId: string;
    courseId: string;
    sourceIndex: number;
    destinationIndex: number;   
}

interface AddCoursePayload {
    destinationId: string;
    courseId: string;
    destinationIndex: number;
} 

interface RemoveCoursePayload {
    courseId:string;
    quarterId: string;
    index: number;
}   

interface YearType {
    id: string;
    name: string;
    quarters: string[];
}
interface RemoveYearPayload {
    id: string;
    index: number;
}

interface ScheduleState {
    years: {byIds: {[propName: string]: YearType}, allIds: string[]};
    quarters: {[propName: string]: QuarterType};
}

const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
const YEAR_NAMES = ["Freshman","Sophomore","Junior","Senior"];

const generateInitialState = () => {
    let quarters:{[propName:string]:QuarterType} = {};
    let years:{[propName:string]:YearType} = {}
    let yearAllIds:string[] = [];

    for(let i = 0; i < 4; i++){
        let quarterIds:string[] = [];
        QUARTER_NAMES.forEach((name) => {
            let q = {id: nanoid(4), name: name, courses: []}
            quarterIds.push(q.id);
            quarters[q.id] = q;
        })
        let year = {id: nanoid(4), name: YEAR_NAMES[i], quarters: quarterIds}
        years[year.id] = year;
        yearAllIds.push(year.id);
    }
    
    return {years: {byIds: years, allIds: yearAllIds}, quarters: quarters}
}

const initialState:ScheduleState = generateInitialState();

console.log(initialState);
export const ScheduleSlice = createSlice ({
    name: "schedule",
    initialState,
    reducers: {
        addCourseToQuarter: (state, action: PayloadAction<AddCoursePayload>) => {
            state.quarters[action.payload.destinationId].courses.splice(action.payload.destinationIndex,0,action.payload.courseId)
       },

        removeCourseFromQuarter: (state, action: PayloadAction<RemoveCoursePayload>) => {
           state.quarters[action.payload.quarterId].courses.splice(action.payload.index,1);
       },

        moveCourse: (state, action: PayloadAction<MoveCoursePayload> ) => {
            let [removed] = state.quarters[action.payload.sourceId].courses.splice(action.payload.sourceIndex, 1);

            state.quarters[action.payload.destinationId].courses.splice(action.payload.destinationIndex,0,removed) 
       },

        addYear: (state) => {
            let quarterIds:string[] = [];

            QUARTER_NAMES.forEach((name) => {
                let q = {id: nanoid(4), name: name, courses: []}
                quarterIds.push(q.id);
                state.quarters[q.id] = q;
            });

            let id:string = nanoid(4);
            state.years.byIds[id] = {id: id, name: "Senior plus", quarters: quarterIds};
            state.years.allIds.push(id);
        },

        removeYear: (state, action:PayloadAction<RemoveYearPayload>) => { 
            let id = action.payload.id;
            state.years.byIds[id].quarters.forEach((id) => {
                delete state.quarters.id;
            })
            
            delete state.years.byIds[id];
            state.years.allIds.splice(action.payload.index,1);
        }
    }
});

export const {addCourseToQuarter, removeCourseFromQuarter, moveCourse, addYear, removeYear} = ScheduleSlice.actions;

export default ScheduleSlice.reducer;