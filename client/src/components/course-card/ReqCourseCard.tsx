import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store';
import Popup from './Popup';
import { Draggable } from 'react-beautiful-dnd';
import {memo, MouseEvent} from 'react'
import { deleteCourse } from '../../features/StoreSlice'
import Xmark from '../icons/Xmark';

interface courseType {
    droppableId: string;
    courseId: string;
    index: number;
}

const ADD_ID_LENGTH = 6;
const GE_ID_LENGTH = 5;

function getStyle(style: any, snapshot: { isDropAnimating: any; }) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: '0.0001s',
    };
}

function ReqCourseCard({courseId, droppableId, index}: courseType) {
    const repeatability = useSelector(
        (state: RootState) => state.store.courses.byIds[courseId].repeatability)

    let isDraggable = true;
    if(repeatability === 0)
        isDraggable = false;

    const dispatch = useDispatch();
    const removeCourse = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(deleteCourse({
            droppableId: droppableId,
            index: index,
            courseId: courseId
        }))
    }; 
  
    return (   
    <Draggable 
        key={droppableId + courseId} 
        draggableId={droppableId + courseId}
        isDragDisabled={!isDraggable} 
        index={index}
    >
        {(provided, snapshot) => (
            <>
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided.draggableProps.style, snapshot)}
                className="relative card w-125 mb-2 mr-2"
                >
                    <Popup id={courseId} showUnit={false} isCrossed ={!isDraggable}/>
                    {(droppableId.length === ADD_ID_LENGTH 
                     || droppableId.length === GE_ID_LENGTH) &&
                     <div
                        className="xmark"    
                        onClick = {removeCourse}>
                            <Xmark/>
                    </div>
                    }
            </div>
            {snapshot.isDragging && (
                <div className="h-36 w-125 mb-2 mr-2"/>
            )}    
            </>
        )}
    </Draggable>
    )
}

export default memo(ReqCourseCard)

/*
 <div
                        className="xmark"    
                        onClick = {() => dispatch(
                        removeCourseFromQuarter({quarterId: droppableId,index: index, courseId: courseId
                    }))}>
                        <Xmark/>
                </div> 
*/