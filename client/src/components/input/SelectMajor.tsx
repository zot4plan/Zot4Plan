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
        return {...provided, marginRight: '0.8rem'};
    },
}

function SelectMajor() {
    const [majors, setMajors] = useState([]);
    const dispatch = useDispatch();

    useEffect( () => {
        async function fetchMajors() {
            const res = await Axios('/api/getMajors');
            const majorsArray = await res.data.map( (major:data) =>({value: major.id, label: major.name}));
            setMajors(majorsArray);
        }
        
        if(majors.length === 0)
            fetchMajors();
    },[]); 

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
        <Select 
            isClearable={true}
            options={majors} 
            styles={myStyle}
            placeholder="Select your major"
            onChange={handleOnChange}
            aria-label="Select your major"
        />
    )
};

export default memo(SelectMajor);