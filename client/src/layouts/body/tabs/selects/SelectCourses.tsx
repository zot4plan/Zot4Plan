import {useState,memo, MouseEvent} from 'react';
import  { StylesConfig } from "react-select";
import AsyncSelect  from 'react-select/async';
import { useSelector, useDispatch } from 'react-redux';
import Axios from '../../../../api/Axios';

import {RootState} from '../../../../app/store';
import {addCourse} from '../../../../features/ProgramsSlice';
import AddIcon from '../../../../components/icon/AddIcon';
import Error from '../../../../components/icon/Error';
import Success from '../../../../components/icon/Success';

import './SelectCourses.css';

interface OptionType {
    value: string;
    label: string;
}

interface CourseType{
    id:string;
}

const myStyle: StylesConfig<OptionType, false> =  {
    control: (provided) => {
        return {...provided, 
                width: '100%',
                borderColor: '#1F1F1F',
                borderRadius: '18px',
                "&:hover": {
                    borderColor: '#1F1F1F',
                }
            };
    },
    valueContainer: (provided) => ({
        ...provided, cursor: 'text'}
    ),
    placeholder: (provided) => ({
        ...provided, color: '#1F1F1F',
    }),
    indicatorSeparator: (provided) => ({
        ...provided, backgroundColor: '#1F1F1F'
    }),
    indicatorsContainer: (provided)=> ({
        ...provided, marginRight: '3.7rem'
    }),
}

// Search courses from databases
const promiseOptions = (inputValue: string, callback:(options: OptionType[]) => void) => {
    let filterCourse:OptionType[] = [];

    if(inputValue.length < 3)
        callback(filterCourse);
    else 
        setTimeout(() => {
            Axios.get('/api/filterCourses', {
                params: { id: inputValue }}).then((res) => {
                    res.data.forEach((course:CourseType) => filterCourse.push({value: course.id, label: course.id}))
                    callback(filterCourse);
            });
        }, 500);
}

function SelectCourses() {
    const [selectCourse, setSelectCourse] = useState<string>("");
    const [message, setMessage] = useState({content: "", status: 'idle'});
    const addedCourses = useSelector((state:RootState) => {
        let sectionId = state.programs.addedCourses;
        return state.programs.sections[sectionId];
    }); 
    const dispatch = useDispatch();

    const submitAddCourse =(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let content = selectCourse, status = "fail";

        if(selectCourse === "")
            setMessage({content: "Please select a course!", status: status})

        else if(!addedCourses.includes(selectCourse))
            setTimeout(() => {
                Axios.post('/api/getCourseById', {id: selectCourse })
                    .then((res) => {
                        if(res.data.message === 'succeed') {
                            dispatch(addCourse({courses: [res.data.data]}));
                            content += " is added successfully!";
                            status = "succeed";
                        }
                        else 
                            content += " cannot retrieve data from server!";

                        setMessage({content: content, status: status})   
                    });
            }, 500);

        else 
            setMessage({content: content + " has already been added!", status: status})
    };

    const handleOnChange = (option: OptionType | null) => {
        if(option)
            setSelectCourse(option.value);
        else
            setSelectCourse("");
    }

    return (
        <div className='input-container'>
            <div className='relative browse-container'>
                <AsyncSelect
                    isClearable={true}
                    cacheOptions 
                    defaultOptions
                    loadOptions={promiseOptions}
                    isOptionDisabled={(option)=> addedCourses.includes(option.label)}

                    onChange={handleOnChange}

                    styles={myStyle}
                    maxMenuHeight={250}
                    components={{DropdownIndicator:()=>null}}
                    placeholder="Add Course"
                    aria-label="Browse courses by ID"
                />
                <button className='absolute add-course-btn' onClick={submitAddCourse}> <AddIcon/> </button>
            </div>

            <div className={'message-container relative ' + (message.status !== 'idle'? 'fade-message':'')}  
                onAnimationEnd={() => setMessage({content:"", status: 'idle'})}
            >
                {message.status !== 'idle' && 
                <p className={'message ' + (message.status === 'succeed'? 'green': 'red')}> 
                    <span className='absolute message-icon'> 
                        {message.status === 'succeed' && <Success/>}
                        {message.status === 'fail' && <Error/>}
                    </span>
                    {message.content}
                </p>}
            </div>
        </div>
    )
};

export default memo(SelectCourses);