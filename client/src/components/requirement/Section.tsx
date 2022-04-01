import {useState, memo} from 'react'
import DroppableArea from './DroppableArea';
import Right from '../icons/Right'

interface ChildType {
    id: string;
    name: string;
    courses: (string|string[])[];
}

interface SectionType {
    list: ChildType[] | string[];
    id: string;
    name:string;
}

const Section = ({id, name, list}:SectionType) => {
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

                {id.length === 4 && list.map((c)=> {
                    if(typeof(c) === 'object')
                        return (
                            <DroppableArea key={c.id} droppableId={c.id} text={c.name} courseIds={c.courses}/>
                        )
                })}

                {id.length === 5 &&  
                    <DroppableArea key={id} courseIds={list} text="" droppableId={id}/>
                }

             </div>
         </div>
     )
 }

 export default memo(Section);