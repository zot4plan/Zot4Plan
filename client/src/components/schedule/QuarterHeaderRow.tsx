import {memo} from 'react';

const QuarterHeaderRow = () => {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
    return (
        <>
            {QUARTER_NAMES.map((name, index) => {
                return (
                <h2 key={name} 
                    className={"quarter-header flex-basis-25 " 
                                + (index < 3? 'bd-r ':'')}> 
                    {name}
                </h2>)
            })}
        </>
    )
}

export default memo(QuarterHeaderRow);