import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addApExam } from '../../../../store/slices/CourseSlice';
import GeDropdown from "./GeDropdown";
import CoursesDropdown from "./CoursesDropdown";
import "./ApExamForm.css";

interface GeOptionType { value: string, label: string }

function PopperApExam() {
    const [name, setName] = useState('');
    const [GE, setGE] = useState<GeOptionType[]>([]);
    const [courses, setCourses] = useState<CourseOptionType[]>([])
    const dispatch = useDispatch();
    const handleOnSubmit = () => {
        const geArray = GE.map(ge => ge.value)
        const coursesArray = courses.map(course => course.value)
        dispatch(addApExam({ name: name, courses: coursesArray, GE: geArray }))
        resetForm()
    }
    const handleSelectCourses = (newCourses: CourseOptionType[]) => {
        setCourses(newCourses);
    }

    const handleSelectGe = (newGe: GeOptionType[]) => {
        setGE(newGe);
    }

    const resetForm = () => {
        setName('')
        setGE([])
        setCourses([])
    }

    return (
        <div className='ap-exam-container'>
            <div className="ap-exam-wrapper">
                <div className='ap-exam-input-container'>
                    <label>AP Exam Name</label>
                    <input
                        placeholder='Ex: AP U.S. History'
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='ap-exam-input-container'>
                    <label>Courses Covered</label>
                    <div className='ap-exam-dropdowns'>
                        <CoursesDropdown selectCourses={courses} setSelectCourses={handleSelectCourses} />
                    </div>
                </div>
                <div className='ap-exam-input-container'>
                    <label>GEs Covered</label>
                    <div className='ap-exam-dropdowns'>
                        <GeDropdown selectGe={GE} setSelectGe={handleSelectGe} />
                    </div>
                </div>
                {/* <div className='input-container'>
                    <h2>Units Received</h2>
                    <input
                        placeholder='EX: 32'
                        type="number"
                        required
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                    />
                </div> */}
            </div>

            <div className='flex-container'>
                <button className='btn' onClick={handleOnSubmit}> Submit </button>
            </div>
        </div>

    )
}


export default memo(PopperApExam);