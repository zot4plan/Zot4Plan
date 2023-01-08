import { memo } from 'react';
import { OnChangeValue, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { getCourses } from '../../../../controllers/HomeController';

const myStyle: StylesConfig<CourseOptionType, true> = {
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
}
interface CoursesDropdownProps {
    selectCourses: CourseOptionType[];
    setSelectCourses: (courses:CourseOptionType[]) => void;
}
function CoursesDropdown({selectCourses, setSelectCourses}: CoursesDropdownProps) {
    const handleOnChange = (option: OnChangeValue<CourseOptionType, true>) => {
        let courses: CourseOptionType[] = option.map((course: CourseOptionType) => course)
        setSelectCourses(courses);
    }
    return (
        <AsyncSelect
            isMulti={true}
            isClearable={true}
            cacheOptions
            defaultOptions
            loadOptions={getCourses}
            isOptionDisabled={(option) => selectCourses.includes(option)}
            onChange={handleOnChange}
            styles={myStyle}
            value={selectCourses}
            maxMenuHeight={250}
            placeholder="Select Courses"
            aria-label="Browse courses by ID"
        />
    )
};

export default memo(CoursesDropdown);