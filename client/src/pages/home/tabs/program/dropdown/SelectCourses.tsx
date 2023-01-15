import { useState, memo, FormEvent } from 'react';
import  { StylesConfig } from "react-select";
import AsyncSelect  from 'react-select/async';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { addCourse } from '../../../../../store/slices/ProgramsSlice';
import { getCourses } from '../../../../../controllers/HomeController';
import AddIcon from '../../../../../components/icon/AddIcon';
import { toast } from 'react-toastify';
import debounce from "lodash/debounce";
import './SelectCourses.css';

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

function SelectCourses() {
    const [selectCourse, setSelectCourse] = useState<OptionType | null>(null);
    
    const addedCourses = useSelector((state:RootState) => state.programs.sections[state.programs.addedCourses], shallowEqual); 
    const dispatch = useDispatch();

    const submitAddCourse =(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let content = selectCourse ? selectCourse.value : ''

        if(!selectCourse) {
            toast.error("Please select a course!");
        }
        else if(!addedCourses.includes(selectCourse.value)) {
            dispatch(addCourse(selectCourse.value));
            setSelectCourse(null)
            toast.success(content + " was added successfully!");
        }
        else {
            toast.warning(content + " has already been added!")
        }
    };

    const handleOnChange = (option: OptionType | null) => {
        if(option) {
            setSelectCourse(option);
        }
    }

    // prevent unnecessary requests - send after user stops typing
    const wait = 300;
    const debouncedLoadOptions = debounce(getCourses, wait);
    
    return (
        <div className='input-container'>
            <form className='relative browse-container' onSubmit={submitAddCourse}>
                <AsyncSelect
                    isClearable={true}
                    cacheOptions 
                    defaultOptions
                    loadOptions={debouncedLoadOptions}
                    isOptionDisabled={(option) => addedCourses.includes(option.label)}
                    value={selectCourse}
                    onChange={handleOnChange}
                    styles={myStyle}
                    maxMenuHeight={250}
                    components={{DropdownIndicator: () => null}}
                    placeholder="Search Courses"
                    aria-label="Browse courses by ID"
                />
                <button className='absolute add-course-btn' type='submit'> <AddIcon/> </button>
            </form>
        </div>
    )
};

export default memo(SelectCourses);