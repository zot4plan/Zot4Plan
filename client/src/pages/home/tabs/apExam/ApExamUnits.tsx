import { useState, MouseEvent, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { editApExamUnits } from '../../../../store/slices/CourseSlice';
import { toast } from 'react-toastify';
import ApExamNote from './ApExamNote';
import './ApExamUnits.css';

const ApExamUnits = () => {
    const currentUnits = useSelector((state: RootState) => state.course.apExamUnits);
    const [onEditMode, setOnEditMode] = useState(true);
    const [units, setUnits] = useState(currentUnits);
    const dispatch = useDispatch();

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    }

    const onSubmit = () => {
        if (units < 0) {
            toast.warning('Credits cannot be negative')
        } 
        else if (units > 120) {
            toast.warning('Credits earned is too large. Please check again!')
        }
        else {
            setOnEditMode(false);
            dispatch(editApExamUnits(units));
        }
    }

    const toggleEditMode = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        if(onEditMode) {
            onSubmit();
        }
        else {
            setOnEditMode(true);
        }
    }

    useEffect(() => {  
        setUnits(currentUnits);
    },[currentUnits]);

    return (
        <div className='flex-container'>
            <div className='ap-exam-units-wrapper' onClick={toggleEditMode}>
                <span className='text-bold'>Total credits earned:&nbsp;</span>{
                    !onEditMode
                        ? <span>{currentUnits}</span>
                        : <span>
                            <form onSubmit={handleOnSubmit} style={{ marginLeft: '6px' }}>
                                <input
                                    className='ap-exam-units-input'
                                    type="number"
                                    required
                                    value={units}
                                    onChange={e => setUnits(parseInt(e.target.value))}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </form>
                        </span>
                }
            </div>
            <ApExamNote/>
        </div>
    )
}

export default ApExamUnits;