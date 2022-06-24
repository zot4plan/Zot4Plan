import {memo} from 'react'
import { useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import ZotSelectMajor from '../../../../assets/images/ZotSelectMajor.png';
import SelectMinor from '../../../selectProgram/SelectMinor';

import Spinner from '../../../../components/icon/Spinner';
import '../program/Major.css';


function Minor () {
    const accordionIds = useSelector((state:RootState)=>state.store.programs.allIds);
    const status = useSelector((state:RootState)=>state.store.programs.status);
    const name = useSelector((state:RootState)=>state.store.programs.name);
    const url = useSelector((state:RootState)=>state.store.programs.url);
    const coursesAddByStudentId = useSelector((state:RootState)=> state.store.coursesAddByStudent.sectionId);
    const error = useSelector((state:RootState)=>state.store.programs.error);

    let content = [] as JSX.Element [];
    content.push(<SelectMinor />)
    
    if(status === 'idle') {
        content.push(
                <div key="img" className='flex-container'>
                    <img 
                        id='select-major-img'
                        src={ZotSelectMajor} 
                        alt='please select your major!' 
                    />
                </div>)
    }
    
    else if (status === 'loading') 
        content.push(<div key="spinner" className='spinner'> <Spinner/> </div>)

    else if (status === 'succeeded' && name !== '')  {
        content.push(<div key="hyperlink" className='flex-container'> 
                        <a  className='hyperlink' href={url} 
                            target='_blank' rel="noreferrer"> {name} </a>
                    </div>);

        accordionIds.forEach(id => {content.push(<Accordion key={id} id={id} type="major" />)});
        content.push(<Accordion key={coursesAddByStudentId} id={coursesAddByStudentId} type="other"/>)
        content.push(<div key="empty" style={{height:'30rem'}}></div>);
    }

    else 
        content.push(<div key="error" className='fetch-error-message absolute red'>{error}</div>)
    
    return (
        <div>  
            <div className="accordion-container relative"> 
                {content}
            </div>
        </div>
    )
}

export default memo(Minor);