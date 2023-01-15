import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addApExam } from '../../../../../store/slices/CourseSlice';
import { toast } from 'react-toastify';
import GeDropdown from "./dropdown/GeDropdown";
import CoursesDropdown from "./dropdown/CoursesDropdown";
import InformationIcon from '../../../../../components/icon/InformationIcon';
import ApExamDropDown from './dropdown/ApExamDropDown';
import "./ApExamForm.css";

const UNOFFICIAL_TRANSCRIPT_URL = 'https://www.reg.uci.edu/access/student/transcript/?seg=U';

function ApExamForm() {
    const [form, setForm] = useState({
        apExam: undefined as (ApExamOption | undefined),
        score: 0,
        GE: [] as OptionType[],
        courses: [] as OptionType[],
        units: 0 as ( number | '' ),
    })
    const dispatch = useDispatch();

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(form.units < 0) {
            toast.error('Units must be positive');
        }
        else if(!form.apExam || form.apExam.label === '') {
            toast.error('Ap Exam cannot be empty');
        }
        else {
            dispatch(addApExam({
                id: form.apExam.value,
                name: form.apExam.label,
                score: form.score,
                courses: form.courses.map(course => course.value),
                GE: form.GE.map(ge => ge.value),
                units: form.units !== '' ? form.units : 0,
            }))
            setForm({
                apExam: {value: '', label: ''},
                score: 0,
                GE: [],
                courses: [],
                units: 0
            })
        }
    }

    const handleExamChange = (apExam: ApExamOption) => {
        if(form.apExam && typeof(form.apExam.value) === 'string' && typeof(apExam.value) === 'string') {
            setForm(prevState => ({ ...prevState, apExam: apExam.label ? apExam : undefined}));
        }
        else {
            setForm({
                apExam: apExam.label ? apExam : undefined,
                score: apExam.score ? apExam.score : 0,
                GE: apExam.GE ? apExam.GE.map(ge => ({value: ge, label: ge})) : [],
                courses: apExam.courses ? apExam.courses.map(course => ({value: course, label: course})) : [],
                units: apExam.units !== undefined ? apExam.units : 0
            })
        }
    }

    const handleUnitsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(prevState => ({ ...prevState, units: e.target.value ? parseInt(e.target.value) : ''}))
    }

    const handleSelectCourses = (newCourses: OptionType[]) => {
        setForm(prevState => ({ ...prevState, courses: newCourses }));
    }
    
    const handleSelectGe = (newGE: OptionType[]) => {
        setForm(prevState => ({ ...prevState, GE: newGE }));
    }

    return (
        <div className='ap-exam-form-container'>
            <form className="ap-exam-form-wrapper" onSubmit={handleOnSubmit}>
                <div className='ap-exam-required-fields-container'>
                    <div className='ap-exam-input-wrapper' id='ap-exam-name'>
                        <label className='text-bold'>AP Exam</label>
                        <ApExamDropDown selectApExam={form.apExam}  setSelectApExam={handleExamChange}/>
                    </div>
                    <div className='ap-exam-input-wrapper' id='ap-exam-units'>
                        <label className='text-bold'> Units </label>
                        <div>
                            <input required
                                type="number"
                                max={9}
                                value={form.units}
                                onChange={handleUnitsChange}
                            />
                            <a  
                                target='_blank'
                                href={UNOFFICIAL_TRANSCRIPT_URL}
                                rel='noreferrer'
                                aria-label='Unofficial transcript'
                            > 
                                <InformationIcon data-tip data-for="info-icon" className='information-icon' fontSize='14px'/>
                            </a> 
                        </div>
                    </div>
                </div>
                <div className='ap-exam-input-wrapper'>
                    <label> <span className='text-bold'>Equivalent Courses </span> (optional)</label>
                    <div className='ap-exam-dropdowns'>
                        <CoursesDropdown selectCourses={form.courses} setSelectCourses={handleSelectCourses} />
                    </div>
                </div>
                <div className='ap-exam-input-wrapper'>
                    <label> <span className='text-bold'>Satisfaction of GE</span> (optional)</label>
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