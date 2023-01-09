import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import ApExamListItem from './ApExamListItem';
import './ApExamList.css';

const ApExamList = () => {
    const apExamList = useSelector((state: RootState) => state.course.apExam)
    return (
        <div className='ap-exam-list-container'>
            {apExamList.length 
                ? <ul className='ap-exam-list-wrapper'>
                    {apExamList.map((item, i) => (
                        <ApExamListItem key={i} exam={item} index={i}/>
                    ))}
                </ul>  
                : <p className='flex-container'>No AP Exams have been added.</p>
            }
        </div>
    )
}

export default ApExamList;