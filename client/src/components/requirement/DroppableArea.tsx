import ReqCourseCard from '../course-card/ReqCourseCard';
import {Droppable} from 'react-beautiful-dnd';
import {memo} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface DroppableAreaType {
    text: string;
    droppableId: string;
}

function DroppableArea({droppableId, text}:DroppableAreaType) {
    const courseIds = useSelector((state:RootState)=> state.store.sectionCourses[droppableId])
    let courseCards: JSX.Element[] = [];
    let index = 0;

    if(courseIds !== undefined)
    courseIds.forEach((c) => {
        if(typeof(c) === 'string') {
            courseCards.push(
                <ReqCourseCard 
                    key={droppableId+c} 
                    courseId={c}
                    droppableId={droppableId}
                    index={index}/>
            )
            index++;
        }
        else {
            courseCards.push(
                <div 
                    key={droppableId + 'div' + index} 
                    className='flex justify-center item-center flex-basis-100'
                >
                    <ReqCourseCard 
                        key={droppableId+c[0]} 
                        courseId={c[0]}
                        droppableId = {droppableId} 
                        index={index}/>
                    <span style={{paddingRight:'1rem', paddingBottom:'0.5rem'}}> or </span>
                    <ReqCourseCard 
                        key={droppableId+c[1]} 
                        courseId={c[1]}
                        droppableId={droppableId}
                        index={index+1}/>
                </div>
            );
            index += 2;
        }
    })

    return (
        <>
        {text !== "" && <p key={droppableId +'p'} 
                            style={{margin:'0.5rem 1rem'}}> {text} </p>}
        <Droppable 
            droppableId={droppableId}
            isDropDisabled={true}
        >
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap mr-1 ml-1"
            >
                {courseCards}
                <div style={{display:'none'}}>{provided.placeholder} </div>
            </div>
        )} 
        </Droppable>
        </>
    )
}

export default memo(DroppableArea);