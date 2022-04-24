import { memo } from 'react';
import Popup from './CardPopup';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { removeCourseFromQuarter } from '../../features/StoreSlice'
import Xmark from '../icon/Xmark';

interface courseType {
    courseId: string;
    index: number;
    droppableId: string;
}

function CourseCard({index, droppableId, courseId}: courseType) {
    const dispatch = useDispatch();

    const removeCourse = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      dispatch(removeCourseFromQuarter({
          quarterId: droppableId,
          index: index, 
          courseId: courseId
      }))
    }; 
   
  
    return (   
    <Draggable key={droppableId + courseId} 
      draggableId={droppableId + courseId} index={index}
    >
      {(provided) => (
        <div>
          <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="course-card"
          >
            <Popup id={courseId} 
              showUnit={true} 
              isCrossed={false}
            />

            <button className="remove-course-btn" onClick = {removeCourse}>
              <Xmark/>
            </button>

          </div>
        </div>
      )}
    </Draggable>
    )
}

export default memo(CourseCard)