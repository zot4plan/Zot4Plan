import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addApExam } from '../../../../../store/slices/CourseSlice';
import { toast } from 'react-toastify';
import GeDropdown from "./GeDropdown";
import CoursesDropdown from "./CoursesDropdown";
import "./ApExamForm.css";

function ApExamForm() {
    const [form, setForm] = useState({
        name: '',
        GE: [] as OptionType[],
        courses: [] as OptionType[],
    })
    const dispatch = useDispatch();

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;

        if(!form.GE.length) {
            toast.warning('GE cannot be empty!')
            isValid = false;
        }
        if(!form.courses.length) {
            toast.warning('Courses cannot be empty!')
            isValid = false;
        }

        if(isValid) {
            dispatch(addApExam({ 
                name: form.name, 
                courses: form.courses.map(course => course.value), 
                GE: form.GE.map(ge => ge.value) 
            }))
            setForm({
                name: '',
                GE: [],
                courses: []
            })
        }
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(prevState => ({ ...prevState, name: e.target.value }))
    }

    const handleSelectCourses = (newCourses: OptionType[]) => {
        setForm(prevState => ({ ...prevState, courses: newCourses }));
    }
    
    const handleSelectGe = (newGE: OptionType[]) => {
        setForm(prevState => ({ ...prevState, GE: newGE }));
    }

    return (
        <div className='ap-exam-form-container'>
            <form className="ap-exam-wrapper" onSubmit={handleOnSubmit}>
                <div className='ap-exam-input-container'>
                    <label>AP Exam</label>
                    <input
                        placeholder='Ex: AP U.S. History'
                        type="text"
                        minLength={4}
                        maxLength={32}
                        pattern="^[a-zA-Z0-9. ]+$"
                        value={form.name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className='ap-exam-input-container'>
                    <label>Courses Covered</label>
                    <div className='ap-exam-dropdowns'>
                        <CoursesDropdown selectCourses={form.courses} setSelectCourses={handleSelectCourses} />
                    </div>
                </div>
                <div className='ap-exam-input-container'>
                    <label>GE Covered</label>
                    <div className='ap-exam-dropdowns'>
                        <GeDropdown selectGe={form.GE} setSelectGe={handleSelectGe} />
                    </div>
                </div>
                <div className='flex-container'>
                    <button className='btn' type="submit"> Submit </button>
                </div>
            </form>
        </div>

    )
}


export default ApExamForm;