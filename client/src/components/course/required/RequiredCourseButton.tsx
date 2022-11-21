import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface CourseButtonType {
    id: string;
    isCrossed: boolean;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function RequiredCourseButton({id, isCrossed}: CourseButtonType) {
    let bgColor = useSelector((state: RootState) => state.course.depts.byIds[removeLastWord(id)][2]);

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