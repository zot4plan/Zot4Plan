import QuarterCourse from '../course/QuarterCourse';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import {useCallback,memo } from 'react'

function Quarter({sectionId, name}:QuarterType) {
  const courses = useSelector((state:RootState) => state.store.sections[sectionId]);
  const renderCard = useCallback((id: string, sectionId: string, index: number) => {
    return (
      <QuarterCourse 
        key={id} 
        index={index} 
        sectionId={sectionId}
        courseId = {id}
      />
    )},[])

  return (
    <Droppable droppableId={sectionId}>
      {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.droppableProps}
            style={{backgroundColor: snapshot.isDraggingOver?'lightblue':'white'}}
            className={name + " quarter-droppable-area"}>
              {courses.map(
                (courseId, index) => 
                  typeof(courseId) === 'string' && renderCard(courseId, sectionId, index)
              )}
              {provided.placeholder}
          </div>
      )} 
    </Droppable>
  )
}

export default memo(Quarter);