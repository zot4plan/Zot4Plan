import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store';
import Popup from './Popup';
import { Draggable } from 'react-beautiful-dnd';
//import { removeCourseFromQuarter } from '../../features/ScheduleSlice'
//import Xmark from '../icons/Xmark';

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
    const id = courseId.substr(4);
    const isPicked = useSelector(
        (state: RootState) => state.requirement.courses.byIds[id].isPicked)
        
    //const dispatch = useDispatch();
    /*const submitRemoveCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
     
    }; */
  
    return (   
    <Draggable 
        key={courseId} 
        draggableId={courseId}
        isDragDisabled={isPicked} 
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
                <Popup id={id} showUnit={false} isCrossed ={isPicked}/>

            </div>
            {snapshot.isDragging && (
                <div className="card-box w">
                    <div className="courseId">{id}</div> 
                </div>
            )}
            </>
          )}
    </Draggable>
    )
}

export default ReqCourseCard