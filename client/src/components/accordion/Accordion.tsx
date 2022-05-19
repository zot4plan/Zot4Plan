import {memo} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

import DroppableArea from '../droppable/DroppableArea';
import Summary from './summary/Summary';

interface SectionType {
    id: string;
    type: string;
}

const Accordion = ({id, type}:SectionType) => {
    const section:any = useSelector((state: RootState) => {
        if(type === 'ge')
            return state.store.ge.byIds[id];
        else if (type === 'major') 
            return state.store.major.byIds[id];
        else
            return state.store.coursesAddByStudent;
    });

    let detail, name;

    if(type === 'ge') {
        name = id + "-" + section.title;
        detail = <DroppableArea key={section.id} droppableId={section.sectionId} text={section.note}/>
    }
    else if (type === 'major') {
        name= section.title;
        detail = section.sectionIds.map( (l:{sectionId: string, note: string}) => 
                <DroppableArea key={l.sectionId} droppableId={l.sectionId} text={l.note}/> )
    }
    else {
        name = '+ courses';
        detail = <DroppableArea key={id} droppableId={id} text= {"(Added courses by students)"}/>
    }

    return (
        <details className='accordion-section' key={id}>  
            <Summary id ={id} name={name} index={0} isYear={false}/>

            <div className='section-body'>
               {detail}
            </div>
        </details>
     )
 }

 export default memo(Accordion);