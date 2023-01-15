import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from './Axios';
import { toast } from "react-toastify";

const errorMessage = (err?: string) => {
    toast.error(err ? err : 'Cannot Retrieve Data!')
}

export const getCourse = createAsyncThunk("courses/getCourse", 
    (id: string) => {
        const course = sessionStorage.getItem(id);
        return course 
            ? {status: "succeeded", course: JSON.parse(course)}
            : Axios.get('/api/getCourse', { params: { id: id } })
            .then(response => {
                sessionStorage.setItem(id, JSON.stringify(response.data));
                return {
                    course: response.data as CourseType,
                };
            })
    }
);

export const getCourses = (search: string, callback:(options: OptionType[]) => void) => {
    let filterCourse:OptionType[] = [];
    if(search.length < 2) {
        callback(filterCourse);
    }
    else {
        setTimeout(() => {
            Axios.get('/api/getCourses', {params: { id: search }})
            .then((res) => {
                res.data.forEach((course:CourseIdType) => 
                    filterCourse.push({value: course.course_id, label: course.course_id})
                );
                callback(filterCourse);
            })
            .catch((err) => {
                console.error(err);
                errorMessage();
            });
        }, 500);
    }
}

export const getAllPrograms = async () => {
    try {
        const response = await Axios.get('/api/getAllPrograms');
        return response.data as ProgramOption[];
    }
    catch(err) {
        errorMessage();
        return [] as ProgramOption[];
    }
};

export const getAllApExams = async () => {
    try {
        const response = await Axios.get('/api/getAllApExams');
        return response.data as ApExamOption[];
    }
    catch(err) {
        errorMessage();
        return [] as ApExamOption[];
    }
};

export const getAllGE = createAsyncThunk("generalEducation/getAllGE", 
    async () => {
        const response = await Axios.get('/api/getAllGE');
        return response.data as GEPayload[];
    }
);

export const getCoursesByGE = createAsyncThunk("generalEducation/getCoursesByGE", 
    async (id: string) => {
        const response = await Axios.post('/api/getCoursesByGE', {id: id})
        return {
            departments: response.data.departments as string[], 
            courses_in_depts: response.data.courses_in_depts as {[id:string]: string[]}
        };
    }
);

export const getProgramById = createAsyncThunk("programs/getProgramById", 
    async (id: number) => {
        const response = await Axios.post('/api/getProgramById', {id: id})
        return {
            id: id,
            requirement: response.data.requirement as RequirementType[],
            url: response.data.url, 
            departments: response.data.departments as string[],
        };
    }
); 

export const getSchedule = createAsyncThunk("schedule/getSchedule", 
    async (id: string) => {
        const response = await Axios.put('/api/loadSchedule/' + id);
        const courses = response.data.courses as CourseType[];
        courses.forEach(course => sessionStorage.setItem(course.course_id, JSON.stringify(course)));
        return {
            selectedPrograms: response.data.selectedPrograms as ProgramOption[][],
            years: response.data.years as string[][][],
            addedCourses: response.data.addedCourses as string[],
            courses: courses,
            apExam: response.data.apExam as ApExamType[],
            apExamUnits: response.data.apExamUnits as number,
        };
    }
); 

export const addOrEditSchedule = (
    name: string, 
    schedule: any, 
    setMessage: (value: React.SetStateAction<{status: string; content: string;}>) => void
) => 
    Axios.put('/api/saveSchedule/' + name, {schedule: schedule})
    .then(() => setMessage({status: "succeeded", content: "Saved successfully!"}))
    .catch(() => {
        setMessage({status: "failed", content: "Failed to save schedule"})
        errorMessage();
    })

export const updateHomeVisit = createAsyncThunk("features/updateHomeVisit", 
    async () => {
        const response =  await Axios.put('/api/updateHomeVisit');
        return response.data;
    }
);