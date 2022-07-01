import {memo} from 'react'
import { shallowEqual, useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../../../app/store';
import Accordion from '../../../../components/accordion/Accordion';
import ZotSelectMajor from '../../../../assets/images/ZotSelectMajor.png';
import SelectCourses from '../selects/SelectCourses';
import ChevronLeft from '../../../../components/icon/ChervonLeft';
import ChevronRight from '../../../../components/icon/ChervonRight';

import './Program.css';
import { handleSwitchProgram } from '../../../../features/StoreSlice';

interface Type {
    isMajor: boolean;
    addedCourses: string;
}

function Program ({isMajor, addedCourses}:Type) {
    const programId = useSelector((state:RootState) => {
        let i = isMajor? 1 : 0;
        let index = state.store.programs.index[i];
        return (index < 0)? 0 : state.store.programs.selectedPrograms[i][index].value;
    });

    const allIds = useSelector((state:RootState) => (
        programId > 0 ? state.store.programs.byIds[programId].allIds : []
    ), shallowEqual);

    const name = useSelector((state:RootState) => programId > 0 ? state.store.programs.byIds[programId].name : "");
    const url = useSelector((state:RootState) => programId > 0 ? state.store.programs.byIds[programId].url : "");
    const status = useSelector((state:RootState) => state.store.programs.status);

    const dispatch = useDispatch();

    function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {  
        event.preventDefault();
        const move = Number(event.currentTarget.value);
        dispatch(handleSwitchProgram({move: move, isMajor: isMajor}));
    }

    let content = [] as JSX.Element [];

    if (status === 'loading') 
        content.push(<div key="spinner" className='loading-message'> loading...!!! </div>)

    else if (status === 'succeeded' && programId > 0)  {
        content.push(<div key="hyperlink" className='hyperlink'>
                        <button key={'ChevronLeft'} value={-1} onClick={handleOnClick}> <ChevronLeft/> </button>
                        <a href={url} target='_blank' rel="noreferrer"> {name} </a>
                        <button key={'ChevronRight'} value={1} onClick={handleOnClick}> <ChevronRight/> </button>
                    </div>);
        content.push(<Accordion key={addedCourses} id={addedCourses} type="other"/>)
        allIds.forEach(id => { content.push(<Accordion key={id} id={id} type="major" programId={programId} />) });
        content.push(<div key="empty" style={{height:'42rem'}}></div>);
    }

    else if( status === 'error')
        content.push(<div key="error" className='loading-message red'>Cannot retrieve the data...!!!</div>) 

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