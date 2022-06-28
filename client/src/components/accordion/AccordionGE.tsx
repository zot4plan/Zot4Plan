import {memo, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";

import AccordionDetail from './AccordionDetail';
import Right from '../icon/ArrowRightSmall';

import './Accordion.css';
import { fetchGE } from '../../api/FetchData';

interface SectionType {
    id: string;
}

const AccordionGE = ({id}:SectionType) => {
    const ge = useSelector((state: RootState) => state.store.ge.byIds[id]);
    const status = useSelector((state: RootState) => state.store.ge.byIds[id].status);
    const [isOpen, setIsOpen] = useState(false);
    
    const dispatch = useDispatch();
    console.log(isOpen);
    
    useEffect(() => {  
        if(isOpen && status === 'idle') 
          dispatch(fetchGE(id));
      },[isOpen, status]); 
    
    let detail;
    if(status === 'loading')
        detail = <div> Loading...!!! </div>
    else if ( status === 'succeeded')  
        detail = <AccordionDetail key={id} droppableId={ge.sectionId} text={ge.nameChild}/>
    else
        detail = <div> Cannot connect to server...!!! </div>

    return (
        <details key={id} 
            className='section' 
            open={isOpen} 
            onToggle={()=> setIsOpen(!isOpen)}
        >  
            <summary> 
                <span className='relative accordion'>
                    <h1 className="section-header"> {ge.name} </h1>
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

 export default memo(AccordionGE);