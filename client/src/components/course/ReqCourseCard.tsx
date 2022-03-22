import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store';
import { MouseEvent } from 'react';
import Popup from './Popup';
import { Draggable } from 'react-beautiful-dnd';
import { removeCourseFromQuarter } from '../../features/ScheduleSlice'
import Xmark from '../icons/Xmark';

interface courseType {
    courseId: string;
    index: number;
}

function getStyle(style: any, snapshot: { isDropAnimating: any; }) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: '0.0001s',
    };
}

function ReqCourseCard({courseId, index}: courseType) {
    console.log(courseId.substr(4))
    const course = useSelector(
        (state: RootState) => state.requirement.courses.byIds[courseId.substr(4)])
        
    //const dispatch = useDispatch();
    /*const submitRemoveCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
     
    }; */
  
    return (   
    <Draggable 
        key={courseId} 
        draggableId={courseId}
        isDragDisabled={course.isPicked} 
        index={index}
    >
        {(provided, snapshot) => (
            <>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided.draggableProps.style, snapshot)}
                className="course-card w"
              >
                 <Popup id={course.id} showUnit={false} isCrossed ={course.isPicked}/>

              </div>
              {snapshot.isDragging && (
                    <div className="card-box w">
                        <div className="courseId">{course.id}</div> 
                    </div>
                )}
            </>
          )}
    </Draggable>
    )
}

export default ReqCourseCard