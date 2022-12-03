import {memo, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState} from '../../../store/store';
import Axios from '../../../controllers/Axios';
import CourseCard from '../popup/CourseCard';
import { getDeptFromCourse } from '../../../helpers/helpers';

interface ICourseCardProps {
    id: string | null;
}

function RequiredCourseCard({id}: ICourseCardProps) {
    const [course, setCourse] = useState(() => {
        if(id) {
            const course = sessionStorage.getItem(id);
            return course ? JSON.parse(course) : null;
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
        id 
        ? state.course.depts.byIds[getDeptFromCourse(id)] 
        : ['#AFD3E9', '#70ADD7', '#3688BF']
    )

    return ( 
        <CourseCard id={id} course={course} colors={colors} />
    )
}

export default memo(RequiredCourseCard)