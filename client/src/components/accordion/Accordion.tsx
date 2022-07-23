import {memo} from 'react'
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import Detail from './Detail';
import Right from '../icon/ArrowRightSmall';

import './Accordion.css';

interface SectionProps {
    id: string;
    programId?: number;
}

interface ProgramSectionProps{
    sectionId: string;
    nameChild: string;
}

const Accordion = ({id, programId = -1}:SectionProps) => {
    const accordion:any = useSelector((state: RootState) => 
        (programId !== -1)? state.programs.byIds[programId].byIds[id] : id
    );

    let detail, name;
    if (programId !== -1) {
        name = accordion.name;
        detail = accordion.sectionIds.map((section:ProgramSectionProps) => 
                    <Detail key={section.sectionId} 
                        sectionId={section.sectionId} 
                        text={section.nameChild}
                    />)
    }
    else {
        name = 'Added Courses';
        detail = <Detail key={id} sectionId={id} text= ""/>
    }

    return (
        <details key={id} className='section'>  
            <summary> 
                <span className='relative accordion'>
                    <h1 className="section-header"> {name} </h1>
                    <div className="right-icon"> <Right /> </div>
                </span>
            </summary>
            <div className='section-body'> {detail} </div>
        </details>
     )
 }

 export default memo(Accordion);