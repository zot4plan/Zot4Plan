import {useState, MouseEvent} from 'react';
import  { StylesConfig } from "react-select";
import Axios from 'axios';
import AsyncSelect  from 'react-select/async';

import Add from '../icons/Add'

import { useSelector } from 'react-redux';
import {RootState} from '../../app/store';
import { useDispatch } from 'react-redux';
import {addCourseMajor} from '../../features/StoreSlice'

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
    const courses = useSelector((state:RootState)=> state.store.courses.allIds);
    const dispatch = useDispatch();

    const submitAddCourse = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if(!courses.includes(selectCourse))
            setTimeout(() => {
                Axios.get('http://localhost:8080/api/getCourseById', {
                    params: { id: selectCourse } } ).then((res) => {
                        console.log(res);
                        if(res.data.message === 'success') {
                            console.log(res.data);
                            dispatch(addCourseMajor({course: res.data.data}));
                        }
                });
            }, 500); 
    };

    const handleOnChange = (option: OptionType | null) => {
        if(option)
            setSelectCourse(option.value);
        else
            setSelectCourse("");
    }

    return (
        <div className='flex justify-center item-center m-1 h-36'>
            <div className='relative h-36 w-250'>
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
        </div>
    )
};

export default BrowseCourse;