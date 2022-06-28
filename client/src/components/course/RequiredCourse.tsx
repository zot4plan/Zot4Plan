import {memo} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';
import CourseButton from './CourseButton';
import ButtonRemoveCourse from '../button/ButtonRemoveCourse';
import './Course.css';

function getStyle(style: any, snapshot: { isDropAnimating: any; }) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: '0.0001s',
    };
}

function RequiredCourse({courseId, sectionId, index}: CoursePayload) {
    //console.log(courseId);
    const isDraggable = useSelector((state: RootState) => state.store.courses.byIds[courseId].remains > 0)
  
    return (   
        <Draggable key={sectionId + courseId} 
            draggableId={sectionId + courseId}
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
                            isCrossed={!isDraggable}
                            isWarning={false}
                        />

                        {/* Only courses add by students are removable */}
                        {sectionId.length === 5 && 
                            <ButtonRemoveCourse courseId={courseId} sectionId={sectionId} index={index}/>}
                </div>

                {snapshot.isDragging && (<div className="required-course"/>)}    
                </>
            )}
        </Draggable>
    )
}

export default memo(RequiredCourse)

