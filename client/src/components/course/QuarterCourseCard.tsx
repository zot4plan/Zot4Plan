import {memo} from 'react';
import { useSelector } from 'react-redux';
import { RootState} from '../../app/store';
import './CourseCard.css';
import CourseCard from './CourseCard';

interface CourseCardType {
    id: string;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function QuarterCourseCard({id}: CourseCardType) {
    const course = useSelector((state:RootState) => {
        if(id) {
            const course = state.store.courses[id];
            return course === undefined? null : course.data;
        }
        return null;
    })

    const colors = useSelector((state:RootState) => 
        id? state.store.depts.byIds[removeLastWord(id)] : ['#AFD3E9', '#70ADD7', '#3688BF']
    )

    return ( 
        <CourseCard id={id} course={course} colors={colors} />
    )
}

export default memo(QuarterCourseCard)