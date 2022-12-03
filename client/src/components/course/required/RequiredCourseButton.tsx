import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getDeptFromCourse } from '../../../helpers/helpers';
import { RootState } from '../../../store/store';

interface ICourseButtonType {
    id: string;
    isCrossed: boolean;
}

function RequiredCourseButton({id, isCrossed}: ICourseButtonType) {
    let bgColor = useSelector((state: RootState) => state.course.depts.byIds[getDeptFromCourse(id)][2]);

    const isTaken = useSelector((state: RootState) =>{ 
        let course = state.course.courses[id];
        return course === undefined? false : course.remains < course.data.repeatability;
    });

    let textColor = 'white';
    let textDecoration = 'none';

    if (isCrossed) {
        textDecoration = "line-through";
    }

    if (isTaken) {
        bgColor = '#D3D3D3';
        textColor = 'black';
    }

    return ( 
        <div className="course-btn" style={{backgroundColor: bgColor}}>
            <p key={"course-" + id} 
               className='course-id' 
               style={{textDecoration: textDecoration, color: textColor}}
            > 
                {id}
            </p>
        </div>
    )
}

export default memo(RequiredCourseButton)