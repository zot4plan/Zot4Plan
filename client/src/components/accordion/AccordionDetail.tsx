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
        courseIds.forEach((child) => {
            if(typeof(child) === 'string') {
                courseCards.push(
                    <RequiredCourse 
                        key={sectionId+child} 
                        courseId={child}
                        sectionId={sectionId}
                        index={index}/>
                )
                index++;
            }
            else {
                let length = child.length - 1;
                let content:JSX.Element[] = [];
                for(let i = 0; i < length; i++) {
                    content.push(<div key={'div' + i + sectionId} className='or-container relative'>
                                    <RequiredCourse key={sectionId+child[i]} 
                                        courseId={child[i]}
                                        sectionId={sectionId} 
                                        index={index}/>
                                    <span style={{position: 'absolute'}}> or </span>
                                </div>)
                    index++;
                }

                content.push(<RequiredCourse key={sectionId+child[length]} 
                                courseId={child[length]}
                                sectionId={sectionId}
                                index={index}/>)
                index++;
                courseCards.push(<div key={sectionId + index + 'div'} className='sub-area'> {content}</div>);
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