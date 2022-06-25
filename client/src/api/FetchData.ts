import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from '../api/Axios';

/** 
 * Get All GE categories information.
 * Return an array of GE.
 *  Ge = { id:string;   : alias of ge
 *       name:string; : full name of the ge
 *       note:string; : describe how the GE can be completed } 
 */
export const fetchGE = createAsyncThunk(
    "features/fetchGE", async (_, thunkAPI) => {
       try {
          const response = await Axios.get('/api/getGeneralEducation');
          return await response.data;
        } 
        catch (error) {
           return thunkAPI.rejectWithValue({ error: ""});
        }
});

export const fetchProgramById = createAsyncThunk("features/fetchProgramById", async ({id}:FetchProgramType) => 
    Axios.post('/api/getRequirementById', {id: id})
    .then((response) => {
        console.log(response.data.major.isMajor);
        return {
            status: "succeed",
            requirement: response.data.major.requirement as RequirementType[],
            url: response.data.major.url, // link to the requirement page of major
            isMajor: response.data.major.isMajor as boolean,
            name: response.data.major.name, 
            courseIds: response.data.allCourseIds, 
            courseData: response.data.coursesData as CourseType[]
        };
            
    })
    .catch(()=> {
        return {
            status: "failed",
            requirement: [],
            name: '',
            url: '',
            isMajor: false,
            courseIds: [], 
            courseData: [] as CourseType[],
        };
    })
); 

export const fetchProgramByFile = createAsyncThunk("features/fetchProgramByFile", async ({data}: InputFileType) => 
    Axios.post('/api/getDataByFile',{data: data})
    .then((response) => {
        const fileContent = (JSON.parse(data)).data;
        return {
            // data receive from server
            status: "succeeded",
            requirement: response.data.major[0].requirement as RequirementType[],
            url: response.data.major[0].url, 
            name: response.data.major[0].name,
            isMajor: response.data.major[0].isMajor,
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
            requirement: [],
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