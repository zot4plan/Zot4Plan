import CourseCard from '../course/CourseCard';
import { useSelector} from 'react-redux';
import {RootState} from './../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import { useCallback,memo } from 'react'

interface quarter {
    id: string;
    index: number;
}

export interface Item {
    id: number
    text: string
  }
  
  export interface ContainerState {
    cards: Item[]
  }

function Quarter({id,index}:quarter) {
    const quarter = useSelector((state:RootState)=>state.shedule.quarters[id]);
    console.log(quarter)

    const renderCard = useCallback(
        ( id: string, droppableId: string, index: number) => {
          return (
            <CourseCard 
                key={id} 
                id={droppableId + id} 
                index={index} 
                droppableId={droppableId}
            />
          )
        },
        [],
      )

    return (
        <div className="quarter-column">
            <h2 className="quarter-header"> 
                {quarter.name} 
            </h2>
            <Droppable 
              droppableId={id}
            >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver? 'lightblue' : 'white',
                }}
                {...provided.droppableProps}
                className="course-wrapper"
              >
                  {quarter.courses.map(
                    (course,index) => renderCard(course,id, index)
                  )}
                  {provided.placeholder}
              </div>
            )} 
            </Droppable>
        </div>
    )
}

export default memo(Quarter);