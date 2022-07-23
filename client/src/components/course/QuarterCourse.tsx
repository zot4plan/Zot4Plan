import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ButtonRemoveCourse from '../button/ButtonRemoveCourse';
import QuarterCourseButton from './QuarterCourseButton';
import './Course.css';

interface QuarterCourseProps {
    index: number;
    sectionId: string;
    courseId: string;
}

function QuarterCourse({index, sectionId, courseId}: QuarterCourseProps) {
    return (  
        <Draggable 
            key={sectionId + courseId} 
            draggableId={sectionId + courseId} 
            index={index}
        >
            {(provided) => (
                <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative quarter-course"
                >
                    <QuarterCourseButton 
                        courseId={courseId} 
                        sectionId={sectionId}
                    />

                    <ButtonRemoveCourse 
                        courseId={courseId} 
                        sectionId={sectionId} 
                        index={index}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default memo(QuarterCourse)