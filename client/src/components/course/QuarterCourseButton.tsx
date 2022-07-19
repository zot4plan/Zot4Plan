import { memo, MouseEvent, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../app/store';
import ReactTooltip from "react-tooltip";
import PopperUnstyled from '@mui/base/PopperUnstyled';
import QuarterCourseCard from './QuarterCourseCard';
import Error from '../icon/Error';
import { fetchCourse } from '../../api/FetchData';

interface CourseButtonType {
    courseId: string;
    sectionId: string;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function checkPrereqs(prereqs: any, taken:Set<string>) {
    if (Object.keys(prereqs).length === 0) return true          // No prereqs
  
    const key = Object.keys(prereqs)[0];
    const reqArray = prereqs[key]
  
    if (key === 'AND') {
        for (let i = 0; i < reqArray.length; i++) {
            const req = reqArray[i]
            if (typeof(req) === 'string') {
                if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('PLACEMENT')) continue     // Treat those requirements as fulfilled
                if (!taken.has(req)) return false                                                    // Missing a required class in AND
            } else {
                if (!checkPrereqs(req, taken)) {
                    return false                                                 // Prereq tree inside AND not fulfilled
                }
            }
        }
      return true                                                       // Everything fulfilled
  
    } else {  
        for (let i = 0; i < reqArray.length; i++) {
            const req = reqArray[i]
            if (typeof(req) === 'string') { 
                if (req.includes('AP') || req.includes('ACT') || req.includes('SAT') || req.includes('PLACEMENT')) return true     // Treat those requirements as fulfilled
                if (taken.has(req)) return true                               // Taken a class in OR
            } else {
                if (checkPrereqs(req, taken)) {
                    return true                                                 // Prereq tree fulfilled in OR
                }
            }
        }
      return false                                                      // Nothing fulfilled
    }
}

function QuarterCourseButton({courseId, sectionId}: CourseButtonType) {
    const course = useSelector((state: RootState) => {
        const course = state.store.courses[courseId];
        return course === undefined? null : course.data;
    })

    const prereqsFulfilled = useSelector((state:RootState) => {
        if(!course) return true;

        const pastCourses: string[] = [];
        const yearIds = state.store.years.allIds
        let ended = false
        for (let i = 0; i < yearIds.length; i++) {
            const yearId = yearIds[i]
            const quarterIds = state.store.years.byIds[yearId]
            for (let j = 0; j < quarterIds.length; j++) {
                if (quarterIds[j] === sectionId) {
                    ended = true
                    break
                } else {
                    pastCourses.push(...state.store.sections[quarterIds[j]])
                }
            }
            if (ended) {
                break
            }
        }
    
        const pastCoursesSet = new Set<string>(pastCourses)
    
        let prereqs = course['prerequisite_tree']
        prereqs = prereqs.replace(/'/g, '"')                                               // Replacing with double quotes to use JSON.parse
        if (prereqs === '') {
            prereqs = '{}'
        }
        prereqs = JSON.parse(prereqs)
    
        return checkPrereqs(prereqs, pastCoursesSet)
    })
    const units = useSelector((state: RootState) => state.store.courses[courseId] === undefined? null : state.store.courses[courseId].data.units);
    const colors = useSelector((state: RootState) => state.store.depts.byIds[removeLastWord(courseId)]);
    const dispatch = useDispatch();

    useEffect(() => {  
        if(!course) {
            dispatch(fetchCourse(courseId));
        }
    },[course]); 

    let content;
    if (!prereqsFulfilled) {
        content =  
            <span key={"warning" + courseId} className='course-warning' data-tip data-for='prereqTip'> 
                <Error/>
                <ReactTooltip id="prereqTip" place="top" effect="solid">
                    Missing prerequisites
                </ReactTooltip>
            </span>                             
    }
    else if (units)
        content = <p key={"unit"} className='unit'> {units + ' units'} </p>

    const [anchorEl, setAnchorEl] = useState< HTMLElement|null >(null);
    
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl? null : event.currentTarget);
    };  
    
    const open = Boolean(anchorEl);
    const popperId = open ? 'simple-popper' : undefined;

    return ( 
        <div className="course-btn"
            onClick={handleClick}
            style={{backgroundColor: colors[2]}}
        >   
            <p key={"course-" + courseId} className='course-id' > 
                {courseId}
            </p>

            {content}

            <PopperUnstyled id={popperId} open={open} anchorEl={anchorEl}>
                <QuarterCourseCard id={courseId}/>
            </PopperUnstyled>
        </div>
    )
}

export default memo(QuarterCourseButton)