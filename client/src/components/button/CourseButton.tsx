import {useState, memo, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

import CourseCard from '../card/CourseCard'

interface CourseButtonType {
    id: string;
    showUnit: boolean;
    isCrossed: boolean;
}

function CourseButton({id, showUnit, isCrossed}: CourseButtonType) {
    const [show, setShow] = useState(false);
    const course = useSelector((state: RootState) => state.store.courses.byIds[id].data)
    const colors = useSelector((state: RootState) => state.store.depts.byIds[course.department].colors);

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

            {showUnit && <p className='unit'>{course.units + ' units'}</p>}
        </div>
        
        <div style={{display: show? "block":"none"}}>
            <CourseCard course={course} color={colors[1]} boxShadowColor={colors[0]}/>
        </div>
    </>
    )

}

export default memo(CourseButton)