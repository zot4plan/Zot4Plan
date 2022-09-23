import {memo, MouseEvent, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/store';
import { fetchCourse } from '../../api/FetchData';
import ReactTooltip from "react-tooltip";
import PopperUnstyled from '@mui/base/PopperUnstyled';
import QuarterCourseCard from './QuarterCourseCard';
import Error from '../icon/Error';

interface CourseButtonProps {
    courseId: string;
    sectionId: string;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

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

enum Requirement {
    Prerequisite = 1,
    Prerequisite_or_Corequisite = 2,
    Corequisite = 3
}

function getPastCourses(state: RootState, sectionId: string, option: Requirement) {
    const pastCourses = new Set<string> ();
    const currentCourses = new Set<string> ();
    const yearIds = state.store.years.allIds;

    let ended = false;
    for (let i = 0; i < yearIds.length && !ended; i++) {
        const yearId = yearIds[i];
        const quarterIds = state.store.years.byIds[yearId];

        for (let j = 0; j < quarterIds.length && !ended; j++) {
            if (quarterIds[j] === sectionId) { 
                if(option !== 1) {
                    state.store.sections[quarterIds[j]].forEach(course => currentCourses.add(course));
                }
                ended = true;
            } 
            else {
                state.store.sections[quarterIds[j]].forEach(course => pastCourses.add(course));
            }
        }
    }
    
    if (option === 1) {
        return pastCourses;
    }
    else if (option === 2) {
        currentCourses.forEach(course => pastCourses.add(course));
        return pastCourses;
    }
    else {
        return currentCourses;
    }
}

function QuarterCourseButton({courseId, sectionId}: CourseButtonProps) {
    const course = useSelector((state: RootState) => 
        state.store.courses[courseId] === undefined 
            ? null 
            : state.store.courses[courseId].data
    );

    const isFulfilled = useSelector((state: RootState) => {
        if (!course || !state.store.isPrerequisiteCheck) {
            return true;
        }

        let prerequisite = course['prerequisite_tree']
            ? checkFulfilled(
                course['prerequisite_tree'], 
                getPastCourses(state, sectionId, Requirement.Prerequisite))
            : course['prerequisite_or_corequisite_tree']
                ? checkFulfilled(
                    course['prerequisite_or_corequisite_tree'], 
                    getPastCourses(state, sectionId, Requirement.Prerequisite_or_Corequisite))
                : true;
        
        let corequisite = course['corequisite_tree']
            ? checkFulfilled(
                course['corequisite_tree'], 
                getPastCourses(state, sectionId, Requirement.Corequisite))
            : true;

        return prerequisite && corequisite;
    }); 

    const units = useSelector((state: RootState) => course ? state.store.courses[courseId].data.units : null);
    const colors = useSelector((state: RootState) => state.store.depts.byIds[removeLastWord(courseId)]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);
    const open = Boolean(anchorEl);
    const popperId = open ? ('popper' + sectionId + courseId) : undefined;

    const dispatch = useDispatch();

    useEffect(() => {  
        if(!course) 
            dispatch(fetchCourse(courseId));
    },[course, courseId, dispatch]); 

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };  

    let content;
    if (!isFulfilled) {
        content =  
            <span key='warning' className='course-warning' data-tip data-for='prereqTip'> 
                <Error/>
                <ReactTooltip 
                    id="prereqTip" 
                    place="top" 
                    effect="solid"
                    className="course-warning-tooltip"
                >
                    Missing prerequisite/corequisite
                </ReactTooltip>
            </span>                             
    }
    else if (units)
        content = <p key='unit' className='unit'> {units[1] + ' units'} </p>

    return ( 
        <>
            <div 
                className='course-btn'
                onClick={handleClick}
                style={{backgroundColor: colors[2]}}
            >   
                <p key='courseId' className='course-id'> {courseId} </p>
                {content}
            </div>

            <PopperUnstyled id={popperId} open={open} anchorEl={anchorEl}>
                <QuarterCourseCard id={courseId}/>
            </PopperUnstyled>
        </>
    )
}

export default memo(QuarterCourseButton)