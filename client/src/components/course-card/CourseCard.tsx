import { memo, MouseEvent } from 'react';
import Popup from './Popup';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { removeCourseFromQuarter } from '../../features/StoreSlice'
import Xmark from '../icons/Xmark';

interface courseType {
    courseId: string;
    index: number;
    droppableId: string;
}

function CourseCard({index, droppableId, courseId}: courseType) {
    const dispatch = useDispatch();

    const removeCourse = (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
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
            className="relative card m-02"
          >
            <Popup id={courseId} 
              showUnit={true} 
              isCrossed={false}
            />

            <div className="xmark"    
              onClick = {removeCourse}
            >
              <Xmark/>
            </div>

          </div>
        </div>
      )}
    </Draggable>
    )
}

export default memo(CourseCard)