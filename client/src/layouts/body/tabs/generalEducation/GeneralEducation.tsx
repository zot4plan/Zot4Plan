import {memo} from 'react';
import { useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Section from '../../../../components/accordion/Accordion';
import Spinner from '../../../../components/icon/Spinner';

function GeneralEducation() {
    const geIds = useSelector((state:RootState)=>state.store.ge.allIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);

    let content;

    if (status === 'loading') 
        content = <div className="spinner aboslute"> <Spinner/> </div>  
   
    else if (status === 'succeeded') {
        content = geIds.map((id) => (<Section key={id} id={id} type="ge"/>))
        content.push(<div key="empty" style={{height:'18rem'}}></div>);
    } 
    else if (status === 'failed') 
        content = <p className='absolute fetch-error-message'>Cannot connect to server!!!</p>
    
    return (
    <div>
        <div className="accordion-container">
            {content}
        </div>
    </div>
    )
}

export default memo(GeneralEducation);