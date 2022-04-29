import { useState, useEffect, memo } from 'react';
import Axios from '../../api/Axios';
import Select, { StylesConfig } from 'react-select';
import { useDispatch } from 'react-redux';
import {fetchMajorById} from '../../api/FetchData'

interface OptionType {
    value: number;
    label: string;
}

interface data {
    id: string;
    name: string;
}

const myStyle: StylesConfig<OptionType, false> =  {
    container: (provided) => {
        return {...provided, width: '100%', height: '3.6rem'};
    },
    control: (provided) => {
        return {...provided, borderRadius: '18px'};
    },
    valueContainer: (provided) => {
        return {...provided, cursor: 'text'};
    },
}

function SelectMajor() {
    const [majors, setMajors] = useState([]);
    const dispatch = useDispatch();

    // Retrieve all majors after rendering
    useEffect( () => {
        async function fetchMajors() {
            const res = await Axios('/api/getMajors');
            const majorsArray = await res.data.map( (major:data) =>({value: major.id, label: major.name}));
            setMajors(majorsArray);
        }
        
        if(majors.length === 0)
            fetchMajors();
            
    },[majors]); 

    // Get Major Requirement Courses
    const handleOnChange = async (option: OptionType | null) => {
        if(option){
            try {
                await dispatch(fetchMajorById({id: option.value}));
            }
            catch (err) {
                console.error('Failed to retrieve major: ', err)
            } 
        }
    }

    return (
    <div id="select-major">
        <Select 
            isClearable={true}
            options={majors} 
            styles={myStyle}
            onChange={handleOnChange}
            placeholder="Select your major"
            aria-label="Select your major"
        />
    </div>
    )
};

export default memo(SelectMajor);