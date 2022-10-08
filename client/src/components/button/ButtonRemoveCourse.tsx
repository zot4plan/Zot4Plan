import {memo, MouseEvent} from 'react';
import { useDispatch } from 'react-redux';
import { removeCourse } from '../../store/slices/ProgramsSlice';
import { removeCourseQuarter } from '../../store/slices/CourseSlice';
import Xmark from '../icon/Xmark';
import './ButtonRemoveCourse.css';

function ButtonRemoveCourse({courseId, sectionId, index}: CoursePayload) {
    const dispatch = useDispatch();
    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        
        if(sectionId.length === 3)
            dispatch(removeCourseQuarter({
                sectionId: sectionId,
                index: index,
                courseId: courseId
            }))
        else
            dispatch(removeCourse({
                sectionId: sectionId,
                index: index,
                courseId: courseId
            }))
    }; 
  
    return (      
        <button className='remove-course-btn' onClick={handleOnClick}>
            <Xmark/>
        </button>
    )
}

export default memo(ButtonRemoveCourse)

