import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../app/store'
import {fetchGECategories} from '../../features/FetchData'
import DroppableArea from './DroppableArea';
import Right from '../icons/Right';

interface GESection {
    droppableId: string
}

const GESection = ({droppableId}:GESection) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[droppableId]);
    const [show, setShow] = useState(false);
    return (
        <div className='section-wrapper'>  
            <div
                key={droppableId} 
                className='accordion' 
                onClick={() => setShow(!show)}>
                <h1 className="section-header">{ge.geId + ": " + ge.name}</h1>
                <div className="rightIcon">
                    <Right show={show}/>
                </div>
            </div>
            <div style={{display: show? "block" : "none"}}>
                <DroppableArea key={droppableId} courseIds={ge.courses} droppableId={droppableId}/>
            </div>
        </div>
    )
}

function GETab () {
    const dispatch = useDispatch()
    const gEIds = useSelector((state:RootState)=>state.store.ge.allIds);
    const status = useSelector((state:RootState)=>state.store.ge.status);
    const error = useSelector((state:RootState)=>state.store.ge.error);

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
           <GESection key={id} droppableId={id}/>
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