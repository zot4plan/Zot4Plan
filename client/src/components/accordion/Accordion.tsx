import {memo} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

import AccordionDetail from './AccordionDetail';
import Right from '../icon/ArrowRightSmall';

import './Accordion.css';

interface SectionType {
    id: string;
    type: string;
    programId?: number;
}

const Accordion = ({id, type, programId = -1}:SectionType) => {
    const accordion:any = useSelector((state: RootState) => {
        if(type === 'ge')
            return state.store.ge.byIds[id];
        else if (type === 'major' && programId >= 0) 
            return state.store.programs.byIds[programId].byIds[id];
        else
            return state.store.addedCourses;
    });

    let detail, name;
    console.log(accordion);
    if(type === 'ge') {
        name = id + "-" + accordion.name;
        detail = <AccordionDetail key={accordion.id} droppableId={accordion.sectionId} text={accordion.nameChild}/>
    }
    else if (type === 'major') {
        name = accordion.name;
        detail = accordion.sectionIds.map(( section:{sectionId: string, nameChild: string}) => 
                <AccordionDetail key={section.sectionId} droppableId={section.sectionId} text={section.nameChild}/> )
    }
    else {
        name = 'Add Courses';
        detail =
            <div> 
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