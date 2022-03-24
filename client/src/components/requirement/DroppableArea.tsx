import ReqCourseCard from '../course/ReqCourseCard';
import {Droppable} from 'react-beautiful-dnd';
import { useCallback } from 'react'

interface DroppableAreaType {
    courseIds: string[];
    droppableId: string;
}

function DroppableArea({courseIds, droppableId}:DroppableAreaType) {
    const renderCard = useCallback(
        ( courseId: string, droppableId: string, index: number) => {
          return (
            <ReqCourseCard 
                key={courseId}
                courseId={courseId}
                droppableId={droppableId}
                index={index}
            />
          )
        },
        [],
      )

    return (
        <Droppable 
            droppableId={droppableId}
            isDropDisabled={true}
        >
        {(provided, snapshot) => (
            <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="requirement-drop-wrapper"
            >
                {courseIds.map(
                    (courseId,index) => renderCard(courseId, droppableId, index)
                )}

                <div style={{display:'none'}}>{provided.placeholder} </div>
            </div>
        )} 
        </Droppable>
    )
}

export default DroppableArea;