import {memo} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import AccordionGE from '../../../../components/accordion/AccordionGE';

function GeneralEducation() {
    const allIds = useSelector((state:RootState)=> state.store.ge.allIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);
    const url = "https://catalogue.uci.edu/informationforadmittedstudents/requirementsforabachelorsdegree/#generaleducationrequirementtext";

    let content;
    if (status === 'loading') 
        content = <div className="loading-message"> Loading...!!! </div>  
   
    else if (status === 'succeeded') {
        content = allIds.map((id) => (<AccordionGE key={id} id={id}/>))
        content.push(<div key="empty" style={{height:'48rem'}}></div>);
    } 
    else if (status === 'failed') 
        content = <p className='loading-message red'>Cannot connect to server!!!</p>
    
    return (
        <div>
            <div key="GE" className='flex-container' style={{margin: '1.5rem 0rem'}}> 
                <a  style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--accent-color-2)'}}
                    href={url} target='_blank' rel="noreferrer"> General Education </a>
            </div>
            <div className="ge-container" style={{position: 'relative'}}>
                {content}
            </div>
        </div>
    )
}

export default memo(GeneralEducation);