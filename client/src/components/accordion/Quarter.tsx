import QuarterCourse from '../course/QuarterCourse';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import {useCallback,memo } from 'react'

function Quarter({droppableId, quarterName}:QuarterType) {
  const courses = useSelector((state:RootState) => state.store.sections[droppableId]);

  const renderCard = useCallback(
      (id: string, droppableId: string, index: number) => {
        return (
          <QuarterCourse 
              key={id} 
              index={index} 
              droppableId={droppableId}
              courseId = {id}
          />
        )
      },[],
  )

  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.droppableProps}
            style={{backgroundColor: snapshot.isDraggingOver?'lightblue':'white'}}
            className={quarterName + " quarter-droppable-area"}>
              {courses.map(
                (courseId, index) => 
                  typeof(courseId) === 'string' && renderCard(courseId, droppableId, index)
              )}
              {provided.placeholder}
          </div>
      )} 
    </Droppable>
  )
}

export default memo(Quarter);