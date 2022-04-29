import {useState, memo} from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../../app/store";

import QuarterDroppableArea from '../droppable/QuarterDroppableArea';
import RemoveYearButton from "../button/RemoveYearButton";
import Right from '../icon/Right';

interface YearType {
    yearId: string;
    yearName: string;
    index: number;
    isLast: boolean;
}

function Year({yearId, yearName, index, isLast}:YearType) {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
    const LOWERCASE= ["fall", "winter","spring","summer"];

    const [show, setShow] = useState (true);
    const year = useSelector((state:RootState) => state.store.years.byIds[yearId])

    return (
        <div 
            className='accordion-year round-15'
            style={{marginBottom: isLast? '0rem':'2.5rem'}}
            >
            <div 
                className={'relative accordion ' + (show? 'round-top-left round-top-right': 'round-15')}  
                key={year.id} 
                onClick={()=>setShow(!show)}
            > 
                <h1> {yearName + " Year"} </h1>
                <div className="right-icon">
                    <Right show ={show}/>
                </div>
                {index > 3 && <RemoveYearButton id={year.id} index={index}/>}
            </div>

            <div className={'quarters-wrapper ' + (show? '':'hide')}>
                {QUARTER_NAMES.map((quarterName, index) => 
                        <h2 key={quarterName} className={"quarter-header-"+LOWERCASE[index] + " quarter-header"}> 
                            {quarterName}
                        </h2>
                )}
                {year.quarterIds.map((quarterId, index) => 
                    <QuarterDroppableArea key={quarterId} 
                        droppableId={quarterId} 
                        quarterName={LOWERCASE[index]}
                    />
                )}
            </div>
        </div>
    )
}

export default memo(Year);