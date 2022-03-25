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
    },
    color: string
}

const RenderPopup = ({course, color}: RenderPopupType) => {
    return (
        <>
        <div className='popup-header' style={{backgroundColor: color}}>
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
    const course = useSelector((state: RootState) => state.store.courses.byIds[id].data)
    const colors = useSelector((state: RootState) => state.store.depts.byIds[course.department].colors);

    return ( 
        <div className={showUnit? "card-box": "card-box w"} 
                onClick={()=>setShow(!show)} 
                style={{backgroundColor: colors[2]}}>
            <div 
                className='courseId' 
                style={{textDecoration: isCrossed? "line-through":"none"}}
            > 
                {id}
            </div>

            {showUnit && RenderUnit(course.units)}
            
            <div className="card-popup-before" 
                style={{display: show? "block":"none",  
                        backgroundColor: colors[1]}}>
            </div>

            <div className="card-popup" 
                 style={{display: show? "block":"none",
                         borderColor: colors[1],
                         boxShadow: '5px 5px 0px 0px' + colors[0]}}>
                    <RenderPopup course={course} color={colors[1]} />
            </div>
        </div>
    )

}

export default Popup