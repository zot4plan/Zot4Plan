import {useState, memo} from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../../app/store";

import QuarterCourses from '../droppable/QuarterDroppableBox';
import RemoveYearButton from "../button/RemoveYearButton";
import Right from '../icon/Right';

interface YearType {
    yearId: string;
    index: number;
    isLast: boolean;
}

function Year({yearId, index, isLast}:YearType) {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];

    const [show, setShow] = useState (true);
    const year = useSelector((state:RootState) => state.store.years.byIds[yearId])

    return (
        <div 
            className='accordion-year round-15'
            style={{marginBottom: isLast? '0rem': '2.5rem'}}
            >
            <div 
                className={'accordion ' + (show? 'round-top-left round-top-right': 'round-15')}  
                key={year.id} 
                onClick={()=>setShow(!show)}
            > 
                <h1 className="sz-4"> {year.name} </h1>
                <div className="rightIcon">
                    <Right show ={show}/>
                </div>
                {index > 3 && <RemoveYearButton id={year.id} index={index}/>}
            </div>

            <div className={"flex ease " + (show? '':'hide')} >
                {QUARTER_NAMES.map((name, index) => {
                    return (
                    <h2 key={name} 
                        className={"quarter-header flex-basis-25 " 
                                    + (index < 3? 'bd-r ':'')}> 
                        {name}
                    </h2>)
                })}
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