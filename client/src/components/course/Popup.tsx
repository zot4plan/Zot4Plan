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
        prerequisite: string;
        restriction: string;
    }
}

const RenderPopup = ({course}: RenderPopupType) => {
    return (
        <>
        <div>
            <p className="course-header"> 
                <b>{course.id}</b> <br/>
                {course.name}<br/>
                {course.units + " units"} 
            </p>
        </div>
        <div> 
            <p> <b>{"Description: "}</b>{course.description}</p>
            <p> <b>{"Prerequisite: "}</b>{course.prerequisite}</p>
            <p> <b>{"Restriction: "}</b>{course.restriction}</p>
            <p> <b> course.GE </b></p>
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
    console.log(course);

    return ( 
        <div className={showUnit? "card-box": "card-box w"} >
            <div 
                className='courseId' 
                onClick={()=>setShow(!show)}
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