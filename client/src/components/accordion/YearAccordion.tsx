import {memo} from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../../app/store";
import QuarterDroppableArea from '../droppable/QuarterDroppableArea';
import Summary from './summary/Summary';

interface YearType {
    id: string;
    name: string;
    index: number;
}

function Year({id, name, index}:YearType) {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
    const QUARTER_CLASS= ["fall", "winter","spring","summer"];

    const quarterIds = useSelector((state:RootState) => state.store.years.byIds[id].quarterIds)

    return (
        <details open key={id} style={{marginBottom: '2.5rem'}}>
            <Summary id={id} name={name} index={index} isYear={true}/>

            <div className='quarters-wrapper'>
                {QUARTER_NAMES.map((name, index) => 
                        <h2 key={name} className={"quarter-header-"+ QUARTER_CLASS[index] + " quarter-header"}> 
                            {name}
                        </h2>
                )}

                {quarterIds.map((id, index) => 
                    <QuarterDroppableArea 
                        key={id} 
                        droppableId={id} 
                        quarterName={QUARTER_CLASS[index]}
                    />
                )}
            </div>
        </details>
    )
}

export default memo(Year);