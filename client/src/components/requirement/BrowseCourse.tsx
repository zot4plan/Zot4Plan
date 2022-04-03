import {useState, MouseEvent} from 'react';
import  { StylesConfig } from "react-select";
import AsyncSelect  from 'react-select/async';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import {RootState} from '../../app/store';
import {addCourseMajor} from '../../features/StoreSlice'
import Add from '../icons/Add';
import Error from '../icons/Error';
import Success from '../icons/Success';

interface OptionType {
    value: string;
    label: string;
}

interface CourseType{
    id:string;
}

const myStyle: StylesConfig<OptionType, false> =  {
    control: (provided) => {
        return {...provided, width: '27rem', borderRadius: '18px'};
    },
    menu: (provided) => {
        return {...provided, width: '27rem'};
    },
    valueContainer: (provided) => {
        return {...provided, cursor: 'text'};
    },
    clearIndicator: (provided) => {
        return {...provided, padding:'0.4rem', cursor:'pointer'};
    },
    indicatorsContainer: (provided)=> {
        return {...provided, marginRight: '3.8rem'};
    },
}

const promiseOptions = (inputValue: string, callback:(options: OptionType[]) => void) => {
    let filterCourse:OptionType[] = [];
    if(inputValue.length < 3)
        callback(filterCourse);
    else 
        setTimeout(() => {
            Axios.get('http://localhost:8080/api/filterCourses', {
                params: { id: inputValue }}).then((res) => {
                    res.data.forEach((course:CourseType) => filterCourse.push({value: course.id, label: course.id}))
                    callback(filterCourse);
            });
        }, 500);
}

function BrowseCourse() {
    const [selectCourse, setSelectCourse] = useState<string>("");
    const [message, setMessage] = useState({content: "", status: 'idle'})

    const courses = useSelector((state:RootState)=> state.store.courses.allIds);
    const dispatch = useDispatch();

    const submitAddCourse =(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        let content = selectCourse, status = "fail";

        if(selectCourse === "")
            setMessage({content: "Please select a course!", status: status})

        else if(!courses.includes(selectCourse))
            setTimeout(() => {
                Axios.get('http://localhost:8080/api/getCourseById', {
                    params: { id: selectCourse }})
                    .then((res) => {
                        if(res.data.message === 'succeed') {
                            dispatch(addCourseMajor(res.data.data));
                            content += " is added successfully!";
                            status = "succeed";
                        }
                        else 
                            content += " cannot retrieve data from server!";

                        setMessage({content: content, status: status})   
                    });
            }, 500);

        else 
            setMessage({
                content: content + " has already been added!",
                status: status
            })

    };

    const handleOnChange = (option: OptionType | null) => {
        if(option)
            setSelectCourse(option.value);
        else
            setSelectCourse("");
    }

    return (
        <div className='flex flex-column justify-center item-center m-1'>
            <div className='relative h-36 w-270'>
                <AsyncSelect
                    components={{DropdownIndicator:()=>null}}
                    styles={myStyle}
                    isClearable={true}
                    cacheOptions 
                    defaultOptions
                    loadOptions={promiseOptions}
                    onChange={handleOnChange}
                    isOptionDisabled={(option)=>courses.includes(option.label)}
                    maxMenuHeight={250}
                    placeholder="Choose course"
                    aria-label="Browse and add Course"
                />
                <button className='add-btn' onClick={submitAddCourse}> <Add/> </button>
            </div>

            <div className={'relative h-16 w-270 '+ (message.status !== 'idle'? 'fade-message':'')}  
                 onAnimationEnd={() => setMessage({content:"", status: 'idle'})}>
                {message.status != 'idle' && 
                <p className={'m-0 sz-1 pat-0 pal ' 
                    + (message.status === 'succeed'? 'cl-green': 'cl-red')}> 
                    <span className='absolute m-icon'> 
                        {message.status === 'succeed' && <Success/>}
                        {message.status === 'fail' && <Error/>}
                    </span>
                    {message.content}
                </p>}
            </div>
        </div>
    )
};

export default BrowseCourse;