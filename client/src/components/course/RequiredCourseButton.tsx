import { memo, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import ReactTooltip from "react-tooltip";
import Error from '../icon/Error';

interface CourseButtonType {
    id: string;
    sectionId: string;
    isCrossed: boolean;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function RequiredCourseButton({id, isCrossed}: CourseButtonType) {
    let bgColor = useSelector((state: RootState) => state.store.depts.byIds[removeLastWord(id)][2]);
    let textColor = 'white';
    let textDecoration = 'none';

    if (isCrossed) {
        bgColor = '#D3D3D3'
        textColor = 'black'
        textDecoration = "line-through"
    }

    return ( 
        <div className="course-btn"
            style={{backgroundColor: bgColor}}
        >
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