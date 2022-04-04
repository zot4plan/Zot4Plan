import CourseCard from '../course-card/CourseCard';
import {useSelector} from 'react-redux';
import {RootState} from './../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import {useCallback,memo } from 'react'

interface quarter { 
  droppableId: string;
  index: number;
}

function Quarter({droppableId, index}:quarter) {
  const courses = useSelector((state:RootState) => state.store.sections[droppableId]);

  const renderCard = useCallback(
      (id: string, droppableId: string, index: number) => {
        return (
          <CourseCard 
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
        style={{backgroundColor: snapshot.isDraggingOver?'lightblue':'white'}}
        className={"flex-basis-25 mh-76 " 
                    + (index < 3? 'bd-r ':'')
                    + (index === 0? 'round-bottom-left' : '')
                    + (index === 3? 'round-bottom-right' : '')}
        >
          {courses.map(
            (courseId , index) => 
              typeof(courseId) === 'string' 
              &&  renderCard(courseId, droppableId, index)
          )}
          {provided.placeholder}
      </div>
    )} 
    </Droppable>
  )
}

export default memo(Quarter);