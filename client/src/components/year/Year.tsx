import {useState, memo, MouseEvent} from "react";
import Quarter from '../../components/year/Quarter';
import { useDispatch } from 'react-redux';
import {removeYear} from '../../features/ScheduleSlice';
import Remove from '../icons/Remove';
import Right from '../icons/Right';

interface YearType {
    year: {
        id: string;
        name:string;
        quarters: string[];
    };
    index: number;
}

function Year({year, index}:YearType) {
    const [show, setShow] = useState (false);
    const dispatch = useDispatch();

    const deleteYear = () => {
        dispatch(removeYear({id: year.id, index: index}));
    }

    const removeBtn = () => {
        return (
            <Remove deleteYear={deleteYear}/>
        )
    }

    return (
        <div className='year-wrapper'>
            <div className='year-header-wrapper' key={year.id} 
            onClick={()=>setShow(!show)}>
                <h1 className="year-header"> {year.name} </h1>
                <div className="rightIcon">
                    <Right show ={show}/>
                </div>
                {index > 3 && removeBtn()}
            </div>

            <div className={show?'quarters-wrapper':'quarters-wrapper hide'} style={{display:'flex'}}>
                {year.quarters.map((quarterId,index) => 
                    <Quarter key={quarterId} id = {quarterId} index={index}/>
                )}
            </div>
        </div>
    )
}

export default memo(Year);