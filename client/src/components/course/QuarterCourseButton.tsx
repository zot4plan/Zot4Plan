import {memo, MouseEvent, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/store';
import { fetchCourse } from '../../api/FetchData';
//import ReactTooltip from "react-tooltip";
import PopperUnstyled from '@mui/base/PopperUnstyled';
import QuarterCourseCard from './QuarterCourseCard';
//import Error from '../icon/Error';

interface CourseButtonProps {
    courseId: string;
    sectionId: string;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}
/*
function checkPrereqs(prereqs: any, taken:Set<string>) {
    if (Object.keys(prereqs).length === 0) return true; // No prereqs
  
    const key = Object.keys(prereqs)[0];
    const reqArray = prereqs[key];
  
    if (key === 'AND') {
        for (let i = 0; i < reqArray.length; i++) {
            const req = reqArray[i];
            
            if (typeof(req) === 'string') {
                // Treat those requirements as fulfilled
                if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('PLACEMENT'))
                    continue;
                
                // Missing a required class in AND
                if (!taken.has(req)) 
                    return false;                                                  
            } 
            else if (!checkPrereqs(req, taken)) // Prereq tree inside AND not fulfilled
                return false;                                           
        }

        return true; // Everything fulfilled                                                   
    }
    
    for (let i = 0; i < reqArray.length; i++) {
        const req = reqArray[i];

        if (typeof(req) === 'string') { 
            // Treat those requirements as fulfilled or Taken a class in OR
            if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('PLACEMENT') || taken.has(req)) 
                return true;                  
        } 
        else if (checkPrereqs(req, taken)) // Prereq tree fulfilled in OR
            return true;                                               
    }

    return false; // Nothing fulfilled                                                  
}

function getPastCourses(state: RootState, sectionId: string) {
    const pastCourses = new Set<string> ();
    const yearIds = state.store.years.allIds;
    let ended = false;

    for (let i = 0; i < yearIds.length && !ended; i++) {
        const yearId = yearIds[i];
        const quarterIds = state.store.years.byIds[yearId];

        for (let j = 0; j < quarterIds.length; j++) {
            if (quarterIds[j] === sectionId) { 
                ended = true;
                break;
            }     
            state.store.sections[quarterIds[j]].forEach(course => pastCourses.add(course));
        }
    }
    
    return pastCourses;
}
*/

function QuarterCourseButton({courseId, sectionId}: CourseButtonProps) {
    const course = useSelector((state: RootState) => 
        state.store.courses[courseId] === undefined? null : state.store.courses[courseId].data
    );

   /* const prereqsFulfilled = useSelector((state: RootState) => {
        if(!course) 
            return true;    
        let prereqs = course['prerequisite_tree'].replace(/'/g, '"'); // Replacing with double quotes to use JSON.parse
        return prereqs === ''? true : checkPrereqs(JSON.parse(prereqs), getPastCourses(state, sectionId));
    }); 
    */

    const units = useSelector((state: RootState) => course? state.store.courses[courseId].data.units : null);
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
        setAnchorEl(anchorEl? null : event.currentTarget);
    };  

    let content;

    /*if (!prereqsFulfilled) {
        content =  
            <span key='warning' className='course-warning' data-tip data-for='prereqTip'> 
                <Error/>
                <ReactTooltip id="prereqTip" place="top" effect="solid">
                    Missing prerequisites
                </ReactTooltip>
            </span>                             
    }
    else */
    if (units)
        content = <p key='unit' className='unit'> {units[1] + ' units'} </p>

    return ( 
        <>
            <div className='course-btn'
                onClick={handleClick}
                style={{backgroundColor: colors[2]}}
            >   
                <p key='courseId' className='course-id' > 
                    {courseId}
                </p>

                {content}
            </div>

            <PopperUnstyled id={popperId} open={open} anchorEl={anchorEl}>
                <QuarterCourseCard id={courseId}/>
            </PopperUnstyled>
        </>
    )
}

export default memo(QuarterCourseButton)