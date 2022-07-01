import { useState, useEffect, memo, useCallback } from 'react';
import Axios from '../../../../api/Axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {fetchProgramById} from '../../../../api/FetchData';
import Select, { OnChangeValue, StylesConfig} from 'react-select';
import './SelectProgram.css';
import { RootState } from '../../../../app/store';
import { handleChangeProgram } from '../../../../features/StoreSlice';

const myStyle: StylesConfig<ProgramOption, true> =  {
    container: (provided) => ({
        ...provided, 
        width: '100%',
        minWidth: "27rem",
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

interface SelectProgramType { isMajor: boolean;}

function SelectProgram({isMajor}: SelectProgramType) {
    const [programs, setPrograms] = useState<ProgramOption[]>([]);
    const allIds = useSelector((state: RootState) => new Set(state.store.programs.allIds), shallowEqual);
    const selectedPrograms = useSelector((state: RootState) => (
        state.store.programs.selectedPrograms[Number(isMajor)]
    ), shallowEqual)

    const dispatch = useDispatch();

    // Retrieve all majors after rendering
    useEffect( () => {
        async function fetchAllPrograms() {
            const res = await Axios('/api/getAllPrograms');
            const programsArray = await res.data.map((program:ProgramOption) => program);
            setPrograms(programsArray);   
        }
        if(programs.length === 0) 
            fetchAllPrograms();
            
    },[programs]); 

    // Get Major Requirement Courses
    const handleOnChange = useCallback((selectedOptions: OnChangeValue<ProgramOption, true>) => {
        let isFetch = false;

        if(selectedOptions){
           try {
                selectedOptions.forEach(option => {
                    if(!allIds.has(option.value)) {
                        dispatch(fetchProgramById({id: option.value, programs: selectedOptions as ProgramOption[]}));
                        isFetch = true;
                    }
                })
            }
            catch (err) {
                console.error('Failed to retrieve program: ', err)
            } 

            if(!isFetch)
                dispatch(handleChangeProgram({value: selectedOptions as ProgramOption[], isMajor: isMajor}));
        }
    },[allIds, dispatch, isMajor])
    
    return (
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
            placeholder = {"Select Your " + (isMajor? " Major" : "Minor")}
            aria-label = {"Select Your " + (isMajor? " Major" : "Minor")}
        />
    </div>
    )
};

export default memo(SelectProgram);
