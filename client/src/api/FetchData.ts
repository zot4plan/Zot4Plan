import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from '../api/Axios';

/** 
 * Get All GE categories information.
 * Return an array of GE.
 */
export const fetchAllGE = createAsyncThunk("features/fetchAllGE", async () => 
    Axios.get('/api/getAllGE').then(response => {
        return response.data as GEPayload[];
    }).catch(() => {
        return [] as GEPayload[];
    })
);

export const fetchGE = createAsyncThunk("features/fetchGE", async (id: string) => 
    Axios.post('/api/getGE', {id: id}).then(response => {
        return {courses: response.data as CourseType[]};
    }).catch(() => {
        return {courses: [] as CourseType[]};
    })
);

export const fetchProgramById = createAsyncThunk("features/fetchProgramById", async (id: number) => 
    Axios.post('/api/getRequirementById', {id: id})
    .then( response => {
        return {
            status: "succeeded",
            id: id,
            requirement: response.data.major.requirement as RequirementType[],
            url: response.data.major.url, // link to the requirement page of major
            courseIds: response.data.allCourseIds, 
            courses: response.data.coursesData as CourseType[],
        };
    })
    .catch(()=> {
        return {
            status: "failed",
            id: id,
            requirement: [],
            url: '',
            courseIds: [], 
            courses: [] as CourseType[],
        };
    })
); 

export const fetchSchedule = createAsyncThunk("features/fetchSchedule", async (id: string) => 
    Axios.post('/api/getSchedule',{id: id})
    .then((response) => {
        console.log(response);
        return {
            status: "succeeded",
            selectedPrograms: response.data.selectedPrograms as ProgramOption[][],
            years: response.data.years as string[][][],
            addedCourses: response.data.addedCourses as string[],
            courses: response.data.courses as CourseType[],
        };
    })
    .catch(()=> {
        return {
            status: "failed",
            selectedPrograms: [] as ProgramOption[][],
            courses: [] as CourseType[],
            years: [] as string[][][],
            addedCourses: [] as string[],
        };
    })
); 