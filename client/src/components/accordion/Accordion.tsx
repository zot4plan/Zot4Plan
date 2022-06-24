import {memo} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

import AccordionDetail from './AccordionDetail';
import Right from '../icon/ArrowRightSmall';
import BrowseCourseById from '../../layouts/body/tabs/major/BrowseCourseById';

import './Accordion.css';

interface SectionType {
    id: string;
    type: string;
}

const Accordion = ({id, type}:SectionType) => {
    const section:any = useSelector((state: RootState) => {
        if(type === 'ge')
            return state.store.ge.byIds[id];
        else if (type === 'major') 
            return state.store.programs.byIds[id];
        else
            return state.store.coursesAddByStudent;
    });

    let detail, name;
    const coursesAddByStudentId = useSelector((state:RootState)=> state.store.coursesAddByStudent.sectionId);
    const status = useSelector((state:RootState)=>state.store.programs.status);

    if(type === 'ge') {
        name = id + "-" + section.title;
        detail = <AccordionDetail key={section.id} droppableId={section.sectionId} text={section.note}/>
    }
    else if (type === 'major') {
        name= section.title;
        detail = section.sectionIds.map( (l:{sectionId: string, note: string}) => 
                <AccordionDetail key={l.sectionId} droppableId={l.sectionId} text={l.note}/> )
    }
    else {
        name = 'Add  Courses';
        detail =
            <div> 
                <div key="browse" id="browse-id-container"
                    style={{display: status === 'succeeded'? "flex": "none", flexDirection:'column'}} >
                    <BrowseCourseById id={coursesAddByStudentId} majorStatus={status}/>  
                </div>
                <AccordionDetail key={id} droppableId={id} text= {""}/>
            </div>
    }

    return (
        <details className='section' key={id}>  
            <summary> 
                <span className='relative accordion'>
                    <h1 className="section-header"> {name} </h1>
                    <div className="right-icon">
                        <Right />
                    </div>
                </span>
            </summary>

            <div className='section-body'>
               {detail}
            </div>
        </details>
     )
 }

 export default memo(Accordion);