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

const MAJOR_ID_LENGTH = 4;

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
        dispatch(deleteCourse({
            droppableId: droppableId,
            index: index,
            courseId: courseId
        }))
    }; 
  
    return (   
    <Draggable key={droppableId + courseId} 
        draggableId={droppableId + courseId}
        isDragDisabled={!isDraggable} 
        index={index}
    >
        {(provided, snapshot) => (
            <>
            <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided.draggableProps.style, snapshot)}
                className="relative card w-125"
                >
                    <Popup id={courseId} 
                        showUnit={false} 
                        isCrossed ={!isDraggable}
                    />

                    {droppableId.length > MAJOR_ID_LENGTH && 
                        <div className="xmark"    
                            onClick = {removeCourse}>
                                <Xmark/>
                        </div>
                    }
            </div>

            {snapshot.isDragging && (<div className="h-36 w-125"/>)}    
            </>
        )}
    </Draggable>
    )
}

export default memo(ReqCourseCard)

