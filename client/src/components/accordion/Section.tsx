import {useState, memo} from 'react'
import DroppableArea from '../droppable/DroppableArea';
import Right from '../icon/Right'

interface SectionType {
    id: string;
    note: string;
    name:string;
    sublist: { sectionId: string, note: string} [] | null;
}

const Section = ({id, name, note, sublist}:SectionType) => {
    const [show, setShow] = useState(false);
     return (
         <div className='m-1 mt-0 round-15 shadow'>  
             <div
                 key={id} 
                 className={'flex item-center pointer accordion ' 
                         + (show? 'round-top-left round-top-right': 'round-15')}
                 onClick={() => setShow(!show)}
                 >
                     <h1 className="accordion-header sz-3">
                         {name}
                     </h1>
                     <div className="rightIcon">
                         <Right show={show}/>
                     </div>
             </div>
             <div 
                className='section-body'
                style={{display: show? "block" : "none"}}>
                
                {!sublist && <DroppableArea key={id} text={note} droppableId={id}/>}
                {sublist  && sublist.map((l)=> 
                <DroppableArea key={l.sectionId} droppableId={l.sectionId} text={l.note} />         
                )}
                
             </div>
         </div>
     )
 }

 export default memo(Section);