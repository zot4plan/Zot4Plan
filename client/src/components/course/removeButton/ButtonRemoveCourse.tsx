import {memo, MouseEvent} from 'react';
import { useDispatch } from 'react-redux';
import { removeCourse } from '../../../store/slices/ProgramsSlice';
import { removeCourseQuarter } from '../../../store/slices/CourseSlice';
import { ID_LENGTH } from '../../../constants/Constants';
import Xmark from '../../icon/Xmark';
import './ButtonRemoveCourse.css';

function ButtonRemoveCourse({courseId, sectionId, index}: CoursePayload) {
    const dispatch = useDispatch();
    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        
        if(sectionId.length === ID_LENGTH.QUARTER)
            dispatch(removeCourseQuarter({
                sectionId: sectionId,
                index: index,
                courseId: courseId
            }))
        else if(sectionId.length === ID_LENGTH.ADD_COURSES)
            dispatch(removeCourse({
                sectionId: sectionId,
                index: index,
                courseId: courseId
            }))
    }; 
  
    return (      
        <button className='remove-btn' onClick={handleOnClick}>
            <Xmark/>
        </button>
    )
}

export default memo(ButtonRemoveCourse)

