/********** Objects Type ************/

//Home - schedule
declare interface ProgramOption {
    value: number;
    label: string;
    is_major: boolean;
}

declare interface CourseOptionType {
    value: string;
    label: string;
}

declare interface CourseIdType {
    course_id: string;
}

declare interface RequirementType {
    name: string;
    child: ({name:string, child:(string|string[])[]})[]; // need to be rename 
}

declare interface CourseType { 
    course_id: string;
    name: string;
    department: string;
    units: number[];
    units_text:string;
    description: string;
    prerequisite: string | null;
    prerequisite_tree: object | null;
    prerequisite_for: string | null;
    corequisite: string | null;
    corequisite_tree: object | null;
    prerequisite_or_corequisite: string;
    prerequisite_or_corequisite_tree: object | null;
    restriction: string | null;
    same_as: string | null;
    overlaps_with: string | null;
    concurrent_with: string | null;
    ge:string;
    terms:string;
    repeatability: number;
    'courses_in_ge.ge_list': string[];
    [id: string]: string | number;
}

declare interface YearsType {
    byIds: { [id: string]: string[] },
    allIds: string[],
}

//Virtual-cafe
declare interface PlaylistType {
    playlist_id: string;
    thumbnail: string | null;
    name: string;
    author: string | null;
    shared_by: string | null;
    original_url: string;
    embed_url: string;
    language: string;
    genre: string[];
    like: number;
    view: number;
}

declare interface BackgroundType {
    background_id: number;
    name: string;
    description: string; 
    url: string;
    like: number;
}

declare interface VCTimeType {
    workTime: number;
    breakTime: number;
}

/*********** Component Props ************/
declare interface ModalProps {
    handleClose: () => void
}

declare interface NavListProps {
    isActive: boolean;
}

declare interface IconProps {
    className?: string;
    fontSize?: string;
}

declare interface ImageProps {
    className?: string;
}

/*********** Payload Type ***********/
declare interface GEPayload {
    ge_id: string; 
    name: string; 
    note: string;
}

declare interface CoursePayload{
    sectionId: string;
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

declare interface SwitchProgramPayload {
    move: number;
    isMajor: boolean;
}

declare interface AddPlaylistPayload {
    playlist: {
        playlist_id: string, 
        name:string, 
        prefix: string, 
        sharedBy: string
    }
    setStatus: React.Dispatch<React.SetStateAction<{
        url: string;
        name: string;
        sharedBy: string;
        status: string;
        message: string;
    }>>
}

/***********************************/
/************* Slice ***************/
/***********************************/
declare interface GEType {
    ge_id: string; 
    sectionIds: { sectionId: string, nameChild: string } [];
    name: string; 
    nameChild: string;
    status: string; 
}

declare interface AccordionType {
    id: string;
    name: string;
    sectionIds: { sectionId: string, nameChild: string } [];
}

declare interface ProgramType {
    program_id: number;
    byIds:{ [id:string]: AccordionType }; 
    allIds: string[];
    name: string;
    url: string;
    isMajor: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

declare interface ProgramsSliceType{
    byIds: { [id: string]: ProgramType };
    selectedPrograms: ProgramOption[][]; // 0-index is minors, 1-index is majors 
    index: number[]; // 0-index is the current minor displaying, 1-index is for major
    addedCourses: string,
    sections: { [id:string]: (string|string[])[] };
}

declare interface GESliceType{
    byIds: { [id:string]: GEType };
    allIds: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    sections: { [id:string]: string[] };
}

declare interface CourseSliceType {
    years: YearsType;
    sections: { [id:string]: string[] };
    totalUnits: number;
    courses: {
        [id:string]: {
            data: CourseType, 
            remains: number,
        }
    };
    depts: {
        byIds: { [id:string]: string[] }, 
        size: number,
    };
    takenGeCourses: { [id:string]: string[] };
    status: 'idle' | 'succeeded' | 'failed';
    isPrerequisiteCheck: boolean;
    pageLoading: 'idle' | 'succeeded' | 'failed';
}

declare interface VirtualCafeSliceType {
    background: BackgroundType;
    playlist: PlaylistType;
    allPlaylists: PlaylistType[];
    getPlaylistsStatus: 'idle' | 'succeeded' | 'failed';
    sharePlaylists: PlaylistType[];
    pageLoading: 'idle' | 'succeeded' | 'failed';
    time: VCTimeType;
}