import { useState, useEffect, memo } from 'react';
import Axios from '../../../../../api/Axios';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProgramById} from '../../../../../api/FetchData';
import Select, { OnChangeValue, StylesConfig} from 'react-select';
import './SelectProgram.css';
import { RootState } from '../../../../../app/store';
import { handleChangeProgram } from '../../../../../features/StoreSlice';

interface data {
    id: string;
    name: string;
    is_major: boolean;
}

const myStyle: StylesConfig<ProgramOption, true> =  {
    container: (provided) => ({
        ...provided, 
        width: '100%',
        minWidth: "27rem", 
    /*"@media only screen and (max-width:  599px)": {
            ...provided,
            width: "27rem", 
        },*/
    }),
    
    control: (provided) => ({
        ...provided, borderRadius: '18px',
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
        fontWeight:'400', 
        fontSize:'1.6rem',
    }),

    menu: (provided) => ({
        ...provided, zIndex: '999',
    }),
}

interface SelectProgramType { isMajor: boolean;}

function SelectProgram({isMajor}: SelectProgramType) {
    const [programs, setPrograms] = useState<ProgramOption[] >([]);
    const allIds = useSelector((state: RootState) => new Set(state.store.programs.allIds));
    const selectedPrograms = useSelector((state: RootState) => {
        return isMajor? state.store.programs.selectedMajors : state.store.programs.selectedMinors;
    })

    const dispatch = useDispatch();

    // Retrieve all majors after rendering
    useEffect( () => {
        async function fetchAllPrograms() {
            const res = await Axios('/api/getAllPrograms');
            const programsArray = await res.data.map( (major:data) =>({value: major.id, label: major.name, isMajor: major.is_major}));
            setPrograms(programsArray);   
        }
        
        if(programs.length === 0)
            fetchAllPrograms();

    },[programs]); 

    // Get Major Requirement Courses
    const handleOnChange = async (selectedOptions: OnChangeValue<ProgramOption, true>) => {
        let isFetch = false;
        if(selectedOptions){
           try {
                console.log(allIds);

                selectedOptions.forEach(option => {
                    console.log(allIds.has(option.value));
                    
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
    }
    
    return (
    <div id="select-major"> 
        <Select
            defaultValue={[]}
            isMulti 
            isClearable = {false}
            value = {selectedPrograms}
            onChange={handleOnChange}
            options = {programs.filter((program:ProgramOption) => program.isMajor === isMajor)} 
            isOptionDisabled={() => selectedPrograms.length >= 3 }
            styles={myStyle}
            placeholder = {"Select Your " + (isMajor? " Major" : "Minor")}
            aria-label = {"Select Your " + (isMajor? " Major" : "Minor")}
        />
    </div>
    )
};

export default memo(SelectProgram);
