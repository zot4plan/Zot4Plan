import {memo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import AccordionGE from '../../../components/accordion/AccordionGE';

function GeneralEducation() {
    const allIds = useSelector((state:RootState)=> state.ge.allIds);
    const status = useSelector((state:RootState)=>state.ge.status);
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
        <div className="ge-container" style={{position: 'relative'}}>
            <div key="GE" className='hyperlink' style={{marginTop: '1.5rem', justifyContent:'center'}}> 
                <a style={{ fontSize: '2rem'}}
                    href={url} target='_blank' rel="noreferrer"> General Education </a>
            </div>
            {content}
        </div>
    )
}
export default memo(GeneralEducation); 