import { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../store/store';
import Accordion from '../../../../components/accordion/Accordion';
import { getProgram } from '../../../../api/HomeController';
import ProgramCarousel from './ProgramCarousel';

interface PropgramProps {
    isMajor: boolean;
    addedCourses: string;
}

function Program ({isMajor, addedCourses}:PropgramProps) {
    const programId = useSelector((state:RootState) => {
        let programType = isMajor ? 1 : 0;
        let index = state.programs.index[programType];
        return index < 0 ? 0 : state.programs.selectedPrograms[programType][index].value;
    });

    const allIds = useSelector((state:RootState) => 
        (programId > 0 ? state.programs.byIds[programId].allIds : [])
        , shallowEqual);

    const name = useSelector((state:RootState) => programId > 0 ? state.programs.byIds[programId].name : "");
    const url = useSelector((state:RootState) => programId > 0 ? state.programs.byIds[programId].url : "");
    const status = useSelector((state:RootState) => programId > 0 ? state.programs.byIds[programId].status : "");

    const dispatch = useDispatch();

    useEffect(()=> {
        if (status === 'idle') 
            dispatch(getProgram(programId));
    },[status, dispatch, programId]);

    let content = [] as JSX.Element [];

    if (status === 'succeeded')  {
        content.push(<ProgramCarousel key="hyperlink" url={url} name={name} isMajor={isMajor}/>);
        content.push(<Accordion key={addedCourses} id={addedCourses}/>)
        allIds.forEach(id => { content.push(<Accordion key={id} id={id} programId={programId} />) });
        content.push(<div key="empty" style={{height:'42rem'}}></div>);
    }
    else if (status === 'failed')
        content.push(<div key="failed" className='loading-message red'>Cannot retrieve the data...!!!</div>) 
    
    return (
        <div className="program-container relative"> 
            {content}
        </div>
    )
}

export default memo(Program);