import {memo} from 'react';
import { useSelector } from 'react-redux';
import { getDeptFromCourse } from '../../../helpers/helpers';
import {RootState} from '../../../store/store';
import CourseCard from '../popup/CourseCard';

interface ICourseCardProps {
    id: string;
}

function QuarterCourseCard({id}: ICourseCardProps) {
    const course = useSelector((state:RootState) =>  
        id && state.course.courses[id] !== undefined 
        ? state.course.courses[id].data
        : null
    )

    const colors = useSelector((state:RootState) => 
        id 
        ? state.course.depts.byIds[getDeptFromCourse(id)] 
        : ['#AFD3E9', '#70ADD7', '#3688BF']
    )

    return ( 
        <CourseCard id={id} course={course} colors={colors} />
    )
}

export default memo(QuarterCourseCard)