/***** Object Type*****/
declare interface YearType {
    id: string;
    quarterIds: string[];
}

declare interface QuarterType { 
    droppableId: string;
    quarterName: string;
}

declare interface SectionType {
    [id:string]: (string|string[])[];
}

declare interface MajorType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[]; // need to be rename 
}

declare interface CourseType { 
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

/***** Payload Type ****/
declare interface FetchGEPayload { 
    id:string; 
    name:string; 
    note:string;
}

declare interface AddCoursePayload { 
    id: string;
    course: CourseType; 
}

declare interface DeleteCoursePayload{
    droppableId: string;
    index: number;
    courseId: string;
}

declare interface CourseQuarterPayload {
    quarterId: string;
    courseId: string;
    index: number;
}

declare interface MoveCoursePayload {
    sourceId: string;
    destinationId: string;
    sourceIndex: number;
    destinationIndex: number;  
    courseId: string;
}

declare interface RemoveYearPayload {
    id: string;
    index: number;
}

/*********** Fetch Input Types ************/
declare interface FetchMajorType { 
    id:number; // the index of the major in select major list
}

interface InputFileType {
    data: string;    // Json file content represent as string, expect object keys are
                     // majorName: string             : name of the major
                     // coursesAddByStudent: string[] : list of course add by student
                     // geCourses: string [][];       : list of list of courses taken by each ge categorie
                     // years: string[][][];          : list of quarters, each quarter contains a list of courses taken in the quarter
}

/************* Slice **************/
declare interface StoreType{
    years: {
        byIds: { [id: string]: YearType }; 
        allIds: string[]; 
        totalUnits: number;
    };
    major:{
        byIds:{
            [id:string]:{
                id: string,
                title: string,
                sectionIds: { sectionId: string, note: string} []
            }}; 
        allIds: string[];
        name: string;
        url: string;
        status: string;
        error: string;
    }
    coursesAddByStudent: {sectionId: string, title: string};
    ge: {
        byIds: {
            [geId:string]: {
                sectionId: string, 
                geId: string, 
                title: string, 
                note: string, 
            }};
        allGeIds: string[];
        status: string;
    };
    sectionCourses: SectionType;

    courses: {
        byIds: {
            [id:string]: {
                data: CourseType, 
                repeatability: number,
                removable: boolean,
                sectionIds : string[],
            }},
        allIds: string[];
    };
    depts: {
        byIds: {
            [propName:string]: {
                id: string;
                colors: string[];
            }}, 
        size: number;
    }
}