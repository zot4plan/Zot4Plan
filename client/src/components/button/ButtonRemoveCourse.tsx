import {memo} from 'react';
import { useDispatch } from 'react-redux';
import { removeCourse } from '../../features/ProgramsSlice';
import { removeCourseQuarter } from '../../features/StoreSlice';
import Xmark from '../icon/Xmark';
import './ButtonRemoveCourse.css';

function ButtonRemoveCourse({courseId, sectionId, index}: CoursePayload) {
    const dispatch = useDispatch();
    const handleOnClick = (e: { preventDefault: () => void; }) => {
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
        <button className="remove-course-btn" onClick={handleOnClick}>
            <Xmark/>
        </button>
    )
}

export default memo(ButtonRemoveCourse)

