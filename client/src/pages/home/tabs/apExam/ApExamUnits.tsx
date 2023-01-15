import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import ApExamNote from './ApExamNote';
import './ApExamUnits.css';

const ApExamUnits = () => {
    const currentUnits = useSelector((state: RootState) => state.course.apExamUnits);
    
    return (
        <div className='flex-container flex-column' >
            <div className='ap-exam-units-wrapper'>
                <span className='text-bold'>Total credits earned:&nbsp;</span> {currentUnits}
            </div>
            <ApExamNote/>
        </div>
    )
}

export default ApExamUnits;