import {memo} from 'react'

import DroppableArea from '../droppable/DroppableArea';
import Summary from './summary/Summary';


interface SectionType {
    id: string;
    note: string;
    name:string;
    sublist: { sectionId: string, note: string} [] | null;
}

const Section = ({id, name, note, sublist}:SectionType) => {
    let detail;

    if(!sublist)
        detail = <DroppableArea key={id} text={note} droppableId={id}/>
    else
        detail = sublist.map( l => <DroppableArea key={l.sectionId} droppableId={l.sectionId} text={l.note}/>)
  
    return (
        <details className='accordion-section' key={id}>  
            <Summary id ={id} name={name} index={0} isYear={false}/>

            <div className='section-body'>
               {detail}
            </div>
        </details>
     )
 }

 export default memo(Section);