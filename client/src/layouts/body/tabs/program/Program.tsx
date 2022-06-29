import {memo, useState} from 'react'
import { shallowEqual, useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import ZotSelectMajor from '../../../../assets/images/ZotSelectMajor.png';
import SelectCourses from '../selects/SelectCourses';

import './Program.css';

interface Type {
    isMajor: boolean;
    addedCourses: string;
}
function Program ({isMajor, addedCourses}:Type) {
    const [majorIndex, setMajorIndex] = useState<number>(0); 
    const [minorIndex, setMinorIndex] = useState<number>(0);

    const programId = useSelector((state:RootState) => {  
        let selectedPrograms = isMajor? state.store.programs.selectedMajors : state.store.programs.selectedMinors;
        if(selectedPrograms.length === 0) return undefined;

        return isMajor? selectedPrograms[majorIndex].value : selectedPrograms[minorIndex].value;
    });

    const allIds = useSelector((state:RootState) => (
        programId !== undefined ? state.store.programs.byIds[programId].allIds : []
    ), shallowEqual);

    const name = useSelector((state:RootState) => programId !== undefined ? state.store.programs.byIds[programId].name : "");
    const url = useSelector((state:RootState) => programId !== undefined ? state.store.programs.byIds[programId].url : "");
    
    const status = useSelector((state:RootState) => state.store.programs.status);
    const error = useSelector((state:RootState) => state.store.programs.error);

    let content = [] as JSX.Element [];

    if (status === 'loading') 
        content.push(<div key="spinner" className='loading-message'> loading...!!! </div>)

    else if (status === 'succeeded' && programId !== undefined)  {
        content.push(<div key="hyperlink" className='flex-container'> 
                        <a  className='hyperlink' href={url} 
                            target='_blank' rel="noreferrer"> {name} </a>
                    </div>);

        allIds.forEach(id => {
            content.push(<Accordion key={id} id={id} type="major" programId={programId} />)
        });
        content.push(<Accordion key={addedCourses} id={addedCourses} type="other"/>)
        content.push(<div key="empty" style={{height:'42rem'}}></div>);
    }

    else if( status === 'error')
        content.push(<div key="error" className='loading-message red'>{error}</div>) 

    else
        content.push(<div key="img" className='flex-container'>
                        <img id='program-img' src={ZotSelectMajor} 
                        alt='please select your major!' />
                    </div>)
    
    return (
        <div style={{position: 'relative'}}> 
            <div key="browse" style={{display: status === 'succeeded'? "flex": "none", flexDirection:'column'}} >
                <SelectCourses />  
            </div> 
            <div className="program-container relative"> 
                {content}
            </div>
        </div>
    )
}

export default memo(Program);