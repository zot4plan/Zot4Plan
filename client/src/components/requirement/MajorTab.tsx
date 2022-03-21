import {useState} from 'react'
import { useSelector } from 'react-redux';
import {RootState} from '../../app/store'
import {Droppable} from 'react-beautiful-dnd'
import Right from '../icons/Right';
import ReqCourseCard from '../course/ReqCourseCard';

interface MajorSectionType {
    id:string;
}
interface SubListType {
    id: string;
    name: string;
    courses: (string|string[])[];
}
const DroppbaleSection = ({id, name, courses}: SubListType) => {
    let subContent:JSX.Element[] = [];
    let nameHeader;
    if(name !== "")
        nameHeader = <p>{name}</p>

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
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
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
    return (
        <>
            {nameHeader}
            <Droppable 
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
                    <div style={{display:'none'}}>{provided.placeholder} </div>
                </div>
            )} 
            </Droppable>
        </>
    )
}

const MajorSection = ({id}:MajorSectionType) => {
   console.log(id);
   const [show, setShow] = useState(true);
   const sectionData = 
            useSelector((state:RootState)=>state.requirement.major.byIds[id]);
    return (
        <>  
        <div
            key={id} 
            className='year-header-wrapper' 
            onClick={() => setShow(!show)}>
            <h1 className="year-header">{sectionData.name}</h1>
            <div className="rightIcon">
                <Right show={show}/>
            </div>
        </div>
        <div style={{display: show? "block" : "none"}}>
            {sectionData.subList.map((c)=> 
                <DroppbaleSection key={c.id} id={c.id} name={c.name} courses={c.courses}/>
            )}
        </div>
        </>
    )
    
    
}

function MajorTab () {
    const sectionIds = useSelector((state:RootState)=>state.requirement.major.allIds);
    const status = useSelector((state:RootState)=>state.requirement.major.status);
    const error = useSelector((state:RootState)=>state.requirement.major.error);

    let content
    if(status === 'idle')
        content = <p>Select your major</p>
    else if (status === 'loading') 
        content = <p>Loading....</p> 
   
    else if (status === 'succeeded') {
        content = sectionIds.map((id) => (
           <MajorSection key={id} id={id}/>
        ))
    } 
    else if (status === 'failed') 
        content = <div>{error}</div>
    
    return (
        <div className="tab-container"  >
           {content}
        </div>
    )
}

export default MajorTab