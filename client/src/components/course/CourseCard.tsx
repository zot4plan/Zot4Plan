//import { useSelector } from 'react-redux';
//import {RootState} from '../app/store';
import { MouseEvent, memo } from 'react';
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
    //const course = useSelector((state: RootState) => state.course.byId[id])

    const dispatch = useDispatch();
    console.log(id,index,droppableId);

    const submitRemoveCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
     
    };
  
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
                 <Popup id={id} showUnit={true} isCrossed={false}/>

                <div
                    className="xmark"    
                    onClick = {() => dispatch(
                    removeCourseFromQuarter({quarterId: droppableId,index: index,courseId:id 
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