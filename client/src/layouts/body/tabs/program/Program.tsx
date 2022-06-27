import {memo, useState} from 'react'
import { useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import ZotSelectMajor from '../../../../assets/images/ZotSelectMajor.png';
import SelectCourses from '../selects/SelectCourses';

import Spinner from '../../../../components/icon/Spinner';
import './Program.css';

interface Type {
    isMajor: boolean;
    addedCourses: string;
}
function Program ({isMajor, addedCourses}:Type) {
    const [majorIndex, setMajorIndex] = useState<number>(0); 
    const [minorIndex, setMinorIndex] = useState<number>(0);

    const program = useSelector((state:RootState) => {  
        let selectedPrograms = isMajor? state.store.programs.selectedMajors : state.store.programs.selectedMinors;

        if(selectedPrograms.length === 0) 
            return undefined;

        let programId = isMajor? selectedPrograms[majorIndex].value : selectedPrograms[minorIndex].value;
        let program = state.store.programs.byIds[programId];

        console.log(program);  

        return program;
    });

    const status = useSelector((state:RootState)=>state.store.programs.status);
    const error = useSelector((state:RootState)=>state.store.programs.error);

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

    else if (status === 'succeeded' && program !== undefined)  {
        content.push(<div key="hyperlink" className='flex-container'> 
                        <a  className='hyperlink' href={program.url} 
                            target='_blank' rel="noreferrer"> {program.name} </a>
                    </div>);

        program.allIds.forEach(id => {
            content.push(<Accordion key={id} id={id} type="major" programId={program.id} />)
        });
        content.push(<Accordion key={addedCourses} id={addedCourses} type="other"/>)
        content.push(<div key="empty" style={{height:'30rem'}}></div>);
    }
    else 
        content.push(<div key="error" className='fetch-error-message absolute red'>{error}</div>) 
    
    return (
        <div> 
            <div key="browse" style={{display: status === 'succeeded'? "flex": "none", flexDirection:'column'}} >
                <SelectCourses />  
            </div> 
            <div className="accordion-container relative"> 
                {content}
            </div>
        </div>
    )
}

export default memo(Program);