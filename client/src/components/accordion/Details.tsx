import {memo} from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../../app/store";
import Summary from './summary/Summary';
import QuarterDroppableArea from '../droppable/QuarterDroppableArea';
import Section from './Section';

interface YearType {
    yearId: string;
    yearName: string;
    index: number;
}

interface MajorSectionType { id:string;}

const MajorAccordion = memo(({id}:MajorSectionType) => {
    const section = useSelector((state:RootState)=>state.store.major.byIds[id]);
    return (
        <Section id={section.id} name={section.title} note="" sublist={section.sectionIds}/> 
    )
})

interface GESectionType { id: string; }

const GESection = ({id}:GESectionType) => {
    const ge = useSelector((state:RootState)=>state.store.ge.byIds[id]);
    return (
        <Section id={ge.sectionId} name={ge.geId + "-" + ge.title} note={ge.note} sublist={null}/>
    )
}

function Details({yearId, yearName, index}:YearType) {
    const QUARTER_NAMES = ["Fall", "Winter","Spring","Summer"];
    const QUARTER_CLASS= ["fall", "winter","spring","summer"];

    const quarterIds = useSelector((state:RootState) => state.store.years.byIds[yearId].quarterIds)

    return (
        <details open
            key={yearId}
            style={{marginBottom: '2.5rem'}}
        >
            <Summary id={yearId} name={yearName} index={index} isYear={true}/>

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

export default memo(Details);