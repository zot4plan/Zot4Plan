import { memo } from 'react';
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
    const showUnit = droppableId.length === 3;

    /*const submitRemoveCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();     
    }; */
  
    return (   
    <Draggable key={droppableId + courseId} draggableId={droppableId + courseId} index={index}>
        {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="course-card m-02"
              >
                 <Popup id={courseId} showUnit={showUnit} isCrossed={false}/>

                <div
                    className="xmark"    
                    onClick = {() => dispatch(
                    removeCourseFromQuarter({quarterId: droppableId,index: index, courseId: courseId
                }))}>
                    <Xmark/>
                </div>
              </div>
            </div>
          )}
    </Draggable>
    )
}

export default memo(CourseCard)