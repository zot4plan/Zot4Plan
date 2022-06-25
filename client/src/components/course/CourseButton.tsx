import {useState, memo, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

import CourseCard from '../courseCard/CourseCard'
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
    const colors = useSelector((state: RootState) => state.store.depts.byIds[course.department].colors);

    // console.log(course);

    let warningSpan = <></>
    let color = colors[2]
    if (isWarning) {
        warningSpan = <span className='course-warning'>{Error()}</span>
        color = '#8B8000'                                            // Yellow color for unfulfilled prereqs warning
    }
    
    function handleOnClick( e: MouseEvent<HTMLDivElement> ) {
        e.preventDefault();
        setShow(!show)
    }

    return ( 
    <>
        <div className="course-btn"
            onClick={handleOnClick} 
            style={{backgroundColor: colors[2]}}
        >
            <p className='course-id' 
              style={{textDecoration: isCrossed? "line-through":"none"}}
            > 
                {id}
            </p>

            {showUnit && <p className='unit'>{isWarning && warningSpan}{course.units + ' units'}</p>}
        </div>
        
        <div style={{display: show? "block":"none"}}>
            <CourseCard course={course} color={colors[1]} boxShadowColor={colors[0]} closeCard={handleOnClick}/>
        </div>
    </>
    )

}

export default memo(CourseButton)