import {memo} from 'react'
import { useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import BrowseCourse from './BrowseCourse';
import DroppableArea from './DroppableArea';
import Section from './Section'

interface MajorSectionType { id:string;}

const MajorSection = memo(({id}:MajorSectionType) => {
    const sectionData = useSelector((state:RootState)=>state.store.major.byIds[id]);
    return (
        <Section id={id} name={sectionData.name} note="" list={sectionData.subList}/>
    )
})

const AddCourse = memo(() => {
    const other = useSelector((state:RootState)=> state.store.other)
    return (
        <>
            <BrowseCourse/>
            <div className='ml-3'>
                <DroppableArea courseIds={other.courses} droppableId={other.id} text=""/>
            </div>
        </>
    )
})

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
            <div className='flex justify-center item-center mb-3'> 
                <a  className='hyperlink' 
                    href={majorUrl} 
                    target='_blank' 
                    rel="noreferrer"> {majorName} </a>
            </div>
    
    return (
        <div className="tab-container">
            <AddCourse/>
            {hyperLink}
            {content}
        </div>
    )
}

export default memo(MajorTab);