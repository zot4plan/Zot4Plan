import {memo, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { getCoursesByGE } from '../../controllers/HomeController';
import ChervonRight from '../icon/ChervonRight';
import Detail from './Detail';
import './Accordion.css';
import Badge from './badge/badge';

interface SectionProps {
    id: string;
}

interface Section {
    sectionId: string;
    nameChild: string;
}

const AccordionGE = ({id}:SectionProps) => {
    const ge = useSelector((state: RootState) => state.ge.byIds[id]);
    const status = useSelector((state: RootState) => state.ge.byIds[id].status);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {  
        if(isOpen && status === 'idle') 
          dispatch(getCoursesByGE(id));
    },[isOpen, status, dispatch, id]); 
    
    let detailBody;
    if (status === 'loading') {
        detailBody = <div> Loading...!!! </div>
    }
    else if (status === 'succeeded') {
        detailBody = ge.sectionIds.map (
            (section: Section) => 
                <Detail 
                    key={section.sectionId} 
                    sectionId={section.sectionId} 
                    text={section.nameChild}
                    isGE={true}
                />
            )
    }
    else {
        detailBody = <div> Cannot connect to server...!!! </div>
    }
    
    return (
        <details key={id} 
            className='section' 
            open={isOpen} 
            onToggle={()=> setIsOpen(!isOpen)}
        >  
            <summary> 
                <span className='relative accordion'>
                    <h1 className="section-header"> 
                        {ge.ge_id + '-' + ge.name}
                        <Badge geId={id}/>
                    </h1>
                    <div className="right-icon"> 
                        <ChervonRight/> 
                    </div>
                </span>
            </summary>

            <div className='section-body'>
                <p style={{marginBottom: '1rem', textAlign: 'center', fontSize: '1.6rem'}}> 
                    <b>{ge.nameChild}</b> 
                </p>
                {isOpen && detailBody}
            </div>
        </details>
    )
 }

 export default memo(AccordionGE);