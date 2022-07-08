import {memo} from 'react'
import { shallowEqual, useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import ChevronLeft from '../../../../components/icon/ChervonLeft';
import ChevronRight from '../../../../components/icon/ChervonRight';

import { handleSwitchProgram } from '../../../../features/ProgramsSlice';
import { fetchProgramById } from '../../../../api/FetchData';

interface Type {
    isMajor: boolean;
    addedCourses: string;
}

function Program ({isMajor, addedCourses}:Type) {
    const programId = useSelector((state:RootState) => {
        let i = isMajor? 1 : 0;
        let index = state.programs.index[i];
        return (index < 0)? 0 : state.programs.selectedPrograms[i][index].value;
    });

    const allIds = useSelector((state:RootState) => (
        programId > 0 ? state.programs.byIds[programId].allIds : []
    ), shallowEqual);

    const name = useSelector((state:RootState) => programId > 0 ? state.programs.byIds[programId].name : "");
    const url = useSelector((state:RootState) => programId > 0 ? state.programs.byIds[programId].url : "");
    const status = useSelector((state:RootState) => programId > 0 ? state.programs.byIds[programId].status : "");

    const dispatch = useDispatch();

    function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {  
        event.preventDefault();
        const move = Number(event.currentTarget.value);
        dispatch(handleSwitchProgram({move: move, isMajor: isMajor}));
    }

    let content = [] as JSX.Element [];

    if (status === 'idle') 
        dispatch(fetchProgramById(programId));

    else if (status === 'succeeded')  {
        content.push(<div key="hyperlink" className='hyperlink'>
                        <button key={'ChevronLeft'} style={ {paddingLeft:'1.5rem'} } value={-1} onClick={handleOnClick}> <ChevronLeft/> </button>
                        <a href={url} target='_blank' rel="noreferrer"> {name} </a>
                        <button key={'ChevronRight'} style={ {paddingRight:'3rem'} } value={1} onClick={handleOnClick}> <ChevronRight/> </button>
                    </div>);
        content.push(<Accordion key={addedCourses} id={addedCourses}/>)
        allIds.forEach(id => { content.push(<Accordion key={id} id={id} programId={programId} />) });
        content.push(<div key="empty" style={{height:'42rem'}}></div>);
    }
    else if( status === 'error')
        content.push(<div key="error" className='loading-message red'>Cannot retrieve the data...!!!</div>) 
    
    return (
        <div className="program-container relative"> 
            {content}
        </div>
    )
}

export default memo(Program);