import {useState, memo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {removeYear} from '../../features/StoreSlice';
import { RootState } from "../../app/store";

import QuarterCourses from './QuarterCourses';
import QuarterHeaderRow from "./QuarterHeaderRow";
import Remove from '../icons/Remove';
import Right from '../icons/Right';

interface YearType {
    yearId: string;
    index: number;
}

function Year({yearId, index}:YearType) {
    const [show, setShow] = useState (true);
    const year = useSelector((state:RootState) => state.store.years.byIds[yearId])
    const dispatch = useDispatch();

    const deleteYear = () => {
        dispatch(removeYear({id: year.id, index: index}));
    }

    const removeBtn = () => {
        return (<Remove deleteYear={deleteYear}/>)
    }

    return (
        <div 
            className='shadow round-15'
            style={{marginBottom: show? '3rem': '2rem'}}
            >
            <div 
                className={'accordion flex item-center pointer ' 
                    + (show? 'round-top-left round-top-right': 'round-15')}  
                key={year.id} 
                onClick={()=>setShow(!show)}
            > 
                <h1 className="accordion-header sz-4"> {year.name} </h1>
                <div className="rightIcon">
                    <Right show ={show}/>
                </div>
                {index > 3 && removeBtn()}
            </div>

            <div className={"flex ease " + (show? '':'hide')} >
                <QuarterHeaderRow />
            </div>

            <div className={'quarters-wrapper flex ease '+ (show?'':'hide')}>
                {year.quarterIds.map((quarterId, index) => 
                    <QuarterCourses key={quarterId} droppableId={quarterId} index={index}/>
                )}
            </div>
        </div>
    )
}

export default memo(Year);