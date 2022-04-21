import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import {CourseType} from './StoreSlice'

interface FetchMajorType { 
    id:number; // the index of the major in select major list
}

export interface MajorType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[]; // need to be rename 
}

/** 
 * Get All GE categories information.
 * Return an array of GE.
 *  Ge= { id:string;   : alias of ge
 *       name:string; : full name of the ge
 *       note:string; : describe how the GE can be completed } 
 */
export const fetchGE = createAsyncThunk(
    "features/fetchGE", async (_, thunkAPI) => {
       try {
          const response = await Axios.get('http://localhost:8080/api/getGeneralEducation');
          return await response.data;
        } 
        catch (error) {
           return thunkAPI.rejectWithValue({ error: ""});
        }
});

export const fetchMajorById = createAsyncThunk("features/fetchMajorById", async ({id}:FetchMajorType) => 
    Axios.get('http://localhost:8080/api/getRequirementById', {params: {id: id}})
    .then((response) => {
        return {
            status: "succeed",
            major_requirement: response.data.major.major_requirement as MajorType[],
            url: response.data.major.url, // link to the requirement page of major 
            name: response.data.major.name, 
            courseIds: response.data.allCourseIds, 
            courseData: response.data.coursesData as CourseType[]
        };
            
    })
    .catch(()=> {
        return {
            status: "failed",
            major_requirement: [],
            name: '',
            url: '',  
            courseIds: [], 
            courseData: [] as CourseType[],
        };
    })
); 

interface InputFileType {
    data: string;    // Json file content represent as string, expect object keys are
                     // majorName: string             : name of the major
                     // coursesAddByStudent: string[] : list of course add by student
                     // geCourses: string [][];       : list of list of courses taken by each ge categorie
                     // years: string[][][];          : list of quarters, each quarter contains a list of courses taken in the quarter
   // geIds: string[];
}

export const fetchMajorByFile = createAsyncThunk("features/fetchMajorByFile", async ({data}: InputFileType) => 
    Axios.get('http://localhost:8080/api/getDataByFile',{params: {data: data}})
    .then((response) => {
        const fileContent = (JSON.parse(data)).data;
        return {
            // data receive from server
            status: "succeeded",
            major_requirement: response.data.major[0].major_requirement as MajorType[],
            url: response.data.major[0].url, 
            name: response.data.major[0].name,
            courseIds: response.data.allCourseIds as string[], 
            courseData: response.data.courseData as CourseType[],

            // data from input file after checking validity in combine_models.controller
            years: fileContent.years as string[][][],
            coursesAddByStudent: fileContent.coursesAddByStudent as string[],
            geCourses: fileContent.geCourses as string[][],
        };
    })
    .catch(()=> {
        return {
            status: "failed",
            major_requirement: [],
            name: '',
            url: '',  
            courseIds: [], 
            courseData: [] as CourseType[],
            years: [] as string[][][],
            coursesAddByStudent:[] as string[],
            geCourses: [] as string[][],
        };
    })
); 