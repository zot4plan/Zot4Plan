import {useState} from 'react';
import { useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import DroppableArea from './DroppableArea';
import Right from '../icons/Right';

interface MajorSectionType { id:string;}

const MajorSection = ({id}:MajorSectionType) => {
   console.log(id);
   const [show, setShow] = useState(false);
   const sectionData = useSelector((state:RootState)=>state.store.major.byIds[id]);
    return (
        <div className='m-1 mt-0 round-15 shadow-0'>  
            <div
                key={id} 
                className={'flex item-center bg-grey pointer accordion round-top-left round-top-right ' 
                            + (show? '': 'round-15')}
                onClick={() => setShow(!show)}
                >
                    <h1 className="accordion-header m-0 s-1">
                        {sectionData.name}
                    </h1>
                    <div className="rightIcon">
                        <Right show={show}/>
                    </div>
            </div>
            <div 
                className='pab-1 pat-1'
                style={{display: show? "block" : "none"}}>
                {sectionData.subList.map((c)=> 
                    <DroppableArea key={c.id} droppableId={c.id} text={c.name} courseIds={c.courses}/>
                )}
            </div>
        </div>
    )
}

function MajorTab () {
    const sectionIds = useSelector((state:RootState)=>state.store.major.allIds);
    const majorStatus = useSelector((state:RootState)=>state.store.major.status);
    const majorName = useSelector((state:RootState)=>state.store.major.name);
    const majorUrl = useSelector((state:RootState)=>state.store.major.url);
    const error = useSelector((state:RootState)=>state.store.major.error);

    let content;
    if(majorStatus === 'idle')
        content = <p className='center-p'>Select your major</p>
    else if (majorStatus === 'loading') 
        content = <p className='center-p'>Loading....</p> 
    else if (majorStatus === 'succeeded') {
        content = sectionIds.map((id) => (
           <MajorSection key={id} id={id}/>
        ))
    } 
    else if (majorStatus === 'failed') 
        content = <p className='center-p'>{error}</p>

    let hyperLink;
    if(majorName !== '')
        hyperLink = 
            <div className='flex justify-center item-center m-1'> 
                <a  className='hyperlink' 
                    href={majorUrl} 
                    target='_blank' 
                    rel="noreferrer"> {majorName} </a>
            </div>
    
    return (
        <div className="tab-container">
            {hyperLink}
            {content}
        </div>
    )
}

export default MajorTab