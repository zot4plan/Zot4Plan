import {useState} from 'react';
import Info from '../icons/Info';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

interface courseType {
    id: string;
    showUnit: boolean;
    isCrossed: boolean;
}
interface RenderPopupType {
    course: {
        id: string;
        name: string;
        department: string;
        units: number;
        description: string;
        corequisites: string;
        prerequisite: string;
        restriction: string;
        ge: string;
    }
}

const RenderPopup = ({course}: RenderPopupType) => {
    return (
        <>
        <div className='popup-header'>
            <p> 
                <b>{course.id + '. ' + course.name}</b> 
                <br/>
                {course.units + " units"} 
            </p>
        </div>
        <div style={{padding:'0.5rem 0.5rem'}}> 
            <p> <b>{"Description: "}</b>{course.description}</p>
            <p> <b>{"Prerequisite: "}</b>{course.prerequisite}</p>
            <p> <b>{"Restriction: "}</b>{course.restriction}</p>
            <p> <b>{"Corequisites: "}</b>{course.corequisites}</p>
            <p> <b>{"GE: "}</b>{course.ge}</p>
        </div>
    </>
    )
}

const RenderUnit = (unit:number) => {
    return (
        <div className='unit'>{unit + ' units'}</div>
    )
}

function Popup({id, showUnit, isCrossed}: courseType) {
    const [show, setShow] = useState(false);
    const course = useSelector((state: RootState) => state.requirement.courses.byIds[id].data)

    return ( 
        <div className={showUnit? "card-box": "card-box w"} onClick={()=>setShow(!show)} >
            <div 
                className='courseId' 
                style={{textDecoration: isCrossed? "line-through":"none"}}
            > 
                {id}
            </div>

            {showUnit && RenderUnit(course.units)}
            
            <div className="card-popup" style={{display: show? "block":"none"}}>
                <RenderPopup course={course}/>
            </div>
        </div>
    )

}

export default Popup