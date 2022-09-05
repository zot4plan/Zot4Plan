import QuarterCourse from '../course/QuarterCourse';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Droppable } from 'react-beautiful-dnd';
import { memo, useCallback } from 'react'

interface QuarterProps { 
    sectionId: string;
    name: string;
}

function Quarter({sectionId, name}:QuarterProps) {
    const courses = useSelector((state:RootState) => state.store.sections[sectionId]);
    const renderCard = useCallback (
        (id: string, sectionId: string, index: number) => (
            <QuarterCourse 
                key={id} 
                index={index} 
                sectionId={sectionId}
                courseId = {id}
            />
        ),[],);

    return (
        <Droppable droppableId={sectionId}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    {...provided.droppableProps}
                    style={{backgroundColor: snapshot.isDraggingOver?'lightblue':'white'}}
                    className={name + " quarter-droppable-area"}
                >
                    {courses.map((courseId, index) => renderCard(courseId, sectionId, index))}
                    {provided.placeholder}
                </div>
            )} 
        </Droppable>
    )
}

export default memo(Quarter);