import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import ReactTooltip from "react-tooltip";
import './badge.css';

interface BadgeProps {
    geId: string;
}

const Badge = ({geId}:BadgeProps) => {
    const takenGeCourses = useSelector((state: RootState) => state.course.takenGeCourses[geId]);
    const numberOfCourses = takenGeCourses !== undefined ? takenGeCourses.length : 0;
    let tooltipContent = numberOfCourses === 0 
        ? <p>You have not taken any courses in this category.</p>
        : <>
            <h1>Taken Courses</h1>
            <ul className='row'>
                {takenGeCourses.map(courseId => 
                    <li key={courseId} className='column'>
                        {courseId}
                    </li>
                )}
            </ul>
         </>;

    return (
        <span className="badge" data-tip data-for={'badgeTip_'+geId}>
            {numberOfCourses}
            <ReactTooltip 
                arrowColor='#495057'
                className='badgeTooltip' 
                id={'badgeTip_'+geId} 
                place="top" 
                effect="solid"
            >
                {tooltipContent}
            </ReactTooltip>
        </span>
    )
}

 export default memo(Badge);