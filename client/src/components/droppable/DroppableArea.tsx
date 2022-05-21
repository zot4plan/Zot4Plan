import RequiredCourse from '../draggable/RequiredCourse';
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
                    <RequiredCourse 
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
                        className='relative sub-droppable-area'
                    >
                        <RequiredCourse key={droppableId+c[0]} 
                            courseId={c[0]}
                            droppableId={droppableId} 
                            index={index}
                        />
                        <span className="absolute"> or </span>

                        <RequiredCourse key={droppableId+c[1]} 
                            courseId={c[1]}
                            droppableId={droppableId}
                            index={index+1}
                        />
                    </div>
                );
                index += 2;
            }
        })

    let p;
    if(text.length > 3 && text.substring(0,3) === "(b)") 
        p = <p key={droppableId +'p'}  style={{marginBottom:courseIds.length > 0? '0.5rem' : '1rem'}}> <b>{text.substring(3)}</b> </p>
    else if(text !== "")
        p = <p key={droppableId +'p'}  style={{marginBottom:courseIds.length > 0? '0.5rem' : '1rem'}}> {text}</p>

    return (
        <div>
            {p}

            <Droppable droppableId={droppableId}
                isDropDisabled={true}
            >
            {(provided) => (
                <div ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="droppable-area "
                    style={{marginBottom: courseIds.length > 0? '1.5rem' : '0rem'}}
                >
                    {courseCards}
                    <div style={{display:'none'}}> {provided.placeholder} </div>
                </div>
            )} 
            </Droppable>
        </div>
    )
}

export default memo(DroppableArea);