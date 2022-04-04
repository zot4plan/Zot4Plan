import {useState, memo} from 'react'
import DroppableArea from './DroppableArea';
import Right from '../icons/Right'

interface SectionType {
    id: string;
    note: string;
    name:string;
    sublist: { sectionId: string, name: string} [] | null;
}

const Section = ({id, name, note, sublist}:SectionType) => {
    const [show, setShow] = useState(false);
     return (
         <div className='m-1 mt-0 round-15 shadow'>  
             <div
                 key={id} 
                 className={'flex item-center bg-grey pointer accordion round-top-left round-top-right ' 
                             + (show? '': 'round-15')}
                 onClick={() => setShow(!show)}
                 >
                     <h1 className="accordion-header m-0 sz-3">
                         {name}
                     </h1>
                     <div className="rightIcon">
                         <Right show={show}/>
                     </div>
             </div>
             <div 
                className='pab-1 pat-1'
                style={{display: show? "block" : "none"}}>
                
                {!sublist && <DroppableArea key={id} text={note} droppableId={id}/>}
                {sublist  && sublist.map((l)=> 
                <DroppableArea key={l.sectionId} droppableId={l.sectionId} text={l.name} />         
                )}
                
             </div>
         </div>
     )
 }

 export default memo(Section);