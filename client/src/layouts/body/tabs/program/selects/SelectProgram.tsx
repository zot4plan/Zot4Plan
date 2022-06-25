import { useState, useEffect, memo } from 'react';
import Axios from '../../../../../api/Axios';
import Select, { StylesConfig } from 'react-select';
import { useDispatch } from 'react-redux';
import {fetchProgramById} from '../../../../../api/FetchData';

import './SelectProgram.css';

interface OptionType {
    value: number;
    label: string;
}

interface data {
    id: string;
    name: string;
    isMajor: boolean;
}

const myStyle: StylesConfig<OptionType, false> =  {
    container: (provided) => ({
        ...provided, 
        width: '100%',
        minWidth: "27rem",
        maxWidth: '50rem', 
        height: '3.8rem',
        "@media only screen and (max-width:  599px)": {
            ...provided,
            width: "27rem",
        },
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

interface SelectProgramType {
    isMajor: boolean;
}

function SelectProgram({isMajor}: SelectProgramType) {
    const [majors, setMajors] = useState([]);
    const [minors, setMinors] = useState([]);

    const dispatch = useDispatch();

    // Retrieve all majors after rendering
    useEffect( () => {
        async function fetchAllPrograms() {
            const res = await Axios('/api/getAllPrograms');
            const programsArray = await res.data.map( (major:data) =>({value: major.id,label: major.name, isMajor: major.isMajor,}));

            const majorsArray = programsArray.filter(function(program:any) {
                return program.isMajor;
            })
            const minorsArray = programsArray.filter(function(program:any) {
                return !program.isMajor;
            })

            setMajors(majorsArray);
            setMinors(minorsArray)
        }
        
        if(majors.length === 0 && minors.length === 0)
            fetchAllPrograms();
            
    },[majors, minors]); 


    // Get Major Requirement Courses
    const handleOnChange = async (option: OptionType | null) => {
        if(option){
            try {
                await dispatch(fetchProgramById({id: option.value}));
            }
            catch (err) {
                console.error('Failed to retrieve program: ', err)
            } 
        }
    }

    return (
    <div id="select-major"
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '2rem 15%',
        }}> 
        <Select 
            isClearable={true}
            options={(isMajor)? majors : minors} 
            styles={myStyle}
            onChange={handleOnChange}
            placeholder= {"Select Your " + (isMajor)? " Major" : "Minor"}
            aria-label= {"Select Your " + (isMajor)? " Major" : "Minor"}
        />
    </div>
    )
};

export default memo(SelectProgram);