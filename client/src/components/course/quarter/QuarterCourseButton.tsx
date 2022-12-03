import { memo, MouseEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { getCourse } from '../../../controllers/HomeController';
import ReactTooltip from "react-tooltip";
import PopperUnstyled from '@mui/base/PopperUnstyled';
import QuarterCourseCard from './QuarterCourseCard';
import Error from '../../icon/Error';
import { getDeptFromCourse } from '../../../helpers/helpers';
import { IsPrerequisite } from './hooks/IsPrerequisite';

interface CourseButtonProps {
    courseId: string;
    sectionId: string;
}

function QuarterCourseButton({courseId, sectionId}: CourseButtonProps) {
    const course = useSelector((state: RootState) => 
        state.course.courses[courseId] === undefined 
            ? null 
            : state.course.courses[courseId].data
    );
    const units = useSelector((state: RootState) => course ? state.course.courses[courseId].data.units : null);
    const colors = useSelector((state: RootState) => state.course.depts.byIds[getDeptFromCourse(courseId)]);

    const isFulfilled = IsPrerequisite(course, sectionId);

    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);
    const open = Boolean(anchorEl);
    const popperId = open ? ('popper' + sectionId + courseId) : undefined;

    const dispatch = useDispatch();

    useEffect(() => {  
        if(!course) 
            dispatch(getCourse(courseId));
    },[course, courseId, dispatch]); 

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };  

    return ( 
        <>
            <div 
                className='course-btn'
                onClick={handleClick}
                style={{backgroundColor: colors[2]}}
            >   
                <p key='courseId' className='course-id'> {courseId} </p>
                {isFulfilled
                ? units
                    ? <p key='unit' className='unit'> {units[1] + ' units'} </p>
                    : <></>
                : <span key='warning' className='course-warning' data-tip data-for='prereqTip'> 
                    <Error/>
                    <ReactTooltip 
                        id="prereqTip" 
                        place="top" 
                        effect="solid"
                        className="course-warning-tooltip"
                    >
                        Missing prerequisite/corequisite
                    </ReactTooltip>
                </span>}
            </div>

            <PopperUnstyled id={popperId} open={open} anchorEl={anchorEl}>
                <QuarterCourseCard id={courseId}/>
            </PopperUnstyled>
        </>
    )
}

export default memo(QuarterCourseButton)