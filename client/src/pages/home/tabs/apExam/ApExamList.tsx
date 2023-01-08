import { memo } from 'react';
import "./ApExamForm.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ApExamListItem from './ApExamListItem';


const ApExamList = () => {
    const apExamList = useSelector((state: RootState) => state.course.apExam)
    return (
        <>
            {apExamList.map((item, i) => (
                <ApExamListItem key={i} exam={item} index={i}/>
            ))}
        </>
    )
}


export default memo(ApExamList);