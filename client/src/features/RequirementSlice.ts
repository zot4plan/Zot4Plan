import {createSlice, PayloadAction, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { addCourseToQuarter, removeCourseFromQuarter, refreshState } from "./ScheduleSlice";
import Axios from 'axios';

export const fetchGECategories = createAsyncThunk(
    "features/fetchGECategories", async (_, thunkAPI) => {
       try {
          const response = await Axios.get('http://localhost:8080/api/getGeneralEducation');
          return await response.data;
        } 
        catch (error) {
           return thunkAPI.rejectWithValue({ error: ""});
        }
});

interface FetchMajorType {
    id:number
}
export const fetchMajor = createAsyncThunk(
    "features/fetchMajor", async ({id}:FetchMajorType, thunkAPI) => {
       try {
          const response = await Axios.get('http://localhost:8080/api/getRequirement', {params: { id: id }});
          return await response.data;
        } 
        catch (error) {
           return thunkAPI.rejectWithValue({ error: ""});
        }
});

interface FetchGEPayload {
    id:string;
    name:string;
}

interface CourseType {
    id: string;
    isPicked: boolean;
}

interface AddCoursePayload {
    position: string;
    course: CourseType;
}

interface MajorType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[];
}

interface FetchMajorPayload {
    major_requirement: MajorType[];
}

interface ChildType {
    id: string;
    name: string;
    courses: (string|string[])[];
}
interface RequirementType{
    major:{
        byIds:{[propName:string]:{id:string,name:string,subList:ChildType[]}}; 
        allIds: string[];
        status:string;
        error:string;
    }
    ge: {
        byIds: {[propName:string]: {id:string, name:string, courses:string[]}};
        allIds: string[];
        status: string;
        error:string;
    };
    other: string[];
    courses: {
        byIds: {[propName:string]: CourseType},
        allIds: string[];
    };
}

const initialState:RequirementType = {
   major: 
   {
       byIds: {},
       allIds: [],
       status: "idle",
       error:"",
   },
   ge: {
       byIds: {},
       allIds: [],
       status:"idle",
       error:"",
   },
   other: [],
   courses: {byIds: {},
            allIds: []}
}

export const requirementSlice = createSlice ({
    name: "requirement",
    initialState,
    reducers: {
       addCourseToRequirement: (state, action: PayloadAction<AddCoursePayload>) => {
        if(action.payload.position === 'other')
            state.other.push(action.payload.course.id);
        state.courses.byIds[action.payload.course.id] = action.payload.course;
        state.courses.allIds.push(action.payload.course.id);
       }
    },
    extraReducers: (builder) => {
        //fetch General Education Categories
        builder.addCase(fetchGECategories.pending, (state) => {
            state.ge.status = "loading";
        });
        builder.addCase( fetchGECategories.fulfilled,(state,action:PayloadAction<FetchGEPayload[]>) => {    
            action.payload.forEach( (ge) => {
                state.ge.allIds.push(ge.id);
                state.ge.byIds[ge.id] = {id: ge.id, name:ge.name, courses:[]}
            });
            state.ge.status = "succeeded";
        });
        builder.addCase( fetchGECategories.rejected,(state, action) => {
            state.ge.status = "error";
            state.ge.error = "";
        });

        //fetch Major Requirement courses
        builder.addCase(fetchMajor.pending, (state) => {
            state.major.status = "loading";
            state.courses.allIds = [];
            state.courses.byIds = {};
            state.major.allIds = [];
            state.major.byIds = {};
            state.other = [];
            state.ge.allIds.forEach((id)=>{
                state.ge.byIds[id].courses = [];
            });
        });
        builder.addCase(fetchMajor.fulfilled,(state, action: PayloadAction<FetchMajorPayload>) => {    
            console.log(action.payload);
            action.payload.major_requirement.forEach ((section)=>{
                const sId = nanoid(4);
                state.major.allIds.push(sId);
                state.major.byIds[sId] = {id: sId, name: section.name, subList: []};

                section.child.forEach((c) => {
                    const cId = nanoid(4);
                    state.major.byIds[sId].subList.push({id: cId, name: c.name, courses: c.child})
                    c.child.forEach((course) => {
                        if(typeof(course) === 'string')
                        {
                            state.courses.byIds[course] = {id: course, isPicked: false};
                            state.courses.allIds.push(course);
                        }
                        else {
                            state.courses.byIds[course[0]] = {id: course[0], isPicked: false};
                            state.courses.byIds[course[1]] = {id: course[1], isPicked: false};
                            state.courses.allIds.push(course[0]);
                            state.courses.allIds.push(course[1]);
                        }
                    })
                })
            })

            state.major.status = "succeeded";
        });
        builder.addCase(fetchMajor.rejected,(state, action) => {
            state.major.status = "error";
            state.major.error = "";
        });

        // toggle isPicked attribute of course
        builder.addCase(addCourseToQuarter, (state, action) => {
            state.courses.byIds[action.payload.courseId].isPicked = true;
        })
        builder.addCase(removeCourseFromQuarter, (state, action) => {
            state.courses.byIds[action.payload.courseId].isPicked = false;
        })
        builder.addCase(refreshState, (state, action) => {
            console.log(state.courses.allIds);
            state.courses.allIds.forEach((id)=>{
                console.log(id);
                if(state.courses.byIds[id].isPicked)
                {
                    state.courses.byIds[id].isPicked = false;
                    console.log(id);
                }
            }) 
        })
    },
});

export const {addCourseToRequirement} = requirementSlice.actions;

export default requirementSlice.reducer;