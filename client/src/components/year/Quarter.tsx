import CourseCard from '../course/CourseCard';
import { useSelector} from 'react-redux';
import {RootState} from './../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import { useCallback,memo } from 'react'

interface quarter { 
  droppableId: string;
}

function Quarter({droppableId}:quarter) {
    const quarter = useSelector((state:RootState)=>state.store.quarters[droppableId]);
    console.log(quarter)

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
        <div className="quarter-column">
            <h2 className="quarter-header"> 
                {quarter.name} 
            </h2>

            <Droppable 
              droppableId={droppableId}
            >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.droppableProps}
                style={{ backgroundColor: snapshot.isDraggingOver? 'lightblue' : 'white'}}
                className="course-wrapper"
                >
                  {quarter.courses.map(
                    (courseId , index) => renderCard(courseId, droppableId, index)
                  )}
                  {provided.placeholder}
              </div>
            )} 
            </Droppable>
        </div>
    )
}

export default memo(Quarter);