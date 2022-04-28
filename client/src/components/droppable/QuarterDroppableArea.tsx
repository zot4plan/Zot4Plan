import QuarterCourse from '../draggable/QuarterCourse';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import {useCallback,memo } from 'react'

function QuarterDroppableArea({droppableId, index}:QuarterType) {
  const courses = useSelector((state:RootState) => state.store.sectionCourses[droppableId]);

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
    <Droppable 
      droppableId={droppableId}
    >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        {...provided.droppableProps}
        style={{backgroundColor: snapshot.isDraggingOver?'lightblue':'white',
                borderRight: index < 3? '0.2rem solid var(--border-color)':''}}

        className={"quarter-droppable-area " 
                    + (index === 0? 'round-bottom-left' : '')
                    + (index === 3? 'round-bottom-right' : '')}
        >
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

export default memo(QuarterDroppableArea);