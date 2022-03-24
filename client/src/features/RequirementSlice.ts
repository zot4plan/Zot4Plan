import {createSlice, PayloadAction, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { addCourseToQuarter, removeCourseFromQuarter, refreshState } from "./ScheduleSlice";
import Axios from 'axios';

interface FetchMajorType { id:number }
interface MajorType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[];
}

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

export const fetchMajor = createAsyncThunk(
    "features/fetchMajor", async ({id}:FetchMajorType) => 
       Axios
        .get('http://localhost:8080/api/getRequirement', {params: { id: id }})
        .then((response) => {
            console.log(response.data);
            const data:MajorType[] = response.data.major_requirement;
            let courseIds:string[] = [];

            data.forEach ((section)=> {
                section.child.forEach((c) => {
                    c.child.forEach((course) => {
                        if(typeof(course) === 'string')
                            courseIds.push(course);
                        else {
                            courseIds.push(course[0]);
                            courseIds.push(course[1]);
                        }
                    })
                })
            })
            return Axios
                .get('http://localhost:8080/api/getCourses', {params: { ids: courseIds }})
                .then (result => {
                    const res: FetchMajorPayload = {
                        status: "succeed",
                        major_requirement: data,
                        url: response.data.url,
                        name: response.data.name, 
                        courseIds: courseIds, 
                        courseData: result.data
                    };
                    console.log(courseIds);
                    console.log(result.data);
                    return res;
                })
                .catch(() => {
                    const res: FetchMajorPayload = {
                        status: "failed",
                        major_requirement: [],
                        name: '',
                        url: '', 
                        courseIds: [], 
                        courseData: [] };
                    return res;
                });
        })
        .catch(()=> {
            const res: FetchMajorPayload = {
                status: "failed",
                major_requirement: [],
                name: '',
                url: '',  
                courseIds: [], 
                courseData: [] };
            return res;
        })
); 

interface FetchGEPayload { id:string; name:string; }
interface AddCoursePayload { position: string; course: CourseType; }

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

interface FetchMajorPayload {
    status: string,
    major_requirement: MajorType[],
    name: string,
    url: string, 
    courseIds: string[], 
    courseData: CourseType[],
}
interface FetchGEPayload { id:string; name:string; }
interface AddCoursePayload { position: string; course: CourseType; }

interface ChildType {
    id: string;
    name: string;
    courses: (string|string[])[];
}

interface RequirementType{
    major:{
        byIds:{[propName:string]:{id:string,name:string,subList:ChildType[]}}; 
        allIds: string[];
        name: string;
        url: string;
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
        byIds: {
            [propName:string]: {
                data: CourseType, 
                repeatability: number
            }
        },
        allIds: string[];
    };
}

const initialState:RequirementType = {
   major: 
   {
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
   other: [],
   courses: {
        byIds: {},
        allIds: [],
    }
}

export const requirementSlice = createSlice ({
    name: "requirement",
    initialState,
    reducers: {
       addCourseToRequirement: (state, action: PayloadAction<AddCoursePayload>) => {
        if(action.payload.position === 'other')
            state.other.push(action.payload.course.id);
        state.courses.byIds[action.payload.course.id] = {data: action.payload.course, repeatability: 1};
        state.courses.allIds.push(action.payload.course.id);
       }
    },
    extraReducers: (builder) => {

        /**** fetch General Education Categories ****/
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
        builder.addCase( fetchGECategories.rejected,(state) => {
            state.ge.status = "error";
            state.ge.error = "";
        });

        /**** fetch Major Requirement courses ****/
        builder.addCase(fetchMajor.pending, (state) => {
            state.major.status = "loading";
            state.major.allIds = [];
            state.major.byIds = {};
            state.major.name = '';
            state.major.url = '';

            state.other = [];

            state.ge.allIds.forEach((id)=>{
                state.ge.byIds[id].courses = [];
            });
;
            state.courses.allIds = [];
            state.courses.byIds = {};
        });
        builder.addCase(fetchMajor.fulfilled,(state, action) => {   
            console.log(action.payload);
            
            action.payload.major_requirement.forEach ((section)=>{
                const sId = nanoid(4);
                state.major.allIds.push(sId);
                state.major.byIds[sId] = {id: sId, name: section.name, subList: []};
            
                section.child.forEach((c) => {
                    const cId = nanoid(4);
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

        /****  toggle isPicked attribute of course ****/
        builder.addCase(addCourseToQuarter, (state, action) => {
            state.courses.byIds[action.payload.courseId].repeatability -= 1;
        })
        builder.addCase(removeCourseFromQuarter, (state, action) => {
            state.courses.byIds[action.payload.courseId].repeatability += 1;
        })

        /**** refresh state ****/
        builder.addCase(refreshState, (state, action) => {
            state.courses.allIds.forEach((id)=>{
                state.courses.byIds[id].repeatability = state.courses.byIds[id].data.repeatability;
            }) 
        })
    },
});

export const {addCourseToRequirement} = requirementSlice.actions;
export default requirementSlice.reducer;
