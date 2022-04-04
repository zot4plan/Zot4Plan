import {memo} from 'react'
import { useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import BrowseCourseById from './BrowseCourseById';
import Section from './Section';

interface MajorSectionType { id:string;}

const MajorSection = memo(({id}:MajorSectionType) => {
    const section = useSelector((state:RootState)=>state.store.major.byIds[id]);
     return (
        <Section id={section.id} name={section.title} note="" sublist={section.sectionIds}/>
     )
})

const AddCourse = () => {
    const custom = useSelector((state:RootState)=> state.store.customAdd)
    
    return (
    <>
    <BrowseCourseById id={custom.sectionId}/>
    <Section id={custom.sectionId} name={custom.title} note="" sublist={null} />
    </>
    )
}

function MajorTab () {
    const sectionIds = useSelector((state:RootState)=>state.store.major.allIds);
    const status = useSelector((state:RootState)=>state.store.major.status);
    const name = useSelector((state:RootState)=>state.store.major.name);
    const url = useSelector((state:RootState)=>state.store.major.url);
    //const error = useSelector((state:RootState)=>state.store.major.error);

    let content;
    if( status === 'idle')
        content = <p className='center-p'>Select your major</p>

    else if (status === 'loading') 
        content = <p className='center-p'>Loading....</p> 

    else if (status === 'succeeded') 
        content = sectionIds.map(id => <MajorSection key={id} id={id}/>)
     
    else if (status === 'failed') 
        content = <p className='center-p'>Cannot connect to server!</p>

    let hyperLink;
    if(name !== '')
        hyperLink = 
            <div className='flex justify-center item-center mb-3'> 
                <a  className='hyperlink' 
                    href={url} 
                    target='_blank' 
                    rel="noreferrer"> {name} </a>
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