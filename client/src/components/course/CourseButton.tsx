import {useState, memo, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

import CourseCard from '../courseCard/CourseCard'
import ReactTooltip from "react-tooltip";
import Error from '../icon/Error'

interface CourseButtonType {
    id: string;
    showUnit: boolean;
    isCrossed: boolean;
    isWarning: boolean;
}

function CourseButton({id, showUnit, isCrossed, isWarning}: CourseButtonType) {
    const [show, setShow] = useState(false);
    const course = useSelector((state: RootState) => state.store.courses.byIds[id].data)
    const colors = useSelector((state: RootState) => state.store.depts.byIds[course.department]);

    let warningSpan;
    let color = colors[2]
    let textColor = 'white'
    if (isWarning) {
        warningSpan = 
        <span className='course-warning' data-tip data-for={'prereqTip'+id} >{Error()}
            <ReactTooltip id={"prereqTip"+id} place="top" effect="solid" disable={!isWarning}>
                Missing prerequisites
            </ReactTooltip>
        </span>
        // color = '#8B8000'                                       // Yellow color for unfulfilled prereqs warning                             
    } else if (isCrossed) {
        color = '#D3D3D3'
        textColor = 'black'
    }
    
    function handleOnClick( e: MouseEvent<HTMLDivElement> ) {
        e.preventDefault();
        setShow(!show)
    }

    return ( 
    <>
        <div className="course-btn"
            onClick={handleOnClick} 
            style={{backgroundColor: color}}
        >
            <p className='course-id' 
              style={{textDecoration: isCrossed? "line-through":"none", color: textColor}}
            > 
                {id}
            </p>
            {isWarning && warningSpan}
            {showUnit && !isWarning && <p className='unit'>{course.units + ' units'}</p>}
        </div>
        
        <div style={{display: show? "block":"none"}}>
            <CourseCard course={course} color={colors[1]} boxShadowColor={colors[0]} closeCard={handleOnClick}/>
        </div>
    </>
    )
}

export default memo(CourseButton)