import { useState, useEffect, memo, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select, { OnChangeValue, StylesConfig} from 'react-select';
import { RootState } from '../../../../../store/store';
import { changeProgram } from '../../../../../store/slices/ProgramsSlice';
import SelectCourses from './SelectCourses';
import ZotSelectMajor from '../../../../../assets/images/ZotSelectMajor.png';
import { getAllPrograms } from '../../../../../controllers/HomeController';
import './SelectProgram.css';

const myStyle: StylesConfig<ProgramOption, true> =  {
    container: (provided) => ({
        ...provided, 
        width: '100%'
    }),
    control: (provided) => ({
        ...provided, 
        borderColor: '#1F1F1F',
        borderRadius: '18px',
        "&:hover": {
            borderColor: '#1F1F1F',
        }
    }),
    valueContainer: (provided) => ({
        ...provided, 
        padding: '0rem 1rem', 
        cursor: 'text'
    }),
    input: (provided) => ({
        ...provided, 
        padding: '0rem',
        margin: '0rem,' 
    }),
    placeholder: (provided) => ({
        ...provided, 
        color: '#1F1F1F',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#1F1F1F'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "inherit"
    }),
    menu: (provided) => ({
        ...provided, zIndex: '999',
    }),
}

interface SelectProgramProps { 
    isMajor: boolean;
}

function SelectProgram({isMajor}: SelectProgramProps) {
    const [programs, setPrograms] = useState<ProgramOption[]>([]);
    const selectedPrograms = useSelector((state: RootState) => (
        state.programs.selectedPrograms[Number(isMajor)]
    ), shallowEqual)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPrograms = async () => {
            const programsArray = await getAllPrograms();
            setPrograms(programsArray);
        };

        fetchPrograms();  
    },[]); 

    const handleOnChange = useCallback((selectedOptions: OnChangeValue<ProgramOption, true>) => {
        if(selectedOptions)
            dispatch(changeProgram({value: selectedOptions as ProgramOption[], isMajor: isMajor}));
    },[dispatch, isMajor])

    const placeholder = "Select your " + (isMajor? "major" : "minor");
    
    return (
    <div>
        <div id="select-major"> 
            <Select
                defaultValue={[]}
                isMulti 
                isClearable = {false}
                value = {selectedPrograms}
                onChange={handleOnChange}
                options = {programs.filter((program:ProgramOption) => program.is_major === isMajor)} 
                isOptionDisabled={() => selectedPrograms.length >= 3 }
                styles={myStyle}
                placeholder = {placeholder}
                aria-label = {placeholder}
            />
        </div>
        {
        selectedPrograms.length > 0 
            ? <SelectCourses/>
            :  <div key="img" className='flex-container img-container'>
                    <img id='program-img' src={ZotSelectMajor} alt='please select your major!'/>
                </div>
        }
    </div>
    )
};

export default memo(SelectProgram);
