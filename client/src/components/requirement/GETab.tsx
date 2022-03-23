import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store'
import {fetchGECategories} from '../../features/RequirementSlice'
import DroppableArea from './DroppableArea';
import Right from '../icons/Right';

interface GESection {
    geId: string
}

const GESection = ({geId}:GESection) => {
    const ge = useSelector((state:RootState)=>state.requirement.ge.byIds[geId]);
    const [show, setShow] = useState(false);
    return (
        <div className='section-wrapper'>  
            <div
                key={geId} 
                className='year-header-wrapper' 
                onClick={() => setShow(!show)}>
                <h1 className="section-header">{geId + ": " + ge.name}</h1>
                <div className="rightIcon">
                    <Right show={show}/>
                </div>
            </div>
            <div style={{display: show? "block" : "none"}}>
                <DroppableArea key={geId + 'drop'} courseIds={ge.courses} droppableId={geId}/>
            </div>
        </div>
    )
}

function GETab () {
    const dispatch = useDispatch()
    const gEIds = useSelector((state:RootState)=>state.requirement.ge.allIds);
    const status = useSelector((state:RootState)=>state.requirement.ge.status);
    const error = useSelector((state:RootState)=>state.requirement.ge.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGECategories())
        }
    }, [status, dispatch])

    let content

    if (status === 'loading') 
        content = <p>Loading....</p> 
   
    else if (status === 'succeeded') {
        content = gEIds.map((id) => (
           <GESection key={id} geId={id}/>
        ))
    } 
    else if (status === 'failed') 
        content = <div>{error}</div>
    
  
    return (
        <div className="tab-container"  >
           {content}
        </div>
    )
}

export default GETab