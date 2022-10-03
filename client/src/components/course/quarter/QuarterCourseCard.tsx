import {memo} from 'react';
import { useSelector } from 'react-redux';
import {RootState} from '../../../store/store';
import CourseCard from '../popup/CourseCard';

interface CourseCardProps {
    id: string;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function QuarterCourseCard({id}: CourseCardProps) {
    const course = useSelector((state:RootState) =>  
        id && state.store.courses[id] !== undefined 
        ? state.store.courses[id].data
        : null
    )

    const colors = useSelector((state:RootState) => 
        id 
        ? state.store.depts.byIds[removeLastWord(id)] 
        : ['#AFD3E9', '#70ADD7', '#3688BF']
    )

    return ( 
        <CourseCard id={id} course={course} colors={colors} />
    )
}

export default memo(QuarterCourseCard)