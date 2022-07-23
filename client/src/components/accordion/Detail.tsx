import {Droppable} from 'react-beautiful-dnd';
import {memo, MouseEvent, useState} from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import RequiredCourse from '../course/RequiredCourse';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import RequiredCourseCard from '../course/RequiredCourseCard';
import ClickAwayListener from '@mui/base/ClickAwayListener';

interface AccordionDetailProps {
    text: string;
    sectionId: string;
    isGE?: boolean;
}

interface ListProps {
    sectionId: string;
    isGE: boolean;
    handleClick: (event: MouseEvent<HTMLElement>) => void;
}

interface PopperListProps{
    isGE: boolean;
    sectionId: string;
}

function List({sectionId, isGE, handleClick}: ListProps) {
    const courseIds = useSelector((state:RootState) => (
        isGE? state.ge.sections[sectionId]: state.programs.sections[sectionId]
    ), shallowEqual)
    
    let courses: JSX.Element[] = [];
    let index = 0;

    courseIds.forEach((child) => {
        if(typeof(child) === 'string') {
            courses.push(
                <RequiredCourse 
                    key={sectionId+child} 
                    courseId={child}
                    sectionId={sectionId}
                    index={index}
                    handleClick={handleClick}
                />)
        }
        else {
            let length = child.length - 1;
            let content:JSX.Element[] = [];
            for(let i = 0; i < length; i++) {
                content.push(<div key={'div' + i + sectionId} className='or-container relative'>
                                <RequiredCourse 
                                    key={sectionId+child[i]} 
                                    courseId={child[i]}
                                    sectionId={sectionId} 
                                    index={index}
                                    handleClick={handleClick}
                                />
                                <span style={{position: 'absolute'}}> or </span>
                            </div>)
                index++;
            }

            content.push(<RequiredCourse 
                            key={sectionId+child[length]} 
                            courseId={child[length]}
                            sectionId={sectionId}
                            index={index}
                            handleClick={handleClick}
                        />)
            courses.push(<div key={sectionId + index + 'div'} className='sub-area'> {content}</div>);
        }
        index++;
    })

    return (
        <>
            {courses}
        </>
    )
}

function PopperList({sectionId, isGE}: PopperListProps) {
    const [element, setElement] = useState<{anchorEl: HTMLElement|null, id: string|null}>({anchorEl: null, id: ""});
  
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.getAttribute("data-value");
        if(element.id === id)
            setElement({anchorEl: null, id: null})
        else
            setElement({anchorEl: event.currentTarget, id: id});
    };  

    const handleClickAway = () => {
        setElement({anchorEl: null, id: element.id})
    };  

    const open = Boolean(element.anchorEl);
    const popperId = open ? sectionId : undefined;
  
    return (
      <>
        <List sectionId={sectionId} isGE={isGE} handleClick={handleClick}/>
        <ClickAwayListener 
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={handleClickAway}
        >
            <PopperUnstyled 
                id={popperId} 
                open={open} 
                anchorEl={element.anchorEl} 
                role="presentation" 
                placement='bottom'
                modifiers={[
                    {
                      name: 'flip',
                      enabled: false 
                    },
                    {
                      name: 'preventOverflow',
                      enabled: true
                    }
                  ]}
            >
                <RequiredCourseCard id={element.id}/>
            </PopperUnstyled>
        </ClickAwayListener>
      </>
    )
} 

function Detail ({sectionId, text, isGE = false}:AccordionDetailProps) {
    const haveCourses = useSelector((state:RootState) => 
        isGE? state.ge.sections[sectionId].length > 0 : state.programs.sections[sectionId].length > 0
    )

    let p;
    if(text !== "") {
        let sub = text.substring(0,3);
        let content = (sub === "(b)" || sub === "(r)")? text.substring(3) : text;
        p = <p key={sectionId +'p'}  
               style={{
                marginBottom: haveCourses? '0.5rem' : '1rem',
                fontWeight: sub === "(b)"? 'bold' : 'normal',
                color: sub === "(r)"? '#DA1E37':'black' ,
            }}> 
                {content}
            </p>
    }

    return (
        <div>
            {p}
            <Droppable 
                droppableId={sectionId}
                isDropDisabled={true}
            >
                {(provided) => (
                    <div ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="accordion-detail"
                        style={{marginBottom: haveCourses? '1.5rem' : '0rem'}}
                    >
                        <PopperList sectionId={sectionId} isGE={isGE} />

                        <div style={{display:'none'}}> {provided.placeholder} </div>
                    </div>
            )} 
            </Droppable>
        </div>
    )
}

export default memo(Detail);