import { useState,memo, MouseEvent } from 'react';
import  { StylesConfig } from "react-select";
import AsyncSelect  from 'react-select/async';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/store';
import { addCourse } from '../../../../store/slices/ProgramsSlice';
import { getCourses } from '../../../../api/HomeController';
import AddIcon from '../../../../components/icon/AddIcon';
import Message from '../../../../components/message/Message';
import './SelectCourses.css';

const myStyle: StylesConfig<CourseOptionType, false> =  {
    control: (provided) => ({
        ...provided, 
        width: '100%',
        borderColor: '#1F1F1F',
        borderRadius: '18px',
        "&:hover": {
            borderColor: '#1F1F1F',
        }       
    }),
    valueContainer: (provided) => ({
        ...provided, cursor: 'text',
    }),
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

function SelectCourses() {
    const [selectCourse, setSelectCourse] = useState<string>("");
    const [message, setMessage] = useState({content: "", status: 'idle'});
    
    const addedCourses = useSelector((state:RootState) => (
        state.programs.sections[state.programs.addedCourses]
    ), shallowEqual); 

    const dispatch = useDispatch();

    const submitAddCourse =(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let content = selectCourse, status = "failed";

        if(selectCourse === "")
            setMessage({content: "Please select a course!", status: status})

        else if(!addedCourses.includes(selectCourse)) {
            dispatch(addCourse(selectCourse));
            setMessage({content: content + " was added successfully!", status: "succeeded"});
        }
        else 
            setMessage({content: content + " has already been added!", status: status})
    };

    const handleOnChange = (option: CourseOptionType | null) => {
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
                    loadOptions={getCourses}
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
                <Message status={message.status} content={message.content} />}
            </div>
        </div>
    )
};

export default memo(SelectCourses);