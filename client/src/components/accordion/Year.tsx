import {memo} from "react";
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import Quarter from './Quarter';
import ButtonRemoveYear from "../button/ButtonRemoveYear";
import Right from '../icon/ArrowRightSmall';
import './Accordion.css';

interface YearProps {
    id: string;
    name: string;
    index: number;
}

function Year({id, name, index}:YearProps) {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
    const QUARTER_CLASS= ["fall", "winter","spring","summer"];
    const quarterIds = useSelector((state:RootState) => (state.store.years.byIds[id]), shallowEqual);

    return (
        <details open key={id} style={{marginBottom: '2.5rem'}}>
            <summary> 
                <span className='relative accordion year'>
                    <h1 className="year-header"> {name} </h1>
                    <div className="right-icon">
                        <Right />
                    </div>
                    {index > 3 && <ButtonRemoveYear id={id} index={index}/>}
                </span>
            </summary>

            <div className='quarters-wrapper'>
                {QUARTER_NAMES.map((name, index) => 
                    <h2 key={name} className={"quarter-header-"+ QUARTER_CLASS[index] + " quarter-header"}> 
                        {name}
                    </h2>
                )}

                {quarterIds.map((id, index) => 
                    <Quarter
                        key={id} 
                        sectionId={id} 
                        name={QUARTER_CLASS[index]}
                    />
                )}
            </div>
        </details>
    )
}

export default memo(Year);