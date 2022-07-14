import QuarterCourse from '../course/QuarterCourse';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import {memo} from 'react'

function Quarter({sectionId, name}:QuarterType) {
  const courses = useSelector((state:RootState) => (state.store.sections[sectionId]),shallowEqual);

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
              {courses.map((id, index) => 
                  <QuarterCourse 
                    key={id} 
                    index={index} 
                    sectionId={sectionId}
                    courseId = {id}
                  />
              )}
              {provided.placeholder}
          </div>
      )} 
    </Droppable>
  )
}

export default memo(Quarter);