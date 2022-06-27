import {memo} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import Spinner from '../../../../components/icon/Spinner';

function GeneralEducation() {
    const allIds = useSelector((state:RootState)=> state.store.ge.allIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);
  
    let content;
    if (status === 'loading') 
        content = <div className="spinner aboslute"> <Spinner/> </div>  
   
    else if (status === 'succeeded') {
        content = allIds.map((id) => (<Accordion key={id} id={id} type="ge"/>))
        content.push(<div key="empty" style={{height:'18rem'}}></div>);
    } 
    else if (status === 'failed') 
        content = <p className='absolute fetch-error-message'>Cannot connect to server!!!</p>
    
    return (
    <div>
        <div key="GE" className='flex-container' style={{marginTop: '2rem'}}> 
            <a className='hyperlink' href='https://catalogue.uci.edu/informationforadmittedstudents/requirementsforabachelorsdegree/#generaleducationrequirementtext'
                target='_blank' rel="noreferrer"> General Education </a>
        </div>
        <div className="accordion-container">
            {content}
        </div>
    </div>
    )
}

export default memo(GeneralEducation);