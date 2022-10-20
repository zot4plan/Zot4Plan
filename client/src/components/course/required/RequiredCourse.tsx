import {memo, MouseEvent} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {RootState} from '../../../store/store';
import RequiredCourseButton from './RequiredCourseButton';
import ButtonRemoveCourse from '../removeButton/ButtonRemoveCourse';
import { ID_LENGTH } from '../../../store/constants/Constants';
import '../Course.css';

function getStyle(style: any, snapshot: {isDropAnimating: any;}) {
    if (!snapshot.isDropAnimating) 
        return style;
    
    return {
        ...style,
        transitionDuration: '0.0001s',
    };
}

interface RequiredCourseType {
    courseId: string;
    sectionId: string;
    index: number;
    handleClick: (event: MouseEvent<HTMLElement>) => void;
}

function RequiredCourse({courseId, sectionId, index, handleClick}: RequiredCourseType) {
    const isDraggable = useSelector((state: RootState) =>{ 
        let course = state.course.courses[courseId];
        
        return course === undefined? true : course.remains > 0;
    });

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
                    data-value={courseId}
                    onClick={handleClick}
                >
                    <RequiredCourseButton
                        id={courseId} 
                        isCrossed={!isDraggable}
                    />

                    {/* Only courses add by students are removable */}
                    {sectionId.length === ID_LENGTH.ADD_COURSES && 
                        <ButtonRemoveCourse courseId={courseId} sectionId={sectionId} index={index}/>}
                </div>

                {snapshot.isDragging && (<div className="required-course"/>)}    
                </>
            )}
        </Draggable>
    )
}

export default memo(RequiredCourse)

