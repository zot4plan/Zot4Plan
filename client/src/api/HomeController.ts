import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from './Axios';

export const getCourse = createAsyncThunk("features/getCourse", async (id: string) => {
    const course = sessionStorage.getItem(id);
    return course 
        ?  {status: "succeeded", course: JSON.parse(course)}
        :   Axios
            .get('/api/getCourse', { params: { id: id } })
            .then(response => {
                sessionStorage.setItem(id, JSON.stringify(response.data));
                return {
                    course: response.data as CourseType,
                };
            })
});

export const getCourses = (search: string, callback:(options: CourseOptionType[]) => void) => {
    let filterCourse:CourseOptionType[] = [];
    if(search.length < 3) {
        callback(filterCourse);
    }
    else {
        setTimeout(async () => {
            Axios.get('/api/filterCourses', {params: { id: search }})
            .then((res) => {
                res.data.forEach((course:CourseIdType) => filterCourse.push({value: course.course_id, label: course.course_id}))
                callback(filterCourse);
            })
            .catch(() => {
                callback(filterCourse);
            });
        }, 500);
    }
}

export const getAllGE = createAsyncThunk("features/getAllGE", async () => 
    Axios
    .get('/api/getAllGE')
    .then(response => response.data as GEPayload[])
);

export const getGE = createAsyncThunk("features/getGE", async (id: string) => 
    Axios
    .post('/api/getCoursesInGE', {id: id})
    .then(response => {
        return {
            status: "succeeded",
            departments: response.data.departments as string[], 
            courses_in_depts: response.data.courses_in_depts as {[id:string]: string[]}
        };
    })
);

export const getProgram = createAsyncThunk("features/getProgram", async (id: number) => 
    Axios
    .post('/api/getProgram', {id: id})
    .then( response => {
        return {
            id: id,
            requirement: response.data.requirement as RequirementType[],
            url: response.data.url, 
            departments: response.data.departments as string[],
        };
    })
); 

export const getSchedule = createAsyncThunk("features/getSchedule", async (id: string) => 
    Axios
    .put('/api/loadSchedule/' + id)
    .then((response) => {
        const courses = response.data.courses as CourseType[];
        courses.forEach(course => sessionStorage.setItem(course.course_id, JSON.stringify(course)));
        return {
            selectedPrograms: response.data.selectedPrograms as ProgramOption[][],
            years: response.data.years as string[][][],
            addedCourses: response.data.addedCourses as string[],
            courses: courses,
        };
    })
); 

export const addOrEditSchedule = async (
    name: string, 
    schedule: any, 
    setMessage: (value: React.SetStateAction<{status: string; content: string;}>) => void) => 
    {
        Axios
        .put('/api/saveSchedule/' + name, {schedule: schedule})
        .then(() => setMessage({status: "succeeded", content: "Saved successfully!"}))
        .catch(() => setMessage({status: "failed", content: "Failed to save schedule"}))
    };