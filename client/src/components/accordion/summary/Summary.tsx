import {memo} from "react";
import RemoveYearButton from "../../button/RemoveYearButton";
import Right from '../../icon/Right';

interface SummaryType {
    id: string;
    name: string;
    index: number;
    isYear: boolean;
}

function Summary({id, name, index, isYear}:SummaryType) {
    return (
        <summary> 
            <span className='relative accordion'>
                <h1 className={isYear? "year-header": "section-header"}> {name} </h1>
                <div className="right-icon">
                    <Right />
                </div>
                {index > 3 && <RemoveYearButton id={id} index={index}/>}
            </span>
        </summary>
    )
}

export default memo(Summary);