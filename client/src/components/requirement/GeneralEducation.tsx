import { useSelector} from 'react-redux';

import {RootState} from '../../app/store';
import Section from './Section';
import BrowseCourseByGE from './BrowseCourseByGE'

interface GESectionType { id: string; }

const GESection = ({id}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[id]);
    return (
        <Section id={ge.sectionId} name={ge.geId + ": " + ge.title} note={ge.note} sublist={null}/>
    )
}

function GeneralEducation() {
    const geIds = useSelector((state:RootState)=>state.store.ge.allGeIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);

    let content

    if (status === 'loading') 
        content = <p>Loading....</p> 
   
    else if (status === 'succeeded') {
        content = geIds.map((id) => (
           <GESection key={id} id={id}/>
        ))
    } 
    else if (status === 'failed') 
        content = <p>cannot connect to server!</p>
    
  
    return (
    <>
        <BrowseCourseByGE/>
        {content}
    </>
    )
}

export default GeneralEducation;