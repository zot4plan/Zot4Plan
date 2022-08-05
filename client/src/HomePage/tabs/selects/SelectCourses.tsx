import {useState,memo, MouseEvent} from 'react';
import  { StylesConfig } from "react-select";
import AsyncSelect  from 'react-select/async';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {RootState} from '../../../app/store';
import {addCourse} from '../../../features/ProgramsSlice';
import Axios from '../../../api/Axios';
import AddIcon from '../../../components/icon/AddIcon';
import Message from '../../../components/message/Message';
import './SelectCourses.css';

interface OptionType {
    value: string;
    label: string;
}

interface CourseType{
    id:string;
}

const myStyle: StylesConfig<OptionType, false> =  {
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
                <Message status={message.status} content={message.content} />}
            </div>
        </div>
    )
};

export default memo(SelectCourses);