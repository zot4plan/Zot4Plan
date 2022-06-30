import {memo} from 'react';
import { useDispatch } from 'react-redux';
import { removeCourse } from '../../features/StoreSlice';
import Xmark from '../icon/Xmark';
import './ButtonRemoveCourse.css';

function ButtonRemoveCourse({courseId, sectionId, index}: CoursePayload) {
    console.log(sectionId);
    const dispatch = useDispatch();
    const handleOnClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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

