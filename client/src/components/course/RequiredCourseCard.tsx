import {memo, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState} from '../../app/store';
import Axios from '../../api/Axios';
import './CourseCard.css';
import CourseCard from './CourseCard';

interface CourseCardType {
    id: string | null;
}

function removeLastWord(str: string) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
    return (lastIndexOfSpace === -1)? str : str.substring(0, lastIndexOfSpace);
}

function RequiredCourseCard({id}: CourseCardType) {
    const [course, setCourse] = useState(() => {
        if(id) {
            const course = sessionStorage.getItem(id);
            return course? JSON.parse(course) : null;
        }
        return null;
    });

    useEffect(() => {  
        if(!course && id) {
            setTimeout(() => {
                Axios.get('/api/getCourse', { params: { id: id} })
                .then(res => {
                    sessionStorage.setItem(id, JSON.stringify(res.data));
                    setCourse(res.data);
                })
                .catch(() => {
                    setCourse(null);
                })
            }, 500);  
        }
    },[id, course, setCourse]); 

    const colors = useSelector((state:RootState) => 
        id? state.store.depts.byIds[removeLastWord(id)] : ['#AFD3E9', '#70ADD7', '#3688BF']
    )

    return ( 
        <CourseCard id={id} course={course} colors={colors} />
    )
}

export default memo(RequiredCourseCard)