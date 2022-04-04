import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';

interface FetchMajorType { 
    id:number 
}

interface MajorType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[];
}

interface CourseType { 
    id: string;
    name: string;
    department: string;
    units: number;
    repeatability: number;
    corequisite:string;
    description: string;
    prerequisite: string;
    restriction: string;
    ge:string;
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
                    return {
                        status: "succeed",
                        major_requirement: data,
                        url: response.data.url,
                        name: response.data.name, 
                        courseIds: courseIds, 
                        courseData: result.data as CourseType[]
                    };
                })
                .catch((error:string) => {
                    return {
                        status: error,
                        major_requirement: [],
                        name: '',
                        url: '', 
                        courseIds: [], 
                        courseData: [] as CourseType[]
                    };
                });
        })
        .catch((error:string)=> {
            return {
                status: error,
                major_requirement: [],
                name: '',
                url: '',  
                courseIds: [], 
                courseData: [] as CourseType[]
            };
        })
); 