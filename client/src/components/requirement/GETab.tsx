import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {RootState} from '../../app/store';
import {fetchGECategories} from '../../features/FetchData';
import Section from './Section';
import BrowseCourseByGE from './BrowseCourseByGE'

interface GESectionType { id: string; }

const GESection = ({id}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[id]);
    return (
        <Section id={id} name={ge.geId + ": " + ge.name} note={ge.note} sublist={null}/>
    )
}

function GETab () {
    const dispatch = useDispatch()
    const sectionIds = useSelector((state:RootState)=>state.store.ge.allSectionIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGECategories())
        }
    }, [status, dispatch])

    let content

    if (status === 'loading') 
        content = <p>Loading....</p> 
   
    else if (status === 'succeeded') {
        content = sectionIds.map((id) => (
           <GESection key={id} id={id}/>
        ))
    } 
    else if (status === 'failed') 
        content = <div>cannot connect to server!</div>
    
  
    return (
        <div className="tab-container"  >
            <BrowseCourseByGE/>
            {content}
        </div>
    )
}

export default GETab