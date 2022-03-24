import {useState} from 'react';
import { useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Droppable} from 'react-beautiful-dnd';
import Right from '../icons/Right';
import ReqCourseCard from '../course/ReqCourseCard';

interface MajorSectionType { id:string;}
interface SubListType {
    id: string;
    name: string;
    courses: (string|string[])[];
}

const DroppbaleSection = ({id, name, courses}: SubListType) => {
    let subContent:JSX.Element[] = [];
    let nameHeader;
    if(name !== "")
        nameHeader = <p key={id +'p'} style={{margin:'0.5rem 1rem', paddingBottom:'0.5rem'}}>{name}</p>

    let index = 0;

    courses.forEach((c) => {
        if(typeof(c) === 'string') {
            subContent.push(
                <ReqCourseCard key={id+c} courseId={id+c}
                index={index}/>
            )
            index++;
        }
        else {
            subContent.push(
                <div key={id + 'div' + index} className='or-container'>
                    <ReqCourseCard key={id+c[0]} courseId={id+c[0]}
                    index={index}/>
                    <span style={{paddingRight:'1rem', paddingBottom:'0.5rem'}}> or </span>
                    <ReqCourseCard key={id+c[1]} courseId={id+c[1]}
                    index={index+1}/>
                </div>
            );
            index += 2;
        }
    })

    let content;
    if(courses.length > 0) {
        content = 
            <Droppable
                key={id+'MajorTab'} 
                droppableId={id+'MajorTab'}
                isDropDisabled={true}
            >
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="requirement-drop-wrapper"
                    >
                        {subContent}
                        <div style={{display:'none'}}> {provided.placeholder} </div>
                    </div>
                )} 
            </Droppable>
    }

    return (
        <>
            {nameHeader}
            {content}
        </>
    )
}

const MajorSection = ({id}:MajorSectionType) => {
   console.log(id);
   const [show, setShow] = useState(false);
   const sectionData = useSelector((state:RootState)=>state.requirement.major.byIds[id]);
    return (
        <div className='section-wrapper'>  
            <div
                key={id} 
                className='year-header-wrapper' 
                onClick={() => setShow(!show)}>
                <h1 className="section-header">{sectionData.name}</h1>
                <div className="rightIcon">
                    <Right show={show}/>
                </div>
            </div>
            <div style={{display: show? "block" : "none"}}>
                {sectionData.subList.map((c)=> 
                    <DroppbaleSection key={c.id} id={c.id} name={c.name} courses={c.courses}/>
                )}
            </div>
        </div>
    )
}

function MajorTab () {
    const sectionIds = useSelector((state:RootState)=>state.requirement.major.allIds);
    const majorStatus = useSelector((state:RootState)=>state.requirement.major.status);
    const majorName = useSelector((state:RootState)=>state.requirement.major.name);
    const majorUrl = 
        useSelector((state:RootState)=>state.requirement.major.url);

    const error = useSelector((state:RootState)=>state.requirement.major.error);

    let content
    if(majorStatus === 'idle')
        content = <p className='center-p'>Select your major</p>
    else if (majorStatus === 'loading') 
        content = <p className='center-p'>Loading....</p> 
    else if (majorStatus === 'succeeded') {
        content = sectionIds.map((id) => (
           <MajorSection key={id} id={id}/>
        ))
    } 
    else if (majorStatus === 'failed') 
        content = <p className='center-p'>{error}</p>

    let hyperLink;
    if(majorName !== '')
        hyperLink = <a href={majorUrl} target='_blank' rel="noreferrer">{majorName} </a>
    
    return (
        <div className="tab-container"  >
            {hyperLink}
            {content}
        </div>
    )
}

export default MajorTab