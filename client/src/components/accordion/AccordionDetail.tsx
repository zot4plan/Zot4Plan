import RequiredCourse from '../course/RequiredCourse';
import {Droppable} from 'react-beautiful-dnd';
import {memo} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface AccordionDetailType {
    text: string;
    sectionId: string;
}

function AccordionDetail ({sectionId, text}:AccordionDetailType) {
    const courseIds = useSelector((state:RootState)=> state.store.sections[sectionId])
    let courseCards: JSX.Element[] = [];
    let index = 0;

    if(courseIds !== undefined)
        courseIds.forEach((c) => {
            if(typeof(c) === 'string') {
                courseCards.push(
                    <RequiredCourse 
                        key={sectionId+c} 
                        courseId={c}
                        sectionId={sectionId}
                        index={index}/>
                )
                index++;
            }
            else {
                courseCards.push(
                    <div 
                        key={sectionId + 'div' + index} 
                        className='relative sub-area'
                    >
                        <RequiredCourse key={sectionId+c[0]} 
                            courseId={c[0]}
                            sectionId={sectionId} 
                            index={index}
                        />
                        <span className="absolute"> or </span>

                        <RequiredCourse key={sectionId+c[1]} 
                            courseId={c[1]}
                            sectionId={sectionId}
                            index={index+1}
                        />
                    </div>
                );
                index += 2;
            }
        })

    let p;
    if(text.length > 3 && text.substring(0,3) === "(b)") 
        p = <p key={sectionId +'p'}  style={{marginBottom:courseIds.length > 0? '0.5rem' : '1rem'}}> <b>{text.substring(3)}</b> </p>
    else if(text !== "")
        p = <p key={sectionId +'p'}  style={{marginBottom:courseIds.length > 0? '0.5rem' : '1rem'}}> {text}</p>

    return (
        <div>
            {p}
            <Droppable droppableId={sectionId}
                isDropDisabled={true}
            >
            {(provided) => (
                <div ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="accordion-detail"
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

export default memo(AccordionDetail);