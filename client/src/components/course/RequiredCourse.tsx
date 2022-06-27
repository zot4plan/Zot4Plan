import {memo} from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store';
import { deleteCourse } from '../../features/StoreSlice';

import CourseButton from './CourseButton';
import Xmark from '../icon/Xmark';

import './Course.css';

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

function RequiredCourse({courseId, droppableId, index}: courseType) {
    //console.log(courseId);
    const isDraggable = useSelector((state: RootState) => state.store.courses.byIds[courseId].remains > 0)

    const dispatch = useDispatch();
    const removeCourse = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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
                    className="relative required-course"
                    >
                        <CourseButton id={courseId} 
                            showUnit={false} 
                            isCrossed ={!isDraggable}
                            isWarning ={false}
                        />

                        {/* Only courses add by students are removable */}
                        {droppableId.length > MAJOR_ID_LENGTH && 
                            <button className="remove-course-btn" onClick = {removeCourse}>
                                <Xmark/>
                            </button>
                        }
                </div>

                {snapshot.isDragging && (<div className="required-course"/>)}    
                </>
            )}
        </Draggable>
    )
}

export default memo(RequiredCourse)

