import React, {useState} from 'react';
import Info from '../icons/Info';

interface courseType {
    id: string;
    showUnit: boolean;
    isCrossed: boolean;
}

const renderUnit = (unit:number) => {
    return (
        <div className='unit'>{unit + ' units'}</div>
    )
}

function Popup({id, showUnit, isCrossed}: courseType) {
    const [show, setShow] = useState(false);
    
    return ( 
        <div className={showUnit? "card-box": "card-box w"} >
            <div 
                className='courseId' 
                onClick={()=>setShow(!show)}
                style={{textDecoration: isCrossed? "line-through":"none"}}
            > {id}</div>
            {showUnit && renderUnit(4)}

            <div className="card-popup" style={{display: show? "block":"none"}}>
                <div>
                    <p className="course-header"> 
                        <b>{id}</b> <br/>
                        Beyond SQL Data Management<br/>
                        {4 + " units"} 
                    </p>
                </div>
                <div> 
                    <p> <b>{"Description: "}</b>Internships focused on writing. In consultation with a faculty advisor, students create a course from response essays, research essays, and assessment project data. Internships may include editing and publication projects, supervised teaching and tutoring assignments, community literacy projects.</p>
                    <p> <b>{"Prerequisite: "}</b>Upper-division students only. School of Info {'&'} Computer Sci students have first consideration for enrollment.</p>
                    <p> <b>{"Restriction: "}</b>Upper-division students only. Art History Majors only.</p>
                </div>
            </div>
        </div>
    )

}

export default Popup