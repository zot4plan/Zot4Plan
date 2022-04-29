import {memo} from 'react'
import { useSelector} from 'react-redux';

import {RootState} from '../../app/store';
import BrowseCourseById from '../input/BrowseCourseById';
import Section from '../accordion/Section';
import ZotSelectMajor from '../../assets/images/ZotSelectMajor.png'

import Spinner from '../icon/Spinner';

interface MajorSectionType { id:string;}

const MajorSection = memo(({id}:MajorSectionType) => {
    const section = useSelector((state:RootState)=>state.store.major.byIds[id]);
     return (
        <Section id={section.id} name={section.title} note="" sublist={section.sectionIds}/>
     )
})

function Major () {
    const sectionIds = useSelector((state:RootState)=>state.store.major.allIds);
    const status = useSelector((state:RootState)=>state.store.major.status);
    const name = useSelector((state:RootState)=>state.store.major.name);
    const url = useSelector((state:RootState)=>state.store.major.url);
    const coursesAddByStudent = useSelector((state:RootState)=> state.store.coursesAddByStudent)
    const error = useSelector((state:RootState)=>state.store.major.error);

    let content;
    if(status === 'idle')
        content =
        <div className='flex-container'>
            <img 
                id='select-major-img'
                src={ZotSelectMajor} 
                alt='please select your major!' 
            />
        </div>

    else if (status === 'loading') 
        content = <div id='spinner'> <Spinner/> </div> 

    else if (status === 'succeeded') 
        content = sectionIds.map(id => <MajorSection key={id} id={id}/>)
    else 
        content = <p className='fetch-error-message red'>{error}</p>

    let hyperLink;
    if(name !== '' && status === 'succeeded')
        hyperLink = 
            <div className='flex-container'> 
                <a  className='hyperlink' 
                    href={url} 
                    target='_blank' 
                    rel="noreferrer"> {name} </a>
            </div>
    
    return (
        <>  
            <div id="browse-id-container" style={{display: status === 'succeeded'? "block": "none"}} >
                <BrowseCourseById id={coursesAddByStudent.sectionId} majorStatus={status}/>  
            </div>

            {hyperLink}
            {status ==='succeeded' 
                && <Section id={coursesAddByStudent.sectionId} 
                        name={coursesAddByStudent.title} 
                        note="" 
                        sublist={null} 
            />}
            {content}
        </>
    )
}

export default memo(Major);