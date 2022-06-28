/***** Object Type*****/
declare interface YearType {
    id: string;
    quarterIds: string[];
}

declare interface ProgramOption {
    value: number;
    label: string;
    is_major: boolean;
}

declare interface QuarterType { 
    sectionId: string;
    name: string;
}

declare interface RequirementType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[]; // need to be rename 
}

declare interface CourseType { 
    id: string;
    name: string;
    department: string;
    corequisite: string;
    description: string;
    prerequisite: string;
    prerequisite_tree: string;
    prerequisite_for: string;
    restriction: string;
    ge:string;
    terms:string;
    units: number;
    repeatability: number;
}

/************************/
/***** Payload Type ****/
/************************/
declare interface FetchGEPayload { 
   ge: GEPayload[];
   courses: CourseType[];
}

declare interface GEPayload {
    id: string; 
    name: string; 
    note: string;
}

declare interface CoursePayload{
    sectionId: string;
    courseId: string;
    index: number;
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

declare interface ProgramOptionPayload {
    value: ProgramOption[];
    isMajor: boolean;
}

/*********** Fetch Input Types ************/
declare interface FetchProgramType { 
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
declare interface GEType {
    id: string; 
    sectionId: string;
    name: string; 
    nameChild: string;
    status: string; 
}

declare interface AccordionType {
    id: string;
    name: string;
    sectionIds: { sectionId: string, nameChild: string} [];
}

declare interface ProgramType {
    id: number;
    byIds:{ [id:string]: AccordionType}; 
    allIds: string[];
    name: string;
    url: string;
    courses: string[];
    isMajor: boolean;
}

declare interface StoreType{
    years: {
        byIds: { [id: string]: YearType }; 
        allIds: string[]; 
        totalUnits: number;
    };
    programs: {
        byIds: {[id: string]: ProgramType };
        selectedMinors: ProgramOption[];
        selectedMajors: ProgramOption[];
        allIds: number[];
        status: string;
        error: string;
    };
    ge: {
        byIds: { [id:string]: GEType};
        allIds: string[];
        status: string;
        error: string;
    };
    addedCourses: { sectionId: string};

    sections: {[id:string]: (string|string[])[]};

    courses: {
        byIds: {
            [id:string]: {
                data: CourseType, 
                remains: number,
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