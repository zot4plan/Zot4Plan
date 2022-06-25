import {memo, useState} from 'react'
import { useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import ZotSelectMajor from '../../../../assets/images/ZotSelectMajor.png';
import SelectProgram from './selects/SelectProgram';
import BrowseCourseById from './selects/SelectCourses';

import Spinner from '../../../../components/icon/Spinner';
import './Program.css';

interface Type {
    isMajor: boolean;
}
function Program ({isMajor}:Type) {
    const [majorIndex, setMajorIndex] = useState<number>(0); 
    const [minorIndex, setMinorIndex] = useState<number>(0);

    const {accordionIds, name, url, programId} = useSelector((state:RootState) => {  
        let programID = (isMajor)? state.store.programs.allMajors[majorIndex] : state.store.programs.allMinors[minorIndex];

        if(programID === undefined) 
            return {accordionIds: [], name: "", url: "", programId: ""};
            
        let program = state.store.programs.byIds[programID];
        return {accordionIds: program.allIds, 
                name: program.name, 
                url: program.url,
                programId: programID };
    });

    const status = useSelector((state:RootState)=>state.store.programs.status);
    const error = useSelector((state:RootState)=>state.store.programs.error);
    const addedCourses = useSelector((state:RootState)=> state.store.programs.addedCourses.sectionId);

    let content = [] as JSX.Element [];
    
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
        console.log("succeeded");
        content.push(<div key="hyperlink" className='flex-container'> 
                        <a  className='hyperlink' href={url} 
                            target='_blank' rel="noreferrer"> {name} </a>
                    </div>);

        accordionIds.forEach(id => {content.push(<Accordion key={id} id={id} type="major" programId={programId} />)});
        /*content.push(<Accordion key={addedCourses} id={addedCourses} type="other"/>)
        content.push(<div key="empty" style={{height:'30rem'}}></div>);*/
    }
    else 
        content.push(<div key="error" className='fetch-error-message absolute red'>{error}</div>) 
    
    return (
        <div>  
            <div key="selectProgram">
                <SelectProgram isMajor={isMajor} />
            </div>
            <div key="browse" id="browse-id-container"
                    style={{display: status === 'succeeded'? "flex": "none", flexDirection:'column'}} >
                    <BrowseCourseById id={addedCourses} majorStatus={status}/>  
                </div>
            <div className="accordion-container relative"> 
                {content}
            </div>
        </div>
    )
}

export default Program;