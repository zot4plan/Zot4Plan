import {Droppable} from 'react-beautiful-dnd';
import {memo} from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ReactTooltip from 'react-tooltip';
import RequiredCourse from '../course/RequiredCourse';

interface AccordionDetailType {
    text: string;
    sectionId: string;
    isGE?: boolean;
}

function Detail ({sectionId, text, isGE = false}:AccordionDetailType) {
    const courseIds = useSelector((state:RootState) => (
        isGE? state.ge.sections[sectionId]: state.programs.sections[sectionId]
    ), shallowEqual)

    let courseCards: JSX.Element[] = [];
    let index = 0;
    if(courseIds !== undefined) {
        courseIds.forEach((child) => {
            if(typeof(child) === 'string') {
                courseCards.push(
                    <RequiredCourse 
                        key={sectionId+child} 
                        courseId={child}
                        sectionId={sectionId}
                        index={index}
                    />)
            }
            else {
                let length = child.length - 1;
                let content:JSX.Element[] = [];
                for(let i = 0; i < length; i++) {
                    content.push(<div key={'div' + i + sectionId} className='or-container relative'>
                                    <RequiredCourse key={sectionId+child[i]} 
                                        courseId={child[i]}
                                        sectionId={sectionId} 
                                        index={index}
                                    />
                                    <span style={{position: 'absolute'}}> or </span>
                                </div>)
                    index++;
                }

                content.push(<RequiredCourse key={sectionId+child[length]} 
                                courseId={child[length]}
                                sectionId={sectionId}
                                index={index}
                            />)
                courseCards.push(<div key={sectionId + index + 'div'} className='sub-area'> {content}</div>);
            }
        index++;
    })}

    let p;
    if(text !== "") {
        let sub = text.substring(0,3);
        let content = (sub === "(b)" || sub === "(r)")? text.substring(3) : text;
        p = <p key={sectionId +'p'}  
               style={{
                marginBottom:courseIds.length > 0? '0.5rem' : '1rem',
                fontWeight: sub === "(b)"? 'bold' : 'normal',
                color: sub === "(r)"? '#DA1E37':'black' ,
            }}> 
                {content}
            </p>
    }

    return (
        <>
            {p}
            <Droppable 
                droppableId={sectionId}
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

                    {/* <ReactTooltip 
                            id={sectionId}
                            place="bottom" 
                            effect="solid" 
                            event='click'
                            globalEventOff='click' 
                            isCapture={true}
                            getContent={data => <p> {data} </p>}
                        />  */}
                    </div>
            )} 
            </Droppable>
        </>
    )
}

export default memo(Detail);