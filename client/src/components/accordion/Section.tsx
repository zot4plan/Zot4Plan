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
        <div className='accordion-section round-15'>  
            <div
                key={id} 
                className={'accordion ' + (show? 'round-top-left round-top-right': 'round-15')}
                onClick={() => setShow(!show)}
                >
                <h1> {name} </h1>
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