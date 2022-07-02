import {memo, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { fetchGE } from '../../api/FetchData';
import Detail from './Detail';
import Right from '../icon/ArrowRightSmall';
import './Accordion.css';

interface SectionType {
    id: string;
}

const AccordionGE = ({id}:SectionType) => {
    const ge = useSelector((state: RootState) => state.ge.byIds[id]);
    const status = useSelector((state: RootState) => state.ge.byIds[id].status);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {  
        if(isOpen && status === 'idle') 
          dispatch(fetchGE(id));
      },[isOpen, status, dispatch, id]); 
    
    let detail;

    if(status === 'loading')
        detail = <div> Loading...!!! </div>
    else if ( status === 'succeeded')  
        detail = ge.sectionIds.map(( section:{sectionId: string, nameChild: string}) => 
                    <Detail key={section.sectionId} 
                        sectionId={section.sectionId} 
                        text={section.nameChild}
                        isGE={true}
                    />)
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
                    <h1 className="section-header"> {ge.id + '-' + ge.name} </h1>
                    <div className="right-icon"> <Right/> </div>
                </span>
            </summary>

            <div className='section-body'>
                <p style={{marginBottom: '1rem'}}> <b>{ge.nameChild}</b> </p>
                {detail}
            </div>
        </details>
    )
 }

 export default memo(AccordionGE);