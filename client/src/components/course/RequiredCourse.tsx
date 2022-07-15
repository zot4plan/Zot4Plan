import {memo} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';
import CourseButton from './CourseButton';
import ButtonRemoveCourse from '../button/ButtonRemoveCourse';
import './Course.css';

function getStyle(style: any, snapshot: { isDragging: any; isDropAnimating: any;}) {
    if (!snapshot.isDropAnimating) 
        return {...style, transform: snapshot.isDragging ? style?.transform : 'translate(0px, 0px)'};
    
    return {
        ...style,
        transform: snapshot.isDragging ? style?.transform : 'translate(0px, 0px)',
        transitionDuration: '0.0001s',
    };
}

function RequiredCourse({courseId, sectionId, index}: CoursePayload) {
    const isDraggable = useSelector((state: RootState) => state.store.courses[courseId] === undefined);
    const showUnit = false;
    const isWarning = false;
  
    return (   
        <Draggable 
            key={sectionId + courseId} 
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
                        sectionId={sectionId}
                        showUnit={showUnit} 
                        isCrossed={!isDraggable}
                        isWarning={isWarning}
                    />

                    {/* Only courses add by students are removable */}
                    {sectionId.length === 6 && 
                        <ButtonRemoveCourse courseId={courseId} sectionId={sectionId} index={index}/>}
                </div>

                {snapshot.isDragging && (<div className="required-course" style={{ transform: 'none !important' }}/>)}    
                </>
            )}
        </Draggable>
    )
}

export default memo(RequiredCourse)

