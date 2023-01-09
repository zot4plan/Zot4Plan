import { useState, MouseEvent, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/store';
import { editApExamUnits } from '../../../../store/slices/CourseSlice';
import './ApExamUnits.css';
import { toast } from 'react-toastify';

const ApExamUnits = () => {
    const currentUnits = useSelector((state: RootState) => state.course.apExamUnits)
    const [onEditMode, setOnEditMode] = useState(true)
    const openEditMode = (e: MouseEvent<HTMLSpanElement>) => {
        setOnEditMode(true)
    }
    const [units, setUnits] = useState(currentUnits)
    const dispatch = useDispatch()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (units < 0) {
            toast.warning('Units cannot be negative')
        } else {
            setOnEditMode(false)
            dispatch(editApExamUnits(units))
        }
    }

    useEffect(() => {  
        setUnits(currentUnits);
    },[currentUnits]);

    return (
        <div className='flex-container'>
            <div className='ap-exam-units-wrapper'>
                <span style={{ fontWeight: 'bold' }}>Units:</span>&nbsp;{
                    !onEditMode
                        ? <span onClick={openEditMode}>{currentUnits}</span>
                        : <span>
                            <form onSubmit={onSubmit}>
                                <input
                                    className='ap-exam-units-input'
                                    type="number"
                                    required
                                    value={units}
                                    onChange={e => setUnits(parseInt(e.target.value))}
                                />
                            </form>
                        </span>
                }
            </div>
        </div>
    )
}

export default ApExamUnits;