//import { useSelector } from 'react-redux';
//import {RootState} from '../app/store';
import { memo } from 'react';
import Popup from './Popup';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { removeCourseFromQuarter } from '../../features/ScheduleSlice'
import Xmark from '../icons/Xmark';

interface courseType {
    id: string;
    index: number;
    droppableId: string;
}

interface DragItem {
    index: number;
    id: string;
    quarter: string;
  }

function CourseCard({id, index, droppableId}: courseType) {
    const dispatch = useDispatch();
    
    /*const submitRemoveCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
     
    }; */
  
    return (   
    <Draggable key={id} draggableId={id} index={index}>
        {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="course-card"
              >
                 <Popup id={id.substring(4)} showUnit={true} isCrossed={false}/>

                <div
                    className="xmark"    
                    onClick = {() => dispatch(
                    removeCourseFromQuarter({quarterId: droppableId,index: index,courseId:id.substring(4) 
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