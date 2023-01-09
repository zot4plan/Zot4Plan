import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

function checkFulfilled(prereqs: any, taken:Set<string>) {
    if (Object.keys(prereqs).length === 0) {
        return true; 
    }
  
    const key = Object.keys(prereqs)[0];
    const reqArray = prereqs[key];
  
    if (key === 'and') {
        for (let i = 0; i < reqArray.length; i++) {
            const req = reqArray[i];       
            if (typeof(req) === 'string') {
                // Treat those requirements as fulfilled
                if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('Placement')) {
                    continue;
                }            
                // Missing a required class in AND
                if (!taken.has(req)) {
                    return false;     
                }                                             
            } 
            // Prereq tree inside AND not fulfilled
            else if (!checkFulfilled(req, taken)) {
                return false;                      
            }                     
        }                                             
    }
    else {
        for (let i = 0; i < reqArray.length; i++) {
            const req = reqArray[i];
            if (typeof(req) === 'string') { 
                if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('Placement') || taken.has(req)) {
                    return true;                  
                }
            } 
            // Prereq tree fulfilled in OR
            else if (checkFulfilled(req, taken)) {
                return true;
            }                                               
        }
    }
    return key === 'and';                                                  
}

function getPastCourses(state: RootState, sectionId: string, isGetCurrentCourse: boolean) {
    const pastCourses = new Set<string> (Object.keys(state.course.apExamCourses));
    const yearIds = state.course.years.allIds;

    let ended = false;
    for (let i = 0; i < yearIds.length && !ended; i++) {
        const yearId = yearIds[i];
        const quarterIds = state.course.years.byIds[yearId];

        for (let j = 0; j < quarterIds.length && !ended; j++) {
            if (quarterIds[j] === sectionId) { 
                if(isGetCurrentCourse) {
                    state.course.sections[quarterIds[j]].forEach(course => pastCourses.add(course));
                }
                ended = true;
            } 
            else {
                state.course.sections[quarterIds[j]].forEach(course => pastCourses.add(course));
            }
        }
    }
     
    return pastCourses;
}

export function IsPrerequisite(
    course: CourseType | null, 
    sectionId: string
    ) {
    return useSelector((state: RootState) => {
        if (!course || !state.course.isPrerequisiteCheck) {
            return true;
        }

        let isPrerequisitePass = course['prerequisite_tree']
            ? checkFulfilled(
                course['prerequisite_tree'], 
                getPastCourses(state, sectionId, false))
            : course['prerequisite_or_corequisite_tree']
                ? checkFulfilled(
                    course['prerequisite_or_corequisite_tree'], 
                    getPastCourses(state, sectionId, true))
                : true;
        
        let isCorequisitePass = course['corequisite_tree']
            ? checkFulfilled(
                course['corequisite_tree'], 
                getPastCourses(state, sectionId, true))
            : true;

        return isPrerequisitePass && isCorequisitePass;
    }); 
}